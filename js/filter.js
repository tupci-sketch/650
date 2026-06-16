/* =============================================================================
   650 — BANNED-WORD FILTER (shared, client side)
   -----------------------------------------------------------------------------
   A deliberately SIMPLE automated screen for usernames, chat messages and
   custom party names. It normalises text (lowercase, basic leet-speak folding,
   punctuation/space stripping, squashed repeats) and checks it against an open
   word list (LDNOOBW — Shutterstock's "List of Dirty, Naughty, Obscene and
   Otherwise Bad Words", English) covering profanity, slurs and sexual/abusive
   terms. Two tiers:
     • STRONG terms (slurs / abuse) match as substrings of the squashed text —
       they essentially never occur inside innocent words.
     • MILD terms (general profanity) match whole tokens only, so "Scunthorpe",
       "class" and "bassist" stay legal.
   The SAME logic + list runs in the Apps Script backend, so the API itself
   cannot be bypassed. This will not stop determined evasion — humans still
   moderate — and the list is never echoed back to users.
   ========================================================================== */
(function () {
  var G = window.G = window.G || {};
  var LEET = { "0":"o","1":"i","3":"e","4":"a","5":"s","6":"g","7":"t","8":"b","9":"g","@":"a","$":"s","!":"i","+":"t","|":"i" };

  var STRONG = ["beaner","beastial","bestial","bollock","childporn","chink","clusterfuck","cocksuck","coochi","cunnilingus","darkie","fagging","faggot","fagot","fuck","golliwog","gook","jailbait","jigaboo","jiggaboo","kafir","kiddieporn","kike","loli","molest","motherfuck","necrophil","nigg","niglet","nigr","octopussy","paedophil","paki","pedophil","porchmonkey","raghead","raping","rapist","shemale","shit","spic","towelhead","tranny","twat","wank","wetback","wop","zoophil"];
  var MILD = ["acrotomophilia","alabamahotpocket","alaskanpipeline","anal","anilingus","anus","arsehole","ass","asshole","assmunch","autoerotic","babeland","babybatter","babyjuice","ballgag","ballgravy","ballicking","ballkicking","ballsack","ballsucking","bangbros","bangbus","bareback","barelylegal","barenaked","bastard","bastardo","bastinado","bbw","bdsm","beavercleaver","beaverlips","bigblack","bigbreasts","bigknockers","bigtits","bimbos","birdlock","bitch","bitches","blackcock","blondeaction","blondeonblondeaction","blowjob","blowyourload","bluewaffle","blumpkin","bondage","boner","boob","boobs","bootycall","brownshowers","brunetteaction","bukkake","bulldyke","bulletvibe","bunghole","busty","butt","buttcheeks","butthole","cameltoe","camgirl","camslut","camwhore","carpetmuncher","chocolaterosebuds","cialis","circlejerk","clevelandsteamer","clit","clitoris","cloverclamps","cock","cocks","coon","coons","coprolagnia","coprophilia","cornhole","creampie","cum","cumming","cumshot","cumshots","cunt","daterape","deepthroat","dendrophilia","dick","dildo","dingleberries","dingleberry","dirtypillows","dirtysanchez","doggiestyle","doggystyle","dogstyle","dolcett","domination","dominatrix","dommes","donkeypunch","doubledong","doublepenetration","dpaction","dryhump","dvda","eatmyass","ecchi","ejaculation","erotic","erotism","escort","eunuch","fag","fecal","felch","fellatio","feltch","femalesquirting","femdom","figging","fingerbang","fingering","fisting","footfetish","footjob","frotting","fudgepacker","futanari","gangbang","gaysex","genitals","giantcock","gic","girlon","girlontop","girlsgonewild","girlsicup","goatcx","goatse","goddamn","gokkun","goldenshower","goodpoop","googirl","goregasm","grope","groupsex","gspot","guro","handjob","hardcore","hentai","homoerotic","honkey","hooker","horny","hotcarl","hotchick","howtokill","howtomurder","hugefat","humping","incest","intercourse","jackoff","jellydonut","jerkoff","jiggerboo","jizz","juggs","kinbaku","kinkster","kinky","knobbing","leatherrestraint","leatherstraightjacket","lemonparty","livesex","lovemaking","makemecome","malesquirting","masturbate","masturbating","masturbation","menageatrois","milf","missionaryposition","mong","moundofvenus","mrhands","muffdiver","muffdiving","nambla","nawashi","negro","neonazi","nignog","nimphomania","nipple","nipples","nsfw","nsfwimages","nude","nudity","nutten","nympho","nymphomania","omorashi","onecuptwogirls","oneguyonejar","orgasm","orgy","panties","panty","pedobear","pegging","penis","phonesex","pikey","pissing","pisspig","playboy","pleasurechest","polesmoker","ponyplay","poof","poon","poontang","poopchute","porn","porno","pornography","princealbertpiercing","pthc","pubes","punany","pussy","queaf","queef","quim","ragingboner","rape","rectum","reversecowgirl","rimjob","rimming","rosypalm","rosypalmandherssisters","rustytrombone","sadism","santorum","scat","schlong","scissoring","semen","sex","sexcam","sexo","sexual","sexuality","sexually","sexy","shavedbeaver","shavedpussy","shibari","shota","shrimping","skeet","slanteye","slut","smut","snatch","snowballing","sodomize","sodomy","spastic","splooge","sploogemoose","spooge","spreadlegs","spunk","strapon","strappado","stripclub","styledoggy","suck","sucks","suicidegirls","sultrywomen","swastika","swinger","taintedlove","tastemy","teabagging","threesome","throating","thumbzilla","tiedup","tightwhite","tit","tits","titties","titty","tongueina","topless","tosser","tribadism","tubgirl","tushy","twink","twinkie","twogirlsonecup","undressing","upskirt","urethraplay","urophilia","vagina","venusmound","viagra","vibrator","violetwand","vorarephilia","voyeur","voyeurweb","voyuer","vulva","wetdream","whitepower","whore","worldsex","wrappingmen","wrinkledstarfish","yaoi","yellowshowers","yiffy"];
  var MILD_SET = {}; MILD.forEach(function (w) { MILD_SET[w] = 1; });

  function foldChar(c) { return LEET[c] || c; }
  /* fold one token: lowercase, leet substitutions, strip non-letters, squash runs */
  function foldToken(s) {
    s = String(s || "").toLowerCase().split("").map(foldChar).join("");
    s = s.replace(/[^a-z]/g, "").replace(/(.)\1{2,}/g, "$1$1");
    return s;
  }
  /* tokens = split on spaces/punctuation BEFORE folding (keeps word boundaries) */
  function tokens(s) {
    return String(s || "").toLowerCase().split(/[^a-z0-9@$!+|]+/i).map(foldToken).filter(Boolean);
  }
  /* squashed = the whole string folded with every separator removed */
  function squash(s) { return foldToken(String(s || "")); }

  G.FILTER = {
    normalise: squash,
    /* true when the text trips the filter */
    hit: function (text) {
      var sq = squash(text);
      if (!sq) return false;
      for (var i = 0; i < STRONG.length; i++) if (sq.indexOf(STRONG[i]) !== -1) return true;
      if (MILD_SET[sq]) return true;          // the whole string, separators stripped, IS a banned word
      var tk = tokens(text);
      for (var j = 0; j < tk.length; j++) if (MILD_SET[tk[j]]) return true;
      return false;
    },
    /* { ok, message } — the message is friendly and never names the term */
    check: function (text, what) {
      if (G.FILTER.hit(text)) {
        return { ok: false, message: "That " + (what || "text") + " isn't allowed here — please choose different wording." };
      }
      return { ok: true, message: "" };
    }
  };
})();
