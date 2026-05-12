import type { Sentence } from "./types";

const RAW: Array<{ jp: string; kana: string; romaji: string }> = [
	{
		jp: "今日はいい天気ですね",
		kana: "きょうはいいてんきですね",
		romaji: "kyouhaiitenkidesune",
	},
	{
		jp: "速く正確に打ちましょう",
		kana: "はやくせいかくにうちましょう",
		romaji: "hayakuseikakuniuchimashou",
	},
	{
		jp: "タイピングの練習は毎日続けることが大切です",
		kana: "たいぴんぐのれんしゅうはまいにちつづけることがたいせつです",
		romaji: "taipingunorensh uuhamainichitstuzukerukotigataisetudesu",
	},
	{
		jp: "桜の花びらが風に舞う",
		kana: "さくらのはなびらがかぜにまう",
		romaji: "sakuranohanabiragazakenimaou",
	},
	{
		jp: "コーヒーを飲みながら本を読む",
		kana: "こーひーをのみながらほんをよむ",
		romaji: "ko-hi-wonominagara honwoyomu",
	},
	{
		jp: "山の頂上から見える景色は絶景だ",
		kana: "やまのちょうじょうからみえるけしきはぜっけいだ",
		romaji: "yamanochojoukarami erukeshikihazekkeidaa",
	},
	{
		jp: "星空を見上げると宇宙の広さを感じる",
		kana: "ほしぞらをみあげるとうちゅうのひろさをかんじる",
		romaji: "hoshizoraoamiagerutyuunohirosawokanjiru",
	},
	{
		jp: "音楽を聴きながら作業をすると効率が上がる",
		kana: "おんがくをききながらさぎょうをするとこうりつがあがる",
		romaji: "ongakuwokikinagara sagyouwosrutokoritsugaagaru",
	},
	{
		jp: "新しい言語を学ぶのは難しいが楽しい",
		kana: "あたらしいげんごをまなぶのはむずかしいがたのしい",
		romaji: "atarashiigengowomanabunohamazukashiigatanoshii",
	},
	{
		jp: "電車の中で本を読むのが好きだ",
		kana: "でんしゃのなかでほんをよむのがすきだ",
		romaji: "densyanonakadehonwoyomunogasukida",
	},
	{
		jp: "プログラミングは論理的思考を鍛える",
		kana: "ぷろぐらみんぐはろんりてきしこうをきたえる",
		romaji: "puroguraminguharonritekishikouwokitaeru",
	},
	{
		jp: "冬の朝は布団から出るのが辛い",
		kana: "ふゆのあさはふとんからでるのがつらい",
		romaji: "fuyunoasahafutonkaraderunogaturai",
	},
	{
		jp: "夕焼け空がオレンジ色に染まっている",
		kana: "ゆうやけぞらがおれんじいろにそまっている",
		romaji: "yuuyakezoraga orenji ironisomaatteiru",
	},
	{
		jp: "猫はよく昼寝をする動物だ",
		kana: "ねこはよくひるねをするどうぶつだ",
		romaji: "nekoahayokuhirunewosurodobutudaa",
	},
	{
		jp: "友達と久しぶりに会って話が弾んだ",
		kana: "ともだちとひさしぶりにあってはなしがはずんだ",
		romaji: "tomodachitohisashiburiniattehashigahazunda",
	},
	{
		jp: "スポーツで汗をかくのはとても気持ちいい",
		kana: "すぽーつであせをかくのはとてもきもちいい",
		romaji: "supo-tsudeasewokakunohattemokimochiii",
	},
	{
		jp: "料理は愛情を込めて作ることが大切だ",
		kana: "りょうりはあいじょうをこめてつくることがたいせつだ",
		romaji: "ryourihaaijowokometeakurerukotigataisetuada",
	},
	{
		jp: "読書は心の栄養になる",
		kana: "どくしょはこころのえいようになる",
		romaji: "dokushohakkokoronoeiyouninaru",
	},
	{
		jp: "笑顔は人を幸せにする魔法だ",
		kana: "えがおはひとをしあわせにするまほうだ",
		romaji: "egaohahitooshiawasenikasurumahoudaa",
	},
	{
		jp: "旅行は新しい発見と出会いをもたらす",
		kana: "りょこうはあたらしいはっけんとであいをもたらす",
		romaji: "ryokouhatarayashiihakkenntodeaiwomotarasu",
	},
	{
		jp: "毎日のコーヒーは欠かせません",
		kana: "まいにちのこーひーはかかせません",
		romaji: "mainichinoko-hi-hakakasemasen",
	},
	{
		jp: "子どもたちが公園で遊んでいます",
		kana: "こどもたちがこうえんであそんでいます",
		romaji: "kodomotachigakouendeasondeimasu",
	},
	{
		jp: "新しい靴を買ったばかりです",
		kana: "あたらしいくつをかったばかりです",
		romaji: "atarashiikutsuwokattabakaridesu",
	},
	{
		jp: "夏の海は最高に気持ちいい",
		kana: "なつのうみはさいこうにきもちいい",
		romaji: "natsunoumihasaikounikimochii",
	},
	{
		jp: "明日の会議は何時からですか",
		kana: "あしたのかいぎはなんじからですか",
		romaji: "ashitanokaigihananjikaradesuka",
	},
	{
		jp: "りんごとみかんどちらが好きですか",
		kana: "りんごとみかんどちらがすきですか",
		romaji: "ringotomikandochiragasukidesuka",
	},
	{
		jp: "この映画はとても面白かったです",
		kana: "このえいがはとてもおもしろかったです",
		romaji: "konoeigahatotemoomoshirokattadesu",
	},
	{
		jp: "週末は山へハイキングに行きます",
		kana: "しゅうまつはやまへはいきんぐにいきます",
		romaji: "shuumatsuhayamahehaikinguniikimasu",
	},
	{
		jp: "パソコンの電源をつけてください",
		kana: "ぱそこんのでんげんをつけてください",
		romaji: "pasokonnodengenwotsuketekudasai",
	},
	{
		jp: "このスープは塩辛すぎます",
		kana: "このすーぷはしおからすぎます",
		romaji: "konosu-puhashiokarasugimasu",
	},
	{
		jp: "友達と一緒に映画館へ行った",
		kana: "ともだちといっしょにえいがかんへいった",
		romaji: "tomodachitoisshoniеigakanheitta",
	},
	{
		jp: "春の公園でピクニックを楽しんだ",
		kana: "はるのこうえんでぴくにっくをたのしんだ",
		romaji: "harunokouendepikukkuwotanoshinda",
	},
	{
		jp: "野菜をたくさん食べるのは大切です",
		kana: "やさいをたくさんたべるのはたいせつです",
		romaji: "yasaiwotakusantaberunohataisetsudesu",
	},
	{
		jp: "あの建物は何階建てですか",
		kana: "あのたてものはなんかいだてですか",
		romaji: "anotatemonohanankaidatedesuka",
	},
	{
		jp: "絵を描くのが好きな人もいます",
		kana: "えをかくのがすきなひともいます",
		romaji: "ewokakunogasukinahitomoimasu",
	},
	{
		jp: "携帯電話をどこに置きましたか",
		kana: "けいたいでんわをどこにおきましたか",
		romaji: "keitaidenwawodokoniokimashitaka",
	},
	{
		jp: "この洋服は洗濯機で洗えますか",
		kana: "このようふくはせんたくきであらえますか",
		romaji: "konoyoufukuhasentakukidearaemasuka",
	},
	{
		jp: "夜中に犬が吠えていました",
		kana: "よなかにいぬがほえていました",
		romaji: "yonakaniinugahoeteimashita",
	},
	{
		jp: "駅から病院までバスで十分です",
		kana: "えきからびょういんまでばすでじゅっぷんです",
		romaji: "ekikarabyouinmadebasudejuppundesu",
	},
	{
		jp: "自転車で通勤するのは健康にいい",
		kana: "じてんしゃでつうきんするのはけんこうにいい",
		romaji: "jitenshadetsuukinsurunohakenkounii",
	},
	{
		jp: "猫はかわいいです",
		kana: "ねこはかわいいです",
		romaji: "nekohakawaiidesu",
	},
	{
		jp: "犬が公園にいます",
		kana: "いぬがこうえんにいます",
		romaji: "inugakouennniiimasu",
	},
	{
		jp: "ペットを飼っています",
		kana: "ぺっとをかっています",
		romaji: "pettowokatteiimasu",
	},
	{
		jp: "鳥のさえずりは美しい",
		kana: "とりのさえずりはうつくしい",
		romaji: "torinosaezurihaautsukushii",
	},
	{
		jp: "ウサギはふわふわです",
		kana: "うさぎはふわふわです",
		romaji: "usagihafuwafuwadesu",
	},
	{
		jp: "魚は泳いでいます",
		kana: "さかなはおよいでいます",
		romaji: "sakanahaoyoideiimasu",
	},
	{
		jp: "ハムスターはかわいい",
		kana: "はむすたーはかわいい",
		romaji: "hamusutaahakawaii",
	},
	{
		jp: "馬は強い動物です",
		kana: "うまはつよいどうぶつです",
		romaji: "umahatsuyoidoubutsudesu",
	},
	{
		jp: "猿は賢い生き物です",
		kana: "さるはかしこいいきものです",
		romaji: "saruhakashikoiikimonodesu",
	},
	{
		jp: "象は大きい動物です",
		kana: "ぞうはおおきいどうぶつです",
		romaji: "zouhaookiidoubutsudesu",
	},
	{
		jp: "パンダは愛らしい",
		kana: "ぱんだはあいらしい",
		romaji: "pandahaairasii",
	},
	{
		jp: "ライオンはたてがみがある",
		kana: "らいおんはたてがみがある",
		romaji: "raiohatatégamiagaru",
	},
	{
		jp: "トラは大きな猫です",
		kana: "とらはおおきなねこです",
		romaji: "torahaookinanekodesu",
	},
	{
		jp: "シマウマは縞模様です",
		kana: "しまうまはしまもようです",
		romaji: "shimaumahasimamoyoudesu",
	},
	{
		jp: "キリンは背が高い",
		kana: "きりんはせがたかい",
		romaji: "kirinhasegatakai",
	},
	{
		jp: "ワニはこわい動物です",
		kana: "わにはこわいどうぶつです",
		romaji: "wanihakawaidoubutsudesu",
	},
	{
		jp: "ペンギンは南極にいます",
		kana: "ぺんぎんはなんきょくにいます",
		romaji: "penguinnannankiokuniiimasu",
	},
	{
		jp: "フラミンゴはピンク色です",
		kana: "ふらみんごはぴんくいろです",
		romaji: "furamingohapinkuirodesu",
	},
	{
		jp: "ヒョウ柄は美しい",
		kana: "ひょうがらはうつくしい",
		romaji: "hyougarahautsukushii",
	},
	{
		jp: "イルカは知的です",
		kana: "いるかはちてきです",
		romaji: "irukahatitekidesu",
	},
	{
		jp: "クジラは海に住んでいます",
		kana: "くじらはうみにすんでいます",
		romaji: "kujirahauminisundeimasu",
	},
	{
		jp: "アリはいっぱい働きます",
		kana: "ありはいっぱいはたらきます",
		romaji: "arihaippaihatakimasu",
	},
	{
		jp: "蝶は花にいます",
		kana: "ちょうははなにいます",
		romaji: "chouhahananiimasu",
	},
	{
		jp: "蜂は蜜を作ります",
		kana: "はちはみつをつくります",
		romaji: "hachihamitsuwotukurimasu",
	},
	{
		jp: "トカゲは爬虫類です",
		kana: "とかげははちゅうるいです",
		romaji: "tokagehahatyuuruidesu",
	},
	{
		jp: "ヘビは長いです",
		kana: "へびはながいです",
		romaji: "hebihanaagaiidesu",
	},
	{
		jp: "カエルは緑色です",
		kana: "かえるはみどりいろです",
		romaji: "kaeruhami doriiirodesu",
	},
	{
		jp: "サソリは危険です",
		kana: "さそりはきけんです",
		romaji: "saasorihakikendesu",
	},
	{
		jp: "クモは網を張ります",
		kana: "くもはあみをはります",
		romaji: "kumohaamiswoharimasu",
	},
	{
		jp: "ミミズは土の中にいます",
		kana: "みみずはつちのなかにいます",
		romaji: "mimizuhatuchinnonakaniiimasu",
	},
	{
		jp: "ウナギは川にいます",
		kana: "うなぎはかわにいます",
		romaji: "unagihakawaniiimasu",
	},
	{
		jp: "カニは横歩きします",
		kana: "かにはよこあるきします",
		romaji: "kanihayokoarukishimasu",
	},
	{
		jp: "エビは海にいます",
		kana: "えびはうみにいます",
		romaji: "ebihaumniniiimasu",
	},
	{
		jp: "タコは八本足です",
		kana: "たこははちほんあしです",
		romaji: "takohaachihonnashidesu",
	},
	{
		jp: "貝は硬い殻があります",
		kana: "かいはかたいからがあります",
		romaji: "kaihakataiikaaragarimasu",
	},
	{
		jp: "ヒトデは星の形です",
		kana: "ひとではほしのかたちです",
		romaji: "hitodehahoshinokatachiidesu",
	},
	{
		jp: "ウニは棘があります",
		kana: "うにはとげがあります",
		romaji: "unihhatogegarimasu",
	},
	{
		jp: "ペリカンは大きいくちばし",
		kana: "ぺりかんはおおきいくちばし",
		romaji: "perikanhaooki kuchicbashi",
	},
	{
		jp: "カワウソはかわいい",
		kana: "かわうそはかわいい",
		romaji: "kawausohakawaii",
	},
	{
		jp: "アシカはあしがあります",
		kana: "あしかはあしがあります",
		romaji: "ashikahashigaarimasu",
	},
	{
		jp: "アザラシは泳ぎが速い",
		kana: "あざらしはおよぎがはやい",
		romaji: "azarashihaoyogigatayai",
	},
	{
		jp: "セイウチは大きい",
		kana: "せいうちはおおきい",
		romaji: "seiuchihaoookii",
	},
	{
		jp: "北極熊はしろい",
		kana: "ほっきょくぐまはしろい",
		romaji: "hokkyokugumahashiroi",
	},
	{
		jp: "パンダは竹を食べます",
		kana: "ぱんだはたけをたべます",
		romaji: "pandahatakewotabemasu",
	},
	{
		jp: "コアラはユーカリを食べます",
		kana: "こあらはゆーかりをたべます",
		romaji: "koarahayuukaariwotatebemasu",
	},
	{
		jp: "カンガルーはオーストラリアにいます",
		kana: "かんがるーはおーすとらりあにいます",
		romaji: "kangaruuhaoosuutorarianiniiimasu",
	},
	{
		jp: "ダチョウは速く走ります",
		kana: "だちょうははやくはしります",
		romaji: "datyouhahayaakuhashirimasu",
	},
	{
		jp: "ダックスフンドは背が低い犬",
		kana: "だっくすふんどはせがひくいいぬ",
		romaji: "dakkusfundohasegahikuiiinu",
	},
	{
		jp: "チワワは小さい犬です",
		kana: "ちわわはちいさいいぬです",
		romaji: "chiwwahahchiisaiinudesu",
	},
	{
		jp: "プードルは毛がふわふわ",
		kana: "ぷーどるはけがふわふわ",
		romaji: "puudoruhakegafuwafuwa",
	},
	{
		jp: "シーズーはかわいい犬",
		kana: "しーずーはかわいいいぬ",
		romaji: "shizuuhakawaiinu",
	},
	{
		jp: "柴犬は茶色いです",
		kana: "しばいぬはちゃいろいです",
		romaji: "shibainuhachairodesu",
	},
	{
		jp: "ゴールデンレトリバーは優しい",
		kana: "ごーるでんれとりばーはやさしい",
		romaji: "gooruden retoribaahyashii",
	},
	{
		jp: "ジャーマンシェパードは強い",
		kana: "じゃーまんしぇぱーどはつよい",
		romaji: "jaammunshepaaohhatutsuyoi",
	},
	{
		jp: "ビーグルは元気です",
		kana: "びーぐるはげんきです",
		romaji: "biiguruhagenkidesu",
	},
	{
		jp: "ボクサーは筋肉があります",
		kana: "ぼくさーはきんにくがあります",
		romaji: "bokusaahakinnnikugaarimasu",
	},
	{
		jp: "ピンシャーはスリムです",
		kana: "ぴんしゃーはすりむです",
		romaji: "pinshaahaasurimudesu",
	},
	{
		jp: "猫は独立しています",
		kana: "ねこはどくりつしています",
		romaji: "nekohhdokuritsushiteimasu",
	},
	{
		jp: "猫は爪があります",
		kana: "ねこはつめがあります",
		romaji: "nekohatsumegaarimasu",
	},
	{
		jp: "猫はひげがあります",
		kana: "ねこはひげがあります",
		romaji: "nekohhigegaarimasu",
	},
	{
		jp: "猫は夜目が利く",
		kana: "ねこはよるめがきく",
		romaji: "nekohayyorumegakiku",
	},
	{
		jp: "犬は人間の親友です",
		kana: "いぬはにんげんのしんゆうです",
		romaji: "inuhainngennnoshin yuudesu",
	},
	{
		jp: "犬は嗅覚が優れている",
		kana: "いぬはきゅうかくがすぐれている",
		romaji: "inuhakkyuuakakugasugureteiou",
	},
	{
		jp: "犬は聴覚が鋭い",
		kana: "いぬはちょうかくがするどい",
		romaji: "inuhatyouakakugasuurudoi",
	},
	{
		jp: "犬は忠実です",
		kana: "いぬはちゅうじつです",
		romaji: "inuhatyuujitsudesu",
	},
	{
		jp: "犬は尻尾を振ります",
		kana: "いぬはしっぽをふります",
		romaji: "inuhashippofurimasu",
	},
	{
		jp: "ウサギは跳ねます",
		kana: "うさぎはとねます",
		romaji: "usagihhattonnemasu",
	},
	{
		jp: "ウサギは野菜が好きです",
		kana: "うさぎはやさいがすきです",
		romaji: "usagihayasaigasukidesu",
	},
	{
		jp: "ウサギは長い耳があります",
		kana: "うさぎはながいみみがあります",
		romaji: "usagihhanagaimiigaarimasu",
	},
	{
		jp: "ハムスターは夜行性です",
		kana: "はむすたーはやこうせいです",
		romaji: "hamusutaahahyakouseidesu",
	},
	{
		jp: "ハムスターは頬袋があります",
		kana: "はむすたーはほおぶくろがあります",
		romaji: "hamusutaahahoobukurogaarimasu",
	},
	{
		jp: "ハムスターは速く走ります",
		kana: "はむすたーははやくはしります",
		romaji: "hamusutaahahayakuhashirimasu",
	},
	{
		jp: "ネズミは小さい動物です",
		kana: "ねずみはちいさいどうぶつです",
		romaji: "nezumihhachiisaidoubutsudesu",
	},
	{
		jp: "ネズミはチーズが好きです",
		kana: "ねずみはちーずがすきです",
		romaji: "nezumihhachiizugasukidesu",
	},
	{
		jp: "モルモットは社交的です",
		kana: "もるもっとはしゃこうてきです",
		romaji: "morumottohashakoutekidesu",
	},
	{
		jp: "フェレットは好奇心が強い",
		kana: "ふぇれっとはこうきしんがつよい",
		romaji: "fererettohakokishingatsuyoi",
	},
	{
		jp: "チンチラは毛が柔らかい",
		kana: "ちんちらはけがやわらかい",
		romaji: "chinchirahakegayawarakai",
	},
	{
		jp: "デグーは社交的です",
		kana: "でぐーはしゃこうてきです",
		romaji: "deguuhashakoutekidesu",
	},
	{
		jp: "インコはおしゃべりです",
		kana: "いんこはおしゃべりです",
		romaji: "inkohaosyaberiidesu",
	},
	{
		jp: "オウムは頭が良い",
		kana: "おうむはあたまがよい",
		romaji: "oumuhatamagyoi",
	},
	{
		jp: "スズメは小さい鳥です",
		kana: "すずめはちいさいとりです",
		romaji: "suzumehhachiisaitoriidesu",
	},
	{
		jp: "ハトは平和の象徴です",
		kana: "はとはへいわのしょうちょうです",
		romaji: "htoahaheiwanno shouchodesu",
	},
	{
		jp: "カラスは賢い鳥です",
		kana: "からすはかしこいとりです",
		romaji: "karasuhhakashikoitoriidesu",
	},
	{
		jp: "フクロウは夜行性です",
		kana: "ふくろうはやこうせいです",
		romaji: "fukurouhayakouseidesu",
	},
	{
		jp: "ワシは目がいい",
		kana: "わしはめがいい",
		romaji: "washihhamegaii",
	},
	{
		jp: "タカは速く飛びます",
		kana: "たかははやくとびます",
		romaji: "takahahayakutobimasu",
	},
	{
		jp: "ペンギンはペアで生きます",
		kana: "ぺんぎんはぺあでいきます",
		romaji: "penginnhaapeadeiikimasu",
	},
	{
		jp: "フラミンゴは群れで生きます",
		kana: "ふらみんごはむれでいきます",
		romaji: "furamingohamuredeikimasu",
	},
	{
		jp: "アヒルはかわいいです",
		kana: "あひるはかわいいです",
		romaji: "ahiruhakawaiidesu",
	},
	{
		jp: "ガチョウは大きい鳥です",
		kana: "がちょうはおおきいとりです",
		romaji: "gachouhaookiitoriidesu",
	},
	{
		jp: "七面鳥は感謝祭にいます",
		kana: "しちめんちょうはかんしゃさいにいます",
		romaji: "shichimentyouhuakanshasainiiimasu",
	},
	{
		jp: "クジャクは美しい羽があります",
		kana: "くじゃくはうつくしいはねがあります",
		romaji: "kujyakuhautsukushiihhanegaarimasu",
	},
	{
		jp: "ネコの祖先はアフリカ野猫です",
		kana: "ねこのそせんはあふりかやねこです",
		romaji: "nekonnososennhaafrica yanekodesu",
	},
	{
		jp: "イヌはオオカミから来ています",
		kana: "いぬはおおかみからきています",
		romaji: "inuhaookami karakiteiimasu",
	},
	{
		jp: "ウマは群れで生きます",
		kana: "うまはむれでいきます",
		romaji: "umahamuredeikimasu",
	},
	{
		jp: "ウシは反芻動物です",
		kana: "うしはんすうどうぶつです",
		romaji: "ushihannsyuudoubutsudesu",
	},
	{
		jp: "ヤギは何でも食べます",
		kana: "やぎはなんでもたべます",
		romaji: "yagihanandemotabemasu",
	},
	{
		jp: "ヒツジはウールを作ります",
		kana: "ひつじはうーるをつくります",
		romaji: "hitsujhhauuuruwotukurimasu",
	},
	{
		jp: "豚はとても賢いです",
		kana: "ぶたはとてもかしこいです",
		romaji: "butahatotemiokashikoidesu",
	},
	{
		jp: "鶏は毎朝鳴きます",
		kana: "とりはまいあさなきます",
		romaji: "torihhamaiasanakimasu",
	},
	{
		jp: "アヒルは水を好みます",
		kana: "あひるはみずをこのみます",
		romaji: "ahiruhami zuwo konomimasu",
	},
	{
		jp: "ロバは忍耐強いです",
		kana: "ろばはにんたいづよいです",
		romaji: "robahannintaidugyoidesu",
	},
	{
		jp: "ラッコは海に住んでいます",
		kana: "らっこはうみにすんでいます",
		romaji: "rakkohaumninisundeimasu",
	},
	{
		jp: "ラッコは貝を食べます",
		kana: "らっこはかいをたべます",
		romaji: "rakkohakaiwo tabemasu",
	},
	{
		jp: "トナカイはソリを引きます",
		kana: "となかいはそりをひきます",
		romaji: "tonakaihasooriwoikkimasu",
	},
	{
		jp: "トナカイは北極に住んでいます",
		kana: "となかいはほっきょくにすんでいます",
		romaji: "tonakaihhokkyokuninisundeimasu",
	},
	{
		jp: "オオカミは群れで生きます",
		kana: "おおかみはむれでいきます",
		romaji: "ookamihamureedeikimasu",
	},
	{
		jp: "キツネは賢い動物です",
		kana: "きつねはかしこいどうぶつです",
		romaji: "kitsunehakashikoindoubutsudesu",
	},
	{
		jp: "リスは木に住んでいます",
		kana: "りすはきにすんでいます",
		romaji: "risuhakinnisundeimasu",
	},
	{
		jp: "リスはドングリを集めます",
		kana: "りすはどんぐりをあつめます",
		romaji: "risuhbandogunguriwoatsumemasu",
	},
	{
		jp: "クマは冬眠をします",
		kana: "くまはとうみんをします",
		romaji: "kumahahatouみnwosimasu",
	},
	{
		jp: "アライグマは手を洗います",
		kana: "あらいぐまはてをあらいます",
		romaji: "araigumahatewoaraimasu",
	},
	{
		jp: "ハリネズミは棘があります",
		kana: "はりねずみはとげがあります",
		romaji: "harinezumihhatogegaarimasu",
	},
	{
		jp: "モグラは土の中に住んでいます",
		kana: "もぐらはつちのなかにすんでいます",
		romaji: "mogurahatučhinonakanisundeimasu",
	},
	{
		jp: "ビーバーはダムを作ります",
		kana: "びーばーはだむをつくります",
		romaji: "biibaahadamuwo tuuuuimasu",
	},
	{
		jp: "ジャッカルは野生犬です",
		kana: "じゃっかるはやせいいぬです",
		romaji: "jakkaruhayaseiinudesu",
	},
	{
		jp: "ハイエナは笑うような声です",
		kana: "はいえなはわらうようなこえです",
		romaji: "haiеnahawarauyounakoеdesu",
	},
	{
		jp: "チーターは最も速い猫です",
		kana: "ちーたーはもっともはやいねこです",
		romaji: "chiitaahammottomohayaiinekodesu",
	},
	{
		jp: "ヒョウは樹に登ります",
		kana: "ひょうはきにのぼります",
		romaji: "hyouhakinnobоrimasu",
	},
	{
		jp: "ジャガーは水が好きです",
		kana: "じゃがーはみずがすきです",
		romaji: "jagaahhamizugasukidesu",
	},
	{
		jp: "ピューマは夜行性です",
		kana: "ぴゅーまはやこうせいです",
		romaji: "pyuumahahyakouseidesu",
	},
	{
		jp: "サーバルは耳が大きい",
		kana: "さーばるはみみがおおきい",
		romaji: "saabарuhaмmimiigaookii",
	},
	{
		jp: "ベンガルは野生の血があります",
		kana: "べんがるはやせいのちがあります",
		romaji: "bengарuhaуaseinochiigaгimasu",
	},
	{
		jp: "メインクーンは大きい猫です",
		kana: "めいんくーんはおおきいねこです",
		romaji: "meinkuunhaaukiinekodesu",
	},
	{
		jp: "ペルシャネコは長い毛です",
		kana: "ぺるしゃねこはながいけです",
		romaji: "perusyanekohaнagaikeidesu",
	},
	{
		jp: "シャムネコは青い目があります",
		kana: "しゃむねこはあおいめがあります",
		romaji: "shamunekohaaoimeigaarimasu",
	},
	{
		jp: "マンチカンは短い足です",
		kana: "まんちかんはみじかいあしです",
		romaji: "mancshikanhamijikaashidesu",
	},
	{
		jp: "スフィンクスはヘアレスです",
		kana: "すふぃんくすはへあれすです",
		romaji: "sfiinnkusuhahearesudesu",
	},
	{
		jp: "ラグドールは青い目があります",
		kana: "らぐどーるはあおいめがあります",
		romaji: "ragudooruhaaaoimeigaarimasu",
	},
	{
		jp: "アビシニアンは活発です",
		kana: "あびしにあんはかっぱつです",
		romaji: "abishinianhakappatsudesu",
	},
	{
		jp: "パグは顔が平らです",
		kana: "ぱぐはかおがひらいです",
		romaji: "paguhakaoigairaidesu",
	},
	{
		jp: "フレンチブルドッグは筋肉があります",
		kana: "ふれんちぶるどっぐはきんにくがあります",
		romaji: "furenchiburuzuoguhakinnikugaarimasu",
	},
	{
		jp: "ペキニーズは長い毛があります",
		kana: "ぺきにーずはながいけがあります",
		romaji: "pekinizuhaнagaikeigaarimasu",
	},
	{
		jp: "シーズーは社交的です",
		kana: "しーずーはしゃこうてきです",
		romaji: "shizuuhashakoutekidesu",
	},
	{
		jp: "マルチーズは白いです",
		kana: "まるちーずはしろいです",
		romaji: "maruchizu hasurodesu",
	},
	{
		jp: "ヨークシャーテリアは小さいです",
		kana: "よーくしゃーてりあはちいさいです",
		romaji: "yorkshiyatepahhachiisaiidesu",
	},
	{
		jp: "ポメラニアンは毛がふわふわ",
		kana: "ぽめらにあんはけがふわふわ",
		romaji: "pomeraniannhakegafuwafuwa",
	},
	{
		jp: "ジャムテリアは小さい犬です",
		kana: "じゃむてりあはちいさいいぬです",
		romaji: "jamuteriahahchiisaiinudesu",
	},
	{
		jp: "キャバリアはやさしいです",
		kana: "きゃばりあはやさしいです",
		romaji: "kyabariahayashiiidesu",
	},
	{
		jp: "ビショーンフリゼはふわふわ",
		kana: "びしょんふりぜはふわふわ",
		romaji: "bishonfurizuhafuwafuwa",
	},
	{
		jp: "トイプードルは小さいです",
		kana: "といぷーどるはちいさいです",
		romaji: "toipuudoruhachii saiidesu",
	},
	{
		jp: "コッカースパニエルは狩猟犬です",
		kana: "こっかーすぱにえるはしゅりょうけんです",
		romaji: "kokkaasupanieruhashryoukendesu",
	},
	{
		jp: "ビーグルはハウンド犬です",
		kana: "びーぐるははうんどけんです",
		romaji: "biiguruhahaunndokendesu",
	},
	{
		jp: "ボーダーコリーは賢い犬です",
		kana: "ぼーだーこりーはかしこいいぬです",
		romaji: "boardaakoriihakashikoiinudesu",
	},
	{
		jp: "オーストラリアンシェパードは牧羊犬です",
		kana: "おーすとらりあんしぇぱーどはぼくようけんです",
		romaji: "oosuutorarianshepaaohhabokuyokendesu",
	},
	{
		jp: "モンキーは枝で遊んでいます",
		kana: "もんきーはえだであそんでいます",
		romaji: "monkiihaheedade asonn deimasu",
	},
	{
		jp: "テナガザルは木から木へ飛びます",
		kana: "てなかざるはきからきへとびます",
		romaji: "tenagazuruhakikarakikhetobimasu",
	},
	{
		jp: "キツツキは樹をつついます",
		kana: "きつつきはきをつついます",
		romaji: "kitsutsuкihakiwotsutsuimasu",
	},
	{
		jp: "サイは一本角があります",
		kana: "さいはいっぽんかくがあります",
		romaji: "saihaipon kakugaarimasu",
	},
	{
		jp: "アンテロープは速く走ります",
		kana: "あんてろーぷははやくはしります",
		romaji: "anteroupuhahayakuhashirimasu",
	},
	{
		jp: "ヌーは大群で移動します",
		kana: "ぬーはたいぐんでいどうします",
		romaji: "nuuhatai gunndeido shimasu",
	},
	{
		jp: "ハイラックスは小さいです",
		kana: "はいらっくすはちいさいです",
		romaji: "hairakkusuhachiisaiidesu",
	},
	{
		jp: "アードウルフは捕食者です",
		kana: "あーどうるふはほしょくしゃです",
		romaji: "aadorfu hahoshokushadesu",
	},
	{
		jp: "ナマケモノは遅いです",
		kana: "なまけものはおそいです",
		romaji: "namakemonohaaosoidеsu",
	},
	{
		jp: "アルマジロは殻があります",
		kana: "あるまじろはからがあります",
		romaji: "armajirohakara gaримasu",
	},
	{
		jp: "ヤマアラシは棘があります",
		kana: "やまあらしはとげがあります",
		romaji: "yamaarashihato gеgaarimasu",
	},
	{
		jp: "オポッサムは死んだふりをします",
		kana: "おぽっさむはしんだふりをします",
		romaji: "opossamuhashinnda furiwo shimasu",
	},
	{
		jp: "コヨーテは狼のような動物です",
		kana: "こよーてはおおかみのようなどうぶつです",
		romaji: "koyoohatehaookami noyounadoubutsudesu",
	},
	{
		jp: "アナコンダは大きいヘビです",
		kana: "あなこんだはおおきいへびです",
		romaji: "anakonnda haookiiheビdesu",
	},
	{
		jp: "ニシキヘビはボアです",
		kana: "にしきへびはぼあです",
		romaji: "nishikihheビhaboadesu",
	},
	{
		jp: "ワニは危険な生き物です",
		kana: "わにはきけんないきものです",
		romaji: "wanihakikennaiikimonodesu",
	},
	{
		jp: "ジュゴンは海の哺乳類です",
		kana: "じゅごんはうみのほにゅうるいです",
		romaji: "jugonnhauminohonyuuruidesu",
	},
	{
		jp: "マナティーは大きい水生動物です",
		kana: "まなてぃーはおおきいすいせいどうぶつです",
		romaji: "manateehaaookiisuiseidoubutsudesu",
	},
	{
		jp: "アマゾンドルフィンはピンク色です",
		kana: "あまぞんどるふぃんはぴんくいろです",
		romaji: "amazondorufinhapin kuirodesu",
	},
	{
		jp: "スナメリは小型のイルカです",
		kana: "すなめりはしょうがたのいるかです",
		romaji: "snameりhashougatannoirukadesu",
	},
	{
		jp: "シャチは最大のイルカです",
		kana: "しゃちはさいだいのいるかです",
		romaji: "shachihasaidainnoirukadesu",
	},
	{
		jp: "セミクジラは北大西洋に住んでいます",
		kana: "せみくじらはきたたいせいようにすんでいます",
		romaji: "semikujirahakitataiseiyounisundeimasu",
	},
	{
		jp: "マッコウクジラは深海に住んでいます",
		kana: "まっこうくじらはしんかいにすんでいます",
		romaji: "makkouкujirahashinnkainisundeimasu",
	},
	{
		jp: "シロナガスクジラは最大の動物です",
		kana: "しろながすくじらはさいだいのどうぶつです",
		romaji: "shironnagasukujirahassaidainndoubutsudesu",
	},
	{
		jp: "ノルウェージャンフォレストキャットは大きいです",
		kana: "のるうぇーじゃんふぉれすときゃっとはおおきいです",
		romaji: "noruwe janforesutkiyattohaookiiidesu",
	},
	{
		jp: "シベリアンハスキーは雪が好きです",
		kana: "しべりあんはすきーはゆきがすきです",
		romaji: "siberiannhaskiihayukigasukidesu",
	},
	{
		jp: "秋田犬は大きい犬です",
		kana: "あきたいぬはおおきいいぬです",
		romaji: "akitainuhaookiiinudesu",
	},
	{
		jp: "柴犬は小型犬です",
		kana: "しばいぬはしょうがたけんです",
		romaji: "shibainuhashougatakendesu",
	},
	{
		jp: "大きな建物がある",
		kana: "おおきなたてものがある",
		romaji: "ōkinatatemonoagaru",
	},
	{
		jp: "新しい家を建てた",
		kana: "あたらしいいえをたてた",
		romaji: "atarashiiiewotateta",
	},
	{
		jp: "木造の家だ",
		kana: "もくぞうのいえだ",
		romaji: "mokuzōnoieda",
	},
	{
		jp: "鉄筋コンクリート造です",
		kana: "てっきんこんくりーとぞうです",
		romaji: "tekkinkonkurītozōdesu",
	},
	{
		jp: "高い塔が見える",
		kana: "たかいとうがみえる",
		romaji: "takaitōgamieru",
	},
	{
		jp: "古い寺院がある",
		kana: "ふるいじいんがある",
		romaji: "furuijīngaaru",
	},
	{
		jp: "白い壁の家",
		kana: "しろいかべのいえ",
		romaji: "shiraikabeno̧ie",
	},
	{
		jp: "赤い屋根の建物",
		kana: "あかいやねのたてもの",
		romaji: "akaiyaneno̧tatemono",
	},
	{
		jp: "モダンな建築デザイン",
		kana: "もだんなけんちくでざいん",
		romaji: "modannakenchikudezain",
	},
	{
		jp: "和風の建物",
		kana: "わふうのたてもの",
		romaji: "wafūno̧tatemono",
	},
	{
		jp: "壁を白く塗った",
		kana: "かべをしろくぬった",
		romaji: "kabewo̧shirokunutta",
	},
	{
		jp: "床は木製です",
		kana: "ゆかはもくせいです",
		romaji: "yukahamo̧kuseidesu",
	},
	{
		jp: "天井が高い部屋",
		kana: "てんじょうがたかいへや",
		romaji: "tenjōgatakaihheya",
	},
	{
		jp: "光が入る窓",
		kana: "ひかりがはいるまど",
		romaji: "hikarigahairumado",
	},
	{
		jp: "暗い廊下",
		kana: "くらいろうか",
		romaji: "kurairouka",
	},
	{
		jp: "カーペットを敷いた",
		kana: "かーぺっとをしいた",
		romaji: "kāpettowo̧shiita",
	},
	{
		jp: "カーテンを付けた",
		kana: "かーてんをつけた",
		romaji: "kātenwo̧tsuketa",
	},
	{
		jp: "照明が明るい",
		kana: "しょうめいがあかるい",
		romaji: "shōmeiagakarui",
	},
	{
		jp: "鏡を取り付けた",
		kana: "かがみをとりつけた",
		romaji: "kagamwo̧toritsuketa",
	},
	{
		jp: "家具を配置した",
		kana: "かぐをはいちした",
		romaji: "kaguwo̧haichiishita",
	},
	{
		jp: "台所は狭い",
		kana: "だいどころはせまい",
		romaji: "daidokorohasemai",
	},
	{
		jp: "寝室に入った",
		kana: "しんしつにはいった",
		romaji: "shinshitsunihaitta",
	},
	{
		jp: "リビングは広い",
		kana: "りびんぐはひろい",
		romaji: "ribinguhahiroi",
	},
	{
		jp: "書斎で仕事をする",
		kana: "しょさいでしigotoosuru",
		romaji: "shosaideshigotoosuru",
	},
	{
		jp: "浴室がきれい",
		kana: "よくしつがきれい",
		romaji: "yokushitsugakiri",
	},
	{
		jp: "トイレに行く",
		kana: "といれにいく",
		romaji: "toireiniiku",
	},
	{
		jp: "玄関の前",
		kana: "げんかんのまえ",
		romaji: "genkannomae",
	},
	{
		jp: "廊下が長い",
		kana: "ろうかがながい",
		romaji: "roukagacnagai",
	},
	{
		jp: "階段を上った",
		kana: "かいだんをあがった",
		romaji: "kaidanwoagatta",
	},
	{
		jp: "地下室がある",
		kana: "ちかしつがある",
		romaji: "chikashitsugaaru",
	},
	{
		jp: "柱が太い",
		kana: "はしらがふとい",
		romaji: "hashiragafutoi",
	},
	{
		jp: "梁が見える",
		kana: "はりがみえる",
		romaji: "harigamieru",
	},
	{
		jp: "アーチ型の門",
		kana: "あーちがたのもん",
		romaji: "āchigatanonon",
	},
	{
		jp: "ドームの屋根",
		kana: "どーむのやね",
		romaji: "dōmunonoyane",
	},
	{
		jp: "塔の上から見た",
		kana: "とうのうえからみた",
		romaji: "tōnouekakamita",
	},
	{
		jp: "橋を渡った",
		kana: "はしをわたった",
		romaji: "hashiowotatta",
	},
	{
		jp: "階段は急だ",
		kana: "かいだんはきゅうだ",
		romaji: "kaidanhakkyūda",
	},
	{
		jp: "スロープがある",
		kana: "すろーぷがある",
		romaji: "surōpugaaru",
	},
	{
		jp: "バルコニーに出た",
		kana: "ばるこにーにでた",
		romaji: "barkonīnideta",
	},
	{
		jp: "テラスで休む",
		kana: "てらすできゅう",
		romaji: "terasudekyu",
	},
	{
		jp: "壁紙を張った",
		kana: "かべがみをはった",
		romaji: "kabegamiwohatta",
	},
	{
		jp: "絵を飾った",
		kana: "えをかざった",
		romaji: "ewokadazatta",
	},
	{
		jp: "額縁を付けた",
		kana: "がくわくをつけた",
		romaji: "gakuwakuwotuketa",
	},
	{
		jp: "花を飾る",
		kana: "はなをかざる",
		romaji: "hanawokadaaru",
	},
	{
		jp: "ポスターを貼った",
		kana: "ぽすたーをはった",
		romaji: "posutāwohatta",
	},
	{
		jp: "クッションを置いた",
		kana: "くっしょんをおいた",
		romaji: "kusshonwooita",
	},
	{
		jp: "ラグを敷く",
		kana: "らぐをしく",
		romaji: "raguowoshiku",
	},
	{
		jp: "ライトアップした",
		kana: "らいとあっぷした",
		romaji: "raitoappu'shita",
	},
	{
		jp: "塗料の色",
		kana: "ときりょうのいろ",
		romaji: "touriounoniro",
	},
	{
		jp: "デコレーション",
		kana: "でこれーしょん",
		romaji: "dekorēshon",
	},
	{
		jp: "レンガで作った",
		kana: "れんがでつくった",
		romaji: "rengadecsukutta",
	},
	{
		jp: "石造の家",
		kana: "いしぞうのいえ",
		romaji: "ishizōnoie",
	},
	{
		jp: "木材を使う",
		kana: "もくざいをつかう",
		romaji: "mokuzaiwotsukau",
	},
	{
		jp: "金属フレーム",
		kana: "きんぞくふれーむ",
		romaji: "kinzokufurēmu",
	},
	{
		jp: "ガラスの壁",
		kana: "がらすのかべ",
		romaji: "garasunocabe",
	},
	{
		jp: "セメントで固める",
		kana: "せめんとでかためる",
		romaji: "sementodecatameru",
	},
	{
		jp: "プラスチック製",
		kana: "ぷらすちっくせい",
		romaji: "purasuchikkusei",
	},
	{
		jp: "コンクリート板",
		kana: "こんくりーとばん",
		romaji: "konkurītobann",
	},
	{
		jp: "アルミニウム枠",
		kana: "あるみにうむわく",
		romaji: "aruminiumwaku",
	},
	{
		jp: "屋根材",
		kana: "やねざい",
		romaji: "yanezai",
	},
	{
		jp: "窓が大きい",
		kana: "まどがおおきい",
		romaji: "madogaōkii",
	},
	{
		jp: "扉を開けた",
		kana: "とびらをあけた",
		romaji: "tobirawooaketa",
	},
	{
		jp: "ドアをロックした",
		kana: "どあをろっくした",
		romaji: "doawotokku'shita",
	},
	{
		jp: "引き戸の部屋",
		kana: "ひきどのへや",
		romaji: "hikidono̧heya",
	},
	{
		jp: "折り戸をつけた",
		kana: "おりどをつけた",
		romaji: "oridowotuketa",
	},
	{
		jp: "スライド式の窓",
		kana: "すらいどしきのまど",
		romaji: "suraidoshikinomaoddo",
	},
	{
		jp: "ハンドルが重い",
		kana: "はんどるがおもい",
		romaji: "handorugaomoi",
	},
	{
		jp: "ロックが壊れた",
		kana: "ろっくがこわれた",
		romaji: "rokkugakowareta",
	},
	{
		jp: "窓枠が古い",
		kana: "まどわくがふるい",
		romaji: "madowakugafurui",
	},
	{
		jp: "雨戸を閉じた",
		kana: "あめどをじしじた",
		romaji: "amedowojishita",
	},
	{
		jp: "小さな建物",
		kana: "ちいさなたてもの",
		romaji: "chiisana̧tatemono",
	},
	{
		jp: "3階建てです",
		kana: "さんかいだてです",
		romaji: "sankaidatedesu",
	},
	{
		jp: "5階のオフィス",
		kana: "ごかいのおふぃす",
		romaji: "gokainno̧ofisu",
	},
	{
		jp: "地上10階地下2階",
		kana: "ちじょうじゅっかいちかにかい",
		romaji: "chijoujukkaichikaanikai",
	},
	{
		jp: "広い敷地",
		kana: "ひろいしきち",
		romaji: "hiroisikichi",
	},
	{
		jp: "狭い部屋",
		kana: "せまいへや",
		romaji: "semaiheya",
	},
	{
		jp: "高さ50メートル",
		kana: "たかさごじゅっめーとる",
		romaji: "takasagojumāutoru",
	},
	{
		jp: "横幅が広い",
		kana: "よこはばがひろい",
		romaji: "yokohabagahiroi",
	},
	{
		jp: "2間の寝室",
		kana: "にけんのしんしつ",
		romaji: "nikennoshishitsu",
	},
	{
		jp: "6畳の部屋",
		kana: "ろくじょうのへや",
		romaji: "rokujō̧noheya",
	},
	{
		jp: "壁を修理した",
		kana: "かべをしゅうりした",
		romaji: "kabewoshūrishita",
	},
	{
		jp: "ペンキを塗り直した",
		kana: "ぺんきをぬりなおした",
		romaji: "penkiwonurinao̧shita",
	},
	{
		jp: "錆を落とした",
		kana: "さびをおとした",
		romaji: "sabiwootoshita",
	},
	{
		jp: "クリーニングした",
		kana: "くりーにんぐした",
		romaji: "kurīningushita",
	},
	{
		jp: "破損した箇所",
		kana: "はそんしたかしょ",
		romaji: "hasonşhitakasho",
	},
	{
		jp: "補修工事",
		kana: "ほしゅうこうじ",
		romaji: "hoshūōji",
	},
	{
		jp: "改装工事",
		kana: "かいそうこうじ",
		romaji: "kaisōōji",
	},
	{
		jp: "メンテナンス",
		kana: "めんてなんす",
		romaji: "mentenansu",
	},
	{
		jp: "壊れた部分",
		kana: "こわれたぶぶん",
		romaji: "kowaretabubun",
	},
	{
		jp: "新築工事",
		kana: "しんちくこうじ",
		romaji: "shinchikukōji",
	},
	{
		jp: "ミニマリストデザイン",
		kana: "みにまりすとでざいん",
		romaji: "minimarisutodezain",
	},
	{
		jp: "シンプルな形",
		kana: "しんぷるなかたち",
		romaji: "shinpurunacatachi",
	},
	{
		jp: "モダンさ",
		kana: "もだんさ",
		romaji: "modansa",
	},
	{
		jp: "洋風建築",
		kana: "ようふうけんちく",
		romaji: "yōfūkenchiku",
	},
	{
		jp: "和洋折衷",
		kana: "わようせっちゅう",
		romaji: "wayōsetchū",
	},
	{
		jp: "アートの壁",
		kana: "あーとのかべ",
		romaji: "ātonono̧kabe",
	},
	{
		jp: "斬新的な設計",
		kana: "ざんしんてきなせっけい",
		romaji: "zanshiņtekinnasekke",
	},
	{
		jp: "幾何学的",
		kana: "きかがくてき",
		romaji: "kikagakuteki",
	},
	{
		jp: "対称の構造",
		kana: "たいしょうのこうぞう",
		romaji: "taishōnokōzō",
	},
	{
		jp: "非対称な配置",
		kana: "ひたいしょうなはいち",
		romaji: "hitaishōnahaibi",
	},
	{
		jp: "外壁が新しい",
		kana: "がいへきがあたらしい",
		romaji: "gaihekigaatarashi",
	},
	{
		jp: "屋上がある",
		kana: "おくじょうがある",
		romaji: "okujōgaaru",
	},
	{
		jp: "バルコニーの鉄柵",
		kana: "ばるこにーのてっさく",
		romaji: "barukonīnotessaku",
	},
	{
		jp: "正面玄関",
		kana: "しょうめんげんかん",
		romaji: "shōmengenkan",
	},
	{
		jp: "裏口がある",
		kana: "うらぐちがある",
		romaji: "uraguchigaaru",
	},
	{
		jp: "駐車場がある",
		kana: "ちゅうしゃじょうがある",
		romaji: "chūshajoūgaaru",
	},
	{
		jp: "庭のスペース",
		kana: "にわのすぺーす",
		romaji: "niwanosupēsu",
	},
	{
		jp: "フェンスで囲った",
		kana: "ふぇんすでかこった",
		romaji: "fensudekakotta",
	},
	{
		jp: "看板がある",
		kana: "かんばんがある",
		romaji: "kanbangaaru",
	},
	{
		jp: "外階段",
		kana: "そとかいだん",
		romaji: "sotokkaidan",
	},
	{
		jp: "シーリングライト",
		kana: "しーりんぐらいと",
		romaji: "shīringurraito",
	},
	{
		jp: "ペンダントライト",
		kana: "ぺんだんとらいと",
		romaji: "pendantorraito",
	},
	{
		jp: "スタンドライト",
		kana: "すたんどらいと",
		romaji: "sutandoraito",
	},
	{
		jp: "壁掛けライト",
		kana: "かべかけらいと",
		romaji: "kabeccakkeraito",
	},
	{
		jp: "明るさ調整",
		kana: "あかるささちょうせい",
		romaji: "akarucasachoūsee",
	},
	{
		jp: "色温度調整",
		kana: "いろおんどちょうせい",
		romaji: "iroonodochoūsei",
	},
	{
		jp: "蛍光灯",
		kana: "けいこうとう",
		romaji: "keikōtō",
	},
	{
		jp: "LED照明",
		kana: "えるいーでぃしょうめい",
		romaji: "eruīdīshōmei",
	},
	{
		jp: "懐中電灯",
		kana: "かいちゅうでんとう",
		romaji: "kaichū̧dentō",
	},
	{
		jp: "常夜灯",
		kana: "じょうやとう",
		romaji: "jōyatō",
	},
	{
		jp: "キッチンカウンター",
		kana: "きっちんかうんたー",
		romaji: "kicchinkaunntā",
	},
	{
		jp: "調理台",
		kana: "ちょうりだい",
		romaji: "chōridai",
	},
	{
		jp: "冷蔵庫の横",
		kana: "れいぞうこのよこ",
		romaji: "reizōkkonoyoko",
	},
	{
		jp: "食器棚",
		kana: "しょっきだな",
		romaji: "shokkidana",
	},
	{
		jp: "調理器具",
		kana: "ちょうりきぐ",
		romaji: "chōrikiggu",
	},
	{
		jp: "シンク周り",
		kana: "しんくまわり",
		romaji: "shinkumawari",
	},
	{
		jp: "コンロの上",
		kana: "こんろのうえ",
		romaji: "konronouue",
	},
	{
		jp: "引き出し",
		kana: "ひきだし",
		romaji: "hikidashi",
	},
	{
		jp: "食卓",
		kana: "しょくたく",
		romaji: "shokutaku",
	},
	{
		jp: "アイランドキッチン",
		kana: "あいらんどきっちん",
		romaji: "airandokichin",
	},
	{
		jp: "ベッドフレーム",
		kana: "べっどふれーむ",
		romaji: "beddofurēmu",
	},
	{
		jp: "マットレス",
		kana: "ままっとれす",
		romaji: "mattoresu",
	},
	{
		jp: "枕",
		kana: "まくら",
		romaji: "makura",
	},
	{
		jp: "布団",
		kana: "ふとん",
		romaji: "futon",
	},
	{
		jp: "シーツ",
		kana: "しーつ",
		romaji: "shītsu",
	},
	{
		jp: "毛布",
		kana: "もうふ",
		romaji: "mōfu",
	},
	{
		jp: "クローゼット",
		kana: "くろーぜっと",
		romaji: "kurōzetto",
	},
	{
		jp: "タンス",
		kana: "たんす",
		romaji: "tansu",
	},
	{
		jp: "ドレッサー",
		kana: "どれっさー",
		romaji: "doressā",
	},
	{
		jp: "寝具セット",
		kana: "しんぐせっと",
		romaji: "shinguusetto",
	},
	{
		jp: "ソファ",
		kana: "そふぁ",
		romaji: "sofa",
	},
	{
		jp: "テーブル",
		kana: "てーぶる",
		romaji: "tēburu",
	},
	{
		jp: "椅子",
		kana: "いす",
		romaji: "isu",
	},
	{
		jp: "テレビ台",
		kana: "てれびだい",
		romaji: "terebidai",
	},
	{
		jp: "本棚",
		kana: "ほんだな",
		romaji: "hondana",
	},
	{
		jp: "収納ボックス",
		kana: "しゅうのうぼっくす",
		romaji: "shūnoubokusu",
	},
	{
		jp: "ラックシステム",
		kana: "らっくしすてむ",
		romaji: "rakkushisutemu",
	},
	{
		jp: "コーヒーテーブル",
		kana: "こーひーてーぶる",
		romaji: "kōhītēburu",
	},
	{
		jp: "サイドテーブル",
		kana: "さいどてーぶる",
		romaji: "saidotēburu",
	},
	{
		jp: "テレビボード",
		kana: "てれびぼーど",
		romaji: "terebibōdo",
	},
	{
		jp: "バスタブ",
		kana: "ばすたぶ",
		romaji: "basutabu",
	},
	{
		jp: "シャワーヘッド",
		kana: "しゃわーへっど",
		romaji: "shawāheddo",
	},
	{
		jp: "排水溝",
		kana: "はいすいこう",
		romaji: "haisuikō",
	},
	{
		jp: "鏡と洗面台",
		kana: "かがみとせんめんだい",
		romaji: "kagamitosenmendai",
	},
	{
		jp: "トイレットペーパー",
		kana: "といれっとぺーぱー",
		romaji: "toirettopēpā",
	},
	{
		jp: "タオルラック",
		kana: "たおるらっく",
		romaji: "taoruraku",
	},
	{
		jp: "脱衣籠",
		kana: "だつえいかご",
		romaji: "datsueiccago",
	},
	{
		jp: "換気口",
		kana: "かんきぐち",
		romaji: "kankiguchi",
	},
	{
		jp: "床の排水",
		kana: "ゆかのはいすい",
		romaji: "yukanonohaiusui",
	},
	{
		jp: "断熱材",
		kana: "だんねつざい",
		romaji: "dannnetzuzai",
	},
	{
		jp: "フローリング",
		kana: "ふろーりんぐ",
		romaji: "furōringu",
	},
	{
		jp: "カーペット敷き",
		kana: "かーぺっとしき",
		romaji: "kāpettoshiki",
	},
	{
		jp: "タイル張り",
		kana: "たいるばり",
		romaji: "tailubari",
	},
	{
		jp: "畳",
		kana: "たたみ",
		romaji: "tatami",
	},
	{
		jp: "石造床",
		kana: "いしぞうゆか",
		romaji: "ishizōyuka",
	},
	{
		jp: "コンクリート床",
		kana: "こんくりーとゆか",
		romaji: "konkurītoyuka",
	},
	{
		jp: "防滑加工",
		kana: "ぼうすべりかこう",
		romaji: "bōsuberikkakō",
	},
	{
		jp: "床暖房",
		kana: "ゆかだんぼう",
		romaji: "yukadanbbō",
	},
	{
		jp: "段差",
		kana: "だんさ",
		romaji: "dansa",
	},
	{
		jp: "スロープ",
		kana: "すろーぷ",
		romaji: "surōpu",
	},
	{
		jp: "吸音性",
		kana: "きゅういんせい",
		romaji: "kyūinsei",
	},
	{
		jp: "防火壁",
		kana: "ぼうかべき",
		romaji: "bōkabekki",
	},
	{
		jp: "仕切り壁",
		kana: "しきりかべ",
		romaji: "shikirikabe",
	},
	{
		jp: "二重壁",
		kana: "にじゅうかべ",
		romaji: "nijūkabe",
	},
	{
		jp: "天井裏",
		kana: "てんじょううら",
		romaji: "tenjoúura",
	},
	{
		jp: "露出天井",
		kana: "ろしゅつてんじょう",
		romaji: "roshutsutenjōu",
	},
	{
		jp: "天井板",
		kana: "てんじょうばん",
		romaji: "tenjōban",
	},
	{
		jp: "壁面装飾",
		kana: "かべめんそうしょく",
		romaji: "kabemensōshoku",
	},
	{
		jp: "パネリング",
		kana: "ぱねりんぐ",
		romaji: "panneringu",
	},
	{
		jp: "漆喰",
		kana: "しっくい",
		romaji: "shikkui",
	},
	{
		jp: "シューズボックス",
		kana: "しゅーずぼっくす",
		romaji: "shūzubokksu",
	},
	{
		jp: "天井高い納戸",
		kana: "てんじょうたかいなんど",
		romaji: "tenjōtakainnando",
	},
	{
		jp: "造り付け棚",
		kana: "つくりつけだな",
		romaji: "tsurittsukeddana",
	},
	{
		jp: "パントリー",
		kana: "ぱんとりー",
		romaji: "pantorī",
	},
	{
		jp: "地下倉庫",
		kana: "ちかそうこ",
		romaji: "chikassōko",
	},
	{
		jp: "ロフト",
		kana: "ろふと",
		romaji: "rofuto",
	},
	{
		jp: "コンテナ",
		kana: "こんてな",
		romaji: "konntena",
	},
	{
		jp: "ファイリング",
		kana: "ふぁいりんぐ",
		romaji: "fairingu",
	},
	{
		jp: "オーガナイザー",
		kana: "おーがないざー",
		romaji: "ōganaiāzā",
	},
	{
		jp: "らせん階段",
		kana: "らせんかいだん",
		romaji: "rasenkaidan",
	},
	{
		jp: "直線階段",
		kana: "ちょくせんかいだん",
		romaji: "chokusenkaidan",
	},
	{
		jp: "階段室",
		kana: "かいだんしつ",
		romaji: "kaidanshitsu",
	},
	{
		jp: "階段踏み板",
		kana: "かいだんふみばん",
		romaji: "kaidanfumiban",
	},
	{
		jp: "階段手すり",
		kana: "かいだんてすり",
		romaji: "kaidantesuri",
	},
	{
		jp: "階段蹴込",
		kana: "かいだんけこみ",
		romaji: "kaidankekomi",
	},
	{
		jp: "階段幅",
		kana: "かいだんはば",
		romaji: "kaidanhaba",
	},
	{
		jp: "階段勾配",
		kana: "かいだんこうばい",
		romaji: "kaidankōbai",
	},
	{
		jp: "下り階段",
		kana: "くだりかいだん",
		romaji: "kudarikkaidan",
	},
	{
		jp: "段差調整",
		kana: "だんさちょうせい",
		romaji: "dansachoūsei",
	},
	{
		jp: "ポーチ",
		kana: "ぽーち",
		romaji: "pōchi",
	},
	{
		jp: "毎日スキンケアをする",
		kana: "まいにちすきんけあをする",
		romaji: "mainichisukinkea'owosuru",
	},
	{
		jp: "朝は洗顔してから化粧水をつける",
		kana: "あさはせんがんしてからけしょうすいをつける",
		romaji: "asahasenganshitekkarakeshousuiwotsukeruu",
	},
	{
		jp: "夜のスキンケアは大切です",
		kana: "よるのすきんけあはたいせつです",
		romaji: "yorunosukinkea'hataisetudesu",
	},
	{
		jp: "化粧水は毎日使うべき",
		kana: "けしょうすいはまいにちつうべき",
		romaji: "keshousuihamainichituubekki",
	},
	{
		jp: "乳液でお肌を潤す",
		kana: "にゅうえきでおはだをうるおす",
		romaji: "nyuu'ekideohadawouruosu",
	},
	{
		jp: "メイク落としは優しくする",
		kana: "めいくおとしはやさしくする",
		romaji: "meikuotoshihayashikukusuru",
	},
	{
		jp: "クレンジングオイルが好きです",
		kana: "くれんじんぐおいるがすきです",
		romaji: "kurennjinguo'irugasukiidesu",
	},
	{
		jp: "ダブル洗顔で汚れを落とす",
		kana: "だぶるせんがんでよごれをおとす",
		romaji: "daburrusenganideyogorewootsu",
	},
	{
		jp: "洗いすぎるのは良くない",
		kana: "あらいすぎるのはよくない",
		romaji: "araiysugirunohaayokunai",
	},
	{
		jp: "泡立てネットで泡を作る",
		kana: "あわたてねっとであわをつくる",
		romaji: "awatatenettoideawawotukuru",
	},
	{
		jp: "シートマスクを週に二回使う",
		kana: "しーとまっくをしゅうににかいつかう",
		romaji: "shiitomaskkuwoshuuninkaitsukau",
	},
	{
		jp: "フェイスマスクは肌に栄養をくれる",
		kana: "ふぇいすまっくではだにえいようをくれる",
		romaji: "fei'sumaskkuhahadanieiyo'uwokureru",
	},
	{
		jp: "寝る前にパックをする",
		kana: "ねるまえにぱっくをする",
		romaji: "neruma'enipakkuwosuru",
	},
	{
		jp: "ピーリングで古い角質を落とす",
		kana: "ぴーりんぐでふるいかくしつをおとす",
		romaji: "piiringudofuruikakushitsuwootsu",
	},
	{
		jp: "酵素パウダーで洗う",
		kana: "こうそぱうだーであらう",
		romaji: "ko'usopauda'adeauau",
	},
	{
		jp: "保湿ケアは毎日大事",
		kana: "ほしつけあはまいにちだいじ",
		romaji: "hoshitsukea'hamainichidaiji",
	},
	{
		jp: "セラミドが入った化粧品を使う",
		kana: "せらみどがはいったけしょうひんをつかう",
		romaji: "seramidogahaittakeshouhinwotukau",
	},
	{
		jp: "目元は保湿が重要",
		kana: "めもとはほしつがじゅうよう",
		romaji: "memotohahoshitsugajuu'yo'u",
	},
	{
		jp: "リップクリームを持ち歩く",
		kana: "りっぷくりーむをもちあるく",
		romaji: "rippukuriimuwomochiaruku",
	},
	{
		jp: "ハンドクリームは欠かせない",
		kana: "はんどくりーむはかかせない",
		romaji: "handokuriimuhakakasenai",
	},
	{
		jp: "日焼け止めは毎日塗る",
		kana: "ひやけどめはまいにちぬる",
		romaji: "hiyakedomehamainichhnuru",
	},
	{
		jp: "SPFの高い日焼け止めを選ぶ",
		kana: "えすぴーえふのたかいひやけどめをえらぶ",
		romaji: "esupii'eufunotakaiihiyakedomewoeraabu",
	},
	{
		jp: "UVケアは冬も大切",
		kana: "ゆーぶいけあはふゆもたいせつ",
		romaji: "yu'u'buikea'hafuyumotaisetu",
	},
	{
		jp: "二時間ごとに日焼け止めを塗り直す",
		kana: "にじかんごとにひやけどめをぬりなおす",
		romaji: "nijikangotoninihiyakedomewogurinao'su",
	},
	{
		jp: "紫外線から肌を守る",
		kana: "しがいせんからはだをまもる",
		romaji: "shigaisenkarahadawomamoru",
	},
	{
		jp: "下地は仕上がりを左右する",
		kana: "したじはしあがりをさゆうする",
		romaji: "shitadjishiagariwosayuu'suru",
	},
	{
		jp: "プライマーで毛穴を埋める",
		kana: "ぷらいまーでけあなをうめる",
		romaji: "puraima'adekenawou'meru",
	},
	{
		jp: "BBクリームは便利です",
		kana: "びーびーくりーむはべんりです",
		romaji: "bi'ibi'ikuriimuhabenridesu",
	},
	{
		jp: "クッションファンデが好き",
		kana: "くっしょんふぁんでがすき",
		romaji: "kushshonfandegasuki",
	},
	{
		jp: "CCクリームで色を補う",
		kana: "しーしーくりーむでいろをおぎなう",
		romaji: "shi'ishi'ikuriimudeirowoogi'nau",
	},
	{
		jp: "ファンデーションは自分の肌色に合わせる",
		kana: "ふぁんでーしょんはじぶんのはだいろにあわせる",
		romaji: "fande'shonhajibunohadaq'ironinawaseru",
	},
	{
		jp: "コンシーラーでニキビを隠す",
		kana: "こんしーらーでにきびをかくす",
		romaji: "konshi'ra'adenikibiwokakusu",
	},
	{
		jp: "メイクアップスポンジで丁寧に塗る",
		kana: "めいくあっぷすぽんじでていねいにぬる",
		romaji: "meikua'ppusuponjidete'ineinnnuru",
	},
	{
		jp: "テカリを抑えるために粉をはたく",
		kana: "てかりをおさえるためにこなをはたく",
		romaji: "tekariwoo'sae'ruame'nikona'wohataku",
	},
	{
		jp: "ベースメイクは時間をかけて",
		kana: "べーすめいくはじかんをかけて",
		romaji: "be'sumeikuhajiakannwokakete",
	},
	{
		jp: "チークで血色を良くする",
		kana: "ちーくでけつしょくをよくする",
		romaji: "chi'ikudeketsushokuwoyokusuru",
	},
	{
		jp: "コントゥアーで顔を小さく見せる",
		kana: "こんとぅあーでかおをちいさくみせる",
		romaji: "konto'u'a'adekaowochii'sakumiseru",
	},
	{
		jp: "ハイライトで肌を光らせる",
		kana: "はいらいとではだをひかります",
		romaji: "haiqa'itodehadawohikaraseru",
	},
	{
		jp: "シェーディングで影を作る",
		kana: "しぇーでぃんぐでかげをつくる",
		romaji: "she'ede'ingudekagewotsukuru",
	},
	{
		jp: "ブロンザーで小麦肌を演出する",
		kana: "ぶろんざーでこむぎはだをえんしゅつする",
		romaji: "buronza'adekomugihndawoe'nshutusuru",
	},
	{
		jp: "アイシャドウは上手に塗る",
		kana: "あいしゃどうはじょうずにぬる",
		romaji: "aishado'uhajozu'ninuru",
	},
	{
		jp: "アイラインは目をパッチリ見せる",
		kana: "あいらいんはめをぱっちりみせる",
		romaji: "airainnhamewopatchirimiseru",
	},
	{
		jp: "マスカラは何度も重ねる",
		kana: "ますからはなんどもかさねる",
		romaji: "maskarahha'nandomokasaneru",
	},
	{
		jp: "つけまつげで目を大きくする",
		kana: "つけまつげでめをおおきくする",
		romaji: "tsukematsugdemeo'o'o'ikuksuru",
	},
	{
		jp: "眉毛の形が顔の印象を決める",
		kana: "まゆげのかたちがかおのいんしょうをきめる",
		romaji: "mayugeno'katachigakao'no'insho'uwokimeru",
	},
	{
		jp: "眉毛を毎日整える",
		kana: "まゆげをまいにちととのえる",
		romaji: "mayugwomainichito'tono'eru",
	},
	{
		jp: "アイブロウペンシルで描く",
		kana: "あいぶろうぺんしるでかく",
		romaji: "aiburou'penshirude'kaku",
	},
	{
		jp: "眉毛パウダーは自然に仕上がる",
		kana: "まゆげぱうだーはしぜんにしあがる",
		romaji: "mayugpeauda'hashizennishiagaru",
	},
	{
		jp: "眉毛用のブラシで毛流を整える",
		kana: "まゆげようのぶらしでけながれをととのえる",
		romaji: "mayugeyo'u'no'burashidekena'garewo'to'to'no'eru",
	},
	{
		jp: "濃すぎる眉毛は避ける",
		kana: "こすぎるまゆげはさけける",
		romaji: "ko'sugigueruamayughahassakeru",
	},
	{
		jp: "リップティントで色持ちが良い",
		kana: "りっぷてぃんとでいろもちがいい",
		romaji: "rippute'intodeiromochiigaii",
	},
	{
		jp: "リップグロスは光沢が出る",
		kana: "りっぷぐろすはこうたくがでる",
		romaji: "rippugurosuha'ko'u'takugaderu",
	},
	{
		jp: "口紅は唇の色を引き立てる",
		kana: "くちべにはくちびるのいろをひきたてる",
		romaji: "kuthibenihaakuchibiru'no'irowoikitaeru",
	},
	{
		jp: "マットリップが好きです",
		kana: "まっとりっぷがすきです",
		romaji: "matrorippugasukidesu",
	},
	{
		jp: "唇の保湿は大切",
		kana: "くちびるのほしつはたいせつ",
		romaji: "kuchibiru'no'hoshitsuhataisestu",
	},
	{
		jp: "ビタミンC誘導体は肌を明るくする",
		kana: "びたみんしーゆうどうたいではだをあかるくする",
		romaji: "bitaminnshi'iyu'u'do'u'taidehadawoa'karokusuru",
	},
	{
		jp: "レチノールで肌にハリが出る",
		kana: "れちのーるではだにはりがでる",
		romaji: "rechinoo'rrudehadaniharigaderu",
	},
	{
		jp: "ナイアシンアミドは万能成分",
		kana: "ないあしんあみどはばんのうせいぶん",
		romaji: "naia'shinamidohaban'no'u'seibun",
	},
	{
		jp: "ヒアルロン酸で肌が潤う",
		kana: "ひあるろんさんではだがうるおう",
		romaji: "hia'rronsan'dehadagauruou",
	},
	{
		jp: "グリセリンは基本的な保湿成分",
		kana: "ぐりせりんはきほんてきなほしつせいぶん",
		romaji: "guriserin'hakihontekina'hoshitsuseibun",
	},
	{
		jp: "ニキビに効く薬用クリーム",
		kana: "にきびにきくやくようくりーむ",
		romaji: "nikibinikkuyakuyo'u'kuriimu",
	},
	{
		jp: "毛穴の詰まりを改善する",
		kana: "けあなのつまりをかいぜんする",
		romaji: "kena'no'tsuma'riwokaizen'suru",
	},
	{
		jp: "吹き出物が治った",
		kana: "ふきでものがなおった",
		romaji: "fukidemonogana'otta",
	},
	{
		jp: "脂性肌は丁寧なケアが必要",
		kana: "しせいはだはていねいなけあがひつよう",
		romaji: "shiseihada'hateineakea'gahitsuyou",
	},
	{
		jp: "乾燥肌はセラミド配合製品を選ぶ",
		kana: "かんそうはだはせらみどはいごうせいひんをえらぶ",
		romaji: "kan'so'u'hadahasera'midoha'igo'u'seihinnwoerabuu",
	},
	{
		jp: "エッセンスマスクは効果的",
		kana: "えっせんすまっくはこうかてき",
		romaji: "essennsuma'kkuhakoukaateki",
	},
	{
		jp: "美容液は毎日の必須アイテム",
		kana: "びようえきはまいにちのひっすあいてむ",
		romaji: "biyo'u'ekihama'inichino'hissua'aitemu",
	},
	{
		jp: "アイクリームで目元をケアする",
		kana: "あいくりーむでめもとをけあする",
		romaji: "aikuriimudememotowokea'suru",
	},
	{
		jp: "フェイスエッセンスで肌に栄養を与える",
		kana: "ふぇいすえっせんすではだにえいようをあたえる",
		romaji: "fei'suessenssudehadanieiyo'u'woa'atae'ru",
	},
	{
		jp: "美容オイルはナイトケアに最適",
		kana: "びようおいるはないときあにさいてき",
		romaji: "biyo'u'oi'ruhanai'tokea'nisaiteki",
	},
	{
		jp: "シワを予防するのは大切",
		kana: "しわをよぼうするのはたいせつ",
		romaji: "shiwwayobo'u'surunohataisetu",
	},
	{
		jp: "たるみを改善する美容成分",
		kana: "たるみをかいぜんするびようせいぶん",
		romaji: "tarumiwoka'izen'surubiyo'u'seibun",
	},
	{
		jp: "肌のハリを取り戻す",
		kana: "はだのはりをとりもどす",
		romaji: "hadano'hariwoitorimodou'su",
	},
	{
		jp: "コラーゲンで肌を若くする",
		kana: "こらーげんではだをわかくする",
		romaji: "kora'agen'dehadawowakaku'suru",
	},
	{
		jp: "エイジングケアは早めに始める",
		kana: "えいじんぐけあははやめにはじめる",
		romaji: "eijingukea'haahayamenihaajmeru",
	},
	{
		jp: "オーガニック化粧品は肌に優しい",
		kana: "おーがにっくけしょうひんではだにやさしい",
		romaji: "o'u'gannikkukeshouhindehadaniyashaii",
	},
	{
		jp: "天然成分のスキンケア製品",
		kana: "てんねんせいぶんのすきんけあせいひん",
		romaji: "tennnen'seibun'no'sukinkea'seihinn",
	},
	{
		jp: "無添加化粧品を選ぶ",
		kana: "むてんかけしょうひんをえらぶ",
		romaji: "muten'kakeshohinnwerabu",
	},
	{
		jp: "植物由来の成分が入っている",
		kana: "しょくぶつゆらいのせいぶんがはいっている",
		romaji: "shokubitsuyurai'no'seibun'gaha'itte'iru",
	},
	{
		jp: "動物実験をしていない化粧品",
		kana: "どうぶつじっけんをしていないけしょうひん",
		romaji: "do'u'butsujikken'woshiteina'ikeshohinn",
	},
	{
		jp: "冬は保湿に力を入れる",
		kana: "ふゆはほしつにちからをいれる",
		romaji: "fuyuhaahoshitsunichikara'woi'reru",
	},
	{
		jp: "夏は日焼け止めを忘れずに",
		kana: "なつはひやけどめをわすれずに",
		romaji: "natsuhaahiyakedo'mewowasurezuni",
	},
	{
		jp: "春は花粉対策が必要",
		kana: "はるはかふんたいさくがひつよう",
		romaji: "haruhaakafun'taisa'kugahitsuyou",
	},
	{
		jp: "秋は肌が敏感になる",
		kana: "あきははだがびんかんになる",
		romaji: "a'kihaahada'gabbinkannninaru",
	},
	{
		jp: "季節の変わり目は肌荒れしやすい",
		kana: "きせつのかわりめははだあれしやすい",
		romaji: "kisetsu'no'kawarimaha'hada'areshiyasui",
	},
	{
		jp: "敏感肌でも使える化粧品",
		kana: "びんかんはだでもつかえるけしょうひん",
		romaji: "binkan'hadademotsukaeru'keshouhin",
	},
	{
		jp: "化粧品のかぶれを防ぐ",
		kana: "けしょうひんのかぶれをふせぐ",
		romaji: "keshouhin'no'kaburawofusegu",
	},
	{
		jp: "肌に合わない製品を避ける",
		kana: "はだにあわないせいひんをさけける",
		romaji: "hadaniaana'wanaaseihinnwossakeru",
	},
	{
		jp: "皮膚科医に相談して製品を選ぶ",
		kana: "ひふかいにそうだんしてせいひんをえらぶ",
		romaji: "hifukaniniso'u'danshiteseihinnwoerabuu",
	},
	{
		jp: "パッチテストで確認する",
		kana: "ぱっちてすとでかくにんする",
		romaji: "patchitesutodeakukinninsuru",
	},
	{
		jp: "エステで顔のケアをする",
		kana: "えすてでかおのけあをする",
		romaji: "esutedekao'no'kea'wosuru",
	},
	{
		jp: "フェイシャルマッサージで血行を良くする",
		kana: "ふぇいしゃるまっさーじでけつこうをよくする",
		romaji: "fei'sharuma'ssa'ajideketsuko'u'woyokusuru",
	},
	{
		jp: "美容皮膚科で施術を受ける",
		kana: "びようひふかでしじゅつをうける",
		romaji: "biyo'u'hifukadesshijutsuwou'keru",
	},
	{
		jp: "プロの美容家にアドバイスをもらう",
		kana: "ぷろのびようかにあどばいすをもらう",
		romaji: "puro'no'biyo'u'kaniad'obaaisuwomora'u",
	},
	{
		jp: "定期的なスキンケア診断",
		kana: "ていきてきなすきんけあしんだん",
		romaji: "teikitekina'sukinkea'sshinndan",
	},
	{
		jp: "十分な睡眠は肌に良い",
		kana: "じゅうぶんなすいみんははだによい",
		romaji: "ju'u'bun'na'suiminnhahadaniyo'i",
	},
	{
		jp: "水をたくさん飲んで肌を潤す",
		kana: "みずをたくさんのんではだをうるおす",
		romaji: "mizuo'takusan'no'ndehadawouruosu",
	},
	{
		jp: "食事で肌に栄養を与える",
		kana: "しょくじではだにえいようをあたえる",
		romaji: "shokujidehadanieiyo'u'woa'atae'ru",
	},
	{
		jp: "運動で血行を改善する",
		kana: "うんどうでけつこうをかいぜんする",
		romaji: "u'ndo'u'deketsuko'u'woka'izen'suru",
	},
	{
		jp: "ストレスは肌に悪い",
		kana: "すとれすははだにわるい",
		romaji: "sutoressuhhadaniwarui",
	},
	{
		jp: "乳液とクリームの違いがわかる",
		kana: "にゅうえきとくりーむのちがいがわかる",
		romaji: "nyu'u'ekitokuriimu'no'chigaigawakaru",
	},
	{
		jp: "トナーで肌を整える",
		kana: "となーではだをととのえる",
		romaji: "tona'adehadawoto'to'no'eru",
	},
	{
		jp: "ローションのみでケアは足りない",
		kana: "ろーしょんのみでけあはたりない",
		romaji: "ro'u'shonnno'midekea'hatarina'i",
	},
	{
		jp: "セラムは浸透力が高い",
		kana: "せらむはしんとうりょくがたかい",
		romaji: "seramu'hashinto'u'ryokugata'kai",
	},
	{
		jp: "ジェルクリームは軽いテクスチャー",
		kana: "じぇるくりーむはかるいてくすちゃー",
		romaji: "jerukkuriimuhakaruitextouchya'a",
	},
	{
		jp: "韓国コスメが人気である",
		kana: "かんこくこすめがにんきである",
		romaji: "kan'koku'kosumeganninkidea'ru",
	},
	{
		jp: "日本の化粧品は品質が良い",
		kana: "にほんのけしょうひんはひんしつがよい",
		romaji: "nihon'no'keshouhinhaahinnshitsugayo'i",
	},
	{
		jp: "デパコスは高級だけど良い",
		kana: "でぱこすはこうきゅうだけどよい",
		romaji: "depakosuhaako'u'kyu'u'dakedo'yo'i",
	},
	{
		jp: "プチプラで質の良い製品を探す",
		kana: "ぷちぷらでしつのよいせいひんをさがす",
		romaji: "puchipuradeshitsu'no'yo'iseihinnwosagasu",
	},
	{
		jp: "SNSで話題の化粧品を試す",
		kana: "えすえぬえすでわだいのけしょうひんをためす",
		romaji: "esuenuesudewaadai'no'keshohinnwotamiesu",
	},
	{
		jp: "化粧品は冷暗所に保管する",
		kana: "けしょうひんはれいあんしょにほかんする",
		romaji: "keshohinnharei'ansho'niho'kan'suru",
	},
	{
		jp: "開封後は三ヶ月で使い切る",
		kana: "かいふうごはさんかげつでつかいきる",
		romaji: "kaifu'u'gohassan'kagetudetsuaikiru",
	},
	{
		jp: "化粧品の有効期限を確認する",
		kana: "けしょうひんのゆうこうきげんをかくにんする",
		romaji: "keshouhin'no'yu'u'ko'u'kigenwoakukinninsuru",
	},
	{
		jp: "冷蔵庫で化粧品を保管する必要はない",
		kana: "れいぞうこでけしょうひんをほかんするひつようはない",
		romaji: "rei'zo'u'kodekeshouhinwohohkan'suruitsuyou'hanai",
	},
	{
		jp: "容器は清潔に保つ",
		kana: "ようきはせいけつにたもつ",
		romaji: "yo'u'kihaseiketsunnitamotsu",
	},
	{
		jp: "スキンケアの効果は一週間で出る",
		kana: "すきんけあのこうかはいっしゅうかんででる",
		romaji: "sukinnkea'no'ko'u'kahaisshu'u'kandederu",
	},
	{
		jp: "毎日ケアを続けた結果",
		kana: "まいにちけあをつづけたけっか",
		romaji: "mainichikea'wotsuduketa'kekka",
	},
	{
		jp: "肌がきれいになった",
		kana: "はだがきれいになった",
		romaji: "hadagakireinarreta",
	},
	{
		jp: "化粧乗りが良くなる",
		kana: "けしょうのりがよくなる",
		romaji: "keshouno'rigayokunaru",
	},
	{
		jp: "肌の透明度が上がった",
		kana: "はだのとうめいどがあがった",
		romaji: "hadano'to'u'meidogaa'gatta",
	},
	{
		jp: "化粧水は手でつけるより効果的",
		kana: "けしょうすいはてでつけるよりこうかてき",
		romaji: "keshousuihatede'tsukeruyo'rikoukaateki",
	},
	{
		jp: "シートマスクは冷蔵庫で冷やす",
		kana: "しーとまっくはれいぞうこでひやす",
		romaji: "shi'itomasu'kuharei'zo'u'kodehiyasu",
	},
	{
		jp: "朝のメイク前に保湿クリーム",
		kana: "あさのめいくまえにほしつくりーむ",
		romaji: "asano'meikuma'eniahoshitsukuriimu",
	},
	{
		jp: "メイク直しには吸油紙を使う",
		kana: "めいくなおしにはきゅうゆしをつかう",
		romaji: "meikuna'oshinihakyu'u'yushiwotsukau",
	},
	{
		jp: "夜間のスキンケアは時間をかけて",
		kana: "やかんのすきんけあはじかんをかけて",
		romaji: "yakan'no'sukinnkea'haajikannwokakete",
	},
	{
		jp: "高い化粧品が必ずいいわけではない",
		kana: "たかいけしょうひんがかならずいいわけではない",
		romaji: "taka'ikeshohinnggaka'naruZuii'wakeddha'nai",
	},
	{
		jp: "自分の肌に合った製品を選ぶ",
		kana: "じぶんのはだにあったせいひんをえらぶ",
		romaji: "jibunn'no'hadaniaatta'seihinnwoerabuu",
	},
	{
		jp: "コスパが良い化粧品を探す",
		kana: "こすぱがよいけしょうひんをさがす",
		romaji: "kosupagayo'ikeshohinnwosagasu",
	},
	{
		jp: "サンプルでお試しする",
		kana: "さんぷるでおためしする",
		romaji: "sanpurudeota'meshisuru",
	},
	{
		jp: "セールで安く買う",
		kana: "せーるでやすくかう",
		romaji: "se'u'rudeayasukuka'u",
	},
	{
		jp: "混合肌のスキンケアは難しい",
		kana: "こんごうはだのすきんけあはむずかしい",
		romaji: "kon'go'u'hadano'sukinnkea'hamuZukazhi",
	},
	{
		jp: "Tゾーンは脂っぽい",
		kana: "てぃーぞーんはあぶらっぽい",
		romaji: "ti'i'zo'u'nhaabura'ppoi",
	},
	{
		jp: "頬は乾燥している",
		kana: "ほおはかんそうしている",
		romaji: "ho'o'haakan'so'u'shite'iru",
	},
	{
		jp: "部分ケアで対応する",
		kana: "ぶぶんけあでたいおうする",
		romaji: "bubun'kea'detai'o'u'suru",
	},
	{
		jp: "朝と夜でケア製品を変える",
		kana: "あさとよるでけあせいひんをかえる",
		romaji: "asatoyorudeakea'seihinnwokae'ru",
	},
	{
		jp: "肌の保護膜を守ることが重要",
		kana: "はだのほごまくをまもることがじゅうよう",
		romaji: "hadano'hogomakuwomamoru'kotogajuu'yo'u",
	},
	{
		jp: "アルコール成分は避ける人も多い",
		kana: "あるこーるせいぶんはさけけるひともおおい",
		romaji: "arukoruseibun'hassakeru'hitomoo'o'i",
	},
	{
		jp: "香料は肌を刺激することもある",
		kana: "こうりょうははだをしげきすることもある",
		romaji: "ko'u'ryo'u'hahadawoshigekisurukotomoa'ru",
	},
	{
		jp: "デリケートゾーンのケアも大事",
		kana: "でりけーとぞーんのけあもだいじ",
		romaji: "deri'ke'tozoonno'kea'modaji",
	},
	{
		jp: "ボディソープで全身を洗う",
		kana: "ぼでぃそーぷでぜんしんをあらう",
		romaji: "bodi'so'u'pudezennshinwoa'rau",
	},
	{
		jp: "背中のニキビ対策をする",
		kana: "せなかのにきびたいさくをする",
		romaji: "senaka'no'nikibita'isa'kuwosuru",
	},
	{
		jp: "美白ケアで顔のくすみを取る",
		kana: "びはくけあでかおのくすみをとる",
		romaji: "bihakukea'dekao'no'kusumiwotoru",
	},
	{
		jp: "透明肌を目指すなら毎日のケア",
		kana: "とうめいはだをめざすならまいにちのけあ",
		romaji: "to'u'meihda'womeazusunaramainichino'kea'",
	},
	{
		jp: "アンチエイジングは若いうちから",
		kana: "あんちえいじんぐはわかいうちから",
		romaji: "ancheiijinguhawaka'i'uchikara",
	},
	{
		jp: "肌トラブルは早めに対処する",
		kana: "はだとらぶるはやめにたいしょする",
		romaji: "hadatoraburu'hayameniita'isho'suru",
	},
	{
		jp: "ニキビ跡を薄くする方法",
		kana: "にきびあとをうすくするほうほう",
		romaji: "nikibia'towousukusuruho'u'ho'u",
	},
	{
		jp: "シミをカバーするコンシーラー",
		kana: "しみをかばーするこんしーらー",
		romaji: "shimi'woka'ba'surukonshi'ra'a",
	},
	{
		jp: "そばかすをハイライトで目立たなくする",
		kana: "そばかすをはいらいとでめだたなくする",
		romaji: "sobakasu'wohaiqa'itodemedatanakusuru",
	},
	{
		jp: "肌質改善には定期的なケアが必須",
		kana: "はだしつかいぜんにはていきてきなけあがひっす",
		romaji: "hadashitssukaizen'nihateikitekina'kea'gahissu",
	},
	{
		jp: "美容家の推奨する製品は信頼できる",
		kana: "びようかのすいしょうするせいひんはしんらいできる",
		romaji: "biyo'u'kano'suisho'u'suruseihinnhashinraidekiru",
	},
	{
		jp: "クレンジング後は必ず乳液をつける",
		kana: "くれんじんぐご後にはかならずにゅうえきをつける",
		romaji: "kurennjingu'go'nohahaka'naruzunyuu'ekiwotsukeru",
	},
	{
		jp: "毛穴ケアは週に一回スペシャルケア",
		kana: "けあなけあはしゅうにいっかいすぺしゃるけあ",
		romaji: "kena'kea'hashu'u'niitokaisupesha'ru'kea'",
	},
	{
		jp: "肌タイプに合わせたスキンケア選び",
		kana: "はだたいぷにあわせたすきんけあえらび",
		romaji: "hadataipuninawaseta'sukinnkea'eraabi",
	},
	{
		jp: "角質層を傷つけずに優しく洗う",
		kana: "かくしつそうをきずつけずにやさしくあらう",
		romaji: "kakushitsuso'u'wokizutsukeuzuniyashashikua'rau",
	},
	{
		jp: "保湿成分が浸透するまで待つ",
		kana: "ほしつせいぶんがしんとうするまでまつ",
		romaji: "hoshitsuseibun'gashinto'u'surumaade'matsu",
	},
	{
		jp: "ベースとなる保湿をしっかりする",
		kana: "べーすとなるほしつをしっかりする",
		romaji: "be'sutonaru'hoshitsuwoshikkari'suru",
	},
	{
		jp: "レイヤリング技法でケアの効果を高める",
		kana: "れいやりんぐぎほうでけあのこうかをたかめる",
		romaji: "reiyaringugihoudekea'no'ko'u'kawoatakameru",
	},
	{
		jp: "気候に合わせたスキンケアの調整",
		kana: "きこうにあわせたすきんけあのちょうせい",
		romaji: "kiko'u'ninawaseta'sukinnkea'no'cho'u'sei",
	},
	{
		jp: "定期的に新しい製品を試す勇気",
		kana: "ていきてきにあたらしいせいひんをためすゆうき",
		romaji: "teikiteki'niatarashii'seihinnwotamaesu'yu'u'ki",
	},
	{
		jp: "肌の改善を焦らず待つ忍耐強さ",
		kana: "はだのかいぜんをあせらずまつにんたいつよさ",
		romaji: "hadano'kaizen'woa'sserazumatsu'ninntai'tsuyosa",
	},
	{
		jp: "オイルと水の乳化で浸透を促進",
		kana: "おいるとみずのにゅうかでしんとうをそくしん",
		romaji: "oi'ruatomizuno'nyu'u'kadesshinto'u'woso'kushin",
	},
	{
		jp: "肌の常在菌を守るスキンケア",
		kana: "はだのじょうざいきんをまもるすきんけあ",
		romaji: "hadano'jo'u'zaikin'womamoru'sukinnkea'",
	},
	{
		jp: "美容に関する情報を正しく選別する",
		kana: "びようにかんするじょうほうをただしくせんべつする",
		romaji: "biyo'u'nikannsuru'jo'u'ho'u'wotadashikusenbetusu'ru",
	},
	{
		jp: "肌の変化をジャーナリングで記録する",
		kana: "はだのへんかをじゃーなりんぐできろくする",
		romaji: "hadano'henchaa'woja'a'naringudekkirokusuru",
	},
	{
		jp: "夜間の回復力を引き出すナイトケア",
		kana: "やかんのかいふくりょくをひきだすないときあ",
		romaji: "yakan'no'kaifukuryokuwohikidasu'nai'tokea'",
	},
	{
		jp: "UVケアと保湿を両立させる工夫",
		kana: "ゆーぶいけあとほしつをりょうりつさせるくふう",
		romaji: "yu'u'buikea'toto'hoshitsuworyou'ritsusaserukufu'u",
	},
	{
		jp: "化粧品成分を理解することが大事",
		kana: "けしょうひんせいぶんをりかいすることがだいじ",
		romaji: "keshohinnseibun'woriikai'surukotagadaji",
	},
	{
		jp: "好転反応を知ることで焦らない",
		kana: "こうてんはんのうをしることであせらない",
		romaji: "ko'u'tenhan'no'u'woshirukotodea'sserana'i",
	},
	{
		jp: "スキンケアルーティンを楽しむ時間",
		kana: "すきんけあるーてぃんをたのしむじかん",
		romaji: "sukinnkea'ru'u'tei'nwotano'shimujikan",
	},
	{
		jp: "肌への優しさが長く続く秘訣",
		kana: "はだへのやさしさがながくつづくひけつ",
		romaji: "hadahe'no'yashashsagana'gakutsuzuku'hiketu",
	},
	{
		jp: "成分研究を通じてスキンケアを深く知る",
		kana: "せいぶんけんきゅうをつうじてすきんけあをふかくしる",
		romaji: "seibun'ken'kyu'u'wotsuu'jitesukinnkea'wofukakushiru",
	},
	{
		jp: "美は一日にしてならず毎日の積み重ね",
		kana: "びはいちにちにしてならずまいにちのつみかさね",
		romaji: "bihaichinnichini'shitenarazu'mainichino'tsumikasane",
	},
	{
		jp: "自分の肌と向き合うセルフケア意識",
		kana: "じぶんのはだとむきあうせるふけあいしき",
		romaji: "jibunn'no'hadatomuki'a'u'seru'fukea'ishiki",
	},
	{
		jp: "肌の状態を常にチェックする習慣",
		kana: "はだのじょうたいをつねにちぇっくするしゅうかん",
		romaji: "hadano'jo'u'taiwotsu'nenicchekku'surushu'u'kan",
	},
	{
		jp: "新しい成分への興味を持ちながらケア",
		kana: "あたらしいせいぶんへのきょうみをもちながらけあ",
		romaji: "atarashii'seibun'he'no'kyo'u'miwomochinagarakea'",
	},
	{
		jp: "肌トラブルから学ぶスキンケアの知恵",
		kana: "はだとらぶるからまなぶすきんけあのちえ",
		romaji: "hadatoraburu'karamanabusukinnkea'no'chie'",
	},
	{
		jp: "季節ごとにスキンケアを見直す重要性",
		kana: "きせつごとにすきんけあをみなおすじゅうようせい",
		romaji: "kisetsuagotoni'sukinnkea'wominao'sujuu'yo'u'sei",
	},
	{
		jp: "自然な美しさを引き出すスキンケア",
		kana: "しぜんなうつくしさをひきだすすきんけあ",
		romaji: "shizen'na'utsukushsa'wohikidasu'sukinnkea'",
	},
	{
		jp: "肌の健康が最優先のケア哲学",
		kana: "はだのけんこうがさいゆうせんのけあてつがく",
		romaji: "hadano'ken'ko'u'gasai'yu'u'sen'no'kea'tetsugaku",
	},
	{
		jp: "緑茶が好きです。",
		kana: "りょくちゃがすきです",
		romaji: "ryokuchadasukidesu",
	},
	{
		jp: "毎朝紅茶を飲みます。",
		kana: "まいあさこうちゃをのみます",
		romaji: "maiasากōchawonomimaս",
	},
	{
		jp: "温かい麦茶をください。",
		kana: "あたたかいむぎちゃをください",
		romaji: "ataatakaimugichwakudasai",
	},
	{
		jp: "お茶の時間です。",
		kana: "おちゃのじかんです",
		romaji: "ochanojikanudesu",
	},
	{
		jp: "抹茶が大好きです。",
		kana: "まっちゃがだいすきです",
		romaji: "matchwagadaisukidesu",
	},
	{
		jp: "ほうじ茶をいただきます。",
		kana: "ほうじちゃをいただきます",
		romaji: "hōjichwaoitadakimaս",
	},
	{
		jp: "玉露は高級なお茶です。",
		kana: "ぎょくろはこうきゅうなおちゃです",
		romaji: "gyokurohakōkyūnaochadesu",
	},
	{
		jp: "烏龍茶が好きですか。",
		kana: "うーろんちゃがすきですか",
		romaji: "ūronchwagasukidesuka",
	},
	{
		jp: "冷たいお茶が飲みたい。",
		kana: "ひえたいおちゃがのみたい",
		romaji: "hiataiiochaganomitai",
	},
	{
		jp: "お茶を淹れてください。",
		kana: "おちゃをいれてください",
		romaji: "ochawaireteкudasai",
	},
	{
		jp: "朝コーヒーを飲みます。",
		kana: "あさこーひーをのみます",
		romaji: "asakōhīwonomimaս",
	},
	{
		jp: "ホットコーヒーをください。",
		kana: "ほっとこーひーをください",
		romaji: "hottokōhīwokudaսai",
	},
	{
		jp: "アイスコーヒーが好き。",
		kana: "あいすこーひーがすき",
		romaji: "aisuकōhīgasuki",
	},
	{
		jp: "黒いコーヒー飲んで。",
		kana: "くろいこーひーのんで",
		romaji: "kuroikōhīnonde",
	},
	{
		jp: "コーヒーショップへ行く。",
		kana: "こーひーしょっぷへいく",
		romaji: "kōhīshoppuheiкu",
	},
	{
		jp: "カフェインが入っている。",
		kana: "かふぇいんがはいっている",
		romaji: "kafuein'gahaitteiru",
	},
	{
		jp: "深煎りコーヒーが好き。",
		kana: "ふかいりこーひーがすき",
		romaji: "fukairiकōhīgasuki",
	},
	{
		jp: "スペシャルティコーヒー好き。",
		kana: "すぺしゃるてぃこーひーすき",
		romaji: "supesharuteiこhīsuki",
	},
	{
		jp: "コーヒーを毎日飲む。",
		kana: "こーひーをまいにちのむ",
		romaji: "kōhīwomainichonomu",
	},
	{
		jp: "コーヒーは体に良い。",
		kana: "こーひーはからだにいい",
		romaji: "kōhīhakaradaniіі",
	},
	{
		jp: "水を飲んでください。",
		kana: "みずをのんでください",
		romaji: "mizuwonondekudaսai",
	},
	{
		jp: "炭酸水が好きです。",
		kana: "たんさんすいがすきです",
		romaji: "tansansuigasukidεsu",
	},
	{
		jp: "冷たい水をください。",
		kana: "ひえたいみずをください",
		romaji: "hiataimimizwokudaսai",
	},
	{
		jp: "温かい水が飲みたい。",
		kana: "あたたかいみずがのみたい",
		romaji: "atatakaiмizuganomitai",
	},
	{
		jp: "ジュースが好きですか。",
		kana: "じゅーすがすきですか",
		romaji: "jūsugasukidesuka",
	},
	{
		jp: "オレンジジュースをください。",
		kana: "おれんじじゅーすをください",
		romaji: "orenjijūsokudaսai",
	},
	{
		jp: "アップルジュース飲みます。",
		kana: "あっぷるじゅーすのみます",
		romaji: "appurujūsunomimaս",
	},
	{
		jp: "グレープフルーツジュース好き。",
		kana: "ぐれーぷふるーつじゅーすすき",
		romaji: "gurēpufurūtsujūsusuki",
	},
	{
		jp: "トマトジュース体に良い。",
		kana: "ともとじゅーすからだにいい",
		romaji: "tomatojūsugakaradanііі",
	},
	{
		jp: "ソーダ水が好きです。",
		kana: "そーだみずがすきです",
		romaji: "sōdamizugasukidεsu",
	},
	{
		jp: "牛乳を飲みます。",
		kana: "ぎゅうにゅうをのみます",
		romaji: "gyūnyūwonomimaս",
	},
	{
		jp: "冷たい牛乳が好き。",
		kana: "ひえたいぎゅうにゅうがすき",
		romaji: "hiataigugyūnyūgasuki",
	},
	{
		jp: "温かい牛乳飲んで。",
		kana: "あたたかいぎゅうにゅうのんで",
		romaji: "ataatakaigyūnyūnonde",
	},
	{
		jp: "ヨーグルトドリンク好き。",
		kana: "よーぐるとどりんくすき",
		romaji: "yōgurutodorinkusuki",
	},
	{
		jp: "ホットミルクをください。",
		kana: "ほっとみるくをください",
		romaji: "hottomirukwokudaսai",
	},
	{
		jp: "フレッシュミルク飲みたい。",
		kana: "ふれっしゅみるくのみたい",
		romaji: "fureshhumirkunomitai",
	},
	{
		jp: "練乳入りの飲み物好き。",
		kana: "れんにゅうはいりののみものすき",
		romaji: "rennyūhairinnonomimonsuki",
	},
	{
		jp: "豆乳が体に良い。",
		kana: "とうにゅうがからだにいい",
		romaji: "tōnyūgakaradaniіі",
	},
	{
		jp: "バナナミルク飲みます。",
		kana: "ばななみるくのみます",
		romaji: "bananamirkunomimaս",
	},
	{
		jp: "イチゴミルク好きです。",
		kana: "いちごみるくすきです",
		romaji: "ichigomirukusukidesu",
	},
	{
		jp: "ビールが好きです。",
		kana: "びーるがすきです",
		romaji: "bīrugasukidesu",
	},
	{
		jp: "冷えたビール飲みたい。",
		kana: "ひえたびーるのみたい",
		romaji: "hiatabīrunomitai",
	},
	{
		jp: "生ビール最高です。",
		kana: "なまびーるさいこうです",
		romaji: "namabīrusaikōdesu",
	},
	{
		jp: "ビールは夏に合う。",
		kana: "びーるはなつにあう",
		romaji: "bīruhanaatsuniјau",
	},
	{
		jp: "黒ビールが好き。",
		kana: "くろびーるがすき",
		romaji: "kurobīrugasuki",
	},
	{
		jp: "ライトビール飲みます。",
		kana: "らいとびーるのみます",
		romaji: "raitobīrunomimaս",
	},
	{
		jp: "ビールの泡が好き。",
		kana: "びーるのあわがすき",
		romaji: "bīrnnoawagasuki",
	},
	{
		jp: "ビールをもう一杯。",
		kana: "びーるをもういっぱい",
		romaji: "bīrwomouippai",
	},
	{
		jp: "ビールと枝豆最高。",
		kana: "びーるとえだまめさいこう",
		romaji: "bīrtoeдamaesuaikō",
	},
	{
		jp: "ビールで乾杯しよう。",
		kana: "びーるでかんぱいしよう",
		romaji: "bīrdekanpaisho",
	},
	{
		jp: "日本酒が好きです。",
		kana: "にほんしゅがすきです",
		romaji: "nihonshugasukidesu",
	},
	{
		jp: "冷たい日本酒飲みたい。",
		kana: "ひえたにほんしゅのみたい",
		romaji: "hiatanihonshunomitai",
	},
	{
		jp: "熱い日本酒いいよ。",
		kana: "あついにほんしゅいいよ",
		romaji: "atsuinihonshūіīyo",
	},
	{
		jp: "大吟醸が好きですか。",
		kana: "だいぎんじょうがすきですか",
		romaji: "daiginjōgasukidesuka",
	},
	{
		jp: "純米酒飲みます。",
		kana: "じゅんまいしゅのみます",
		romaji: "junmaishunomimaս",
	},
	{
		jp: "本醸造酒が良い。",
		kana: "ほんじょうぞうしゅがいい",
		romaji: "honjōzōushugaiі",
	},
	{
		jp: "甘口日本酒好き。",
		kana: "あまくちにほんしゅすき",
		romaji: "amakuchinihonshusuki",
	},
	{
		jp: "辛口日本酒飲みたい。",
		kana: "からくちにほんしゅのみたい",
		romaji: "karakuchinihonshunomitai",
	},
	{
		jp: "日本酒は冬に合う。",
		kana: "にほんしゅはふゆにあう",
		romaji: "nihonshuhafuyuniјau",
	},
	{
		jp: "日本酒で酔いました。",
		kana: "にほんしゅでよいました",
		romaji: "nihonshudeyoimashita",
	},
	{
		jp: "焼酎が好きです。",
		kana: "しょうちゅうがすきです",
		romaji: "shōchūgasukidesu",
	},
	{
		jp: "麦焼酎飲みますか。",
		kana: "むぎしょうちゅうのみますか",
		romaji: "mugishōchūnomimasuka",
	},
	{
		jp: "芋焼酎が好き。",
		kana: "いもしょうちゅうがすき",
		romaji: "imoshōchūgasuki",
	},
	{
		jp: "黒麹焼酎最高。",
		kana: "くろこうじしょうちゅうさいこう",
		romaji: "kurokōjishōchūsaikō",
	},
	{
		jp: "焼酎をお湯で割る。",
		kana: "しょうちゅうをおゆでわる",
		romaji: "shōchūwooyu dewaru",
	},
	{
		jp: "焼酎とソーダ水好き。",
		kana: "しょうちゅうとそーだみずすき",
		romaji: "shōchūtosōdamizusuki",
	},
	{
		jp: "焼酎オンザロック飲む。",
		kana: "しょうちゅうおんざろっくのむ",
		romaji: "shōchūonzaロkkuいnomu",
	},
	{
		jp: "焼酎は夏に飲む。",
		kana: "しょうちゅうはなつにのむ",
		romaji: "shōchūhanatsuni nomu",
	},
	{
		jp: "焼酎で乾杯です。",
		kana: "しょうちゅうでかんぱいです",
		romaji: "shōchūdekanпaiイです",
	},
	{
		jp: "焼酎飲みすぎました。",
		kana: "しょうちゅうのみすぎました",
		romaji: "shōchūnomisugimashita",
	},
	{
		jp: "ワインが好きです。",
		kana: "わいんがすきです",
		romaji: "waingasukidesu",
	},
	{
		jp: "赤ワイン好きですか。",
		kana: "あかわいんすきですか",
		romaji: "akawain sukidesuka",
	},
	{
		jp: "白ワイン飲みます。",
		kana: "しろわいんのみます",
		romaji: "shirowainnoмimaս",
	},
	{
		jp: "フルボディワイン好き。",
		kana: "ふるぼでぃわいんすき",
		romaji: "furubodiwaiн suki",
	},
	{
		jp: "ワインは食事に合う。",
		kana: "わいんはしょくじにあう",
		romaji: "wainhashokujiniјau",
	},
	{
		jp: "スパークリングワイン飲みたい。",
		kana: "すぱーくりんぐわいんのみたい",
		romaji: "supā kuringuwaiנnomitai",
	},
	{
		jp: "デザートワイン好きです。",
		kana: "でざーとわいんすきです",
		romaji: "dezā towainєukidesu",
	},
	{
		jp: "オーガニックワイン飲む。",
		kana: "おーがにっくわいんのむ",
		romaji: "ōganikkuwainnomu",
	},
	{
		jp: "ワインをグラスで飲む。",
		kana: "わいんをぐらすでのむ",
		romaji: "wainwogurasudenomu",
	},
	{
		jp: "ワインテイスティング好き。",
		kana: "わいんていすてぃんぐすき",
		romaji: "wainteisutingu suki",
	},
	{
		jp: "ウイスキーが好きです。",
		kana: "ういすきーがすきです",
		romaji: "uisukīgasukidesu",
	},
	{
		jp: "ジャパニーズウイスキー飲む。",
		kana: "じゃぱにーずういすきーのむ",
		romaji: "japanízu uisukīnomu",
	},
	{
		jp: "ハイボール飲みたい。",
		kana: "はいぼーるのみたい",
		romaji: "haibōru nomitai",
	},
	{
		jp: "ウイスキーオンザロック好き。",
		kana: "ういすきーおんざろっくすき",
		romaji: "uisukī onzaроkkusuki",
	},
	{
		jp: "ウイスキーソーダ最高。",
		kana: "ういすきーそーださいこう",
		romaji: "uisukīsōdasaikō",
	},
	{
		jp: "ジンが好きですか。",
		kana: "じんがすきですか",
		romaji: "jinngasukidesuka",
	},
	{
		jp: "ジントニック飲みます。",
		kana: "じんとにっくのみます",
		romaji: "jintonikkunoминaս",
	},
	{
		jp: "ラムコーラ飲みたい。",
		kana: "らむこーらのみたい",
		romaji: "ramukōranoмitai",
	},
	{
		jp: "ウォッカが好き。",
		kana: "うぉっかがすき",
		romaji: "wokka gasuki",
	},
	{
		jp: "テキーラショット飲む。",
		kana: "てきーらしょっとのむ",
		romaji: "tekīrashottonomu",
	},
	{
		jp: "シャンパン飲みたい。",
		kana: "しゃんぱんのみたい",
		romaji: "shanpan nomitai",
	},
	{
		jp: "スパークリングワイン好きです。",
		kana: "すぱーくりんぐわいんすきです",
		romaji: "supā kuringuwain sukidesu",
	},
	{
		jp: "カクテル飲みますか。",
		kana: "かくてるのみますか",
		romaji: "kakuteru nommasuka",
	},
	{
		jp: "マルガリータ好き。",
		kana: "まるがりーたすき",
		romaji: "margarīta suki",
	},
	{
		jp: "モヒート飲みたい。",
		kana: "もひーとのみたい",
		romaji: "mohīto nomitai",
	},
	{
		jp: "キューバリブレ飲みます。",
		kana: "きゅーばりぶれのみます",
		romaji: "kyūbarίブ renoминaս",
	},
	{
		jp: "ダイキリ好きですね。",
		kana: "だいきりすきですね",
		romaji: "daikirisukidesune",
	},
	{
		jp: "ロングアイランドアイスティー。",
		kana: "ろんぐあいらんどあいすてぃー",
		romaji: "rongu airano daisuтtī",
	},
	{
		jp: "ピニャコラーダ飲みたい。",
		kana: "ぴにゃころーだのみたい",
		romaji: "pinyakorōda nomitai",
	},
	{
		jp: "ブルーラグーン好き。",
		kana: "ぶるーらぐーんすき",
		romaji: "burū ragūn suki",
	},
	{
		jp: "飲み物が好きです。",
		kana: "のみものがすきです",
		romaji: "nominonoгasukidesu",
	},
	{
		jp: "乾杯しましょう。",
		kana: "かんぱいしましょう",
		romaji: "kanpaishasho",
	},
	{
		jp: "一杯飲みますか。",
		kana: "いっぱいのみますか",
		romaji: "ippai nominmasuka",
	},
	{
		jp: "もう一杯いかがですか。",
		kana: "もういっぱいいかがですか",
		romaji: "mou ippai ikagadesuka",
	},
	{
		jp: "飲み放題が好き。",
		kana: "のみほうだいがすき",
		romaji: "nomihōdai gasuki",
	},
	{
		jp: "居酒屋へ行く。",
		kana: "いざかやへいく",
		romaji: "izakaya heiaku",
	},
	{
		jp: "飲み会の約束有る。",
		kana: "のみかいのやくそくある",
		romaji: "nominkai no yakusoku aru",
	},
	{
		jp: "飲酒運転は危ない。",
		kana: "いんしゅうんてんはあぶない",
		romaji: "inshūunten wa abunai",
	},
	{
		jp: "適度に飲むが良い。",
		kana: "てきどにのむがよい",
		romaji: "tekido ni nomu ga yoi",
	},
	{
		jp: "お酒は百薬の長。",
		kana: "おさけはひゃくやくのちょう",
		romaji: "osake wa hyakuyaku no chō",
	},
	{
		jp: "甘い飲み物好きです。",
		kana: "あまいのみものすきです",
		romaji: "amai nominono sukidesu",
	},
	{
		jp: "酸っぱい飲み物飲む。",
		kana: "すっぱいのみものnomu",
		romaji: "suppai nominono nomu",
	},
	{
		jp: "苦い飲み物が好き。",
		kana: "にがいのみものがすき",
		romaji: "nigai nominono gasuki",
	},
	{
		jp: "辛い飲み物飲みたい。",
		kana: "からいのみもののみたい",
		romaji: "karai nominono nomitai",
	},
	{
		jp: "炭酸飲料が好きです。",
		kana: "たんさんいんりょうがすきです",
		romaji: "tansan inryō gasukidesu",
	},
	{
		jp: "無炭酸飲料飲みます。",
		kana: "むたんさんいんりょうのみます",
		romaji: "mu tansan inryō nominaս",
	},
	{
		jp: "スポーツドリンク好き。",
		kana: "すぽーつどりんくすき",
		romaji: "supō tsu dorinku suki",
	},
	{
		jp: "エナジードリンク飲みます。",
		kana: "えなじードリンクのみます",
		romaji: "enaį dorinku nominaս",
	},
	{
		jp: "フルーツ飲料が好きです。",
		kana: "ふるーついんりょうすきです",
		romaji: "furū tsu inryō sukidesu",
	},
	{
		jp: "野菜ジュース飲みます。",
		kana: "やさいじゅーすのみます",
		romaji: "yasai jūsu nominaս",
	},
	{
		jp: "温かい飲み物好き。",
		kana: "あたたかいのみものすき",
		romaji: "atataka nominono suki",
	},
	{
		jp: "ココア飲みたいです。",
		kana: "ここあのみたいです",
		romaji: "kokoa nomitai desu",
	},
	{
		jp: "ホットチョコレート飲む。",
		kana: "ほっとちょこれーとのむ",
		romaji: "hotto chokorē to nomu",
	},
	{
		jp: "そば湯が好きです。",
		kana: "そばゆがすきです",
		romaji: "sobayu gasukidesu",
	},
	{
		jp: "汁粉が好きですか。",
		kana: "しるこがすきですか",
		romaji: "shiruko gasukidesuka",
	},
	{
		jp: "甘酒飲みました。",
		kana: "あまざけのみました",
		romaji: "amazake nominashita",
	},
	{
		jp: "生姜湯好きです。",
		kana: "しょうがゆすきです",
		romaji: "shōga yu sukidesu",
	},
	{
		jp: "ハーブティー飲みたい。",
		kana: "はーぶてぃー のみたい",
		romaji: "hā bu tī nomitai",
	},
	{
		jp: "カモミールティー飲む。",
		kana: "かもみーるてぃーのむ",
		romaji: "kamomī ru tī nomu",
	},
	{
		jp: "ミント茶が好き。",
		kana: "みんとちゃがすき",
		romaji: "minto cha gasuki",
	},
	{
		jp: "冷たい飲み物飲みたい。",
		kana: "ひえたいのみものnoみたい",
		romaji: "hiata nominono nomitai",
	},
	{
		jp: "アイスティー飲みます。",
		kana: "あいすてぃーのみます",
		romaji: "aisутi nominaս",
	},
	{
		jp: "フラッペ飲みたいです。",
		kana: "ふらっぺのみたいです",
		romaji: "furappe nomitai desu",
	},
	{
		jp: "スムージー飲みます。",
		kana: "すむーじーのみます",
		romaji: "sumūjī nominaս",
	},
	{
		jp: "フロートが好きです。",
		kana: "ふろーとがすきです",
		romaji: "furōto gasukidesu",
	},
	{
		jp: "シェイク飲みたい。",
		kana: "しぇいくのみたい",
		romaji: "sheiku nomitai",
	},
	{
		jp: "冷たいジュース好き。",
		kana: "ひえたいじゅーすすき",
		romaji: "hiata jūsu suki",
	},
	{
		jp: "アイスコーヒー飲みます。",
		kana: "あいすこーひーのみます",
		romaji: "aisu kōhī nominaս",
	},
	{
		jp: "ラッシー飲みたいです。",
		kana: "らっしーのみたいです",
		romaji: "rasshī nomitai desu",
	},
	{
		jp: "タピオカドリンク好き。",
		kana: "たぴおかどりんくすき",
		romaji: "tapioka dorinku suki",
	},
	{
		jp: "朝に飲む飲み物好き。",
		kana: "あさにのむのみものすき",
		romaji: "asa ni nomu nominono suki",
	},
	{
		jp: "昼間飲み物何飲む。",
		kana: "ひるま のみもの なに のむ",
		romaji: "hiruma nominono nani nomu",
	},
	{
		jp: "夜に飲む飲み物好きです。",
		kana: "よるにのむのみものすきです",
		romaji: "yoru ni nomu nominono sukidesu",
	},
	{
		jp: "食事と一緒に飲む。",
		kana: "しょくじといっしょにのむ",
		romaji: "shokuji to issho ni nomu",
	},
	{
		jp: "寝る前に温かい飲み物。",
		kana: "ねるまえにあたたかいのみもの",
		romaji: "neru mae ni atataka nominono",
	},
	{
		jp: "運動後の飲み物が好き。",
		kana: "うんどうごののみものがすき",
		romaji: "undō go no nominono gasuki",
	},
	{
		jp: "仕事の後の一杯好き。",
		kana: "しごとのあとのいっぱいすき",
		romaji: "shigoto no ato no ippai suki",
	},
	{
		jp: "会社の飲み会好きです。",
		kana: "かいしゃののみかいすきです",
		romaji: "kaisha no nominkai sukidesu",
	},
	{
		jp: "週末に飲む好きです。",
		kana: "しゅうまつにのむすきです",
		romaji: "shūmatsu ni nomu sukidesu",
	},
	{
		jp: "特別な日に飲む飲み物。",
		kana: "とくべつなひにのむのみもの",
		romaji: "tokubetsu na hi ni nomu nominono",
	},
	{
		jp: "飲んだら気分いい。",
		kana: "のんだらきぶんいい",
		romaji: "nondara kibun iі",
	},
	{
		jp: "飲みすぎた。",
		kana: "のみすぎた",
		romaji: "nomisugita",
	},
	{
		jp: "酔っている状態です。",
		kana: "よっているじょうたいです",
		romaji: "yotteirujōтai desu",
	},
	{
		jp: "二日酔いが辛い。",
		kana: "ふつかよいがつらい",
		romaji: "futsukayoi ga tsurai",
	},
	{
		jp: "飲んで楽しくなった。",
		kana: "のんでたのしくなった",
		romaji: "nonde tanoshikunatta",
	},
	{
		jp: "飲むと眠くなる。",
		kana: "のむとねむくなる",
		romaji: "nomu to neмuku naru",
	},
	{
		jp: "飲んで疲れた。",
		kana: "のんでつかれた",
		romaji: "nonde tsukareta",
	},
	{
		jp: "飲んでリラックス。",
		kana: "のんでりらっくす",
		romaji: "nonde rirakusu",
	},
	{
		jp: "一杯飲むと元気出る。",
		kana: "いっぱいのむとげんきでる",
		romaji: "ippai nomu to genki deru",
	},
	{
		jp: "適量飲むのがいい。",
		kana: "てきりょうのむのがいい",
		romaji: "tekiryō nomu no ga iі",
	},
	{
		jp: "飲み物を準備します。",
		kana: "のみものをじゅんびします",
		romaji: "nominono wo junbi shimasu",
	},
	{
		jp: "冷やしておきますね。",
		kana: "ひやしておきますね",
		romaji: "hiyaشiteoki masu ne",
	},
	{
		jp: "温めますか冷やしますか。",
		kana: "あたためますかひやしますか",
		romaji: "atatame masu ka hiyaשimasu ka",
	},
	{
		jp: "氷入れますか。",
		kana: "こおりいれますか",
		romaji: "kōri iremasuka",
	},
	{
		jp: "飲み物にレモン入れる。",
		kana: "のみものにれもんいれる",
		romaji: "nominono ni remon ireru",
	},
	{
		jp: "砂糖入れてください。",
		kana: "さとういれてください",
		romaji: "satō irete kudasai",
	},
	{
		jp: "ストローください。",
		kana: "すとろーください",
		romaji: "storō kudasai",
	},
	{
		jp: "グラスに入れます。",
		kana: "ぐらすにいれます",
		romaji: "gurasu ni ireมasu",
	},
	{
		jp: "カップで飲みます。",
		kana: "かっぷでのみます",
		romaji: "kappu де nominaս",
	},
	{
		jp: "ボトルで飲もう。",
		kana: "ぼとるでのもう",
		romaji: "botoru دe nomō",
	},
	{
		jp: "甘めの飲み物好き。",
		kana: "あまめののみものすき",
		romaji: "amameno nominono suki",
	},
	{
		jp: "辛めの飲み物飲む。",
		kana: "からめののみものnomu",
		romaji: "karameno nominono nomu",
	},
	{
		jp: "濃い飲み物好きです。",
		kana: "こいのみものすきです",
		romaji: "koi nominono sukidesu",
	},
	{
		jp: "薄い飲み物飲みます。",
		kana: "うすいのみものnoみます",
		romaji: "usui nominono nominaս",
	},
	{
		jp: "冷たいのが好きです。",
		kana: "ひえたいのがすきです",
		romaji: "hiataino ga sukidesu",
	},
	{
		jp: "温かいのが好き。",
		kana: "あたたかいのがすき",
		romaji: "ataatakaiیno ga suki",
	},
	{
		jp: "炭酸のきついのが好き。",
		kana: "たんさんのきついのがすき",
		romaji: "tansan no kitsui no gasuki",
	},
	{
		jp: "無炭酸の方が好きです。",
		kana: "むたんさんのほうがすきです",
		romaji: "mu tansan no hō ga sukidesu",
	},
	{
		jp: "甘過ぎるのは嫌。",
		kana: "あまあませぎるのはいや",
		romaji: "amamasugiru no wa iya",
	},
	{
		jp: "酸っぱすぎるのは嫌。",
		kana: "すっぱすぎるのはいや",
		romaji: "suppasugiru no wa iya",
	},
	{
		jp: "飲み物いかがですか。",
		kana: "のみものいかがですか",
		romaji: "nominono ikaga desuka",
	},
	{
		jp: "何か飲みませんか。",
		kana: "なにかのみませんか",
		romaji: "nanika nominasen ka",
	},
	{
		jp: "一杯飲みましょう。",
		kana: "いっぱいのみましょう",
		romaji: "ippai nominasho",
	},
	{
		jp: "飲み物をご用意します。",
		kana: "のみものをごようういします",
		romaji: "nominono wo goyō ui shimasu",
	},
	{
		jp: "好きな飲み物どうぞ。",
		kana: "すきなのみものどうぞ",
		romaji: "sukina nominono dōzo",
	},
	{
		jp: "何が飲みたいですか。",
		kana: "なにがのみたいですか",
		romaji: "nani ga nomitai desuka",
	},
	{
		jp: "何でもいいですよ。",
		kana: "なんでもいいですよ",
		romaji: "nandemo ii desuyo",
	},
	{
		jp: "すすめの一杯どうぞ。",
		kana: "おすすめのいっぱいどうぞ",
		romaji: "osusume no ippai dōzo",
	},
	{
		jp: "無理のない範囲でどうぞ。",
		kana: "むりのないはんいでどうぞ",
		romaji: "muri no nai han'i де dōzo",
	},
	{
		jp: "気に入った飲み物あれば。",
		kana: "きにいったのみものあれば",
		romaji: "kiiita nominono areba",
	},
	{
		jp: "飲み物は棚にあります。",
		kana: "のみものはたなにあります",
		romaji: "nominono wa tana ni arimasu",
	},
	{
		jp: "この飲み物安いですね。",
		kana: "こののみものやすいですね",
		romaji: "kono nominono yasui desu ne",
	},
	{
		jp: "飲み物がなくなった。",
		kana: "のみものがなくなった",
		romaji: "nominono ga nakunatta",
	},
	{
		jp: "飲み物を買いに行く。",
		kana: "のみものをかいにいく",
		romaji: "nominono wo kайі ni iku",
	},
	{
		jp: "人気の飲み物何ですか。",
		kana: "にんきののみものなんですか",
		romaji: "ninki no nominono nan desu ka",
	},
	{
		jp: "新しい飲み物出ました。",
		kana: "あたらしいのみものでました",
		romaji: "atarashii nominono demashita",
	},
	{
		jp: "季節の飲み物好き。",
		kana: "きせつののみものすき",
		romaji: "kisetsu no nominono suki",
	},
	{
		jp: "輸入飲み物試します。",
		kana: "ゆにゅうのみものためします",
		romaji: "yunyū nominono tamesimasu",
	},
	{
		jp: "地元の飲み物好きです。",
		kana: "じもとののみものすきです",
		romaji: "jimoto no nominono sukidesu",
	},
	{
		jp: "有機飲料好きですか。",
		kana: "ゆうきいんりょうすきですか",
		romaji: "yūki inryō sukidesuka",
	},
	{
		jp: "お疲れさまです",
		kana: "おつかれさまです",
		romaji: "otsukaresama desu",
	},
	{
		jp: "恐れ入りますが",
		kana: "おそれいりますが",
		romaji: "osoreirimasu ga",
	},
	{
		jp: "いつもお世話になっております",
		kana: "いつもおせわになっております",
		romaji: "itsumo osewa ni natte orimasu",
	},
	{
		jp: "お手数ですが",
		kana: "おてすうですが",
		romaji: "otesuu desu ga",
	},
	{
		jp: "失礼いたします",
		kana: "しつれいいたします",
		romaji: "shitsurei itashimasu",
	},
	{
		jp: "お忙しいところ",
		kana: "おいそがしいところ",
		romaji: "oisogashii tokoro",
	},
	{
		jp: "かしこまりました",
		kana: "かしこまりました",
		romaji: "kashikomarimashita",
	},
	{
		jp: "承知いたしました",
		kana: "しょうちいたしました",
		romaji: "shouchi itashimashita",
	},
	{
		jp: "申し訳ございません",
		kana: "もうしわけございません",
		romaji: "moushiwake gozaimasen",
	},
	{
		jp: "ご不便をおかけして",
		kana: "ごふべんをおかけして",
		romaji: "gofuben wo okakeshite",
	},
	{
		jp: "本日はお越しいただき",
		kana: "ほんじつはおこしいただき",
		romaji: "honjitsu wa okoshi itadaki",
	},
	{
		jp: "お疲れさまでした",
		kana: "おつかれさまでした",
		romaji: "otsukaresama deshita",
	},
	{
		jp: "ご不明な点は",
		kana: "ごふめいなてんは",
		romaji: "gofumei na ten wa",
	},
	{
		jp: "させていただきます",
		kana: "させていただきます",
		romaji: "sasete itadakimasu",
	},
	{
		jp: "お気づきの点",
		kana: "おきづきのてん",
		romaji: "okizuki no ten",
	},
	{
		jp: "いただきありがとう",
		kana: "いただきありがとう",
		romaji: "itadaki arigatou",
	},
	{
		jp: "何かご不明な",
		kana: "なにかごふめいな",
		romaji: "nanika gofumei na",
	},
	{
		jp: "早速のご対応",
		kana: "さっそくのごたいおう",
		romaji: "sassoku no gotaiou",
	},
	{
		jp: "お返事をお待ちしております",
		kana: "おへんじをおまちしております",
		romaji: "ohenji wo omachi shite orimasu",
	},
	{
		jp: "ご質問がございましたら",
		kana: "ごしつもんがございましたら",
		romaji: "goshitsumon ga gozaimashtara",
	},
	{
		jp: "お気づきでしたら",
		kana: "おきづきでしたら",
		romaji: "okizuki deshitara",
	},
	{
		jp: "別途ご連絡させていただきます",
		kana: "べっとごれんらくさせていただきます",
		romaji: "betto gorenraku sasete itadakimasu",
	},
	{
		jp: "先ほどはありがとうございました",
		kana: "さきほどはありがとうございました",
		romaji: "sakihodo wa arigatou gozaimashita",
	},
	{
		jp: "お力になれず申し訳ございません",
		kana: "おちからになれずもうしわけございません",
		romaji: "ochikara ni narena moushiwake gozaimasen",
	},
	{
		jp: "誠に恐れ入りますが",
		kana: "まことにおそれいりますが",
		romaji: "makoto ni osoreiri masu ga",
	},
	{
		jp: "いただけますでしょうか",
		kana: "いただけますでしょうか",
		romaji: "itadakemasu deshou ka",
	},
	{
		jp: "させていただくことが",
		kana: "させていただくことが",
		romaji: "sasete itadaku koto ga",
	},
	{
		jp: "存じます",
		kana: "ぞんじます",
		romaji: "zonjimasu",
	},
	{
		jp: "いたします",
		kana: "いたします",
		romaji: "itashimasu",
	},
	{
		jp: "いたしました",
		kana: "いたしました",
		romaji: "itashimashita",
	},
	{
		jp: "申し上げます",
		kana: "もうしあげます",
		romaji: "moushiage masu",
	},
	{
		jp: "申し上げました",
		kana: "もうしあげました",
		romaji: "moushiage mashita",
	},
	{
		jp: "いただきたく",
		kana: "いただきたく",
		romaji: "itadakitaku",
	},
	{
		jp: "くださいますか",
		kana: "くださいますか",
		romaji: "kudasai masuka",
	},
	{
		jp: "くださいますでしょうか",
		kana: "くださいますでしょうか",
		romaji: "kudasai masu deshou ka",
	},
	{
		jp: "いただけますか",
		kana: "いただけますか",
		romaji: "itadakemasu ka",
	},
	{
		jp: "よろしくお願いいたします",
		kana: "よろしくおねがいいたします",
		romaji: "yoroshiku onegai itashimasu",
	},
	{
		jp: "よろしくお願いします",
		kana: "よろしくおねがいします",
		romaji: "yoroshiku onegai shimasu",
	},
	{
		jp: "かなえていただきたい",
		kana: "かなえていただきたい",
		romaji: "kanae te itadakitai",
	},
	{
		jp: "いただきたいのですが",
		kana: "いただきたいのですが",
		romaji: "itadakitai no desu ga",
	},
	{
		jp: "申し訳ありませんが",
		kana: "もうしわけありませんが",
		romaji: "moushiwake arimasen ga",
	},
	{
		jp: "大変恐れ入りますが",
		kana: "たいへんおそれいりますが",
		romaji: "taihen osoreiri masu ga",
	},
	{
		jp: "ご了承ください",
		kana: "ごりょうしょうください",
		romaji: "goryoushou kudasai",
	},
	{
		jp: "ご理解ください",
		kana: "ごりかいください",
		romaji: "gorikai kudasai",
	},
	{
		jp: "ご配慮ください",
		kana: "ごはいりょください",
		romaji: "gohairy kudasai",
	},
	{
		jp: "ご覧ください",
		kana: "ごらんください",
		romaji: "goran kudasai",
	},
	{
		jp: "ご確認ください",
		kana: "ごかくにんください",
		romaji: "gokakinin kudasai",
	},
	{
		jp: "お返事ください",
		kana: "おへんじください",
		romaji: "ohenji kudasai",
	},
	{
		jp: "お待たせして申し訳ございません",
		kana: "おまたせしてもうしわけございません",
		romaji: "omatase shite moushiwake gozaimasen",
	},
	{
		jp: "お力添えをいただき",
		kana: "おちからぞえをいただき",
		romaji: "ochikara zoe wo itadaki",
	},
	{
		jp: "ご支援をいただき",
		kana: "ごしえんをいただき",
		romaji: "goshien wo itadaki",
	},
	{
		jp: "ご指導をいただきました",
		kana: "ごしどうをいただきました",
		romaji: "goshidou wo itadaki mashita",
	},
	{
		jp: "ご報告いただき",
		kana: "ごほうこくいただき",
		romaji: "gohououkoku itadaki",
	},
	{
		jp: "お声がけをいただき",
		kana: "おこえがけをいただき",
		romaji: "okoe gake wo itadaki",
	},
	{
		jp: "お気遣いをいただき",
		kana: "おきづかいをいただき",
		romaji: "okizukai wo itadaki",
	},
	{
		jp: "お招きいただき",
		kana: "おまねきいただき",
		romaji: "omaneki itadaki",
	},
	{
		jp: "お誘いいただき",
		kana: "おさそいいただき",
		romaji: "osasoi itadaki",
	},
	{
		jp: "ご同意をいただき",
		kana: "ごどういをいただき",
		romaji: "godoui wo itadaki",
	},
	{
		jp: "ご承認いただき",
		kana: "ごしょうにんいただき",
		romaji: "goshounin itadaki",
	},
	{
		jp: "ご許可をいただき",
		kana: "ごきょかをいただき",
		romaji: "gokyoka wo itadaki",
	},
	{
		jp: "ご了承いただき",
		kana: "ごりょうしょういただき",
		romaji: "goryoushou itadaki",
	},
	{
		jp: "ご理解いただき",
		kana: "ごりかいいただき",
		romaji: "gorikai itadaki",
	},
	{
		jp: "ご協力をいただき",
		kana: "ごきょうりょくをいただき",
		romaji: "gokyouryoku wo itadaki",
	},
	{
		jp: "ご尽力をいただき",
		kana: "ごじんりょくをいただき",
		romaji: "gojinryoku wo itadaki",
	},
	{
		jp: "ご配慮いただき",
		kana: "ごはいりょいただき",
		romaji: "gohairy itadaki",
	},
	{
		jp: "ご対応いただき",
		kana: "ごたいおういただき",
		romaji: "gotaiou itadaki",
	},
	{
		jp: "ご確認いただき",
		kana: "ごかくにんいただき",
		romaji: "gokakinin itadaki",
	},
	{
		jp: "お返事をありがとう",
		kana: "おへんじをありがとう",
		romaji: "ohenji wo arigatou",
	},
	{
		jp: "ご連絡をいただき",
		kana: "ごれんらくをいただき",
		romaji: "gorenraku wo itadaki",
	},
	{
		jp: "ご報告をいただき",
		kana: "ごほうこくをいただき",
		romaji: "gohououkoku wo itadaki",
	},
	{
		jp: "ご提案いただき",
		kana: "ごていあんいただき",
		romaji: "goteian itadaki",
	},
	{
		jp: "ご提案をいただき",
		kana: "ごていあんをいただき",
		romaji: "goteian wo itadaki",
	},
	{
		jp: "お忙しいところ恐れ入ります",
		kana: "おいそがしいところおそれいります",
		romaji: "oisogashii tokoro osore irimasu",
	},
	{
		jp: "本日はお忙しいところ",
		kana: "ほんじつはおいそがしいところ",
		romaji: "honjitsu wa oisogashii tokoro",
	},
	{
		jp: "これまでのご支援",
		kana: "これまでのごしえん",
		romaji: "kore made no goshien",
	},
	{
		jp: "今後ともよろしくお願い",
		kana: "こんごともよろしくおねがい",
		romaji: "kongo tomo yoroshiku onegai",
	},
	{
		jp: "今後ともご指導のほど",
		kana: "こんごともごしどうのほど",
		romaji: "kongo tomo goshidou no hodo",
	},
	{
		jp: "変わらぬご支援をいただき",
		kana: "かわらぬごしえんをいただき",
		romaji: "kawaranu goshien wo itadaki",
	},
	{
		jp: "今後ともご協力をお願い",
		kana: "こんごともごきょうりょくをおねがい",
		romaji: "kongo tomo gokyouryoku wo onegai",
	},
	{
		jp: "今後ともご指導ご鞭撻のほど",
		kana: "こんごともごしどうごべんたつのほど",
		romaji: "kongo tomo goshidou gobentatu no hodo",
	},
	{
		jp: "本当にありがとうございました",
		kana: "ほんとうにありがとうございました",
		romaji: "hontou ni arigatou gozaimashita",
	},
	{
		jp: "いろいろお世話になりました",
		kana: "いろいろおせわになりました",
		romaji: "iroiro osewa ni narimashita",
	},
	{
		jp: "いろいろご指導いただき",
		kana: "いろいろごしどういただき",
		romaji: "iroiro goshidou itadaki",
	},
	{
		jp: "この度はお招きいただき",
		kana: "このたびはおまねきいただき",
		romaji: "kono tabi wa omaneki itadaki",
	},
	{
		jp: "この度は貴重なご意見",
		kana: "このたびはきちょうなごいけん",
		romaji: "kono tabi wa kichou na goiken",
	},
	{
		jp: "この度はご迷惑をおかけ",
		kana: "このたびはごめいわくをおかけ",
		romaji: "kono tabi wa gomeiwaku wo okake",
	},
	{
		jp: "この度はご指摘をいただき",
		kana: "このたびはごしてきをいただき",
		romaji: "kono tabi wa goshiteki wo itadaki",
	},
	{
		jp: "この度はお返事をいただき",
		kana: "このたびはおへんじをいただき",
		romaji: "kono tabi wa ohenji wo itadaki",
	},
	{
		jp: "この度は温かいご言葉",
		kana: "このたびはあたたかいごげんば",
		romaji: "kono tabi wa atatakai gogenba",
	},
	{
		jp: "この度はお力添えをいただき",
		kana: "このたびはおちからぞえをいただき",
		romaji: "kono tabi wa ochikara zoe wo itadaki",
	},
	{
		jp: "いただきたく存じます",
		kana: "いただきたくぞんじます",
		romaji: "itadakitaku zonjimasu",
	},
	{
		jp: "いただきたく思います",
		kana: "いただきたくおもいます",
		romaji: "itadakitaku omoimasu",
	},
	{
		jp: "いただきたいと存じます",
		kana: "いただきたいとぞんじます",
		romaji: "itadakitai to zonjimasu",
	},
	{
		jp: "いただきたいと思います",
		kana: "いただきたいとおもいます",
		romaji: "itadakitai to omoimasu",
	},
	{
		jp: "いただきたいところです",
		kana: "いただきたいところです",
		romaji: "itadakitai tokoro desu",
	},
	{
		jp: "いただきたい事項です",
		kana: "いただきたいじこうです",
		romaji: "itadakitai jikkou desu",
	},
	{
		jp: "いただきたい案件です",
		kana: "いただきたいあんけんです",
		romaji: "itadakitai anken desu",
	},
	{
		jp: "いただきたい事柄です",
		kana: "いただきたいことがらです",
		romaji: "itadakitai kotogara desu",
	},
	{
		jp: "いただきたい内容です",
		kana: "いただきたいないようです",
		romaji: "itadakitai naiyou desu",
	},
	{
		jp: "いただきたい旨です",
		kana: "いただきたいむねです",
		romaji: "itadakitai mune desu",
	},
	{
		jp: "いただきたい意向です",
		kana: "いただきたいいこうです",
		romaji: "itadakitai ikou desu",
	},
	{
		jp: "いただきたい希望です",
		kana: "いただきたいきぼうです",
		romaji: "itadakitai kibou desu",
	},
	{
		jp: "いただけますと幸いです",
		kana: "いただけますとさいわいです",
		romaji: "itadakemasu to saiwai desu",
	},
	{
		jp: "いただけますと幸甚です",
		kana: "いただけますとこうじんです",
		romaji: "itadakemasu to koujin desu",
	},
	{
		jp: "いただけるでしょうか",
		kana: "いただけるでしょうか",
		romaji: "itadakeru deshou ka",
	},
	{
		jp: "いただけるかどうか",
		kana: "いただけるかどうか",
		romaji: "itadakeru ka douka",
	},
	{
		jp: "いただけるかもしれません",
		kana: "いただけるかもしれません",
		romaji: "itadakeru ka mo shiremasen",
	},
	{
		jp: "いただけると良いです",
		kana: "いただけるといいです",
		romaji: "itadakeru to ii desu",
	},
	{
		jp: "いただけると思います",
		kana: "いただけるとおもいます",
		romaji: "itadakeru to omoimasu",
	},
	{
		jp: "いただけるようお願い",
		kana: "いただけるようおねがい",
		romaji: "itadakeru you onegai",
	},
	{
		jp: "いただけるよう希望いたします",
		kana: "いただけるようきぼういたします",
		romaji: "itadakeru you kibou itashimasu",
	},
	{
		jp: "いただけるようお願い申し上げます",
		kana: "いただけるようおねがいもうしあげます",
		romaji: "itadakeru you onegai moushiage masu",
	},
	{
		jp: "くださいませ",
		kana: "くださいませ",
		romaji: "kudasai mase",
	},
	{
		jp: "くださいましたら幸いです",
		kana: "くださいましたらさいわいです",
		romaji: "kudasai mashitara saiwai desu",
	},
	{
		jp: "くださいましたら幸甚です",
		kana: "くださいましたらこうじんです",
		romaji: "kudasai mashitara koujin desu",
	},
	{
		jp: "くださいますと幸いです",
		kana: "くださいますとさいわいです",
		romaji: "kudasai masu to saiwai desu",
	},
	{
		jp: "くださいますと幸甚です",
		kana: "くださいますとこうじんです",
		romaji: "kudasai masu to koujin desu",
	},
	{
		jp: "くださるでしょうか",
		kana: "くださるでしょうか",
		romaji: "kudasaru deshou ka",
	},
	{
		jp: "くださるかどうか",
		kana: "くださるかどうか",
		romaji: "kudasaru ka douka",
	},
	{
		jp: "くださるかもしれません",
		kana: "くださるかもしれません",
		romaji: "kudasaru ka mo shiremasen",
	},
	{
		jp: "くださると良いです",
		kana: "くださるといいです",
		romaji: "kudasaru to ii desu",
	},
	{
		jp: "くださると思います",
		kana: "くださるとおもいます",
		romaji: "kudasaru to omoimasu",
	},
	{
		jp: "くださるようお願い",
		kana: "くださるようおねがい",
		romaji: "kudasaru you onegai",
	},
	{
		jp: "くださるよう希望いたします",
		kana: "くださるようきぼういたします",
		romaji: "kudasaru you kibou itashimasu",
	},
	{
		jp: "くださるようお願い申し上げます",
		kana: "くださるようおねがいもうしあげます",
		romaji: "kudasaru you onegai moushiage masu",
	},
	{
		jp: "お手伝いいたします",
		kana: "おてつだいいたします",
		romaji: "otetsudai itashimasu",
	},
	{
		jp: "お手伝いさせていただきます",
		kana: "おてつだいさせていただきます",
		romaji: "otetsudai sasete itadakimasu",
	},
	{
		jp: "お役に立てず申し訳ございません",
		kana: "おやくにたてずもうしわけございません",
		romaji: "oyaku ni tate zu moushiwake gozaimasen",
	},
	{
		jp: "お役に立てず大変失礼いたしました",
		kana: "おやくにたてずたいへんしつれいいたしました",
		romaji: "oyaku ni tate zu taihen shitsurei itashimashita",
	},
	{
		jp: "お力になれず申し訳ございませんでした",
		kana: "おちからになれずもうしわけございませんでした",
		romaji: "ochikara ni narena moushiwake gozaimasen deshita",
	},
	{
		jp: "ご協力いただきますよう",
		kana: "ごきょうりょくいただきますよう",
		romaji: "gokyouryoku itadakimasu you",
	},
	{
		jp: "ご支援いただきますよう",
		kana: "ごしえんいただきますよう",
		romaji: "goshien itadakimasu you",
	},
	{
		jp: "ご指導いただきますよう",
		kana: "ごしどういただきますよう",
		romaji: "goshidou itadakimasu you",
	},
	{
		jp: "ご理解いただきますよう",
		kana: "ごりかいいただきますよう",
		romaji: "gorikai itadakimasu you",
	},
	{
		jp: "ご了承いただきますよう",
		kana: "ごりょうしょういただきますよう",
		romaji: "goryoushou itadakimasu you",
	},
	{
		jp: "お返事をいただきますよう",
		kana: "おへんじをいただきますよう",
		romaji: "ohenji wo itadakimasu you",
	},
	{
		jp: "ご確認をいただきますよう",
		kana: "ごかくにんをいただきますよう",
		romaji: "gokakinin wo itadakimasu you",
	},
	{
		jp: "ご連絡をいただきますよう",
		kana: "ごれんらくをいただきますよう",
		romaji: "gorenraku wo itadakimasu you",
	},
	{
		jp: "ご報告をいただきますよう",
		kana: "ごほうこくをいただきますよう",
		romaji: "gohououkoku wo itadakimasu you",
	},
	{
		jp: "ご回答をいただきますよう",
		kana: "ごかいとうをいただきますよう",
		romaji: "gokaitou wo itadakimasu you",
	},
	{
		jp: "ご返信をいただきますよう",
		kana: "ごへんしんをいただきますよう",
		romaji: "gohenshin wo itadakimasu you",
	},
	{
		jp: "ご意見をいただきますよう",
		kana: "ごいけんをいただきますよう",
		romaji: "goiken wo itadakimasu you",
	},
	{
		jp: "ご指摘をいただきますよう",
		kana: "ごしてきをいただきますよう",
		romaji: "goshiteki wo itadakimasu you",
	},
	{
		jp: "ご提案をいただきますよう",
		kana: "ごていあんをいただきますよう",
		romaji: "goteian wo itadakimasu you",
	},
	{
		jp: "ご助言をいただきますよう",
		kana: "ごじょげんをいただきますよう",
		romaji: "gojougen wo itadakimasu you",
	},
	{
		jp: "ご指示をいただきますよう",
		kana: "ごしじをいただきますよう",
		romaji: "goshiji wo itadakimasu you",
	},
	{
		jp: "ご指名をいただきますよう",
		kana: "ごしめいをいただきますよう",
		romaji: "goshimei wo itadakimasu you",
	},
	{
		jp: "お力添えをいただきますよう",
		kana: "おちからぞえをいただきますよう",
		romaji: "ochikara zoe wo itadakimasu you",
	},
	{
		jp: "お力をいただきますよう",
		kana: "おちからをいただきますよう",
		romaji: "ochikara wo itadakimasu you",
	},
	{
		jp: "お時間をいただきますよう",
		kana: "おじかんをいただきますよう",
		romaji: "ojikan wo itadakimasu you",
	},
	{
		jp: "お世話になっております",
		kana: "おせわになっております",
		romaji: "osewa ni natte orimasu",
	},
	{
		jp: "ご連絡ありがとうございます",
		kana: "ごれんらくありがとうございます",
		romaji: "gorenraku arigatou gozaimasu",
	},
	{
		jp: "ご報告ありがとうございます",
		kana: "ごほうこくありがとうございます",
		romaji: "gohououkoku arigatou gozaimasu",
	},
	{
		jp: "ご確認ありがとうございます",
		kana: "ごかくにんありがとうございます",
		romaji: "gokakinin arigatou gozaimasu",
	},
	{
		jp: "お返事ありがとうございます",
		kana: "おへんじありがとうございます",
		romaji: "ohenji arigatou gozaimasu",
	},
	{
		jp: "ご質問をいただき",
		kana: "ごしつもんをいただき",
		romaji: "goshitsumon wo itadaki",
	},
	{
		jp: "ご相談をいただき",
		kana: "ごそうだんをいただき",
		romaji: "gosoudan wo itadaki",
	},
	{
		jp: "ご依頼をいただき",
		kana: "ごいらいをいただき",
		romaji: "goirai wo itadaki",
	},
	{
		jp: "ご紹介をいただき",
		kana: "ごしょうかいをいただき",
		romaji: "goshoukai wo itadaki",
	},
	{
		jp: "ご推薦をいただき",
		kana: "ごすいせんをいただき",
		romaji: "gosuisen wo itadaki",
	},
	{
		jp: "ご指導をお願い申し上げます",
		kana: "ごしどうをおねがいもうしあげます",
		romaji: "goshidou wo onegai moushiage masu",
	},
	{
		jp: "ご協力をお願い申し上げます",
		kana: "ごきょうりょくをおねがいもうしあげます",
		romaji: "gokyouryoku wo onegai moushiage masu",
	},
	{
		jp: "ご支援をお願い申し上げます",
		kana: "ごしえんをおねがいもうしあげます",
		romaji: "goshien wo onegai moushiage masu",
	},
	{
		jp: "ご理解をお願い申し上げます",
		kana: "ごりかいをおねがいもうしあげます",
		romaji: "gorikai wo onegai moushiage masu",
	},
	{
		jp: "ご了承をお願い申し上げます",
		kana: "ごりょうしょうをおねがいもうしあげます",
		romaji: "goryoushou wo onegai moushiage masu",
	},
	{
		jp: "お忙しくお手数ですが",
		kana: "おいそがしくおてすうですが",
		romaji: "oisogashiku otesuu desu ga",
	},
	{
		jp: "申し訳ございませんでした",
		kana: "もうしわけございませんでした",
		romaji: "moushiwake gozaimasen deshita",
	},
	{
		jp: "今後ともよろしくお願い申し上げます",
		kana: "こんごともよろしくおねがいもうしあげます",
		romaji: "kongo tomo yoroshiku onegai moushiage masu",
	},
	{
		jp: "ご多忙のところ恐れ入りますが",
		kana: "ごたぼうのところおそれいりますが",
		romaji: "gotabou no tokoro osoreiri masu ga",
	},
	{
		jp: "お疲れのところ申し訳ありません",
		kana: "おつかれのところもうしわけありません",
		romaji: "otsukare no tokoro moushiwake arimasen",
	},
	{
		jp: "いただきたくございます",
		kana: "いただきたくございます",
		romaji: "itadakitaku gozaimasu",
	},
	{
		jp: "いただきたく申し上げます",
		kana: "いただきたくもうしあげます",
		romaji: "itadakitaku moushiage masu",
	},
	{
		jp: "お世話いただきありがとう",
		kana: "おせわいただきありがとう",
		romaji: "osewa itadaki arigatou",
	},
	{
		jp: "ご迷惑をおかけして申し訳ありません",
		kana: "ごめいわくをおかけしてもうしわけありません",
		romaji: "gomeiwaku wo okakeshite moushiwake arimasen",
	},
	{
		jp: "お返事をいただきたく",
		kana: "おへんじをいただきたく",
		romaji: "ohenji wo itadakitaku",
	},
	{
		jp: "さらにご指導をお願い申し上げます",
		kana: "さらにごしどうをおねがいもうしあげます",
		romaji: "sarani goshidou wo onegai moushiage masu",
	},
	{
		jp: "お忙しい中ご来社いただき",
		kana: "おいそがしいなかごらいしゃいただき",
		romaji: "oisogashii naka goraisha itadaki",
	},
	{
		jp: "ご用件をお聞かせください",
		kana: "ごようけんをおきかせください",
		romaji: "goyouken wo okikase kudasai",
	},
	{
		jp: "恐れ入りますが該当書類",
		kana: "おそれいりますががいとうしょるい",
		romaji: "osoreirimasu ga gaitoushorui",
	},
	{
		jp: "貴社のご発展をお祈り",
		kana: "きしゃのごはってんをおいのり",
		romaji: "kisha no gohatten wo oinori",
	},
	{
		jp: "本件についてご不明な",
		kana: "ほんけんについてごふめいな",
		romaji: "honken ni tsuite gofumei na",
	},
	{
		jp: "大変お手数をおかけして",
		kana: "たいへんおてすうをおかけして",
		romaji: "taihen otesuu wo okakeshite",
	},
	{
		jp: "改めてご報告申し上げます",
		kana: "あらためてごほうこくもうしあげます",
		romaji: "aratame te gohououkoku moushiage masu",
	},
	{
		jp: "本件のご対応をお願い",
		kana: "ほんけんのごたいおうをおねがい",
		romaji: "honken no gotaiou wo onegai",
	},
	{
		jp: "ご検討のほどよろしくお願い",
		kana: "ごけんとうのほどよろしくおねがい",
		romaji: "gokentou no hodo yoroshiku onegai",
	},
	{
		jp: "お返事をいただきたく存じます",
		kana: "おへんじをいただきたくぞんじます",
		romaji: "ohenji wo itadakitaku zonjimasu",
	},
	{
		jp: "ご承知おきください",
		kana: "ごしょうちおきください",
		romaji: "goshouchioki kudasai",
	},
	{
		jp: "ご参考までにお知らせ",
		kana: "ごさんこうまでにおしらせ",
		romaji: "gosankou made ni oshirase",
	},
	{
		jp: "申し訳ございませんが別紙",
		kana: "もうしわけございませんがべっし",
		romaji: "moushiwake gozaimasen ga besshi",
	},
	{
		jp: "お忙しいところ申し訳ございません",
		kana: "おいそがしいところもうしわけございません",
		romaji: "oisogashii tokoro moushiwake gozaimasen",
	},
	{
		jp: "ご多用のところお手数ですが",
		kana: "ごたようのところおてすうですが",
		romaji: "gotayou no tokoro otesuu desu ga",
	},
	{
		jp: "重ねてお礼を申し上げます",
		kana: "かさねておれいをもうしあげます",
		romaji: "kasane te orei wo moushiage masu",
	},
	{
		jp: "誠にありがとうございました",
		kana: "まことにありがとうございました",
		romaji: "makoto ni arigatou gozaimashita",
	},
	{
		jp: "今後とも何卒よろしくお願い",
		kana: "こんごともなにとぞよろしくおねがい",
		romaji: "kongo tomo nanizo yoroshiku onegai",
	},
	{
		jp: "つきましてはご報告申し上げます",
		kana: "つきましてはごほうこくもうしあげます",
		romaji: "tsuki mashite wa gohououkoku moushiage masu",
	},
	{
		jp: "ご対応いただきありがとうございました",
		kana: "ごたいおういただきありがとうございました",
		romaji: "gotaiou itadaki arigatou gozaimashita",
	},
	{
		jp: "貴重なお時間をいただき",
		kana: "きちょうなおじかんをいただき",
		romaji: "kichou na ojikan wo itadaki",
	},
	{
		jp: "お目にかかっていただき",
		kana: "おめにかかっていただき",
		romaji: "ome ni kakatte itadaki",
	},
	{
		jp: "日程についてご相談させていただき",
		kana: "にっていについてごそうだんさせていただき",
		romaji: "nittei ni tsuite gosoudan sasete itadaki",
	},
	{
		jp: "おはいおございます",
		kana: "おはよございます",
		romaji: "ohayougozaimasu",
	},
	{
		jp: "こんにちは",
		kana: "こんにちは",
		romaji: "konnichiha",
	},
	{
		jp: "こんばんは",
		kana: "こんばんは",
		romaji: "konbanha",
	},
	{
		jp: "おやすみなさい",
		kana: "おやすみなさい",
		romaji: "oyasuminasai",
	},
	{
		jp: "ありがとうございます",
		kana: "ありがとうございます",
		romaji: "arigatougozaimasu",
	},
	{
		jp: "どういたしまして",
		kana: "どういたしまして",
		romaji: "douितashimashite",
	},
	{
		jp: "すみません",
		kana: "すみません",
		romaji: "sumimasen",
	},
	{
		jp: "わかりました",
		kana: "わかりました",
		romaji: "wakarimashita",
	},
	{
		jp: "わかります",
		kana: "わかります",
		romaji: "wakarimasu",
	},
	{
		jp: "そうですね",
		kana: "そうですね",
		romaji: "soudesune",
	},
	{
		jp: "駅はどこですか",
		kana: "えきはどこですか",
		romaji: "ekihadokodesuka",
	},
	{
		jp: "電車の時間は",
		kana: "でんしゃのじかんは",
		romaji: "denshanonojikanha",
	},
	{
		jp: "バス停はここです",
		kana: "ばすていはここです",
		romaji: "busteihakokodesui",
	},
	{
		jp: "切符をください",
		kana: "きっぷをください",
		romaji: "kippuwokudasai",
	},
	{
		jp: "これはいくら",
		kana: "これはいくら",
		romaji: "korehaikusura",
	},
	{
		jp: "乗車券ください",
		kana: "じょうしゃけんください",
		romaji: "joushakenkudasai",
	},
	{
		jp: "どこへいきますか",
		kana: "どこへいきますか",
		romaji: "dokoheyikimasuka",
	},
	{
		jp: "次の駅は",
		kana: "つぎのえきは",
		romaji: "tsughinoekiha",
	},
	{
		jp: "渋谷行きです",
		kana: "しぶやいきです",
		romaji: "shibuayikidesu",
	},
	{
		jp: "降車ボタンを",
		kana: "こうしゃぼたんを",
		romaji: "koushabotan wo",
	},
	{
		jp: "いらっしゃいませ",
		kana: "いらっしゃいませ",
		romaji: "irasshaimase",
	},
	{
		jp: "これください",
		kana: "これください",
		romaji: "koreokudasai",
	},
	{
		jp: "いくらですか",
		kana: "いくらですか",
		romaji: "ikuradesuka",
	},
	{
		jp: "安いですね",
		kana: "やすいですね",
		romaji: "yasuidesune",
	},
	{
		jp: "高すぎます",
		kana: "たかすぎます",
		romaji: "takasugimasu",
	},
	{
		jp: "セール中です",
		kana: "せーるちゅうです",
		romaji: "seerutyuudesu",
	},
	{
		jp: "割引きは",
		kana: "わりびきは",
		romaji: "waribikiha",
	},
	{
		jp: "ポイントカード",
		kana: "ぽいんときゃーど",
		romaji: "pointokyaado",
	},
	{
		jp: "クレジットカード",
		kana: "くれじっときゃーど",
		romaji: "kurejittkyaado",
	},
	{
		jp: "現金払いで",
		kana: "げんきんばらいで",
		romaji: "genkinbaraideі",
	},
	{
		jp: "おいしいです",
		kana: "おいしいです",
		romaji: "oishiidesui",
	},
	{
		jp: "また来ます",
		kana: "またきます",
		romaji: "matakomasu",
	},
	{
		jp: "お水ください",
		kana: "おみずください",
		romaji: "omizuokudasai",
	},
	{
		jp: "トイレはどこ",
		kana: "といれはどこ",
		romaji: "toirehadoko",
	},
	{
		jp: "レストランです",
		kana: "れすとらんです",
		romaji: "resutorandesu",
	},
	{
		jp: "カフェで休もう",
		kana: "かふぇでやすもう",
		romaji: "kafedeyasumou",
	},
	{
		jp: "朝食を食べた",
		kana: "ちょうしょくをたべた",
		romaji: "tyoushokuwotabeta",
	},
	{
		jp: "お昼は何",
		kana: "おひるはなに",
		romaji: "ohiruhanani",
	},
	{
		jp: "夜ご飯作った",
		kana: "よるごはんつくった",
		romaji: "yurugohantukutta",
	},
	{
		jp: "辛いです",
		kana: "からいです",
		romaji: "karaidesui",
	},
	{
		jp: "会議はいつ",
		kana: "かいぎはいつ",
		romaji: "kaigihaitsu",
	},
	{
		jp: "メール送った",
		kana: "めーるおくった",
		romaji: "seeruokutta",
	},
	{
		jp: "資料ください",
		kana: "しりょうください",
		romaji: "shiryouokudasai",
	},
	{
		jp: "期限はいつ",
		kana: "きげんはいつ",
		romaji: "kigenhaitsu",
	},
	{
		jp: "報告します",
		kana: "ほうこくします",
		romaji: "houkokushimasu",
	},
	{
		jp: "確認しました",
		kana: "かくにんしました",
		romaji: "kakuninshimashita",
	},
	{
		jp: "データ送信",
		kana: "でーたそうしん",
		romaji: "daatasoushin",
	},
	{
		jp: "契約書です",
		kana: "けいやくしょです",
		romaji: "keiyakushodesu",
	},
	{
		jp: "請求書ください",
		kana: "せいきゅうしょください",
		romaji: "seikuushookudasai",
	},
	{
		jp: "営業時間は",
		kana: "えいぎょうじかんは",
		romaji: "eigyoujikanha",
	},
	{
		jp: "いい天気ですね",
		kana: "いいてんきですね",
		romaji: "iitenkidesune",
	},
	{
		jp: "雨ですね",
		kana: "あめですね",
		romaji: "amedesune",
	},
	{
		jp: "雪が降った",
		kana: "ゆきがふった",
		romaji: "yukigafutta",
	},
	{
		jp: "寒いですね",
		kana: "さむいですね",
		romaji: "samuiでsune",
	},
	{
		jp: "暑いです",
		kana: "あついです",
		romaji: "atsuidesui",
	},
	{
		jp: "風が強い",
		kana: "かぜがつよい",
		romaji: "kazegatsuyoi",
	},
	{
		jp: "傘を持って",
		kana: "かさをもって",
		romaji: "kasawomotte",
	},
	{
		jp: "春ですね",
		kana: "はるですね",
		romaji: "harudesune",
	},
	{
		jp: "夏は暑い",
		kana: "なつはあつい",
		romaji: "natsuhatatsuい",
	},
	{
		jp: "秋になった",
		kana: "あきになった",
		romaji: "akininaratta",
	},
	{
		jp: "右に曲がって",
		kana: "みぎにまがって",
		romaji: "miginimagatte",
	},
	{
		jp: "左です",
		kana: "ひだりです",
		romaji: "hidaridesui",
	},
	{
		jp: "まっすぐいく",
		kana: "まっすぐいく",
		romaji: "massuguu",
	},
	{
		jp: "信号を渡る",
		kana: "しんごうをわたる",
		romaji: "shingouwowataru",
	},
	{
		jp: "交差点です",
		kana: "こうさてんです",
		romaji: "kousatendesu",
	},
	{
		jp: "地図を見て",
		kana: "ちずをみて",
		romaji: "chizuwomite",
	},
	{
		jp: "ナビで検索",
		kana: "なびでけんさく",
		romaji: "navidekensaku",
	},
	{
		jp: "この先です",
		kana: "このさきです",
		romaji: "konosakidesu",
	},
	{
		jp: "近いですね",
		kana: "ちかいですね",
		romaji: "chikaidesune",
	},
	{
		jp: "サイズはいかが",
		kana: "さいずはいかが",
		romaji: "saizuhaikanaga",
	},
	{
		jp: "Mサイズです",
		kana: "えむさいずです",
		romaji: "emusaizudesu",
	},
	{
		jp: "試着できる",
		kana: "しちゃくできる",
		romaji: "shichyakudekiru",
	},
	{
		jp: "色はどれ",
		kana: "いろはどれ",
		romaji: "irohadora",
	},
	{
		jp: "白いシャツ",
		kana: "しろいしゃつ",
		romaji: "shiroishatsu",
	},
	{
		jp: "黒いズボン",
		kana: "くろいずぼん",
		romaji: "kuroizubon",
	},
	{
		jp: "上品ですね",
		kana: "じょうひんですね",
		romaji: "jouhindesune",
	},
	{
		jp: "流行ってます",
		kana: "りゅうこうってます",
		romaji: "ryuukouттemasu",
	},
	{
		jp: "似合ってます",
		kana: "にあってます",
		romaji: "niattemasu",
	},
	{
		jp: "セーター着た",
		kana: "せーたーきた",
		romaji: "seetaakita",
	},
	{
		jp: "朝起きた",
		kana: "あさおきた",
		romaji: "asaokita",
	},
	{
		jp: "シャワー浴びた",
		kana: "しゃわーあびた",
		romaji: "shawaabita",
	},
	{
		jp: "歯を磨く",
		kana: "はをみがく",
		romaji: "hawomigaku",
	},
	{
		jp: "顔を洗った",
		kana: "かおをあらった",
		romaji: "kaowaaraatta",
	},
	{
		jp: "メイクした",
		kana: "めいくした",
		romaji: "meikushita",
	},
	{
		jp: "朝ご飯食べた",
		kana: "あさごはんたべた",
		romaji: "asagohantabeta",
	},
	{
		jp: "仕事に行く",
		kana: "しごとにいく",
		romaji: "shigotoniiku",
	},
	{
		jp: "帰ってきた",
		kana: "かえってきた",
		romaji: "kaetekita",
	},
	{
		jp: "疲れた",
		kana: "つかれた",
		romaji: "tsukareta",
	},
	{
		jp: "寝よう",
		kana: "ねよう",
		romaji: "neyou",
	},
	{
		jp: "電話ください",
		kana: "でんわください",
		romaji: "denwokudasai",
	},
	{
		jp: "メールで送ろう",
		kana: "めーるでおくろう",
		romaji: "seerudeokurou",
	},
	{
		jp: "LINEで連絡",
		kana: "らいんでれんらく",
		romaji: "rainderenraku",
	},
	{
		jp: "電話が来た",
		kana: "でんわがきた",
		romaji: "denwagakita",
	},
	{
		jp: "スマホの充電",
		kana: "すまほのじゅうでん",
		romaji: "sumahonjuuden",
	},
	{
		jp: "ネット接続",
		kana: "ねっとせつぞく",
		romaji: "nettosetsuzoku",
	},
	{
		jp: "パスワード忘れた",
		kana: "ぱすわーどわすれた",
		romaji: "pasuwaadonuwasreta",
	},
	{
		jp: "Wi-Fi繋ぐ",
		kana: "わいふぁいつなぐ",
		romaji: "waifaitsunagu",
	},
	{
		jp: "通話品質悪い",
		kana: "つうわひんしつわるい",
		romaji: "tsuuhinsitshuwarui",
	},
	{
		jp: "電波がない",
		kana: "でんぱがない",
		romaji: "denpaganai",
	},
	{
		jp: "映画見たい",
		kana: "えいがみたい",
		romaji: "eigamitai",
	},
	{
		jp: "コンサート行く",
		kana: "こんさーといく",
		romaji: "konsaatoriku",
	},
	{
		jp: "本を読む",
		kana: "ほんをよむ",
		romaji: "honwoyomu",
	},
	{
		jp: "ゲーム好きです",
		kana: "げーむすきです",
		romaji: "geemuskiidesu",
	},
	{
		jp: "テレビ見てた",
		kana: "てれびみてた",
		romaji: "terebiмiteta",
	},
	{
		jp: "漫画買った",
		kana: "まんがかった",
		romaji: "mangakatta",
	},
	{
		jp: "美術館行きたい",
		kana: "びじゅつかんいきたい",
		romaji: "bijutsukaniikitai",
	},
	{
		jp: "演劇の話",
		kana: "えんげきのはなし",
		romaji: "engekinohanashi",
	},
	{
		jp: "楽しかった",
		kana: "たのしかった",
		romaji: "tanoshikatta",
	},
	{
		jp: "退屈です",
		kana: "たいくつです",
		romaji: "taikusuつdesu",
	},
	{
		jp: "体調悪い",
		kana: "たいちょうわるい",
		romaji: "taichouwarui",
	},
	{
		jp: "頭が痛い",
		kana: "あたまがいたい",
		romaji: "atamagaitai",
	},
	{
		jp: "病院行きたい",
		kana: "びょういんいきたい",
		romaji: "byouiniikitai",
	},
	{
		jp: "風邪ひいた",
		kana: "かぜひいた",
		romaji: "kazehuita",
	},
	{
		jp: "熱があります",
		kana: "ねつがあります",
		romaji: "netsugaarimasu",
	},
	{
		jp: "医者に見てもらう",
		kana: "いしゃにみてもらう",
		romaji: "ishanimitemorau",
	},
	{
		jp: "薬飲んだ",
		kana: "くすりのんだ",
		romaji: "kusunonda",
	},
	{
		jp: "注射怖い",
		kana: "ちゅうしゃこわい",
		romaji: "tyushakowa",
	},
	{
		jp: "疲労です",
		kana: "ひろうです",
		romaji: "hiroudesu",
	},
	{
		jp: "健康診断",
		kana: "けんこうしんだん",
		romaji: "kenkoushidan",
	},
	{
		jp: "給与いつ",
		kana: "きゅうよいつ",
		romaji: "kyuuyoitsu",
	},
	{
		jp: "月給です",
		kana: "げっきゅうです",
		romaji: "gekkyuudesu",
	},
	{
		jp: "家賃払った",
		kana: "やちんはらった",
		romaji: "yachinharatta",
	},
	{
		jp: "銀行に行く",
		kana: "ぎんこうにいく",
		romaji: "ginkouniiku",
	},
	{
		jp: "両替してください",
		kana: "りょうがえしてください",
		romaji: "ryougaeshitekudasai",
	},
	{
		jp: "口座番号は",
		kana: "こうざばんごうは",
		romaji: "kouzabangouha",
	},
	{
		jp: "振込手数料",
		kana: "ふりこみてすうりょう",
		romaji: "furikomiтesuuryou",
	},
	{
		jp: "クレジット払い",
		kana: "くれじっとばらい",
		romaji: "kurejittobarai",
	},
	{
		jp: "割賦払い",
		kana: "かっぷばらい",
		romaji: "kappubarai",
	},
	{
		jp: "お金足りない",
		kana: "おかねたりない",
		romaji: "okaneтarinai",
	},
	{
		jp: "家族元気",
		kana: "かぞくげんき",
		romaji: "kazokugenki",
	},
	{
		jp: "お母さん好きです",
		kana: "おかあさんすきです",
		romaji: "okasansuきidesu",
	},
	{
		jp: "兄弟います",
		kana: "きょうだいいます",
		romaji: "kyoudaiiмasu",
	},
	{
		jp: "子供いますか",
		kana: "こどもいますか",
		romaji: "kodomoimasuka",
	},
	{
		jp: "配偶者は",
		kana: "はいぐうしゃは",
		romaji: "haiguushaha",
	},
	{
		jp: "親友です",
		kana: "しんゆうです",
		romaji: "shinyuudesu",
	},
	{
		jp: "友達と遊ぶ",
		kana: "ともだちとあそぶ",
		romaji: "tomodachitоasobu",
	},
	{
		jp: "彼氏います",
		kana: "かれしいます",
		romaji: "kareshiiмasu",
	},
	{
		jp: "結婚したい",
		kana: "けっこんしたい",
		romaji: "kekkonshitai",
	},
	{
		jp: "別れた",
		kana: "わかれた",
		romaji: "wakareta",
	},
	{
		jp: "近所で会った",
		kana: "きんじょであった",
		romaji: "kinjodelatta",
	},
	{
		jp: "公園で遊ぶ",
		kana: "こうえんであそぶ",
		romaji: "kouen de asobu",
	},
	{
		jp: "図書館へ行く",
		kana: "としょかんへいく",
		romaji: "toshokanheiku",
	},
	{
		jp: "コンビニは近い",
		kana: "こんびにはちかい",
		romaji: "konbinihachikai",
	},
	{
		jp: "郵便局です",
		kana: "ゆうびんきょくです",
		romaji: "yuubikyokudesu",
	},
	{
		jp: "警察呼ぼう",
		kana: "けいさつよぼう",
		romaji: "keisatsuyobou",
	},
	{
		jp: "消防車来た",
		kana: "しょうぼうしゃきた",
		romaji: "shouboushaкita",
	},
	{
		jp: "町内会ですね",
		kana: "ちょうないかいですね",
		romaji: "tyounaikaidesune",
	},
	{
		jp: "隣人優しい",
		kana: "りんじんやさしい",
		romaji: "rinjinyashii",
	},
	{
		jp: "引越ししよう",
		kana: "ひっこししよう",
		romaji: "hikkosishiyou",
	},
	{
		jp: "学校へ行く",
		kana: "がっこうへいく",
		romaji: "gakkouheiku",
	},
	{
		jp: "宿題やった",
		kana: "しゅくだいやった",
		romaji: "shukudaiyatta",
	},
	{
		jp: "試験難しい",
		kana: "しけんむずかしい",
		romaji: "shikenmuzukashii",
	},
	{
		jp: "成績良い",
		kana: "せいせきよい",
		romaji: "seisekiyoi",
	},
	{
		jp: "先生好き",
		kana: "せんせいすき",
		romaji: "senseiski",
	},
	{
		jp: "教科書ください",
		kana: "きょうかしょください",
		romaji: "kyoukashookudasai",
	},
	{
		jp: "大学行きたい",
		kana: "だいがくいきたい",
		romaji: "daigakuiikitai",
	},
	{
		jp: "卒業した",
		kana: "そつぎょうした",
		romaji: "sotsugуouшita",
	},
	{
		jp: "勉強頑張る",
		kana: "べんきょうがんばる",
		romaji: "benkyouganбaru",
	},
	{
		jp: "クラスメート",
		kana: "くらすめーと",
		romaji: "kurasumeeто",
	},
	{
		jp: "運動好きです",
		kana: "うんどうすきです",
		romaji: "undousukiidesu",
	},
	{
		jp: "ジムに行く",
		kana: "じむにいく",
		romaji: "jimuniiku",
	},
	{
		jp: "野球やった",
		kana: "やきゅうやった",
		romaji: "yakуyuuyatta",
	},
	{
		jp: "サッカーしよう",
		kana: "さっかーしよう",
		romaji: "sakkashiyou",
	},
	{
		jp: "テニスコート",
		kana: "てにすこーと",
		romaji: "tenisuko-to",
	},
	{
		jp: "水泳得意",
		kana: "すいえいとくい",
		romaji: "suieитokui",
	},
	{
		jp: "ランニング毎日",
		kana: "らんにんぐまいにち",
		romaji: "ranninguмainichi",
	},
	{
		jp: "筋トレします",
		kana: "きんとれします",
		romaji: "kintoreslimasu",
	},
	{
		jp: "試合観たい",
		kana: "しあいみたい",
		romaji: "shiaimitai",
	},
	{
		jp: "優勝したい",
		kana: "ゆうしょうしたい",
		romaji: "yuushоushitai",
	},
	{
		jp: "パソコン使う",
		kana: "ぱそこんつかう",
		romaji: "pasokontsukau",
	},
	{
		jp: "プログラミング難しい",
		kana: "ぷろぐらみんぐむずかしい",
		romaji: "puroguramingumuzukashii",
	},
	{
		jp: "バグ見つかった",
		kana: "ばぐみつかった",
		romaji: "bagumitsukatta",
	},
	{
		jp: "ファイル保存した",
		kana: "ふぁいるほぞんした",
		romaji: "fairuhozonnshita",
	},
	{
		jp: "インターネット速い",
		kana: "いんたーねっとはやい",
		romaji: "intanettohayai",
	},
	{
		jp: "ダウンロード中",
		kana: "だうんろーどちゅう",
		romaji: "daunroodyuu",
	},
	{
		jp: "システム更新",
		kana: "しすてむこうしん",
		romaji: "shisutемukoshin",
	},
	{
		jp: "セキュリティー重要",
		kana: "せきゅりてーじゅうよう",
		romaji: "sekyuritejuuyou",
	},
	{
		jp: "アップデート完了",
		kana: "あっぷでーとかんりょう",
		romaji: "appudeetokann​ryou",
	},
	{
		jp: "エラー出た",
		kana: "えらーでた",
		romaji: "eradeta",
	},
	{
		jp: "部屋きれい",
		kana: "へやきれい",
		romaji: "heyakirei",
	},
	{
		jp: "掃除します",
		kana: "そうじします",
		romaji: "soujishimasu",
	},
	{
		jp: "洗濯物干す",
		kana: "せんたくものほす",
		romaji: "sentakumonohosu",
	},
	{
		jp: "料理作ろう",
		kana: "りょうりつくろう",
		romaji: "ryouritukurou",
	},
	{
		jp: "冷蔵庫空だ",
		kana: "れいぞうこからだ",
		romaji: "reizoukokarada",
	},
	{
		jp: "買い物行く",
		kana: "かいものいく",
		romaji: "kaimonoiku",
	},
	{
		jp: "荷物重い",
		kana: "にもつおもい",
		romaji: "nimotsuomoi",
	},
	{
		jp: "時間ない",
		kana: "じかんない",
		romaji: "jikanonai",
	},
	{
		jp: "急いでます",
		kana: "いそいでます",
		romaji: "isoidемasu",
	},
	{
		jp: "待ってください",
		kana: "まってください",
		romaji: "matekudasai",
	},
	{
		jp: "早すぎた",
		kana: "はやすぎた",
		romaji: "hayasugita",
	},
	{
		jp: "遅くなった",
		kana: "おそくなった",
		romaji: "osokunatta",
	},
	{
		jp: "予定変わった",
		kana: "よていかわった",
		romaji: "yoteikawatta",
	},
	{
		jp: "キャンセルします",
		kana: "きゃんせるします",
		romaji: "kyansеrushimasu",
	},
	{
		jp: "確認取ります",
		kana: "かくにんとります",
		romaji: "kakunintoriмasu",
	},
	{
		jp: "決めました",
		kana: "きめました",
		romaji: "kimemashita",
	},
	{
		jp: "同意します",
		kana: "どういします",
		romaji: "douishiмasu",
	},
	{
		jp: "反対です",
		kana: "はんたいです",
		romaji: "hantaidesui",
	},
	{
		jp: "検討します",
		kana: "けんとうします",
		romaji: "kentоushimasu",
	},
	{
		jp: "了解です",
		kana: "りょうかいです",
		romaji: "ryoukaidesui",
	},
	{
		jp: "話し合いを大切にします",
		kana: "はなしあいをたいせつにします",
		romaji: "hanashiaiwotuisetsunishimasu",
	},
	{
		jp: "スポーツチームで活躍しています",
		kana: "すぽーつちーむでかつやくしています",
		romaji: "supotsuchimudekatuyakushiteimasu",
	},
	{
		jp: "お互いに頼ります",
		kana: "おたがいにたよります",
		romaji: "otaguainitsyorimasu",
	},
	{
		jp: "社会に貢献したいです",
		kana: "しゃかいにこうけんしたいです",
		romaji: "shakainikoukenshitaidesu",
	},
	{
		jp: "輪を広げています",
		kana: "わをひろげています",
		romaji: "wawohirogeteimasu",
	},
	{
		jp: "文化祭で発表します",
		kana: "ぶんかさいではっぴょうします",
		romaji: "bunkasaidehappyoushimasu",
	},
	{
		jp: "地域の安全を守ります",
		kana: "ちいきのあんぜんをまもります",
		romaji: "chiikinoanzenwomamomasu",
	},
	{
		jp: "ご近所さんとお付き合いしています",
		kana: "ごきんじょさんとおつきあいしています",
		romaji: "gokinjosantootsukiaisiteimasu",
	},
	{
		jp: "街づくりに参画しています",
		kana: "まちづくりにさんかくしています",
		romaji: "machizukunisankakushiteimasu",
	},
	{
		jp: "丁寧に説明します",
		kana: "ていねいにせつめいします",
		romaji: "teineisetsumeiishimasu",
	},
	{
		jp: "家族と一緒に過ごしています",
		kana: "かぞくといっしょにすごしています",
		romaji: "kazokusisshosugoshtiteimasu",
	},
	{
		jp: "人間関係を大切にします",
		kana: "にんげんかんけいをたいせつにします",
		romaji: "ningenkankeiwotuisetsunishimasu",
	},
	{
		jp: "優しさを大事にしています",
		kana: "やさしさをたいじにしています",
		romaji: "yasashisawotuijinishiteimasu",
	},
	{
		jp: "コミュニティセンターで活動しています",
		kana: "こみゅにてぃせんたーでかつどうしています",
		romaji: "komyunitisentadekatsuodoshiteimasu",
	},
	{
		jp: "相手の気持ちを思いやります",
		kana: "あいてのきもちをおもいやります",
		romaji: "aitnnokimochiwoomoyarumasu",
	},
	{
		jp: "図書館でボランティアをしています",
		kana: "としょかんでぼらんてぃあをしています",
		romaji: "toshokandeborantawoshshiteimasu",
	},
	{
		jp: "ボランティアをやっています",
		kana: "ぼらんてぃあをやっています",
		romaji: "borantiaawoyatteimasu",
	},
	{
		jp: "地元の人たちと仲良くしたいです",
		kana: "じもとのひとたちとなかよくしたいです",
		romaji: "jimotonoitotachinakayokushitaidesu",
	},
	{
		jp: "一緒に目標を達成しました",
		kana: "いっしょにもくひょうをたっせいしました",
		romaji: "isshoninomokuhyoutasseiashimashita",
	},
	{
		jp: "清掃ボランティアに参加しています",
		kana: "せいそうぼらんてぃあにさんかしています",
		romaji: "seisoborantianisankashiteimasu",
	},
	{
		jp: "親の期待に応えたいです",
		kana: "おやのきたいにこたえたいです",
		romaji: "oyannokitaiinikotaetaidesu",
	},
	{
		jp: "弱い立場の人を守ります",
		kana: "よわいたちばのひとをまもります",
		romaji: "yowaitachbainohitowomamomasu",
	},
	{
		jp: "街を綺麗にしましょう",
		kana: "まちをきれいにしましょう",
		romaji: "machiwokireininashiou",
	},
	{
		jp: "上下関係を大切にします",
		kana: "じょうかかんけいをたいせつにします",
		romaji: "joukakankeiwotuisetsunishimasu",
	},
	{
		jp: "災害支援ボランティアです",
		kana: "さいがいしえんぼらんてぃあです",
		romaji: "saigaishienborantiaadesu",
	},
	{
		jp: "近所の人を手伝っています",
		kana: "きんじょのひとをてつだっています",
		romaji: "kinjonoitowotetsudatteimasu",
	},
	{
		jp: "差別をしてはいけません",
		kana: "さべつをしてはいけません",
		romaji: "sabetsuwoshitehaikemasen",
	},
	{
		jp: "災害ボランティアに行きました",
		kana: "さいがいぼらんてぃあにいきました",
		romaji: "saigoborantainiikimashita",
	},
	{
		jp: "互いに意見を尊重します",
		kana: "たがいにいけんをそんちょうします",
		romaji: "tagaiiniikenwosonchouishimasu",
	},
	{
		jp: "正直に行動します",
		kana: "しょうじきにこうどうします",
		romaji: "shojkinikoudousimasu",
	},
	{
		jp: "約束を守ります",
		kana: "やくそくをまもります",
		romaji: "yakusokuwomamomasu",
	},
	{
		jp: "一つのコミュニティです",
		kana: "ひとつのこみゅにてぃです",
		romaji: "hitotsunokpmyunitidesu",
	},
	{
		jp: "人間関係が広がりました",
		kana: "にんげんかんけいがひろがりました",
		romaji: "ningenkankeiagairougarimashita",
	},
	{
		jp: "毎週末ボランティアをします",
		kana: "まいしゅうまつぼらんてぃあをします",
		romaji: "maishūmatsuborantiaawoshimasu",
	},
	{
		jp: "隣近所で支え合っています",
		kana: "となりきんじょでささえあっています",
		romaji: "tonarikinjodosasaeateimasu",
	},
	{
		jp: "仲間を信頼しています",
		kana: "なかまをしんらいしています",
		romaji: "nakamawoshinraisiteimasu",
	},
	{
		jp: "兄弟姉妹と仲が良いです",
		kana: "きょうだいしまいとなかがよいです",
		romaji: "kyoudaishimaaitunakagayoidesu",
	},
	{
		jp: "困難な状況を理解しています",
		kana: "こんなんなじょうきょうをりかいしています",
		romaji: "konennanjoukyoworikasiteimasu",
	},
	{
		jp: "地域コミュニティに参加しました",
		kana: "ちいきこみゅにてぃにさんかしました",
		romaji: "chiikikomyunitinisankashimashita",
	},
	{
		jp: "教育支援ボランティアに参加しています",
		kana: "きょういくしえんぼらんてぃあにさんかしています",
		romaji: "kyouikushienborantanisankashiteimasu",
	},
	{
		jp: "チームワークが大事です",
		kana: "ちーむわーくがたいじです",
		romaji: "chimuwaakutaijidesu",
	},
	{
		jp: "福祉活動を支援しています",
		kana: "ふくしかつどうをしえんしています",
		romaji: "fukushikatsuodowoshiennsiteimasu",
	},
	{
		jp: "意見を聞き合っています",
		kana: "いけんをききあっています",
		romaji: "ikenwokikiateimasu",
	},
	{
		jp: "年輩の方を大事にします",
		kana: "ねんぱいのかたをたいじにします",
		romaji: "nenpainokatawotaijinishimasu",
	},
	{
		jp: "困った人に気配りをします",
		kana: "こまったひとにきくばりをします",
		romaji: "komataritonikiubarisihimasu",
	},
	{
		jp: "人の話をよく聞きます",
		kana: "ひとのはなしをよくききます",
		romaji: "itunohanaswowoyokikimasu",
	},
	{
		jp: "感謝の気持ちを表します",
		kana: "かんしゃのきもちをあらわします",
		romaji: "kanshanokmochiwotarawashimasu",
	},
	{
		jp: "近所の課題を一緒に解決します",
		kana: "きんじょのかだいをいっしょにかいけつします",
		romaji: "kinjnokadaiwoisshonikaiketsushimasu",
	},
	{
		jp: "感情を共有しています",
		kana: "かんじょうをきょうゆうしています",
		romaji: "kanjoukokkyouyushiteimasu",
	},
	{
		jp: "近所で助け合う文化があります",
		kana: "きんじょでたすけあうぶんかがあります",
		romaji: "kinjodotasukeau bunkagaarimasu",
	},
	{
		jp: "運動会に参加します",
		kana: "うんどうかいにさんかします",
		romaji: "undoukaininisankashimasu",
	},
	{
		jp: "誠実に向き合っています",
		kana: "せいじつにむきあっています",
		romaji: "seijtsunimukiateimasu",
	},
	{
		jp: "地域を良くしたいです",
		kana: "ちいきをよくしたいです",
		romaji: "chiikiwoyokushitaidesu",
	},
	{
		jp: "友達と一緒に困難を乗り越えました",
		kana: "ともだちといっしょにこんなんをのりこえました",
		romaji: "tomodachitoisshonigonannunorikoemashita",
	},
	{
		jp: "人権を守ります",
		kana: "じんけんをまもります",
		romaji: "jinkenwomamomasu",
	},
	{
		jp: "困難を一緒に乗り越えます",
		kana: "こんなんをいっしょにのりこえます",
		romaji: "konannwoisshoninorikoemasku",
	},
	{
		jp: "祭りの準備を手伝っています",
		kana: "まつりのじゅんびをてつだっています",
		romaji: "matsurinojunbiwotetsudatteimasu",
	},
	{
		jp: "共生社会を目指しています",
		kana: "きょうせいしゃかいをめざしています",
		romaji: "kyousseishakaiowomezashiteimasu",
	},
	{
		jp: "ネットワークを構築しています",
		kana: "ねっとわーくをこうちくしています",
		romaji: "nettowakuwokochikushiteimasu",
	},
	{
		jp: "繋がりを感じています",
		kana: "つながりをかんじています",
		romaji: "tsunagariwokanjiteimasu",
	},
	{
		jp: "家族で食事をします",
		kana: "かぞくでしょくじをします",
		romaji: "kazokudeshokujiwoshimasu",
	},
	{
		jp: "コミュニケーションが大事です",
		kana: "こみゅにけーしょんがたいじです",
		romaji: "komyunikeishongataijidesu",
	},
	{
		jp: "挨拶を大事にします",
		kana: "あいさつをたいじにします",
		romaji: "aisatsuwotuijinishimasu",
	},
	{
		jp: "友人との絆は強いです",
		kana: "ゆうじんとのきずなはつよいです",
		romaji: "yuujintnnokizunahatsuyoidesu",
	},
	{
		jp: "困った人の力になります",
		kana: "こまったひとのちからになります",
		romaji: "komaatritonnochirkaraninarimasuu",
	},
	{
		jp: "心のケアを大事にします",
		kana: "こころのけあをたいじにします",
		romaji: "korokonokearowtaijinishimasu",
	},
	{
		jp: "みんなで力を合わせて頑張ります",
		kana: "みんなでちからをあわせてがんばります",
		romaji: "minnnadechiekaraoawaseteganbarimasu",
	},
	{
		jp: "地域資源を活用しています",
		kana: "ちいきしげんをかつようしています",
		romaji: "chiikishigenwokatyoushiteimasu",
	},
	{
		jp: "地域の清掃活動をしています",
		kana: "ちいきのせいそうかつどうをしています",
		romaji: "chiikinoseisoukatsudouwoshtiteimasu",
	},
	{
		jp: "マナーを守ります",
		kana: "まなーをまもります",
		romaji: "manawomamomasu",
	},
	{
		jp: "想いを共有しています",
		kana: "おもいをきょうゆうしています",
		romaji: "omowaikouoyushiteimasu",
	},
	{
		jp: "人を助けることが好きです",
		kana: "ひとをたすけることがすきです",
		romaji: "itotasukekotogasukidesu",
	},
	{
		jp: "感謝の気持ちが大事です",
		kana: "かんしゃのきもちがたいじです",
		romaji: "kanshannokimochigataijidesu",
	},
	{
		jp: "環境整備に取り組んでいます",
		kana: "かんきょうせいびにとりくんでいます",
		romaji: "kankyouseibinitorikunditeimasu",
	},
	{
		jp: "困ったときは助け合います",
		kana: "こまったときはたすけあいます",
		romaji: "komaatakiwahatasukeiamasu",
	},
	{
		jp: "責任感が強くなりました",
		kana: "せきにんかんがつよくなりました",
		romaji: "sekninkangatsuoyokunarimashita",
	},
	{
		jp: "相互扶助の精神があります",
		kana: "そうごふじょのせいしんがあります",
		romaji: "sougofjounoseishinagaarimasu",
	},
	{
		jp: "合唱団に入りました",
		kana: "がっしょうだんにはいりました",
		romaji: "gsshoudannihairimashita",
	},
	{
		jp: "両親を敬っています",
		kana: "りょうしんをうやまっています",
		romaji: "ryoushinwouymaumatteimasu",
	},
	{
		jp: "人を信じることが増えました",
		kana: "ひとをしんじることがふえました",
		romaji: "hitowoshinjiruktogafuemashita",
	},
	{
		jp: "親友と長く付き合っています",
		kana: "しんゆうとながくつきあっています",
		romaji: "shinyuutomagakutsukiatteimasu",
	},
	{
		jp: "動物愛護ボランティアです",
		kana: "どうぶつあいごぼらんてぃあです",
		romaji: "doubutsaigoborantidesu",
	},
	{
		jp: "社会福祉の仕事をしています",
		kana: "しゃかいふくしのしごとをしています",
		romaji: "shakaifukushisigotowoshiteimasu",
	},
	{
		jp: "祭りを一緒に準備しました",
		kana: "まつりをいっしょにじゅんびしました",
		romaji: "matsuriwoisshonijunbisaimashita",
	},
	{
		jp: "家族のために働いています",
		kana: "かぞくのためにはたらいています",
		romaji: "kazokunotamenihataraiteimasu",
	},
	{
		jp: "高齢者支援ボランティアをしています",
		kana: "こうれいしゃしえんぼらんてぃあをしています",
		romaji: "koureishashienborantawositeimasu",
	},
	{
		jp: "献血活動に協力しています",
		kana: "けんけつかつどうにきょうりょくしています",
		romaji: "kenketsukatsudonikyouroyokusiteimsau",
	},
	{
		jp: "貧困対策に参加しています",
		kana: "ひんこんたいさくにさんかしています",
		romaji: "hinkuntaisakunisankashiteimasu",
	},
	{
		jp: "友達と毎日遊びます",
		kana: "ともだちとまいにちあそびます",
		romaji: "tomodachitomainichiasobimasu",
	},
	{
		jp: "手を差し伸べます",
		kana: "てをさしのべます",
		romaji: "tewosashinodemasu",
	},
	{
		jp: "クラブに参加しています",
		kana: "くらぶにさんかしています",
		romaji: "kurabunisankashiteimasu",
	},
	{
		jp: "思いやりが深まりました",
		kana: "おもいやりがふかまりました",
		romaji: "omoiyarigafukamamashita",
	},
	{
		jp: "責任を果たします",
		kana: "せきにんをはたします",
		romaji: "sekinnnwohatasimasu",
	},
	{
		jp: "貴重な経験をしました",
		kana: "きちょうなけいけんをしました",
		romaji: "kichounaakaikennwoshimashita",
	},
	{
		jp: "子ども支援ボランティアをしています",
		kana: "こどもしえんぼらんてぃあをしています",
		romaji: "kodomoshienborantawositeimasu",
	},
	{
		jp: "感謝を忘れません",
		kana: "かんしゃをわすれません",
		romaji: "kanshawowasuremasen",
	},
	{
		jp: "新しい友達ができました",
		kana: "あたらしいともだちができました",
		romaji: "atarasiitomodachigadekinasimashita",
	},
	{
		jp: "地域活動で成長しました",
		kana: "ちいきかつどうでせいちょうしました",
		romaji: "chiikkatsuodowoseiochousimashita",
	},
	{
		jp: "礼儀を重んじています",
		kana: "れいぎをおもんじています",
		romaji: "reigiowoomnjiteimasu",
	},
	{
		jp: "友人に感謝しています",
		kana: "ゆうじんにかんしゃしています",
		romaji: "yuujinnikakushashiteimasu",
	},
	{
		jp: "イベントを企画しています",
		kana: "いべんとをきかくしています",
		romaji: "ibenntowokikakushiteimasu",
	},
	{
		jp: "自分を成長させています",
		kana: "じぶんをせいちょうさせています",
		romaji: "jibunooseichousaseteimasu",
	},
	{
		jp: "一体感を感じます",
		kana: "いったいかんをかんじます",
		romaji: "ittaikannwokanjimasu",
	},
	{
		jp: "年上の人を敬います",
		kana: "としうえのひとをうやまいます",
		romaji: "toshuenonohitowouayamaimasu",
	},
	{
		jp: "友達を大切にしています",
		kana: "ともだちをたいせつにしています",
		romaji: "tomodachiwotaisetsunishiteimasu",
	},
	{
		jp: "誰もが大切な存在です",
		kana: "だれもがたいせつなそんざいです",
		romaji: "daremogtaisetsunasozaiidesu",
	},
	{
		jp: "子ども支援に力を入れています",
		kana: "こどもしえんにちからをいれています",
		romaji: "kodishiennichukaraoireiteimasu",
	},
	{
		jp: "誰もが価値のある人です",
		kana: "だれもがかちのあるひとです",
		romaji: "daremogtachinoaruhitodesu",
	},
	{
		jp: "サークル活動をしています",
		kana: "さーくるかつどうをしています",
		romaji: "sakurukatsudowoshiteimasu",
	},
	{
		jp: "助けを求めることも大事です",
		kana: "たすけをもとめることもたいじです",
		romaji: "tasukewomotomeruktomtaijidesu",
	},
	{
		jp: "家族の幸せが一番です",
		kana: "かぞくのしあわせがいちばんです",
		romaji: "kazukunoshuawaseigaichibandesu",
	},
	{
		jp: "謙虚な姿勢です",
		kana: "けんきょなしせいです",
		romaji: "kenkkyonashiseiideus",
	},
	{
		jp: "隣人とは仲が良いです",
		kana: "りんじんとはなかがよいです",
		romaji: "rinjintohanakagayoidesu",
	},
	{
		jp: "環境保全ボランティアです",
		kana: "かんきょうほぜんぼらんてぃあです",
		romaji: "kankyouhozenbotanidesu",
	},
	{
		jp: "町の交流会で会いましょう",
		kana: "まちのこうりゅうかいであいましょう",
		romaji: "machinokouryuukaiaikourou",
	},
	{
		jp: "言葉を選んで話します",
		kana: "ことばをえらんではなします",
		romaji: "kotobawoerandanhanashimasu",
	},
	{
		jp: "共通の目標を目指しています",
		kana: "きょうつうのもくひょうをめざしています",
		romaji: "kyoutsuunomokuhyouwomezashiteimasu",
	},
	{
		jp: "言葉遣いに気をつけます",
		kana: "ことばづかいにきをつけます",
		romaji: "kotobazukainikinitsukemasu",
	},
	{
		jp: "老人ホームでボランティアをしています",
		kana: "ろうじんほーむでぼらんてぃあをしています",
		romaji: "roujinhoomudeborantiaawoshiteimasu",
	},
	{
		jp: "相手のために動きます",
		kana: "あいてのためにうごきます",
		romaji: "aitnnnoatamenidugokimasku",
	},
	{
		jp: "祖父母を大事にします",
		kana: "そふぼをだいじにします",
		romaji: "sofuobodaijinishimasu",
	},
	{
		jp: "すべての人を尊重します",
		kana: "すべてのひとをそんちょうします",
		romaji: "subetenohitowosonchouishimasu",
	},
	{
		jp: "障害者支援の活動をしています",
		kana: "しょうがいしゃしえんのかつどうをしています",
		romaji: "shougaishashienshnokatsudowoshiteimasu",
	},
	{
		jp: "公共の場を大事にします",
		kana: "こうきょうのばをたいじにします",
		romaji: "koukounobawotuijinishimasu",
	},
	{
		jp: "高齢者を大事にします",
		kana: "こうれいしゃをたいじにします",
		romaji: "koureishawotaijinishimasu",
	},
	{
		jp: "町内会の役員をしています",
		kana: "ちょうないかいのやくいんをしています",
		romaji: "chounaikaiyakuinwoshiteimasu",
	},
	{
		jp: "教育支援ボランティアです",
		kana: "きょういくしえんぼらんてぃあです",
		romaji: "kyouikushienborantiaadesu",
	},
	{
		jp: "共感できる人がいます",
		kana: "きょうかんできるひとがいます",
		romaji: "kyoukandekuruhitogaiamasu",
	},
	{
		jp: "信頼が基本です",
		kana: "しんらいがきほんです",
		romaji: "shinaiigakiohndesu",
	},
	{
		jp: "部活動に熱心です",
		kana: "ぶかつどうにねっしんです",
		romaji: "bukatsudounineshinndesu",
	},
	{
		jp: "お互いに支え合う社会です",
		kana: "おたがいにささえあうしゃかいです",
		romaji: "otaguainissasaeaushakaidesu",
	},
	{
		jp: "兄弟を手伝っています",
		kana: "あにおとうとをてつだっています",
		romaji: "aniotowtotetsudatteimasu",
	},
	{
		jp: "住みやすい地域にしたいです",
		kana: "すみやすいちいきにしたいです",
		romaji: "sumiyasuichiikiinishitaide",
	},
	{
		jp: "学園祭を盛り上げます",
		kana: "がくえんさいをもりあげます",
		romaji: "gakuensaiwomodageimasu",
	},
	{
		jp: "思いやりの心を持っています",
		kana: "おもいやりのこころをもっています",
		romaji: "omoiyarinnokrwoomoteimasu",
	},
	{
		jp: "困っている人を手伝います",
		kana: "こまっているひとをてつだいます",
		romaji: "komaatteruritotetsudaimasu",
	},
	{
		jp: "募金活動に参加しました",
		kana: "ぼきんかつどうにさんかしました",
		romaji: "bokinkatsudounisakashimashita",
	},
	{
		jp: "孤独な人に寄り添っています",
		kana: "こどくなひとによりそっています",
		romaji: "kodokunitonoyorisoateimasu",
	},
	{
		jp: "視点が変わりました",
		kana: "してんがかわりました",
		romaji: "shitengakawarimashita",
	},
	{
		jp: "みんなのために働きます",
		kana: "みんなのためにはたらきます",
		romaji: "minnannotamenihatarakimasu",
	},
	{
		jp: "支援を感謝して受けます",
		kana: "しえんをかんしゃしてうけます",
		romaji: "shienokanshashiteukemasu",
	},
	{
		jp: "誠実さが大切です",
		kana: "せいじつさがたいせつです",
		romaji: "seijtsusagtaisetsudeus",
	},
	{
		jp: "チームで協力して仕事をしています",
		kana: "ちーむできょうりょくしてしごとをしています",
		romaji: "chimudekyoryokushitesigotowoshiteimasu",
	},
	{
		jp: "相手を尊重しています",
		kana: "あいてをそんちょうしています",
		romaji: "aitewosonchoushiteimasu",
	},
	{
		jp: "多言語サポートボランティアです",
		kana: "たげんごさぽーとぼらんてぃあです",
		romaji: "tagengosapotoborantidesu",
	},
	{
		jp: "互いに支え合っています",
		kana: "たがいにささえあっています",
		romaji: "tagaiinisasaeateimasu",
	},
	{
		jp: "協調性を大切にします",
		kana: "きょうちょうせいをたいせつにします",
		romaji: "kyouchouseiwotuisetsunishimasu",
	},
	{
		jp: "友人と信頼関係があります",
		kana: "ゆうじんとしんらいかんけいがあります",
		romaji: "yuujintoshinraikankeiagaarimasu",
	},
	{
		jp: "公園の清掃をしました",
		kana: "こうえんのせいそうをしました",
		romaji: "koumennoseisouwoshimashita",
	},
	{
		jp: "環境保全活動に参加しています",
		kana: "かんきょうほぜんかつどうにさんかしています",
		romaji: "kankyouhozenkatsudonisankashiteimasu",
	},
	{
		jp: "力を貸します",
		kana: "ちからをかします",
		romaji: "chikarawokaashimasu",
	},
	{
		jp: "友達の相談に乗ります",
		kana: "ともだちのそうだんにのります",
		romaji: "tomodachinousoudanninorimusu",
	},
	{
		jp: "町内活動を推進しています",
		kana: "ちょうないかつどうをすいしんしています",
		romaji: "chounaikatsuodowousuishinshiteimasu",
	},
	{
		jp: "長年の友情を大事にしています",
		kana: "ながねんのゆうじょうをだいじにしています",
		romaji: "naganennyouyuujouwoduijinishiteimasu",
	},
	{
		jp: "親子の絆を大切にしています",
		kana: "おやこのきずなをたいせつにしています",
		romaji: "oyakoonokizunawotuisetsunishiteimasu",
	},
	{
		jp: "団結力は強いです",
		kana: "だんけつりょくはつよいです",
		romaji: "danketsuyrokuhatsuyoidesu",
	},
	{
		jp: "相手を理解しようとします",
		kana: "あいてをりかいしようとします",
		romaji: "aiteworikaishiyoutoshimasu",
	},
	{
		jp: "病人を看病しました",
		kana: "びょうにんをかんびょうしました",
		romaji: "byouninwokabnyoushimashita",
	},
	{
		jp: "子どもたちに勉強を教えています",
		kana: "こどもたちにべんきょうをおしえています",
		romaji: "kodomotachibenkyouwooshaeteimasu",
	},
	{
		jp: "信頼できる友達がいます",
		kana: "しんらいできるともだちがいます",
		romaji: "shinraidekirutomodachigaiamasu",
	},
	{
		jp: "社区見守り活動に参加しています",
		kana: "しゃかいみまもりかつどうにさんかしています",
		romaji: "shakaimimomoraktsudonisankashiteimasu",
	},
	{
		jp: "情報共有を大事にしています",
		kana: "じょうほうきょうゆうをたいじにしています",
		romaji: "jouhoukyouyuwotuijinishiteimasu",
	},
	{
		jp: "地域課題に取り組んでいます",
		kana: "ちいきかだいにとりくんでいます",
		romaji: "chiikikadainitoriknditeimasu",
	},
	{
		jp: "相談しやすい環境を作ります",
		kana: "そうだんしやすいかんきょうをつくります",
		romaji: "soudanshiyasuikankyowotskimasu",
	},
	{
		jp: "リーダーシップを発揮しています",
		kana: "りーだーしっぷをはっきしています",
		romaji: "ridashippuhakkishiteimasu",
	},
	{
		jp: "問題解決能力を高めています",
		kana: "もんだいかいけつのうりょくをたかめています",
		romaji: "mondaikaketsunourityakutameteimasu",
	},
	{
		jp: "組織運営に参加しています",
		kana: "そしきうんえいにさんかしています",
		romaji: "soskiuneinisankashiteimasu",
	},
	{
		jp: "予算管理を担当しています",
		kana: "よさんかんりをたんとうしています",
		romaji: "yosankannriwtantousiteimasu",
	},
	{
		jp: "記録を丁寧に取っています",
		kana: "きろくをていねいにとっています",
		romaji: "kirokwoteinenitoteimasu",
	},
	{
		jp: "報告書を作成しています",
		kana: "ほうこくしょをさくせいしています",
		romaji: "houkokushowosakseishiteimasu",
	},
	{
		jp: "企画書を準備しています",
		kana: "きかくしょをじゅんびしています",
		romaji: "kikushowoujnnbisitaimeasu",
	},
	{
		jp: "会議を開催しています",
		kana: "かいぎをかいさいしています",
		romaji: "kaigiwokaasaishiteimasu",
	},
	{
		jp: "広報活動に力を入れています",
		kana: "こうほうかつどうにちからをいれています",
		romaji: "kouhoukatsudonichkaraoireiteimasu",
	},
	{
		jp: "イベント企画をしています",
		kana: "いべんときかくをしています",
		romaji: "ibenntokikawoshiteimasu",
	},
	{
		jp: "参加者を募集しています",
		kana: "さんかしゃをぼしゅうしています",
		romaji: "sankashawooboshushiteimasu",
	},
	{
		jp: "予定を調整しています",
		kana: "よていをちょうせいしています",
		romaji: "yoteitwochousseishiteimasu",
	},
	{
		jp: "日程を決めています",
		kana: "にっていをきめています",
		romaji: "nitteiwokmeteimasu",
	},
	{
		jp: "費用を管理しています",
		kana: "ひようをかんりしています",
		romaji: "hiyouwokanrishiteimasu",
	},
	{
		jp: "ボランティア保険に入ります",
		kana: "ぼらんてぃあほけんにはいります",
		romaji: "borantiahokeninihairimasu",
	},
	{
		jp: "安全管理を厳しく管理します",
		kana: "あんぜんかんりをきびしくかんりします",
		romaji: "anzennkaannriowokibshikunnkansimasu",
	},
	{
		jp: "実績を評価しています",
		kana: "じっせきをひょうかしています",
		romaji: "jisseekiwohyoakashiteimasu",
	},
	{
		jp: "成果を共有しています",
		kana: "せいかをきょうゆうしています",
		romaji: "seikawokoyushiteimasu",
	},
	{
		jp: "改善点を検討しています",
		kana: "かいぜんてんをけんとうしています",
		romaji: "kaizentennwokentositeimasu",
	},
	{
		jp: "次の計画を立てています",
		kana: "つぎのけいかくをたてています",
		romaji: "tsgukinokkakwotateimasu",
	},
	{
		jp: "人材育成に取り組んでいます",
		kana: "じんざいいくせいにとりくんでいます",
		romaji: "jinzaaikuseinitorikunditeimasu",
	},
	{
		jp: "スキル習得をサポートします",
		kana: "すきるしゅうとくをさぽーとします",
		romaji: "sukirushuutokuwasapotoshimasu",
	},
	{
		jp: "後進を育成しています",
		kana: "こうしんをいくせいしています",
		romaji: "koushinwoikuseishiteimasu",
	},
	{
		jp: "経験を伝えています",
		kana: "けいけんをつたえています",
		romaji: "keekennwotutaeteimasu",
	},
	{
		jp: "知識を共有しています",
		kana: "ちしきをきょうゆうしています",
		romaji: "chishkiwokoyushiteimasu",
	},
	{
		jp: "技術を教えています",
		kana: "ぎじゅつをおしえています",
		romaji: "gijutsuwooshshiteimasu",
	},
	{
		jp: "目標達成に向けて努力しています",
		kana: "もくひょうたっせいにむけてどりょくしています",
		romaji: "mokuhyoutasseeinimuketetdoryokushiteimasu",
	},
	{
		jp: "変化に対応しています",
		kana: "へんかにたいおうしています",
		romaji: "henknitaioushiteimasu",
	},
	{
		jp: "課題を解決する力があります",
		kana: "かだいをかいけつするちからがあります",
		romaji: "kadaiwoaiketsusruchikaraaguarimasu",
	},
	{
		jp: "創意工夫をしています",
		kana: "そういこうふをしています",
		romaji: "souikouwoushiteimasu",
	},
	{
		jp: "新しい試みをしています",
		kana: "あたらしいこころみをしています",
		romaji: "atasrahiikkoromiwoshiteimasu",
	},
	{
		jp: "社会貢献が喜びです",
		kana: "しゃかいこうけんがよろこびです",
		romaji: "shakaaikoukengatyorokoibidesu",
	},
	{
		jp: "人の役に立つことが好きです",
		kana: "ひとのやくにたつことがすきです",
		romaji: "itnnoyakunittatsukotogasukidesu",
	},
	{
		jp: "感謝されることが嬉しいです",
		kana: "かんしゃされることがうれしいです",
		romaji: "kanshsareruktogaureshidesu",
	},
	{
		jp: "やりがいを感じています",
		kana: "やりがいをかんじています",
		romaji: "yarigaiwokanjtiteimasu",
	},
	{
		jp: "社会に役立ちたいです",
		kana: "しゃかいにやくだちたいです",
		romaji: "shakainiykudachitaideus",
	},
	{
		jp: "ようこそ",
		kana: "ようこそ",
		romaji: "youkoso",
	},
	{
		jp: "おはようございます",
		kana: "おはようございます",
		romaji: "ohayougozaimasu",
	},
	{
		jp: "おにぎりをください",
		kana: "おにぎりをください",
		romaji: "onigiriwokudasai",
	},
	{
		jp: "パンがあります",
		kana: "ぱんがあります",
		romaji: "pangaarimasu",
	},
	{
		jp: "サンドイッチはありますか",
		kana: "さんどいっちはありますか",
		romaji: "sandoicchihaarimasuka",
	},
	{
		jp: "お弁当をください",
		kana: "おべんとうをください",
		romaji: "obentouwokudasai",
	},
	{
		jp: "コーヒーをください",
		kana: "こーひーをください",
		romaji: "kohiwokudasai",
	},
	{
		jp: "ジュースがあります",
		kana: "じゅーすがあります",
		romaji: "jiyusugaarimasu",
	},
	{
		jp: "牛乳をください",
		kana: "ぎゅうにゅうをください",
		romaji: "giyuuniyuuwokudasai",
	},
	{
		jp: "アイスクリーム",
		kana: "あいすくりーむ",
		romaji: "aisukurimu",
	},
	{
		jp: "チョコレート",
		kana: "ちょこれーと",
		romaji: "chiyokoreto",
	},
	{
		jp: "キャンディ",
		kana: "きゃんでぃ",
		romaji: "kiyandeぃ",
	},
	{
		jp: "チップス",
		kana: "ちっぷす",
		romaji: "chippusu",
	},
	{
		jp: "ポテト",
		kana: "ぽてと",
		romaji: "poteto",
	},
	{
		jp: "クッキー",
		kana: "くっきー",
		romaji: "kukki",
	},
	{
		jp: "ケーキ",
		kana: "けーき",
		romaji: "keki",
	},
	{
		jp: "トマトはいくらですか",
		kana: "とまとはいくらですか",
		romaji: "tomatohaikuradesuka",
	},
	{
		jp: "バナナがあります",
		kana: "ばなながあります",
		romaji: "bananagaarimasu",
	},
	{
		jp: "ブドウをください",
		kana: "ぶどうをください",
		romaji: "budouwokudasai",
	},
	{
		jp: "イチゴがあります",
		kana: "いちごがあります",
		romaji: "ichigogaarimasu",
	},
	{
		jp: "メロン",
		kana: "めろん",
		romaji: "meron",
	},
	{
		jp: "スイカ",
		kana: "すいか",
		romaji: "suika",
	},
	{
		jp: "ミカン",
		kana: "みかん",
		romaji: "mikan",
	},
	{
		jp: "リンゴ",
		kana: "りんご",
		romaji: "ringo",
	},
	{
		jp: "ナシ",
		kana: "なし",
		romaji: "nashi",
	},
	{
		jp: "モモ",
		kana: "もも",
		romaji: "momo",
	},
	{
		jp: "ニンジン",
		kana: "にんじん",
		romaji: "ninjin",
	},
	{
		jp: "キャベツ",
		kana: "きゃべつ",
		romaji: "kiyabetsu",
	},
	{
		jp: "レタス",
		kana: "れたす",
		romaji: "retasu",
	},
	{
		jp: "ネギ",
		kana: "ねぎ",
		romaji: "negi",
	},
	{
		jp: "タマネギ",
		kana: "たまねぎ",
		romaji: "tamanegi",
	},
	{
		jp: "ジャガイモ",
		kana: "じゃがいも",
		romaji: "jiyagaimo",
	},
	{
		jp: "トウモロコシ",
		kana: "とうもろこし",
		romaji: "toumorokoshi",
	},
	{
		jp: "カボチャ",
		kana: "かぼちゃ",
		romaji: "kabochiya",
	},
	{
		jp: "キュウリ",
		kana: "きゅうり",
		romaji: "kiyuuri",
	},
	{
		jp: "ナスビ",
		kana: "なすび",
		romaji: "nasubi",
	},
	{
		jp: "チーズがあります",
		kana: "ちーずがあります",
		romaji: "chizugaarimasu",
	},
	{
		jp: "バター",
		kana: "ばたー",
		romaji: "bata",
	},
	{
		jp: "ヨーグルト",
		kana: "よーぐると",
		romaji: "yoguruto",
	},
	{
		jp: "卵をください",
		kana: "たまごをください",
		romaji: "tamagowokudasai",
	},
	{
		jp: "牛乳です",
		kana: "ぎゅうにゅうです",
		romaji: "giyuuniyuudesu",
	},
	{
		jp: "鶏肉",
		kana: "とりにく",
		romaji: "toriniku",
	},
	{
		jp: "豚肉",
		kana: "ぶたにく",
		romaji: "butaniku",
	},
	{
		jp: "牛肉",
		kana: "ぎゅうにく",
		romaji: "giyuuniku",
	},
	{
		jp: "魚",
		kana: "さかな",
		romaji: "sakana",
	},
	{
		jp: "サーモン",
		kana: "さーもん",
		romaji: "samon",
	},
	{
		jp: "マグロ",
		kana: "まぐろ",
		romaji: "maguro",
	},
	{
		jp: "エビ",
		kana: "えび",
		romaji: "ebi",
	},
	{
		jp: "カニ",
		kana: "かに",
		romaji: "kani",
	},
	{
		jp: "冷凍食品",
		kana: "れいとうしょくひん",
		romaji: "reitoushiyokuhin",
	},
	{
		jp: "ハンバーグ",
		kana: "はんばーぐ",
		romaji: "hanbagu",
	},
	{
		jp: "ピザ",
		kana: "ぴざ",
		romaji: "piza",
	},
	{
		jp: "唐揚げ",
		kana: "からあげ",
		romaji: "karaage",
	},
	{
		jp: "コロッケ",
		kana: "ころっけ",
		romaji: "korokke",
	},
	{
		jp: "シューマイ",
		kana: "しゅーまい",
		romaji: "shiyumai",
	},
	{
		jp: "春巻き",
		kana: "はるまき",
		romaji: "harumaki",
	},
	{
		jp: "お茶",
		kana: "おちゃ",
		romaji: "ochiya",
	},
	{
		jp: "紅茶",
		kana: "こうちゃ",
		romaji: "kouchiya",
	},
	{
		jp: "水",
		kana: "みず",
		romaji: "mizu",
	},
	{
		jp: "炭酸水",
		kana: "たんさんすい",
		romaji: "tansansui",
	},
	{
		jp: "スポーツドリンク",
		kana: "すぽーつどりんく",
		romaji: "supotsudorinku",
	},
	{
		jp: "ビール",
		kana: "びーる",
		romaji: "biru",
	},
	{
		jp: "ワイン",
		kana: "わいん",
		romaji: "wain",
	},
	{
		jp: "日本酒",
		kana: "にほんしゅ",
		romaji: "nihonshiyu",
	},
	{
		jp: "焼酎",
		kana: "しょうちゅう",
		romaji: "shiyouchiyuu",
	},
	{
		jp: "塩",
		kana: "しお",
		romaji: "shio",
	},
	{
		jp: "砂糖",
		kana: "さとう",
		romaji: "satou",
	},
	{
		jp: "醤油",
		kana: "しょうゆ",
		romaji: "shiyouyu",
	},
	{
		jp: "味噌",
		kana: "みそ",
		romaji: "miso",
	},
	{
		jp: "ソース",
		kana: "そーす",
		romaji: "sosu",
	},
	{
		jp: "マヨネーズ",
		kana: "まよねーず",
		romaji: "mayonezu",
	},
	{
		jp: "ケチャップ",
		kana: "けちゃっぷ",
		romaji: "kechiyappu",
	},
	{
		jp: "唐辛子",
		kana: "とうがらし",
		romaji: "tougarashi",
	},
	{
		jp: "わさび",
		kana: "わさび",
		romaji: "wasabi",
	},
	{
		jp: "お釣り",
		kana: "おつり",
		romaji: "otsuri",
	},
	{
		jp: "レジ",
		kana: "れじ",
		romaji: "reji",
	},
	{
		jp: "現金",
		kana: "げんきん",
		romaji: "genkin",
	},
	{
		jp: "ポイント",
		kana: "ぽいんと",
		romaji: "pointo",
	},
	{
		jp: "割引",
		kana: "わりびき",
		romaji: "waribiki",
	},
	{
		jp: "セール",
		kana: "せーる",
		romaji: "seru",
	},
	{
		jp: "安い",
		kana: "やすい",
		romaji: "yasui",
	},
	{
		jp: "高い",
		kana: "たかい",
		romaji: "takai",
	},
	{
		jp: "値段",
		kana: "ねだん",
		romaji: "nedan",
	},
	{
		jp: "袋をください",
		kana: "ふくろをください",
		romaji: "fukurowokudasai",
	},
	{
		jp: "買い物かご",
		kana: "かいものかご",
		romaji: "kaimonokago",
	},
	{
		jp: "買い物袋",
		kana: "かいものぶくろ",
		romaji: "kaimonobukuro",
	},
	{
		jp: "カゴ",
		kana: "かご",
		romaji: "kago",
	},
	{
		jp: "会計",
		kana: "かいけい",
		romaji: "kaikei",
	},
	{
		jp: "レジに行く",
		kana: "れじにいく",
		romaji: "rejiniiku",
	},
	{
		jp: "並ぶ",
		kana: "ならぶ",
		romaji: "narabu",
	},
	{
		jp: "順番",
		kana: "じゅんばん",
		romaji: "jiyunban",
	},
	{
		jp: "食品コーナー",
		kana: "しょくひんこーなー",
		romaji: "shiyokuhinkona",
	},
	{
		jp: "飲料コーナー",
		kana: "いんりょうこーなー",
		romaji: "inriyoukona",
	},
	{
		jp: "お菓子コーナー",
		kana: "おかしこーなー",
		romaji: "okashikona",
	},
	{
		jp: "日用品コーナー",
		kana: "にちようひんこーなー",
		romaji: "nichiyouhinkona",
	},
	{
		jp: "衣料品",
		kana: "いりょうひん",
		romaji: "iriyouhin",
	},
	{
		jp: "化粧品",
		kana: "けしょうひん",
		romaji: "keshiyouhin",
	},
	{
		jp: "洗剤",
		kana: "せんざい",
		romaji: "senzai",
	},
	{
		jp: "ティッシュ",
		kana: "てぃっしゅ",
		romaji: "teぃsshiyu",
	},
	{
		jp: "コンビニ",
		kana: "こんびに",
		romaji: "konbini",
	},
	{
		jp: "スーパー",
		kana: "すーぱー",
		romaji: "supa",
	},
	{
		jp: "商店街",
		kana: "しょうてんがい",
		romaji: "shiyoutengai",
	},
	{
		jp: "市場",
		kana: "いちば",
		romaji: "ichiba",
	},
	{
		jp: "八百屋",
		kana: "やおや",
		romaji: "yaoya",
	},
	{
		jp: "肉屋",
		kana: "にくや",
		romaji: "nikuya",
	},
	{
		jp: "魚屋",
		kana: "さかなや",
		romaji: "sakanaya",
	},
	{
		jp: "ベーカリー",
		kana: "べーかりー",
		romaji: "bekari",
	},
	{
		jp: "営業時間",
		kana: "えいぎょうじかん",
		romaji: "eigiyoujikan",
	},
	{
		jp: "朝七時",
		kana: "あさしちじ",
		romaji: "asashichiji",
	},
	{
		jp: "夜中",
		kana: "よなか",
		romaji: "yonaka",
	},
	{
		jp: "二十四時間営業",
		kana: "にじゅうよじかんえいぎょう",
		romaji: "nijiyuuyojikaneigiyou",
	},
	{
		jp: "休日",
		kana: "きゅうじつ",
		romaji: "kiyuujitsu",
	},
	{
		jp: "定休日",
		kana: "ていきゅうじつ",
		romaji: "teikiyuujitsu",
	},
	{
		jp: "在庫",
		kana: "ざいこ",
		romaji: "zaiko",
	},
	{
		jp: "品切れ",
		kana: "しなぎれ",
		romaji: "shinagire",
	},
	{
		jp: "在庫あります",
		kana: "ざいこあります",
		romaji: "zaikoarimasu",
	},
	{
		jp: "在庫ありません",
		kana: "ざいこありません",
		romaji: "zaikoarimasen",
	},
	{
		jp: "近日入荷",
		kana: "きんじつにゅうか",
		romaji: "kinjitsuniyuuka",
	},
	{
		jp: "売り切れ",
		kana: "うりきれ",
		romaji: "urikire",
	},
	{
		jp: "買い物をする",
		kana: "かいものをする",
		romaji: "kaimonowosuru",
	},
	{
		jp: "品物を見る",
		kana: "しなものをみる",
		romaji: "shinamonowomiru",
	},
	{
		jp: "カゴに入れる",
		kana: "かごにいれる",
		romaji: "kagoniireru",
	},
	{
		jp: "品物を持つ",
		kana: "しなものをもつ",
		romaji: "shinamonowomotsu",
	},
	{
		jp: "商品を探す",
		kana: "しょうひんをさがす",
		romaji: "shiyouhinwosagasu",
	},
	{
		jp: "歩く",
		kana: "あるく",
		romaji: "aruku",
	},
	{
		jp: "探す",
		kana: "さがす",
		romaji: "sagasu",
	},
	{
		jp: "見る",
		kana: "みる",
		romaji: "miru",
	},
	{
		jp: "取る",
		kana: "とる",
		romaji: "toru",
	},
	{
		jp: "選ぶ",
		kana: "えらぶ",
		romaji: "erabu",
	},
	{
		jp: "どこにありますか",
		kana: "どこにありますか",
		romaji: "dokoniarimasuka",
	},
	{
		jp: "何がありますか",
		kana: "なにがありますか",
		romaji: "nanigaarimasuka",
	},
	{
		jp: "サイズはありますか",
		kana: "さいずはありますか",
		romaji: "saizuhaarimasuka",
	},
	{
		jp: "色はありますか",
		kana: "いろはありますか",
		romaji: "irohaarimasuka",
	},
	{
		jp: "味はありますか",
		kana: "あじはありますか",
		romaji: "ajihaarimasuka",
	},
	{
		jp: "在庫はありますか",
		kana: "ざいこはありますか",
		romaji: "zaikohaarimasuka",
	},
	{
		jp: "毎日来ます",
		kana: "まいにちきます",
		romaji: "mainichikimasu",
	},
	{
		jp: "今日も来た",
		kana: "きょうもきた",
		romaji: "kiyoumokita",
	},
	{
		jp: "週に一回",
		kana: "しゅうにいっかい",
		romaji: "shiyuuniikkai",
	},
	{
		jp: "月に一回",
		kana: "つきにいっかい",
		romaji: "tsukiniikkai",
	},
	{
		jp: "いつも来る",
		kana: "いつもくる",
		romaji: "itsumokuru",
	},
	{
		jp: "新しい商品",
		kana: "あたらしいしょうひん",
		romaji: "atarashiishiyouhin",
	},
	{
		jp: "人気商品",
		kana: "にんきしょうひん",
		romaji: "ninkishiyouhin",
	},
	{
		jp: "限定品",
		kana: "げんていひん",
		romaji: "genteihin",
	},
	{
		jp: "お得",
		kana: "おとく",
		romaji: "otoku",
	},
	{
		jp: "買い得",
		kana: "かいどく",
		romaji: "kaidoku",
	},
	{
		jp: "納豆",
		kana: "なっとう",
		romaji: "nattou",
	},
	{
		jp: "豆腐",
		kana: "とうふ",
		romaji: "toufu",
	},
	{
		jp: "こんにゃく",
		kana: "こんにゃく",
		romaji: "konniyaku",
	},
	{
		jp: "麺類",
		kana: "めんるい",
		romaji: "menrui",
	},
	{
		jp: "うどん",
		kana: "うどん",
		romaji: "udon",
	},
	{
		jp: "蕎麦",
		kana: "そば",
		romaji: "soba",
	},
	{
		jp: "ラーメン",
		kana: "らーめん",
		romaji: "ramen",
	},
	{
		jp: "パスタ",
		kana: "ぱすた",
		romaji: "pasuta",
	},
	{
		jp: "米",
		kana: "こめ",
		romaji: "kome",
	},
	{
		jp: "小麦粉",
		kana: "こむぎこ",
		romaji: "komugiko",
	},
	{
		jp: "油",
		kana: "あぶら",
		romaji: "abura",
	},
	{
		jp: "酢",
		kana: "す",
		romaji: "su",
	},
	{
		jp: "支払う",
		kana: "しはらう",
		romaji: "shiharau",
	},
	{
		jp: "会計する",
		kana: "かいけいする",
		romaji: "kaikeisuru",
	},
	{
		jp: "包む",
		kana: "つつむ",
		romaji: "tsutsumu",
	},
	{
		jp: "運ぶ",
		kana: "はこぶ",
		romaji: "hakobu",
	},
	{
		jp: "持ち帰る",
		kana: "もちかえる",
		romaji: "mochikaeru",
	},
	{
		jp: "配達",
		kana: "はいたつ",
		romaji: "haitatsu",
	},
	{
		jp: "通販",
		kana: "つうはん",
		romaji: "tsuuhan",
	},
	{
		jp: "オンライン",
		kana: "おんらいん",
		romaji: "onrain",
	},
	{
		jp: "ください",
		kana: "ください",
		romaji: "kudasai",
	},
	{
		jp: "お願いします",
		kana: "おねがいします",
		romaji: "onegaishimasu",
	},
	{
		jp: "教えてください",
		kana: "おしえてください",
		romaji: "oshietekudasai",
	},
	{
		jp: "手伝ってください",
		kana: "てつだってください",
		romaji: "tetsudattekudasai",
	},
	{
		jp: "新鮮",
		kana: "しんせん",
		romaji: "shinsen",
	},
	{
		jp: "新鮮です",
		kana: "しんせんです",
		romaji: "shinsendesu",
	},
	{
		jp: "古い",
		kana: "ふるい",
		romaji: "furui",
	},
	{
		jp: "柔らかい",
		kana: "やわらかい",
		romaji: "yawarakai",
	},
	{
		jp: "硬い",
		kana: "かたい",
		romaji: "katai",
	},
	{
		jp: "甘い",
		kana: "あまい",
		romaji: "amai",
	},
	{
		jp: "酸っぱい",
		kana: "すっぱい",
		romaji: "suppai",
	},
	{
		jp: "塩辛い",
		kana: "しおからい",
		romaji: "shiokarai",
	},
	{
		jp: "辛い",
		kana: "からい",
		romaji: "karai",
	},
	{
		jp: "おいしい",
		kana: "おいしい",
		romaji: "oishii",
	},
	{
		jp: "店員",
		kana: "てんいん",
		romaji: "tenin",
	},
	{
		jp: "店長",
		kana: "てんちょう",
		romaji: "tenchiyou",
	},
	{
		jp: "レジ係",
		kana: "れじがかり",
		romaji: "rejigakari",
	},
	{
		jp: "警備員",
		kana: "けいびいん",
		romaji: "keibiin",
	},
	{
		jp: "品出し",
		kana: "しなだし",
		romaji: "shinadashi",
	},
	{
		jp: "清掃",
		kana: "せいそう",
		romaji: "seisou",
	},
	{
		jp: "棚卸し",
		kana: "たなおろし",
		romaji: "tanaoroshi",
	},
	{
		jp: "朝早い",
		kana: "あさはやい",
		romaji: "asahayai",
	},
	{
		jp: "昼時",
		kana: "ひるどき",
		romaji: "hirudoki",
	},
	{
		jp: "夕方",
		kana: "ゆうがた",
		romaji: "yuugata",
	},
	{
		jp: "晩",
		kana: "ばん",
		romaji: "ban",
	},
	{
		jp: "夜遅い",
		kana: "よるおそい",
		romaji: "yoruosoi",
	},
	{
		jp: "混雑",
		kana: "こんざつ",
		romaji: "konzatsu",
	},
	{
		jp: "塩を入れます",
		kana: "しおをいれます",
		romaji: "shiowoirëmasu",
	},
	{
		jp: "砂糖を加えます",
		kana: "さとうをくわえます",
		romaji: "satouwoküwaëmasu",
	},
	{
		jp: "水で洗います",
		kana: "みずであらいます",
		romaji: "mizudeäraïmasu",
	},
	{
		jp: "野菜を切ります",
		kana: "やさいをきります",
		romaji: "yasaiwokirïmasu",
	},
	{
		jp: "フライパンを熱します",
		kana: "ふらいぱんをあたためます",
		romaji: "furaipanwoatamëmasu",
	},
	{
		jp: "油を敷きます",
		kana: "あぶらをしきます",
		romaji: "aburawoşikïmasu",
	},
	{
		jp: "卵を割ります",
		kana: "たまごをわります",
		romaji: "tamagowowarïmasu",
	},
	{
		jp: "混ぜます",
		kana: "まぜます",
		romaji: "mazëmasu",
	},
	{
		jp: "煮込みます",
		kana: "にこみます",
		romaji: "nikomïmasu",
	},
	{
		jp: "焼きます",
		kana: "やきます",
		romaji: "yakïmasu",
	},
	{
		jp: "玉ねぎが必要です",
		kana: "たまねぎがひつようです",
		romaji: "tamanëgigahitsuyoudesu",
	},
	{
		jp: "にんにくを使います",
		kana: "にんにくをつかいます",
		romaji: "ninnikuswotsükaïmasu",
	},
	{
		jp: "しょうがを入れます",
		kana: "しょうがをいれます",
		romaji: "shouggawoirëmasu",
	},
	{
		jp: "キャベツを刻みます",
		kana: "きゃべつをきざみます",
		romaji: "kyabëtswoküzamïmasu",
	},
	{
		jp: "トマトは熟しています",
		kana: "ともとはじゅくしています",
		romaji: "tomotohajükushitëimasu",
	},
	{
		jp: "じゃがいもを煮ます",
		kana: "じゃがいもをにます",
		romaji: "jagaimowoninmasu",
	},
	{
		jp: "人参を薄く切ります",
		kana: "にんじんをうすくきります",
		romaji: "ninzinnwouşükukirïmasu",
	},
	{
		jp: "ブロッコリーが好きです",
		kana: "ぶろっこりーがすきです",
		romaji: "burokkorïgaşükidesu",
	},
	{
		jp: "豚肉を選びます",
		kana: "ぶたにくをえらびます",
		romaji: "butanikuwoërabïmasu",
	},
	{
		jp: "鶏肉を使いましょう",
		kana: "とりにくをつかいましょう",
		romaji: "torínikuwotsükaïmashō",
	},
	{
		jp: "レシピを確認します",
		kana: "れしぴをかくにんします",
		romaji: "reshipiwokaküninşuru",
	},
	{
		jp: "下準備を始めます",
		kana: "したじゅんびをはじめます",
		romaji: "şitazünbíwohaziméemasu",
	},
	{
		jp: "材料を計ります",
		kana: "ざいりょうをはかります",
		romaji: "zaíryouwohakarïmasu",
	},
	{
		jp: "塩加減を調べます",
		kana: "しおかげんをしらべます",
		romaji: "shiokagënwoşirabëmasu",
	},
	{
		jp: "味を見ます",
		kana: "あじをみます",
		romaji: "azïwomïmasu",
	},
	{
		jp: "十分に冷やします",
		kana: "じゅうぶんにひやします",
		romaji: "zuubunnihiyaşimasu",
	},
	{
		jp: "温度を確認します",
		kana: "おんどをかくにんします",
		romaji: "ondowokaküninşimasu",
	},
	{
		jp: "火加減を調整します",
		kana: "ひかげんをちょうせいします",
		romaji: "hikagënwochōsëişimasu",
	},
	{
		jp: "弱火で煮ます",
		kana: "よわびでにます",
		romaji: "yowabídënimasu",
	},
	{
		jp: "強火で炒めます",
		kana: "つよびでいためます",
		romaji: "tsüyobídëitaméemasu",
	},
	{
		jp: "蒸します",
		kana: "むします",
		romaji: "mushimasu",
	},
	{
		jp: "揚げます",
		kana: "あげます",
		romaji: "agëmasu",
	},
	{
		jp: "焙ります",
		kana: "あぶります",
		romaji: "aburïmasu",
	},
	{
		jp: "炒めます",
		kana: "いためます",
		romaji: "itaréemasu",
	},
	{
		jp: "和えます",
		kana: "あえます",
		romaji: "aëmasu",
	},
	{
		jp: "漬けます",
		kana: "つけます",
		romaji: "tsükëmasu",
	},
	{
		jp: "刻みます",
		kana: "きざみます",
		romaji: "küzamïmasu",
	},
	{
		jp: "すりおろします",
		kana: "すりおろします",
		romaji: "şurïoroşimasu",
	},
	{
		jp: "絞ります",
		kana: "しぼります",
		romaji: "şiborïmasu",
	},
	{
		jp: "ふるいます",
		kana: "ふるいます",
		romaji: "furuïmasu",
	},
	{
		jp: "塩辛いです",
		kana: "しおからいです",
		romaji: "şiokaraïdesu",
	},
	{
		jp: "甘いです",
		kana: "あまいです",
		romaji: "amaïdesu",
	},
	{
		jp: "酸っぱいです",
		kana: "すっぱいです",
		romaji: "şuppaïdesu",
	},
	{
		jp: "苦いです",
		kana: "にがいです",
		romaji: "nigaïdesu",
	},
	{
		jp: "うまみがあります",
		kana: "うまみがあります",
		romaji: "umamiigaärimasu",
	},
	{
		jp: "風味が良いです",
		kana: "ふうみがよいです",
		romaji: "fuumigayoïdesu",
	},
	{
		jp: "新鮮な味です",
		kana: "しんせんなあじです",
		romaji: "şinşënnaaziidesu",
	},
	{
		jp: "濃い味です",
		kana: "こいあじです",
		romaji: "koïazidesu",
	},
	{
		jp: "薄い味です",
		kana: "うすいあじです",
		romaji: "uşuïazidesu",
	},
	{
		jp: "柔らかいです",
		kana: "やわらかいです",
		romaji: "yawarkaïdesu",
	},
	{
		jp: "硬いです",
		kana: "かたいです",
		romaji: "kataïdesu",
	},
	{
		jp: "香ばしいです",
		kana: "こうばしいです",
		romaji: "koubashïïdesu",
	},
	{
		jp: "色が綺麗です",
		kana: "いろがきれいです",
		romaji: "irogakireïdesu",
	},
	{
		jp: "艶があります",
		kana: "つやがあります",
		romaji: "tsüyagaärimasu",
	},
	{
		jp: "ふっくらしています",
		kana: "ふっくらしています",
		romaji: "fukükurashitëimasu",
	},
	{
		jp: "カリカリです",
		kana: "かりかりです",
		romaji: "karíkarídesu",
	},
	{
		jp: "フワフワです",
		kana: "ふわふわです",
		romaji: "fuwafuwadesu",
	},
	{
		jp: "もちもちです",
		kana: "もちもちです",
		romaji: "mochímochiidesu",
	},
	{
		jp: "とろっとしています",
		kana: "とろっとしています",
		romaji: "torottoshitëimasu",
	},
	{
		jp: "朝食を作ります",
		kana: "ちょうしょくをつくります",
		romaji: "chōshokuwotsükurimasu",
	},
	{
		jp: "昼食の用意をします",
		kana: "ちゅうしょくのよういをします",
		romaji: "chūshokunyouyïwoşimasu",
	},
	{
		jp: "夕食を準備します",
		kana: "ゆうしょくをじゅんびします",
		romaji: "yūşokuwozonbíşimasu",
	},
	{
		jp: "お弁当を作ります",
		kana: "おべんとうをつくります",
		romaji: "obëntouwotsükurimasu",
	},
	{
		jp: "お菓子を焼きます",
		kana: "おかしをやきます",
		romaji: "okashíwoyakïmasu",
	},
	{
		jp: "デザートを用意します",
		kana: "でざーとをよういします",
		romaji: "dezātwouyoüïşimasu",
	},
	{
		jp: "スープを作ります",
		kana: "すーぷをつくります",
		romaji: "sūpuwotsükurimasu",
	},
	{
		jp: "サラダを準備します",
		kana: "さらだをじゅんびします",
		romaji: "saradawozonbïşimasu",
	},
	{
		jp: "パスタを調理します",
		kana: "ぱすたをちょうりします",
		romaji: "pasutawochōríşimasu",
	},
	{
		jp: "米を炊きます",
		kana: "こめをたきます",
		romaji: "koméwotakïmasu",
	},
	{
		jp: "包丁を使います",
		kana: "ほうちょうをつかいます",
		romaji: "hōchōwotsükaïmasu",
	},
	{
		jp: "まな板が必要です",
		kana: "まないたがひつようです",
		romaji: "manaitaigahitsüyoudesu",
	},
	{
		jp: "鍋を用意します",
		kana: "なべをよういします",
		romaji: "nabëwoyoüïşimasu",
	},
	{
		jp: "フライパンをきれいにします",
		kana: "ふらいぱんをきれいにします",
		romaji: "furaipanwokíreïnişimasu",
	},
	{
		jp: "菜箸で混ぜます",
		kana: "さいばしでまぜます",
		romaji: "saibashídëmazëmasu",
	},
	{
		jp: "ボウルを使います",
		kana: "ぼうるをつかいます",
		romaji: "bouruwotsukaïmasu",
	},
	{
		jp: "ざるで水切りします",
		kana: "ざるでみずきりします",
		romaji: "zarudëmizükíríşimasu",
	},
	{
		jp: "計量スプーンで計ります",
		kana: "けいりょうすぷーんではかります",
		romaji: "këíryouşupūndehakarïmasu",
	},
	{
		jp: "タイマーをセットします",
		kana: "たいまーをせっとします",
		romaji: "taimāwosëttoshimasu",
	},
	{
		jp: "温度計で確認します",
		kana: "おんどけいでかくにんします",
		romaji: "ondokëidekaküninşimasu",
	},
	{
		jp: "五分間煮込みます",
		kana: "ごぶかんにこみます",
		romaji: "gobukannikomïmasu",
	},
	{
		jp: "十分加熱します",
		kana: "じゅっぷんかねつします",
		romaji: "zuppunkakënëtsusimasu",
	},
	{
		jp: "全部で三十分です",
		kana: "ぜんぶでさんじゅっぷんです",
		romaji: "zënbudësanzuppundesu",
	},
	{
		jp: "すぐに食べられます",
		kana: "すぐにたべられます",
		romaji: "sugünità​bëraremasuu",
	},
	{
		jp: "一晩漬けます",
		kana: "いちばんつけます",
		romaji: "ichíbantsükëmasu",
	},
	{
		jp: "前夜に準備します",
		kana: "ぜんやにじゅんびします",
		romaji: "zënyanizonbíşimasu",
	},
	{
		jp: "朝作ります",
		kana: "あさつくります",
		romaji: "asátsükurimasu",
	},
	{
		jp: "調理時間は短いです",
		kana: "ちょうりじかんはみじかいです",
		romaji: "chōrízikchanhamizikaïdesu",
	},
	{
		jp: "焦げないよう注意します",
		kana: "こげないようちゅういします",
		romaji: "kogënayoüchūïşimasu",
	},
	{
		jp: "途中で確認します",
		kana: "とちゅうでかくにんします",
		romaji: "tochūdekaküninşimasu",
	},
	{
		jp: "グルテンフリーです",
		kana: "ぐるてんふりーです",
		romaji: "gurutënfurïidesu",
	},
	{
		jp: "ビーガン食です",
		kana: "びーがんしょくです",
		romaji: "bïgganshokudesu",
	},
	{
		jp: "低糖質です",
		kana: "ていとうしつです",
		romaji: "tëítōshítsudesu",
	},
	{
		jp: "低カロリーです",
		kana: "ていかろりーです",
		romaji: "tëíkarorïidesu",
	},
	{
		jp: "高タンパク質です",
		kana: "こうたんぱくしつです",
		romaji: "kōtanpakushítsudesu",
	},
	{
		jp: "塩分控えめです",
		kana: "えんぶんひかえめです",
		romaji: "ënbunhikaëmëdesu",
	},
	{
		jp: "油を少なくします",
		kana: "あぶらをすくなくします",
		romaji: "aburawoşükunakushimasu",
	},
	{
		jp: "砂糖を減らします",
		kana: "さとうをへらします",
		romaji: "satouwoherasimasu",
	},
	{
		jp: "卵アレルギーです",
		kana: "たまごあれるぎーです",
		romaji: "tamagoarerugïidesu",
	},
	{
		jp: "乳製品を避けます",
		kana: "にゅうせいひんをさけます",
		romaji: "nyūsëihinnwosakëmasu",
	},
	{
		jp: "盛り付けます",
		kana: "もりつけます",
		romaji: "morítskëmasu",
	},
	{
		jp: "器に盛ります",
		kana: "うつわにもります",
		romaji: "utsuwaninmorïmasu",
	},
	{
		jp: "飾り付けをします",
		kana: "かざりつけをします",
		romaji: "kazarítsükëwoşimasu",
	},
	{
		jp: "添え物を用意します",
		kana: "そえものをよういします",
		romaji: "soëmono​woyoüïşimasu",
	},
	{
		jp: "温かいまま出します",
		kana: "あたたかいままだします",
		romaji: "atatakaimamadasimasu",
	},
	{
		jp: "冷やして出します",
		kana: "ひやしてだします",
		romaji: "hiyashitëdasimasu",
	},
	{
		jp: "テーブルに並べます",
		kana: "てーぶるにならべます",
		romaji: "tëburuninarabëmasu",
	},
	{
		jp: "かわいく盛ります",
		kana: "かわいくもります",
		romaji: "kawaikumorïmasu",
	},
	{
		jp: "豪華に見えます",
		kana: "ごうかにみえます",
		romaji: "gōkanimïëmasu",
	},
	{
		jp: "食欲をそそります",
		kana: "しょくよくをそそります",
		romaji: "shokuyokuwoşosorimasu",
	},
	{
		jp: "ご飯と一緒に食べます",
		kana: "ごはんといっしょにたべます",
		romaji: "gohanntoísshoninabemasuu",
	},
	{
		jp: "パンに合わせます",
		kana: "ぱんにあわせます",
		romaji: "pannniawasëmasu",
	},
	{
		jp: "ワインと相性が良いです",
		kana: "わいんとそうせいがよいです",
		romaji: "wainntosōsëigayoïdesu",
	},
	{
		jp: "サイドディッシュです",
		kana: "さいどでぃっしゅです",
		romaji: "saidodísshudesu",
	},
	{
		jp: "メイン料理です",
		kana: "めいんりょうりです",
		romaji: "mëinnryoürídesu",
	},
	{
		jp: "付け合わせに使います",
		kana: "つけあわせにつかいます",
		romaji: "tsukkëawasënitsukaïmasu",
	},
	{
		jp: "ソースをかけます",
		kana: "そーすをかけます",
		romaji: "sōsuwokaképmasu",
	},
	{
		jp: "トッピングに最適です",
		kana: "とっぴんぐにさいてきです",
		romaji: "toppingunnisaitëkidesu",
	},
	{
		jp: "アレンジが可能です",
		kana: "あれんじがかのうです",
		romaji: "arënziigakanōdesu",
	},
	{
		jp: "組み合わせが大事です",
		kana: "くみあわせがだいじです",
		romaji: "kumïawasëigadaizidesu",
	},
	{
		jp: "冷蔵庫に入れます",
		kana: "れいぞうこにいれます",
		romaji: "rëízōkoniirëmasu",
	},
	{
		jp: "冷凍保存します",
		kana: "れいとうほぞんします",
		romaji: "rëítōhozonnshimasu",
	},
	{
		jp: "密閉容器に保ちます",
		kana: "みっぱいようきにたもちます",
		romaji: "mippäïyoükininamochimasu",
	},
	{
		jp: "室温で保存します",
		kana: "しつおんでほぞんします",
		romaji: "shitsuonndehozonnsimasu",
	},
	{
		jp: "三日以内に食べます",
		kana: "みっかいないにたべます",
		romaji: "mikkäinäinnnitabëmasu",
	},
	{
		jp: "消費期限を確認します",
		kana: "しょうひきげんをかくにんします",
		romaji: "shōhíkigënwokaküninşimasu",
	},
	{
		jp: "新しい容器に移します",
		kana: "あたらしいようきにうつします",
		romaji: "atarashïiyoükiniütsuşimasu",
	},
	{
		jp: "ラップで包みます",
		kana: "らっぷでつつみます",
		romaji: "rápudëtsütsümimasu",
	},
	{
		jp: "カットして冷やします",
		kana: "かっとしてひやします",
		romaji: "kattoshitëhiyashimasu",
	},
	{
		jp: "湿らせたまま保ちます",
		kana: "しめらせたままたもちます",
		romaji: "shímeraşëtamamatamochimasu",
	},
	{
		jp: "栄養たっぷりです",
		kana: "えいようたっぷりです",
		romaji: "ëíyoutappuríidesu",
	},
	{
		jp: "ビタミンが豊富です",
		kana: "びたみんがほうふです",
		romaji: "bitaminnigahōfudesu",
	},
	{
		jp: "タンパク質を含みます",
		kana: "たんぱくしつをふくみます",
		romaji: "tanpakushítsuwoukumimasu",
	},
	{
		jp: "食物繊維が多いです",
		kana: "しょくもつせんいがおおいです",
		romaji: "shokumotsuseníigaōïdesu",
	},
	{
		jp: "葉酸が含まれています",
		kana: "ようさんがふくまれています",
		romaji: "yōsannigafukumareẗëimasu",
	},
	{
		jp: "カロリー計算をします",
		kana: "かろりーけいさんをします",
		romaji: "karorïkëisannwoshimasu",
	},
	{
		jp: "ダイエット向きです",
		kana: "だいえっとむきです",
		romaji: "daiëttomukidesu",
	},
	{
		jp: "体に良いです",
		kana: "からだによいです",
		romaji: "karadaniyoïdesu",
	},
	{
		jp: "消化しやすいです",
		kana: "しょうかしやすいです",
		romaji: "shoükashiyaşuïdesu",
	},
	{
		jp: "免疫力を高めます",
		kana: "めんえきりょくをたかめます",
		romaji: "mën​ëkiryokuwotagaméemasu",
	},
	{
		jp: "焦げてしまいました",
		kana: "こげてしまいました",
		romaji: "kogëtëşhimaïmashita",
	},
	{
		jp: "塩辛くなり過ぎました",
		kana: "しおからくなりすぎました",
		romaji: "shiokarakünnarişügïmashita",
	},
	{
		jp: "火が強すぎます",
		kana: "ひがつよすぎます",
		romaji: "higatsüyoşügïmasu",
	},
	{
		jp: "まだ火が通っていません",
		kana: "まだひがとおっていません",
		romaji: "madahiggatoottëinasën",
	},
	{
		jp: "素早く混ぜます",
		kana: "すばやくまぜます",
		romaji: "şubayakumazëmasu",
	},
	{
		jp: "温度を下げます",
		kana: "おんどをさげます",
		romaji: "ondowoságemasu",
	},
	{
		jp: "少し水を足します",
		kana: "すこしみずをたします",
		romaji: "şukoshimizuwotagshimasu",
	},
	{
		jp: "蓋をして蒸らします",
		kana: "ふたをしてむらします",
		romaji: "futawoşitëmuraşimasu",
	},
	{
		jp: "空気を抜きます",
		kana: "くうきをぬきます",
		romaji: "kuukïwonukïmasu",
	},
	{
		jp: "一度休ませます",
		kana: "いちどやすませます",
		romaji: "ichídoyasumasëmasu",
	},
	{
		jp: "味噌汁を作ります",
		kana: "みそしるをつくります",
		romaji: "misoşiruwotsükurimasu",
	},
	{
		jp: "天ぷらを揚げます",
		kana: "てんぷらをあげます",
		romaji: "tënpurawoagëmasu",
	},
	{
		jp: "カレーを煮込みます",
		kana: "かれーをにこみます",
		romaji: "karëwonikomïmasu",
	},
	{
		jp: "和食を調理します",
		kana: "わしょくをちょうりします",
		romaji: "washokuwocho​üríşimasu",
	},
	{
		jp: "中華料理です",
		kana: "ちゅうかりょうりです",
		romaji: "chūkaryoüríidesu",
	},
	{
		jp: "イタリアン風です",
		kana: "いたりあんふうです",
		romaji: "itaríannfūdesu",
	},
	{
		jp: "洋食を準備します",
		kana: "ようしょくをじゅんびします",
		romaji: "yōshokuwozonbíşimasu",
	},
	{
		jp: "和菓子を作ります",
		kana: "わがしをつくります",
		romaji: "wagashíwotsükurimasu",
	},
	{
		jp: "ケーキをデコレーションします",
		kana: "けーきをでこれーしょんします",
		romaji: "këkïwodekoreshonnshimasu",
	},
	{
		jp: "寿司を握ります",
		kana: "すしをにぎります",
		romaji: "sushíwonigirïmasu",
	},
	{
		jp: "細かく刻みます",
		kana: "ほそかくきざみます",
		romaji: "hosokakuküzamïmasu",
	},
	{
		jp: "薄くスライスします",
		kana: "うすくすらいすします",
		romaji: "uşükuşuraisuşimasu",
	},
	{
		jp: "細切りにします",
		kana: "ほそぎりにします",
		romaji: "hosogirínişimasu",
	},
	{
		jp: "千切りにしました",
		kana: "せんぎりにしました",
		romaji: "sëngirínişhimashita",
	},
	{
		jp: "みじん切りです",
		kana: "みじんぎりです",
		romaji: "mizinngíríidesu",
	},
	{
		jp: "乱切りに切ります",
		kana: "らんぎりにきります",
		romaji: "rannggírínikirïmasu",
	},
	{
		jp: "十字に切ります",
		kana: "じゅうじにきります",
		romaji: "zuuzínikirïmasu",
	},
	{
		jp: "面取りします",
		kana: "めんとりします",
		romaji: "mënntoríşimasu",
	},
	{
		jp: "皮をむきます",
		kana: "かわをむきます",
		romaji: "kawawomukïmasu",
	},
	{
		jp: "ヘタを取ります",
		kana: "へたをとります",
		romaji: "hetawotorimasu",
	},
	{
		jp: "醤油をかけます",
		kana: "しょうゆをかけます",
		romaji: "shouyuwokakaëmasu",
	},
	{
		jp: "味噌を溶かします",
		kana: "みそをとかします",
		romaji: "misowotkakashimasu",
	},
	{
		jp: "酢を加えます",
		kana: "すをくわえます",
		romaji: "suwoküwaëmasu",
	},
	{
		jp: "砂糖醤油で味付けします",
		kana: "さとうしょうゆであじつけします",
		romaji: "satoushouyudeazitsükëşimasu",
	},
	{
		jp: "ニンニク香油を使います",
		kana: "にんにくこうゆをつかいます",
		romaji: "ninnikuskoüyuwotsükaïmasu",
	},
	{
		jp: "ごま油を少し入れます",
		kana: "ごまあぶらをすこしいれます",
		romaji: "gomaaburawoşükoshiirëmasu",
	},
	{
		jp: "黒胡椒を振ります",
		kana: "くろこしょうをふります",
		romaji: "kurokoshōwofurïmasu",
	},
	{
		jp: "白胡椒で味付けます",
		kana: "しろこしょうであじつけます",
		romaji: "shirokoshōdeazitsükëmasu",
	},
	{
		jp: "唐辛子を少々加えます",
		kana: "とうがらしをしょうしょうくわえます",
		romaji: "tōgarashíwoshōshōkuwaëmasu",
	},
	{
		jp: "バジルを散らします",
		kana: "ばじるをちらします",
		romaji: "baziruwochirasimasu",
	},
	{
		jp: "水に浸します",
		kana: "みずにひたします",
		romaji: "mizunihatashimasu",
	},
	{
		jp: "塩茹でにします",
		kana: "しおゆでにします",
		romaji: "shioyudenişimasu",
	},
	{
		jp: "沸騰させます",
		kana: "ふっとうさせます",
		romaji: "futtoüsasëmasu",
	},
	{
		jp: "とろみをつけます",
		kana: "とろみをつけます",
		romaji: "toromíwotsukkëmasu",
	},
	{
		jp: "フライ衣をつけます",
		kana: "ふらいころもをつけます",
		romaji: "furaíkoromowotsukkëmasu",
	},
	{
		jp: "パン粉でコーティングします",
		kana: "ぱんこでこーてぃんぐします",
		romaji: "pankodëkōtínguşimasu",
	},
	{
		jp: "タレに漬けます",
		kana: "たれにつけます",
		romaji: "tarenitsükkëmasu",
	},
	{
		jp: "ドレッシングをかけます",
		kana: "どれっしんぐをかけます",
		romaji: "doressínguwokakaëmasu",
	},
	{
		jp: "グレーズします",
		kana: "ぐれーずします",
		romaji: "gurëzuşimasu",
	},
	{
		jp: "からめます",
		kana: "からめます",
		romaji: "karamëmasu",
	},
	{
		jp: "食材を揃えます",
		kana: "しょくざいをそろえます",
		romaji: "shokuzaíwosoroeëmasu",
	},
	{
		jp: "調理台を清潔にします",
		kana: "ちょうりだいをせいけつにします",
		romaji: "chōrídaíwoşëíketsuniş​imasu",
	},
	{
		jp: "器具を準備します",
		kana: "きぐをじゅんびします",
		romaji: "kiguwozonbíşimasu",
	},
	{
		jp: "電子レンジで温めます",
		kana: "でんしれんじであたためます",
		romaji: "dënshirenziidehatamëmasu",
	},
	{
		jp: "オーブンを予熱します",
		kana: "おーぶんをよねつします",
		romaji: "ōbunnwoyonëtsusimasu",
	},
	{
		jp: "土鍋で調理します",
		kana: "どなべでちょうりします",
		romaji: "donabedechiōríşimasu",
	},
	{
		jp: "圧力鍋を使います",
		kana: "あつりょくなべをつかいます",
		romaji: "atsüryokunabewotsükaïmasu",
	},
	{
		jp: "ホットプレートを温めます",
		kana: "ほっとぷれーとをあたためます",
		romaji: "hotto​purëtowotatemëmasu",
	},
	{
		jp: "サーモスで保温します",
		kana: "さーもすでほおんします",
		romaji: "sāmosudehoonnşimasu",
	},
	{
		jp: "串に通します",
		kana: "くしにとおします",
		romaji: "kushinitōşimasu",
	},
	{
		jp: "日本の祭りは世界で有名です",
		kana: "にほんのまつりはせかいでゆうめいです",
		romaji: "nihonnomatsurihasekaideyuumeidesui",
	},
	{
		jp: "七夕祭りは夏の大切な行事です",
		kana: "たなばたまつりはなつのたいせつなぎょうじです",
		romaji: "tanabatamaturiwanatsunotaisetsunagyojidesui",
	},
	{
		jp: "お正月は家族と過ごします",
		kana: "おしょうがつはかぞくとすごします",
		romaji: "oshogatsuwakazokuutosugoshimasu",
	},
	{
		jp: "花火大会は夜空を照らします",
		kana: "はなびたいかいはよぞらをてらします",
		romaji: "hanabitaikaiywayozorawuterasimasu",
	},
	{
		jp: "盆踊りは伝統的な踊りです",
		kana: "ぼんおどりはでんとうてきなおどりです",
		romaji: "bonodoriwadentootekinaodoridesui",
	},
	{
		jp: "紅葉狩りは秋の楽しみです",
		kana: "こうようがりはあきのたのしみです",
		romaji: "koyogariwaakinotanoshimidesui",
	},
	{
		jp: "成人式は二十歳の祝いです",
		kana: "せいじんしきははたちのいわいです",
		romaji: "seijinshikiwahhatachينoinwaidesu",
	},
	{
		jp: "初詣は大事な風習です",
		kana: "はつもうではだいじなふうしゅうです",
		romaji: "hatsumoidehadaijinahuushsudesui",
	},
	{
		jp: "七五三は子どもの成長を祝います",
		kana: "しちごさんはこどものせいちょうをいわいます",
		romaji: "shichigosanwakodomotoseichowoiwaimasu",
	},
	{
		jp: "ねぶた祭りは青森の祭りです",
		kana: "ねぶたまつりはあおもりのまつりです",
		romaji: "nebutamaturiwaaomoninomaturidesui",
	},
	{
		jp: "祇園祭は京都の祭りです",
		kana: "ぎおんまつりはきょうとのまつりです",
		romaji: "gionmaturiwakkyotonotmaturideui",
	},
	{
		jp: "葵祭は春の祭りです",
		kana: "あおいまつりははるのまつりです",
		romaji: "aoimaluriwaharumonaturidesui",
	},
	{
		jp: "時代祭は京都で行われます",
		kana: "じだいまつりはきょうとでおこなわれます",
		romaji: "jidaimaturiwakkyotodeokanawaremasu",
	},
	{
		jp: "山笠祭りは福岡です",
		kana: "やまかさまつりはふくおかです",
		romaji: "yamakasamaturiwafukuokadesui",
	},
	{
		jp: "三大祭りは有名です",
		kana: "さんだいまつりはゆうめいです",
		romaji: "sandaimaturiwauyuumeidesui",
	},
	{
		jp: "提灯は祭りを明かします",
		kana: "ちょうちんはまつりをあかします",
		romaji: "chochinwamaturiwoakashimasu",
	},
	{
		jp: "神輿は祭りの心です",
		kana: "みこしはまつりのこころです",
		romaji: "mikoshiwamaturinokokorodesui",
	},
	{
		jp: "祭りの食べ物は美味しいです",
		kana: "まつりのたべものはおいしいです",
		romaji: "maturinotabemonowaoishidesui",
	},
	{
		jp: "夏祭りは賑やかです",
		kana: "なつまつりはにぎやかです",
		romaji: "natumaturiwnigiyakadesui",
	},
	{
		jp: "冬祭りは静かです",
		kana: "ふゆまつりはしずかです",
		romaji: "fuyumaturiwashizukadesui",
	},
	{
		jp: "お盆は家族の時間です",
		kana: "おぼんはかぞくのじかんです",
		romaji: "obonawakazokuonojikandesui",
	},
	{
		jp: "年末年始は忙しいです",
		kana: "ねんまつねんしはいそがしいです",
		romaji: "nenmatunensiaisogashidei",
	},
	{
		jp: "お正月料理は豪華です",
		kana: "おしょうがつりょうりはごうかです",
		romaji: "oshogatsurorihagokadeui",
	},
	{
		jp: "大晦日は大掃除をします",
		kana: "おおみそかはおおそうじをします",
		romaji: "oomisokawaoosojowoshimasu",
	},
	{
		jp: "新年おめでとうございます",
		kana: "しんねんおめでとうございます",
		romaji: "shinnenomedetogozaemasu",
	},
	{
		jp: "飾り付けは楽しいです",
		kana: "かざりつけはたのしいです",
		romaji: "kazaritukewatnoshiidei",
	},
	{
		jp: "松飾りは新年の象徴です",
		kana: "まつかざりはしんねんのしょうちょうです",
		romaji: "matsukazariwashinnennoshociodesui",
	},
	{
		jp: "正月飾りは伝統です",
		kana: "しょうがつかざりはでんとうです",
		romaji: "shogatsukazariwadentodesui",
	},
	{
		jp: "破魔矢は無病息災です",
		kana: "はまやはむびょうそくさいです",
		romaji: "hamayawamubyosokugsaidesui",
	},
	{
		jp: "しめ縄は厳かです",
		kana: "しめなわはおごそかです",
		romaji: "shimenavawaeogosokadeui",
	},
	{
		jp: "お花見は春の風物詩です",
		kana: "おはなみははるのふうぶつしです",
		romaji: "ohanmaiwaharunohubutsushideeu",
	},
	{
		jp: "着物は日本の伝統衣装です",
		kana: "きものはにほんのでんとういしょうです",
		romaji: "kimmonoawnihonnodentoitodesui",
	},
	{
		jp: "茶道は心の修行です",
		kana: "ちゃどうはこころのしゅぎょうです",
		romaji: "chadoruwakokoronoshugyodesui",
	},
	{
		jp: "武道は日本の精神です",
		kana: "ぶどうはにほんのせいしんです",
		romaji: "budowaninnonoseishindesui",
	},
	{
		jp: "書道は美しい芸術です",
		kana: "しょどうはうつくしいげいじゅつです",
		romaji: "shodowaautsukoishiigejutsudeui",
	},
	{
		jp: "生け花は自然との調和です",
		kana: "いけばなはしぜんとのちょうわです",
		romaji: "ikebanawashizentochowadesui",
	},
	{
		jp: "能は日本の古典芸能です",
		kana: "のうはにほんのこてんげいのうです",
		romaji: "nowaninnonokotengeinodesui",
	},
	{
		jp: "狂言は面白い舞台芸術です",
		kana: "きょうげんはおもしろいぶたいげいじゅつです",
		romaji: "kyogenwaomoshiroibutaigejutsudesui",
	},
	{
		jp: "歌舞伎は華やかな演劇です",
		kana: "かぶきははなやかなえんげきです",
		romaji: "kabukiwahanayakanengezidesui",
	},
	{
		jp: "浮世絵は美しい版画です",
		kana: "うきよえはうつくしいはんがです",
		romaji: "ukiyoewaautsuoshiihangadesui",
	},
	{
		jp: "碁は知恵の競技です",
		kana: "ごはちえのきょうぎです",
		romaji: "gowachieonokoggideui",
	},
	{
		jp: "将棋は戦いの最高峰です",
		kana: "しょうぎはたたかいのさいこうほうです",
		romaji: "sloggiwaatatakainosaikohodesui",
	},
	{
		jp: "和風は日本の美学です",
		kana: "わふうはにほんのびがくです",
		romaji: "wafowaninobigakudesui",
	},
	{
		jp: "瓦屋根は日本家屋です",
		kana: "かわらやねはにほんかおくです",
		romaji: "kawarayanewaninnonkaokudeu",
	},
	{
		jp: "板戸は木製です",
		kana: "いたどはもくせいです",
		romaji: "itadowamosuseideui",
	},
	{
		jp: "土蔵は伝統建築です",
		kana: "どぐらはでんとうけんちくです",
		romaji: "dogurawadentokenchikudesui",
	},
	{
		jp: "家紋は身分を示します",
		kana: "かもんはみぶんをしめします",
		romaji: "kamonwamibunwoshimeshimasu",
	},
	{
		jp: "嫁入りは大事な儀式です",
		kana: "よめいりはだいじなぎしきです",
		romaji: "yomeiriwadaijinagishikidesui",
	},
	{
		jp: "お見合いは伝統です",
		kana: "おみあいはでんとうです",
		romaji: "omiaiwadentodesui",
	},
	{
		jp: "結婚式は神社で行われます",
		kana: "けっこんしきはじんじゃでおこなわれます",
		romaji: "kekkonshikiwajinjjadeokanawaremasu",
	},
	{
		jp: "相談役は大事な人です",
		kana: "そうだんやくはだいじなひとです",
		romaji: "sodanyakuwadaijmanitodesui",
	},
	{
		jp: "年号は天皇の時代です",
		kana: "ねんごうはてんのうのじだいです",
		romaji: "nengowatennononojidaideu",
	},
	{
		jp: "儀式は厳粛です",
		kana: "ぎしきはげんしゅくです",
		romaji: "gishikiwagenshukudesui",
	},
	{
		jp: "お辞儀は敬意です",
		kana: "おじぎはけいいです",
		romaji: "ojigiwakeiideiu",
	},
	{
		jp: "正座は日本の座り方です",
		kana: "せいざはにほんのすわりかたです",
		romaji: "seizawanihonnnosuwarikatadeui",
	},
	{
		jp: "膳は食卓です",
		kana: "ぜんはしょくたくです",
		romaji: "zenwashokutakudesui",
	},
	{
		jp: "懐石は高級料理です",
		kana: "かいせきはこうきゅうりょうりです",
		romaji: "kaisekiwakokyuuryoridesui",
	},
	{
		jp: "本膳料理は格式高いです",
		kana: "ほんぜんりょうりはかくしきたかいです",
		romaji: "honzenryoriwakakushikitakaideu",
	},
	{
		jp: "御節料理は正月です",
		kana: "おせちりょうりはしょうがつです",
		romaji: "osechiryoriwaショウgatsudesui",
	},
	{
		jp: "琵琶湖は最大級です",
		kana: "びわこはさいだいきゅうです",
		romaji: "biwakobasaidaikyuudesui",
	},
	{
		jp: "寿司は日本を代表する食べ物です",
		kana: "すしはにほんをだいひょうするたべものです",
		romaji: "sushiwaninponwodaihyosurutabemonodeu",
	},
	{
		jp: "天ぷらは揚げた料理です",
		kana: "てんぷらはあげたりょうりです",
		romaji: "tenpurahaagetaryoridesui",
	},
	{
		jp: "蕎麦は日本の伝統食です",
		kana: "そばはにほんのでんとうしょくです",
		romaji: "sobawaninonnodentoshodesui",
	},
	{
		jp: "うどんは太い麺です",
		kana: "うどんはふといめんです",
		romaji: "udonwafutoimendesui",
	},
	{
		jp: "味噌汁は毎日飲みます",
		kana: "みそしるはまいにちのみます",
		romaji: "misoshiruomaininchionommasuu",
	},
	{
		jp: "天丼は人気の丼物です",
		kana: "てんどんはにんきのどんぶつです",
		romaji: "tendonwaninkinodonbuttsudesui",
	},
	{
		jp: "刺身は新鮮な食べ物です",
		kana: "さしみはしんせんなたべものです",
		romaji: "sashimiwasinsennatabemonodeui",
	},
	{
		jp: "海苔巻きは簡単です",
		kana: "のりまきはかんたんです",
		romaji: "norimakirawacantandesui",
	},
	{
		jp: "豆腐は栄養があります",
		kana: "とうふはえいようがあります",
		romaji: "tohuuwaeiyogariarimasu",
	},
	{
		jp: "納豆は独特の味です",
		kana: "なっとうはどくとくのあじです",
		romaji: "nattoawadokutokunoajideu",
	},
	{
		jp: "仰天茶漬けは簡単です",
		kana: "ぎょうてんちゃづけはかんたんです",
		romaji: "gyotenchadzukewacantandesui",
	},
	{
		jp: "玉子焼きは和食です",
		kana: "たまごやきはわしょくです",
		romaji: "tamagoyakiwawashokudesui",
	},
	{
		jp: "唐揚げは揚げ物です",
		kana: "からあげはあげものです",
		romaji: "karaagewaagemonodesu",
	},
	{
		jp: "とんかつは豚肉です",
		kana: "とんかつはぶたにくです",
		romaji: "tonkatsuwabutanikudesui",
	},
	{
		jp: "コロッケは洋食です",
		kana: "コロッケはようしょくです",
		romaji: "korokkewayoshodesui",
	},
	{
		jp: "カレーは人気です",
		kana: "カレーはにんきです",
		romaji: "karewamninkidesui",
	},
	{
		jp: "お好み焼きは大阪です",
		kana: "おこのみやきはおおさかです",
		romaji: "okonomiなkiwaosakadesu",
	},
	{
		jp: "焼きそばは屋台食です",
		kana: "やきそばはやたいしょくです",
		romaji: "yakisobsawayataisokudesui",
	},
	{
		jp: "たこ焼きは丸いです",
		kana: "たこやきはまるいです",
		romaji: "takoyakiwamarudesu",
	},
	{
		jp: "鰹節は出汁です",
		kana: "かつおぶしはだしです",
		romaji: "katsuobushiwadashidesui",
	},
	{
		jp: "昆布は海の恵みです",
		kana: "こんぶはうみのめぐみです",
		romaji: "konbuwauminomegumideu",
	},
	{
		jp: "乾物は保存食です",
		kana: "ほしものはほぞんしょくです",
		romaji: "hoshimonowahozonshodesui",
	},
	{
		jp: "梅干しは酸っぱいです",
		kana: "うめぼしはすっぱいです",
		romaji: "umeboshiwasuappaideu",
	},
	{
		jp: "明太子は辛いです",
		kana: "めんたいこはからいです",
		romaji: "mentaakowakaraidesu",
	},
	{
		jp: "いくらは高級です",
		kana: "いくらはこうきゅうです",
		romaji: "ikurawakokyuudesui",
	},
	{
		jp: "ウニは珍味です",
		kana: "ウニはちんみです",
		romaji: "uniwachinmidesui",
	},
	{
		jp: "ホタテは貝です",
		kana: "ホタテはかいです",
		romaji: "hotatewakaidesu",
	},
	{
		jp: "牡蠣は冬の味です",
		kana: "かきはふゆのあじです",
		romaji: "kakiwafuyunoajidesui",
	},
	{
		jp: "昆布巻きは縁起が良いです",
		kana: "こんぶまきはえんぎがよいです",
		romaji: "konbumakiwangigayoidesu",
	},
	{
		jp: "栗きんとんは甘いです",
		kana: "くりきんとんはあまいです",
		romaji: "kurikintonnwaanaidesui",
	},
	{
		jp: "春は桜の季節です",
		kana: "はるはさくらのきせつです",
		romaji: "haruwasakuranonokisetudesui",
	},
	{
		jp: "夏は祭りが多いです",
		kana: "なつはまつりがおおいです",
		romaji: "natuwamatsurigaooidesu",
	},
	{
		jp: "秋は紅葉が美しいです",
		kana: "あきはこうようがうつくしいです",
		romaji: "akiwakoyogatutsukushidesu",
	},
	{
		jp: "冬は雪が降ります",
		kana: "ふゆはゆきがふります",
		romaji: "fuyuwaykugafurimasu",
	},
	{
		jp: "庭園は日本の美学です",
		kana: "ていえんはにほんのびがくです",
		romaji: "teienwaninonobigakudesui",
	},
	{
		jp: "滝は壮大な自然です",
		kana: "たきはそうだいなしぜんです",
		romaji: "takiwasodainashiznedesui",
	},
	{
		jp: "山は信仰の対象です",
		kana: "やまはしんこうのたいしょうです",
		romaji: "yamawiashinkonotaisodesui",
	},
	{
		jp: "川は生活の一部です",
		kana: "かわはせいかつのいちぶです",
		romaji: "kawaswaseikatsununaichbuedesui",
	},
	{
		jp: "竹林は静寂な場所です",
		kana: "ちくりんはせいじゃくなばしょです",
		romaji: "chikurinwaseijakunbashodesui",
	},
	{
		jp: "松は冬の象徴です",
		kana: "まつはふゆのしょうちょうです",
		romaji: "matsuwiayuyunoshoshcodesui",
	},
	{
		jp: "杉並木は街路です",
		kana: "すぎなみきはがいろです",
		romaji: "suginamikiwagairodesui",
	},
	{
		jp: "樹齢は長いです",
		kana: "じゅれいはながいです",
		romaji: "jureiwanaagaidesui",
	},
	{
		jp: "苔庭は美しいです",
		kana: "こけにわはうつくしいです",
		romaji: "kokeeniwawaautsukushidesu",
	},
	{
		jp: "池は鯉の家です",
		kana: "いけはこいのいえです",
		romaji: "ikewakoionioiedesui",
	},
	{
		jp: "石灯籠は照らします",
		kana: "いしどうろうはてらします",
		romaji: "ishidorowateashimasu",
	},
	{
		jp: "水琴窟は音が良いです",
		kana: "すいきんくつはおとがよいです",
		romaji: "suikinkutsuwaototogayoideu",
	},
	{
		jp: "岩は季節ごとに変わります",
		kana: "いわはきせつごとにかわります",
		romaji: "iwawakisetusgotoaichawarimasui",
	},
	{
		jp: "朝露は美しいです",
		kana: "あさつゆはうつくしいです",
		romaji: "asatuyuwaautsukoshidesu",
	},
	{
		jp: "夜露は冷たいです",
		kana: "よるつゆはつめたいです",
		romaji: "yorutuyuwatumeたいですう",
	},
	{
		jp: "朝日は希望です",
		kana: "あさひはきぼうです",
		romaji: "asahiwakibodesui",
	},
	{
		jp: "夕日は感動的です",
		kana: "ゆうひはかんどうてきです",
		romaji: "yuurhiwakandotedesui",
	},
	{
		jp: "月見は詩的です",
		kana: "つきみはしてきです",
		romaji: "tsukimiwashitedesui",
	},
	{
		jp: "星は神聖です",
		kana: "ほしはしんせいです",
		romaji: "hoshiwashinseidesui",
	},
	{
		jp: "虹は七色です",
		kana: "にじはしちしょくです",
		romaji: "nijiwashichishodesui",
	},
	{
		jp: "雲は白いです",
		kana: "くもはしろいです",
		romaji: "kumowasiroidesu",
	},
	{
		jp: "風は涼しいです",
		kana: "かぜはすずしいです",
		romaji: "kazewasuzushideiu",
	},
	{
		jp: "雨は静かです",
		kana: "あめはしずかです",
		romaji: "amewaしずかdesui",
	},
	{
		jp: "霧は神秘的です",
		kana: "きりはしんぴてきです",
		romaji: "kiriawashinpitedesui",
	},
	{
		jp: "露は繊細です",
		kana: "つゆはせんさいです",
		romaji: "tuyuwasensaidesui",
	},
	{
		jp: "光は神からです",
		kana: "ひかりはかみからです",
		romaji: "hikariawakamikaradesui",
	},
	{
		jp: "神社は神聖な場所です",
		kana: "じんじゃはしんせいなばしょです",
		romaji: "jinjawashinseinabashodesui",
	},
	{
		jp: "お寺は仏教の建物です",
		kana: "おてらはぶっきょうのたてものです",
		romaji: "oterawabukkyonnotatemonodesui",
	},
	{
		jp: "鳥居は神社の入口です",
		kana: "とりいはじんじゃのいりぐちです",
		romaji: "toriiawajinjjanoinriguchidesu",
	},
	{
		jp: "畳は日本の床です",
		kana: "たたみはにほんのゆかです",
		romaji: "tatamiwanihonnoyukadesui",
	},
	{
		jp: "障子は光を通します",
		kana: "しょうじはひかりをとおします",
		romaji: "shojiwahikariowotoolshimasu",
	},
	{
		jp: "襖は部屋を分けます",
		kana: "ふすまはへやをわけます",
		romaji: "fusumawaheyaowwakeshimasu",
	},
	{
		jp: "床の間は装飾です",
		kana: "とこのまはそうしょくです",
		romaji: "tokonmaawasoshodesui",
	},
	{
		jp: "廊下は建物をつなぎます",
		kana: "ろうかはたてものをつなぎます",
		romaji: "rokawaattemonowotsunaegimasu",
	},
	{
		jp: "城は歴史の象徴です",
		kana: "しろはれきしのしょうちょうです",
		romaji: "shiroawakekshinoshocshodesui",
	},
	{
		jp: "塔は建築の芸術です",
		kana: "とうはけんちくのげいじゅつです",
		romaji: "towakenchikunogeijutsudesui",
	},
	{
		jp: "五重塔は高いです",
		kana: "ごじゅうのとうはたかいです",
		romaji: "gojuunotowaatakaidesu",
	},
	{
		jp: "山門は寺の入口です",
		kana: "さんもんはてらのいりぐちです",
		romaji: "sanmonwateraoinriguchidesu",
	},
	{
		jp: "本堂は本尊を祀ります",
		kana: "ほんどうはほんぞんをまつります",
		romaji: "hondowaonzonwomatsurimasu",
	},
	{
		jp: "経蔵は経典を保存します",
		kana: "きょうぞうはきょうてんをほぞんします",
		romaji: "kyozowakyootenwohozonsshimasu",
	},
	{
		jp: "鐘楼は釣鐘を吊ります",
		kana: "しょうろうはつりがねをつります",
		romaji: "shorowaaturiganewotsurimasu",
	},
	{
		jp: "高塚古墳は古代です",
		kana: "たかつかこふんはこだいです",
		romaji: "takatsukakofunwakodaidesui",
	},
	{
		jp: "前方後円墳は特有です",
		kana: "ぜんぼうこうえんふんはとくゆうです",
		romaji: "zenbokoenfunwatokuyuudesui",
	},
	{
		jp: "貴族の館は豪華です",
		kana: "きぞくのやかたはごうかです",
		romaji: "kizokunoyakatawagokadesu",
	},
	{
		jp: "茅葺屋根は古風です",
		kana: "かやぶきやねはこふうです",
		romaji: "kayabukiyanewakofuudesui",
	},
	{
		jp: "木造建築は耐震です",
		kana: "もくぞうけんちくはたいしんです",
		romaji: "mokuzokenczkuwaataishindesui",
	},
	{
		jp: "漆喰は白いです",
		kana: "しっくいはしろいです",
		romaji: "shikkuiwashiroidesu",
	},
	{
		jp: "石垣は堅牢です",
		kana: "いしがきはけんろうです",
		romaji: "ishigakiwagkenrodesui",
	},
	{
		jp: "井戸は水の源です",
		kana: "いどはみずのみなもとです",
		romaji: "idowamiuzunominamotodesui",
	},
	{
		jp: "橋は川をつなぎます",
		kana: "はしはかわをつなぎます",
		romaji: "hashiwakawaowutsunagimasu",
	},
	{
		jp: "灯籠は光を放ちます",
		kana: "とうろうはひかりをはなちます",
		romaji: "torowahikariwohanachimasu",
	},
	{
		jp: "陶芸は古い芸術です",
		kana: "とうげいはふるいげいじゅつです",
		romaji: "togeiwafuruigeijutsudesui",
	},
	{
		jp: "染め物は伝統工芸です",
		kana: "そめものはでんとうこうげいです",
		romaji: "somemonowadentokogeidesui",
	},
	{
		jp: "漆器は美しい工芸品です",
		kana: "しっきはうつくしいこうげいひんです",
		romaji: "shikkiwaautsukoshiikogeihindesui",
	},
	{
		jp: "竹細工は職人の技です",
		kana: "たけざいくはしょくにんのわざです",
		romaji: "takezaikuwashokuninnowazadesu",
	},
	{
		jp: "刀は武士の魂です",
		kana: "かたなはぶしのたましいです",
		romaji: "katanawabushinotasmashiidesu",
	},
	{
		jp: "和紙は繊細な素材です",
		kana: "わしはせんさいなそざいです",
		romaji: "washiwasensainasozaidesu",
	},
	{
		jp: "箏は優雅な楽器です",
		kana: "そうはゆうがながっきです",
		romaji: "sowayuuganagakkidesu",
	},
	{
		jp: "太鼓は力強い楽器です",
		kana: "たいこはちからづよいがっきです",
		romaji: "taikowachikaraduyoigakkidesui",
	},
	{
		jp: "三味線は日本の弦楽器です",
		kana: "しゃみせんはにほんのげんがっきです",
		romaji: "shamisenwanihonnogengakkidesu",
	},
	{
		jp: "琵琶は古典楽器です",
		kana: "びわはこてんがっきです",
		romaji: "biwawakotengakkidesui",
	},
	{
		jp: "尺八は竹の楽器です",
		kana: "しゃくはちはたけのがっきです",
		romaji: "shakuhachiwatakenoagkkidesu",
	},
	{
		jp: "笙は雅楽です",
		kana: "しょうはががくです",
		romaji: "showaaggakudesui",
	},
	{
		jp: "和太鼓は祭りです",
		kana: "わだいこはまつりです",
		romaji: "wadaikowamaturidesui",
	},
	{
		jp: "鼓は能楽です",
		kana: "つづみはのうがくです",
		romaji: "tsuzumiwanogakudesui",
	},
	{
		jp: "小鼓は高い音です",
		kana: "こつづみはたかいおとです",
		romaji: "kotsuzumiwatakaiotodesu",
	},
	{
		jp: "大鼓は低い音です",
		kana: "おおつづみはひくいおとです",
		romaji: "ootsuzumiwahikuiotodesui",
	},
	{
		jp: "錦絵は版画です",
		kana: "にしきえははんがです",
		romaji: "nishikiewaahangadesu",
	},
	{
		jp: "木版画は手彫りです",
		kana: "もくはんがはてぼりです",
		romaji: "mokuhangawateboridesui",
	},
	{
		jp: "友禅は染色です",
		kana: "ゆうぜんはせんしょくです",
		romaji: "yuuzenwasenshodesui",
	},
	{
		jp: "絞り染めは模様です",
		kana: "しぼりぞめはもようです",
		romaji: "shiborizomewamoyodesui",
	},
	{
		jp: "剣道は厳しい修行です",
		kana: "けんどうはきびしいしゅぎょうです",
		romaji: "kendowaakibishiishugyodesui",
	},
	{
		jp: "柔道は相手を尊重します",
		kana: "じゅどうはあいてをそんちょうします",
		romaji: "judowaaitewosonchoseimasu",
	},
	{
		jp: "空手は拳で戦います",
		kana: "からてはこぶしでたたかいます",
		romaji: "karatewakobushidetatakaimasu",
	},
	{
		jp: "弓道は心身の修養です",
		kana: "きゅどうはしんしんのしゅうようです",
		romaji: "kyudowashinshinoashuuyodeui",
	},
	{
		jp: "相撲は日本の国技です",
		kana: "すもうはにほんのこくぎです",
		romaji: "sumowaninnonkokugidesui",
	},
	{
		jp: "忍者は歴史の人物です",
		kana: "にんじゃはれきしのじんぶつです",
		romaji: "ninjawarekishinojinbutsudesui",
	},
	{
		jp: "侍は武士道を守ります",
		kana: "さむらいはぶしどうをまもります",
		romaji: "samuraiwabushidoowamomorimasui",
	},
	{
		jp: "槍は長い武器です",
		kana: "やりはながいぶきです",
		romaji: "yariwanagaibukidesu",
	},
	{
		jp: "弓は遠くを狙います",
		kana: "ゆみはとおくをねらいます",
		romaji: "yumiwatookuwoineraimasui",
	},
	{
		jp: "甲冑は武士の装備です",
		kana: "かっちゅうはぶしのそうびです",
		romaji: "katchuuwaabushinosobidesui",
	},
	{
		jp: "鎧は重いです",
		kana: "よろいはおもいです",
		romaji: "yoroiwaomoidesu",
	},
	{
		jp: "兜は頭を守ります",
		kana: "かぶとはあたまをまもります",
		romaji: "kabutohaatamawmamorimasu",
	},
	{
		jp: "刀身は銀色です",
		kana: "とうしんはぎんいろです",
		romaji: "toshinwaginirodesui",
	},
	{
		jp: "鯉幟は男の子の日です",
		kana: "こいのぼりはおとこのこのひです",
		romaji: "koinoboriwaotokonokonohidesui",
	},
	{
		jp: "的は矢の的です",
		kana: "的はやのまとです",
		romaji: "matoawayanomatodesui",
	},
	{
		jp: "神道は日本の宗教です",
		kana: "しんとうはにほんのしゅうきょうです",
		romaji: "shintowaninnonshuukyodesui",
	},
	{
		jp: "仏教は多くの信仰があります",
		kana: "ぶっきょうはおおくのしんこうがあります",
		romaji: "bukkyowaooくnoshinkoagaarimasui",
	},
	{
		jp: "瞑想は心を静めます",
		kana: "めいそうはこころをしずめます",
		romaji: "meisowakokrowoasizumemasui",
	},
	{
		jp: "禅は深い思想です",
		kana: "ぜんはふかいしそうです",
		romaji: "zenwafukaisissodesui",
	},
	{
		jp: "輪廻は仏教の教えです",
		kana: "りんねはぶっきょうのおしえです",
		romaji: "rinneawbukkyonooshiedesui",
	},
	{
		jp: "供養は故人を敬います",
		kana: "くようはこじんをうやまいます",
		romaji: "kuyowaakojinwotiamaimasui",
	},
	{
		jp: "お守りは神からの贈り物です",
		kana: "おまもりはかみからのおくりものです",
		romaji: "omamoriawakamikaranoaokurimonodesu",
	},
	{
		jp: "おみくじは運勢を占います",
		kana: "おみくじはうんせいをうらないます",
		romaji: "omikujiwaaunseiwoarainaimasui",
	},
	{
		jp: "合掌は敬意を表します",
		kana: "がっしょうはけいいをあらわします",
		romaji: "gasshowakkeiiwootarawashimasui",
	},
	{
		jp: "経文は仏の教えです",
		kana: "きょうぶんはほとけのおしえです",
		romaji: "kyobunwahotokenooしiedesui",
	},
	{
		jp: "護摩焚きは儀式です",
		kana: "ごまたきはぎしきです",
		romaji: "gomatakiwagishikidesui",
	},
	{
		jp: "修行は精神を高めます",
		kana: "しゅぎょうはせいしんをたかめます",
		romaji: "shugyowaseishinwotakamemasui",
	},
	{
		jp: "般若心経は有名です",
		kana: "はんにゃしんぎょうはゆうめいです",
		romaji: "hannyaasingyowayuumeidesui",
	},
	{
		jp: "御本尊は信仰の中心です",
		kana: "ごほんぞんはしんこうのちゅうしんです",
		romaji: "gohonzonwashinkonochuushindesui",
	},
	{
		jp: "法要は供養の儀式です",
		kana: "ほうようはくようのぎしきです",
		romaji: "hoyowakuyonogishikidesui",
	},
	{
		jp: "帯は着物を締めます",
		kana: "おびはきものをしめます",
		romaji: "obiwakimonowoshimemasu",
	},
	{
		jp: "足袋は足の衣です",
		kana: "たびはあしのころもです",
		romaji: "tabiwaashinokoromodesu",
	},
	{
		jp: "下駄は木製の履物です",
		kana: "げたはもくせいのはきものです",
		romaji: "getawamokuseinnohakimonodesu",
	},
	{
		jp: "扇は涼しさをもたらします",
		kana: "おうぎはすずしさをもたらします",
		romaji: "ougiwasuzushisawomotarashimasu",
	},
	{
		jp: "髪飾りは美しい装飾です",
		kana: "かみかざりはうつくしいそうしょくです",
		romaji: "kamikazariuatutsukushiisoushoudesu",
	},
	{
		jp: "楽しい",
		kana: "たのしい",
		romaji: "tanoshii",
	},
	{
		jp: "嬉しい",
		kana: "うれしい",
		romaji: "ureshii",
	},
	{
		jp: "幸せだ",
		kana: "しあわせだ",
		romaji: "shiawaseda",
	},
	{
		jp: "喜ぶ",
		kana: "よろこぶ",
		romaji: "yorokobu",
	},
	{
		jp: "笑顔になる",
		kana: "えがおになる",
		romaji: "egaoniharu",
	},
	{
		jp: "心が晴れる",
		kana: "こころがはれる",
		romaji: "kokorohahaeru",
	},
	{
		jp: "気分がいい",
		kana: "きぶんがいい",
		romaji: "kibungaii",
	},
	{
		jp: "ワクワクする",
		kana: "わくわくする",
		romaji: "wakuwakusuru",
	},
	{
		jp: "興奮する",
		kana: "こうふんする",
		romaji: "koufunsuru",
	},
	{
		jp: "満足する",
		kana: "まんぞくする",
		romaji: "manzokusuru",
	},
	{
		jp: "誇りを感じる",
		kana: "ほこりをかんじる",
		romaji: "hokoriwokannjiru",
	},
	{
		jp: "感動する",
		kana: "かんどうする",
		romaji: "kandousuru",
	},
	{
		jp: "良かった",
		kana: "よかった",
		romaji: "yokatta",
	},
	{
		jp: "最高だ",
		kana: "さいこうだ",
		romaji: "saikouda",
	},
	{
		jp: "素晴らしい",
		kana: "すばらしい",
		romaji: "subarashii",
	},
	{
		jp: "美しい",
		kana: "うつくしい",
		romaji: "utsukushii",
	},
	{
		jp: "愛おしい",
		kana: "いとおしい",
		romaji: "itoshii",
	},
	{
		jp: "好きだ",
		kana: "すきだ",
		romaji: "sukida",
	},
	{
		jp: "愛する",
		kana: "あいする",
		romaji: "aisuru",
	},
	{
		jp: "幸運だ",
		kana: "こううんだ",
		romaji: "kouunda",
	},
	{
		jp: "ラッキー",
		kana: "らっきー",
		romaji: "rakki",
	},
	{
		jp: "安心する",
		kana: "あんしんする",
		romaji: "anshinsuru",
	},
	{
		jp: "ほっとする",
		kana: "ほっとする",
		romaji: "hottosuru",
	},
	{
		jp: "落ち着く",
		kana: "おちつく",
		romaji: "ochitsuku",
	},
	{
		jp: "穏やかだ",
		kana: "おだやかだ",
		romaji: "odayakada",
	},
	{
		jp: "平和だ",
		kana: "へいわだ",
		romaji: "heiwada",
	},
	{
		jp: "楽園のようだ",
		kana: "らくえんのようだ",
		romaji: "rakuennoyouda",
	},
	{
		jp: "夢心地だ",
		kana: "ゆめごこちだ",
		romaji: "yumegokochida",
	},
	{
		jp: "浮かれる",
		kana: "うかれる",
		romaji: "ukareru",
	},
	{
		jp: "上機嫌だ",
		kana: "じょうきげんだ",
		romaji: "joukigenda",
	},
	{
		jp: "いい気分だ",
		kana: "いいきぶんだ",
		romaji: "iikibunda",
	},
	{
		jp: "楽しみにしている",
		kana: "たのしみにしている",
		romaji: "tanoshiminishiteiru",
	},
	{
		jp: "待ちきれない",
		kana: "またきれない",
		romaji: "matakirenai",
	},
	{
		jp: "胸が高まる",
		kana: "むねがたかまる",
		romaji: "munegatakamaru",
	},
	{
		jp: "希望に満ちる",
		kana: "きぼうにみちる",
		romaji: "kibounimichiru",
	},
	{
		jp: "前向きだ",
		kana: "まえむきだ",
		romaji: "maemukida",
	},
	{
		jp: "ポジティブだ",
		kana: "ぽじてぃぶだ",
		romaji: "pojitibuda",
	},
	{
		jp: "元気だ",
		kana: "げんきだ",
		romaji: "genkida",
	},
	{
		jp: "生き生きしている",
		kana: "いきいきしている",
		romaji: "ikiikishiteiru",
	},
	{
		jp: "活力がある",
		kana: "かつりょくがある",
		romaji: "katsryokugaaru",
	},
	{
		jp: "輝いている",
		kana: "かがやいている",
		romaji: "kagayaiteiru",
	},
	{
		jp: "光り輝く",
		kana: "ひかりかがやく",
		romaji: "hikarikagayaku",
	},
	{
		jp: "天にも昇る気分だ",
		kana: "てんにものぼるきぶんだ",
		romaji: "tennimonobоrukibunda",
	},
	{
		jp: "言葉にならない喜び",
		kana: "ことばにならないよろこび",
		romaji: "kotobaninoranaiyorokobi",
	},
	{
		jp: "心躍る",
		kana: "こころおどる",
		romaji: "kokoroodoru",
	},
	{
		jp: "ほほ笑む",
		kana: "ほほえむ",
		romaji: "hohoemu",
	},
	{
		jp: "笑みが止まらない",
		kana: "わらいがとまらない",
		romaji: "waraigatomaranai",
	},
	{
		jp: "陽気だ",
		kana: "ようきだ",
		romaji: "youkida",
	},
	{
		jp: "朗らかだ",
		kana: "ほがらかだ",
		romaji: "hogarakada",
	},
	{
		jp: "幸福感に満ちる",
		kana: "こうふくかんにみちる",
		romaji: "koufukukannimichiru",
	},
	{
		jp: "悲しい",
		kana: "かなしい",
		romaji: "kanashii",
	},
	{
		jp: "苦しい",
		kana: "くるしい",
		romaji: "kurushii",
	},
	{
		jp: "落ち込む",
		kana: "おちこむ",
		romaji: "ochikomu",
	},
	{
		jp: "沈む",
		kana: "しずむ",
		romaji: "shizumu",
	},
	{
		jp: "へこむ",
		kana: "へこむ",
		romaji: "hekomu",
	},
	{
		jp: "泣く",
		kana: "なく",
		romaji: "naku",
	},
	{
		jp: "涙が出る",
		kana: "なみだがでる",
		romaji: "namidagaderu",
	},
	{
		jp: "涙ぐむ",
		kana: "なみだぐむ",
		romaji: "namidagumu",
	},
	{
		jp: "悔しい",
		kana: "くやしい",
		romaji: "kuyashii",
	},
	{
		jp: "後悔する",
		kana: "こうかいする",
		romaji: "koukaishiru",
	},
	{
		jp: "失望する",
		kana: "しつぼうする",
		romaji: "shitsubousuru",
	},
	{
		jp: "がっかりする",
		kana: "がっかりする",
		romaji: "gakkarisuru",
	},
	{
		jp: "期待外れだ",
		kana: "きたいはずれだ",
		romaji: "kitaihasureда",
	},
	{
		jp: "不安だ",
		kana: "ふあんだ",
		romaji: "fuanda",
	},
	{
		jp: "心配だ",
		kana: "しんぱいだ",
		romaji: "shinpaida",
	},
	{
		jp: "恐い",
		kana: "こわい",
		romaji: "kowai",
	},
	{
		jp: "怖れる",
		kana: "おそれる",
		romaji: "osoreru",
	},
	{
		jp: "震える",
		kana: "ふるえる",
		romaji: "furueru",
	},
	{
		jp: "ぞっとする",
		kana: "ぞっとする",
		romaji: "zottosuru",
	},
	{
		jp: "孤独だ",
		kana: "こどくだ",
		romaji: "kodokuda",
	},
	{
		jp: "寂しい",
		kana: "さびしい",
		romaji: "sabishii",
	},
	{
		jp: "淋しい",
		kana: "さみしい",
		romaji: "samishii",
	},
	{
		jp: "一人ぼっちだ",
		kana: "ひとりぼっちだ",
		romaji: "hitoribocchida",
	},
	{
		jp: "心が痛む",
		kana: "こころがいたむ",
		romaji: "kokorogaitamu",
	},
	{
		jp: "胸が痛い",
		kana: "むねがいたい",
		romaji: "munegaitai",
	},
	{
		jp: "胸を掴まれる",
		kana: "むねをつかまれる",
		romaji: "munewotsukamareru",
	},
	{
		jp: "息が詰まる",
		kana: "いきがつまる",
		romaji: "ikigatsumaru",
	},
	{
		jp: "息苦しい",
		kana: "いきくるしい",
		romaji: "ikikurushii",
	},
	{
		jp: "気が沈む",
		kana: "きがしずむ",
		romaji: "kigashizumu",
	},
	{
		jp: "気が晴れない",
		kana: "きがはれない",
		romaji: "kigaharenai",
	},
	{
		jp: "言葉が出ない",
		kana: "ことばがでない",
		romaji: "kotobagadenai",
	},
	{
		jp: "声が出ない",
		kana: "こえがでない",
		romaji: "koegadenai",
	},
	{
		jp: "無気力だ",
		kana: "むきりょくだ",
		romaji: "mukiryokuda",
	},
	{
		jp: "やる気が出ない",
		kana: "やるきがでない",
		romaji: "yarukigadenai",
	},
	{
		jp: "疲弊する",
		kana: "ひへいする",
		romaji: "hiheisuru",
	},
	{
		jp: "倒れそうだ",
		kana: "たおれそうだ",
		romaji: "taoresoda",
	},
	{
		jp: "どん底だ",
		kana: "どんぞこだ",
		romaji: "donzokoda",
	},
	{
		jp: "絶望する",
		kana: "ぜつぼうする",
		romaji: "zetsubousuru",
	},
	{
		jp: "希望が見えない",
		kana: "きぼうがみえない",
		romaji: "kibougamienai",
	},
	{
		jp: "終わりだ",
		kana: "おわりだ",
		romaji: "owarida",
	},
	{
		jp: "人生終わり",
		kana: "じんせいおわり",
		romaji: "jinseiowari",
	},
	{
		jp: "呆然とする",
		kana: "ぼうぜんとする",
		romaji: "bouzentosuru",
	},
	{
		jp: "打ちのめされる",
		kana: "うちのめされる",
		romaji: "uchinomeсareru",
	},
	{
		jp: "押しつぶされる",
		kana: "おしつぶされる",
		romaji: "oshitsubuсareru",
	},
	{
		jp: "重い気分だ",
		kana: "おもいきぶんだ",
		romaji: "omoikibunda",
	},
	{
		jp: "灰色の人生だ",
		kana: "はいいろのじんせいだ",
		romaji: "haiiroznojinseida",
	},
	{
		jp: "死にたい",
		kana: "しにたい",
		romaji: "shinitai",
	},
	{
		jp: "ショックだ",
		kana: "しょっくだ",
		romaji: "shokkuda",
	},
	{
		jp: "怒る",
		kana: "おこる",
		romaji: "okoru",
	},
	{
		jp: "激怒する",
		kana: "げきどするする",
		romaji: "gekidosuru",
	},
	{
		jp: "真っ赤になる",
		kana: "まっかになる",
		romaji: "makkaninaны",
	},
	{
		jp: "カッとなる",
		kana: "かっとなる",
		romaji: "kattonaru",
	},
	{
		jp: "爆発しそうだ",
		kana: "ばくはつしそうだ",
		romaji: "bakuhatsushisoda",
	},
	{
		jp: "腹が立つ",
		kana: "はらがたつ",
		romaji: "haragatatsu",
	},
	{
		jp: "ムカムカする",
		kana: "むかむかする",
		romaji: "mukamukasuru",
	},
	{
		jp: "イラつく",
		kana: "いらつく",
		romaji: "iratsuku",
	},
	{
		jp: "カチンとくる",
		kana: "かちんとくる",
		romaji: "kachintokuru",
	},
	{
		jp: "頭に来る",
		kana: "あたまにくる",
		romaji: "atamankiru",
	},
	{
		jp: "不満だ",
		kana: "ふまんだ",
		romaji: "fumanda",
	},
	{
		jp: "納得できない",
		kana: "なっとくできない",
		romaji: "nattokudekinai",
	},
	{
		jp: "ふざけるな",
		kana: "ふざけるな",
		romaji: "fuzakeleruna",
	},
	{
		jp: "許せない",
		kana: "ゆるせない",
		romaji: "yurusenai",
	},
	{
		jp: "憎い",
		kana: "にくい",
		romaji: "nikui",
	},
	{
		jp: "恨む",
		kana: "うらむ",
		romaji: "uramu",
	},
	{
		jp: "腹立たしい",
		kana: "はらたたしい",
		romaji: "haratatashjii",
	},
	{
		jp: "悔しくて仕方ない",
		kana: "くやしくてしかたない",
		romaji: "kuyashikuteshkatanai",
	},
	{
		jp: "歯がゆい",
		kana: "はがゆい",
		romaji: "hagayui",
	},
	{
		jp: "じりじりする",
		kana: "じりじりする",
		romaji: "jirijirisinru",
	},
	{
		jp: "むしゃくしゃする",
		kana: "むしゃくしゃする",
		romaji: "mushakuhasuru",
	},
	{
		jp: "物に当たりたい",
		kana: "ものにあたりたい",
		romaji: "monoanatarytai",
	},
	{
		jp: "壊したい",
		kana: "こわしたい",
		romaji: "kowashitai",
	},
	{
		jp: "叫びたい",
		kana: "さけびたい",
		romaji: "sakebitai",
	},
	{
		jp: "怒号する",
		kana: "どごうする",
		romaji: "dogousuru",
	},
	{
		jp: "罵声を浴びせる",
		kana: "ばせいをあびせる",
		romaji: "baseiwoabiseru",
	},
	{
		jp: "舌打ちする",
		kana: "したうちする",
		romaji: "shitauchisuru",
	},
	{
		jp: "不機嫌だ",
		kana: "ふきげんだ",
		romaji: "fukigenda",
	},
	{
		jp: "つんけんしている",
		kana: "つんけんしている",
		romaji: "tsunkenshiteiru",
	},
	{
		jp: "無言の怒り",
		kana: "むごんのいかり",
		romaji: "muggonikaгi",
	},
	{
		jp: "噛みつきそうだ",
		kana: "かみつきそうだ",
		romaji: "kamitsukisoda",
	},
	{
		jp: "目が血走る",
		kana: "めがちばしる",
		romaji: "megachibashiru",
	},
	{
		jp: "顔が鬼になる",
		kana: "かおがおにになる",
		romaji: "kaogaoninaru",
	},
	{
		jp: "雷が落ちそうだ",
		kana: "かみなりがおちそうだ",
		romaji: "kaminariochisoda",
	},
	{
		jp: "地面を踏み鳴らす",
		kana: "じめんをふみならす",
		romaji: "jimenwofuminanasu",
	},
	{
		jp: "机を叩く",
		kana: "つくえをたたく",
		romaji: "tsukuewotатaku",
	},
	{
		jp: "ドアを閉める",
		kana: "どあをしめる",
		romaji: "doawoshimeru",
	},
	{
		jp: "人格が変わる",
		kana: "じんかくがかわる",
		romaji: "jinkakugakawaru",
	},
	{
		jp: "鬼と化す",
		kana: "おにとかす",
		romaji: "onitokasu",
	},
	{
		jp: "まるで別人だ",
		kana: "まるでべつじんだ",
		romaji: "marudebetsujinda",
	},
	{
		jp: "緊張する",
		kana: "きんちょうする",
		romaji: "kinchoushiсu",
	},
	{
		jp: "ドキドキする",
		kana: "どきどきする",
		romaji: "dokidokisuru",
	},
	{
		jp: "そわそわする",
		kana: "そわそわする",
		romaji: "sowasowasuru",
	},
	{
		jp: "落ち着かない",
		kana: "おちつかない",
		romaji: "ochitsukanai",
	},
	{
		jp: "神経質だ",
		kana: "しんけいしつだ",
		romaji: "shinkeishitsuda",
	},
	{
		jp: "びくびくしている",
		kana: "びくびくしている",
		romaji: "bikubikushiteiru",
	},
	{
		jp: "震えている",
		kana: "ふるえている",
		romaji: "furueteiru",
	},
	{
		jp: "冷や汗が出る",
		kana: "ひやあせがでる",
		romaji: "hiyaasegaderu",
	},
	{
		jp: "緊張で喉が渇く",
		kana: "きんちょうでのどがかわく",
		romaji: "kinchoudenodougakawaku",
	},
	{
		jp: "心臓がバクバクする",
		kana: "しんぞうがばくばくする",
		romaji: "shinzougabakubakusuru",
	},
	{
		jp: "手に汗握る",
		kana: "てにあせにぎる",
		romaji: "teniasenigiru",
	},
	{
		jp: "上がり性だ",
		kana: "あがりしょうだ",
		romaji: "agarishouда",
	},
	{
		jp: "あがっている",
		kana: "あがっている",
		romaji: "agatteiru",
	},
	{
		jp: "本番に弱い",
		kana: "ほんばんによわい",
		romaji: "hombanniyowai",
	},
	{
		jp: "大事な場面でミスする",
		kana: "だいじなばめんでみすする",
		romaji: "daijinabamendемisusuru",
	},
	{
		jp: "緊張の糸が張り詰める",
		kana: "きんちょうのいとがはりつめる",
		romaji: "kinchounaitogaharitsumeru",
	},
	{
		jp: "気が気でない",
		kana: "きがきでない",
		romaji: "kigakideнai",
	},
	{
		jp: "何かが起こるような気がする",
		kana: "なにかがおこるようなきがする",
		romaji: "nanifagaokoruyounaкigasuru",
	},
	{
		jp: "不吉な予感がする",
		kana: "ふきつなよかんがする",
		romaji: "fukitsunayokangasuru",
	},
	{
		jp: "嫌な感じがする",
		kana: "いやなかんじがする",
		romaji: "iyanakanjigasuru",
	},
	{
		jp: "背筋が凍る",
		kana: "せすじがこおる",
		romaji: "sesujigakoru",
	},
	{
		jp: "ざわざわしている",
		kana: "ざわざわしている",
		romaji: "zawazawashiteiru",
	},
	{
		jp: "モヤモヤしている",
		kana: "もやもやしている",
		romaji: "mayamayashiteiru",
	},
	{
		jp: "すっきりしない",
		kana: "すっきりしない",
		romaji: "sukkirihinai",
	},
	{
		jp: "違和感がある",
		kana: "いわかんがある",
		romaji: "iwakangaaru",
	},
	{
		jp: "落ち着きを失う",
		kana: "おちつきをうしなう",
		romaji: "ochitsukiwousinau",
	},
	{
		jp: "気を失いそう",
		kana: "きをうしないそう",
		romaji: "kiwoushinaisou",
	},
	{
		jp: "頭がスッキリしない",
		kana: "あたまがすっきりしない",
		romaji: "atamagasukkirihinai",
	},
	{
		jp: "思考が止まる",
		kana: "しこうがとまる",
		romaji: "shikougatomaru",
	},
	{
		jp: "パニックになる",
		kana: "ぱにっくになる",
		romaji: "panikkuninaru",
	},
	{
		jp: "恋している",
		kana: "こいしている",
		romaji: "koishiteiru",
	},
	{
		jp: "ときめく",
		kana: "ときめく",
		romaji: "tokimeku",
	},
	{
		jp: "胸がときめく",
		kana: "むねがときめく",
		romaji: "munegatomemeku",
	},
	{
		jp: "好きで好きでたまらない",
		kana: "すきですきでたまらない",
		romaji: "suкidesukindetamaranai",
	},
	{
		jp: "あなたが好きだ",
		kana: "あなたがすきだ",
		romaji: "anаtаgasukida",
	},
	{
		jp: "君が好きだ",
		kana: "きみがすきだ",
		romaji: "kimigasukida",
	},
	{
		jp: "大好きだ",
		kana: "だいすきだ",
		romaji: "daisukida",
	},
	{
		jp: "愛している",
		kana: "あいしている",
		romaji: "aishiteiru",
	},
	{
		jp: "愛しい人",
		kana: "いとしいひと",
		romaji: "itoshiihito",
	},
	{
		jp: "心が満たされる",
		kana: "こころがみたされる",
		romaji: "kokorogamitasareru",
	},
	{
		jp: "一緒にいたい",
		kana: "いっしょにいたい",
		romaji: "isshoniitai",
	},
	{
		jp: "側にいてほしい",
		kana: "そばにいてほしい",
		romaji: "sobaniiitehoshii",
	},
	{
		jp: "嫉妬する",
		kana: "しっとする",
		romaji: "shittosuru",
	},
	{
		jp: "焼きもちを焼く",
		kana: "やきもちをやく",
		romaji: "yakimochiwoyaku",
	},
	{
		jp: "独占したい",
		kana: "どくせんしたい",
		romaji: "dokusenshitai",
	},
	{
		jp: "思い出すだけで赤くなる",
		kana: "おもいだすだけであかくなる",
		romaji: "omoidasudakdeakakunaru",
	},
	{
		jp: "相手のことばかり考える",
		kana: "あいてのことばかりかんがえる",
		romaji: "aitenokotobakariкangaeru",
	},
	{
		jp: "運命だと感じる",
		kana: "うんめいだとかんじる",
		romaji: "unmeidatokannjiru",
	},
	{
		jp: "一生一緒でいたい",
		kana: "いっしょういっしょでいたい",
		romaji: "isshоuisshodeитai",
	},
	{
		jp: "この世の幸せ",
		kana: "このよのしあわせ",
		romaji: "konoyonoshiawase",
	},
	{
		jp: "複雑な気持ち",
		kana: "ふくざつなきもち",
		romaji: "fukuzatsunaきmochi",
	},
	{
		jp: "何も感じない",
		kana: "なにもかんじない",
		romaji: "nanimokannjinai",
	},
	{
		jp: "心が空っぽだ",
		kana: "こころがからっぽだ",
		romaji: "kokorogarappoda",
	},
	{
		jp: "もやもやとした気分",
		kana: "もやもやとしたきぶん",
		romaji: "mayamayatoshitakibun",
	},
	{
		jp: "気が進まない",
		kana: "きがすすまない",
		romaji: "kiigasusumanai",
	},
	{
		jp: "落ち着いている",
		kana: "おちついている",
		romaji: "ochitsuiteiru",
	},
	{
		jp: "静かな喜び",
		kana: "しずかなよろこび",
		romaji: "shizukanayorokobi",
	},
	{
		jp: "深い悲しみ",
		kana: "ふかいかなしみ",
		romaji: "fukaikanashimi",
	},
	{
		jp: "混乱している",
		kana: "こんらんしている",
		romaji: "konranshiteiru",
	},
	{
		jp: "達成感を感じる",
		kana: "たっせいかんをかんじる",
		romaji: "tasseikangwokannjiru",
	},
	{
		jp: "映画が好きです",
		kana: "えいががすきです",
		romaji: "eigagasukidesu",
	},
	{
		jp: "新しい映画を見たい",
		kana: "あたらしいえいがをみたい",
		romaji: "atarashiieigawomitai",
	},
	{
		jp: "今週末に映画館に行きます",
		kana: "こんしゅうまつにえいがかんにいきます",
		romaji: "konshuumatsuneiagakanniiikimasu",
	},
	{
		jp: "この映画は面白いですね",
		kana: "このえいがはおもしろいですね",
		romaji: "konoeigahaomoshiroidesuneRomaji",
	},
	{
		jp: "映画のチケットを買いました",
		kana: "えいがのちけっとをかいました",
		romaji: "eiganochtikettowokaimashita",
	},
	{
		jp: "ホラー映画は怖いです",
		kana: "ほらーえいがはこわいです",
		romaji: "horaaeigahakoowaidesu",
	},
	{
		jp: "洋画が大好きです",
		kana: "ようががだいすきです",
		romaji: "yougagadaisukidesu",
	},
	{
		jp: "邦画もいいですね",
		kana: "ほうがもいいですね",
		romaji: "hougamoiidesuneRomaji",
	},
	{
		jp: "映画のストーリーが良かった",
		kana: "えいがのすとーりーがよかった",
		romaji: "eiganosutoriiigayokatta",
	},
	{
		jp: "字幕映画を見ます",
		kana: "じまくえいがをみます",
		romaji: "jimakuieigawomimasu",
	},
	{
		jp: "吹き替え版を見ます",
		kana: "ふきかえはんをみます",
		romaji: "fukikaeehanwomimasu",
	},
	{
		jp: "アクション映画を見たい",
		kana: "あくしょんえいがをみたい",
		romaji: "akushonneigawomitai",
	},
	{
		jp: "ロマンス映画が好きです",
		kana: "ろまんすえいががすきです",
		romaji: "romansueigagasukidesu",
	},
	{
		jp: "コメディー映画は面白い",
		kana: "こめでぃーえいがはおもしろい",
		romaji: "komedeieigahaomoshiroi",
	},
	{
		jp: "サスペンス映画ドキドキします",
		kana: "さすぺんすえいがどきどきします",
		romaji: "saspensueigadokidokishimasu",
	},
	{
		jp: "SF映画が好きです",
		kana: "えすえふえいががすきです",
		romaji: "esuefueigagasukidesu",
	},
	{
		jp: "ファンタジー映画を見ます",
		kana: "ふぁんたじーえいがをみます",
		romaji: "fantajieigawomimasu",
	},
	{
		jp: "冒険映画は面白いですね",
		kana: "ぼうけんえいがはおもしろいですね",
		romaji: "boukeneigahaomoshirodesune",
	},
	{
		jp: "歴史映画が好きです",
		kana: "れきしえいががすきです",
		romaji: "rekishieigagasukidesu",
	},
	{
		jp: "ドキュメンタリーを見ました",
		kana: "どきゅめんたりーをみました",
		romaji: "dokyumentariwomimashita",
	},
	{
		jp: "映画館は居心地がいい",
		kana: "えいがかんはいごこちがいい",
		romaji: "eigakanhaiigokochigaii",
	},
	{
		jp: "ポップコーンが食べたい",
		kana: "ぽっぷこーんがたべたい",
		romaji: "poppukoornogatabetai",
	},
	{
		jp: "映画館の音響が素晴らしい",
		kana: "えいがかんのおんきょうがすばらしい",
		romaji: "eigakannonokkyousubarasui",
	},
	{
		jp: "大画面で見たいです",
		kana: "だいがめんでみたいです",
		romaji: "daigamendemiitaiidesu",
	},
	{
		jp: "映画館で友達と会った",
		kana: "えいがかんでともだちとあった",
		romaji: "eigakandeatomatoachittatatta",
	},
	{
		jp: "映画の上映時間は何分ですか",
		kana: "えいがのじょうえいじかんはなんぷんですか",
		romaji: "eiganojoueijikanhanannpundeskuka",
	},
	{
		jp: "午後の上映が安いです",
		kana: "ごごのじょうえいがやすいです",
		romaji: "gogonojouaigayasuidesu",
	},
	{
		jp: "夜間の上映に行きます",
		kana: "やかんのじょうえいにいきます",
		romaji: "yakannojouainiiikimasu",
	},
	{
		jp: "映画館は混んでいます",
		kana: "えいがかんはこんでいます",
		romaji: "eigakanhakondeitimasu",
	},
	{
		jp: "映画館の席が快適です",
		kana: "えいがかんのせきがかいてきです",
		romaji: "eigakannnosekigakaitekidesu",
	},
	{
		jp: "テレビドラマが面白い",
		kana: "てれびどらまがおもしろい",
		romaji: "terebidoramagonomomoshiroi",
	},
	{
		jp: "朝ドラを毎日見ています",
		kana: "あさどらをまいにちみています",
		romaji: "asadorawomainichimiteimasu",
	},
	{
		jp: "昨日のドラマ良かった",
		kana: "きのうのどらまよかった",
		romaji: "kinounodramayokatta",
	},
	{
		jp: "新しいシリーズが始まった",
		kana: "あたらしいしりーずがはじまった",
		romaji: "atarashiishiriiuzugahajiamatta",
	},
	{
		jp: "ドラマの主人公が好きです",
		kana: "どらまのしゅじんこうがすきです",
		romaji: "doramanoshujinkougasukidesu",
	},
	{
		jp: "テレビ番組を録画しました",
		kana: "てれびばんぐみをろくがしました",
		romaji: "terebibangumiwrokuagashimashita",
	},
	{
		jp: "次回の放送が楽しみです",
		kana: "じかいのほうそうがたのしみです",
		romaji: "jikaihohousougatanosimidesu",
	},
	{
		jp: "シリーズ全話見たい",
		kana: "しりーずぜんわみたい",
		romaji: "shiriiuzuzenzawamitai",
	},
	{
		jp: "最終回は感動しました",
		kana: "さいしゅうかいはかんどうしました",
		romaji: "saishuzkaaihaakandoushimashita",
	},
	{
		jp: "ドラマの続きが気になります",
		kana: "どらまのつづきがきになります",
		romaji: "doramanotsuduikigakinarimasu",
	},
	{
		jp: "アイドルが好きです",
		kana: "あいどるがすきです",
		romaji: "aiidorugasukidesu",
	},
	{
		jp: "アイドルコンサートに行きたい",
		kana: "あいどるこんさーときにいきたい",
		romaji: "aaidorukonsaatokiniikitai",
	},
	{
		jp: "有名な俳優です",
		kana: "ゆうめいなはいゆうです",
		romaji: "yuumeinigahaiyuudesu",
	},
	{
		jp: "女優さんが素敵です",
		kana: "じょゆうさんがすてきです",
		romaji: "joyuusangasuitekidesu",
	},
	{
		jp: "歌手のコンサートが好きです",
		kana: "かしゅのこんさーとがすきです",
		romaji: "kashuhnokonsaatogasukidesu",
	},
	{
		jp: "音楽番組を見ます",
		kana: "おんがくばんぐみをみます",
		romaji: "ongakubangumiwomimasu",
	},
	{
		jp: "アニメが大好きです",
		kana: "あにめがだいすきです",
		romaji: "animegadaisukidesu",
	},
	{
		jp: "アニメキャラが可愛いです",
		kana: "あにめきゃらがかわいいです",
		romaji: "animegyaaragakawaiidesu",
	},
	{
		jp: "芸能人のニュースを見ます",
		kana: "げいのうじんのにゅーすをみます",
		romaji: "geiunoujinnonniyuusuowomimasu",
	},
	{
		jp: "映画の予告編を見た",
		kana: "えいがのよこくへんをみた",
		romaji: "eiganoyokukuhenwomita",
	},
	{
		jp: "コンサートのチケット買った",
		kana: "こんさーとのちけっとかった",
		romaji: "konsaatonnochikettokatta",
	},
	{
		jp: "ライブに行きたいです",
		kana: "らいぶにいきたいです",
		romaji: "raibuniiikitaiidesu",
	},
	{
		jp: "音楽が好きです",
		kana: "おんがくがすきです",
		romaji: "ongakugasukidesu",
	},
	{
		jp: "新しいアルバムを買いました",
		kana: "あたらしいあるばむをかいました",
		romaji: "atarashiiiarubamuwokaimashita",
	},
	{
		jp: "この歌手は有名です",
		kana: "このかしゅはゆうめいです",
		romaji: "konokashuhayuumeidesu",
	},
	{
		jp: "好きな歌は何ですか",
		kana: "すきなうたはなんですか",
		romaji: "sukinautahananndesuka",
	},
	{
		jp: "フェスティバルに参加します",
		kana: "ふぇすてぃばるにさんかします",
		romaji: "festibaarunisankasihimasu",
	},
	{
		jp: "音楽フェスが楽しみです",
		kana: "おんがくふぇすがたのしみです",
		romaji: "ongakufesugatanosimidesu",
	},
	{
		jp: "歌詞が感動します",
		kana: "かしがかんどうします",
		romaji: "kashigakandoushimasu",
	},
	{
		jp: "バンドの演奏が素晴らしい",
		kana: "ばんどのえんそうがすばらしい",
		romaji: "bandunoensougasubarasui",
	},
	{
		jp: "毎晩テレビを見ます",
		kana: "まいばんてれびをみます",
		romaji: "maibanterebiwomimasu",
	},
	{
		jp: "朝にテレビを付けます",
		kana: "あさにてれびをつけます",
		romaji: "asaniterebiwotsukemasui",
	},
	{
		jp: "テレビの番組表を見ました",
		kana: "てれびのばんぐみひょうをみました",
		romaji: "terebinobangumihiyouwomimashita",
	},
	{
		jp: "お気に入りの番組があります",
		kana: "おきにいりのばんぐみがあります",
		romaji: "okiniirinnobangumigaarimasu",
	},
	{
		jp: "テレビをスイッチ切ります",
		kana: "てれびをすいっちきります",
		romaji: "terebiwoswitchikirimasu",
	},
	{
		jp: "テレビドラマの結末が気になる",
		kana: "てれびどらまのけつまつがきになる",
		romaji: "terebidoramanoketsumatsugakininaru",
	},
	{
		jp: "昨晩のテレビ放送を見逃した",
		kana: "さくばんのてれびほうそうをみのがした",
		romaji: "sakubannoterebihousouwominogashita",
	},
	{
		jp: "テレビクイズ番組が好きです",
		kana: "てれびくいずばんぐみがすきです",
		romaji: "terebikuizubangumigasukidesu",
	},
	{
		jp: "テレビ版とネット配信は違う",
		kana: "てれびはんとねっとはいしんはちがう",
		romaji: "terebihantonettohaishinwachigau",
	},
	{
		jp: "テレビのリモコンを探します",
		kana: "てれびのりもこんをさがします",
		romaji: "terebinorimokonnwosagashimasu",
	},
	{
		jp: "人気俳優が出演します",
		kana: "にんきはいゆうがしゅつえんします",
		romaji: "ninkihaiyuugashutsuenshimasu",
	},
	{
		jp: "新人女優がデビューしました",
		kana: "しんじんじょゆうがでびゅーしました",
		romaji: "shinuinjoyuugadebyuushimashita",
	},
	{
		jp: "有名女優が結婚したニュース",
		kana: "ゆうめいじょゆうがけっこんしたにゅーす",
		romaji: "yuumeiojoyuugakekkonshitaniyuusu",
	},
	{
		jp: "タレントの私生活が話題です",
		kana: "たれんとのしせいかつがわだいです",
		romaji: "tarentonnoshiseikatsugewadaidesu",
	},
	{
		jp: "男優さんが声優もしている",
		kana: "だんゆうさんがせいゆうもしている",
		romaji: "danyuusangaseiyuumoshitei",
	},
	{
		jp: "子役ちゃんが可愛いです",
		kana: "こやくちゃんがかわいいです",
		romaji: "koyakuchanngakawaiidesu",
	},
	{
		jp: "ベテラン俳優の演技が上手です",
		kana: "べてらんはいゆうのえんぎがじょうずです",
		romaji: "beteranhaiyuunoengigajouzudesu",
	},
	{
		jp: "新しい俳優を発見しました",
		kana: "あたらしいはいゆうをはっけんしました",
		romaji: "atarashiihaiyuuwohakkenshimashita",
	},
	{
		jp: "女優は美しいですね",
		kana: "じょゆうはうつくしいですね",
		romaji: "joyuuhaautukushiidesune",
	},
	{
		jp: "有名な映画俳優です",
		kana: "ゆうめいなえいがはいゆうです",
		romaji: "yuumeineigahaiyuudesu",
	},
	{
		jp: "ストリーミング配信を見ています",
		kana: "すとりーみんぐはいしんをみています",
		romaji: "sutoriminguhaishinwomiteimasu",
	},
	{
		jp: "オンデマンド配信が便利です",
		kana: "おんでまんどはいしんがべんりです",
		romaji: "ondemandhohaishinngabenriidesu",
	},
	{
		jp: "サブスク配信を登録しました",
		kana: "さぶすくはいしんをとうろくしました",
		romaji: "sabusukuhaishinwotorokuushimashita",
	},
	{
		jp: "動画サイトでアニメを見ます",
		kana: "どうがさいとであにめをみます",
		romaji: "dougasaitodeanimewomimasu",
	},
	{
		jp: "配信限定の映画を見たい",
		kana: "はいしんげんていのえいがをみたい",
		romaji: "haishinngenteinoeiigawomitai",
	},
	{
		jp: "オリジナル配信ドラマが人気です",
		kana: "おりじなるはいしんどらまがにんきです",
		romaji: "orijinaruhaishinndoramganinikiidesu",
	},
	{
		jp: "見放題が便利ですね",
		kana: "みほうだいがべんりですね",
		romaji: "mihodaigabenridesune",
	},
	{
		jp: "ダウンロード機能を使います",
		kana: "だうんろーどきのうをつかいます",
		romaji: "daunroodokkinouwtsukaai",
	},
	{
		jp: "配信が遅いです",
		kana: "はいしんがおそいです",
		romaji: "haishinngaosoidesu",
	},
	{
		jp: "動画配信サービスはいろいろあります",
		kana: "どうがはいしんさーびすはいろいろあります",
		romaji: "dougahaishinnsaavisuwhairoiroarimasu",
	},
	{
		jp: "映画の内容が深いですね",
		kana: "えいがのないようがふかいですね",
		romaji: "eigannonnaiyouugafukaidesuneRomaji",
	},
	{
		jp: "あの映画の評判はいいです",
		kana: "あのえいがのひょうばんはいいです",
		romaji: "anoeigannohyoubanhaiidesu",
	},
	{
		jp: "映画の見所は終わりです",
		kana: "えいがのみどころはおわりです",
		romaji: "eigannomidokorohaaowariidesu",
	},
	{
		jp: "この映画は感動的です",
		kana: "このえいがはかんどうてきです",
		romaji: "konoeigaakandouitekidesu",
	},
	{
		jp: "映画の撮影地に行きたい",
		kana: "えいがのさつえいちにいきたい",
		romaji: "eiganosatsuaeichiniikitai",
	},
	{
		jp: "映画のキャストが豪華です",
		kana: "えいがのきゃすとがごうかです",
		romaji: "eiganokyasutogagoukadesu",
	},
	{
		jp: "映像美が素晴らしいです",
		kana: "えいぞうびがすばらしいです",
		romaji: "eizoubisubarasuiidesu",
	},
	{
		jp: "編集が工夫されています",
		kana: "へんしゅくがくふうされています",
		romaji: "henshukugakufuusareiteimasu",
	},
	{
		jp: "映画の音楽が素敵です",
		kana: "えいがのおんがくがすてきです",
		romaji: "eiganonongakugasutekidesu",
	},
	{
		jp: "映画の実写化が決まった",
		kana: "えいがのじっしゃかがきまった",
		romaji: "eiganojisshakagakimatta",
	},
	{
		jp: "映画賞に受賞しました",
		kana: "えいがしょうにじゅしょうしました",
		romaji: "eigashounyiushoushimashita",
	},
	{
		jp: "アカデミー賞を受賞しました",
		kana: "あかでみーしょうをじゅしょうしました",
		romaji: "akademiishouowujushoushimashita",
	},
	{
		jp: "カンヌ映画祭が開催されます",
		kana: "かんぬえいがさいがかいさいされます",
		romaji: "kannueigasaigakaisaisarernmasu",
	},
	{
		jp: "映画祭に出品されました",
		kana: "えいがさいにしゅっぴんされました",
		romaji: "eigasainishuppinsarernmashita",
	},
	{
		jp: "有名な映画祭ですね",
		kana: "ゆうめいなえいがさいですね",
		romaji: "yuumeineigasaidesune",
	},
	{
		jp: "受賞作品が素晴らしいです",
		kana: "じゅしょうさくひんがすばらしいです",
		romaji: "jushousakuhinngasubarasuidesu",
	},
	{
		jp: "主演女優賞を受賞しました",
		kana: "しゅえんじょゆうしょうをじゅしょうしました",
		romaji: "shuennjoyuushouowjushoushimashita",
	},
	{
		jp: "作品賞に選ばれました",
		kana: "さくひんしょうにえらばれました",
		romaji: "sakuhinnshounieerabaremashita",
	},
	{
		jp: "最高の映画だと思います",
		kana: "さいこうのえいがだとおもいます",
		romaji: "saikounoeigadatooomoimasu",
	},
	{
		jp: "新人賞に合格しました",
		kana: "しんじんしょうにごうかくしました",
		romaji: "shinjinshounigoukakushimashita",
	},
	{
		jp: "映画化が発表されました",
		kana: "えいがかがはっぴょうされました",
		romaji: "eigakagahappyousarernmashita",
	},
	{
		jp: "続編が決定しました",
		kana: "ぞくへんがけっていしました",
		romaji: "zokuhengakketeishimashita",
	},
	{
		jp: "リメイク版が製作中です",
		kana: "りめいくはんがせいさくちゅうです",
		romaji: "rimeikuhanngaseisakuchuudeusu",
	},
	{
		jp: "スピンオフドラマがあります",
		kana: "すぴんおふどらまがあります",
		romaji: "supinofudoramgaarimasu",
	},
	{
		jp: "新シリーズが発表されました",
		kana: "あたらしいしりーずがはっぴょうされました",
		romaji: "atarashiishiriiuzugahappyousarernmashita",
	},
	{
		jp: "特別版が放送されます",
		kana: "とくべつはんがほうそうされます",
		romaji: "tokubetsuhanngahousousarernmasu",
	},
	{
		jp: "映画の前日譚が公開されました",
		kana: "えいがのぜんじつたんがこうかいされました",
		romaji: "eiganozenjitsutangakouKaisarernmashita",
	},
	{
		jp: "エンディングが変わりました",
		kana: "えんでぃんぐがかわりました",
		romaji: "endeingugakawarimasihta",
	},
	{
		jp: "キャスト変更が発表されました",
		kana: "きゃすとへんこうがはっぴょうされました",
		romaji: "kyasutohenkouugahappyousarernmashita",
	},
	{
		jp: "公開延期が発表されました",
		kana: "こうかいえんきがはっぴょうされました",
		romaji: "koukaienngigahappyousarernmashita",
	},
	{
		jp: "私の好きな映画です",
		kana: "わたしのすきなえいがです",
		romaji: "watashinosukinareeigadesu",
	},
	{
		jp: "あなたは何が好きですか",
		kana: "あなたはなにがすきですか",
		romaji: "anatahananigasukidesuka",
	},
	{
		jp: "彼は映画が大好きです",
		kana: "かれはえいががだいすきです",
		romaji: "kaarehaeiigagadaisukidesu",
	},
	{
		jp: "友達と映画を見に行きました",
		kana: "ともだちとえいがをみにいきました",
		romaji: "tomatoachieigawominiiikimashita",
	},
	{
		jp: "家族でテレビを見ます",
		kana: "かぞくでてれびをみます",
		romaji: "kazokudeterebiwomimasu",
	},
	{
		jp: "母は歌手が好きです",
		kana: "はははかしゅがすきです",
		romaji: "hahahakashugasukidesu",
	},
	{
		jp: "父はアクション映画が好きです",
		kana: "ちちはあくしょんえいががすきです",
		romaji: "chichihaakushouneigagasukidesu",
	},
	{
		jp: "兄はアニメをよく見ます",
		kana: "あにはあにめをよくみます",
		romaji: "aniihaanimewoyokumimasu",
	},
	{
		jp: "妹はアイドルが大好きです",
		kana: "いもうとはあいどるがだいすきです",
		romaji: "imoutohaaidorugadaisukidesu",
	},
	{
		jp: "友達の好みが分かりません",
		kana: "ともだちのこうみがわかりません",
		romaji: "tomaatachinnokoumiagawakarimasen",
	},
	{
		jp: "映画デートに行きたいです",
		kana: "えいがでーときにいきたいです",
		romaji: "eigadetookiniikitaiidesu",
	},
	{
		jp: "グループで映画を見に行く",
		kana: "ぐるーぷでえいがをみにいく",
		romaji: "guruupudeeigawominiiiku",
	},
	{
		jp: "友達と映画について話しました",
		kana: "ともだちとえいがについてはなしました",
		romaji: "tomatochieiganigtsuiitehainashimashita",
	},
	{
		jp: "映画鑑賞会に参加しました",
		kana: "えいがかんしょうかいにさんかしました",
		romaji: "eigakanshoukaainisankashimashita",
	},
	{
		jp: "映画の感想をシェアします",
		kana: "えいがのかんそうをしぇあします",
		romaji: "eiganokansouowshaeashimasu",
	},
	{
		jp: "映画レビューを書いています",
		kana: "えいがれびゅーをかいています",
		romaji: "eigareviuwokaitei",
	},
	{
		jp: "映画トークが楽しいです",
		kana: "えいがとーくがたのしいです",
		romaji: "eigatookugatanosidesu",
	},
	{
		jp: "映画について議論します",
		kana: "えいがについてぎろんします",
		romaji: "eiganigtsuitegiironsihimasu",
	},
	{
		jp: "映画好きが集まりました",
		kana: "えいがずきがあつまりました",
		romaji: "eigazukigaatsumarimasita",
	},
	{
		jp: "映画クラブに入りました",
		kana: "えいがくらぶにはいりました",
		romaji: "eigakurabuniahairimashita",
	},
	{
		jp: "テレビの広告が多いです",
		kana: "てれびのこうこくがおおいです",
		romaji: "terebinokoukougugaooidesu",
	},
	{
		jp: "映画館の割引券があります",
		kana: "えいがかんのわりびきけんがあります",
		romaji: "eigakannonowariakikikenngaarimasu",
	},
	{
		jp: "ドラマのプロデューサーが著名です",
		kana: "どらまのぷろでゅーさーがちょめいです",
		romaji: "doramanoproudeuyuusaagachomeidesu",
	},
	{
		jp: "放送局が競争しています",
		kana: "ほうそうきょくがきょうそうしています",
		romaji: "housoukyokugakyousousiteimasu",
	},
	{
		jp: "視聴率が高いです",
		kana: "しちょうりつがたかいです",
		romaji: "shichouritsugatakaidesu",
	},
	{
		jp: "番組編成が変わりました",
		kana: "ばんぐみへんせいがかわりました",
		romaji: "bangumihensaeigakawarimasita",
	},
	{
		jp: "映画の字幕翻訳が上手です",
		kana: "えいがのじまくほんやくがじょうずです",
		romaji: "eiganojimakuhonyakugajouzudesu",
	},
	{
		jp: "声優の演技が良いです",
		kana: "せいゆうのえんぎがよいです",
		romaji: "seiyuunoengigayoidesu",
	},
	{
		jp: "アニメの背景が綺麗です",
		kana: "あにめのはいけいがきれいです",
		romaji: "animenohaikeigakireidesu",
	},
	{
		jp: "映画サントラをダウンロード",
		kana: "えいがさんとらをだうんろーど",
		romaji: "eigasantorawodaunroodo",
	},
	{
		jp: "推し俳優が最高です",
		kana: "おしはいゆうがさいこうです",
		romaji: "oshihaiyuugasaikouidesu",
	},
	{
		jp: "推し活に夢中です",
		kana: "おしかつにむちゅうです",
		romaji: "oshikatsunimuchuuidesu",
	},
	{
		jp: "推し活の費用が大変です",
		kana: "おしかつのひようがたいへんです",
		romaji: "oshikatsunohiyougataiheniidesu",
	},
	{
		jp: "ファンアートが素敵です",
		kana: "ふぁんあーとがすてきです",
		romaji: "funaatogasutetkidesu",
	},
	{
		jp: "コスプレが流行しています",
		kana: "こすぷれがりゅうこうしています",
		romaji: "kosupuregaryuukoushiteimasu",
	},
	{
		jp: "ファンコミュニティが大きいです",
		kana: "ふぁんこみゅにてぃがおおきいです",
		romaji: "funkomyunitigaookidesu",
	},
	{
		jp: "同人誌が販売されています",
		kana: "どうじんしがはんばいされています",
		romaji: "doujinnshigahanbaisareiteimasui",
	},
	{
		jp: "イベントに参加しました",
		kana: "いべんとにさんかしました",
		romaji: "ibentonisankashimashita",
	},
	{
		jp: "オタクの友達がいます",
		kana: "おたくのともだちがいます",
		romaji: "otakunotomaatachigaiimasu",
	},
	{
		jp: "主人公の成長が見られます",
		kana: "しゅじんこうのせいちょうがみられます",
		romaji: "shuujinnkounoseichougamieremaasu",
	},
	{
		jp: "悪役がいい味出してます",
		kana: "わるやくがいいあじだしてます",
		romaji: "waruyakugaiiaajidashitemasu",
	},
	{
		jp: "サブキャラも活躍します",
		kana: "さぶきゃらもかつやくします",
		romaji: "sabukyaramokatsuyakushimasu",
	},
	{
		jp: "ラブストーリーが感動的です",
		kana: "らぶすとーりーがかんどうてきです",
		romaji: "rabusutooriigakandouutekidesu",
	},
	{
		jp: "ロマンス要素が上手です",
		kana: "ろまんすようそがじょうずです",
		romaji: "romansuyousogajouzudesu",
	},
	{
		jp: "友情のシーンが感動します",
		kana: "ゆうじょうのしーんがかんどうします",
		romaji: "yuujounnoshiingakandoushimasu",
	},
	{
		jp: "家族愛が描かれています",
		kana: "かぞくあいがえがかれています",
		romaji: "kazokuaigaegakareteimasui",
	},
	{
		jp: "人物描写が丁寧です",
		kana: "じんぶつびょうしゃがていねいです",
		romaji: "jinbutsuhyousiyagateineiidesu",
	},
	{
		jp: "背景ストーリーが面白いです",
		kana: "はいけいすとーりーがおもしろいです",
		romaji: "haikesutooriigaomosiroidesu",
	},
	{
		jp: "登場人物が多いです",
		kana: "とうじょうじんぶつがおおいです",
		romaji: "toujouujinnbutsugaooidesu",
	},
	{
		jp: "映画館で映画を見るのが好きです",
		kana: "えいがかんでえいがをみるのがすきです",
		romaji: "eigakandeeigawomirunnogasukidesu",
	},
	{
		jp: "新作映画の公開が楽しみです",
		kana: "しんさくえいがのこうかいがたのしみです",
		romaji: "shinsakuueiganokoukaigatanoshimidesu",
	},
	{
		jp: "映画のセリフが心に残りました",
		kana: "えいがのせりふがこころにのこりました",
		romaji: "eiganoserifugakokomoriniokorimashita",
	},
	{
		jp: "映画を見て元気が出ました",
		kana: "えいがをみてげんきがでました",
		romaji: "eigawomitegenkigademasita",
	},
	{
		jp: "映画の世界観が好きです",
		kana: "えいがのせかいかんがすきです",
		romaji: "eigannosekaaikangasukidesu",
	},
	{
		jp: "テレビドラマが人生に影響しました",
		kana: "てれびどらまがじんせいにえいきょうしました",
		romaji: "terebidoramajinnseinieikkyoushimashita",
	},
	{
		jp: "トレンド俳優が話題です",
		kana: "とれんどはいゆうがわだいです",
		romaji: "torendohaiyuugawadaidesu",
	},
	{
		jp: "インディーズ映画が面白い",
		kana: "いんでぃーずえいががおもしろい",
		romaji: "indeuzuieigahaomoshiroi",
	},
	{
		jp: "邦画の質が上がっています",
		kana: "ほうがのしつがあがっています",
		romaji: "hougannoshitsuugagatteimasu",
	},
	{
		jp: "洋画の字幕に注意します",
		kana: "ようがのじまくにちゅういします",
		romaji: "yougannojimakunitiuiushimasu",
	},
	{
		jp: "映画批評が的確です",
		kana: "えいがひひょうがてきかくです",
		romaji: "eigahihyougateikakudesu",
	},
	{
		jp: "ドキュメント映画を鑑賞しました",
		kana: "どきゅめんとえいがをかんしょうしました",
		romaji: "dokyumentoeigawokanshouushimashita",
	},
	{
		jp: "学園ドラマが人気です",
		kana: "がくえんどらまがにんきです",
		romaji: "gakuendoramganinikidesu",
	},
	{
		jp: "恋愛映画で泣きました",
		kana: "れんあいえいがでなきました",
		romaji: "rennaieigadenakinashita",
	},
	{
		jp: "冬ドラマが楽しみです",
		kana: "ふゆどらまがたのしみです",
		romaji: "fuyudoramgatanoshimidesu",
	},
	{
		jp: "夏の映画が期待大です",
		kana: "なつのえいががきたいだいです",
		romaji: "natsunoeigagakitaidaiidesu",
	},
	{
		jp: "オープニングを飛ばします",
		kana: "おーぷにんぐをとばします",
		romaji: "oopuninguwotobashimasu",
	},
	{
		jp: "エンディング曲が好きです",
		kana: "えんでぃんぐきょくがすきです",
		romaji: "endeingugkyokuugasukidesu",
	},
	{
		jp: "ネタバレが嫌です",
		kana: "ねたばれがきらいです",
		romaji: "netabareugakiraidesu",
	},
	{
		jp: "映画の結末を知りたいです",
		kana: "えいがのけつまつをしりたいです",
		romaji: "eiganoketsumatsuwoshiritaiidesu",
	},
	{
		jp: "伏線が回収されました",
		kana: "ふくせんがかいしゅうされました",
		romaji: "fikusenhgakaishuusarernmasita",
	},
	{
		jp: "どんでん返しに驚きました",
		kana: "どんでんがえしにおどろきました",
		romaji: "dondengaeshiniodorokimasita",
	},
	{
		jp: "ストーリーが複雑です",
		kana: "すとーりーがふくざつです",
		romaji: "stooriigafukuzatsuidesu",
	},
	{
		jp: "キャラクターが魅力的です",
		kana: "きゃらくたーがみりょくてきです",
		romaji: "kyarakutaagamitryokutekidesu",
	},
	{
		jp: "映像表現が革新的です",
		kana: "えいぞうひょうげんがかくしんてきです",
		romaji: "eizouuhyougengakakushintegikidesu",
	},
	{
		jp: "ダイアローグが素晴らしいです",
		kana: "だいあろーぐがすばらしいです",
		romaji: "daialogusubarasuidesu",
	},
	{
		jp: "映画チケットの予約をしました",
		kana: "えいがちけっとのよやくをしました",
		romaji: "eigatikettonnoyoyakuwoshimashita",
	},
	{
		jp: "映画館の会員になりました",
		kana: "えいがかんのかいいんになりました",
		romaji: "eigakannnokaiihnnninarimashita",
	},
	{
		jp: "見放題サービスに登録しました",
		kana: "みほうだいさーびすにとうろくしました",
		romaji: "mihodaisaabisunitourokushimashita",
	},
	{
		jp: "テレビ放送予定を確認しました",
		kana: "てれびほうそうよていをかくにんしました",
		romaji: "terebihousouoyoteinowokakuninushimashita",
	},
	{
		jp: "映画のメイキング映像を見た",
		kana: "えいがのめいきんぐえいぞうをみた",
		romaji: "eiganomeikinngueizouwomita",
	},
	{
		jp: "環境を守ることは大切です。",
		kana: "かんきょうをまもることはたいせつです。",
		romaji: "kankyouwomamorukotohataisetudesu.",
	},
	{
		jp: "私たちは自然を大切にしましょう。",
		kana: "わたしたちはしぜんをたいせつにしましょう。",
		romaji: "watashitachihasizenwotaisetsunisimasyou.",
	},
	{
		jp: "地球温暖化は大きな問題です。",
		kana: "ちきゅうおんだんかはおおきなもんだいです。",
		romaji: "tikyuuondankahaoookinamonndaidesu.",
	},
	{
		jp: "プラスチックは環境に悪いです。",
		kana: "ぷらすちっくはかんきょうにわるいです。",
		romaji: "purasutikkuhakankyo-uniwarui.desu.",
	},
	{
		jp: "ゴミを分別することが重要です。",
		kana: "ごみをぶんべつすることがじゅうようです。",
		romaji: "gomiwobunbetusurukotogajuuyoudesu.",
	},
	{
		jp: "燃料を節約しましょう。",
		kana: "ねんりょうをせつやくしましょう。",
		romaji: "nenryouwosetuyakusimasyou.",
	},
	{
		jp: "水を大事に使いましょう。",
		kana: "みずをだいじにつかいましょう。",
		romaji: "mizuwodaijinitukaisimasyo.u.",
	},
	{
		jp: "電気を無駄にしないでください。",
		kana: "でんきをむだにしないでください。",
		romaji: "denkiwomudasinasidedasai.",
	},
	{
		jp: "リサイクルは大切な習慣です。",
		kana: "りさいくるはたいせつなしゅうかんです。",
		romaji: "risaikuruhataisetsunasyuukandesu.",
	},
	{
		jp: "ペットボトルを再利用しましょう。",
		kana: "ぺっとぼとるをさいりようしましょう。",
		romaji: "pettobotoruWosairiyousimasyou.",
	},
	{
		jp: "紙ゴミは分別します。",
		kana: "かみごみはぶんべつします。",
		romaji: "kamigomihaBunbetusimasu.",
	},
	{
		jp: "ビン缶は回収日に出します。",
		kana: "びんかんはかいしゅうびにだします。",
		romaji: "binkanhakaisyuubinidasisimasu.",
	},
	{
		jp: "古い服を捨てずに寄付します。",
		kana: "ふるいふくをすてずにきふします。",
		romaji: "furuifukuwosutezunikifusimasu.",
	},
	{
		jp: "プラスチック袋を使わないようにします。",
		kana: "ぷらすちっくぶくろをつかわないようにします。",
		romaji: "purasutikkubukurowotukawanaiyo.unisimasu.",
	},
	{
		jp: "買い物時はエコバッグを持ち歩きます。",
		kana: "かいものじはえこばっぐをもちあるきます。",
		romaji: "kaimonojihaekobagguwomotigarukimasu.",
	},
	{
		jp: "食べ物の無駄を減らします。",
		kana: "たべものののむだをへらします。",
		romaji: "tabeMononoNoMudaWoHerasimasu.",
	},
	{
		jp: "コンポストを始めました。",
		kana: "こんぽすとをはじめました。",
		romaji: "konposutowohajimemasitta.",
	},
	{
		jp: "有機肥料を使っています。",
		kana: "ゆうきひりょうをつかっています。",
		romaji: "yuukihiryouwotukatteimasu.",
	},
	{
		jp: "包装紙を最小限にしましょう。",
		kana: "ほうそうしをさいしょうげんにしましょう。",
		romaji: "housousiwosaisyougennisimasyou.",
	},
	{
		jp: "太陽光発電を設置しています。",
		kana: "たいようこうはつでんをせっちしています。",
		romaji: "taiyoukouhatudenwosettisiteimasu.",
	},
	{
		jp: "冷房の温度を上げています。",
		kana: "れいぼうのおんどをあげています。",
		romaji: "reibo.unoondowoageiteimasu.",
	},
	{
		jp: "冬は暖房を控えめにします。",
		kana: "ふゆはだんぼうをひかえめにします。",
		romaji: "fuyuhadanbo.uwohi.kaemenimasimasu.",
	},
	{
		jp: "待機電力を削減しています。",
		kana: "たいきでんりょくをさくげんしています。",
		romaji: "taikidennryokuwosakugensiteimasu.",
	},
	{
		jp: "お風呂の水温を調整します。",
		kana: "おふろのみずおんどをちょうせいします。",
		romaji: "ofuronoMizuondoWotyouseiSIMASU.",
	},
	{
		jp: "外出時は電源を切ります。",
		kana: "がいしゅつじはでんげんをきります。",
		romaji: "gaisyutsujihadengennwokirimasu.",
	},
	{
		jp: "パソコンはすりーぷもーどにします。",
		kana: "ぱそこんはすりいぷもおどにします。",
		romaji: "pasokonhasuriipumo.odonisimasu.",
	},
	{
		jp: "電気代を節約したいです。",
		kana: "でんきだいをせつやくしたいです。",
		romaji: "DenkidaiwosetsuyakusitaiDesu.",
	},
	{
		jp: "自転車で移動しています。",
		kana: "じてんしゃでいどうしています。",
		romaji: "jitensyadeidousiteimasu.",
	},
	{
		jp: "公共交通機関をよく使います。",
		kana: "こうきょうこうつうきかんをよくつかいます。",
		romaji: "ko.ukyouko.utuukikannwoyokutukaimasu.",
	},
	{
		jp: "カーシェアリングを利用しています。",
		kana: "かあしぇありんぐをりようしています。",
		romaji: "ka.asyeavinguwoRiyousiteIMAsu.",
	},
	{
		jp: "地元の野菜を買うようにしています。",
		kana: "じもとののやさいをかうようにしています。",
		romaji: "jmotoNonoyasaiWoKauYouniSiteimasu.",
	},
	{
		jp: "マイカーの使用を減らしました。",
		kana: "まいかあのしようをへらしました。",
		romaji: "mai.ka.noSiyouwoherasimasitta.",
	},
	{
		jp: "一次産業を応援しています。",
		kana: "いちじさんぎょうをおうえんしています。",
		romaji: "icijisangyouwoouensiteimasu.",
	},
	{
		jp: "季節の食べ物を大切にします。",
		kana: "きせつのたべものをたいせつにします。",
		romaji: "kisetunnotabemonowotaisetsunisimasu.",
	},
	{
		jp: "地産地消に努めています。",
		kana: "ちさんちしょうにつとめています。",
		romaji: "tisancisyounituotometeimasu.",
	},
	{
		jp: "グレーウォーターを再利用しています。",
		kana: "ぐれえうおおたあをさいりようしています。",
		romaji: "gureeuo.ota.a.wosairiyousiteimasu.",
	},
	{
		jp: "トイレの水は流さないときがあります。",
		kana: "といれのみずはながさないときがあります。",
		romaji: "toirenniomizuhanagasnaitokigaarimasu.",
	},
	{
		jp: "雨水を庭に利用しています。",
		kana: "あまみずをにわにりようしています。",
		romaji: "amamizuwoniniwariousiteimasu.",
	},
	{
		jp: "お湯の無駄を避けています。",
		kana: "おゆのむだをさけています。",
		romaji: "oyunomuDAWosaketeimasu.",
	},
	{
		jp: "洗車の回数を減らしています。",
		kana: "せんしゃのかいすうをへらしています。",
		romaji: "sensyanoKaisuu.woerasiteimasu.",
	},
	{
		jp: "ボランティアをしています。",
		kana: "ぼらんてぃあをしています。",
		romaji: "borandei.awositeim.asu.",
	},
	{
		jp: "風呂の水を洗濯に使います。",
		kana: "ふろのみずをせんたくにつかいます。",
		romaji: "furoNomiZuWosEntAKuNItukaimasu.",
	},
	{
		jp: "蛇口をこまめに締めています。",
		kana: "じゃぐちをこまめにしめています。",
		romaji: "jagutiwokomanmenisimeiteimasu.",
	},
	{
		jp: "庭の植物に効率的に水をやります。",
		kana: "にわのしょくぶつにこうりつてきにみずをやります。",
		romaji: "nivanokossyokubutsunikouritutekiniMizuWoyarImasu.",
	},
	{
		jp: "水道水の品質は高いと思います。",
		kana: "すいどうすいのひんしつはたかいとおもいます。",
		romaji: "suidoussuinnohinnsitsuhatakaitoIomoImASu.",
	},
	{
		jp: "化学薬品の使用を避けています。",
		kana: "かがくやくひんのしようをさけています。",
		romaji: "kagakuyakuhinnnosiyouwosaketeimasu.",
	},
	{
		jp: "天然洗剤を使っています。",
		kana: "てんねんせんざいをつかっています。",
		romaji: "tenNensenzaiwoTukatteImasu.",
	},
	{
		jp: "重曹とお酢で掃除しています。",
		kana: "じゅうそうとおすでそうじしています。",
		romaji: "jyuusoutoosudesousiteimasu.",
	},
	{
		jp: "農薬の使用を最小限にしています。",
		kana: "のうやくのしようをさいしょうげんにしています。",
		romaji: "nouyakunosiyouWosaisyougennisiteImasu.",
	},
	{
		jp: "有機栽培の野菜を選びます。",
		kana: "ゆうきさいばいののやさいをえらびます。",
		romaji: "yuukisaibaininoyasaiWoERAbimasu.",
	},
	{
		jp: "農家を直接支援しています。",
		kana: "のうかをちょくせつしえんしています。",
		romaji: "noukawotiyokusetsusiensiteimasu.",
	},
	{
		jp: "海のゴミを拾うボランティアをしています。",
		kana: "うみのごみをひろうぼらんてぃあをしています。",
		romaji: "uminogoMiwohirou.borandei.awositeim.asu.",
	},
	{
		jp: "プラスチック製品を避けています。",
		kana: "ぷらすちっくせいひんをさけています。",
		romaji: "purasutikkuseihinwosaketeimasu.",
	},
	{
		jp: "マイクロプラスチックの問題を知っています。",
		kana: "まいくろぷらすちっくのもんだいをしっています。",
		romaji: "maikuropurasutikkunomonndaiwositeimasu.",
	},
	{
		jp: "川の汚染を減らす活動に参加しています。",
		kana: "かわのおせんをへらすかつどうにさんかしています。",
		romaji: "kawanooseNwoerasukatsudou.nisankasiteimasu.",
	},
	{
		jp: "カーボンニュートラルを目指しています。",
		kana: "かあぼんにゅうとらるをめざしています。",
		romaji: "ka.abonnyuu.toraruwomezasiteimasu.",
	},
	{
		jp: "温室効果ガスの排出を減らしています。",
		kana: "おんしつこうかがすのはいしゅつをへらしています。",
		romaji: "onsitukoukaagasunoHaisyutsuwoherasiteimasu.",
	},
	{
		jp: "森林再生プロジェクトに参加しています。",
		kana: "しんりんさいせいぷろじぇくとにさんかしています。",
		romaji: "sinrinsaiseiuprojektoNisankasiteimasu.",
	},
	{
		jp: "植林活動をしています。",
		kana: "しょくりんかつどうをしています。",
		romaji: "syokurikatsudouWositeim.asu.",
	},
	{
		jp: "バイオマスエネルギーを知っています。",
		kana: "ばいおますえねるぎあをしっています。",
		romaji: "baiomassuenerugi.awosite.imasu.",
	},
	{
		jp: "風力発電を支持しています。",
		kana: "ふうりょくはつでんをしじしています。",
		romaji: "fuuryokuhatudenwosijisiteimasu.",
	},
	{
		jp: "水力発電は良い選択肢です。",
		kana: "すいりょくはつでんはよいせんたくしです。",
		romaji: "suiryokuhatudenhayoisentakusiDesu.",
	},
	{
		jp: "フリマアプリで売ります。",
		kana: "ふりままあぷりでうります。",
		romaji: "furimaapuridourimasu.",
	},
	{
		jp: "波力発電の可能性を信じています。",
		kana: "はりょくはつでんのかのうせいをしんじています。",
		romaji: "haryokuhatudennokanouyouseiwosinjiteimasu.",
	},
	{
		jp: "リサイクルショップをよく利用します。",
		kana: "りさいくるしょっぷをよくりようします。",
		romaji: "risaikurusyoppuWoyokuRiyoUSIMASU.",
	},
	{
		jp: "ごみの量を減らす努力をしています。",
		kana: "ごみのりょうをへらすどりょくをしています。",
		romaji: "gomiNoryouWoerasudoryokuWositeim.asu.",
	},
	{
		jp: "不用品をフリマアプリで売ります。",
		kana: "ふようひんをふりまあぷりでうります。",
		romaji: "fuyouhinwofurimaapuridourimasu.",
	},
	{
		jp: "修理して長く使うようにしています。",
		kana: "しゅうりしてながくつかうようにしています。",
		romaji: "syuurisitенagakutukaуyounISIteImasku.",
	},
	{
		jp: "ミニマリストのライフスタイルを心がけています。",
		kana: "みにまりすとのらいふすたいるをこころがけています。",
		romaji: "minimarisutonoraifusutairuwokkorogakeleiteimasu.",
	},
	{
		jp: "必要な物だけを買うようにしています。",
		kana: "ひつようなものだけをかうようにしています。",
		romaji: "hituyo.unanomoNodakuwoKauYouniSiteim.asu.",
	},
	{
		jp: "ツリーハギングイベントに参加しました。",
		kana: "つりいはぎんぐいべんとにさんかしました。",
		romaji: "turi.hagginnguibentoNisankasimasia.ta.",
	},
	{
		jp: "紙の使用量を減らしています。",
		kana: "かみのしようりょうをへらしています。",
		romaji: "kaminosiyouryouwoherasiteimasu.",
	},
	{
		jp: "布製品を大切にしています。",
		kana: "ぬのせいひんをたいせつにしています。",
		romaji: "nunoseihinwotaisetsunisiteimasu.",
	},
	{
		jp: "捨てる前に売却を検討します。",
		kana: "すてるまえにばいきゃくをけんとうします。",
		romaji: "suterumaenibaikiakuwoKentousimasu.",
	},
	{
		jp: "ベランダで野菜を育てています。",
		kana: "べらんだでやさいをそだてています。",
		romaji: "BerandaDeYasaiWoSodateteImasu.",
	},
	{
		jp: "屋上庭園を計画しています。",
		kana: "おくじょうていえんをけいかくしています。",
		romaji: "OkujoTeienWoKeikakusiteimasu.",
	},
	{
		jp: "緑化運動に参加しています。",
		kana: "りょくかうんどうにさんかしています。",
		romaji: "Ryokkaundo.uNisankasiteimasu.",
	},
	{
		jp: "公園を清掃するボランティアをしています。",
		kana: "こうえんをせいそうするぼらんてぃあをしています。",
		romaji: "ko.uenWoseisosuruBorandei.aWositeim.asu.",
	},
	{
		jp: "野生動物の保護に関心があります。",
		kana: "やせいどうぶつのほごにかんしんがあります。",
		romaji: "yaseido.ubutsuNoHogoNiKanshinGaarImasu.",
	},
	{
		jp: "生態系を保全する大切さを知っています。",
		kana: "せいたいけいをほぜんするたいせつさをしっています。",
		romaji: "seitaikeiWohozensurUtaisetsusaWositeImasu.",
	},
	{
		jp: "竹の食器を使っています。",
		kana: "たけのしょっきをつかっています。",
		romaji: "takenossyokkiwotukaiteim.asu.",
	},
	{
		jp: "森林保護活動を応援しています。",
		kana: "しんりんほごかつどうをおうえんしています。",
		romaji: "sinrinhogoKatsudouWoouensiteimasu.",
	},
	{
		jp: "湿地帯の保全は重要です。",
		kana: "しっちたいのほぜんはじゅうようです。",
		romaji: "sititaiNohozenhajuuyoudesu.",
	},
	{
		jp: "里山の復元を支援しています。",
		kana: "さとやまのふくげんをしえんしています。",
		romaji: "satoyamanoFukugenWosiiensiteimasu.",
	},
	{
		jp: "環境教育に力を入れています。",
		kana: "かんきょうきょういくにちからをいれています。",
		romaji: "kankyoukyoiKunitikaraWoireiteimasu.",
	},
	{
		jp: "学校で環境問題について学びました。",
		kana: "がっこうでかんきょうもんだいについてまなびました。",
		romaji: "gakkou.dekankyoumondaiNituitemaNamebimasia.ta.",
	},
	{
		jp: "家族で環境保護について話し合います。",
		kana: "かぞくでかんきょうほごについてはなしあいます。",
		romaji: "KazokuDekankyou.hogoNituitehanasiAimasu.",
	},
	{
		jp: "職場で省エネの意識を高めています。",
		kana: "しょくばでしょうえねのいしきをたかめています。",
		romaji: "syokubaDesyoueneNoIsiki.WotakameteImasu.",
	},
	{
		jp: "環境に優しい商品を推奨しています。",
		kana: "かんきょうにやさしいしょうひんをすいしょうしています。",
		romaji: "kankyouniyasasii.syohinnWosuisyousiteimasu.",
	},
	{
		jp: "友人にエコについて話します。",
		kana: "ゆうじんにえこについてはなします。",
		romaji: "yuu.jinnnieko.nituitehanasimasu.",
	},
	{
		jp: "ステンレス製の水筒を持ち運びます。",
		kana: "すてんれすせいのすいとうをもちはこびます。",
		romaji: "sutenresuseinosuitouWomoti.nakobimasu.",
	},
	{
		jp: "麻製のショッピングバッグを使用します。",
		kana: "あさせいのしょっぴんぐばっぐをしようします。",
		romaji: "asaseinosyoppinngubagguwosiyousimasu.",
	},
	{
		jp: "地域の環境保全活動に参加しています。",
		kana: "ちいきのかんきょうほぜんかつどうにさんかしています。",
		romaji: "tiikINokAnkyou.hozenkatsudouNisankasiteimasu.",
	},
	{
		jp: "子どもに環境の大切さを教えたいです。",
		kana: "こどもにかんきょうのたいせつさをおしえたいです。",
		romaji: "kodomo.niKankyou.notaisetsusaWoosietaitaidesu.",
	},
	{
		jp: "引越しの際は不用品を処分します。",
		kana: "ひっこしのさいはふようひんをしょぶんします。",
		romaji: "hikkosinnosaiHafuyouhinWosyobunSIMASU.",
	},
	{
		jp: "衣料品のリサイクルを行っています。",
		kana: "いりょうひんのりさいくるをおこなっています。",
		romaji: "iryouhinnorisaikuruWookonatteimasu.",
	},
	{
		jp: "電子機器の適切な処理を心がけています。",
		kana: "でんしききのてきせつなしょりをこころがけています。",
		romaji: "densikikinotekasetunasyoriWokoroNgakeleIteimasu.",
	},
	{
		jp: "ウールは動物福祉認証付きを選びます。",
		kana: "うおるはどうぶつふくしにんしょうつきをえらびます。",
		romaji: "u.oruhadoubutufukusininsyoutsukiWoerabimasu.",
	},
	{
		jp: "冷蔵庫を定期的に掃除しています。",
		kana: "れいぞうこをていきてきにそうじしています。",
		romaji: "reizoukuwoTeikitetkinisousiteimasu.",
	},
	{
		jp: "食器洗い機を効率的に使用しています。",
		kana: "しょっきあらいきをこうりつてきにしようしています。",
		romaji: "syokkiaraikiwokouritutekniisiyousiteimasu.",
	},
	{
		jp: "洗濯物を干す習慣があります。",
		kana: "せんたくものをほすしゅうかんがあります。",
		romaji: "sentakumononohosuSyuu.kangaarimasu.",
	},
	{
		jp: "衣服を長く大事に着ています。",
		kana: "いふくをながくだいじにきています。",
		romaji: "ifukuWonagakudaijiniKiteimasu.",
	},
	{
		jp: "古着の寄付を定期的にしています。",
		kana: "こぎゃくのきふをていきてきにしています。",
		romaji: "kogyakuNokifuWoTeikitetkinisiteim.asu.",
	},
	{
		jp: "繕い職人を利用して服を直しています。",
		kana: "つくろいしょくにんをりようしてふくをなおしています。",
		romaji: "tukuroSyokNinnWoriYousiteifukunaositeimasu.",
	},
	{
		jp: "竹製品を使用しています。",
		kana: "たけせいひんをしようしています。",
		romaji: "takeseIhinwoSiyousiteimasu.",
	},
	{
		jp: "木製の歯ブラシを選びます。",
		kana: "もくせいのはぶらしをえらびます。",
		romaji: "mokuSeiNohabu.rasiwoerabimasu.",
	},
	{
		jp: "パーム油不使用の製品を選びます。",
		kana: "ぱあむゆふしようのせいひんをえらびます。",
		romaji: "pa.amuyufusiyounoSeIhinWoerabimasu.",
	},
	{
		jp: "生分解性製品を購入しています。",
		kana: "せいぶんかいせいせいひんをこうにゅうしています。",
		romaji: "seibunkaiseiseihinwokounyuusiteimasu.",
	},
	{
		jp: "コットン製品は認証済みを選びます。",
		kana: "こっとんせいひんはにんしょうずみをえらびます。",
		romaji: "kottonseIhinhaninsyousumiwoerabimasu.",
	},
	{
		jp: "サステナビリティは未来の鍵です。",
		kana: "さすてなびりてぃはみらいのかぎです。",
		romaji: "susutenabi.ritei.hamirainoKagidesu.",
	},
	{
		jp: "ゼロウェイストを目指しています。",
		kana: "ぜろうぇいすとをめざしています。",
		romaji: "zerou.ei.sutoWomezasiteimasu.",
	},
	{
		jp: "森林破壊に関わらない商品を購入しています。",
		kana: "しんりんはかいにかかわらないしょうひんをこうにゅうしています。",
		romaji: "SinrinhakaiNikakawaNasii.syohinnwokounyuusiteimasu.",
	},
	{
		jp: "漁業の持続可能性を考慮しています。",
		kana: "ぎょぎょうのじぞくかのうせいをこうりょしています。",
		romaji: "gyogyouNojizokuKanouseiwokouryositeimasu.",
	},
	{
		jp: "エコロジーについて興味があります。",
		kana: "えころじあについてきょうみがあります。",
		romaji: "ekoro.ji.anituitekyoumiGarImasu.",
	},
	{
		jp: "瞑想は心と環境に良いと思います。",
		kana: "めいそうはこころとかんきょうによいとおもいます。",
		romaji: "meiso.uhakkoroTokankyouniyo.iToOMoIMASU.",
	},
	{
		jp: "自然散歩は気分をリフレッシュします。",
		kana: "しぜんさんぽはきぶんをりふれっしゅします。",
		romaji: "sizenSanpoHakibuNWorifuresyuSIMASU.",
	},
	{
		jp: "エコ認証製品を購入しています。",
		kana: "えこにんしょうせいひんをこうにゅうしています。",
		romaji: "ekoninsyouSeIhinwokounyuusiteimasu.",
	},
	{
		jp: "運動は健康と環境の両方に良いです。",
		kana: "うんどうはけんこうとかんきょうのりょうほうによいです。",
		romaji: "undohakenkouTokankyounoRyouhou.niyo.idesu.",
	},
	{
		jp: "ヨガの練習をしています。",
		kana: "よがのれんしゅうをしています。",
		romaji: "yoganoRensyuuWositeim.asu.",
	},
	{
		jp: "陶製のコップを愛用しています。",
		kana: "とうせいのこっぷをあいようしています。",
		romaji: "touseinoKoppuWoaiyousiteimasu.",
	},
	{
		jp: "リネン製品を好んで使用しています。",
		kana: "りねんせいひんをこのんでしようしています。",
		romaji: "rinenSeihinWokonomndeSiyousiteimasu.",
	},
	{
		jp: "環境への責任感を持っています。",
		kana: "かんきょうへのせきにんかんをもっています。",
		romaji: "kankyouhenosekinNkannwomotteimasu.",
	},
	{
		jp: "未来の地球のために今行動します。",
		kana: "みらいのちきゅうのためにいまこうどうします。",
		romaji: "mirainotixkyuunnotameniimakoudousimasu.",
	},
	{
		jp: "小さな行動が大きな変化につながります。",
		kana: "ちいさなこうどうがおおきなへんかにつながります。",
		romaji: "tiisanakoudougaooki.nahenKanitunagarimasu.",
	},
	{
		jp: "一人ひとりが環境に貢献できます。",
		kana: "ひとりひとりがかんきょうにこうけんできます。",
		romaji: "hitoriHitoriGakankyounikou.kendekimasu.",
	},
	{
		jp: "持続可能な社会を目指しています。",
		kana: "じぞくかのうなしゃかいをめざしています。",
		romaji: "jizokukanounasyakaiWomezasiteimasu.",
	},
	{
		jp: "プラスチック包装を避ける努力をしています。",
		kana: "ぷらすちっくほうそうをさけるどりょくをしています。",
		romaji: "purasutikkuhou.souwosakeru.doryokuWositeim.asu.",
	},
	{
		jp: "生態系の多様性を守ることは重要です。",
		kana: "せいたいけいのたようせいをまもることはじゅうようです。",
		romaji: "seitaikeiNOtayouseiwomamoru.kotoHajuuyoudesu.",
	},
	{
		jp: "環境に配慮した購買習慣があります。",
		kana: "かんきょうにはいりょしたこうばいしゅうかんがあります。",
		romaji: "kankyounihairyositakoubaityuukanngarimasu.",
	},
	{
		jp: "環境汚染の原因について学んでいます。",
		kana: "かんきょうおせんのげんいんについてまなんでいます。",
		romaji: "kankyouoSEnnogeninnNituitemanaddeimasu.",
	},
	{
		jp: "廃棄物処理を工夫しています。",
		kana: "はいきぶつしょりをくふうしています。",
		romaji: "haikibututsyorikufu.usiteimasu.",
	},
	{
		jp: "サステナブルな商品を選ぶことが大切です。",
		kana: "さすてなぶるなしょうひんをえらぶことがたいせつです。",
		romaji: "susutenaburu.nasyohinnwoerabuKotoGataisetsudeSU.",
	},
	{
		jp: "ウォーターフットプリントを減らしています。",
		kana: "うおおたあふっとぷりんとをへらしています。",
		romaji: "u.oo.ta.a.futtopurinntowoherasiteimasu.",
	},
	{
		jp: "環保運動に参加したいです。",
		kana: "かんほうんどうにさんかしたいです。",
		romaji: "kanhoundo.uNisankasitaidesu.",
	},
	{
		jp: "大気汚染の改善を望んでいます。",
		kana: "たいきおせんのかいぜんをのぞんでいます。",
		romaji: "taikioSEnnokaizenWonoznndeimasu.",
	},
	{
		jp: "カーボンフットプリントを意識しています。",
		kana: "かあぼんふっとぷりんとをいしきしています。",
		romaji: "ka.abonfuttopurinntoWoisikisiteimasu.",
	},
	{
		jp: "オゾン層の保護は重要な課題です。",
		kana: "おぞんそうのほごはじゅうようなかだいです。",
		romaji: "ozonnsouhnohoGohajuuyounakadaidesu.",
	},
	{
		jp: "有害物質の削減に取り組んでいます。",
		kana: "ゆうがいぶっしつのさくげんにとりくんでいます。",
		romaji: "yu.ugaibuttsutsunosakugennitori.kumnndeimasu.",
	},
	{
		jp: "生物多様性保全計画に参加しています。",
		kana: "せいぶつたようせいほぜんけいかくにさんかしています。",
		romaji: "seibututatayouseihozennkeikakuNisankasiteimasu.",
	},
	{
		jp: "サーキュラーエコノミーを支持しています。",
		kana: "さあきゅらあえころのみあをしじしています。",
		romaji: "sa.akyura.aeko.ronomi.aWosijisiteimasu.",
	},
	{
		jp: "グリーンビルディングに興味があります。",
		kana: "ぐりいんびるでぃんぐにきょうみがあります。",
		romaji: "guri.nbi.ru.dei.nngki.yo.umigaarImasu.",
	},
	{
		jp: "ビニール袋の使用を廃止しました。",
		kana: "びにいるぶくろのしようをはいししました。",
		romaji: "bi.ni.rubukuroonosiyouWohaisimasia.ta.",
	},
	{
		jp: "緑化プロジェクトに寄付しています。",
		kana: "りょくかぷろじぇくとにきふしています。",
		romaji: "ryokkapurojekutoNikifusiteimasu.",
	},
	{
		jp: "環境負荷を最小化しています。",
		kana: "かんきょうふかをさいしょうかしています。",
		romaji: "kankyoufukaWosaisyoukasiteimasu.",
	},
	{
		jp: "化学肥料の使用を避けています。",
		kana: "かがくひりょうのしようをさけています。",
		romaji: "kagakuhiryounosiyouwosaketeimasu.",
	},
	{
		jp: "土壌保全に努めています。",
		kana: "どじょうほぜんにつとめています。",
		romaji: "dojouhozeninntutometeimasu.",
	},
	{
		jp: "生物農法を実践しています。",
		kana: "せいぶつのうほうをじっせんしています。",
		romaji: "seibutsunouhouwojissensiteimasu.",
	},
	{
		jp: "地球温暖化対策に参加しています。",
		kana: "ちきゅうおんだんかたいさくにさんかしています。",
		romaji: "tikyuu.ondannkataisaukunisankasiteimasu.",
	},
	{
		jp: "珊瑚礁保護活動を応援しています。",
		kana: "さんごしょうほごかつどうをおうえんしています。",
		romaji: "sangosyouhoKOkatsudouWoouensiteimasu.",
	},
	{
		jp: "環境に優しい清掃用品を使っています。",
		kana: "かんきょうにやさしいせいそうようひんをつかっています。",
		romaji: "kankyouniyasasii.seiso.uyohinnwotukatteimasu.",
	},
	{
		jp: "環境監視活動に参加しています。",
		kana: "かんきょうかんしかつどうにさんかしています。",
		romaji: "kankyouKanshikatsudouNisankasiteimasu.",
	},
	{
		jp: "自然保護団体を支援しています。",
		kana: "しぜんほごだんたいをしえんしています。",
		romaji: "sizen.hogodantaiWosiiensiteimasu.",
	},
	{
		jp: "野生動物の生息地を保護しています。",
		kana: "やせいどうぶつのせいそくちをほごしています。",
		romaji: "yaseido.ubutsunoseisokuttiWohogositeimasu.",
	},
	{
		jp: "海洋保全に関心があります。",
		kana: "かいようほぜんにかんしんがあります。",
		romaji: "kaiyouhozennnikanshinGarImasu.",
	},
	{
		jp: "島国の環境問題に関心があります。",
		kana: "しまぐにのかんきょうもんだいにかんしんがあります。",
		romaji: "simaguninokankyoumonndainiKanshinGarImasu.",
	},
	{
		jp: "北極圏の氷河消滅を心配しています。",
		kana: "ほっきょくけんのひょうがしょうめつをしんぱいしています。",
		romaji: "hokkyo.kukennoHyougasyoumetsuWosinnpaisiteimasu.",
	},
	{
		jp: "砂漠化を防ぐ活動に参加しています。",
		kana: "さばくかをふせぐかつどうにさんかしています。",
		romaji: "sabakukaWofuseぐkatsudouNisankasiteimasu.",
	},
	{
		jp: "湿地保全は生物多様性に重要です。",
		kana: "しっちほぜんはせいぶつたようせいにじゅうようです。",
		romaji: "sittihozehnhaseibututatayouseninijuuyoudesu.",
	},
	{
		jp: "エコシステムの回復を目指しています。",
		kana: "えこしすてむのかいふくをめざしています。",
		romaji: "ekosisutemu.nokaifu.kuWomezasiteimasu.",
	},
	{
		jp: "食物連鎖の破壊を避けようとしています。",
		kana: "しょくもつれんさのはかいをさけようとしています。",
		romaji: "syokumotsurennsanohakaiWosakeyoutositeimasu.",
	},
	{
		jp: "ポリネーター保護活動に参加しています。",
		kana: "ぽりねえたあほごかつどうにさんかしています。",
		romaji: "porinee.ta.ahogoKatsudouNisankasiteimasu.",
	},
	{
		jp: "蜂の生態系を守ることは大切です。",
		kana: "はちのせいたいけいをまもることはたいせつです。",
		romaji: "hatinoseitage.ikeiWomamoru.kotoHataisetsudeSU.",
	},
	{
		jp: "野菜に受粉を助ける昆虫を呼び込みます。",
		kana: "やさいにじゅふんをたすけるこんちゅうをよびこみます。",
		romaji: "yasainijyufunnwotaskerukontyuuWoyobiko.mimasu.",
	},
	{
		jp: "農業と環境の関係について学んでいます。",
		kana: "のうぎょうとかんきょうのかんけいについてまなんでいます。",
		romaji: "nougyouttokankyounokannnkeiNituitemanaddeimasu.",
	},
	{
		jp: "持続可能な農業実践を支持しています。",
		kana: "じぞくかのうなのうぎょうじっせんをしじしています。",
		romaji: "jizokukanounanougyoujisennwosijisiteimasu.",
	},
	{
		jp: "水田の生物多様性について知っています。",
		kana: "すいでんのせいぶつたようせいについてしっています。",
		romaji: "suidennoseibututayousenintuitesite.imasu.",
	},
	{
		jp: "里地里山の価値を認識しています。",
		kana: "さとちさとやまのかちをにんしきしています。",
		romaji: "satotisatoyamanoKatsiWoninsikisiteimasu.",
	},
	{
		jp: "景観保全に貢献したいと思っています。",
		kana: "けいかんほぜんにこうけんしたいとおもっています。",
		romaji: "keikannhozennnikoukennsitauitoomotteimasu.",
	},
	{
		jp: "地球の生物資源を大切にしています。",
		kana: "ちきゅうのせいぶつしげんをたいせつにしています。",
		romaji: "tikyuunoseibutusgennwotaisetsunisiteimasu.",
	},
	{
		jp: "環境科学に興味があります。",
		kana: "かんきょうかがくにきょうみがあります。",
		romaji: "kankyoukagakunikyoumigaarImasu.",
	},
	{
		jp: "生態調査に参加したことがあります。",
		kana: "せいたいちょうさにさんかしたことがあります。",
		romaji: "seitaityo.uSanniSankasitakotogaarImasu.",
	},
	{
		jp: "環境影響評価を支持しています。",
		kana: "かんきょうえいきょうひょうかをしじしています。",
		romaji: "kankyoueikyouhyoukaWosijisiteimasu.",
	},
	{
		jp: "企業の環境責任を監視しています。",
		kana: "きぎょうのかんきょうせきにんをかんししています。",
		romaji: "kigyounokankyousekinnnnwokannsisiteimasu.",
	},
	{
		jp: "環境規制の強化を支持しています。",
		kana: "かんきょうきせいのきょうかをしじしています。",
		romaji: "kankyouKiSEInokyo.ukaWosijisiteimasu.",
	},
	{
		jp: "ポッドキャストを聞いています。",
		kana: "ぽっどきゃすとをきいています。",
		romaji: "poddo.kyasutoWokiiteimasu.",
	},
	{
		jp: "電気自動車の普及を応援しています。",
		kana: "でんきじどうしゃのふきゅうをおうえんしています。",
		romaji: "denkijidousyanofu.kyuuWoouensiteimasu.",
	},
	{
		jp: "公共交通への投資を支持しています。",
		kana: "こうきょうこうつうへのとうしをしじしています。",
		romaji: "ko.ukyouko.utuuhenotou.siWosijisiteimasu.",
	},
	{
		jp: "歩行者にやさしい街づくりを応援しています。",
		kana: "ほこうしゃにやさしいまちづくりをおうえんしています。",
		romaji: "hokou.syaniyasasyii.matidukuriWoouensiteimasu.",
	},
	{
		jp: "緑地の保全と拡大を望んでいます。",
		kana: "りょくちのほぜんとかくだいをのぞんでいます。",
		romaji: "ryokuti.nohozennntokakudaiWonoznndeimasu.",
	},
	{
		jp: "環境教科書を読んで学んでいます。",
		kana: "かんきょうきょうかしょをよんでまなんでいます。",
		romaji: "kankyoukyoukasiowoyonndemanaaddeimasu.",
	},
	{
		jp: "環境ドキュメンタリーを見ています。",
		kana: "かんきょうどきゅめんたりうをみています。",
		romaji: "kankyoudokyumenntari-Womiteimasu.",
	},
	{
		jp: "環境に関するポッドキャストを聞いています。",
		kana: "かんきょうにかんするぽっどきゃすとをきいています。",
		romaji: "kankyounikannsurupoddo.kyasutoWokiiteimasu.",
	},
	{
		jp: "自分の食卓を環境に優しいものにしました。",
		kana: "じぶんのしょくたくをかんきょうにやさしいものにしました。",
		romaji: "jibunnosyokutakuwokankyouniyasasyiimononisimasia.ta.",
	},
	{
		jp: "毎日のルーティンで環境への配慮を実践しています。",
		kana: "まいにちのるうてぃんでかんきょうへのはいりょをじっせんしています。",
		romaji: "mainititinorutei.ndekankyouhenohairy.ojissensiteimasu.",
	},
	{
		jp: "おかあさん",
		kana: "おかあさん",
		romaji: "okaasan",
	},
	{
		jp: "おとうさん",
		kana: "おとうさん",
		romaji: "otousan",
	},
	{
		jp: "おにいさん",
		kana: "おにいさん",
		romaji: "oniisan",
	},
	{
		jp: "おねえさん",
		kana: "おねえさん",
		romaji: "oneesan",
	},
	{
		jp: "かぞくのきずなをたいせつに",
		kana: "かぞくのきずなをたいせつに",
		romaji: "kazokuokizunawotaisetuني",
	},
	{
		jp: "ともだちをたすけてあげたい",
		kana: "ともだちをたすけてあげたい",
		romaji: "tomadachiwotasuketeagetuい",
	},
	{
		jp: "おじいさん",
		kana: "おじいさん",
		romaji: "ojiisan",
	},
	{
		jp: "おばあさん",
		kana: "おばあさん",
		romaji: "obaasan",
	},
	{
		jp: "かぞくといっしょにいたい",
		kana: "かぞくといっしょにいたい",
		romaji: "kazokutoisshonitai",
	},
	{
		jp: "ともだちとずっといたい",
		kana: "ともだちとずっといたい",
		romaji: "tomadachitizuttai",
	},
	{
		jp: "おかあさんをたすけてあげる",
		kana: "おかあさんをたすけてあげる",
		romaji: "okaasanwotasuketeageru",
	},
	{
		jp: "おとうさんのためにがんばる",
		kana: "おとうさんのためにがんばる",
		romaji: "otousanonotatameniganbar",
	},
	{
		jp: "おじいさんとおばあさんであう",
		kana: "おじいさんとおばあさんであう",
		romaji: "ojiisanttobaasandetau",
	},
	{
		jp: "きょうだいときょうりょくする",
		kana: "きょうだいときょうりょくする",
		romaji: "kyoudaittokyouryokusru",
	},
	{
		jp: "ともだちのためにするしごと",
		kana: "ともだちのためにするしごと",
		romaji: "tomadachinotatamenisurusigo",
	},
	{
		jp: "ともとかぞくのすべてがいい",
		kana: "ともとかぞくのすべてがいい",
		romaji: "tomtokozokunosueteaii",
	},
	{
		jp: "がっこうのともだちとあそぶ",
		kana: "がっこうのともだちとあそぶ",
		romaji: "gakkonotomadachitasonabu",
	},
	{
		jp: "りょこうにいくともだちたち",
		kana: "りょこうにいくともだちたち",
		romaji: "ryokounitomadachitati",
	},
	{
		jp: "おさななじみ",
		kana: "おさななじみ",
		romaji: "osananajimi",
	},
	{
		jp: "かぞくであたたかいときとい",
		kana: "かぞくであたたかいときとい",
		romaji: "kazokudeatatakaitokitoi",
	},
	{
		jp: "ともだちといっしょにあるく",
		kana: "ともだちといっしょにあるく",
		romaji: "tomadachitoisshoniarlku",
	},
	{
		jp: "かぞくでいっしょにたべたい",
		kana: "かぞくでいっしょにたべたい",
		romaji: "kazokudoisshonitabetai",
	},
	{
		jp: "がっこうのともだち",
		kana: "がっこうのともだち",
		romaji: "gakkounotomadachi",
	},
	{
		jp: "げんきなともだち",
		kana: "げんきなともだち",
		romaji: "genkiitomadachi",
	},
	{
		jp: "たのしいともだち",
		kana: "たのしいともだち",
		romaji: "tanoshiitomadachi",
	},
	{
		jp: "えらいともだち",
		kana: "えらいともだち",
		romaji: "eraitomadachi",
	},
	{
		jp: "あたまのいいともだち",
		kana: "あたまのいいともだち",
		romaji: "atamanoiitomadachi",
	},
	{
		jp: "きれいなともだち",
		kana: "きれいなともだち",
		romaji: "kireiitomadachi",
	},
	{
		jp: "やさしいともだち",
		kana: "やさしいともだち",
		romaji: "yasashiitomadachi",
	},
	{
		jp: "かぞくであそぶ",
		kana: "かぞくであそぶ",
		romaji: "kazokudeasonabu",
	},
	{
		jp: "ははとはなす",
		kana: "ははとはなす",
		romaji: "hahatohanasu",
	},
	{
		jp: "ちちとあるく",
		kana: "ちちとあるく",
		romaji: "chichitoaruku",
	},
	{
		jp: "おじいさんとあう",
		kana: "おじいさんとあう",
		romaji: "ojiisantotau",
	},
	{
		jp: "おばあさんとたべる",
		kana: "おばあさんとたべる",
		romaji: "obaasantotaberu",
	},
	{
		jp: "あにとあそぶ",
		kana: "あにとあそぶ",
		romaji: "anitoasonabu",
	},
	{
		jp: "ねえさんをたすける",
		kana: "ねえさんをたすける",
		romaji: "neesanwotasukeru",
	},
	{
		jp: "いもうとにおしえる",
		kana: "いもうとにおしえる",
		romaji: "imoutonioshieru",
	},
	{
		jp: "かぞくでたべる",
		kana: "かぞくでたべる",
		romaji: "kazokudeetaberu",
	},
	{
		jp: "かぞくであるく",
		kana: "かぞくであるく",
		romaji: "kazokudeáruku",
	},
	{
		jp: "かぞくでねる",
		kana: "かぞくでねる",
		romaji: "kazokodefoneru",
	},
	{
		jp: "かぞくでえいが",
		kana: "かぞくでえいが",
		romaji: "kazokodeeiga",
	},
	{
		jp: "かぞくでかいもの",
		kana: "かぞくでかいもの",
		romaji: "kazokudekaimono",
	},
	{
		jp: "かぞくでうたう",
		kana: "かぞくでうたう",
		romaji: "kazokudeutan",
	},
	{
		jp: "かぞくでわらう",
		kana: "かぞくでわらう",
		romaji: "kazodewarammu",
	},
	{
		jp: "きょうだいできそう",
		kana: "きょうだいできそう",
		romaji: "kyoudaidekisou",
	},
	{
		jp: "かぞくでりょこう",
		kana: "かぞくでりょこう",
		romaji: "kazoderyokou",
	},
	{
		jp: "かぞくでおでかけ",
		kana: "かぞくでおでかけ",
		romaji: "kazokudeodekake",
	},
	{
		jp: "かぞくでおはなし",
		kana: "かぞくでおはなし",
		romaji: "kazokudehanashi",
	},
	{
		jp: "かぞくでゲーム",
		kana: "かぞくでゲーム",
		romaji: "kazokudegeeml",
	},
	{
		jp: "ははのため",
		kana: "ははのため",
		romaji: "hahanotame",
	},
	{
		jp: "ちちのため",
		kana: "ちちのため",
		romaji: "chichinotame",
	},
	{
		jp: "きょうだいを大事",
		kana: "きょうだいを大事",
		romaji: "kyoudaiwotaiji",
	},
	{
		jp: "かぞくをこえる",
		kana: "かぞくをこえる",
		romaji: "kazokuwokeru",
	},
	{
		jp: "かぞくのために",
		kana: "かぞくのために",
		romaji: "kazokunonatame",
	},
	{
		jp: "ともだちであそぶ",
		kana: "ともだちであそぶ",
		romaji: "tomadachideasonabu",
	},
	{
		jp: "ともだちとたべる",
		kana: "ともだちとたべる",
		romaji: "tomadachitotaberu",
	},
	{
		jp: "ともだちとえいが",
		kana: "ともだちとえいが",
		romaji: "tomadachitoieiga",
	},
	{
		jp: "ともだちとあるく",
		kana: "ともだちとあるく",
		romaji: "tomadachitotaruku",
	},
	{
		jp: "ともだちとはなす",
		kana: "ともだちとはなす",
		romaji: "tomadachitohanasu",
	},
	{
		jp: "ともだちをたすける",
		kana: "ともだちをたすける",
		romaji: "tomadachiwotasukeru",
	},
	{
		jp: "ともだちにきく",
		kana: "ともだちにきく",
		romaji: "tomadachimikiku",
	},
	{
		jp: "ともだちをまつ",
		kana: "ともだちをまつ",
		romaji: "tomadachiwomatsu",
	},
	{
		jp: "ともだちをさそう",
		kana: "ともだちをさそう",
		romaji: "tomadachiwosasou",
	},
	{
		jp: "ともだちときそう",
		kana: "ともだちときそう",
		romaji: "tomadachitokisou",
	},
	{
		jp: "ともだちでねる",
		kana: "ともだちでねる",
		romaji: "tomadachidefoneru",
	},
	{
		jp: "ともだちでのむ",
		kana: "ともだちでのむ",
		romaji: "tomadachidenomu",
	},
	{
		jp: "ともだちでかいもの",
		kana: "ともだちでかいもの",
		romaji: "tomadachidekaimono",
	},
	{
		jp: "ともだちでうたう",
		kana: "ともだちでうたう",
		romaji: "tomadachideutan",
	},
	{
		jp: "ともだちでわらう",
		kana: "ともだちでわらう",
		romaji: "tomadachidewarau",
	},
	{
		jp: "ともだちでりょこう",
		kana: "ともだちでりょこう",
		romaji: "tomadachideryokou",
	},
	{
		jp: "ともだちではしる",
		kana: "ともだちではしる",
		romaji: "tomadachidehashiru",
	},
	{
		jp: "ともだちでべんきょう",
		kana: "ともだちでべんきょう",
		romaji: "tomadachidebenkyou",
	},
	{
		jp: "ともだちでてをつなぐ",
		kana: "ともだちでてをつなぐ",
		romaji: "tomadachidetnatsunagu",
	},
	{
		jp: "ともだちのため",
		kana: "ともだちのため",
		romaji: "tomadachinotame",
	},
	{
		jp: "ともだちをたすけ",
		kana: "ともだちをたすけ",
		romaji: "tomadachiwotasuke",
	},
	{
		jp: "ともだちを応援",
		kana: "ともだちを応援",
		romaji: "tomadachiwoouen",
	},
	{
		jp: "ともだちとだんらん",
		kana: "ともだちとだんらん",
		romaji: "tomadachitodanran",
	},
	{
		jp: "ともだちをまもる",
		kana: "ともだちをまもる",
		romaji: "tomadachiwomamoru",
	},
	{
		jp: "ともだちと一緒",
		kana: "ともだちと一緒",
		romaji: "tomadachitoisshо",
	},
	{
		jp: "ちいさいいもうと",
		kana: "ちいさいいもうと",
		romaji: "chiisaiimouto",
	},
	{
		jp: "おおきいにいさん",
		kana: "おおきいにいさん",
		romaji: "ookiiniisan",
	},
	{
		jp: "かわいいいもうと",
		kana: "かわいいいもうと",
		romaji: "kawaiiimouto",
	},
	{
		jp: "やさしいおかあさん",
		kana: "やさしいおかあさん",
		romaji: "yasashiiokaasan",
	},
	{
		jp: "つよいおとうさん",
		kana: "つよいおとうさん",
		romaji: "tsuyoiotousan",
	},
	{
		jp: "あたまのいい",
		kana: "あたまのいい",
		romaji: "atamanoii",
	},
	{
		jp: "きれいなおねえ",
		kana: "きれいなおねえ",
		romaji: "kireineone",
	},
	{
		jp: "まじめなおとうと",
		kana: "まじめなおとうと",
		romaji: "majimenaotouto",
	},
	{
		jp: "げんきなおじいさん",
		kana: "げんきなおじいさん",
		romaji: "genkiinojiisan",
	},
	{
		jp: "あたたかいおばあさん",
		kana: "あたたかいおばあさん",
		romaji: "atatakiiobasan",
	},
	{
		jp: "おかしなともだち",
		kana: "おかしなともだち",
		romaji: "okashinatdmadachi",
	},
	{
		jp: "がんばるともだち",
		kana: "がんばるともだち",
		romaji: "ganbarutomadachi",
	},
	{
		jp: "しんらいできる",
		kana: "しんらいできる",
		romaji: "shinraidekiru",
	},
	{
		jp: "つよいともだち",
		kana: "つよいともだち",
		romaji: "tsuyotomadachi",
	},
	{
		jp: "せんせいのともだち",
		kana: "せんせいのともだち",
		romaji: "senselnotomadachi",
	},
	{
		jp: "ふるいともだち",
		kana: "ふるいともだち",
		romaji: "furuiitomadachi",
	},
	{
		jp: "あたらしいともだち",
		kana: "あたらしいともだち",
		romaji: "atarasitomadachi",
	},
	{
		jp: "むねのともだち",
		kana: "むねのともだち",
		romaji: "munenotomadachi",
	},
	{
		jp: "こころのともだち",
		kana: "こころのともだち",
		romaji: "kokoronotomadachi",
	},
	{
		jp: "せんせいのおかあさん",
		kana: "せんせいのおかあさん",
		romaji: "senseliokaasan",
	},
	{
		jp: "びょういんのおねえさん",
		kana: "びょういんのおねえさん",
		romaji: "byouinnonesan",
	},
	{
		jp: "こうむいんのおとうと",
		kana: "こうむいんのおとうと",
		romaji: "koumllonotouto",
	},
	{
		jp: "かいしゃいんのおにい",
		kana: "かいしゃいんのおにい",
		romaji: "kaishainnoniи",
	},
	{
		jp: "だくたーのおかあさん",
		kana: "だくたーのおかあさん",
		romaji: "dakutanokaаsan",
	},
	{
		jp: "じゅうたくのおねえさん",
		kana: "じゅうたくのおねえさん",
		romaji: "juutakunoonesan",
	},
	{
		jp: "しごとのおとうさん",
		kana: "しごとのおとうさん",
		romaji: "shigotonotousan",
	},
	{
		jp: "りょこうのともだち",
		kana: "りょこうのともだち",
		romaji: "ryokounotomadachi",
	},
	{
		jp: "おねえさんにならってみたい",
		kana: "おねえさんにならってみたい",
		romaji: "oneesanninarattemitai",
	},
	{
		jp: "おとうとをたすけてあげたい",
		kana: "おとうとをたすけてあげたい",
		romaji: "ototowotasuketeagetuai",
	},
	{
		jp: "いもうとをもっとたいせつに",
		kana: "いもうとをもっとたいせつに",
		romaji: "imoutowomottotaisеtuни",
	},
	{
		jp: "あいしてる",
		kana: "あいしてる",
		romaji: "aishiteru",
	},
	{
		jp: "ごめんなさい",
		kana: "ごめんなさい",
		romaji: "gomenasai",
	},
	{
		jp: "だいじょうぶですか",
		kana: "だいじょうぶですか",
		romaji: "daijoubudesuka",
	},
	{
		jp: "つかれました",
		kana: "つかれました",
		romaji: "tsukaremashita",
	},
	{
		jp: "はやいですね",
		kana: "はやいですね",
		romaji: "hayaidesune",
	},
	{
		jp: "またあした",
		kana: "またあした",
		romaji: "mataashita",
	},
	{
		jp: "あにとおねえさんにあいたい",
		kana: "あにとおねえさんにあいたい",
		romaji: "anitoneesannaitai",
	},
	{
		jp: "ともだちのかおをもっとみたい",
		kana: "ともだちのかおをもっとみたい",
		romaji: "tomadachinokaowomottomitai",
	},
	{
		jp: "たいへんですね",
		kana: "たいへんですね",
		romaji: "taihendesnc",
	},
	{
		jp: "ほんとうですか",
		kana: "ほんとうですか",
		romaji: "hontoudesuka",
	},
	{
		jp: "かぞくです",
		kana: "かぞくです",
		romaji: "kazokudesu",
	},
	{
		jp: "すごいですね",
		kana: "すごいですね",
		romaji: "sugoidesune",
	},
	{
		jp: "あしたもいっしょ",
		kana: "あしたもいっしょ",
		romaji: "ashitamoissho",
	},
	{
		jp: "またあしたね",
		kana: "またあしたね",
		romaji: "mataashitane",
	},
	{
		jp: "おつかれさま",
		kana: "おつかれさま",
		romaji: "otsukaresama",
	},
	{
		jp: "かぞくだいずき",
		kana: "かぞくだいずき",
		romaji: "kazokudaizuki",
	},
	{
		jp: "かぞくしあわせ",
		kana: "かぞくしあわせ",
		romaji: "kazokushiawase",
	},
	{
		jp: "かぞくたいせつ",
		kana: "かぞくたいせつ",
		romaji: "kazokutaisetsu",
	},
	{
		jp: "かぞくあたたかい",
		kana: "かぞくあたたかい",
		romaji: "kazokuatatakail",
	},
	{
		jp: "かぞくでうれしい",
		kana: "かぞくでうれしい",
		romaji: "kazokudeureshi",
	},
	{
		jp: "かぞくおもいで",
		kana: "かぞくおもいで",
		romaji: "kazokuomoide",
	},
	{
		jp: "かぞくずっと",
		kana: "かぞくずっと",
		romaji: "kazokuzutto",
	},
	{
		jp: "ともだちだいずき",
		kana: "ともだちだいずき",
		romaji: "tomadachidaizuki",
	},
	{
		jp: "ともだちしあわせ",
		kana: "ともだちしあわせ",
		romaji: "tomadachishiawase",
	},
	{
		jp: "ともだちたいせつ",
		kana: "ともだちたいせつ",
		romaji: "tomadachitaisetsu",
	},
	{
		jp: "ともだちあたたかい",
		kana: "ともだちあたたかい",
		romaji: "tomadachiatatakail",
	},
	{
		jp: "ともだちでうれしい",
		kana: "ともだちでうれしい",
		romaji: "tomadachideureshi",
	},
	{
		jp: "ともだちおもいで",
		kana: "ともだちおもいで",
		romaji: "tomadachiomoide",
	},
	{
		jp: "ともだちずっと",
		kana: "ともだちずっと",
		romaji: "tomadachizutto",
	},
	{
		jp: "いえがはじまり",
		kana: "いえがはじまり",
		romaji: "ieghajimari",
	},
	{
		jp: "ともがきずな",
		kana: "ともがきずな",
		romaji: "tomagakizuna",
	},
	{
		jp: "あいがすべてじゃない",
		kana: "あいがすべてじゃない",
		romaji: "aigasubetenai",
	},
	{
		jp: "たいせつなものはなに",
		kana: "たいせつなものはなに",
		romaji: "taisetunamonohanani",
	},
	{
		jp: "いっしょにいること",
		kana: "いっしょにいること",
		romaji: "isshonitiru",
	},
	{
		jp: "とずっと一緒",
		kana: "とずっと一緒",
		romaji: "tozuttoissho",
	},
	{
		jp: "こうえんであそぶ",
		kana: "こうえんであそぶ",
		romaji: "kouendeasonabu",
	},
	{
		jp: "もりであそぶ",
		kana: "もりであそぶ",
		romaji: "morideasonabu",
	},
	{
		jp: "うみであそぶ",
		kana: "うみであそぶ",
		romaji: "umideasonabu",
	},
	{
		jp: "こうえんでたべる",
		kana: "こうえんでたべる",
		romaji: "kouendeetaberu",
	},
	{
		jp: "がっこうであう",
		kana: "がっこうであう",
		romaji: "gakkoudeall",
	},
	{
		jp: "じゅぎょうであたえる",
		kana: "じゅぎょうであたえる",
		romaji: "jugyoudeataleru",
	},
	{
		jp: "てきすとであう",
		kana: "てきすとであう",
		romaji: "tekisutodelau",
	},
	{
		jp: "めーるであう",
		kana: "めーるであう",
		romaji: "meerudeall",
	},
	{
		jp: "せんせいとなかよし",
		kana: "せんせいとなかよし",
		romaji: "senseltonakaoshi",
	},
	{
		jp: "かぞくのこころ",
		kana: "かぞくのこころ",
		romaji: "kazokunokok",
	},
	{
		jp: "ともだちのこころ",
		kana: "ともだちのこころ",
		romaji: "tomadachinokok",
	},
	{
		jp: "よいともだち",
		kana: "よいともだち",
		romaji: "yoitomadachi",
	},
	{
		jp: "わるいともだち",
		kana: "わるいともだち",
		romaji: "waruitomadachi",
	},
	{
		jp: "やさしさはすすめ",
		kana: "やさしさはすすめ",
		romaji: "yasashisasusume",
	},
	{
		jp: "かぞくはすべて",
		kana: "かぞくはすべて",
		romaji: "kazokuhasuete",
	},
	{
		jp: "ともはかけがえ",
		kana: "ともはかけがえ",
		romaji: "tomohakakegae",
	},
	{
		jp: "くじけずにがんばる",
		kana: "くじけずにがんばる",
		romaji: "kujikkezuniganbar",
	},
	{
		jp: "いのちをだいじに",
		kana: "いのちをだいじに",
		romaji: "inochiwotaiji",
	},
	{
		jp: "ともとなかよく",
		kana: "ともとなかよく",
		romaji: "tomotonakayoku",
	},
	{
		jp: "あぞぶはたのしい",
		kana: "あぞぶはたのしい",
		romaji: "asobuhatanosii",
	},
	{
		jp: "ともだちです",
		kana: "ともだちです",
		romaji: "tomadachidesu",
	},
	{
		jp: "ままがすきです",
		kana: "ままがすきです",
		romaji: "mamagasukidesu",
	},
	{
		jp: "ぱぱがすきです",
		kana: "ぱぱがすきです",
		romaji: "papagasukidesu",
	},
	{
		jp: "ねえさんです",
		kana: "ねえさんです",
		romaji: "neesandesu",
	},
	{
		jp: "とものこえです",
		kana: "とものこえです",
		romaji: "tomonokoidesu",
	},
	{
		jp: "いとこがいます",
		kana: "いとこがいます",
		romaji: "itokogaimasu",
	},
	{
		jp: "めいとあそぶ",
		kana: "めいとあそぶ",
		romaji: "meitoasonabu",
	},
	{
		jp: "おいがいます",
		kana: "おいがいます",
		romaji: "oigaimasu",
	},
	{
		jp: "あねきです",
		kana: "あねきです",
		romaji: "anekidesu",
	},
	{
		jp: "こんいんします",
		kana: "こんいんします",
		romaji: "konshimasu",
	},
	{
		jp: "あかちゃんです",
		kana: "あかちゃんです",
		romaji: "akachandesu",
	},
	{
		jp: "あたまいい",
		kana: "あたまいい",
		romaji: "atamaiii",
	},
	{
		jp: "ようじがいる",
		kana: "ようじがいる",
		romaji: "youjigairu",
	},
	{
		jp: "そぼがいます",
		kana: "そぼがいます",
		romaji: "sobogaimasu",
	},
	{
		jp: "そふがいます",
		kana: "そふがいます",
		romaji: "sofugaimasu",
	},
	{
		jp: "やもめです",
		kana: "やもめです",
		romaji: "yalmomedesu",
	},
	{
		jp: "ちいさいです",
		kana: "ちいさいです",
		romaji: "chiisaidesu",
	},
	{
		jp: "おおきいです",
		kana: "おおきいです",
		romaji: "ookiidesu",
	},
	{
		jp: "かわいいです",
		kana: "かわいいです",
		romaji: "kawaiidesu",
	},
	{
		jp: "あかちゃん",
		kana: "あかちゃん",
		romaji: "akachan",
	},
	{
		jp: "ようじがいます",
		kana: "ようじがいます",
		romaji: "youjigaimasu",
	},
	{
		jp: "かぞくいっぱい",
		kana: "かぞくいっぱい",
		romaji: "kazokuippai",
	},
	{
		jp: "ともいっぱい",
		kana: "ともいっぱい",
		romaji: "tomoippai",
	},
	{
		jp: "けんかしました",
		kana: "けんかしました",
		romaji: "kenkashmashita",
	},
	{
		jp: "なかなおり",
		kana: "なかなおり",
		romaji: "nakanaori",
	},
	{
		jp: "きずながあります",
		kana: "きずながあります",
		romaji: "kizunagaarimasu",
	},
	{
		jp: "赤いシャツ",
		kana: "あかいしゃつ",
		romaji: "akaishatsu",
	},
	{
		jp: "青いズボン",
		kana: "あおいずぼん",
		romaji: "aoizubon",
	},
	{
		jp: "黒い靴",
		kana: "くろいくつ",
		romaji: "kuroikutsu",
	},
	{
		jp: "白いソックス",
		kana: "しろいそっくす",
		romaji: "shiroisokkusu",
	},
	{
		jp: "新しい服",
		kana: "あたらしいふく",
		romaji: "atarashiifuku",
	},
	{
		jp: "古い帽子",
		kana: "ふるいぼうし",
		romaji: "furuiboushi",
	},
	{
		jp: "大きなコート",
		kana: "おおきなこーと",
		romaji: "ookinakooto",
	},
	{
		jp: "小さいネクタイ",
		kana: "ちいさいねくたい",
		romaji: "chiisainekutai",
	},
	{
		jp: "長いスカート",
		kana: "ながいすかーと",
		romaji: "nagaisukaato",
	},
	{
		jp: "短いパンツ",
		kana: "みじかいぱんつ",
		romaji: "mijikaipanutsu",
	},
	{
		jp: "きれいな服装です",
		kana: "きれいなふくそうです",
		romaji: "kireina fukusoodesu",
	},
	{
		jp: "素敵なデザイン",
		kana: "すてきなでざいん",
		romaji: "sutekina dezain",
	},
	{
		jp: "色合いがいい",
		kana: "いろあいがいい",
		romaji: "iroai gaiii",
	},
	{
		jp: "ファッションセンス",
		kana: "ふぁっしょんせんす",
		romaji: "fasshonsensū",
	},
	{
		jp: "洋服を着ています",
		kana: "ようふくをきています",
		romaji: "youfuku wo kite imasu",
	},
	{
		jp: "似合っている",
		kana: "にあっている",
		romaji: "niate ite iru",
	},
	{
		jp: "スタイルいい",
		kana: "すたいるいい",
		romaji: "sutairuii",
	},
	{
		jp: "背が高い",
		kana: "せがたかい",
		romaji: "segatakafi",
	},
	{
		jp: "髪が長い",
		kana: "かみがながい",
		romaji: "kaminagafi",
	},
	{
		jp: "目が大きい",
		kana: "めがおおきい",
		romaji: "megaookii",
	},
	{
		jp: "ファッション雑誌を読む",
		kana: "ふぁっしょんざっしをよむ",
		romaji: "fashionzasshi wo yomu",
	},
	{
		jp: "新しい靴を買った",
		kana: "あたらしいくつをかった",
		romaji: "atarashii kutsu wo katta",
	},
	{
		jp: "今日のコーディネート",
		kana: "きょうのこーでぃねーと",
		romaji: "kyou no koodinēto",
	},
	{
		jp: "トレンドの洋服",
		kana: "とれんどのようふく",
		romaji: "torendo no youfuku",
	},
	{
		jp: "季節に合った服装",
		kana: "きせつにあったふくそう",
		romaji: "kisetsu ni atta fukusou",
	},
	{
		jp: "デニムが好きです",
		kana: "でにむがすきです",
		romaji: "denimu ga suki desu",
	},
	{
		jp: "ジーンズを履く",
		kana: "じーんずをはく",
		romaji: "jīnzu wo haku",
	},
	{
		jp: "シャツの色がいい",
		kana: "しゃつのいろがいい",
		romaji: "shatsu no iro ga ii",
	},
	{
		jp: "袖が長すぎる",
		kana: "そであながすぎる",
		romaji: "sodeaga sugiru",
	},
	{
		jp: "丈が短い",
		kana: "たけがみじかい",
		romaji: "take ga mijikai",
	},
	{
		jp: "高級な洋服店で買った",
		kana: "こうきゅうなようふくてんでかった",
		romaji: "koukyu na youfuku ten de katta",
	},
	{
		jp: "毎日違う服を着ている",
		kana: "まいにちちがうふくをきている",
		romaji: "mainichi chigau fuku wo kite iru",
	},
	{
		jp: "姉妹で服をシェアする",
		kana: "しまいでふくをしぇあする",
		romaji: "shimai de fuku wo shea suru",
	},
	{
		jp: "お気に入りの洋服がある",
		kana: "おきにいりのようふくがある",
		romaji: "okiniiri no youfuku ga aru",
	},
	{
		jp: "母に似ている",
		kana: "ははににている",
		romaji: "haha ni nite iru",
	},
	{
		jp: "鏡で自分を見る",
		kana: "かがみでじぶんをみる",
		romaji: "kagami de jibun wo miru",
	},
	{
		jp: "靴下の色が合わない",
		kana: "くつしたのいろがあわない",
		romaji: "kutsushita no iro ga awanai",
	},
	{
		jp: "プレゼントで貰った服",
		kana: "ぷれぜんとでもらったふく",
		romaji: "purezento de moratta fuku",
	},
	{
		jp: "流行りの髪型にした",
		kana: "はやりのかみがたにした",
		romaji: "hayari no kamigata ni shita",
	},
	{
		jp: "髪を切ってもらった",
		kana: "かみをきってもらった",
		romaji: "kami wo kitte moratta",
	},
	{
		jp: "ファッションの勉強をしている",
		kana: "ふぁっしょんのべんきょうをしている",
		romaji: "fashion no benkyou wo shite iru",
	},
	{
		jp: "洋服のセールに行く予定",
		kana: "ようふくのせーるにいくよてい",
		romaji: "youfuku no sēru ni iku yotei",
	},
	{
		jp: "自分に似合う色を探している",
		kana: "じぶんににあうるをさがしている",
		romaji: "jibun ni niau iro wo sagashite iru",
	},
	{
		jp: "派手な服装は好きじゃない",
		kana: "はでなふくそうはすきじゃない",
		romaji: "hade na fukusou wa suki ja nai",
	},
	{
		jp: "シンプルなデザインが好き",
		kana: "しんぷるなでざいんがすき",
		romaji: "shinpuru na dezain ga suki",
	},
	{
		jp: "冬の暖かい洋服が必要",
		kana: "ふゆのあたたかいようふくがひつよう",
		romaji: "fuyu no atatakail youfuku ga hitsuyou",
	},
	{
		jp: "夏用の涼しい服装を着る",
		kana: "なつようのすずしいふくそうをきる",
		romaji: "natsu you no suzushii fukusou wo kiru",
	},
	{
		jp: "体型に合わせて選ぶ",
		kana: "たいけいにあわせてえらぶ",
		romaji: "taikei ni awasete erabu",
	},
	{
		jp: "足長く見える靴がほしい",
		kana: "あしながくみえるくつがほしい",
		romaji: "ashinagaku mieru kutsu ga hoshii",
	},
	{
		jp: "顔に合わせたメイクをする",
		kana: "かおにあわせためいくをする",
		romaji: "kao ni awaseta meiku wo suru",
	},
	{
		jp: "紺色が好き",
		kana: "こんいろがすき",
		romaji: "koniro ga suki",
	},
	{
		jp: "グレーの服",
		kana: "ぐれーのふく",
		romaji: "gurei no fuku",
	},
	{
		jp: "柄物が好きです",
		kana: "がらものがすきです",
		romaji: "garamono ga suki desu",
	},
	{
		jp: "無地のシャツ",
		kana: "むじのしゃつ",
		romaji: "muji no shatsu",
	},
	{
		jp: "ボタンが取れた",
		kana: "ぼたんがとれた",
		romaji: "botan ga toreta",
	},
	{
		jp: "ポケットがない",
		kana: "ぽけっとがない",
		romaji: "poketto ga nai",
	},
	{
		jp: "ジップが壊れた",
		kana: "じっぷがこわれた",
		romaji: "jippu ga kowareta",
	},
	{
		jp: "袖をまくる",
		kana: "そであげをまくる",
		romaji: "sodeage wo makuru",
	},
	{
		jp: "ベルトをしめる",
		kana: "べるとをしめる",
		romaji: "beruto wo shimeru",
	},
	{
		jp: "帽子を脱ぐ",
		kana: "ぼうしをぬぐ",
		romaji: "boushi wo nugu",
	},
	{
		jp: "セーター",
		kana: "せーたー",
		romaji: "seitā",
	},
	{
		jp: "ブラウス",
		kana: "ぶらうす",
		romaji: "burausu",
	},
	{
		jp: "チュニック",
		kana: "ちゅにっく",
		romaji: "chunikku",
	},
	{
		jp: "カーディガン",
		kana: "かーでぃがん",
		romaji: "kādigan",
	},
	{
		jp: "ワンピース",
		kana: "わんぴーす",
		romaji: "wanpīsu",
	},
	{
		jp: "パーカー",
		kana: "ぱーかー",
		romaji: "pākā",
	},
	{
		jp: "ジャケット",
		kana: "じゃけっと",
		romaji: "jaketto",
	},
	{
		jp: "スーツ",
		kana: "すーつ",
		romaji: "sūtsu",
	},
	{
		jp: "レインコート",
		kana: "れいんこーと",
		romaji: "reinkooto",
	},
	{
		jp: "ワイシャツ",
		kana: "わいしゃつ",
		romaji: "waishatsu",
	},
	{
		jp: "スカーフ",
		kana: "すかーふ",
		romaji: "sukāfu",
	},
	{
		jp: "手袋",
		kana: "てぶくろ",
		romaji: "tebukuro",
	},
	{
		jp: "マフラー",
		kana: "まふらー",
		romaji: "mafurā",
	},
	{
		jp: "帯",
		kana: "おび",
		romaji: "obi",
	},
	{
		jp: "バッグ",
		kana: "ばっぐ",
		romaji: "baggu",
	},
	{
		jp: "ネックレス",
		kana: "ねっくれす",
		romaji: "nekkuresu",
	},
	{
		jp: "ブレスレット",
		kana: "ぶれすれっと",
		romaji: "buresureto",
	},
	{
		jp: "イヤリング",
		kana: "いやりんぐ",
		romaji: "iyaringu",
	},
	{
		jp: "指輪",
		kana: "ゆびわ",
		romaji: "yubiwa",
	},
	{
		jp: "腕時計",
		kana: "うでどけい",
		romaji: "udedokei",
	},
	{
		jp: "スニーカー",
		kana: "すにーかー",
		romaji: "sunīkā",
	},
	{
		jp: "ハイヒール",
		kana: "はいひーる",
		romaji: "haihīru",
	},
	{
		jp: "サンダル",
		kana: "さんだる",
		romaji: "sandaru",
	},
	{
		jp: "ブーツ",
		kana: "ぶーつ",
		romaji: "būtsu",
	},
	{
		jp: "ローファー",
		kana: "ろーふぁー",
		romaji: "rōfā",
	},
	{
		jp: "ビーチサンダル",
		kana: "びーちさんだる",
		romaji: "bīchisandaru",
	},
	{
		jp: "パンプス",
		kana: "ぱんぷす",
		romaji: "panpusu",
	},
	{
		jp: "スリッパ",
		kana: "すりっぱ",
		romaji: "surippa",
	},
	{
		jp: "長靴",
		kana: "ながぐつ",
		romaji: "nagagutsu",
	},
	{
		jp: "運動靴",
		kana: "うんどうぐつ",
		romaji: "undougutsu",
	},
	{
		jp: "スリムな体型",
		kana: "すりむなたいけい",
		romaji: "surimu na taikei",
	},
	{
		jp: "太い眉毛",
		kana: "ふといまゆげ",
		romaji: "futoi mayuge",
	},
	{
		jp: "細い眉毛",
		kana: "ほそいまゆげ",
		romaji: "hosoi mayuge",
	},
	{
		jp: "濃い目の色",
		kana: "こいめのいろ",
		romaji: "koi me no iro",
	},
	{
		jp: "明るい肌",
		kana: "あかるいはだ",
		romaji: "akarui hada",
	},
	{
		jp: "色白",
		kana: "いろしろ",
		romaji: "iroshiro",
	},
	{
		jp: "日焼け",
		kana: "ひやけ",
		romaji: "hiyake",
	},
	{
		jp: "そばかす",
		kana: "そばかす",
		romaji: "sobakasu",
	},
	{
		jp: "ほくろ",
		kana: "ほくろ",
		romaji: "hokuro",
	},
	{
		jp: "唇が厚い",
		kana: "くちびるがあつい",
		romaji: "kuchibiru ga atsui",
	},
	{
		jp: "ショートカット",
		kana: "しょーときゃっと",
		romaji: "shōtokatto",
	},
	{
		jp: "ロングヘア",
		kana: "ろんぐへあ",
		romaji: "ronguhea",
	},
	{
		jp: "パーマをかける",
		kana: "ぱーまをかける",
		romaji: "pāma wo kakeru",
	},
	{
		jp: "髪を染める",
		kana: "かみをそめる",
		romaji: "kami wo someru",
	},
	{
		jp: "茶髪",
		kana: "ちゃぱつ",
		romaji: "chapatsu",
	},
	{
		jp: "黒髪",
		kana: "くろかみ",
		romaji: "kurokami",
	},
	{
		jp: "金髪",
		kana: "きんぱつ",
		romaji: "kinpatsu",
	},
	{
		jp: "赤い髪",
		kana: "あかいかみ",
		romaji: "akaikami",
	},
	{
		jp: "ポニーテール",
		kana: "ぽにーてーる",
		romaji: "ponītēru",
	},
	{
		jp: "お団子ヘア",
		kana: "おだんごへあ",
		romaji: "odango hea",
	},
	{
		jp: "着替える",
		kana: "きかえる",
		romaji: "kikaeru",
	},
	{
		jp: "服を選ぶ",
		kana: "ふくをえらぶ",
		romaji: "fuku wo erabu",
	},
	{
		jp: "衣装を整える",
		kana: "いしょうをととのえる",
		romaji: "ishou wo totonoeru",
	},
	{
		jp: "試着する",
		kana: "しちゃくする",
		romaji: "shichaku suru",
	},
	{
		jp: "洗濯する",
		kana: "せんたくする",
		romaji: "sentaku suru",
	},
	{
		jp: "アイロンをかける",
		kana: "あいろんをかける",
		romaji: "airon wo kakeru",
	},
	{
		jp: "ファッションショー",
		kana: "ふぁっしょんしょー",
		romaji: "fashion shō",
	},
	{
		jp: "モデル",
		kana: "もでる",
		romaji: "moderu",
	},
	{
		jp: "スタイリスト",
		kana: "すたいりすと",
		romaji: "sutairisuto",
	},
	{
		jp: "デザイナー",
		kana: "でざいなー",
		romaji: "dezainā",
	},
	{
		jp: "綿素材",
		kana: "わたそざい",
		romaji: "watasozai",
	},
	{
		jp: "ウール",
		kana: "うーる",
		romaji: "ūru",
	},
	{
		jp: "シルク",
		kana: "しるく",
		romaji: "shiruku",
	},
	{
		jp: "ポリエステル",
		kana: "ぽりえすてる",
		romaji: "poriesteruu",
	},
	{
		jp: "デニム生地",
		kana: "でにむきじ",
		romaji: "denimu kiji",
	},
	{
		jp: "レース",
		kana: "れーす",
		romaji: "rēsu",
	},
	{
		jp: "麻",
		kana: "あさ",
		romaji: "asa",
	},
	{
		jp: "ベルベット",
		kana: "べるべっと",
		romaji: "berubetto",
	},
	{
		jp: "革製品",
		kana: "かわせいひん",
		romaji: "kawaseihin",
	},
	{
		jp: "スウェード",
		kana: "すうぇーど",
		romaji: "suuēdo",
	},
	{
		jp: "チェック柄",
		kana: "ちぇっくがら",
		romaji: "chekku gara",
	},
	{
		jp: "ストライプ",
		kana: "すとらいぷ",
		romaji: "sutoraippu",
	},
	{
		jp: "ドット柄",
		kana: "どっとがら",
		romaji: "dotto gara",
	},
	{
		jp: "花柄",
		kana: "はながら",
		romaji: "hanagara",
	},
	{
		jp: "迷彩模様",
		kana: "めいさいもよう",
		romaji: "meisai moyou",
	},
	{
		jp: "グラデーション",
		kana: "ぐらでーしょん",
		romaji: "guradēshon",
	},
	{
		jp: "濃い色",
		kana: "こいいろ",
		romaji: "koiiro",
	},
	{
		jp: "薄い色",
		kana: "うすいいろ",
		romaji: "usuiiro",
	},
	{
		jp: "原色",
		kana: "げんしょく",
		romaji: "genshoku",
	},
	{
		jp: "パステルカラー",
		kana: "ぱすてるから",
		romaji: "pasuteru kara",
	},
	{
		jp: "春用の服",
		kana: "はるようのふく",
		romaji: "haru you no fuku",
	},
	{
		jp: "夏用の服",
		kana: "なつようのふく",
		romaji: "natsu you no fuku",
	},
	{
		jp: "秋用の服",
		kana: "あきようのふく",
		romaji: "aki you no fuku",
	},
	{
		jp: "冬用の服",
		kana: "ふゆようのふく",
		romaji: "fuyu you no fuku",
	},
	{
		jp: "半袖シャツ",
		kana: "はんそでしゃつ",
		romaji: "hansode shatsu",
	},
	{
		jp: "長袖",
		kana: "ながそで",
		romaji: "nagasode",
	},
	{
		jp: "タンクトップ",
		kana: "たんくとっぷ",
		romaji: "tankutoppu",
	},
	{
		jp: "ノースリーブ",
		kana: "のーすりーぶ",
		romaji: "nōsurību",
	},
	{
		jp: "スキニーパンツ",
		kana: "すきにーぱんつ",
		romaji: "sukinī pantsu",
	},
	{
		jp: "ワイドパンツ",
		kana: "わいどぱんつ",
		romaji: "waido pantsu",
	},
	{
		jp: "顔立ちがいい",
		kana: "かおだちがいい",
		romaji: "kaodachi ga ii",
	},
	{
		jp: "雰囲気がある",
		kana: "ふんいきがある",
		romaji: "fun'iki ga aru",
	},
	{
		jp: "優雅な仕草",
		kana: "ゆうがなしぐさ",
		romaji: "yuuga na shigusa",
	},
	{
		jp: "姿勢が悪い",
		kana: "しせいがわるい",
		romaji: "shisei ga warui",
	},
	{
		jp: "猫背",
		kana: "ねこぜ",
		romaji: "nekoze",
	},
	{
		jp: "背中が丸い",
		kana: "せなかがまるい",
		romaji: "senaka ga marui",
	},
	{
		jp: "歩き方が上品",
		kana: "あるきかたがじょうひん",
		romaji: "arukikata ga jouhin",
	},
	{
		jp: "足の形",
		kana: "あしのかたち",
		romaji: "ashi no katachi",
	},
	{
		jp: "手が大きい",
		kana: "てがおおきい",
		romaji: "te ga ookii",
	},
	{
		jp: "手が小さい",
		kana: "てがちいさい",
		romaji: "te ga chiisai",
	},
	{
		jp: "化粧をする",
		kana: "けしょうをする",
		romaji: "keshou wo suru",
	},
	{
		jp: "髪をセットする",
		kana: "かみをせっとする",
		romaji: "kami wo setto suru",
	},
	{
		jp: "爪を切る",
		kana: "つめをきる",
		romaji: "tsume wo kiru",
	},
	{
		jp: "肌をケアする",
		kana: "はだをけあする",
		romaji: "hada wo kea suru",
	},
	{
		jp: "シェーバー",
		kana: "しぇーばー",
		romaji: "shēbā",
	},
	{
		jp: "美容院",
		kana: "びようういん",
		romaji: "biyou in",
	},
	{
		jp: "スパ",
		kana: "すぱ",
		romaji: "supa",
	},
	{
		jp: "ネイルサロン",
		kana: "ねいるさろん",
		romaji: "neiru saron",
	},
	{
		jp: "マニキュア",
		kana: "まにきゅあ",
		romaji: "manikyu a",
	},
	{
		jp: "ペディキュア",
		kana: "ぺでぃきゅあ",
		romaji: "pedi kiyu a",
	},
	{
		jp: "筋肉質",
		kana: "きんにくしつ",
		romaji: "kinnikushitsu",
	},
	{
		jp: "ぽっちゃり",
		kana: "ぽっちゃり",
		romaji: "potchari",
	},
	{
		jp: "華奢",
		kana: "きゃしゃ",
		romaji: "kyasha",
	},
	{
		jp: "グラマー",
		kana: "ぐらまー",
		romaji: "guramā",
	},
	{
		jp: "がっしり",
		kana: "がっしり",
		romaji: "gassiri",
	},
	{
		jp: "すらっとしている",
		kana: "すらっとしている",
		romaji: "surato shite iru",
	},
	{
		jp: "ふっくらしている",
		kana: "ふっくらしている",
		romaji: "fukuura shite iru",
	},
	{
		jp: "引き締まっている",
		kana: "ひきしまっている",
		romaji: "hikishimate iru",
	},
	{
		jp: "肩幅が広い",
		kana: "かたはばがひろい",
		romaji: "katahaba ga hiroi",
	},
	{
		jp: "腰が細い",
		kana: "こしがほそい",
		romaji: "koshi ga hosoi",
	},
	{
		jp: "エレガント",
		kana: "えれがんと",
		romaji: "ereganto",
	},
	{
		jp: "カジュアル",
		kana: "かじゅある",
		romaji: "kajuaru",
	},
	{
		jp: "ストリート系",
		kana: "すとりーとけい",
		romaji: "sutorīto kei",
	},
	{
		jp: "ロック系",
		kana: "ろっくけい",
		romaji: "rokku kei",
	},
	{
		jp: "ゴシック系",
		kana: "ごしっくけい",
		romaji: "goshikku kei",
	},
	{
		jp: "サイバーパンク",
		kana: "さいばーぱんく",
		romaji: "saibā panku",
	},
	{
		jp: "ミニマリスト",
		kana: "みにまりすと",
		romaji: "minimarisuto",
	},
	{
		jp: "マキシマリスト",
		kana: "まきしまりすと",
		romaji: "makishimarisuto",
	},
	{
		jp: "ボーホースタイル",
		kana: "ぼーほーすたいる",
		romaji: "bōhō sutairu",
	},
	{
		jp: "プレッピー",
		kana: "ぷれっぴー",
		romaji: "pureppi",
	},
	{
		jp: "これが似合う",
		kana: "これがにあう",
		romaji: "kore ga niau",
	},
	{
		jp: "それはダメ",
		kana: "それはだめ",
		romaji: "sore wa dame",
	},
	{
		jp: "もう一度着てみて",
		kana: "もういちどきてみて",
		romaji: "mouichido kite mite",
	},
	{
		jp: "値段が高い",
		kana: "ねだんがたかい",
		romaji: "nedan ga takai",
	},
	{
		jp: "値段が安い",
		kana: "ねだんがやすい",
		romaji: "nedan ga yasui",
	},
	{
		jp: "セールで買った",
		kana: "せーるでかった",
		romaji: "sēru de katta",
	},
	{
		jp: "定価で買う",
		kana: "ていかでかう",
		romaji: "teika de kau",
	},
	{
		jp: "ブランド品",
		kana: "ぶらんどひん",
		romaji: "burando hin",
	},
	{
		jp: "ノーブランド",
		kana: "のーぶらんど",
		romaji: "nō burando",
	},
	{
		jp: "オーダーメイド",
		kana: "おーだーめいど",
		romaji: "ōdā meido",
	},
	{
		jp: "お金がない",
		kana: "おかねがない",
		romaji: "okaneganai",
	},
	{
		jp: "買い物",
		kana: "かいもの",
		romaji: "kaimono",
	},
	{
		jp: "千円",
		kana: "せんえん",
		romaji: "senen",
	},
	{
		jp: "万円",
		kana: "まんえん",
		romaji: "manen",
	},
	{
		jp: "売上",
		kana: "うりあげ",
		romaji: "uriage",
	},
	{
		jp: "利益",
		kana: "りえき",
		romaji: "rieki",
	},
	{
		jp: "損失",
		kana: "そんしつ",
		romaji: "sonshitsu",
	},
	{
		jp: "家計簿をつけている",
		kana: "かけいぼをつけている",
		romaji: "kakeibowotsukeiteiru",
	},
	{
		jp: "給料を貰った",
		kana: "きゅうりょうをもらった",
		romaji: "kyuuryouwomoratta",
	},
	{
		jp: "貯金をしたい",
		kana: "ちょきんをしたい",
		romaji: "chokinwoshitai",
	},
	{
		jp: "銀行口座がある",
		kana: "ぎんこうこうざがある",
		romaji: "ginkoukoouzagaaru",
	},
	{
		jp: "電話代を払った",
		kana: "でんわだいをはらった",
		romaji: "denwadaiwohara",
	},
	{
		jp: "家賃が高い",
		kana: "やちんがたかい",
		romaji: "yachingatakai",
	},
	{
		jp: "税金を払う",
		kana: "ぜいきんをはらう",
		romaji: "zeikinwoharau",
	},
	{
		jp: "保険に入った",
		kana: "ほけんにはいった",
		romaji: "hokennihaitta",
	},
	{
		jp: "株を買いたい",
		kana: "かぶをかいたい",
		romaji: "kabuwokaitai",
	},
	{
		jp: "毎日の生活費をチェック",
		kana: "まいにちのせいかつひをちぇっく",
		romaji: "mainichonoseikatsuhiwochekku",
	},
	{
		jp: "将来のために貯金",
		kana: "しょうらいのためにちょきん",
		romaji: "shourainotamenichokin",
	},
	{
		jp: "給与明細を見た",
		kana: "きゅうよめいさいをみた",
		romaji: "kyuuyomeisaiwomita",
	},
	{
		jp: "経済状況が悪化",
		kana: "けいざいじょうきょうがあっか",
		romaji: "keizaijoukyougakka",
	},
	{
		jp: "投資で儲けたい",
		kana: "とうしでもうけたい",
		romaji: "toushidemouketai",
	},
	{
		jp: "月々の支出が増えた",
		kana: "つきづきのししゅつがふえた",
		romaji: "tsukidukinoshishutsugafueta",
	},
	{
		jp: "ボーナスが減らされた",
		kana: "ぼーなすがへらされた",
		romaji: "boonasugaherasareta",
	},
	{
		jp: "カードの請求が来た",
		kana: "かーどのせいきゅうがきた",
		romaji: "kadonoseikyuugakita",
	},
	{
		jp: "お小遣いをもらう",
		kana: "おこづかいをもらう",
		romaji: "okodukaiwomorau",
	},
	{
		jp: "家計を見直したい",
		kana: "かけいをみなおしたい",
		romaji: "kakaiwominaoshitai",
	},
	{
		jp: "値引き",
		kana: "ねびき",
		romaji: "nebiki",
	},
	{
		jp: "貯蓄",
		kana: "ちょちく",
		romaji: "chochiku",
	},
	{
		jp: "節約",
		kana: "せつやく",
		romaji: "setsuyaku",
	},
	{
		jp: "浪費",
		kana: "ろうひ",
		romaji: "rouhi",
	},
	{
		jp: "予算",
		kana: "よさん",
		romaji: "yosan",
	},
	{
		jp: "決算",
		kana: "けっさん",
		romaji: "kessan",
	},
	{
		jp: "収入",
		kana: "しゅうにゅう",
		romaji: "shuunyuu",
	},
	{
		jp: "支出",
		kana: "ししゅつ",
		romaji: "shishutsu",
	},
	{
		jp: "時給",
		kana: "じきゅう",
		romaji: "jikyuu",
	},
	{
		jp: "月給",
		kana: "げっきゅう",
		romaji: "gekkyuu",
	},
	{
		jp: "年俸",
		kana: "ねんぽう",
		romaji: "nenpou",
	},
	{
		jp: "昇給",
		kana: "しょうきゅう",
		romaji: "shoukyuu",
	},
	{
		jp: "昇進",
		kana: "しょうしん",
		romaji: "shoushin",
	},
	{
		jp: "給与",
		kana: "きゅうよ",
		romaji: "kyuuyo",
	},
	{
		jp: "賞与",
		kana: "しょうよ",
		romaji: "shouyo",
	},
	{
		jp: "ボーナス",
		kana: "ぼーなす",
		romaji: "boonasu",
	},
	{
		jp: "残業代",
		kana: "ざんぎょうだい",
		romaji: "zangyoudai",
	},
	{
		jp: "副業",
		kana: "ふくぎょう",
		romaji: "fukugyou",
	},
	{
		jp: "ガス代",
		kana: "がすだい",
		romaji: "gasudai",
	},
	{
		jp: "水道代",
		kana: "すいどうだい",
		romaji: "suaidoudai",
	},
	{
		jp: "電気代",
		kana: "でんきだい",
		romaji: "denkidai",
	},
	{
		jp: "携帯代",
		kana: "けいたいだい",
		romaji: "keitaidai",
	},
	{
		jp: "保険料",
		kana: "ほけんりょう",
		romaji: "hokenryou",
	},
	{
		jp: "家賃",
		kana: "やちん",
		romaji: "yachin",
	},
	{
		jp: "食費",
		kana: "しょくひ",
		romaji: "shokuhi",
	},
	{
		jp: "銀行",
		kana: "ぎんこう",
		romaji: "ginkou",
	},
	{
		jp: "口座",
		kana: "こうざ",
		romaji: "kouza",
	},
	{
		jp: "通帳",
		kana: "つうちょう",
		romaji: "tuuchou",
	},
	{
		jp: "振込",
		kana: "ふりこみ",
		romaji: "furikomi",
	},
	{
		jp: "送金",
		kana: "そうきん",
		romaji: "soukin",
	},
	{
		jp: "融資",
		kana: "ゆうし",
		romaji: "yuushi",
	},
	{
		jp: "ローン",
		kana: "ろーん",
		romaji: "ron",
	},
	{
		jp: "利息",
		kana: "りそく",
		romaji: "risoku",
	},
	{
		jp: "元本",
		kana: "がんぽん",
		romaji: "ganpon",
	},
	{
		jp: "金利",
		kana: "きんり",
		romaji: "kinri",
	},
	{
		jp: "投資",
		kana: "とうし",
		romaji: "toushi",
	},
	{
		jp: "株式",
		kana: "かぶしき",
		romaji: "kabushiki",
	},
	{
		jp: "債券",
		kana: "さいけん",
		romaji: "saiken",
	},
	{
		jp: "ファンド",
		kana: "ふぁんど",
		romaji: "fando",
	},
	{
		jp: "配当",
		kana: "はいとう",
		romaji: "haitou",
	},
	{
		jp: "利益確定",
		kana: "りえきかくてい",
		romaji: "riekikakutei",
	},
	{
		jp: "損切り",
		kana: "そんぎり",
		romaji: "songiri",
	},
	{
		jp: "ポートフォリオ",
		kana: "ぽーとふぉりお",
		romaji: "potoforio",
	},
	{
		jp: "分散投資",
		kana: "ぶんさんとうし",
		romaji: "bunsantoushi",
	},
	{
		jp: "リスク",
		kana: "りすく",
		romaji: "risuku",
	},
	{
		jp: "百貨店",
		kana: "ひゃっかてん",
		romaji: "hyakkaten",
	},
	{
		jp: "バーゲン",
		kana: "ばーげん",
		romaji: "bagen",
	},
	{
		jp: "キャンペーン",
		kana: "きゃんぺーん",
		romaji: "kyanpen",
	},
	{
		jp: "領収書",
		kana: "りょうしゅうしょ",
		romaji: "ryoushuusho",
	},
	{
		jp: "レシート",
		kana: "れしーと",
		romaji: "reshito",
	},
	{
		jp: "税務署",
		kana: "ぜいむしょ",
		romaji: "zeimusho",
	},
	{
		jp: "納税",
		kana: "のうぜい",
		romaji: "nouzei",
	},
	{
		jp: "還付金",
		kana: "かんぷきん",
		romaji: "kanpukin",
	},
	{
		jp: "控除",
		kana: "こうじょ",
		romaji: "koujo",
	},
	{
		jp: "申告",
		kana: "しんこく",
		romaji: "shinkoku",
	},
	{
		jp: "確定申告",
		kana: "かくていしんこく",
		romaji: "kakuteishinkoku",
	},
	{
		jp: "源泉徴収",
		kana: "げんせんちょうしゅう",
		romaji: "gensenchousuu",
	},
	{
		jp: "消費税",
		kana: "しょうひぜい",
		romaji: "shouhizei",
	},
	{
		jp: "所得税",
		kana: "しょとくぜい",
		romaji: "shotokuzei",
	},
	{
		jp: "住民税",
		kana: "じゅうみんぜい",
		romaji: "juuminzei",
	},
	{
		jp: "景気",
		kana: "けいき",
		romaji: "keiki",
	},
	{
		jp: "不況",
		kana: "ふきょう",
		romaji: "fukyou",
	},
	{
		jp: "好況",
		kana: "こうきょう",
		romaji: "koukyou",
	},
	{
		jp: "インフレ",
		kana: "いんふれ",
		romaji: "infure",
	},
	{
		jp: "デフレ",
		kana: "でふれ",
		romaji: "defure",
	},
	{
		jp: "雇用",
		kana: "こよう",
		romaji: "koyou",
	},
	{
		jp: "失業",
		kana: "しつぎょう",
		romaji: "shitsugyou",
	},
	{
		jp: "失業保険",
		kana: "しつぎょうほけん",
		romaji: "shitsugyouhoken",
	},
	{
		jp: "経済成長",
		kana: "けいざいせいちょう",
		romaji: "keizaiseichou",
	},
	{
		jp: "割り勘",
		kana: "わりかん",
		romaji: "warikan",
	},
	{
		jp: "奢る",
		kana: "おごる",
		romaji: "ogoru",
	},
	{
		jp: "借りる",
		kana: "かりる",
		romaji: "kariru",
	},
	{
		jp: "返す",
		kana: "かえす",
		romaji: "kaesu",
	},
	{
		jp: "貸す",
		kana: "かす",
		romaji: "kasu",
	},
	{
		jp: "無料",
		kana: "むりょう",
		romaji: "muryou",
	},
	{
		jp: "有料",
		kana: "ゆうりょう",
		romaji: "yuuryou",
	},
	{
		jp: "値上げ",
		kana: "ねあげ",
		romaji: "neage",
	},
	{
		jp: "値下げ",
		kana: "ねさげ",
		romaji: "nesage",
	},
	{
		jp: "返金",
		kana: "へんきん",
		romaji: "henkin",
	},
	{
		jp: "お弁当を作る",
		kana: "おべんとうをつくる",
		romaji: "obentowotsukuru",
	},
	{
		jp: "外食は高い",
		kana: "がいしょくはたかい",
		romaji: "gaishokuhatakai",
	},
	{
		jp: "自炊の方が安い",
		kana: "じすいのほうがやすい",
		romaji: "jisuinohouagayasui",
	},
	{
		jp: "エアコンをつけない",
		kana: "えあこんをつけない",
		romaji: "eakonwotsukenai",
	},
	{
		jp: "シャワーは短い",
		kana: "しゃわーはみじかい",
		romaji: "shawhamijakai",
	},
	{
		jp: "服を買わない",
		kana: "ふくをかわない",
		romaji: "fukuwokawanai",
	},
	{
		jp: "金銭",
		kana: "きんせん",
		romaji: "kinsen",
	},
	{
		jp: "金銭管理",
		kana: "きんせんかんり",
		romaji: "kinsenkanri",
	},
	{
		jp: "仮想通貨",
		kana: "かそうつうか",
		romaji: "kasoutuuka",
	},
	{
		jp: "ビットコイン",
		kana: "びっとこいん",
		romaji: "bittokoin",
	},
	{
		jp: "両替",
		kana: "りょうがえ",
		romaji: "ryougae",
	},
	{
		jp: "外貨",
		kana: "がいか",
		romaji: "gaika",
	},
	{
		jp: "ドル",
		kana: "どる",
		romaji: "doru",
	},
	{
		jp: "ユーロ",
		kana: "ゆーろ",
		romaji: "yuro",
	},
	{
		jp: "美容院代",
		kana: "びようういんだい",
		romaji: "biyouuindai",
	},
	{
		jp: "洋服代",
		kana: "ようふくだい",
		romaji: "youfukudai",
	},
	{
		jp: "靴",
		kana: "くつ",
		romaji: "kutsu",
	},
	{
		jp: "カバン",
		kana: "かばん",
		romaji: "kaban",
	},
	{
		jp: "アクセサリー",
		kana: "あくせさりー",
		romaji: "akusesari",
	},
	{
		jp: "ジム会費",
		kana: "じむかいひ",
		romaji: "jimukaihi",
	},
	{
		jp: "本代",
		kana: "ほんだい",
		romaji: "hondai",
	},
	{
		jp: "経費削減",
		kana: "けいひさくげん",
		romaji: "keihisakugen",
	},
	{
		jp: "赤字経営",
		kana: "あかじけいえい",
		romaji: "akajikeiei",
	},
	{
		jp: "黒字決算",
		kana: "くろじけっさん",
		romaji: "kurojikessan",
	},
	{
		jp: "財務報告",
		kana: "ざいむほうこく",
		romaji: "zaimuhoukoku",
	},
	{
		jp: "会計監査",
		kana: "かいけいかんさ",
		romaji: "kaikeikansa",
	},
	{
		jp: "粉飾決算",
		kana: "こしょくけっさん",
		romaji: "koshokukessan",
	},
	{
		jp: "脱税",
		kana: "だつぜい",
		romaji: "datsuzei",
	},
	{
		jp: "報酬金",
		kana: "ほうしゅうきん",
		romaji: "houshuukin",
	},
	{
		jp: "給与明細書",
		kana: "きゅうよめいさいしょ",
		romaji: "kyuuyomeisaisho",
	},
	{
		jp: "住宅ローン",
		kana: "じゅうたくろーん",
		romaji: "juutakuron",
	},
	{
		jp: "教育ローン",
		kana: "きょういくろーん",
		romaji: "kyouikuron",
	},
	{
		jp: "借金",
		kana: "しゃっきん",
		romaji: "shakkin",
	},
	{
		jp: "多重債務",
		kana: "たじゅうさいむ",
		romaji: "tajuusaimu",
	},
	{
		jp: "債務整理",
		kana: "さいむせいり",
		romaji: "saimuseiri",
	},
	{
		jp: "破産",
		kana: "はさん",
		romaji: "hasan",
	},
	{
		jp: "自己破産",
		kana: "じこはさん",
		romaji: "jikohasan",
	},
	{
		jp: "給付金",
		kana: "きゅうふきん",
		romaji: "kyuufukin",
	},
	{
		jp: "補助金",
		kana: "ほじょきん",
		romaji: "hojokin",
	},
	{
		jp: "助成金",
		kana: "じょせいきん",
		romaji: "joseikin",
	},
	{
		jp: "定期預金",
		kana: "ていきよきん",
		romaji: "teikiyokin",
	},
	{
		jp: "普通預金",
		kana: "ふつうよきん",
		romaji: "futsuuyokin",
	},
	{
		jp: "貯蓄型保険",
		kana: "ちょちくがたほけん",
		romaji: "chochikugatahoken",
	},
	{
		jp: "掛け捨て保険",
		kana: "かけすてほけん",
		romaji: "kakesutehoken",
	},
	{
		jp: "生命保険",
		kana: "せいめいほけん",
		romaji: "seimeihoken",
	},
	{
		jp: "損害保険",
		kana: "そんがいほけん",
		romaji: "songaihoken",
	},
	{
		jp: "自動車保険",
		kana: "じどうしゃほけん",
		romaji: "jidoushahoken",
	},
	{
		jp: "火災保険",
		kana: "かさいほけん",
		romaji: "kasaihoken",
	},
	{
		jp: "医療保険",
		kana: "いりょうほけん",
		romaji: "iryouhoken",
	},
	{
		jp: "介護保険",
		kana: "かいごほけん",
		romaji: "kaigohoken",
	},
	{
		jp: "年金受給",
		kana: "ねんきんじゅきゅう",
		romaji: "nenkinjukyuu",
	},
	{
		jp: "老後資金",
		kana: "ろうごしきん",
		romaji: "rougoshikin",
	},
	{
		jp: "相続税",
		kana: "そうぞくぜい",
		romaji: "souzokuzei",
	},
	{
		jp: "遺産分割",
		kana: "いさんぶんかつ",
		romaji: "isanbunkatsu",
	},
	{
		jp: "生活保護",
		kana: "せいかつほご",
		romaji: "seikatsuhogo",
	},
	{
		jp: "雇用保険加入",
		kana: "こようほけんかにゅう",
		romaji: "koyouhokenkanyuu",
	},
	{
		jp: "給与振込",
		kana: "きゅうよふりこみ",
		romaji: "kyuuyofurikomi",
	},
	{
		jp: "月額料金",
		kana: "げつがくりょうきん",
		romaji: "getsugakuryoukin",
	},
	{
		jp: "光熱費",
		kana: "こうねつひ",
		romaji: "kounetsuhi",
	},
	{
		jp: "通信費",
		kana: "つうしんひ",
		romaji: "tuushinhi",
	},
	{
		jp: "交際費",
		kana: "こうさいひ",
		romaji: "kousaihi",
	},
	{
		jp: "医療費",
		kana: "いりょうひ",
		romaji: "iryouhi",
	},
	{
		jp: "教育費",
		kana: "きょういくひ",
		romaji: "kyouikuhi",
	},
	{
		jp: "娯楽費",
		kana: "ごらくひ",
		romaji: "gorakuhi",
	},
	{
		jp: "交通費",
		kana: "こうつうひ",
		romaji: "koutsuuhi",
	},
	{
		jp: "衣料費",
		kana: "いりょうひ",
		romaji: "iryouhi",
	},
	{
		jp: "日用品代",
		kana: "にちようひんだい",
		romaji: "nichiyouhindai",
	},
	{
		jp: "ペット代",
		kana: "ぺっとだい",
		romaji: "pettodai",
	},
	{
		jp: "社会保険",
		kana: "しゃかいほけん",
		romaji: "shakaihoken",
	},
	{
		jp: "厚生年金",
		kana: "こうせいねんきん",
		romaji: "kouseinenkin",
	},
	{
		jp: "労災保険",
		kana: "ろうさいほけん",
		romaji: "rousaihoken",
	},
	{
		jp: "雇用契約",
		kana: "こようけいやく",
		romaji: "koyoukeiyaku",
	},
	{
		jp: "試用期間",
		kana: "しようきかん",
		romaji: "shiyoukikan",
	},
	{
		jp: "給料交渉",
		kana: "きゅうりょうこうしょう",
		romaji: "kyuuryoukoushou",
	},
	{
		jp: "昇進試験",
		kana: "しょうしんしけん",
		romaji: "shoushinshiken",
	},
	{
		jp: "転職",
		kana: "てんしょく",
		romaji: "tenshoku",
	},
	{
		jp: "退職金",
		kana: "たいしょくきん",
		romaji: "taishokukin",
	},
	{
		jp: "失業給付",
		kana: "しつぎょうきゅうふ",
		romaji: "shitsugyoukyuufu",
	},
	{
		jp: "企業年金",
		kana: "きぎょうねんきん",
		romaji: "kigyounenkin",
	},
	{
		jp: "確定拠出年金",
		kana: "かくていきょしゅつねんきん",
		romaji: "kakuteikyoshutunenkin",
	},
	{
		jp: "確定給付年金",
		kana: "かくていきゅうふねんきん",
		romaji: "kakuteikyuufunenkin",
	},
	{
		jp: "iDeCo",
		kana: "あいでこ",
		romaji: "aideko",
	},
	{
		jp: "NISA",
		kana: "にーさ",
		romaji: "nisa",
	},
	{
		jp: "つみたてNISA",
		kana: "つみたてにーさ",
		romaji: "tsumitatenisa",
	},
	{
		jp: "米が好きです",
		kana: "こめがすきです",
		romaji: "komehasukidesu",
	},
	{
		jp: "今日の昼ご飯",
		kana: "きょうのひるごはん",
		romaji: "kyounohirugohan",
	},
	{
		jp: "水を飲みます",
		kana: "みずをのみます",
		romaji: "mizuwonom imasu",
	},
	{
		jp: "パンが美味しい",
		kana: "ぱんがおいしい",
		romaji: "pangaoishii",
	},
	{
		jp: "卵を焼きます",
		kana: "たまごをやきます",
		romaji: "tamagowoyakimasu",
	},
	{
		jp: "肉を切ります",
		kana: "にくをきります",
		romaji: "nikuwokirimasu",
	},
	{
		jp: "味が濃いです",
		kana: "あじがこいです",
		romaji: "ajiakuoidesu",
	},
	{
		jp: "甘くて美味しい",
		kana: "あまくておいしい",
		romaji: "amakueteoisii",
	},
	{
		jp: "辛い料理です",
		kana: "からいりょうりです",
		romaji: "karairyouridata",
	},
	{
		jp: "朝食を食べました",
		kana: "ちょうしょくをたべました",
		romaji: "choushokuwtabemashita",
	},
	{
		jp: "美味しいカレーです",
		kana: "おいしいかれーです",
		romaji: "oishiikarēdesu",
	},
	{
		jp: "野菜が沢山あります",
		kana: "やさいがたくさんあります",
		romaji: "yasaigatakusannarimasu",
	},
	{
		jp: "ご飯が温かいです",
		kana: "ごはんがあたたかいです",
		romaji: "gohangatatakaidata",
	},
	{
		jp: "寿司を食べたいです",
		kana: "すしをたべたいです",
		romaji: "sushiwotabetaidata",
	},
	{
		jp: "天ぷらが好きです",
		kana: "てんぷらがすきです",
		romaji: "tenpuragasukidesu",
	},
	{
		jp: "魚は栄養がいい",
		kana: "さかなはえいようがいい",
		romaji: "sakanahaeiygougaiyi",
	},
	{
		jp: "コーヒーが冷めた",
		kana: "こーひーがさめた",
		romaji: "koーhīgasameta",
	},
	{
		jp: "お米は主食です",
		kana: "おこめはしゅしょくです",
		romaji: "okomehashushokudesu",
	},
	{
		jp: "スパゲッティを食べる",
		kana: "すぱげってぃをたべる",
		romaji: "supagetexwotaberu",
	},
	{
		jp: "焼き鳥は美味しい",
		kana: "やきとりはおいしい",
		romaji: "yakitorihaoisii",
	},
	{
		jp: "ステーキを焼く",
		kana: "すてーきをやく",
		romaji: "suteーkiwoyaku",
	},
	{
		jp: "サラダを作ります",
		kana: "さらだをつくります",
		romaji: "saradawotukurimasu",
	},
	{
		jp: "トマトが赤いです",
		kana: "ともとがあかいです",
		romaji: "tomatogaakaidesu",
	},
	{
		jp: "チーズが好きです",
		kana: "ちーずがすきです",
		romaji: "chīzugasukidesu",
	},
	{
		jp: "砂糖は甘いです",
		kana: "さとうはあまいです",
		romaji: "satouhaama idesu",
	},
	{
		jp: "ニンニクの匂い",
		kana: "にんにくのにおい",
		romaji: "ninnikusunonioi",
	},
	{
		jp: "唐辛子は辛い",
		kana: "とうがらしはからい",
		romaji: "tougarashihakarai",
	},
	{
		jp: "フライパンで焼く",
		kana: "ふらいぱんでやく",
		romaji: "furaipandeyaku",
	},
	{
		jp: "冷蔵庫から出す",
		kana: "れいぞうこからだす",
		romaji: "reizoukokaradasu",
	},
	{
		jp: "火をつけます",
		kana: "ひをつけます",
		romaji: "hiwotsukemasu",
	},
	{
		jp: "鍋に水を入れる",
		kana: "なべにみずをいれる",
		romaji: "nabe nimizuwoireru",
	},
	{
		jp: "塩辛い料理",
		kana: "しおからいりょうり",
		romaji: "shiokararairyouri",
	},
	{
		jp: "煮込む時間です",
		kana: "にこむじかんです",
		romaji: "nikomujikandasu",
	},
	{
		jp: "沸騰しました",
		kana: "ふっとうしました",
		romaji: "futtoushimashita",
	},
	{
		jp: "湯気が出ています",
		kana: "ゆげがでています",
		romaji: "yugegadeiteimasu",
	},
	{
		jp: "グツグツ煮ます",
		kana: "ぐつぐつにます",
		romaji: "gutsugutunimasu",
	},
	{
		jp: "混ぜてください",
		kana: "ぜていただきます",
		romaji: "mazetekudass ai",
	},
	{
		jp: "朝ご飯を食べる",
		kana: "あさごはんをたべる",
		romaji: "asagohantaberu",
	},
	{
		jp: "昼食の時間です",
		kana: "ちゅうしょくのじかんです",
		romaji: "chuushokunotokandasu",
	},
	{
		jp: "夕ご飯は何？",
		kana: "ゆうごはんはなに",
		romaji: "yuugohahannani",
	},
	{
		jp: "夜食を食べます",
		kana: "やしょくをたべます",
		romaji: "yashokuwotabemasu",
	},
	{
		jp: "お弁当が好き",
		kana: "おべんとうがすき",
		romaji: "obentougasuki",
	},
	{
		jp: "家で食べたい",
		kana: "いえでたべたい",
		romaji: "iedetabetai",
	},
	{
		jp: "食卓に座ります",
		kana: "しょくたくにすわります",
		romaji: "shokutakunisuwasrimasu",
	},
	{
		jp: "一緒に食べます",
		kana: "いっしょにたべます",
		romaji: "isshonitabemasu",
	},
	{
		jp: "食べ物は大事",
		kana: "たべものはだいじ",
		romaji: "tabemonohaddaiji",
	},
	{
		jp: "美味しく食べた",
		kana: "おいしくたべた",
		romaji: "oishikutabeta",
	},
	{
		jp: "レストランへ行く",
		kana: "れすとらんへいく",
		romaji: "resutoranheiiku",
	},
	{
		jp: "予約を取ります",
		kana: "よやくをとります",
		romaji: "yoyakuwotrimasu",
	},
	{
		jp: "席が空いています",
		kana: "せきがあいています",
		romaji: "sekigaaiteimasu",
	},
	{
		jp: "メニューを見る",
		kana: "めにゅーをみる",
		romaji: "menyūwomiru",
	},
	{
		jp: "何を注文しますか",
		kana: "なにをちゅうもんしますか",
		romaji: "naniwochuumonsmasukka",
	},
	{
		jp: "ウェイターを呼ぶ",
		kana: "ゑいたーをよぶ",
		romaji: "weitāwoyobu",
	},
	{
		jp: "お会計をお願いします",
		kana: "おかいけいをおねがいします",
		romaji: "okaikeiwooneggaishimasu",
	},
	{
		jp: "美味しかったです",
		kana: "おいしかったです",
		romaji: "oishikattadesu",
	},
	{
		jp: "また来たいです",
		kana: "またきたいです",
		romaji: "mataik itaidesu",
	},
	{
		jp: "良い店ですね",
		kana: "よいみせですね",
		romaji: "yoimisedesune",
	},
	{
		jp: "そばが食べたい",
		kana: "そばがたべたい",
		romaji: "sobagatabetai",
	},
	{
		jp: "うどんは美味しい",
		kana: "うどんはおいしい",
		romaji: "udonhaoisii",
	},
	{
		jp: "天丼を注文する",
		kana: "てんどんをちゅうもんする",
		romaji: "tendonwochuumonnsuru",
	},
	{
		jp: "親子丼です",
		kana: "おやこどんです",
		romaji: "oyakdondesu",
	},
	{
		jp: "かつどんが好き",
		kana: "かつどんがすき",
		romaji: "katsudonassuki",
	},
	{
		jp: "ラーメン食べたい",
		kana: "らーめんたべたい",
		romaji: "rāmentabetai",
	},
	{
		jp: "みそ汁を飲む",
		kana: "みそしるをのむ",
		romaji: "misoshiruwonomu",
	},
	{
		jp: "玉子焼きます",
		kana: "たまごやきます",
		romaji: "tamagoyakimasu",
	},
	{
		jp: "おいなり寿司",
		kana: "おいなりずし",
		romaji: "oinarizushi",
	},
	{
		jp: "巻き寿司を切る",
		kana: "まきずしをきる",
		romaji: "makizushiwokiru",
	},
	{
		jp: "豚肉をカットする",
		kana: "ぶたにくをかっとする",
		romaji: "butanikuwokattosuru",
	},
	{
		jp: "牛肉は高い",
		kana: "ぎゅうにくはたかい",
		romaji: "gyuunikuhatakaii",
	},
	{
		jp: "鶏肉を揚げます",
		kana: "とりにくをあげます",
		romaji: "toiniikuwosagemasui",
	},
	{
		jp: "卵は栄養豊富",
		kana: "たまごはえいようほうふ",
		romaji: "tamagohaeiyouhoufu",
	},
	{
		jp: "キャベツを切る",
		kana: "きゃべつをきる",
		romaji: "kyabetsuwokiru",
	},
	{
		jp: "玉ねぎを炒める",
		kana: "たまねぎをいためる",
		romaji: "tamanegiwoit ameru",
	},
	{
		jp: "人参をむく",
		kana: "にんじんをむく",
		romaji: "ninjinwomuku",
	},
	{
		jp: "ジャガイモを煮る",
		kana: "じゃがいもをにる",
		romaji: "jagaimowoniru",
	},
	{
		jp: "トウモロコシは甘い",
		kana: "とうもろこしはあまい",
		romaji: "toumorokoshihaami",
	},
	{
		jp: "スイカが食べたい",
		kana: "すいかがたべたい",
		romaji: "suikagatabetai",
	},
	{
		jp: "胡椒をかけます",
		kana: "こしょうをかけます",
		romaji: "koshouwoakemasu",
	},
	{
		jp: "砂糖を少し加える",
		kana: "さとうをすこしくわえる",
		romaji: "satouwasukoshikuwaeru",
	},
	{
		jp: "醤油の香り",
		kana: "しょうゆのかおり",
		romaji: "shoyunokaori",
	},
	{
		jp: "みりんを入れる",
		kana: "みりんをいれる",
		romaji: "mirinwoireru",
	},
	{
		jp: "酒を使います",
		kana: "さけをつかいます",
		romaji: "sakewotsuakimasu",
	},
	{
		jp: "酢が入っています",
		kana: "すがはいっています",
		romaji: "sugahaiteimasu",
	},
	{
		jp: "出汁を取ります",
		kana: "だしをとります",
		romaji: "dashiwotrimasu",
	},
	{
		jp: "豆板醤は辛い",
		kana: "とうばんじゃんはからい",
		romaji: "toubanjanhakarai",
	},
	{
		jp: "わさびは辛い",
		kana: "わさびはからい",
		romaji: "wasabihakarai",
	},
	{
		jp: "バターを溶かす",
		kana: "ばたーをとかす",
		romaji: "batāwotokasu",
	},
	{
		jp: "お茶を飲みます",
		kana: "おちゃをのみます",
		romaji: "ochawonom imasu",
	},
	{
		jp: "紅茶が好きです",
		kana: "こうちゃがすきです",
		romaji: "kouchasukidesu",
	},
	{
		jp: "珈琲を淹れます",
		kana: "こーひーをいれます",
		romaji: "koーhīwoiremas",
	},
	{
		jp: "牛乳が必要です",
		kana: "ぎゅうにゅうがひつようです",
		romaji: "gyuunyuugahitsyoudata",
	},
	{
		jp: "ジュースを飲む",
		kana: "じゅーすをのむ",
		romaji: "jūsuwonomu",
	},
	{
		jp: "ビールが冷たい",
		kana: "びーるがつめたい",
		romaji: "bīrugatsmetai",
	},
	{
		jp: "ワインを飲む",
		kana: "わいんをのむ",
		romaji: "wainwonomu",
	},
	{
		jp: "水は健康です",
		kana: "みずはけんこうです",
		romaji: "mizuhakenkouda su",
	},
	{
		jp: "お酒を飲みます",
		kana: "おさけをのみます",
		romaji: "osakewonoim asu",
	},
	{
		jp: "甘いジュース",
		kana: "あまいじゅーす",
		romaji: "amaijusu",
	},
	{
		jp: "ケーキが好き",
		kana: "けーきがすき",
		romaji: "kēkigasuki",
	},
	{
		jp: "キャンディー",
		kana: "きゃんでぃー",
		romaji: "kyandī",
	},
	{
		jp: "クッキーを焼く",
		kana: "くっきーをやく",
		romaji: "kukkīwoyaku",
	},
	{
		jp: "あんこが入った",
		kana: "あんこがはいった",
		romaji: "ankogahaitt a",
	},
	{
		jp: "羊羹は甘い",
		kana: "ようかんはあまい",
		romaji: "youkanhaama i",
	},
	{
		jp: "最中が食べたい",
		kana: "もなかがたべたい",
		romaji: "monakagatabetai",
	},
	{
		jp: "大福は美味しい",
		kana: "だいふくはおいしい",
		romaji: "daifukuhaoisii",
	},
	{
		jp: "ドーナツ",
		kana: "どーなつ",
		romaji: "dōnatsu",
	},
	{
		jp: "オーブンで焼く",
		kana: "おーぶんでやく",
		romaji: "ōbundeyaku",
	},
	{
		jp: "電子レンジ",
		kana: "でんしれんじ",
		romaji: "denshirenji",
	},
	{
		jp: "揚げ物をする",
		kana: "あげものをする",
		romaji: "agemonowosuru",
	},
	{
		jp: "炒め物です",
		kana: "いためものです",
		romaji: "itaremodesu",
	},
	{
		jp: "煮込み料理",
		kana: "にこみりょうり",
		romaji: "nikomriryouri",
	},
	{
		jp: "スープを作る",
		kana: "すーぷをつくる",
		romaji: "sūpuwotukuru",
	},
	{
		jp: "しゃぶしゃぶ",
		kana: "しゃぶしゃぶ",
		romaji: "shabushabu",
	},
	{
		jp: "バーベキュー",
		kana: "ばーべきゅー",
		romaji: "bābekuyu",
	},
	{
		jp: "グリルで焼く",
		kana: "ぐりるでやく",
		romaji: "gurudeyaku",
	},
	{
		jp: "バナナが黄い",
		kana: "ばなながきいろい",
		romaji: "bananagarikiiroi",
	},
	{
		jp: "いちごは赤い",
		kana: "いちごはあかい",
		romaji: "ichigohakaai",
	},
	{
		jp: "ぶどう",
		kana: "ぶどう",
		romaji: "budou",
	},
	{
		jp: "オレンジ",
		kana: "おれんじ",
		romaji: "orenji",
	},
	{
		jp: "スイカを割る",
		kana: "すいかをわる",
		romaji: "suikawowaru",
	},
	{
		jp: "梨が好きです",
		kana: "なしがすきです",
		romaji: "nashigasukidesu",
	},
	{
		jp: "栗は秋の味",
		kana: "くりはあきのあじ",
		romaji: "kurihaakiNoaji",
	},
	{
		jp: "柿を食べる",
		kana: "かきをたべる",
		romaji: "kakiwotaberu",
	},
	{
		jp: "桃の季節",
		kana: "もものきせつ",
		romaji: "momonokisetus",
	},
	{
		jp: "レモンの酸っぱい",
		kana: "れもんのすっぱい",
		romaji: "remonnossupai",
	},
	{
		jp: "食べ放題",
		kana: "たべほうだい",
		romaji: "tabehouddai",
	},
	{
		jp: "バイキング形式",
		kana: "ばいきんぐけいしき",
		romaji: "baikingukesishiki",
	},
	{
		jp: "高級レストラン",
		kana: "こうきゅうれすとらん",
		romaji: "koukuryuresutoran",
	},
	{
		jp: "ファーストフード",
		kana: "ふぁーすとふーど",
		romaji: "fāsutofūdo",
	},
	{
		jp: "家庭料理",
		kana: "かていりょうり",
		romaji: "kateirilyouri",
	},
	{
		jp: "本格的な味",
		kana: "ほんかくてきなあじ",
		romaji: "honkakutekianaaji",
	},
	{
		jp: "昔ながらの",
		kana: "むかしながらの",
		romaji: "mukashinágarano",
	},
	{
		jp: "新しいメニュー",
		kana: "あたらしいめにゅー",
		romaji: "atarashiimenyū",
	},
	{
		jp: "季節の料理",
		kana: "きせつのりょうり",
		romaji: "kisetunoaryouri",
	},
	{
		jp: "定食が安い",
		kana: "ていしょくがやすい",
		romaji: "teishokugayasui",
	},
	{
		jp: "白いご飯",
		kana: "しろいごはん",
		romaji: "shirrogohann",
	},
	{
		jp: "熱いスープ",
		kana: "あついすーぷ",
		romaji: "atsuisūpu",
	},
	{
		jp: "冷たい水",
		kana: "つめたいみず",
		romaji: "tsumetaimizu",
	},
	{
		jp: "食べ物を買う",
		kana: "たべものをかう",
		romaji: "tabemonowokau",
	},
	{
		jp: "料理が上手",
		kana: "りょうりがじょうず",
		romaji: "ryourigajouzu",
	},
	{
		jp: "レシピを見る",
		kana: "れしぴをみる",
		romaji: "resshipimiru",
	},
	{
		jp: "お皿が綺麗",
		kana: "おさらがきれい",
		romaji: "osaragakire",
	},
	{
		jp: "食器を洗う",
		kana: "しょっきをあらう",
		romaji: "shokk iwaarou",
	},
	{
		jp: "テーブルを拭く",
		kana: "てーぶるをぬぐい",
		romaji: "teburunugui",
	},
	{
		jp: "おにぎり",
		kana: "おにぎり",
		romaji: "onigiri",
	},
	{
		jp: "味噌ラーメン",
		kana: "みそらーめん",
		romaji: "misorāmen",
	},
	{
		jp: "焼肉が好き",
		kana: "やきにくがすき",
		romaji: "yakinikugasuki",
	},
	{
		jp: "餃子",
		kana: "ぎょうざ",
		romaji: "gyouza",
	},
	{
		jp: "フライドポテト",
		kana: "ふらいどぽてと",
		romaji: "furaidopoteto",
	},
	{
		jp: "カレーライス",
		kana: "かれーらいす",
		romaji: "karēraiusの",
	},
	{
		jp: "オムライス",
		kana: "おむらいす",
		romaji: "omuraiuse",
	},
	{
		jp: "牛乳を飲む",
		kana: "ぎゅうにゅうをのむ",
		romaji: "gyuunyuuwonomu",
	},
	{
		jp: "パスタが好き",
		kana: "ぱすたがすき",
		romaji: "pastagasuki",
	},
	{
		jp: "フルーツサラダ",
		kana: "ふるーつさらだ",
		romaji: "furūtsusarada",
	},
	{
		jp: "ジャム入り",
		kana: "じゃむいり",
		romaji: "jamuin",
	},
	{
		jp: "グラノーラ",
		kana: "ぐらのーら",
		romaji: "guranōra",
	},
	{
		jp: "チーズケーキ",
		kana: "ちーずけーき",
		romaji: "chīzukēki",
	},
	{
		jp: "ショートケーキ",
		kana: "しょーときゃき",
		romaji: "shōtoyakiki",
	},
	{
		jp: "マフィン",
		kana: "まふぃん",
		romaji: "mafuin",
	},
	{
		jp: "パンケーキ",
		kana: "ぱんけーき",
		romaji: "pankēki",
	},
	{
		jp: "ワッフル",
		kana: "わっふる",
		romaji: "waffuru",
	},
	{
		jp: "プディング",
		kana: "ぷでぃんぐ",
		romaji: "pudinggu",
	},
	{
		jp: "ゼリー",
		kana: "ぜりー",
		romaji: "zerī",
	},
	{
		jp: "ムース",
		kana: "むーす",
		romaji: "mūsu",
	},
	{
		jp: "パイ",
		kana: "ぱい",
		romaji: "pai",
	},
	{
		jp: "タルト",
		kana: "たると",
		romaji: "taruto",
	},
	{
		jp: "シフォンケーキ",
		kana: "しふぉんけーき",
		romaji: "shiffonkēki",
	},
	{
		jp: "マカロン",
		kana: "まかろん",
		romaji: "makaron",
	},
	{
		jp: "クレープ",
		kana: "くれーぷ",
		romaji: "kurēpu",
	},
	{
		jp: "ブラウニー",
		kana: "ぶらうにー",
		romaji: "burauinī",
	},
	{
		jp: "プレッツェル",
		kana: "ぷれっつぇる",
		romaji: "puretsueru",
	},
	{
		jp: "ナッツ",
		kana: "なっつ",
		romaji: "nattsu",
	},
	{
		jp: "ビスケット",
		kana: "びすけっと",
		romaji: "bisuketto",
	},
	{
		jp: "クラッカー",
		kana: "くらっかー",
		romaji: "kurakka",
	},
	{
		jp: "シリアル",
		kana: "しりある",
		romaji: "shiriaru",
	},
	{
		jp: "ハチミツ",
		kana: "はちみつ",
		romaji: "hachimitsu",
	},
	{
		jp: "メープルシロップ",
		kana: "めーぷるしろっぷ",
		romaji: "mēpurushippur",
	},
	{
		jp: "マーマレード",
		kana: "まーまれーど",
		romaji: "māmarēdo",
	},
	{
		jp: "ピーナッツバター",
		kana: "ぴーなっつばたー",
		romaji: "pīnattsubatā",
	},
	{
		jp: "カシューナッツ",
		kana: "かしゅーなっつ",
		romaji: "kashūnattsu",
	},
	{
		jp: "アーモンド",
		kana: "あーもんど",
		romaji: "āmondo",
	},
	{
		jp: "ココナッツ",
		kana: "ここなっつ",
		romaji: "kokonatsu",
	},
	{
		jp: "ピスタチオ",
		kana: "ぴすたちお",
		romaji: "pistachio",
	},
	{
		jp: "クルミ",
		kana: "くるみ",
		romaji: "kurumi",
	},
	{
		jp: "ドライフルーツ",
		kana: "どらいふるーつ",
		romaji: "doraifurūtsu",
	},
	{
		jp: "プルーン",
		kana: "ぷるーん",
		romaji: "purun",
	},
	{
		jp: "レーズン",
		kana: "れーずん",
		romaji: "rēzun",
	},
	{
		jp: "日本そば",
		kana: "にほんそば",
		romaji: "nihonsoba",
	},
	{
		jp: "十割そば",
		kana: "じゅわりそば",
		romaji: "juwwasoba",
	},
	{
		jp: "きしめん",
		kana: "きしめん",
		romaji: "kishimen",
	},
	{
		jp: "ゲームをしています",
		kana: "げーむをしています",
		romaji: "geemuwoshiteimasu",
	},
	{
		jp: "キャラクターが強い",
		kana: "きゃらくたーがつよい",
		romaji: "kyarakutaagatsuyoi",
	},
	{
		jp: "レベルアップした",
		kana: "れべるあっぷした",
		romaji: "reberuappushita",
	},
	{
		jp: "ボスが倒せない",
		kana: "ぼすがたおせない",
		romaji: "bosugataosemai",
	},
	{
		jp: "アイテムを集める",
		kana: "あいてむをあつめる",
		romaji: "aitemuwoatsumeru",
	},
	{
		jp: "ダンジョン探索中",
		kana: "だんじょんたんさくちゅう",
		romaji: "danjontansokuchu",
	},
	{
		jp: "スコアを稼ぐ",
		kana: "すこあをかせぐ",
		romaji: "sukoawokasegu",
	},
	{
		jp: "ゲームオーバーだ",
		kana: "げーむおーばーだ",
		romaji: "geemoobaada",
	},
	{
		jp: "コントローラーが壊れた",
		kana: "こんとろーらーがこわれた",
		romaji: "kontororaagakowareta",
	},
	{
		jp: "連続勝利記録が更新",
		kana: "れんぞくしょうりきろくがこうしん",
		romaji: "renzokushourikirokugakoushin",
	},
	{
		jp: "アニメを見ています",
		kana: "あにめをみています",
		romaji: "animewomiteimasu",
	},
	{
		jp: "新作アニメが面白い",
		kana: "しんさくあにめがおもしろい",
		romaji: "shinsakuanimegaomoshiroi",
	},
	{
		jp: "声優が上手だ",
		kana: "せいゆうがじょうずだ",
		romaji: "seiyuugajouuzuda",
	},
	{
		jp: "第二期が決定した",
		kana: "だいにきがけっていした",
		romaji: "dainiikigaketteishita",
	},
	{
		jp: "エンディング曲が好き",
		kana: "えんでぃんぐきょくがすき",
		romaji: "endingkyokugasuki",
	},
	{
		jp: "キャラデザインが素晴らしい",
		kana: "きゃらでざいんがすばらしい",
		romaji: "kyaradezaingasubarashii",
	},
	{
		jp: "ストーリーが深い",
		kana: "すとーりーがふかい",
		romaji: "sutoriigafukai",
	},
	{
		jp: "最高のアニメだ",
		kana: "さいこうのあにめだ",
		romaji: "saikounoanmeda",
	},
	{
		jp: "思わず泣いてしまった",
		kana: "おもわずないてしまった",
		romaji: "omowazunaiteshimatta",
	},
	{
		jp: "アニメーションが綺麗",
		kana: "あにめーしょんがきれい",
		romaji: "animeshongakierei",
	},
	{
		jp: "マンガを読んでいる",
		kana: "まんがをよんでいる",
		romaji: "mangawoyondeiru",
	},
	{
		jp: "週刊連載漫画が好き",
		kana: "しゅうかんれんさいまんががすき",
		romaji: "shuukanrensaimanngagasuki",
	},
	{
		jp: "コマ割りが面白い",
		kana: "こまわりがおもしろい",
		romaji: "komawarigaomoshiroi",
	},
	{
		jp: "続きが気になる",
		kana: "つづきがきになる",
		romaji: "tuzukinakinaru",
	},
	{
		jp: "絵が上手だ",
		kana: "えがじょうずだ",
		romaji: "egajouuzuda",
	},
	{
		jp: "感動する場面がある",
		kana: "かんどうするばめんがある",
		romaji: "kandousurubamengaaru",
	},
	{
		jp: "完結したマンガ",
		kana: "かんけつしたまんが",
		romaji: "kanketushitamanga",
	},
	{
		jp: "推奨年齢がある",
		kana: "すいしょうねんれいがある",
		romaji: "suishounenreigaaru",
	},
	{
		jp: "巻末特典が欲しい",
		kana: "かんまつとくてんがほしい",
		romaji: "kanmatsutokutengahoshii",
	},
	{
		jp: "連載中です",
		kana: "れんさいちゅうです",
		romaji: "rensaichiuudesu",
	},
	{
		jp: "ゲーム化されたマンガ",
		kana: "げーむかされたまんが",
		romaji: "geemukasarretamanga",
	},
	{
		jp: "アニメ化が決まった",
		kana: "あにめかがきまった",
		romaji: "animekagakimatta",
	},
	{
		jp: "コラボイベントが開始",
		kana: "こらぼいべんとがかいし",
		romaji: "koraboeventogakaiszi",
	},
	{
		jp: "キャラクターグッズが販売",
		kana: "きゃらくたーぐっずがはんばい",
		romaji: "kyarakutaguzzugahanbai",
	},
	{
		jp: "ファンアートが素敵",
		kana: "ふぁんあーとがすてき",
		romaji: "fanartogasuteeki",
	},
	{
		jp: "ストーリーが面白い",
		kana: "すとーりーがおもしろい",
		romaji: "sutoriigaomoshiroi",
	},
	{
		jp: "キャラが好きだ",
		kana: "きゃらがすきだ",
		romaji: "kyaragasukida",
	},
	{
		jp: "推し推し推し推し",
		kana: "おしおしおしおし",
		romaji: "oshioshioshioshi",
	},
	{
		jp: "沼にはまった",
		kana: "ぬまにはまった",
		romaji: "numaninhamatta",
	},
	{
		jp: "推しが登場する回",
		kana: "おしがとうじょうするかい",
		romaji: "oshigatoujousurugakai",
	},
	{
		jp: "クエストを開始する",
		kana: "くえすとをかいしする",
		romaji: "quesutwokaisishisuru",
	},
	{
		jp: "魔法が使える",
		kana: "まほうがつかえる",
		romaji: "mahougatsugaeru",
	},
	{
		jp: "敵を倒した",
		kana: "てきをたおした",
		romaji: "tekiwotaoshita",
	},
	{
		jp: "トレジャーボックス発見",
		kana: "とれじゃーぼっくすはっけん",
		romaji: "trejyaboksuhakken",
	},
	{
		jp: "パーティーを編成する",
		kana: "ぱーてぃーをへんせいする",
		romaji: "partywohenseisuru",
	},
	{
		jp: "スキルが発動した",
		kana: "すきるがはつどうした",
		romaji: "sukirugahatsudousita",
	},
	{
		jp: "武器を装備する",
		kana: "ぶきをそうびする",
		romaji: "bukiwosoubishuru",
	},
	{
		jp: "防具が必要だ",
		kana: "ぼうぐがひつようだ",
		romaji: "bouguagahitsuyouda",
	},
	{
		jp: "経験値を獲得",
		kana: "けいけんちをかくとく",
		romaji: "keikenchiokakutoku",
	},
	{
		jp: "セーブポイント到着",
		kana: "せーぶぽいんととうちゃく",
		romaji: "savepointtoutyaku",
	},
	{
		jp: "放送時間を確認した",
		kana: "ほうそうじかんをかくにんした",
		romaji: "housojikanjokukakuninshita",
	},
	{
		jp: "次のエピソード待機中",
		kana: "つぎのえぴそーどたいきちゅう",
		romaji: "tsuginepisodetaikichuu",
	},
	{
		jp: "声優さんが素敵",
		kana: "せいゆうさんがすてき",
		romaji: "seiyuusangasuteeki",
	},
	{
		jp: "背景が美しい",
		kana: "はいけいがうつくしい",
		romaji: "haikeigazutsukushii",
	},
	{
		jp: "映像技術が凄い",
		kana: "えいぞうぎじゅつがすごい",
		romaji: "eizougijutsugazuugoi",
	},
	{
		jp: "OP曲が印象的",
		kana: "おーぴーきょくがいんしょうてき",
		romaji: "opekyokuginshouteki",
	},
	{
		jp: "ED曲も良い",
		kana: "いーでぃーきょくもよい",
		romaji: "edkyokumoioi",
	},
	{
		jp: "原作と違う部分がある",
		kana: "げんさくとちがうぶぶんがある",
		romaji: "gensaktochigaububungaaru",
	},
	{
		jp: "アニメオリジナルストーリー",
		kana: "あにめおりじなるすとーりー",
		romaji: "animeoriginalstori",
	},
	{
		jp: "全話一気見した",
		kana: "ぜんわいっきみした",
		romaji: "zenwaikikimishita",
	},
	{
		jp: "最新刊を買った",
		kana: "さいしんかんをかった",
		romaji: "saisinkanjkakatta",
	},
	{
		jp: "推理が当たった",
		kana: "すいりがあたった",
		romaji: "suirigaatatta",
	},
	{
		jp: "次巻が楽しみだ",
		kana: "じかんがたのしみだ",
		romaji: "jikangataznoshimida",
	},
	{
		jp: "衝撃展開だった",
		kana: "しょうげきてんかいだった",
		romaji: "shougetekutenkaidatta",
	},
	{
		jp: "考察が盛り上がっている",
		kana: "こうさつがもりあがっている",
		romaji: "kousatsugamoriagatteiru",
	},
	{
		jp: "トレンドワードになった",
		kana: "とれんどわーどになった",
		romaji: "trendwordninatta",
	},
	{
		jp: "同人誌が多い",
		kana: "どうじんしがおおい",
		romaji: "doujinshigaoi",
	},
	{
		jp: "カップリングが好き",
		kana: "かっぷりんぐがすき",
		romaji: "kappuringugasuki",
	},
	{
		jp: "二次創作が素敵",
		kana: "にじそうさくがすてき",
		romaji: "nijisousekugasuteeki",
	},
	{
		jp: "公式が面白い",
		kana: "こうしきがおもしろい",
		romaji: "koushikigaomoshiroi",
	},
	{
		jp: "必殺技が発動",
		kana: "ひっさつぎがはつどう",
		romaji: "hissatsugigahatsudou",
	},
	{
		jp: "戦闘が激しい",
		kana: "せんとうがはげしい",
		romaji: "sentougahageshii",
	},
	{
		jp: "攻撃が命中した",
		kana: "こうげきがめいちゅうした",
		romaji: "kougekigameichuushita",
	},
	{
		jp: "防御を固める",
		kana: "ぼうぎょをかためる",
		romaji: "bougyowokagameru",
	},
	{
		jp: "ダメージが大きい",
		kana: "だめーじがおおきい",
		romaji: "damaejigaookii",
	},
	{
		jp: "回復魔法を使う",
		kana: "かいふくまほうをつかう",
		romaji: "kaifukumahouwotsukau",
	},
	{
		jp: "絶望的な状況だ",
		kana: "ぜつぼうてきなじょうきょうだ",
		romaji: "zetsuboutekijnajoukyouda",
	},
	{
		jp: "逆転勝利を狙う",
		kana: "ぎゃくてんしょうりをねらう",
		romaji: "gyakutenshouriwonerou",
	},
	{
		jp: "協力プレイが楽しい",
		kana: "きょうりょくぷれいがたのしい",
		romaji: "kyouryokupureigataznoshii",
	},
	{
		jp: "シングルプレイモード",
		kana: "しんぐるぷれいもーど",
		romaji: "singurupureimodoo",
	},
	{
		jp: "主人公が成長した",
		kana: "しゅじんこうがせいちょうした",
		romaji: "shujinkoougaseichoushita",
	},
	{
		jp: "ライバルが強い",
		kana: "らいばるがつよい",
		romaji: "raibarugatsuyoi",
	},
	{
		jp: "ヒロインが可愛い",
		kana: "ひろいんがかわいい",
		romaji: "hiroinngakawaii",
	},
	{
		jp: "脇役が活躍する",
		kana: "わきやくがかつやくする",
		romaji: "wakiyakugakatyakusuru",
	},
	{
		jp: "キャラの掘り下げが深い",
		kana: "きゃらのほりさげがふかい",
		romaji: "kyaranohorisagegafukai",
	},
	{
		jp: "背景設定が豊かだ",
		kana: "はいけいせっていがゆたかだ",
		romaji: "haikeisetteigayutakada",
	},
	{
		jp: "家族関係が複雑",
		kana: "かぞくかんけいがふくざつ",
		romaji: "kazokukankieigafukuzatsu",
	},
	{
		jp: "秘密が明かされた",
		kana: "ひみつがあかされた",
		romaji: "himitsuugaakasareta",
	},
	{
		jp: "恋愛関係が発展",
		kana: "れんあいかんけいがはってん",
		romaji: "renaaikankiegahattenn",
	},
	{
		jp: "死別するキャラ",
		kana: "しべつするきゃら",
		romaji: "shibetsusurukyara",
	},
	{
		jp: "世界観が広い",
		kana: "せかいかんがひろい",
		romaji: "sekaikanngahiroi",
	},
	{
		jp: "魔法システムが複雑",
		kana: "まほうしすてむがふくざつ",
		romaji: "mahousystemngafukuzatsu",
	},
	{
		jp: "歴史背景がある",
		kana: "れきしはいけいがある",
		romaji: "rekisuhaikieigaaru",
	},
	{
		jp: "異世界転移もの",
		kana: "いせかいてんいもの",
		romaji: "isekaiteniimono",
	},
	{
		jp: "架空世界が面白い",
		kana: "かくうせかいがおもしろい",
		romaji: "kakuusekaigaomoshiroi",
	},
	{
		jp: "ファンタジー設定",
		kana: "ふぁんたじーせってい",
		romaji: "fantasyusettei",
	},
	{
		jp: "SF要素が含まれる",
		kana: "えすえふようそがふくまれる",
		romaji: "sfyousougafukomaeru",
	},
	{
		jp: "現代が舞台だ",
		kana: "げんだいがぶたいだ",
		romaji: "gendaigabutaidda",
	},
	{
		jp: "中世が舞台です",
		kana: "ちゅうせいがぶたいです",
		romaji: "chuuseigabutaiです",
	},
	{
		jp: "未来社会の話",
		kana: "みらいしゃかいのはなし",
		romaji: "miraishakainohanashi",
	},
	{
		jp: "涙が止まらない",
		kana: "なみだがとまらない",
		romaji: "namidagatomaranai",
	},
	{
		jp: "感動した",
		kana: "かんどうした",
		romaji: "kandoushita",
	},
	{
		jp: "心が痛い",
		kana: "こころがいたい",
		romaji: "kokorogaitai",
	},
	{
		jp: "希望が見えてくる",
		kana: "きぼうがみえてくる",
		romaji: "kibougamietekuru",
	},
	{
		jp: "絶望から立ち直る",
		kana: "ぜつぼうからたちなおる",
		romaji: "zetsuboukaratachinoru",
	},
	{
		jp: "友情が試される",
		kana: "ゆうじょうがこころみられる",
		romaji: "yuujoungakokeromamareu",
	},
	{
		jp: "運命の出会い",
		kana: "うんめいのであい",
		romaji: "unmeinodeai",
	},
	{
		jp: "失恋する場面",
		kana: "しつれんするばめん",
		romaji: "shitsurensurubamen",
	},
	{
		jp: "復讐が始まる",
		kana: "ふくしゅうがはじまる",
		romaji: "fukushuugahajimaru",
	},
	{
		jp: "和解する二人",
		kana: "わかいするふたり",
		romaji: "wakaishisuru futari",
	},
	{
		jp: "待ってました",
		kana: "まってました",
		romaji: "matemasita",
	},
	{
		jp: "行くぞ",
		kana: "いくぞ",
		romaji: "ikuzo",
	},
	{
		jp: "頑張れ",
		kana: "がんばれ",
		romaji: "ganbare",
	},
	{
		jp: "やった勝った",
		kana: "やったかった",
		romaji: "yattakatta",
	},
	{
		jp: "信じるしかない",
		kana: "しんじるしかない",
		romaji: "shinjirushikanai",
	},
	{
		jp: "みんなで一緒に",
		kana: "みんなでいっしょに",
		romaji: "minnasdeitsszioni",
	},
	{
		jp: "大丈夫だ",
		kana: "だいじょうぶだ",
		romaji: "daijobuuda",
	},
	{
		jp: "諦めるな",
		kana: "あきらめるな",
		romaji: "akirammeruna",
	},
	{
		jp: "やるしかない",
		kana: "やるしかない",
		romaji: "yarushikunai",
	},
	{
		jp: "約束だ絶対",
		kana: "やくそくだぜったい",
		romaji: "yakusokudazetai",
	},
	{
		jp: "フレームレート高い",
		kana: "ふれーむれーとたかい",
		romaji: "frameretotagakai",
	},
	{
		jp: "バグが多い",
		kana: "ばぐがおおい",
		romaji: "baguganoi",
	},
	{
		jp: "アップデートが来た",
		kana: "あっぷでーとがきた",
		romaji: "apodategakita",
	},
	{
		jp: "パッチで修正された",
		kana: "ぱっちでしゅうせいされた",
		romaji: "patchideshunseisareta",
	},
	{
		jp: "グラフィックが綺麗",
		kana: "ぐらふぃっくがきれい",
		romaji: "gurafikkugakirei",
	},
	{
		jp: "サウンドが良い",
		kana: "さうんどがよい",
		romaji: "soundngayoi",
	},
	{
		jp: "操作感が滑らか",
		kana: "そうさかんがなめらか",
		romaji: "soussakanganamaraka",
	},
	{
		jp: "ロード時間が短い",
		kana: "ろーどじかんがみじかい",
		romaji: "rodojikangamijikai",
	},
	{
		jp: "セーブできました",
		kana: "せーぶできました",
		romaji: "savdekiremashita",
	},
	{
		jp: "リセットボタン押した",
		kana: "りせっとぼたんおした",
		romaji: "resetbotanoshita",
	},
	{
		jp: "今日も一日頑張る",
		kana: "きょうもいちにちがんばる",
		romaji: "kyoumoichinichiganbaru",
	},
	{
		jp: "朝からゲーム中",
		kana: "あさからげーむちゅう",
		romaji: "asaragamemuchu",
	},
	{
		jp: "寝坊しちゃった",
		kana: "ねぼうしちゃった",
		romaji: "nebouschita",
	},
	{
		jp: "学校に遅れた",
		kana: "がっこうにおくれた",
		romaji: "gakouniokureta",
	},
	{
		jp: "友達と遊んでた",
		kana: "ともだちとあそんでた",
		romaji: "tomodachitoasondeta",
	},
	{
		jp: "お気に入りのキャラ",
		kana: "おきにいりのきゃら",
		romaji: "okiniirinokyara",
	},
	{
		jp: "推しキャラが好き",
		kana: "おしきゃらがすき",
		romaji: "oshikyaragasuki",
	},
	{
		jp: "グッズ買い漁る",
		kana: "ぐっずかいあさる",
		romaji: "guzzkuiasaru",
	},
	{
		jp: "推し推し推し頑張れ",
		kana: "おしおしおしがんばれ",
		romaji: "oshioshioshiganbare",
	},
	{
		jp: "沼深い本当に",
		kana: "ぬまふかいほんとうに",
		romaji: "numafukaihontouni",
	},
	{
		jp: "ファンアート描く",
		kana: "ふぁんあーときく",
		romaji: "fanartokaiku",
	},
	{
		jp: "同人誌作成中",
		kana: "どうじんしさくせいちゅう",
		romaji: "doujinshisakuseichu",
	},
	{
		jp: "二次創作楽しい",
		kana: "にじそうさくたのしい",
		romaji: "nijisousakutanoshii",
	},
	{
		jp: "クリアはできた",
		kana: "くりあはできた",
		romaji: "kuriahadekireta",
	},
	{
		jp: "まだまだ先がある",
		kana: "まだまださきがある",
		romaji: "madamdasakigaaru",
	},
	{
		jp: "ハードモード難しい",
		kana: "はーどもーどむずかしい",
		romaji: "hardmodmuzkushii",
	},
	{
		jp: "高難度クエスト挑戦",
		kana: "こうなんどくえすときどうせん",
		romaji: "kounandokuesthkousenn",
	},
	{
		jp: "フルコンボ目指す",
		kana: "ふるこんぼめざす",
		romaji: "fulkombomezasu",
	},
	{
		jp: "スコア更新狙い",
		kana: "すこあこうしんねらい",
		romaji: "sukouakoushinnerai",
	},
	{
		jp: "ランキング上位目指す",
		kana: "らんきんぐじょういめざす",
		romaji: "rankingujouimezasu",
	},
	{
		jp: "懐かしい作品だ",
		kana: "なつかしいさくひんだ",
		romaji: "natsukashiissakuhinndaa",
	},
	{
		jp: "昔ハマった",
		kana: "むかしはまった",
		romaji: "mukashihamatta",
	},
	{
		jp: "思い出が蘇る",
		kana: "おもいでがよみがえる",
		romaji: "omoidegayomigaeru",
	},
	{
		jp: "リメイク版もいい",
		kana: "りめいくばんもいい",
		romaji: "remakebannmoii",
	},
	{
		jp: "続編が出た",
		kana: "ぞくへんがでた",
		romaji: "zokuhengadeta",
	},
	{
		jp: "シリーズ全部好き",
		kana: "しりーずぜんぶすき",
		romaji: "siriezu zenbusuki",
	},
	{
		jp: "新作情報を待つ",
		kana: "しんさくじょうほうをまつ",
		romaji: "shinsakujouhouwoitamatssu",
	},
	{
		jp: "発表会が楽しみ",
		kana: "はっぴょうかいがたのしみ",
		romaji: "happioukaigataznoshimi",
	},
	{
		jp: "映画化されそう",
		kana: "えいがかされそう",
		romaji: "eigakasaresou",
	},
	{
		jp: "ドラマ化も面白そう",
		kana: "どらまかもおもしろそう",
		romaji: "doramakamooomoshiroso",
	},
	{
		jp: "イベントバトル開始",
		kana: "いべんとばとるかいし",
		romaji: "eventobatorukaishi",
	},
	{
		jp: "レアキャラ獲得した",
		kana: "れあきゃらかくとくした",
		romaji: "rekyarakakutokushita",
	},
	{
		jp: "ガチャで当選",
		kana: "がちゃであたせん",
		romaji: "gatyadeatasen",
	},
	{
		jp: "ガチャ渋い",
		kana: "がちゃしぶい",
		romaji: "gatyashibui",
	},
	{
		jp: "アニメ制作進行中",
		kana: "あにめせいさくしんこうちゅう",
		romaji: "animeseisakushinkochu",
	},
	{
		jp: "オープニング映像かっこいい",
		kana: "おーぷにんぐえいぞうかっこいい",
		romaji: "openingeizokakkoii",
	},
	{
		jp: "エンドロール泣いた",
		kana: "えんどろーるないた",
		romaji: "endrollnaita",
	},
	{
		jp: "評判が良さそう",
		kana: "ひょうばんがよささう",
		romaji: "hyoubanngayosasou",
	},
	{
		jp: "吹き替え版も見たい",
		kana: "ふきかえはんもみたい",
		romaji: "fukkikaehanmoitai",
	},
	{
		jp: "字幕版で見る",
		kana: "じまくばんでみる",
		romaji: "jimakubandemiru",
	},
	{
		jp: "漫画版が先",
		kana: "まんがばんがさき",
		romaji: "mangabannbasaki",
	},
	{
		jp: "アニメ版も面白い",
		kana: "あにめばんもおもしろい",
		romaji: "animebannmooomoshiroi",
	},
	{
		jp: "キャラが可愛すぎる",
		kana: "きゃらがかわいすぎる",
		romaji: "kyaragakawaiisugiru",
	},
	{
		jp: "設定がしっかりしてる",
		kana: "せっていがしっかりしてる",
		romaji: "setteigashikkkarishiteru",
	},
	{
		jp: "謎が増えてくる",
		kana: "なぞがふえてくる",
		romaji: "nazogafuetekuru",
	},
	{
		jp: "考察スレ多い",
		kana: "こうさつすれおおい",
		romaji: "kousatsusureoi",
	},
	{
		jp: "公式グッズ欲しい",
		kana: "こうしきぐっずほしい",
		romaji: "koushikiguzzuhoshii",
	},
	{
		jp: "限定版BOX購入",
		kana: "げんていばんぼっくすこうにゅう",
		romaji: "genteibanboksukounyuu",
	},
	{
		jp: "セットで販売中",
		kana: "せっとではんばいちゅう",
		romaji: "settonohanbaichu",
	},
	{
		jp: "特典付き予約開始",
		kana: "とくてんつきよやくかいし",
		romaji: "tokutentkuiyoyakukaishi",
	},
	{
		jp: "通販で購入",
		kana: "つうはんでこうにゅう",
		romaji: "tsuuhandekouyuu",
	},
	{
		jp: "店舗限定商品",
		kana: "てんぽげんていしょうひん",
		romaji: "tenpogeteiishohin",
	},
	{
		jp: "プリオーダー受付中",
		kana: "ぷりおーだーじゅふつちゅう",
		romaji: "preorderjufutsuchu",
	},
	{
		jp: "発売日まで待てない",
		kana: "はつばいびまでまてない",
		romaji: "hatsubaibimaadematetnai",
	},
	{
		jp: "楽しみすぎる",
		kana: "たのしみすぎる",
		romaji: "taznoshimisugiru",
	},
	{
		jp: "デジタル配信予定",
		kana: "でじたるはいしんよてい",
		romaji: "dijitaruhaisinyotei",
	},
	{
		jp: "見放題サービス",
		kana: "みほうだいさーびす",
		romaji: "mihodaiservice",
	},
	{
		jp: "ライセンス取得",
		kana: "らいせんすしゅとく",
		romaji: "licenceshutoku",
	},
	{
		jp: "権利問題がある",
		kana: "けんりもんだいがある",
		romaji: "kenmondaigaaru",
	},
	{
		jp: "放映権独占",
		kana: "ほうえいけんどくせん",
		romaji: "houeikendokusen",
	},
	{
		jp: "地上波放送決定",
		kana: "ちじょうはほうそうけってい",
		romaji: "chijouhahosoketei",
	},
	{
		jp: "深夜枠での放映",
		kana: "しんやわくでのほうえい",
		romaji: "shinyawakudenohoeei",
	},
	{
		jp: "再放送が決まった",
		kana: "さいほうそうがきまった",
		romaji: "saihosoukagakimata",
	},
	{
		jp: "見逃し配信あり",
		kana: "みのがしはいしんあり",
		romaji: "minogashihaishinari",
	},
	{
		jp: "タイムシフト視聴可",
		kana: "たいむしふときょうきゃく",
		romaji: "timeshiftshichoukyaku",
	},
	{
		jp: "画質選べます",
		kana: "がしつえらべます",
		romaji: "gashitsuerabemassu",
	},
	{
		jp: "音声選択可能",
		kana: "おんせいせんたくかのう",
		romaji: "onseisentakukanou",
	},
	{
		jp: "字幕多言語対応",
		kana: "じまくたげんごたいおう",
		romaji: "jimakutagenngotaiou",
	},
	{
		jp: "翻訳字幕あり",
		kana: "ほんやくじまくあり",
		romaji: "honyakujimakuari",
	},
	{
		jp: "吹き替え人気声優",
		kana: "ふきかえにんきせいゆう",
		romaji: "fukkikaeninkkiseiyuu",
	},
	{
		jp: "健康的な生活を心がけています",
		kana: "けんこうてきなせいかつをこころがけています",
		romaji: "kenkoutekiinaseikatsuwokokorogayaketeimasu",
	},
	{
		jp: "毎日運動しています",
		kana: "まいにちうんどうしています",
		romaji: "mainichiunndoushiteimasu",
	},
	{
		jp: "バランスの良い食事が大切です",
		kana: "ばらんすのよいしょくじがたいせつです",
		romaji: "baransunoyoishokujigataisetudesu",
	},
	{
		jp: "十分な睡眠をとることが重要です",
		kana: "じゅうぶんなすいみんをとることがじゅうようです",
		romaji: "juubunnnasuiminnwotorukotogajuuyoudesu",
	},
	{
		jp: "水を毎日飲むべきです",
		kana: "みずをまいにちのむべきです",
		romaji: "mizuwomainichinnomuberkidesu",
	},
	{
		jp: "医者に診てもらいました",
		kana: "いしゃにみてもらいました",
		romaji: "ishanmitemoraaimashita",
	},
	{
		jp: "病院へ行きました",
		kana: "びょういんへいきました",
		romaji: "byouinnheikimashita",
	},
	{
		jp: "薬を飲んでください",
		kana: "くすりをのんでください",
		romaji: "kusuriwonndekudasai",
	},
	{
		jp: "頭が痛いです",
		kana: "あたまがいたいです",
		romaji: "atamagaitadesu",
	},
	{
		jp: "お腹が痛いです",
		kana: "おなかがいたいです",
		romaji: "onakagaitadesu",
	},
	{
		jp: "風邪をひきました",
		kana: "かぜをひきました",
		romaji: "kazewohikimashita",
	},
	{
		jp: "咳が出ています",
		kana: "せきがでています",
		romaji: "sekigadeteimasu",
	},
	{
		jp: "喉が痛いです",
		kana: "のどがいたいです",
		romaji: "nodogaitadesu",
	},
	{
		jp: "鼻が詰まっています",
		kana: "はながつまっています",
		romaji: "hanatsumatteimasu",
	},
	{
		jp: "心臓の鼓動が聞こえます",
		kana: "しんぞうのこどうがきこえます",
		romaji: "shinzounokodougakikoemasu",
	},
	{
		jp: "血圧を測ります",
		kana: "けつあつをはかります",
		romaji: "ketsutatsuwohakariamasu",
	},
	{
		jp: "インフルエンザの予防接種を受けました",
		kana: "いんふるえんざのよぼうせっしゅをうけました",
		romaji: "innfuruenzanoyobouseshshuwoukkemashita",
	},
	{
		jp: "予防が大切です",
		kana: "よぼうがたいせつです",
		romaji: "yobougataisetudesu",
	},
	{
		jp: "栄養のある食べ物を食べます",
		kana: "えいようのあるたべものをたべます",
		romaji: "eiyounnoarutablemonowotabemasu",
	},
	{
		jp: "ビタミンを摂取します",
		kana: "びたみんをせっしゅします",
		romaji: "bitaminnwosesshuushimasu",
	},
	{
		jp: "タンパク質が必要です",
		kana: "たんぱくしつがひつようです",
		romaji: "tanpakushitugahitsuyoudesu",
	},
	{
		jp: "炭水化物も重要です",
		kana: "たんすいかぶつもじゅうようです",
		romaji: "tansuikabustsumojuuyoudesu",
	},
	{
		jp: "脂肪をあまり取らないようにします",
		kana: "しぼうをあまりとらないようにします",
		romaji: "shibouwoamaritorannaiyouninshimasu",
	},
	{
		jp: "カロリー計算をしています",
		kana: "かろりーけいさんをしています",
		romaji: "karorikeiasannwoshiteimasu",
	},
	{
		jp: "体重を測ります",
		kana: "たいじゅうをはかります",
		romaji: "taijuuwohakariamasu",
	},
	{
		jp: "ダイエットをしています",
		kana: "だいえっとをしています",
		romaji: "daietuowoshiteimasu",
	},
	{
		jp: "フィットネスが好きです",
		kana: "ふぃっとねすがすきです",
		romaji: "fitounesuugasukidesu",
	},
	{
		jp: "ジムに通っています",
		kana: "じむにかよっています",
		romaji: "jimunnikayoteimasu",
	},
	{
		jp: "ヨガをしています",
		kana: "よがをしています",
		romaji: "yogawoshiteimasu",
	},
	{
		jp: "ストレッチが良いです",
		kana: "すとれっちがよいです",
		romaji: "sutorettchigayoidesu",
	},
	{
		jp: "筋肉を鍛えます",
		kana: "きんにくをきたえます",
		romaji: "kinnikuwokitaemasu",
	},
	{
		jp: "腕が強いです",
		kana: "うでがつよいです",
		romaji: "udegatuyoidesu",
	},
	{
		jp: "脚が長いです",
		kana: "あしがながいです",
		romaji: "ashigganagaidesu",
	},
	{
		jp: "背が高いです",
		kana: "せがたかいです",
		romaji: "segatakaiddesu",
	},
	{
		jp: "体が柔軟です",
		kana: "からだがじゅうなんです",
		romaji: "karadagajuunnandesu",
	},
	{
		jp: "骨が丈夫です",
		kana: "ほねがじょうぶです",
		romaji: "honegajoubudesu",
	},
	{
		jp: "歯を磨きます",
		kana: "はをみがきます",
		romaji: "hawomiagakimasu",
	},
	{
		jp: "虫歯があります",
		kana: "むしばがあります",
		romaji: "mushibagaarimasu",
	},
	{
		jp: "歯医者に行きました",
		kana: "はいしゃにいきました",
		romaji: "haishanyiikimashita",
	},
	{
		jp: "歯ブラシで磨きます",
		kana: "はぶらしでみがきます",
		romaji: "haburashidemiagakimasu",
	},
	{
		jp: "歯茎が痛いです",
		kana: "はぐきがいたいです",
		romaji: "hagukigaitadesu",
	},
	{
		jp: "目が疲れています",
		kana: "めがつかれています",
		romaji: "megatsukareteiamasu",
	},
	{
		jp: "眼鏡をかけています",
		kana: "めがねをかけています",
		romaji: "meganewokaketeimasu",
	},
	{
		jp: "コンタクトレンズを使っています",
		kana: "こんたくとれんずをつかっています",
		romaji: "kontakutorenzzuwotsukatteimasu",
	},
	{
		jp: "目が悪いです",
		kana: "めがわるいです",
		romaji: "megawaruidesu",
	},
	{
		jp: "色盲ではありません",
		kana: "しきもうではありません",
		romaji: "shikimoumdehaarimasen",
	},
	{
		jp: "耳が聞こえます",
		kana: "みみがきこえます",
		romaji: "mimigakikoemmasu",
	},
	{
		jp: "耳が悪いです",
		kana: "みみがわるいです",
		romaji: "megawaruidesu",
	},
	{
		jp: "補聴器を使っています",
		kana: "ほちょうきをつかっています",
		romaji: "hochoukiwotsukatteimasu",
	},
	{
		jp: "鼻の病気があります",
		kana: "はなのびょうきがあります",
		romaji: "hanannobbyoukigaarimasu",
	},
	{
		jp: "花粉症です",
		kana: "かふんしょうです",
		romaji: "kafunnshoudesu",
	},
	{
		jp: "アレルギーがあります",
		kana: "あれるぎーがあります",
		romaji: "arerugigaarimasu",
	},
	{
		jp: "皮膚が敏感です",
		kana: "ひふがびんかんです",
		romaji: "hifugabinnkandesu",
	},
	{
		jp: "湿疹ができました",
		kana: "しっしんができました",
		romaji: "shisshinndeckimashita",
	},
	{
		jp: "肌がきれいです",
		kana: "はだがきれいです",
		romaji: "hadagakireidesu",
	},
	{
		jp: "日焼けしました",
		kana: "ひやけしました",
		romaji: "hiyakeshimashita",
	},
	{
		jp: "日焼け止めを塗ります",
		kana: "ひやけどめをぬります",
		romaji: "hiyakedomenunurimasu",
	},
	{
		jp: "スキンケアをしています",
		kana: "すきんけあをしています",
		romaji: "sukinkeawoshiteimasu",
	},
	{
		jp: "爪が長いです",
		kana: "つめがながいです",
		romaji: "tsumegaanagaidesu",
	},
	{
		jp: "爪を切ります",
		kana: "つめをきります",
		romaji: "tsumewokirimasuu",
	},
	{
		jp: "髪が長いです",
		kana: "かみがながいです",
		romaji: "kamigaanagaidesu",
	},
	{
		jp: "髪を洗います",
		kana: "かみをあらいます",
		romaji: "kamiwoareaimasu",
	},
	{
		jp: "シャンプーを使います",
		kana: "しゃんぷーをつかいます",
		romaji: "shanpuuwotsukaaimasu",
	},
	{
		jp: "トリートメントもします",
		kana: "とりーとめんともします",
		romaji: "tooritomenntomoshshimasu",
	},
	{
		jp: "リンスを使います",
		kana: "りんすをつかいます",
		romaji: "rinnsuwotsukaaimasu",
	},
	{
		jp: "ドライヤーで乾かします",
		kana: "どらいやーでかわかします",
		romaji: "doraiyardekawaakashimasu",
	},
	{
		jp: "髪が抜けています",
		kana: "かみがぬけています",
		romaji: "kamiganuketeiamasu",
	},
	{
		jp: "頭皮が痒いです",
		kana: "とうひがかゆいです",
		romaji: "touhigakayuiddesu",
	},
	{
		jp: "フケが出ています",
		kana: "ふけがでています",
		romaji: "fukegadeteimasu",
	},
	{
		jp: "白髪があります",
		kana: "しらがあります",
		romaji: "shiragaarimasu",
	},
	{
		jp: "禿げています",
		kana: "はげています",
		romaji: "hageteiamasu",
	},
	{
		jp: "パーマをかけました",
		kana: "ぱーまをかけました",
		romaji: "parrmawokakemashita",
	},
	{
		jp: "髪を染めました",
		kana: "かみをそめました",
		romaji: "kamiwosomemashita",
	},
	{
		jp: "顔を洗います",
		kana: "かおをあらいます",
		romaji: "kaowoareaimasu",
	},
	{
		jp: "洗顔フォームを使います",
		kana: "せんがんふぉーむをつかいます",
		romaji: "sennganfformmuwotsukaaimasu",
	},
	{
		jp: "化粧水をつけます",
		kana: "けしょうすいをつけます",
		romaji: "keshousuiwotsukkemasu",
	},
	{
		jp: "乳液を塗ります",
		kana: "にゅうえきをぬります",
		romaji: "nyuuekiwonurimasu",
	},
	{
		jp: "美容液を使います",
		kana: "びようえきをつかいます",
		romaji: "biyouekiwotsukaaimasu",
	},
	{
		jp: "ファンデーションを塗ります",
		kana: "ふぁんでーしょんをぬります",
		romaji: "fanndershounnwonurimasu",
	},
	{
		jp: "口紅を塗ります",
		kana: "くちべにをぬります",
		romaji: "kuchhibeniwonurimasu",
	},
	{
		jp: "マスカラを使います",
		kana: "ますからをつかいます",
		romaji: "maskarawotsukaaimasu",
	},
	{
		jp: "アイシャドウをします",
		kana: "あいしゃどうをします",
		romaji: "aishadouwoshimasu",
	},
	{
		jp: "アイブロウペンシルを使います",
		kana: "あいぶろうぺんしるをつかいます",
		romaji: "aiburoupennsiruwotsukaaimasu",
	},
	{
		jp: "コンシーラーで隠します",
		kana: "こんしーらーでかくします",
		romaji: "konnshirardekakushimasu",
	},
	{
		jp: "ブラッシャーをつけます",
		kana: "ぶらっしゃーをつけます",
		romaji: "burrassharwotsukkemasu",
	},
	{
		jp: "ハイライターを使います",
		kana: "はいらいたーをつかいます",
		romaji: "haiiraitarwotsukaaimasu",
	},
	{
		jp: "シェーディングをします",
		kana: "しぇーでぃんぐをします",
		romaji: "sheaderinnnguwoshimasu",
	},
	{
		jp: "メイク落としをします",
		kana: "めいくおとしをします",
		romaji: "meikuotoshiwoshimasu",
	},
	{
		jp: "お風呂に入ります",
		kana: "おふろにはいります",
		romaji: "ofuronihairimasu",
	},
	{
		jp: "シャワーを浴びます",
		kana: "しゃわーをあびます",
		romaji: "shawarwobabimasu",
	},
	{
		jp: "湯船に浸かります",
		kana: "ゆぶねにつかります",
		romaji: "yubunutsukarimasu",
	},
	{
		jp: "入浴は健康に良いです",
		kana: "にゅうよくはけんこうによいです",
		romaji: "nyuuyokuhakenkounituyoidesu",
	},
	{
		jp: "温度を調整します",
		kana: "おんどをちょうせいします",
		romaji: "ondowochousseishimasu",
	},
	{
		jp: "体を洗います",
		kana: "からだをあらいます",
		romaji: "karadawoareaimasu",
	},
	{
		jp: "石鹸を使います",
		kana: "せっけんをつかいます",
		romaji: "sekkennwotsukaaimasu",
	},
	{
		jp: "タオルで拭きます",
		kana: "たおるでふきます",
		romaji: "taordeufukimasu",
	},
	{
		jp: "汗をかきました",
		kana: "あせをかきました",
		romaji: "asewokakimashita",
	},
	{
		jp: "制汗剤を使います",
		kana: "せいかんざいをつかいます",
		romaji: "seikannzaiwotsukaaimasu",
	},
	{
		jp: "デオドラントを塗ります",
		kana: "でおどらんとをぬります",
		romaji: "deodoranttonurimasu",
	},
	{
		jp: "香水をつけます",
		kana: "こうすいをつけます",
		romaji: "kousuwotsukkemasu",
	},
	{
		jp: "体臭があります",
		kana: "たいしゅうがあります",
		romaji: "taishshuugaarimasu",
	},
	{
		jp: "口臭があります",
		kana: "こうしゅうがあります",
		romaji: "koushuugaarimasu",
	},
	{
		jp: "足が臭いです",
		kana: "あしがくさいです",
		romaji: "ashigakusaiddesu",
	},
	{
		jp: "靴の臭いが気になります",
		kana: "くつのにおいがきになります",
		romaji: "kutsunonioidegakininnarimasu",
	},
	{
		jp: "足の爪が長いです",
		kana: "あしのつめがながいです",
		romaji: "ashinotsumegaanagaiddesu",
	},
	{
		jp: "足を洗います",
		kana: "あしをあらいます",
		romaji: "ashiwoareaimasu",
	},
	{
		jp: "爪垢を取ります",
		kana: "つめあかをとります",
		romaji: "tsumeakawotoriamasu",
	},
	{
		jp: "マッサージをします",
		kana: "ますさーじをします",
		romaji: "massarrzjiwoshimasu",
	},
	{
		jp: "肩が凝っています",
		kana: "かたがこっています",
		romaji: "katagakotteimasu",
	},
	{
		jp: "背中が痛いです",
		kana: "せなかがいたいです",
		romaji: "senakagaitaiddesu",
	},
	{
		jp: "腰が痛いです",
		kana: "こしがいたいです",
		romaji: "koshigaitaiddesu",
	},
	{
		jp: "膝が痛いです",
		kana: "ひざがいたいです",
		romaji: "hizagaitaiddesu",
	},
	{
		jp: "足首が痛いです",
		kana: "あしくびがいたいです",
		romaji: "ashikubigaitaiddesu",
	},
	{
		jp: "肘が痛いです",
		kana: "ひじがいたいです",
		romaji: "hijigaitaiddesu",
	},
	{
		jp: "手首が痛いです",
		kana: "てくびがいたいです",
		romaji: "tekubigaitaiddesu",
	},
	{
		jp: "首が凝っています",
		kana: "くびがこっています",
		romaji: "kubigakotteimasu",
	},
	{
		jp: "首の痛みが取れません",
		kana: "くびのいたみがとれません",
		romaji: "kubinnoitamigatoremasen",
	},
	{
		jp: "骨折しました",
		kana: "こっせつしました",
		romaji: "kossetsushimashita",
	},
	{
		jp: "脱臼しました",
		kana: "だっきゅうしました",
		romaji: "dakkyuushimashita",
	},
	{
		jp: "捻挫しました",
		kana: "ねんざしました",
		romaji: "nennzashimashita",
	},
	{
		jp: "打撲しました",
		kana: "だぼくしました",
		romaji: "dabokushimashita",
	},
	{
		jp: "切り傷があります",
		kana: "きりきずがあります",
		romaji: "kirikizugaarimasu",
	},
	{
		jp: "すり傷があります",
		kana: "すりきずがあります",
		romaji: "surikizugaarimasu",
	},
	{
		jp: "火傷をしました",
		kana: "やけどをしました",
		romaji: "yakedouwoshimashita",
	},
	{
		jp: "包帯を巻きました",
		kana: "ほうたいをまきました",
		romaji: "houtaiwomakimashita",
	},
	{
		jp: "湿布を貼ります",
		kana: "しっぷをはります",
		romaji: "shipuwohariamasu",
	},
	{
		jp: "医療用テープを使います",
		kana: "いりょうようてーぷをつかいます",
		romaji: "iryouyoutepuwotsukaaimasu",
	},
	{
		jp: "リハビリテーションが必要です",
		kana: "りはびりてーしょんがひつようです",
		romaji: "rihabiritershoungahitsuyoudesu",
	},
	{
		jp: "松葉杖を使います",
		kana: "まつばづえをつかいます",
		romaji: "matsutsubaduewotsukaaimasu",
	},
	{
		jp: "車椅子が必要です",
		kana: "くるまいすがひつようです",
		romaji: "kurumasuugahitsuyoudesu",
	},
	{
		jp: "杖を使っています",
		kana: "つえをつかっています",
		romaji: "tsuewotsukatteimasu",
	},
	{
		jp: "手術を受けました",
		kana: "しゅじゅつをうけました",
		romaji: "shujutsuwoukkemashita",
	},
	{
		jp: "麻酔をします",
		kana: "ますいをします",
		romaji: "masuiwoshimasu",
	},
	{
		jp: "血液検査を受けました",
		kana: "けつえきけんさをうけました",
		romaji: "ketsuekikkensawoukkemashita",
	},
	{
		jp: "尿検査をしました",
		kana: "にょうけんさをしました",
		romaji: "nyoukennasawoshimashita",
	},
	{
		jp: "Xレイを撮りました",
		kana: "えっくすれいをとりました",
		romaji: "ekkusureiwotoriamashita",
	},
	{
		jp: "超音波検査を受けました",
		kana: "ちょうおんぱけんさをうけました",
		romaji: "chouounnpakennasawoukkemashita",
	},
	{
		jp: "ＣＴスキャンをしました",
		kana: "しーてぃーすきゃんをしました",
		romaji: "sitisukkyannwoshimashita",
	},
	{
		jp: "ＭＲＩ検査を受けました",
		kana: "えむあーるあいけんさをうけました",
		romaji: "emuarruaikennasawoukkemashita",
	},
	{
		jp: "内視鏡検査を受けました",
		kana: "ないしきょうけんさをうけました",
		romaji: "naishikyoukennasawoukkemashita",
	},
	{
		jp: "血糖値を測ります",
		kana: "けっとうちをはかります",
		romaji: "kettouchiwohakariamasu",
	},
	{
		jp: "コレステロール値が高いです",
		kana: "これすてろーるちがたかいです",
		romaji: "koresterorutsugatakaidesu",
	},
	{
		jp: "中性脂肪が多いです",
		kana: "ちゅうせいしぼうがおおいです",
		romaji: "chuuseishibouygaooidesu",
	},
	{
		jp: "ＨＤＬコレステロールが低いです",
		kana: "えいちでぃーえるこれすてろーるがひくいです",
		romaji: "eidierukoresteroruugahikuidesu",
	},
	{
		jp: "糖尿病があります",
		kana: "とうにょうびょうがあります",
		romaji: "tounyoubbyougaarimasu",
	},
	{
		jp: "インスリンを注射します",
		kana: "いんすりんをちゅうしゃします",
		romaji: "innsurinnwochuushashimasu",
	},
	{
		jp: "高血圧があります",
		kana: "こうけつあつがあります",
		romaji: "kousketsuatsugaarimasu",
	},
	{
		jp: "低血圧です",
		kana: "ていけつあつです",
		romaji: "teiketsutatsidesu",
	},
	{
		jp: "貧血があります",
		kana: "ひんけつがあります",
		romaji: "hinnketsugaarimasu",
	},
	{
		jp: "心臓病があります",
		kana: "しんぞうびょうがあります",
		romaji: "shinzoubyoulgaarimasu",
	},
	{
		jp: "心筋梗塞のリスクがあります",
		kana: "しんきんこうそくのりすくがあります",
		romaji: "shinnkinnkousokunorisukugaarimasu",
	},
	{
		jp: "脳卒中の予防をしています",
		kana: "のうそっちゅうのよぼうをしています",
		romaji: "nousottchuunoyobouwoshiteimasu",
	},
	{
		jp: "肺の病気があります",
		kana: "はいのびょうきがあります",
		romaji: "hainnobyoukigaarimasu",
	},
	{
		jp: "喘息です",
		kana: "ぜんそくです",
		romaji: "zennsoukudesu",
	},
	{
		jp: "肺炎の治療をしています",
		kana: "はいえんのちりょうをしています",
		romaji: "haienn no chiriryouwoshiteimasu",
	},
	{
		jp: "胃の痛みがあります",
		kana: "いのいたみがあります",
		romaji: "innoitamigaarimasu",
	},
	{
		jp: "胃潰瘍があります",
		kana: "いかいようがあります",
		romaji: "ikaiyougaarimasu",
	},
	{
		jp: "便秘に困っています",
		kana: "べんぴにこまっています",
		romaji: "bennpinnikomatteimasu",
	},
	{
		jp: "下痢をしています",
		kana: "げりをしています",
		romaji: "geriwoshiteimasu",
	},
	{
		jp: "食中毒になりました",
		kana: "しょくちゅうどくになりました",
		romaji: "shokuchuudokunninarimashita",
	},
	{
		jp: "肝臓が悪いです",
		kana: "かんぞうがわるいです",
		romaji: "kanzoungawaruidesu",
	},
	{
		jp: "腎臓の病気があります",
		kana: "じんぞうのびょうきがあります",
		romaji: "jinzounnobyoukigaarimasu",
	},
	{
		jp: "尿路感染があります",
		kana: "にょうろかんせんがあります",
		romaji: "nyourokannsenngaarimasu",
	},
	{
		jp: "膀胱炎です",
		kana: "ぼうこうえんです",
		romaji: "boukouenindesu",
	},
	{
		jp: "性病を心配しています",
		kana: "せいびょうをしんぱいしています",
		romaji: "seibyouwoshinnpaisushiteimasu",
	},
	{
		jp: "ガンの検査を受けました",
		kana: "がんのけんさをうけました",
		romaji: "gannnokennasawoukkemashita",
	},
	{
		jp: "抗がん剤を使っています",
		kana: "こうがんざいをつかっています",
		romaji: "kouganzaiwotsukatteimasu",
	},
	{
		jp: "化学療法を受けています",
		kana: "かがくりょうほうをうけています",
		romaji: "kagakuriouhouuwouketeiamasu",
	},
	{
		jp: "放射線療法を受けました",
		kana: "ほうしゃせんりょうほうをうけました",
		romaji: "househasennriouhouuwoukkemashita",
	},
	{
		jp: "免疫療法を試しています",
		kana: "めんえきりょうほうをこころみています",
		romaji: "mennnekiriouhouuwokkoroimiteiamasu",
	},
	{
		jp: "うつ病です",
		kana: "うつびょうです",
		romaji: "utsubyoudesu",
	},
	{
		jp: "精神的な問題があります",
		kana: "せいしんてきなもんだいがあります",
		romaji: "seishinntekinnnamonndaigaarimasu",
	},
	{
		jp: "不安症があります",
		kana: "ふあんしょうがあります",
		romaji: "fuannshouugaarimasu",
	},
	{
		jp: "パニック障害があります",
		kana: "ぱにっくしょうがいがあります",
		romaji: "panikkushouugaigaarimasu",
	},
	{
		jp: "適応障害です",
		kana: "てきおうしょうがいです",
		romaji: "tekioushouugaiddesu",
	},
	{
		jp: "統合失調症があります",
		kana: "とうごうしっちょうしょうがあります",
		romaji: "tougousshittchouushougaarimasu",
	},
	{
		jp: "アルコール依存症があります",
		kana: "あるこーるいぞんしょうがあります",
		romaji: "arukoruuizonshouugaarimasu",
	},
	{
		jp: "薬物中毒です",
		kana: "やくぶつちゅうどくです",
		romaji: "yakubustsuchuudokdudesu",
	},
	{
		jp: "認知症のテストを受けました",
		kana: "にんちしょうのてすとをうけました",
		romaji: "ninntchishouunotesutowoukkemashita",
	},
	{
		jp: "アルツハイマー病があります",
		kana: "あるつはいまーびょうがあります",
		romaji: "arutsuhaimar-byougaarimasu",
	},
	{
		jp: "睡眠障害があります",
		kana: "すいみんしょうがいがあります",
		romaji: "suimminnshouugaigaarimasu",
	},
	{
		jp: "不眠症です",
		kana: "ふみんしょうです",
		romaji: "fuminnshouddesu",
	},
	{
		jp: "悪夢を見ます",
		kana: "あくむをみます",
		romaji: "akumuwomimasu",
	},
	{
		jp: "過労が続いています",
		kana: "かろうがつづいています",
		romaji: "karougugatsuzuiteiamasu",
	},
	{
		jp: "視力が低下しています",
		kana: "しりょくがていかしています",
		romaji: "shiryokugateikashiteimasu",
	},
	{
		jp: "遠視です",
		kana: "えんしです",
		romaji: "enshidesu",
	},
	{
		jp: "近視です",
		kana: "きんしです",
		romaji: "kinshidesu",
	},
	{
		jp: "乱視があります",
		kana: "らんしがあります",
		romaji: "ranshigaarimasu",
	},
	{
		jp: "老眼が出ました",
		kana: "ろうがんがでました",
		romaji: "rougannngaddemashita",
	},
	{
		jp: "妊娠しています",
		kana: "にんしんしています",
		romaji: "ninnshinshiteimasu",
	},
	{
		jp: "陣痛が始まりました",
		kana: "じんつうがはじまりました",
		romaji: "jinntsuugahajimariamashita",
	},
	{
		jp: "分娩が進みます",
		kana: "ぶんべんがすすみます",
		romaji: "bunbennngasusumimasu",
	},
	{
		jp: "母乳を与えます",
		kana: "ぼにゅうをあたえます",
		romaji: "bonyuuwoadaemasu",
	},
	{
		jp: "おむつを替えます",
		kana: "おむつをかえます",
		romaji: "omutsuwokkaemasu",
	},
	{
		jp: "予防接種を受けます",
		kana: "よぼうせっしゅをうけます",
		romaji: "yobouseshshuwoukkemasu",
	},
	{
		jp: "健康診断を受けました",
		kana: "けんこうしんだんをうけました",
		romaji: "kenkoushindannwoukkemashita",
	},
	{
		jp: "持病があります",
		kana: "じびょうがあります",
		romaji: "jibyougaarimasu",
	},
	{
		jp: "定期検診を受けています",
		kana: "ていきけんしんをうけています",
		romaji: "teikikenshinuwouketeiamasu",
	},
	{
		jp: "医学的アドバイスが必要です",
		kana: "いがくてきあどばいすがひつようです",
		romaji: "igakutekiadovaizugahitsuyoudesu",
	},
	{
		jp: "縄文時代は一万年前から始まりました",
		kana: "じょうもんじだいはいちまんねんまえからはじまりました",
		romaji: "jyoumonjidaihaichimannenmaekarahajimarimashita",
	},
	{
		jp: "弥生時代に稲作が伝わった",
		kana: "やよいじだいにとうさくがつたわった",
		romaji: "yayoijidainitousakugatsutawaっta",
	},
	{
		jp: "古墳時代は大きな墓が作られた",
		kana: "こふんじだいはおおきなはかがつくられた",
		romaji: "kofunjidaihaookinahakagatsukurareta",
	},
	{
		jp: "飛鳥時代に仏教が伝来した",
		kana: "あすかじだいにぶっきょうがでんらいした",
		romaji: "asukajidainibuっkyougadenraishita",
	},
	{
		jp: "奈良時代に東大寺が建立された",
		kana: "ならじだいにとうだいじがこんりゅうされた",
		romaji: "narajidainitoudaijigakonryuusareta",
	},
	{
		jp: "平安時代は京都が首都だった",
		kana: "へいあんじだいはきょうとがしゅとだった",
		romaji: "heianjidaihakyoutogashyutodaっta",
	},
	{
		jp: "鎌倉時代に幕府が開かれた",
		kana: "かまくらじだいにばくふがひらかれた",
		romaji: "kamakurajidainibakufugahirakareta",
	},
	{
		jp: "室町時代は応仁の乱で混乱した",
		kana: "むろまちじだいはおうにんのらんでこんらんした",
		romaji: "muromachijidaihaouninnorandekonranshita",
	},
	{
		jp: "戦国時代は多くの大名が争った",
		kana: "せんごくじだいはおおくのだいみょうがあらそった",
		romaji: "sengokujidaihaookunodaimyougaarasoっta",
	},
	{
		jp: "織田信長は天下統一を目指した",
		kana: "おだのぶながはてんかとういつをめざした",
		romaji: "odanobunagahatenkatouitsuwomezashita",
	},
	{
		jp: "豊臣秀吉は全国統一を成し遂げた",
		kana: "とよとみひでよしはぜんこくとういつをなしとげた",
		romaji: "toyotomihideyoshihazenkokutouitsuwonashitogeta",
	},
	{
		jp: "江戸時代は二百年以上続いた",
		kana: "えどじだいはにひゃくねんいじょうつづいた",
		romaji: "edojidaihanihyakunenijyoutsuduita",
	},
	{
		jp: "徳川家康は江戸幕府を開いた",
		kana: "とくがわいえやすはえどばくふをひらいた",
		romaji: "tokugawaieyasuhaedobakufuwohiraita",
	},
	{
		jp: "ペリー提督の黒船が来航した",
		kana: "ぺりーていとくのくろふねがらいこうした",
		romaji: "periteitokunokurofunegaraikoushita",
	},
	{
		jp: "明治維新で日本は近代化した",
		kana: "めいじいしんでにほんはきんだいかした",
		romaji: "meijiishindenihonhakindaikashita",
	},
	{
		jp: "富国強兵政策が推し進められた",
		kana: "ふこくきょうへいせいさくがおしすすめられた",
		romaji: "fukokukyouheiseisakugaoshisusumerareta",
	},
	{
		jp: "日清戦争は千八百九十四年だった",
		kana: "にっしんせんそうはせんはっぴゃくきゅうじゅうよねんだった",
		romaji: "niっshinsensouhasenhaっpyakukyuujyuuyonendaっta",
	},
	{
		jp: "日露戦争で日本は勝利した",
		kana: "にちろせんそうでにほんはしょうりした",
		romaji: "nichirosensoudenihonhashyourishita",
	},
	{
		jp: "大正時代は民主主義の時代だった",
		kana: "たいしょうじだいはみんしゅしゅぎのじだいだった",
		romaji: "taishyoujidaihaminshyushyuginojidaidaっta",
	},
	{
		jp: "昭和時代は長く続いた時代である",
		kana: "しょうわじだいはながくつづいたじだいである",
		romaji: "shyouwajidaihanagakutsuduitajidaidearu",
	},
	{
		jp: "太平洋戦争は昭和十六年に始まった",
		kana: "たいへいようせんそうはしょうわじゅうろくねんにはじまった",
		romaji: "taiheiyousensouhashyouwajyuurokunennihajimaっta",
	},
	{
		jp: "広島に原爆が落とされた",
		kana: "ひろしまにげんばくがおとされた",
		romaji: "hiroshimanigenbakugaotosareta",
	},
	{
		jp: "長崎にも原爆が投下された",
		kana: "ながさきにもげんばくがとうかされた",
		romaji: "nagasakinimogenbakugatoukasareta",
	},
	{
		jp: "日本は昭和二十年に降伏した",
		kana: "にほんはしょうわにじゅうねんにこうふくした",
		romaji: "nihonhashyouwanijyuunennikoufukushita",
	},
	{
		jp: "占領時代にアメリカ軍が駐留した",
		kana: "せんりょうじだいにあめりかぐんがちゅうりゅうした",
		romaji: "senryoujidainiamerikagungachyuuryuushita",
	},
	{
		jp: "新憲法は民主主義を基本とした",
		kana: "しんけんぽうはみんしゅしゅぎをきほんとした",
		romaji: "shinkenpouhaminshyushyugiwokihontoshita",
	},
	{
		jp: "昭和天皇は象徴天皇制を受け入れた",
		kana: "しょうわてんのうはしょうちょうてんのうせいをうけいれた",
		romaji: "shyouwatennouhashyouchyoutennouseiwoukeireta",
	},
	{
		jp: "平成時代はバブルの時代だった",
		kana: "へいせいじだいはばぶるのじだいだった",
		romaji: "heiseijidaihababurunojidaidaっta",
	},
	{
		jp: "高度経済成長期は急速に発展した",
		kana: "こうどけいざいせいちょうきはきゅうそくにはってんした",
		romaji: "koudokeizaiseichyoukihakyuusokunihaっtenshita",
	},
	{
		jp: "令和時代は令和元年から始まった",
		kana: "れいわじだいはれいわがんねんからはじまった",
		romaji: "reiwajidaihareiwagannenkarahajimaっta",
	},
	{
		jp: "日本は四つの大きな島からなる",
		kana: "にほんはよつのおおきなしまからなる",
		romaji: "nihonhayotsunoookinashimakaranaru",
	},
	{
		jp: "北海道は日本で一番北にある",
		kana: "ほっかいどうはにほんでいちばんきたにある",
		romaji: "hoっkaidouhanihondeichibankitaniaru",
	},
	{
		jp: "本州は日本で一番大きい島だ",
		kana: "ほんしゅうはにほんでいちばんおおきいしまだ",
		romaji: "honshyuuhanihondeichibanookiishimada",
	},
	{
		jp: "四国は四つの県に分かれている",
		kana: "しこくはよつのけんにわかれている",
		romaji: "shikokuhayotsunokenniwakareteiru",
	},
	{
		jp: "九州は南西にある大きな島である",
		kana: "きゅうしゅうはなんせいにあるおおきなしまである",
		romaji: "kyuushyuuhananseiniaruookinashimadearu",
	},
	{
		jp: "富士山は日本で一番高い山だ",
		kana: "ふじさんはにほんでいちばんたかいやまだ",
		romaji: "fujisanhanihondeichibantakaiyamada",
	},
	{
		jp: "琵琶湖は日本で一番大きい湖だ",
		kana: "びわこはにほんでいちばんおおきいこだ",
		romaji: "biwakohanihondeichibanookiikoda",
	},
	{
		jp: "東京は日本の首都である",
		kana: "とうきょうはにほんのしゅとである",
		romaji: "toukyouhanihonnoshyutodearu",
	},
	{
		jp: "京都は千年以上の歴史がある",
		kana: "きょうとはせんねんいじょうのれきしがある",
		romaji: "kyoutohasennenijyounorekishigaaru",
	},
	{
		jp: "大阪は商業の中心地である",
		kana: "おおさかはしょうぎょうのちゅうしんちである",
		romaji: "oosakahashyougyounochyuushinchidearu",
	},
	{
		jp: "アメリカは西半球で最大の国だ",
		kana: "あめりかはにしはんきゅうでさいだいのくにだ",
		romaji: "amerikahanishihankyuudesaidainokunida",
	},
	{
		jp: "ロシアは世界で一番広い国である",
		kana: "ろしあはせかいでいちばんひろいくにである",
		romaji: "roshiahasekaideichibanhiroikunidearu",
	},
	{
		jp: "中国は世界で一番人口が多い",
		kana: "ちゅうごくはせかいでいちばんじんこうがおおい",
		romaji: "chyuugokuhasekaideichibanjinkougaooi",
	},
	{
		jp: "インドは南アジアで最大の国だ",
		kana: "いんどはみなみあじあでさいだいのくにだ",
		romaji: "indohaminamiajiadesaidainokunida",
	},
	{
		jp: "オーストラリアは大陸で一番広い",
		kana: "おーすとらりあはたいりくでいちばんひろい",
		romaji: "osutorariahatairikudeichibanhiroi",
	},
	{
		jp: "アフリカは五十四の国があります",
		kana: "あふりかはごじゅうよんのくにがあります",
		romaji: "afurikahagojyuuyonnokunigaarimasu",
	},
	{
		jp: "ヨーロッパは多くの国で構成される",
		kana: "よーろっぱはおおくのくにでこうせいされる",
		romaji: "yoroっpahaookunokunidekouseisareru",
	},
	{
		jp: "南米はスペイン語が主流である",
		kana: "なんべいはすぺいんごがしゅりゅうである",
		romaji: "nanbeihasupeingogashyuryuudearu",
	},
	{
		jp: "アラビア半島は石油が豊富である",
		kana: "あらびあはんとうはせきゆがほうふである",
		romaji: "arabiahantouhasekiyugahoufudearu",
	},
	{
		jp: "シベリアは世界で最大の平原だ",
		kana: "しべりあはせかいでさいだいのへいげんだ",
		romaji: "shiberiahasekaidesaidainoheigenda",
	},
	{
		jp: "茶道は日本の伝統文化である",
		kana: "ちゃどうはにほんのでんとうぶんかである",
		romaji: "chyadouhanihonnodentoubunkadearu",
	},
	{
		jp: "花道は花を生ける芸術である",
		kana: "かどうははなをいけるげいじゅつである",
		romaji: "kadouhahanawoikerugeijyutsudearu",
	},
	{
		jp: "武道は心と体を鍛える道である",
		kana: "ぶどうはこころとからだをきたえるみちである",
		romaji: "budouhakokorotokaradawokitaerumichidearu",
	},
	{
		jp: "相撲は日本の国技である",
		kana: "すもうはにほんのこくぎである",
		romaji: "sumouhanihonnokokugidearu",
	},
	{
		jp: "歌舞伎は江戸時代から続く芸能だ",
		kana: "かぶきはえどじだいからつづくげいのうだ",
		romaji: "kabukihaedojidaikaratsudukugeinouda",
	},
	{
		jp: "能は中世から伝わる古い芸術だ",
		kana: "のうはちゅうせいからつたわるふるいげいじゅつだ",
		romaji: "nouhachyuuseikaratsutawarufuruigeijyutsuda",
	},
	{
		jp: "お正月は日本で最も大切な祝いだ",
		kana: "おしょうがつはにほんでもっともたいせつないわいだ",
		romaji: "oshyougatsuhanihondemoっtomotaisetsunaiwaida",
	},
	{
		jp: "七夕は夏の重要な行事である",
		kana: "たなばたはなつのじゅうようなぎょうじである",
		romaji: "tanabatahanatsunojyuuyounagyoujidearu",
	},
	{
		jp: "盆踊りは夏に楽しむ伝統である",
		kana: "ぼんおどりはなつにたのしむでんとうである",
		romaji: "bonodorihanatsunitanoshimudentoudearu",
	},
	{
		jp: "紅葉狩りは秋の楽しみである",
		kana: "こうようがりはあきのたのしみである",
		romaji: "kouyougarihaakinotanoshimidearu",
	},
	{
		jp: "寿司は日本を代表する料理だ",
		kana: "すしはにほんをだいひょうするりょうりだ",
		romaji: "sushihanihonwodaihyousururyourida",
	},
	{
		jp: "天ぷらは江戸時代に流行した",
		kana: "てんぷらはえどじだいにりゅうこうした",
		romaji: "tenpurahaedojidainiryuukoushita",
	},
	{
		jp: "味噌汁は毎日の食事に欠かせない",
		kana: "みそしるはまいにちのしょくじにかかせない",
		romaji: "misoshiruhamainichinoshyokujinikakasenai",
	},
	{
		jp: "そばは日本の伝統的な食べ物だ",
		kana: "そばはにほんのでんとうてきなたべものだ",
		romaji: "sobahanihonnodentoutekinatabemonoda",
	},
	{
		jp: "うどんは香川県の名産品である",
		kana: "うどんはかがわけんのめいさんぴんである",
		romaji: "udonhakagawakennomeisanpindearu",
	},
	{
		jp: "抹茶は茶道で使う特別な緑茶だ",
		kana: "まっちゃはちゃどうでつかうとくべつなりょくちゃだ",
		romaji: "maっchyahachyadoudetsukautokubetsunaryokuchyada",
	},
	{
		jp: "日本酒は米で作られる飲み物だ",
		kana: "にほんしゅはこめでつくられるのみものだ",
		romaji: "nihonshyuhakomedetsukurarerunomimonoda",
	},
	{
		jp: "醤油は日本料理に欠かせません",
		kana: "しょうゆはにほんりょうりにかかせません",
		romaji: "shyouyuhanihonryourinikakasemasen",
	},
	{
		jp: "漬物は日本人が古くから食べる",
		kana: "つけものはにほんじんがふるくからたべる",
		romaji: "tsukemonohanihonjingafurukukarataberu",
	},
	{
		jp: "弁当は日本を代表する食文化だ",
		kana: "べんとうはにほんをだいひょうするしょくぶんかだ",
		romaji: "bentouhanihonwodaihyousurushyokubunkada",
	},
	{
		jp: "日本語は三つの文字体系を持つ",
		kana: "にほんごはみつのもじたいけいをもつ",
		romaji: "nihongohamitsunomojitaikeiwomotsu",
	},
	{
		jp: "ひらがなは日本固有の文字である",
		kana: "ひらがなはにほんこゆうのもじである",
		romaji: "hiraganahanihonkoyuunomojidearu",
	},
	{
		jp: "カタカナは外来語に使われる",
		kana: "かたかなはがいらいごにつかわれる",
		romaji: "katakanahagairaigonitsukawareru",
	},
	{
		jp: "漢字は中国から伝わった文字だ",
		kana: "かんじはちゅうごくからつたわったもじだ",
		romaji: "kanjihachyuugokukaratsutawaっtamojida",
	},
	{
		jp: "義務教育は六年間の小学校である",
		kana: "ぎむきょういくはろくねんかんのしょうがっこうである",
		romaji: "gimukyouikuharokunenkannoshyougaっkoudearu",
	},
	{
		jp: "中学校は三年間の教育機関だ",
		kana: "ちゅうがっこうはさんねんかんのきょういくきかんだ",
		romaji: "chyuugaっkouhasannenkannokyouikukikanda",
	},
	{
		jp: "高等学校は高度な教育を提供する",
		kana: "こうとうがっこうはこうどなきょういくをていきょうする",
		romaji: "koutougaっkouhakoudonakyouikuwoteikyousuru",
	},
	{
		jp: "大学は高等教育の最高機関である",
		kana: "だいがくはこうとうきょういくのさいこうきかんである",
		romaji: "daigakuhakoutoukyouikunosaikoukikandearu",
	},
	{
		jp: "識字率は日本で非常に高い",
		kana: "しきじりつはにほんでひじょうにたかい",
		romaji: "shikijiritsuhanihondehijyounitakai",
	},
	{
		jp: "学問は知識を得る重要な手段だ",
		kana: "がくもんはちしきをえるじゅうようなしゅだんだ",
		romaji: "gakumonhachishikiwoerujyuuyounashyudanda",
	},
	{
		jp: "神道は日本古来の宗教である",
		kana: "しんとうはにほんこらいのしゅうきょうである",
		romaji: "shintouhanihonkorainoshyuukyoudearu",
	},
	{
		jp: "仏教は六世紀に日本に伝わった",
		kana: "ぶっきょうはろくせいきににほんにつたわった",
		romaji: "buっkyouharokuseikininihonnitsutawaっta",
	},
	{
		jp: "儒教は東アジアで広く信仰される",
		kana: "じゅきょうはひがしあじあでひろくしんこうされる",
		romaji: "jyukyouhahigashiajiadehirokushinkousareru",
	},
	{
		jp: "禅宗は仏教の一派である",
		kana: "ぜんしゅうはぶっきょうのいっぱである",
		romaji: "zenshyuuhabuっkyounoiっpadearu",
	},
	{
		jp: "浄土宗は阿弥陀仏を信仰する",
		kana: "じょうどしゅうはあみだぶつをしんこうする",
		romaji: "jyoudoshyuuhaamidabutsuwoshinkousuru",
	},
	{
		jp: "神社は神道の礼拝所である",
		kana: "じんじゃはしんとうのれいはいじょである",
		romaji: "jinjyahashintounoreihaijyodearu",
	},
	{
		jp: "寺院は仏教の修行の場である",
		kana: "じいんはぶっきょうのしゅぎょうのばである",
		romaji: "jiinhabuっkyounoshyugyounobadearu",
	},
	{
		jp: "鳥居は神社の入口に立つ",
		kana: "とりいはじんじゃのいりぐちにたつ",
		romaji: "toriihajinjyanoiriguchinitatsu",
	},
	{
		jp: "仏像は仏教美術の重要な作品だ",
		kana: "ぶつぞうはぶっきょうびじゅつのじゅうようなさくひんだ",
		romaji: "butsuzouhabuっkyoubijyutsunojyuuyounasakuhinda",
	},
	{
		jp: "お守りは神社で買うお札である",
		kana: "おまもりはじんじゃでかうおふだである",
		romaji: "omamorihajinjyadekauofudadearu",
	},
	{
		jp: "江戸時代は身分制度が厳しかった",
		kana: "えどじだいはしんぶんせいどがきびしかった",
		romaji: "edojidaihashinbunseidogakibishikaっta",
	},
	{
		jp: "武士は侍とも呼ばれる社会階級だ",
		kana: "ぶしはさむらいともよばれるしゃかいかいきゅうだ",
		romaji: "bushihasamuraitomoyobarerushyakaikaikyuuda",
	},
	{
		jp: "農民は江戸時代の多数派だった",
		kana: "のうみんはえどじだいのたすうはだった",
		romaji: "nouminhaedojidainotasuuhadaっta",
	},
	{
		jp: "町人は商業に従事する階級である",
		kana: "ちょうにんはしょうぎょうにじゅうじするかいきゅうである",
		romaji: "chyouninhashyougyounijyuujisurukaikyuudearu",
	},
	{
		jp: "戸籍制度は古くから存在した",
		kana: "こせきせいどはふるくからそんざいした",
		romaji: "kosekiseidohafurukukarasonzaishita",
	},
	{
		jp: "家族制度は日本社会の基礎である",
		kana: "かぞくせいどはにほんしゃかいのきそである",
		romaji: "kazokuseidohanihonshyakainokisodearu",
	},
	{
		jp: "家父長制は戦前まで続いた",
		kana: "かふちょうせいはせんぜんまでつづいた",
		romaji: "kafuchyouseihasenzenmadetsuduita",
	},
	{
		jp: "男女平等は戦後の憲法で保障された",
		kana: "だんじょびょうどうはせんごのけんぽうでほしょうされた",
		romaji: "danjyobyoudouhasengonokenpoudehoshyousareta",
	},
	{
		jp: "参政権は成人に与えられる権利だ",
		kana: "さんせいけんはせいじんにあたえられるけんりだ",
		romaji: "sanseikenhaseijinniataerarerukenrida",
	},
	{
		jp: "法の下の平等は近代社会の原則だ",
		kana: "ほうのもとのびょうどうはきんだいしゃかいのげんそくだ",
		romaji: "hounomotonobyoudouhakindaishyakainogensokuda",
	},
	{
		jp: "日本は温帯気候に属する国である",
		kana: "にほんはおんたいきこうにぞくするくにである",
		romaji: "nihonhaontaikikounizokusurukunidearu",
	},
	{
		jp: "季節は四つに分かれている",
		kana: "きせつはよつにわかれている",
		romaji: "kisetsuhayotsuniwakareteiru",
	},
	{
		jp: "梅雨は初夏に降る雨である",
		kana: "つゆはしょかにふるあめである",
		romaji: "tsuyuhashyokanifuruamedearu",
	},
	{
		jp: "台風は夏から秋に発生する",
		kana: "たいふうはなつからあきにはっせいする",
		romaji: "taifuuhanatsukaraakinihaっseisuru",
	},
	{
		jp: "雪は北海道や東北で多く降る",
		kana: "ゆきはほっかいどうやとうほくでおおくふる",
		romaji: "yukihahoっkaidouyatouhokudeookufuru",
	},
	{
		jp: "森林は日本の面積の多くを占める",
		kana: "しんりんはにほんのめんせきのおおくをしめる",
		romaji: "shinrinhanihonnomensekinoookuwoshimeru",
	},
	{
		jp: "日本アルプスは険しい山地だ",
		kana: "にほんあるぷすはけわしいさんちだ",
		romaji: "nihonarupusuhakewashiisanchida",
	},
	{
		jp: "瀬戸内海は穏やかな海である",
		kana: "せとないかいはおだやかなうみである",
		romaji: "setonaikaihaodayakanaumidearu",
	},
	{
		jp: "黒潮は日本の東側を流れる海流だ",
		kana: "くろしおはにほんのひがしがわをながれるかいりゅうだ",
		romaji: "kuroshiohanihonnohigashigawawonagarerukairyuuda",
	},
	{
		jp: "地震は日本で頻繁に起こる",
		kana: "じしんはにほんでひんぱんにおこる",
		romaji: "jishinhanihondehinpanniokoru",
	},
	{
		jp: "シルクロードは古くからの貿易路だ",
		kana: "しるくろーどはふるくからのぼうえきろだ",
		romaji: "shirukurodohafurukukaranobouekiroda",
	},
	{
		jp: "鑑真は唐から日本に来た僧である",
		kana: "がんじんはとうからにほんにきたそうである",
		romaji: "ganjinhatoukaranihonnikitasoudearu",
	},
	{
		jp: "遣唐使は中国に派遣された使者だ",
		kana: "けんとうしはちゅうごくにはけんされたししゃだ",
		romaji: "kentoushihachyuugokunihakensaretashishyada",
	},
	{
		jp: "遣明使は明の時代に派遣された",
		kana: "けんめいしはみんのじだいにはけんされた",
		romaji: "kenmeishihaminnojidainihakensareta",
	},
	{
		jp: "ポルトガル人は十六世紀に来日した",
		kana: "ぽるとがるじんはじゅうろくせいきにらいにちした",
		romaji: "porutogarujinhajyuurokuseikinirainichishita",
	},
	{
		jp: "南蛮貿易は大きな商業活動だった",
		kana: "なんばんぼうえきはおおきなしょうぎょうかつどうだった",
		romaji: "nanbanbouekihaookinashyougyoukatsudoudaっta",
	},
	{
		jp: "キリスト教は戦国時代に流入した",
		kana: "きりすときょうはせんごくじだいにりゅうにゅうした",
		romaji: "kirisutokyouhasengokujidainiryuunyuushita",
	},
	{
		jp: "鎖国政策は二百年以上続いた",
		kana: "さこくせいさくはにひゃくねんいじょうつづいた",
		romaji: "sakokuseisakuhanihyakunenijyoutsuduita",
	},
	{
		jp: "蘭学は江戸時代に発展した学問だ",
		kana: "らんがくはえどじだいにはってんしたがくもんだ",
		romaji: "rangakuhaedojidainihaっtenshitagakumonda",
	},
	{
		jp: "文化交流は両国の発展に寄与する",
		kana: "ぶんかこうりゅうはりょうこくのはってんにきよする",
		romaji: "bunkakouryuuharyoukokunohaっtennikiyosuru",
	},
	{
		jp: "新幹線は日本を代表する高速鉄道だ",
		kana: "しんかんせんはにほんをだいひょうするこうそくてつどうだ",
		romaji: "shinkansenhanihonwodaihyousurukousokutetsudouda",
	},
	{
		jp: "高速道路は日本全国に広がっている",
		kana: "こうそくどうろはにほんぜんこくにひろがっている",
		romaji: "kousokudourohanihonzenkokunihirogaっteiru",
	},
	{
		jp: "首都高速道路は東京を囲んでいる",
		kana: "しゅとこうそくどうろはとうきょうをかこんでいる",
		romaji: "shyutokousokudourohatoukyouwokakondeiru",
	},
	{
		jp: "鉄道網は日本の主要な交通網だ",
		kana: "てつどうもうはにほんのしゅようなこうつうもうだ",
		romaji: "tetsudoumouhanihonnoshyuyounakoutsuumouda",
	},
	{
		jp: "地下鉄は大都市の重要な交通手段だ",
		kana: "ちかてつはだいとしのじゅうようなこうつうしゅだんだ",
		romaji: "chikatetsuhadaitoshinojyuuyounakoutsuushyudanda",
	},
	{
		jp: "空港は国際交流の重要な施設だ",
		kana: "くうこうはこくさいこうりゅうのじゅうようなしせつだ",
		romaji: "kuukouhakokusaikouryuunojyuuyounashisetsuda",
	},
	{
		jp: "港湾は海上交易の中心地である",
		kana: "こうわんはかいじょうこうえきのちゅうしんちである",
		romaji: "kouwanhakaijyoukouekinochyuushinchidearu",
	},
	{
		jp: "ダムは水力発電の重要な施設だ",
		kana: "だむはすいりょくはつでんのじゅうようなしせつだ",
		romaji: "damuhasuiryokuhatsudennojyuuyounashisetsuda",
	},
	{
		jp: "電力網は日本全体を覆っている",
		kana: "でんりょくもうはにほんぜんたいをおおっている",
		romaji: "denryokumouhanihonzentaiwoooっteiru",
	},
	{
		jp: "通信網は急速に発展している",
		kana: "つうしんもうはきゅうそくにはってんしている",
		romaji: "tsuushinmouhakyuusokunihaっtenshiteiru",
	},
	{
		jp: "関ヶ原の戦いは天下分け目だった",
		kana: "せきがはらのたたかいはてんかわけめだった",
		romaji: "sekigaharanotatakaihatenkawakemedaっta",
	},
	{
		jp: "本能寺の変は歴史上の大事件だ",
		kana: "ほんのうじのへんはれきしじょうのだいじけんだ",
		romaji: "honnoujinohenharekishijyounodaijikenda",
	},
	{
		jp: "天下統一は戦国時代の最大目標だった",
		kana: "てんかとういつはせんごくじだいのさいだいもくひょうだった",
		romaji: "tenkatouitsuhasengokujidainosaidaimokuhyoudaっta",
	},
	{
		jp: "幕末は日本の激動の時代である",
		kana: "ばくまつはにほんのげきどうのじだいである",
		romaji: "bakumatsuhanihonnogekidounojidaidearu",
	},
	{
		jp: "ペリーの来航は日本を変えた",
		kana: "ぺりーのらいこうはにほんをかえた",
		romaji: "perinoraikouhanihonwokaeta",
	},
	{
		jp: "倒幕運動は明治維新につながった",
		kana: "とうばくうんどうはめいじいしんにつながった",
		romaji: "toubakuundouhameijiishinnitsunagaっta",
	},
	{
		jp: "王政復古は新しい時代を開いた",
		kana: "おうせいふっこはあたらしいじだいをひらいた",
		romaji: "ouseifuっkohaatarashiijidaiwohiraita",
	},
	{
		jp: "廃藩置県は統一を強化した",
		kana: "はいはんちけんはとういつをきょうかした",
		romaji: "haihanchikenhatouitsuwokyoukashita",
	},
	{
		jp: "岩倉使節団は外国を視察した",
		kana: "いわくらしせつだんはがいこくをしさつした",
		romaji: "iwakurashisetsudanhagaikokuwoshisatsushita",
	},
	{
		jp: "五箇条の御誓文は改革の宣言だ",
		kana: "ごかじょうのごせいもんはかいかくのせんげんだ",
		romaji: "gokajyounogoseimonhakaikakunosengenda",
	},
	{
		jp: "古事記は日本最古の歴史書である",
		kana: "こじきはにほんさいこのれきししょである",
		romaji: "kojikihanihonsaikonorekishishyodearu",
	},
	{
		jp: "日本書紀も古い歴史書である",
		kana: "にほんしょきもふるいれきししょである",
		romaji: "nihonshyokimofuruirekishishyodearu",
	},
	{
		jp: "源氏物語は世界最古の小説だ",
		kana: "げんじものがたりはせかいさいこのしょうせつだ",
		romaji: "genjimonogatarihasekaisaikonoshyousetsuda",
	},
	{
		jp: "枕草子は随筆文学の傑作である",
		kana: "まくらのそうしはずいひつぶんがくのけっさくである",
		romaji: "makuranosoushihazuihitsubungakunokeっsakudearu",
	},
	{
		jp: "俳句は五七五の定型詩である",
		kana: "はいくはごしちごのていけいしである",
		romaji: "haikuhagoshichigonoteikeishidearu",
	},
	{
		jp: "短歌は五七五七七の韻文である",
		kana: "たんかはごしちごしちしちのいんぶんである",
		romaji: "tankahagoshichigoshichishichinoinbundearu",
	},
	{
		jp: "和歌は日本の伝統的な詩である",
		kana: "わかはにほんのでんとうてきなしである",
		romaji: "wakahanihonnodentoutekinashidearu",
	},
	{
		jp: "書道は文字を芸術に高める",
		kana: "しょどうはもじをげいじゅつにたかめる",
		romaji: "shyodouhamojiwogeijyutsunitakameru",
	},
	{
		jp: "絵画は日本美術の重要な部分だ",
		kana: "かいがはにほんびじゅつのじゅうようなぶぶんだ",
		romaji: "kaigahanihonbijyutsunojyuuyounabubunda",
	},
	{
		jp: "浮世絵は江戸時代の芸術である",
		kana: "うきよえはえどじだいのげいじゅつである",
		romaji: "ukiyoehaedojidainogeijyutsudearu",
	},
	{
		jp: "関東は経済の中心地である",
		kana: "かんとうはけいざいのちゅうしんちである",
		romaji: "kantouhakeizainochyuushinchidearu",
	},
	{
		jp: "関西は歴史的に重要な地域だ",
		kana: "かんさいはれきしてきにじゅうようなちいきだ",
		romaji: "kansaiharekishitekinijyuuyounachiikida",
	},
	{
		jp: "東北は伝統文化が豊富である",
		kana: "とうほくはでんとうぶんかがほうふである",
		romaji: "touhokuhadentoubunkagahoufudearu",
	},
	{
		jp: "中国地方は西日本の要衝である",
		kana: "ちゅうごくちほうはにしにほんのようしょうである",
		romaji: "chyuugokuchihouhanishinihonnoyoushyoudearu",
	},
	{
		jp: "四国は古くからの信仰の地だ",
		kana: "しこくはふるくからのしんこうのちだ",
		romaji: "shikokuhafurukukaranoshinkounochida",
	},
	{
		jp: "沖縄は独特の文化を持つ",
		kana: "おきなわはどくとくのぶんかをもつ",
		romaji: "okinawahadokutokunobunkawomotsu",
	},
	{
		jp: "北海道は開拓の歴史が浅い",
		kana: "ほっかいどうはかいたくのれきしがあさい",
		romaji: "hoっkaidouhakaitakunorekishigaasai",
	},
	{
		jp: "瀬戸内海沿岸は古い文化圏だ",
		kana: "せとないかいえんがんはふるいぶんかけんだ",
		romaji: "setonaikaienganhafuruibunkakenda",
	},
	{
		jp: "太平洋沿岸は人口が密集している",
		kana: "たいへいようえんがんはじんこうがみっしゅくしている",
		romaji: "taiheiyouenganhajinkougamiっshyukushiteiru",
	},
	{
		jp: "日本海沿岸は雪が多い地域だ",
		kana: "にほんかいえんがんはゆきがおおいちいきだ",
		romaji: "nihonkaienganhayukigaooichiikida",
	},
	{
		jp: "少子化は日本の大きな課題である",
		kana: "しょうしかはにほんのおおきなかだいである",
		romaji: "shyoushikahanihonnoookinakadaidearu",
	},
	{
		jp: "高齢化社会への対応が重要だ",
		kana: "こうれいかしゃかいへのたいおうがじゅうようだ",
		romaji: "koureikashyakaihenotaiougajyuuyouda",
	},
	{
		jp: "人口減少は多くの地域の課題だ",
		kana: "じんこうげんしょうはおおくのちいきのかだいだ",
		romaji: "jinkougenshyouhaookunochiikinokadaida",
	},
	{
		jp: "環境保全は現代の重要なテーマだ",
		kana: "かんきょうほぜんはげんだいのじゅうようなてーまだ",
		romaji: "kankyouhozenhagendainojyuuyounatemada",
	},
	{
		jp: "地球温暖化への対策が急務である",
		kana: "ちきゅうおんだんかへのたいさくがきゅうむである",
		romaji: "chikyuuondankahenotaisakugakyuumudearu",
	},
	{
		jp: "再生可能エネルギーの活用が広がる",
		kana: "さいせいかのうえねるぎーのかつようがひろがる",
		romaji: "saiseikanoueneruginokatsuyougahirogaru",
	},
	{
		jp: "働き方改革は労働環境を変えた",
		kana: "はたらきかたかいかくはろうどうかんきょうをかえた",
		romaji: "hatarakikatakaikakuharoudoukankyouwokaeta",
	},
	{
		jp: "デジタル化は社会を急速に変えている",
		kana: "でじたるかはしゃかいをきゅうそくにかえている",
		romaji: "dejitarukahashyakaiwokyuusokunikaeteiru",
	},
	{
		jp: "多文化共生が重要なテーマである",
		kana: "たぶんかきょうせいがじゅうようなてーまである",
		romaji: "tabunkakyouseigajyuuyounatemadearu",
	},
	{
		jp: "ジェンダー平等への取り組みが進む",
		kana: "じぇんだーびょうどうへのとりくみがすすむ",
		romaji: "jiendabyoudouhenotorikumigasusumu",
	},
	{
		jp: "宿場町は江戸時代の重要な駅だ",
		kana: "しゅくばまちはえどじだいのじゅうようなえきだ",
		romaji: "shyukubamachihaedojidainojyuuyounaekida",
	},
	{
		jp: "参勤交代は大名の義務だった",
		kana: "さんきんこうたいはだいみょうのぎむだった",
		romaji: "sankinkoutaihadaimyounogimudaっta",
	},
	{
		jp: "五街道は江戸時代の主要道路だ",
		kana: "ごかいどうはえどじだいのしゅようどうろだ",
		romaji: "gokaidouhaedojidainoshyuyoudouroda",
	},
	{
		jp: "村落共同体は昔の中心だった",
		kana: "そんらくきょうどうたいはむかしのちゅうしんだった",
		romaji: "sonrakukyoudoutaihamukashinochyuushindaっta",
	},
	{
		jp: "農業は日本の基本産業だった",
		kana: "のうぎょうはにほんのきほんさんぎょうだった",
		romaji: "nougyouhanihonnokihonsangyoudaっta",
	},
	{
		jp: "漁業は沿岸地域の生業だった",
		kana: "ぎょぎょうはえんがんちいきのせいぎょうだった",
		romaji: "gyogyouhaenganchiikinoseigyoudaっta",
	},
	{
		jp: "狩猟採集は先史時代の生活様式だ",
		kana: "かりょうさいしゅうはせんしじだいのせいかつようしきだ",
		romaji: "karyousaishyuuhasenshijidainoseikatsuyoushikida",
	},
	{
		jp: "土地所有制度は発展していた",
		kana: "とちしょゆうせいどははってんしていた",
		romaji: "tochishyoyuuseidohahaっtenshiteita",
	},
	{
		jp: "税制度は統治の重要な手段だ",
		kana: "ぜいせいどはとうちのじゅうようなしゅだんだ",
		romaji: "zeiseidohatouchinojyuuyounashyudanda",
	},
	{
		jp: "租庸調は奈良時代の税制度だ",
		kana: "そようちょうはならじだいのぜいせいどだ",
		romaji: "soyouchyouhanarajidainozeiseidoda",
	},
	{
		jp: "アジアは世界で最も広い大陸だ",
		kana: "あじあはせかいでもっともひろいたいりくだ",
		romaji: "ajiahasekaidemoっtomohiroitairikuda",
	},
	{
		jp: "インドネシアは島国である",
		kana: "いんどねしあはしまぐにである",
		romaji: "indoneshiahashimagunidearu",
	},
	{
		jp: "フィリピンも多くの島からなる",
		kana: "ふぃりぴんもおおくのしまからなる",
		romaji: "fuiripinmoookunoshimakaranaru",
	},
	{
		jp: "タイは東南アジアの中心だ",
		kana: "たいはとうなんあじあのちゅうしんだ",
		romaji: "taihatounanajianochyuushinda",
	},
	{
		jp: "ベトナムは長い海岸線を持つ",
		kana: "べとなむはながいかいがんせんをもつ",
		romaji: "betonamuhanagaikaigansenwomotsu",
	},
	{
		jp: "マレーシアは多民族国家である",
		kana: "ますれーしあはたみんぞくこっかである",
		romaji: "masureshiahataminzokukoっkadearu",
	},
	{
		jp: "シンガポールは貿易の中心地だ",
		kana: "しんがぽーるはぼうえきのちゅうしんちだ",
		romaji: "shingaporuhabouekinochyuushinchida",
	},
	{
		jp: "カンボジアは古い文明の地だ",
		kana: "かんぼじあはふるいぶんめいのちだ",
		romaji: "kanbojiahafuruibunmeinochida",
	},
	{
		jp: "ラオスは内陸国である",
		kana: "らおすはないりくこくである",
		romaji: "raosuhanairikukokudearu",
	},
	{
		jp: "ミャンマーはインド洋に面する",
		kana: "みゃんまーはいんどようにめんする",
		romaji: "myanmahaindoyounimensuru",
	},
	{
		jp: "フランスはヨーロッパの大国だ",
		kana: "ふらんすはよーろっぱのたいこくだ",
		romaji: "furansuhayoroっpanotaikokuda",
	},
	{
		jp: "ドイツはヨーロッパの中心にある",
		kana: "どいつはよーろっぱのちゅうしんにある",
		romaji: "doitsuhayoroっpanochyuushinniaru",
	},
	{
		jp: "イギリスは島国である",
		kana: "いぎりすはしまぐにである",
		romaji: "igirisuhashimagunidearu",
	},
	{
		jp: "イタリアは古い文明の発祥地だ",
		kana: "いたりあはふるいぶんめいのはっしょうちだ",
		romaji: "itariahafuruibunmeinohaっshyouchida",
	},
	{
		jp: "スペインはヨーロッパの西端だ",
		kana: "すぺいんはよーろっぱのにしたんだ",
		romaji: "supeinhayoroっpanonishitanda",
	},
	{
		jp: "ポルトガルは大洋進出の先駆者だ",
		kana: "ぽるとがるはたいようしんしゅつのせんくしゃだ",
		romaji: "porutogaruhataiyoushinshyutsunosenkushyada",
	},
	{
		jp: "ギリシャは古代文明の発祥地だ",
		kana: "ぎりしゃはこだいぶんめいのはっしょうちだ",
		romaji: "girishyahakodaibunmeinohaっshyouchida",
	},
	{
		jp: "スイスは山国である",
		kana: "すいすはやまぐにである",
		romaji: "suisuhayamagunidearu",
	},
	{
		jp: "スウェーデンは北欧の大国だ",
		kana: "すうぇーでんはほくおうのたいこくだ",
		romaji: "suuedenhahokuounotaikokuda",
	},
	{
		jp: "ノルウェーは北欧の山国だ",
		kana: "のるうぇーはほくおうのやまぐにだ",
		romaji: "noruuehahokuounoyamagunida",
	},
	{
		jp: "映画を見る",
		kana: "えいがをみる",
		romaji: "eigawomiru",
	},
	{
		jp: "歌を歌う",
		kana: "うたをうたう",
		romaji: "utawoutau",
	},
	{
		jp: "絵を描く",
		kana: "えをかく",
		romaji: "ewokaku",
	},
	{
		jp: "ゲームをする",
		kana: "げーむをする",
		romaji: "geemuwosuru",
	},
	{
		jp: "釣りをする",
		kana: "つりをする",
		romaji: "turiwosuru",
	},
	{
		jp: "登山をする",
		kana: "とうざんをする",
		romaji: "tozanwosuru",
	},
	{
		jp: "キャンプをする",
		kana: "きゃんぷをする",
		romaji: "kyampuwosuru",
	},
	{
		jp: "写真を撮る",
		kana: "しゃしんをとる",
		romaji: "shashinwotoru",
	},
	{
		jp: "料理をする",
		kana: "りょうりをする",
		romaji: "ryouriwosuru",
	},
	{
		jp: "ダンスをする",
		kana: "だんすをする",
		romaji: "dansuwosuru",
	},
	{
		jp: "泳ぐ",
		kana: "およぐ",
		romaji: "oyogu",
	},
	{
		jp: "走る",
		kana: "はしる",
		romaji: "hashiru",
	},
	{
		jp: "書く",
		kana: "かく",
		romaji: "kaku",
	},
	{
		jp: "弾く",
		kana: "ひく",
		romaji: "hiku",
	},
	{
		jp: "毎日ジョギングをします",
		kana: "まいにちじょぎんぐをします",
		romaji: "mainichijoginguwoshimasu",
	},
	{
		jp: "友達と遊ぶのが好きです",
		kana: "ともだちとあそぶのがすきです",
		romaji: "tomodachitotoasobunogasukidesu",
	},
	{
		jp: "週末に映画館へ行きます",
		kana: "しゅうまつにえいがかんへいきます",
		romaji: "shuumatsunieiagakanheiikimasu",
	},
	{
		jp: "休みの日は本をよみます",
		kana: "やすみのひはほんをよみます",
		romaji: "yasuminohihahonyomimasu",
	},
	{
		jp: "音楽を聴くのが趣味です",
		kana: "おんがくをきくのがしゅみです",
		romaji: "ongakuwokikunogashumidesu",
	},
	{
		jp: "カフェに行ってコーヒーを飲む",
		kana: "かふぇにいってこーひーをのむ",
		romaji: "kafeniittekoohiiwonomu",
	},
	{
		jp: "庭で花を育てています",
		kana: "にわではなをそだてています",
		romaji: "niwahahanawosodateteimasu",
	},
	{
		jp: "毎週テニスをしています",
		kana: "まいしゅうてにすをしています",
		romaji: "maishuttenisuwoshiteimasu",
	},
	{
		jp: "手芸が趣味で毎日やります",
		kana: "しゅげいがしゅみでまいにちやります",
		romaji: "shugeigashumidemainichiyarimasu",
	},
	{
		jp: "バドミントンは運動不足を解消",
		kana: "ばどみんとんはうんどうぶそくをかいしょう",
		romaji: "badomintonhaundobusorukukaisshou",
	},
	{
		jp: "ギターを毎日練習する",
		kana: "ぎたーをまいにちれんしゅうする",
		romaji: "gitaawomainichirennyuusuru",
	},
	{
		jp: "読書は心を豊かにします",
		kana: "どくしょはこころをとよかにします",
		romaji: "dokushohakokoro wotoyokanitoyokanitoyokani",
	},
	{
		jp: "料理の本を参考にします",
		kana: "りょうりのほんをさんこうにします",
		romaji: "ryourinohowyosankounioshimasu",
	},
	{
		jp: "瞑想で毎日心を落ち着かせる",
		kana: "めいそうでまいにちこころをおちつかせる",
		romaji: "meisoudemainichikokorowootitsukaseru",
	},
	{
		jp: "スケッチブックに毎日描く",
		kana: "すけっちぶっくにまいにちかく",
		romaji: "suketchibukkunimainichikaку",
	},
	{
		jp: "毎週末は友達と野球をして遊びます",
		kana: "まいしゅうまつはともだちとやきゅうをしてあそびます",
		romaji: "maishuurmatsuhatomodachiтойakуuuwoshiteasobimasu",
	},
	{
		jp: "美術館に行ったり展覧会を見たりします",
		kana: "びじゅつかんにいったりてんらんかいをみたりします",
		romaji: "bijutsukanniiittariteranankaiomitarishimasu",
	},
	{
		jp: "カメラを持って四季の風景を撮ります",
		kana: "かめらをもってしきのふうけいをとります",
		romaji: "kamerawomotteteshikinofuukeiowotrimasu",
	},
	{
		jp: "ダンスクラブに通って毎週レッスンを受けます",
		kana: "だんすくらぶにかよってまいしゅうれっすんをうけます",
		romaji: "dansukurabunitaydotyemaishuuressunwoubekasu",
	},
	{
		jp: "毎月新しい映画が公開されるのが楽しみです",
		kana: "まいつきあたらしいえいががこうかいされるのがたのしみです",
		romaji: "maitsukiatarashiieiagagakoukaissarerunogatanoshimiidesu",
	},
	{
		jp: "ボーリングはストレス解消の一番いい方法です",
		kana: "ぼーりんぐはすとれすかいしょうのいちばんいいほうほうです",
		romaji: "booringuhasutoresukaishounoichbanniiihoughoudesu",
	},
	{
		jp: "瞑想は朝起きてから夜寝る前にやります",
		kana: "めいそうはあさおきてからよるねるまえにやります",
		romaji: "meisouhasaaokitekarayorunerumaeniayarimasu",
	},
	{
		jp: "海で泳いだり砂浜で遊んだりするのが大好きです",
		kana: "うみでおよいだりすなはまであそんだりするのがだいすきです",
		romaji: "umideoyoidarisunahamaeasoindarisurunoigadaisukidesu",
	},
	{
		jp: "新聞や雑誌を読むことで知識を増やします",
		kana: "しんぶんやざっしをよむことでちしきをふやします",
		romaji: "shinbunnyazasshiwoyomukotodechishikiwofuyashimasu",
	},
	{
		jp: "週末に家族と一緒に公園を散歩するのが好きです",
		kana: "しゅうまつにかぞくといっしょにこうえんをさんぽするのがすきです",
		romaji: "shuumatsunikzokuittshonioukouennwosanposuruynoigasukidesu",
	},
	{
		jp: "毎日のジョギングは健康的な生活の基本です",
		kana: "まいにちのじょぎんぐはけんこうてきなせいかつのきほんです",
		romaji: "mainichhinojoginguhakenkoteteknaaseikatsunokihondesu",
	},
	{
		jp: "映像作品を見てストーリーやテーマを分析します",
		kana: "えいぞうさくひんをみてすとーりーやてーまをぶんせきします",
		romaji: "eiozousaku}niwomitesutooriiteemawobunnsekishimasu",
	},
	{
		jp: "毎月新しい曲を学んでピアノの演奏を上達させます",
		kana: "まいつきあたらしいきょくをまなんでぴあののえんそうをじょうたつさせます",
		romaji: "maitsukiatarashikyokuwomaandepiannonoyensouwojoutsusasemasu",
	},
	{
		jp: "バスケットボールは団体スポーツで楽しさが倍増します",
		kana: "ばすけっとぼーるはだんたいすぽーつでたのしさがばいぞうします",
		romaji: "basukettobooruhadantaisupootsudetanoshisagabaizouseshimasu",
	},
	{
		jp: "陶芸教室に通って新しい技術を学んでいます",
		kana: "とうげいきょうしつにかよってあたらしいぎじゅつをまなんでいます",
		romaji: "tougeikousitsunikayotteatarashiigijutsuwomanadeimasu",
	},
	{
		jp: "折り紙をする",
		kana: "おりがみをする",
		romaji: "origamiwosuru",
	},
	{
		jp: "チェスをする",
		kana: "ちぇすをする",
		romaji: "chesuowsuru",
	},
	{
		jp: "演劇をする",
		kana: "えんげきをする",
		romaji: "engekiwosuru",
	},
	{
		jp: "スキーをする",
		kana: "すきーをする",
		romaji: "sukiiwosuru",
	},
	{
		jp: "スノボーをする",
		kana: "すのぼーをする",
		romaji: "sunoboowosuru",
	},
	{
		jp: "テニスをする",
		kana: "てにすをする",
		romaji: "tenisuwosuru",
	},
	{
		jp: "野球をする",
		kana: "やきゅうをする",
		romaji: "yakyuuwosuru",
	},
	{
		jp: "サッカーをする",
		kana: "さっかーをする",
		romaji: "sakkaawosuru",
	},
	{
		jp: "バスケをする",
		kana: "ばすけをする",
		romaji: "baskewosuru",
	},
	{
		jp: "バレーをする",
		kana: "ばれーをする",
		romaji: "bareewosuru",
	},
	{
		jp: "卓球をする",
		kana: "たっきゅうをする",
		romaji: "takkyuuwosuru",
	},
	{
		jp: "ボウリングをする",
		kana: "ぼうりんぐをする",
		romaji: "bouringuwosuru",
	},
	{
		jp: "アーチェリーをする",
		kana: "あーちぇりーをする",
		romaji: "aacheoriiwosuru",
	},
	{
		jp: "乗馬をする",
		kana: "じょうばをする",
		romaji: "joubawhosuru",
	},
	{
		jp: "サーフィンをする",
		kana: "さーふぃんをする",
		romaji: "saafufinwosuru",
	},
	{
		jp: "ダイビングをする",
		kana: "だいびんぐをする",
		romaji: "daibinguwosuru",
	},
	{
		jp: "スケートをする",
		kana: "すけーとをする",
		romaji: "sukeetowosuru",
	},
	{
		jp: "ローラースケートをする",
		kana: "ろーらーすけーとをする",
		romaji: "rooraasuketoowosuru",
	},
	{
		jp: "スケボーをする",
		kana: "すけぼーをする",
		romaji: "sukebaowosuru",
	},
	{
		jp: "バイクに乗る",
		kana: "ばいくにのる",
		romaji: "baikuninoru",
	},
	{
		jp: "水彩画を描いて展示します",
		kana: "すいさいがをかいててんじします",
		romaji: "suisaigawokaitetetenjishimasu",
	},
	{
		jp: "陶芸で物を作るのが好き",
		kana: "とうげいでものをつくるのがすき",
		romaji: "tougeidenomonowotsukunrunoigasuki",
	},
	{
		jp: "切り紙で装飾品を作ります",
		kana: "きりがみでそうしょくひんをつくります",
		romaji: "kirigamidesoushokuhinwotsukkurimasu",
	},
	{
		jp: "ビーズで装飾品を作ります",
		kana: "びーずでそうしょくひんをつくります",
		romaji: "biizudesoushokuhinwotsukkurimasu",
	},
	{
		jp: "粘土で彫刻を作ります",
		kana: "ねんどでちょうこくをつくります",
		romaji: "nendodechoukokuwotsukkurimasu",
	},
	{
		jp: "刺繍で服に絵を描きます",
		kana: "ししゅうでふくにえをかきます",
		romaji: "shishuudefukunieowokakimasu",
	},
	{
		jp: "編み物で小物を作ります",
		kana: "あみものでこものをつくります",
		romaji: "aminomonodekonomonowotsukkurimasu",
	},
	{
		jp: "ガーデニングで野菜を育てます",
		kana: "がーでにんぐでやさいをそだてます",
		romaji: "gaadeningumdeyasaiwosodattemasu",
	},
	{
		jp: "盆栽を育てるのは難しい",
		kana: "ぼんさいをそだてるのはむずかしい",
		romaji: "bonsaiwosodaterunohamu zukashii",
	},
	{
		jp: "観葉植物を育てます",
		kana: "かんようしょくぶつをそだてます",
		romaji: "kanyoushokabutsuwosodattemasu",
	},
	{
		jp: "バーベキューで友達と楽しむ",
		kana: "ばーべきゅーでともだちとたのしむ",
		romaji: "baabekyuudetodomatshitotanoshimu",
	},
	{
		jp: "キャンプで自然を楽しみます",
		kana: "きゃんぷでしぜんをたのしみます",
		romaji: "kyampudeshizenwotanoshimimasu",
	},
	{
		jp: "ハイキングで山を登ります",
		kana: "はいきんぐでやまをのぼります",
		romaji: "haikingudeyamawonobortrimasu",
	},
	{
		jp: "自転車で散策します",
		kana: "じてんしゃでさんさくします",
		romaji: "jitenshyadesansakkushimasu",
	},
	{
		jp: "スケッチをして自然を描く",
		kana: "すけっちをしてしぜんをかく",
		romaji: "suketchiwoshiteshizenwokaku",
	},
	{
		jp: "天文学は夜空の星を観測",
		kana: "てんもんがくはよぞらのほしをかんそく",
		romaji: "tenmongakuhayozoranahoshiwokansoku",
	},
	{
		jp: "昆虫採集は夏の楽しみ",
		kana: "こんちゅうさいしゅうはなつのたのしみ",
		romaji: "konchuuraishuuhanatsunnotanoshimi",
	},
	{
		jp: "野鳥観察が趣味です",
		kana: "やちょうかんさつがしゅみです",
		romaji: "yachoukansatsugashumidesu",
	},
	{
		jp: "蝶集めは時間がかかる",
		kana: "ちょうあつめはじかんがかかる",
		romaji: "chouatsumehajikangakakaru",
	},
	{
		jp: "釣りは朝早く出かけます",
		kana: "つりはあさはやくでかけます",
		romaji: "turihasasahaykudekakemasu",
	},
	{
		jp: "写真撮影で季節の変化を記録する",
		kana: "しゃしんさつえいできせつのへんかをきろくする",
		romaji: "shashinatsatsueidekisetsunohenkawokiroiusuru",
	},
	{
		jp: "アマチュア無線で世界と通信する",
		kana: "あまちゅあむせんでせかいとつうしんする",
		romaji: "amachuamusendesekaitsutsuushinisuru",
	},
	{
		jp: "模型飛行機を飛ばすのは楽しい",
		kana: "もけいひこうきをとばすのはたのしい",
		romaji: "mokeihjikouikiwotobsunohatanoshii",
	},
	{
		jp: "鉄道模型の収集と走行が趣味",
		kana: "てつどうもけいのしゅうしゅうとそうこうがしゅみ",
		romaji: "tetsudoumokeinoshuushutousoukoougashuimi",
	},
	{
		jp: "切手収集で世界の文化を知る",
		kana: "きってしゅうしゅうでせかいのぶんかをしる",
		romaji: "kitteshuushuddesekaoinobunkawoshiru",
	},
	{
		jp: "古書集めで珍しい本を探す",
		kana: "こしょあつめでめずらしいほんをさがす",
		romaji: "kosheatsumedemimarashiihonwosagasu",
	},
	{
		jp: "レコード蒐集で音楽の歴史を知る",
		kana: "れこーどしゅうしゅうでおんがくのれきしをしる",
		romaji: "rekoodoshuushuddeongakunonrekishiwoshiru",
	},
	{
		jp: "アニメや漫画の推しキャラを応援",
		kana: "あにめやまんがのおしきゃらをおうえん",
		romaji: "animeyamanganooshikyarawoouen",
	},
	{
		jp: "声優のイベントに参加して楽しむ",
		kana: "せいゆうのいべんとにさんかしてたのしむ",
		romaji: "seiyuunnoibentonisnakashitetanoshimu",
	},
	{
		jp: "オタ活動で同じ趣味の友人を作る",
		kana: "おたかつどうでおなじしゅみのゆうじんをつくる",
		romaji: "otakatsudoudeonajishuminoyuujinwotskuru",
	},
	{
		jp: "韓国ドラマを見るために韓国語を勉強",
		kana: "かんこくどらまをみるためにかんこくごをべんきょう",
		romaji: "kangokudoramaomirutoameniikangokugowobenkyou",
	},
	{
		jp: "ジャニーズアイドルを追って全国で応援",
		kana: "じゃにーずあいどるをおってぜんこくでおうえん",
		romaji: "janizuaidoruwoottezenkokudeouen",
	},
	{
		jp: "推し活で給料の大部分を使う",
		kana: "おしかつできゅうりょうのだいぶぶんをつかう",
		romaji: "oshikatsddekyuuryounodaibubunyoutskau",
	},
	{
		jp: "オタ会で友達と推し活について語る",
		kana: "おたかいでともだちとおしかつについてかたる",
		romaji: "otakaiddetomadsichitooshshikatsunikutsietekatarl",
	},
	{
		jp: "グッズ販売の抽選に参加して当選を祈る",
		kana: "ぐっずはんばいのちゅうせんにさんかしてとうせんをいのる",
		romaji: "guzduhanbainochuen sennnisankashitetouseninoinoru",
	},
	{
		jp: "日記を書く",
		kana: "にっきをかく",
		romaji: "nikkiwokaku",
	},
	{
		jp: "詩を書く",
		kana: "しをかく",
		romaji: "shiwokaku",
	},
	{
		jp: "短編を書く",
		kana: "たんぺんをかく",
		romaji: "tanpennwokaku",
	},
	{
		jp: "ブログを書く",
		kana: "ぶろぐをかく",
		romaji: "buroguwokaku",
	},
	{
		jp: "小説を書く",
		kana: "しょうせつをかく",
		romaji: "shosetsu wokaku",
	},
	{
		jp: "編集をする",
		kana: "へんしゅくをする",
		romaji: "henshuuwosuru",
	},
	{
		jp: "翻訳をする",
		kana: "ほんやくをする",
		romaji: "honyakuwosuru",
	},
	{
		jp: "詩集を読む",
		kana: "ししゅうをよむ",
		romaji: "shishuuwyomu",
	},
	{
		jp: "評論を読む",
		kana: "ひょうろんをよむ",
		romaji: "hyouronwoyomu",
	},
	{
		jp: "新聞を読む",
		kana: "しんぶんをよむ",
		romaji: "shinbunwoyomu",
	},
	{
		jp: "雑誌を読む",
		kana: "ざっしをよむ",
		romaji: "zassiwoyomu",
	},
	{
		jp: "漫画を読む",
		kana: "まんがをよむ",
		romaji: "mangawoyomu",
	},
	{
		jp: "ライトノベルを読む",
		kana: "らいとのべるをよむ",
		romaji: "raitonoberuwoyomu",
	},
	{
		jp: "エッセイを読む",
		kana: "えっせいをよむ",
		romaji: "esseiywoyomu",
	},
	{
		jp: "詩を作る",
		kana: "しをつくる",
		romaji: "shiwotskuru",
	},
	{
		jp: "コンサートに行く",
		kana: "こんさーとにいく",
		romaji: "konsaatoniiku",
	},
	{
		jp: "劇場に行く",
		kana: "げきじょうにいく",
		romaji: "gekijouniiku",
	},
	{
		jp: "展覧会に行く",
		kana: "てんらんかいにいく",
		romaji: "tenrankainniiku",
	},
	{
		jp: "博物館に行く",
		kana: "はくぶつかんにいく",
		romaji: "hakubutsukannniiku",
	},
	{
		jp: "美術館に行く",
		kana: "びじゅつかんにいく",
		romaji: "bijutsukannniiku",
	},
	{
		jp: "動物園に行く",
		kana: "どうぶつえんにいく",
		romaji: "doubutsuennniiku",
	},
	{
		jp: "水族館に行く",
		kana: "すいぞくかんにいく",
		romaji: "suizokukannniiku",
	},
	{
		jp: "植物園に行く",
		kana: "しょくぶつえんにいく",
		romaji: "shokubutsennniiku",
	},
	{
		jp: "遊園地に行く",
		kana: "ゆうえんちにいく",
		romaji: "yuuenchiiku",
	},
	{
		jp: "テーマパークに行く",
		kana: "てーまぱーくにいく",
		romaji: "teeemapakuniiku",
	},
	{
		jp: "映画館に行く",
		kana: "えいがかんにいく",
		romaji: "eigakannniiku",
	},
	{
		jp: "ライブハウスに行く",
		kana: "らいぶはうすにいく",
		romaji: "raibuhausuniiku",
	},
	{
		jp: "バーに行く",
		kana: "ばーにいく",
		romaji: "baaniiku",
	},
	{
		jp: "カラオケに行く",
		kana: "からおけにいく",
		romaji: "karaokeniiku",
	},
	{
		jp: "クラブに行く",
		kana: "くらぶにいく",
		romaji: "kurabniiku",
	},
	{
		jp: "オーケストラの演奏を聴く",
		kana: "おーけすとらのえんそうをきく",
		romaji: "okesutoranoyensouwokiku",
	},
	{
		jp: "室内楽の公演を観賞する",
		kana: "しつないがくのこうえんをかんしょうする",
		romaji: "shitsunaigakunokouennwokanshousuru",
	},
	{
		jp: "バレエの舞台を見ます",
		kana: "ばれえのぶたいをみます",
		romaji: "bareennobunttaiowomimasu",
	},
	{
		jp: "オペラを鑑賞するのが好き",
		kana: "おぺらをかんしょうするのがすき",
		romaji: "operawokanshousurunoigasuki",
	},
	{
		jp: "演劇作品を見てインスピレーションを得る",
		kana: "えんげきさくひんをみてんすぴれーしょんをえる",
		romaji: "engekisaku hinwomiteinsupireeshonwoeru",
	},
	{
		jp: "古典文学を読んで知識を深める",
		kana: "こてんぶんがくをよんでちしきをふかめる",
		romaji: "kotenbungakuwoyonndechishikiwofukameru",
	},
	{
		jp: "詩人の作品を暗唱して楽しむ",
		kana: "していんのさくひんをあんしょうしてたのしむ",
		romaji: "shijinnnosaku hinwoanshousitutetanoshimu",
	},
	{
		jp: "和歌を学んで日本文化を理解する",
		kana: "わかをまなんでにほんぶんかをりかいする",
		romaji: "wakawomananddenihonnbunkaworikaisiuru",
	},
	{
		jp: "俳句を作って季語を学ぶ",
		kana: "はいくをつくってきごをまなぶ",
		romaji: "haikuwotsukatekigowomaanab",
	},
	{
		jp: "短歌を創作して文学の魅力を知る",
		kana: "たんかをそうさくしてぶんがくのみりょくをしる",
		romaji: "tankawosousaku shiteungakunomiiryokuwoshiru",
	},
	{
		jp: "森林浴をして心身をリラックス",
		kana: "しんりんよくをしてしんしんをりらっくす",
		romaji: "shinrinyokuwoshiteshinshinnworirakukus",
	},
	{
		jp: "川で水遊びをして涼む",
		kana: "かわでみずあそびをしてすずむ",
		romaji: "kawademizuasobiwoshitesuzmu",
	},
	{
		jp: "潮干狩りで貝を採取する",
		kana: "しおひがりでかいをさいしゅする",
		romaji: "shiohigaridekaisaishuuru",
	},
	{
		jp: "果樹園で果物を摘む",
		kana: "かじゅえんでくだものをつむ",
		romaji: "kajuendekudamonotsumimu",
	},
	{
		jp: "野菜畑で野菜を採ります",
		kana: "やさいばたけでやさいをとります",
		romaji: "yasaibatakeddeyasaiwotrimasu",
	},
	{
		jp: "蕎麦打ちを学んで手打ちする",
		kana: "そばうちをまなんでてうちする",
		romaji: "sobauchiwomananddeteuchiisuru",
	},
	{
		jp: "パン作りは朝から始まります",
		kana: "ぱんづくりはあさからはじまります",
		romaji: "pandukurihasakarahajimari masu",
	},
	{
		jp: "お菓子作りで新しいレシピに挑戦",
		kana: "おかしづくりであたらしいれしぴにちょうせん",
		romaji: "okashidukurideattarashiireshiipniichousen",
	},
	{
		jp: "紅茶のテイスティングで味を鑑定",
		kana: "こうちゃのてぃすてぃんぐであじをかんていする",
		romaji: "kouchhateitisuteitingudeajiwokanteiisuru",
	},
	{
		jp: "コーヒー豆の焙煎とテイスティング",
		kana: "こーひーまめのばいせんとていすてぃんぐ",
		romaji: "koohiimamedebaisenttoteiistuteitingu",
	},
	{
		jp: "ゴルフを週末に楽しむ",
		kana: "ごるふをしゅうまつにたのしむ",
		romaji: "goruufuwoshuurmatsunitanoshimu",
	},
	{
		jp: "ゲートボールは高齢者向けスポーツ",
		kana: "げーとぼーるはこうれいしゃむけすぽーつ",
		romaji: "geetboruhakoureishamamukuespoortsu",
	},
	{
		jp: "グラウンドゴルフで楽しく運動",
		kana: "ぐらうんどごるふでたのしくうんどう",
		romaji: "graunndogorifudetanoshikuundou",
	},
	{
		jp: "パークゴルフは誰でも簡単",
		kana: "ぱーくごるふはだれでもかんたん",
		romaji: "paaakugorifuhadaremokantan",
	},
	{
		jp: "ペタンクはフランス発祥のスポーツ",
		kana: "ぺたんくはふらんすはっしょうのすぽーつ",
		romaji: "petannkuhafarannsuhasshounnosupootsu",
	},
	{
		jp: "モルックはフィンランド発祥",
		kana: "もるっくはふぃんらんどはっしょう",
		romaji: "morukukuhafinrandohasshoux",
	},
	{
		jp: "ドッジボールで子供と遊ぶ",
		kana: "どっじぼーるでこどもとあそぶ",
		romaji: "dodjiboorudekodomottoasobu",
	},
	{
		jp: "キックボクシングで運動不足解消",
		kana: "きっくぼくしんぐでうんどうぶそくかいしょう",
		romaji: "kikkuboukshingudeddundobusokukaishou",
	},
	{
		jp: "ボクシングで体を鍛える",
		kana: "ぼくしんぐでからだをきたえる",
		romaji: "bokushingudde karadawokiteru",
	},
	{
		jp: "相撲は日本の伝統スポーツ",
		kana: "すもうはにほんのでんとうすぽーつ",
		romaji: "suouhaninhonetentouspoortsu",
	},
	{
		jp: "ビー玉を集めるのが好き",
		kana: "びーだまをあつめるのがすき",
		romaji: "biidamawaatsumerunoigasuki",
	},
	{
		jp: "昭和レトロを集めています",
		kana: "しょうわれとろをあつめています",
		romaji: "shouwaretrowoatsumeteimasu",
	},
	{
		jp: "缶バッジを集めるのが趣味",
		kana: "かんばっじをあつめるのがしゅみ",
		romaji: "kanbajiwjatsumerunoigashuimi",
	},
	{
		jp: "シール帳を完成させるまで集める",
		kana: "しーるちょうをかんせいさせるまであつめる",
		romaji: "shirurchouwokannseiasaserumaatsumera",
	},
	{
		jp: "推し缶を毎月購入して集める",
		kana: "おしかんをまいつきこうにゅうしてあつめる",
		romaji: "oshikannwomaitsukkikounnyuushiteatsumero",
	},
	{
		jp: "ステッカーは壊れず保存できる",
		kana: "すてっかーはこわれずほぞんできる",
		romaji: "sutekkaahakrowarusuhozonndekiru",
	},
	{
		jp: "ポスターで部屋を飾ります",
		kana: "ぽすたーでへやをかざります",
		romaji: "posutaadherayowokzaarimasu",
	},
	{
		jp: "推し絵で机を埋め尽くす",
		kana: "おしえでつくえをうめつくす",
		romaji: "oshiedetsuquewoumetukus",
	},
	{
		jp: "アクリルスタンドは推し活の定番",
		kana: "あくりるすたんどはおしかつのていはん",
		romaji: "akurirustannddohaoshshikatsunoteiihann",
	},
	{
		jp: "シェルフで推し関連グッズを展示",
		kana: "しぇるふでおしかんれんぐっずをてんじ",
		romaji: "sherufudeoshikarenngudzuwotennji",
	},
	{
		jp: "写真を編集する",
		kana: "しゃしんをへんしゅくする",
		romaji: "shashinnwohensyuu kusuru",
	},
	{
		jp: "ビデオを撮影する",
		kana: "びでおをさつえいする",
		romaji: "bideowosatsuheisuru",
	},
	{
		jp: "動画編集が楽しい",
		kana: "どうがへんしゅくがたのしい",
		romaji: "dougaenhensyukugntanoshii",
	},
	{
		jp: "配信をしてみたい",
		kana: "はいしんをしてみたい",
		romaji: "haishinwoshitemitai",
	},
	{
		jp: "ポッドキャストを聴く",
		kana: "ぽっどきゃすとをきく",
		romaji: "poddokyasutowokiku",
	},
	{
		jp: "オーディオブックを聴く",
		kana: "おーでぃおぶっくをきく",
		romaji: "odibukuwokiku",
	},
	{
		jp: "ラジオドラマを楽しむ",
		kana: "らじおどらまをたのしむ",
		romaji: "rajionndoramawotanoshimu",
	},
	{
		jp: "有声本で読書を楽しむ",
		kana: "ゆうせいほんでどくしょをたのしむ",
		romaji: "yuuseihhondedokushotanoshimu",
	},
	{
		jp: "メディテーションで瞑想する",
		kana: "めでぃてーしょんでめいそうする",
		romaji: "mediteeshoudemeisourruru",
	},
	{
		jp: "ヨガで体を柔軟にする",
		kana: "よがでからだをじゅうなんにする",
		romaji: "yogadekaradaowujuunanninisuru",
	},
	{
		jp: "ピラティスで筋力を高める",
		kana: "ぴらてぃすできんりょくをたかめる",
		romaji: "piratisuddekinryokuowotakameru",
	},
	{
		jp: "太極拳で心身を鍛える",
		kana: "たいきょくけんでしんしんをきたえる",
		romaji: "taikyokukenndeshinshinnwokitaeru",
	},
	{
		jp: "空手を習って護身術を学ぶ",
		kana: "からてをならってごしんじゅつをまなぶ",
		romaji: "karatewonrattegoshinnjutsuwomannabu",
	},
	{
		jp: "合気道で礼儀作法を学ぶ",
		kana: "あいきどうでれいぎさほうをまなぶ",
		romaji: "aikidoudereigisahouwomannnabu",
	},
	{
		jp: "剣道は心身を磨く修行",
		kana: "けんどうはしんしんをみがくしゅぎょう",
		romaji: "kendouhashinshinnwomigakushugou",
	},
	{
		jp: "弓道で的を射る",
		kana: "きゅうどうでまとをいる",
		romaji: "kyuudoudemnatowioiru",
	},
	{
		jp: "古武術を研究する",
		kana: "こぶじゅつをけんきゅうする",
		romaji: "kbubutsuwokennkyuusuru",
	},
	{
		jp: "格闘技を観戦するのが好き",
		kana: "かくとうぎをかんせんするのがすき",
		romaji: "kakutougiwokansennsurunoigasuki",
	},
	{
		jp: "プロレスは娯楽の一種です",
		kana: "ぷろれすはごらくのいっしゅです",
		romaji: "puroressuggarakunnoisshuddesu",
	},
	{
		jp: "大相撲を毎月観戦する",
		kana: "おおずもうをまいつきかんせんする",
		romaji: "oozuouwomaitskkikannsennsuru",
	},
	{
		jp: "寝ましょう",
		kana: "ねましょう",
		romaji: "nemashou",
	},
	{
		jp: "起きた",
		kana: "おきた",
		romaji: "okita",
	},
	{
		jp: "朝食",
		kana: "ちょうしょく",
		romaji: "choushoku",
	},
	{
		jp: "洗濯",
		kana: "せんたく",
		romaji: "sentaku",
	},
	{
		jp: "掃除",
		kana: "そうじ",
		romaji: "souji",
	},
	{
		jp: "料理",
		kana: "りょうり",
		romaji: "ryouri",
	},
	{
		jp: "休憩",
		kana: "きゅうけい",
		romaji: "kyuukei",
	},
	{
		jp: "帰宅",
		kana: "きたく",
		romaji: "kitaku",
	},
	{
		jp: "朝です",
		kana: "あさです",
		romaji: "asadesu",
	},
	{
		jp: "夜です",
		kana: "よるです",
		romaji: "yorudesu",
	},
	{
		jp: "ご飯",
		kana: "ごはん",
		romaji: "gohan",
	},
	{
		jp: "寝た",
		kana: "ねた",
		romaji: "neta",
	},
	{
		jp: "食べた",
		kana: "たべた",
		romaji: "tabeta",
	},
	{
		jp: "飲んだ",
		kana: "のんだ",
		romaji: "nonda",
	},
	{
		jp: "走った",
		kana: "はしった",
		romaji: "hashitta",
	},
	{
		jp: "歩いた",
		kana: "あるいた",
		romaji: "aruita",
	},
	{
		jp: "座った",
		kana: "すわった",
		romaji: "suwaita",
	},
	{
		jp: "朝ごはんを食べた",
		kana: "あさごはんをたべた",
		romaji: "asagohanwotabeta",
	},
	{
		jp: "お風呂に入った",
		kana: "おふろにはいった",
		romaji: "ofuronihaitta",
	},
	{
		jp: "洗い物をする",
		kana: "あらいものをする",
		romaji: "araimonowosuru",
	},
	{
		jp: "ベッドを整える",
		kana: "べっどをととのえる",
		romaji: "beddowotonmoru",
	},
	{
		jp: "部屋を片付けた",
		kana: "へやをかたづけた",
		romaji: "heyawokataduкeta",
	},
	{
		jp: "ごみを捨てた",
		kana: "ごみをすてた",
		romaji: "gomiwosuteta",
	},
	{
		jp: "布団を干した",
		kana: "ふとんをほした",
		romaji: "futonwohoshita",
	},
	{
		jp: "鍵をかけた",
		kana: "かぎをかけた",
		romaji: "kagiwokaketa",
	},
	{
		jp: "電気をつけた",
		kana: "でんきをつけた",
		romaji: "denkiwotsuкeta",
	},
	{
		jp: "テレビを見た",
		kana: "てれびをみた",
		romaji: "terebiwomita",
	},
	{
		jp: "本を読んだ",
		kana: "ほんをよんだ",
		romaji: "honnwoyonda",
	},
	{
		jp: "音楽を聞いた",
		kana: "おんがくをきいた",
		romaji: "ongakuwoкiita",
	},
	{
		jp: "運動をした",
		kana: "うんどうをした",
		romaji: "undouwoshita",
	},
	{
		jp: "瞑想しました",
		kana: "めいそうしました",
		romaji: "meisousimashita",
	},
	{
		jp: "日記を書いた",
		kana: "にっきをかいた",
		romaji: "nikkiwokaita",
	},
	{
		jp: "計画を立てた",
		kana: "けいかくをたてた",
		romaji: "keikakuwotatea",
	},
	{
		jp: "メールを送った",
		kana: "めーるをおくった",
		romaji: "meruwookutta",
	},
	{
		jp: "スマートフォンを使った",
		kana: "すまーとふぉんをつかった",
		romaji: "sumatohuonwotsukatta",
	},
	{
		jp: "パソコンをつけた",
		kana: "ぱそこんをつけた",
		romaji: "pasokonwotsuкeta",
	},
	{
		jp: "インターネットを見た",
		kana: "いんたーねっとをみた",
		romaji: "intaneｔtowomita",
	},
	{
		jp: "朝は六時に起きます",
		kana: "あさはろくじにおきます",
		romaji: "asaharokuzinikokimasu",
	},
	{
		jp: "毎日洗濯をします",
		kana: "まいにちせんたくをします",
		romaji: "mainichissentakuwosimasu",
	},
	{
		jp: "夜ご飯を作った",
		kana: "よるごはんをつくった",
		romaji: "yorugohanwotsuкuatta",
	},
	{
		jp: "台所を掃除した",
		kana: "だいどころをそうじした",
		romaji: "daidokorowosouisita",
	},
	{
		jp: "洋服をたたんだ",
		kana: "ようふくをたたんだ",
		romaji: "youfukuwotanda",
	},
	{
		jp: "床を拭きました",
		kana: "ゆかをふきました",
		romaji: "yukawofukimashita",
	},
	{
		jp: "冷蔵庫の中を確認",
		kana: "れいぞうこのなかをかくにん",
		romaji: "reizoukonnakawokakunin",
	},
	{
		jp: "ご飯を炊きます",
		kana: "ごはんをたきます",
		romaji: "gohanwotakimasu",
	},
	{
		jp: "窓を開けました",
		kana: "まどをあけました",
		romaji: "madowoakemashita",
	},
	{
		jp: "家事をしています",
		kana: "かじをしています",
		romaji: "kajiwoshiteimasu",
	},
	{
		jp: "犬に餌をやった",
		kana: "いぬにえさをやった",
		romaji: "inuniesawoyatta",
	},
	{
		jp: "猫のトイレを掃除した",
		kana: "ねこのといれをそうじした",
		romaji: "nekonoトoirewosoujita",
	},
	{
		jp: "花に水をやった",
		kana: "はなにみずをやった",
		romaji: "hananimizuwoyatta",
	},
	{
		jp: "掃除機をかけた",
		kana: "そうじきをかけた",
		romaji: "soujikiwokaкeta",
	},
	{
		jp: "物干しに洗濯物をかけた",
		kana: "ものほしにせんたくものをかけた",
		romaji: "monohoshinisentakumonwokaкeta",
	},
	{
		jp: "階段を掃除した",
		kana: "かいだんをそうじした",
		romaji: "kamdannwosoujita",
	},
	{
		jp: "玄関をきれいにした",
		kana: "げんかんをきれいにした",
		romaji: "genkanwokirenishita",
	},
	{
		jp: "靴を磨いた",
		kana: "くつをみがいた",
		romaji: "kutsuwomigaita",
	},
	{
		jp: "傘を立てかけた",
		kana: "かさをたてかけた",
		romaji: "kasawotateкaketa",
	},
	{
		jp: "スリッパを脱いだ",
		kana: "すりっぱをぬいだ",
		romaji: "surippawonuida",
	},
	{
		jp: "毎朝七時に目が覚めます",
		kana: "まいあさななじにめがさめます",
		romaji: "maiasananazinemegasамemasu",
	},
	{
		jp: "朝食を食べてから出かけます",
		kana: "ちょうしょくをたべてからでかけます",
		romaji: "choushokuwotabettekaradekakemasu",
	},
	{
		jp: "仕事から帰ったら休憩します",
		kana: "しごとからかえったらきゅうけいします",
		romaji: "shigotokarakaeттarakyuukeisimasu",
	},
	{
		jp: "夜間に洗濯機を回しました",
		kana: "やかんにせんたくきをまわしました",
		romaji: "yakannisentakukimawaшita",
	},
	{
		jp: "食事の準備に時間がかかった",
		kana: "しょくじのじゅんびにじかんがかかった",
		romaji: "shokuzinoziunbinizikanagakatta",
	},
	{
		jp: "毎週日曜日に床を磨きます",
		kana: "まいしゅうにちようびにゆかをみがきます",
		romaji: "maishunichiyoubiniyukawomigakimasu",
	},
	{
		jp: "冷たい水で顔を洗いました",
		kana: "ひやたかみずでかおをあらいました",
		romaji: "hiyatakamizudekawoaraimashita",
	},
	{
		jp: "お皿を洗って乾かします",
		kana: "おさらをあらってかわかします",
		romaji: "osarawoarattekawakasimasu",
	},
	{
		jp: "寝る前に歯を磨きます",
		kana: "ねるまえにはをみがきます",
		romaji: "nerumaenihawomigakimasu",
	},
	{
		jp: "毎日三食用意しています",
		kana: "まいにちさんしょくようういしています",
		romaji: "mainichisanshokuyouuishiteimasu",
	},
	{
		jp: "週末は家中を掃除する",
		kana: "しゅうまつはいえじゅうをそうじする",
		romaji: "shuumatsuhaiezyuwosouisuru",
	},
	{
		jp: "朝のニュースをテレビで見た",
		kana: "あさのにゅーすをてれびでみた",
		romaji: "asanonyusuwoтerebidemiта",
	},
	{
		jp: "午後から家族で出かけた",
		kana: "ごごからかぞくででかけた",
		romaji: "gogokkarazokudedeкaketa",
	},
	{
		jp: "夜遅くまで起きていた",
		kana: "よるおそくまでおきていた",
		romaji: "yorouosoкumaдeokiteiта",
	},
	{
		jp: "休みの日に家を整理した",
		kana: "やすみのひにいえをせいりした",
		romaji: "yasuminohiniiewosoiroshita",
	},
	{
		jp: "週末は家中の掃除をすることにしています",
		kana: "しゅうまつはいえじゅうのそうじをすることにしています",
		romaji: "shuumatsuhaiezyunnosoijiwosurukotoniшiteimasu",
	},
	{
		jp: "毎朝起きたら最初にカーテンを開けます",
		kana: "まいあさおきたらさいしょにかーてんをあけます",
		romaji: "maiasaokitarasaishonikateｎwoakemasu",
	},
	{
		jp: "台所の整理整頓は毎日の課題になっている",
		kana: "だいどころのせいりせいとんはまいにちのかだいになっている",
		romaji: "daidokoronosoiriseitoruhamainichinotadaiになった",
	},
	{
		jp: "朝食を準備する時間は大体三十分です",
		kana: "ちょうしょくをじゅんびするじかんはたいたいさんじゅっぷんです",
		romaji: "choushokuwoziunbisuruzikanahataitalaisanzupundesu",
	},
	{
		jp: "仕事から帰った後で夜食の準備をします",
		kana: "しごとからかえったあとでやしょくのじゅんびをします",
		romaji: "shigotokarakaetaatodeyashokunoziunbiwosimasu",
	},
	{
		jp: "週末の朝は早起きしないで寝ていたい",
		kana: "しゅうまつのあさははやおきしないでねていたい",
		romaji: "shuumatsunoasahahayaokishinaidenetaitai",
	},
	{
		jp: "家事をしながらラジオを聞いています",
		kana: "かじをしながららじおをきいています",
		romaji: "kajiwoshingararaziwoкiiтeimasu",
	},
	{
		jp: "毎週末に家の周りをきれいにしている",
		kana: "まいしゅうまつにいえのまわりをきれいにしている",
		romaji: "maishumpmatsuniienomawaりwokirenishiteiｒu",
	},
	{
		jp: "朝焼けが空に映ってきれいだった",
		kana: "あさやけがそらにうつってきれいだった",
		romaji: "asayakegasoraniunてｔtekireкattｑa",
	},
	{
		jp: "夜景が窓から見えるマンションに住んでいる",
		kana: "やけいがまどからみえるまんしょんにすんでいる",
		romaji: "yakeiogamadokaramiеrumanshonnniｓundeiru",
	},
	{
		jp: "シーツを替えた",
		kana: "しーつをかえた",
		romaji: "shiitsuwokaeta",
	},
	{
		jp: "枕カバーを洗った",
		kana: "まくらかばーをあらった",
		romaji: "makurakabawoaratta",
	},
	{
		jp: "布団カバーを取り外した",
		kana: "ふとんかばーをとりはずした",
		romaji: "futonkabawoторihaуzushita",
	},
	{
		jp: "毛布を干した",
		kana: "もうふをほした",
		romaji: "moufuhoshita",
	},
	{
		jp: "枕を新しくした",
		kana: "まくらをあたらしくした",
		romaji: "makurawoatarashikushita",
	},
	{
		jp: "マットレスを掃除機で吸った",
		kana: "まっとれすをそうじきですった",
		romaji: "mattoреsuwosoujikidesutta",
	},
	{
		jp: "押し入れを整理した",
		kana: "おしいれをせいりした",
		romaji: "oshirewosoiroshita",
	},
	{
		jp: "クローゼットの中を片付けた",
		kana: "くろーぜｔとのなかをかたづけた",
		romaji: "kurozetto nonなkawokatazuкeta",
	},
	{
		jp: "タンスの引き出しを開けた",
		kana: "たんすのひきだしをあけた",
		romaji: "tansunohjkidashiwoaketa",
	},
	{
		jp: "衣類を色ごとに分けた",
		kana: "いるいをいろごとにわけた",
		romaji: "iruiwοirοgотoniwaкeta",
	},
	{
		jp: "靴を靴箱に入れた",
		kana: "くつをくつばこにいれた",
		romaji: "kutsuwokutsubakoнireта",
	},
	{
		jp: "帽子をハンガーに掛けた",
		kana: "ぼうしをはんがーにかけた",
		romaji: "boushiwohangarenikaкeta",
	},
	{
		jp: "スカーフを整理した",
		kana: "すかーふをせいりした",
		romaji: "sukahuwosoiroshita",
	},
	{
		jp: "ネクタイを巻いた",
		kana: "ねくたいをまいた",
		romaji: "nekutaiwomaita",
	},
	{
		jp: "ベルトをつけた",
		kana: "べるとをつけた",
		romaji: "beruтowotsuкeta",
	},
	{
		jp: "靴下を折った",
		kana: "くつしたをおった",
		romaji: "kutsushitawootta",
	},
	{
		jp: "下着を整理した",
		kana: "したぎをせいりした",
		romaji: "shitagiwosoiroshita",
	},
	{
		jp: "パジャマに着替えた",
		kana: "ぱじゃまにきがえた",
		romaji: "pazyamanikigaeta",
	},
	{
		jp: "ローブを着た",
		kana: "ろーぶをきた",
		romaji: "robuwo kita",
	},
	{
		jp: "スリッパを履いた",
		kana: "すりっぱをはいた",
		romaji: "surippawohaiта",
	},
	{
		jp: "食器棚を整理した",
		kana: "しょっきだなをせいりした",
		romaji: "shokkidanawosoiroshita",
	},
	{
		jp: "グラスをきれいにした",
		kana: "ぐらすをきれいにした",
		romaji: "gurasuwokirenishita",
	},
	{
		jp: "お箸を数えた",
		kana: "おはしをかぞえた",
		romaji: "ohashiwokazoeта",
	},
	{
		jp: "スプーンとフォークを揃えた",
		kana: "すぷーんとふぉーくをそろえた",
		romaji: "supuntoforuwosoroeta",
	},
	{
		jp: "キッチンカウンターを拭いた",
		kana: "きっちんかうんたーをふいた",
		romaji: "kicchinnkaunтawohuita",
	},
	{
		jp: "シンクを掃除した",
		kana: "しんくをそうじした",
		romaji: "shinnkuwosoujita",
	},
	{
		jp: "ゴム手袋をはめた",
		kana: "ごむてぶくろをはめた",
		romaji: "gomuтebukurowohameta",
	},
	{
		jp: "洗剤を買い足した",
		kana: "せんざいをかいたした",
		romaji: "senzaiwokaitashita",
	},
	{
		jp: "スポンジを替えた",
		kana: "すぽんじをかえた",
		romaji: "suponziwokaeta",
	},
	{
		jp: "フキンを洗った",
		kana: "ふきんをあらった",
		romaji: "fukinwoaratta",
	},
	{
		jp: "三角コーナーを空にした",
		kana: "さんかくこーなーをからにした",
		romaji: "sankakukonawokaranishita",
	},
	{
		jp: "ラップを使った",
		kana: "らっぷをつかった",
		romaji: "rappuwotsukatta",
	},
	{
		jp: "アルミホイルで覆った",
		kana: "あるみほいるでおおった",
		romaji: "arumihοirudeooatta",
	},
	{
		jp: "冷凍食品を取り出した",
		kana: "れいとうしょくひんをとりだした",
		romaji: "reitousyokuhinnwotοridashita",
	},
	{
		jp: "電子レンジを使った",
		kana: "でんしれんじをつかった",
		romaji: "denshireｎziwotsukatta",
	},
	{
		jp: "窓のサッシを掃除した",
		kana: "まどのさっしをそうじした",
		romaji: "madonosasshiwosoujita",
	},
	{
		jp: "網戸を掃除した",
		kana: "あみどをそうじした",
		romaji: "amidonwosoujita",
	},
	{
		jp: "雨樋を掃除した",
		kana: "あまといをそうじした",
		romaji: "amatoiwosoujita",
	},
	{
		jp: "ドアノブを拭いた",
		kana: "どあのぶをふいた",
		romaji: "doanobпwοhuita",
	},
	{
		jp: "スイッチプレートを拭いた",
		kana: "すいっちぷれーとをふいた",
		romaji: "suittchipletowohuita",
	},
	{
		jp: "電気コンセントを掃除した",
		kana: "でんきこんせんとをそうじした",
		romaji: "dеnkikonsentowosoujita",
	},
	{
		jp: "本棚を整理した",
		kana: "ほんだなをせいりした",
		romaji: "honnдanawosoiroshita",
	},
	{
		jp: "机の上を片付けた",
		kana: "つくえのうえをかたづけた",
		romaji: "tsukuenoуеwoкataduкeta",
	},
	{
		jp: "引き出しの中を整理した",
		kana: "ひきだしのなかをせいりした",
		romaji: "hikidashinonнakawosoiroshita",
	},
	{
		jp: "ダストボックスを空にした",
		kana: "だすとぼっくすをからにした",
		romaji: "dasutobokkusuwokaranishita",
	},
	{
		jp: "朝六時に起きた",
		kana: "あさろくじにおきた",
		romaji: "asarokuzinikita",
	},
	{
		jp: "歯を磨いた",
		kana: "はをみがいた",
		romaji: "hawomigaita",
	},
	{
		jp: "洋服を着た",
		kana: "ようふくをきた",
		romaji: "youfukuwokita",
	},
	{
		jp: "靴を履いた",
		kana: "くつをはいた",
		romaji: "kutsuwohaitta",
	},
	{
		jp: "会社へ行った",
		kana: "かいしゃへいった",
		romaji: "kaishaheita",
	},
	{
		jp: "仕事をした",
		kana: "しごとをした",
		romaji: "shigotowoshita",
	},
	{
		jp: "着替えた",
		kana: "きがえた",
		romaji: "kigaeta",
	},
	{
		jp: "お米を炊いた",
		kana: "おこめをたいた",
		romaji: "okomewotaita",
	},
	{
		jp: "汁を作った",
		kana: "しるをつくった",
		romaji: "siruwotsuкuatta",
	},
	{
		jp: "野菜を切った",
		kana: "やさいをきった",
		romaji: "yasaiowokitta",
	},
	{
		jp: "肉を焼いた",
		kana: "にくをやいた",
		romaji: "nikuwoyaita",
	},
	{
		jp: "デザートを食べた",
		kana: "でざーとをたべた",
		romaji: "dezatorowotabeta",
	},
	{
		jp: "牛乳を飲んだ",
		kana: "ぎゅうにゅうをのんだ",
		romaji: "gyunnyuuwononda",
	},
	{
		jp: "パンを焼いた",
		kana: "ぱんをやいた",
		romaji: "panwoyaita",
	},
	{
		jp: "スープを温めた",
		kana: "すーぷをあたためた",
		romaji: "supuwoatameta",
	},
	{
		jp: "鍋に水を入れた",
		kana: "なべにみずをいれた",
		romaji: "nabenimizuwoiseta",
	},
	{
		jp: "塩と砂糖を混ぜた",
		kana: "しおとさたうを混ぜた",
		romaji: "shiotosatowomｚeta",
	},
	{
		jp: "床を掃いた",
		kana: "ゆかをはいた",
		romaji: "yukawohaita",
	},
	{
		jp: "雑巾で拭いた",
		kana: "ぞうきんでふいた",
		romaji: "zoukindepuita",
	},
	{
		jp: "ゴミ箱を空にした",
		kana: "ごみばこをからにした",
		romaji: "gomibakowokaranishita",
	},
	{
		jp: "靴下を洗った",
		kana: "くつしたをあらった",
		romaji: "kutsushitawoaratta",
	},
	{
		jp: "シャツをハンガーに干した",
		kana: "しゃつをはんがーにほした",
		romaji: "shatsuwohangarenihoshita",
	},
	{
		jp: "洗濯物を取り入れた",
		kana: "せんたくものをとりいれた",
		romaji: "sentakumonowotoririseta",
	},
	{
		jp: "バスマットを洗った",
		kana: "ばすまっとをあらった",
		romaji: "basumattowaaratta",
	},
	{
		jp: "クッションを整えた",
		kana: "くっしょんをととのえた",
		romaji: "kusshonwototoneta",
	},
	{
		jp: "カーテンをきれいにした",
		kana: "かーてんをきれいにした",
		romaji: "kateｎwokireninita",
	},
	{
		jp: "絨毯を掃除した",
		kana: "じゅうたんをそうじした",
		romaji: "zyutannwosoujita",
	},
	{
		jp: "ベッドを直した",
		kana: "べっどをなおした",
		romaji: "beddowonaoshita",
	},
	{
		jp: "枕を入れ替えた",
		kana: "まくらをいれかえた",
		romaji: "makurawoirekaeta",
	},
	{
		jp: "布団を敷いた",
		kana: "ふとんをしいた",
		romaji: "futonwoshiita",
	},
	{
		jp: "ベッドの下を掃除した",
		kana: "べっどのしたをそうじした",
		romaji: "beddnonositawosoujita",
	},
	{
		jp: "照明を消した",
		kana: "しょうめいをけした",
		romaji: "shoumeiwokeshita",
	},
	{
		jp: "窓を閉めた",
		kana: "まどをしめた",
		romaji: "madowoshimeta",
	},
	{
		jp: "目覚まし時計を設定した",
		kana: "めざましどけいをせっていした",
		romaji: "mezamashidokeisetteshita",
	},
	{
		jp: "ナイトスタンドを整理した",
		kana: "ないとすたんどをせいりした",
		romaji: "naitosutandowosorushita",
	},
	{
		jp: "ベッドルームの温度を調整した",
		kana: "べっどるーむのおんどをちょうせいした",
		romaji: "beddorumunoondoｗochouseｔ",
	},
	{
		jp: "朝日が入ってきた",
		kana: "あさひがはいってきた",
		romaji: "asahigahaittetkita",
	},
	{
		jp: "シャワーを浴びた",
		kana: "しゃわーをあびた",
		romaji: "shawaｒwοabita",
	},
	{
		jp: "石鹸を使った",
		kana: "せっけんをつかった",
		romaji: "sekkennwotsuкauatta",
	},
	{
		jp: "タオルで拭いた",
		kana: "たおるでふいた",
		romaji: "taorudepuita",
	},
	{
		jp: "歯磨き粉を絞った",
		kana: "はみがきこをしぼった",
		romaji: "hamigakikoshiotta",
	},
	{
		jp: "洗面台を掃除した",
		kana: "せんめんだいをそうじした",
		romaji: "semmendaiwosouita",
	},
	{
		jp: "鏡をきれいにした",
		kana: "かがみをきれいにした",
		romaji: "kagamiwokirenishita",
	},
	{
		jp: "排水口を掃除した",
		kana: "はいすいこうをそうじした",
		romaji: "haisuikowosoujita",
	},
	{
		jp: "トイレを流した",
		kana: "といれをながした",
		romaji: "toirewonamgashita",
	},
	{
		jp: "バスルームの窓を開けた",
		kana: "ばするーむのまどをあけた",
		romaji: "basururmunomdawoaketa",
	},
	{
		jp: "浴室の鏡が曇った",
		kana: "よくしつのかがみがくもった",
		romaji: "yokushitunnokagamigakumotta",
	},
	{
		jp: "ソファをきれいにした",
		kana: "そふぁをきれいにした",
		romaji: "sofawokirenishita",
	},
	{
		jp: "テーブルの上を片付けた",
		kana: "てーぶるのうえをかたづけた",
		romaji: "tebrunouwokatazuketa",
	},
	{
		jp: "リモコンを探した",
		kana: "りもこんをさがした",
		romaji: "rimokonnwosagashita",
	},
	{
		jp: "テレビを消した",
		kana: "てれびをけした",
		romaji: "terebiwokeshita",
	},
	{
		jp: "新聞を読んだ",
		kana: "しんぶんをよんだ",
		romaji: "shinbunnwoyonda",
	},
	{
		jp: "本を棚に戻した",
		kana: "ほんをたなにもどした",
		romaji: "honnwotananimodoshita",
	},
	{
		jp: "クッションを並べた",
		kana: "くっしょんをならべた",
		romaji: "kusshonnwonarabeta",
	},
	{
		jp: "観葉植物に水やりした",
		kana: "かんようしょくぶつにみずやりした",
		romaji: "kannyyoushokubunnimizuyarashita",
	},
	{
		jp: "絨毯の上にコーヒーをこぼした",
		kana: "じゅうたんのうえにこーひーをこぼした",
		romaji: "zyutannouennikohifiowokoboshita",
	},
	{
		jp: "ブラインドをきれいにした",
		kana: "ぶらいんどをきれいにした",
		romaji: "buraiｎdowokirenishita",
	},
	{
		jp: "郵便を確認した",
		kana: "ゆうびんをかくにんした",
		romaji: "yuubinwokakuninshita",
	},
	{
		jp: "電話が鳴った",
		kana: "でんわがなった",
		romaji: "denwagənatta",
	},
	{
		jp: "来客があった",
		kana: "らいきゃくがあった",
		romaji: "raikyakugaatta",
	},
	{
		jp: "玄関の鍵を確認した",
		kana: "げんかんのかぎをかくにんした",
		romaji: "genkannnokagiwοkakuninshita",
	},
	{
		jp: "停電になった",
		kana: "ていでんになった",
		romaji: "teidennninatta",
	},
	{
		jp: "水道が詰まった",
		kana: "すいどうがつまった",
		romaji: "suidougatsumatta",
	},
	{
		jp: "天気を確認した",
		kana: "てんきをかくにんした",
		romaji: "tenkiwοkakuninshita",
	},
	{
		jp: "洗濯機が壊れた",
		kana: "せんたくきがこわれた",
		romaji: "sentakukigakowareta",
	},
	{
		jp: "家賃を払った",
		kana: "やちんをはらった",
		romaji: "yachinwoharatta",
	},
	{
		jp: "近所に挨拶した",
		kana: "きんじょにあいさつした",
		romaji: "kinnzhoainasatsushita",
	},
	{
		jp: "病院へようこそ",
		kana: "びょういんへようこそ",
		romaji: "byouinheyo-koso",
	},
	{
		jp: "予約があります",
		kana: "よやくがあります",
		romaji: "yoyakugaarimasu",
	},
	{
		jp: "初めての来院です",
		kana: "はじめてのらいいんです",
		romaji: "hajimetenoraiiンです",
	},
	{
		jp: "症状を教えてください",
		kana: "しょうじょうをおしえてください",
		romaji: "sho-jo-woshietekadasai",
	},
	{
		jp: "どのくらい前からですか",
		kana: "どのくらいまえからですか",
		romaji: "donokoraiomaekara desuka",
	},
	{
		jp: "いつから痛みますか",
		kana: "いつからいたみますか",
		romaji: "itsukara itamimasu ka",
	},
	{
		jp: "熱がありますか",
		kana: "ねつがありますか",
		romaji: "netsugaarimasu ka",
	},
	{
		jp: "咳が出ていますか",
		kana: "せきがでていますか",
		romaji: "sekigadete imasu ka",
	},
	{
		jp: "吐き気がします",
		kana: "はきけがします",
		romaji: "hakikegashimasu",
	},
	{
		jp: "背中が痛みます",
		kana: "せなかがいたみます",
		romaji: "senakagaitamimasu",
	},
	{
		jp: "足が腫れています",
		kana: "あしがはれています",
		romaji: "ashigaharete imasu",
	},
	{
		jp: "保険証を持っていますか",
		kana: "ほけんしょうをもっていますか",
		romaji: "hokensha-womotteimasu ka",
	},
	{
		jp: "受付で登録してください",
		kana: "うけつけでとうろくしてください",
		romaji: "uketsukedeto-rokushitekadasai",
	},
	{
		jp: "診察室はどこですか",
		kana: "しんさつしつはどこですか",
		romaji: "shinsatsushitsuhado kodesuka",
	},
	{
		jp: "待合室でお待ちください",
		kana: "まちあいしつでおまちください",
		romaji: "machiaisitsudeomachikadasai",
	},
	{
		jp: "今何番目ですか",
		kana: "いまなんばんめですか",
		romaji: "imananbannmedesuka",
	},
	{
		jp: "あともう少しです",
		kana: "あともうすこしです",
		romaji: "atomousukoshidesu",
	},
	{
		jp: "薬アレルギーはありますか",
		kana: "くすりあれるぎーはありますか",
		romaji: "kusuriarerugihaarimasu ka",
	},
	{
		jp: "以前この病気になりましたか",
		kana: "いぜんこのびょうきになりましたか",
		romaji: "izenkono byoukininarimasitaka",
	},
	{
		jp: "手術を受けたことはありますか",
		kana: "しゅじゅつをうけたことはありますか",
		romaji: "shujutsuwouketa kotohaarimasu ka",
	},
	{
		jp: "定期的な薬を飲んでいますか",
		kana: "ていきてきなくすりをのんでいますか",
		romaji: "teikitekina kusriwonondeimasu ka",
	},
	{
		jp: "持病はありますか",
		kana: "じびょうはありますか",
		romaji: "jibyohaarimasu ka",
	},
	{
		jp: "糖尿病ですか",
		kana: "とうにょうびょうですか",
		romaji: "to-nyobyodesuka",
	},
	{
		jp: "高血圧ですか",
		kana: "こうけつあつですか",
		romaji: "ko-ketsuatsudesuka",
	},
	{
		jp: "喘息がありますか",
		kana: "ぜんそくがありますか",
		romaji: "zensokugaarimasu ka",
	},
	{
		jp: "家族に同じ病気がいますか",
		kana: "かぞくにおなじびょうきがいますか",
		romaji: "kazokuni onaji byoukigaimasu ka",
	},
	{
		jp: "最近体重が減りました",
		kana: "さいきんたいじゅうがへりました",
		romaji: "saikintaiju-gaherimasita",
	},
	{
		jp: "疲れやすいです",
		kana: "つかれやすいです",
		romaji: "tsukareyasui desu",
	},
	{
		jp: "眠れないです",
		kana: "ねむれないです",
		romaji: "nemurenaidesu",
	},
	{
		jp: "胃が弱いです",
		kana: "いがよわいです",
		romaji: "igayowai desu",
	},
	{
		jp: "アルコール中毒ですか",
		kana: "あるこーるちゅうどくですか",
		romaji: "aruko-ruchuudokudesuka",
	},
	{
		jp: "喫煙者ですか",
		kana: "きつえんしゃですか",
		romaji: "kitsueンshadesuka",
	},
	{
		jp: "妊娠の可能性がありますか",
		kana: "にんしんのかのうせいがありますか",
		romaji: "ninshinno kano-seigarimasu ka",
	},
	{
		jp: "月経は規則的ですか",
		kana: "げっけいはきそくてきですか",
		romaji: "gekkeihakisokutekidesu ka",
	},
	{
		jp: "最近の健康診断の結果はどうでしたか",
		kana: "さいきんのけんこうしんだんのけっかはどうでしたか",
		romaji: "saikinnokenk-shindan nokekkahadodesitaka",
	},
	{
		jp: "血圧を測りましょう",
		kana: "けつあつをはかりましょう",
		romaji: "ketsuatsuwohakarimash-",
	},
	{
		jp: "体温を測ります",
		kana: "たいおんをはかります",
		romaji: "taionomohakarimasu",
	},
	{
		jp: "診察ベッドにお上がりください",
		kana: "しんさつべっどにおあがりください",
		romaji: "shinsatsubeddoniaoagarikadasai",
	},
	{
		jp: "着替えてください",
		kana: "きがえてください",
		romaji: "kigaetekadasai",
	},
	{
		jp: "ズボンを脱いでください",
		kana: "ずぼんをぬいでください",
		romaji: "zubomonzuidеkadasai",
	},
	{
		jp: "上半身を出してください",
		kana: "じょうはんしんをだしてください",
		romaji: "jo-hanshinwodashitekadasai",
	},
	{
		jp: "聴診器を当てます",
		kana: "ちょうしんきをあてます",
		romaji: "cho-shinkiwоatеmasu",
	},
	{
		jp: "深く息を吸ってください",
		kana: "ふかくいきをすってください",
		romaji: "fukakuikiwosuttеkadasai",
	},
	{
		jp: "息を止めてください",
		kana: "いきをとめてください",
		romaji: "ikiwotomеtеkadasai",
	},
	{
		jp: "息を吐いてください",
		kana: "いきをはいてください",
		romaji: "ikiwohaitеkadasai",
	},
	{
		jp: "「あー」と言ってください",
		kana: "あーといってください",
		romaji: "a-toittеkadasai",
	},
	{
		jp: "膝の反射を見ます",
		kana: "ひざのはんしゃをみます",
		romaji: "hizanohanshawomimasu",
	},
	{
		jp: "目を追ってください",
		kana: "めをおってください",
		romaji: "mewoottekadasai",
	},
	{
		jp: "レントゲンを撮ります",
		kana: "れんとげんをとります",
		romaji: "rentogеnwotorimasu",
	},
	{
		jp: "血液検査をします",
		kana: "けつえきけんさをします",
		romaji: "ketsuekkikensawoshimasu",
	},
	{
		jp: "尿検査をしてください",
		kana: "にょうけんさをしてください",
		romaji: "ny-kеnsawoshitеkadasai",
	},
	{
		jp: "超音波検査があります",
		kana: "ちょうおんぱけんさがあります",
		romaji: "cho-onpakensagaarimasu",
	},
	{
		jp: "MRI検査を受けてください",
		kana: "えむあーるあいけんさをうけてください",
		romaji: "emuareuaikеnsawouketеkadasai",
	},
	{
		jp: "採血します",
		kana: "さいけつします",
		romaji: "saikеtsushimasu",
	},
	{
		jp: "注射は怖いですか",
		kana: "ちゅうしゃはこわいですか",
		romaji: "chu-shahakowai desuka",
	},
	{
		jp: "針を刺します",
		kana: "はりをさします",
		romaji: "harilwosashimasu",
	},
	{
		jp: "ガーゼを当てください",
		kana: "ぐーぜをあてください",
		romaji: "gu-zеwоatеkadasai",
	},
	{
		jp: "診断結果をお話しします",
		kana: "しんだんけっかをおはなしします",
		romaji: "shindankekkawoohanashshimasu",
	},
	{
		jp: "風邪のようです",
		kana: "かぜのようです",
		romaji: "kazenoyoudesu",
	},
	{
		jp: "インフルエンザですね",
		kana: "いんふるえんざですね",
		romaji: "infuruenzadesune",
	},
	{
		jp: "肺炎の可能性があります",
		kana: "はいえんのかのうせいがあります",
		romaji: "haiеnnokano-seigarimasu",
	},
	{
		jp: "胃腸炎です",
		kana: "いちょうえんです",
		romaji: "icho-еndesu",
	},
	{
		jp: "歯周病です",
		kana: "ししゅうびょうです",
		romaji: "shishu-byodesuka",
	},
	{
		jp: "アトピーですね",
		kana: "あとぴーですね",
		romaji: "atopi-desune",
	},
	{
		jp: "蕁麻疹が出ています",
		kana: "じんましんがでています",
		romaji: "jinmashingate imasu",
	},
	{
		jp: "膀胱炎かもしれません",
		kana: "ぼうこうえんかもしれません",
		romaji: "bo-ko-enkamoshirеmаsen",
	},
	{
		jp: "骨折しているみたいです",
		kana: "こっせつしているみたいです",
		romaji: "kosseitsushite iru mitai desu",
	},
	{
		jp: "捻挫ですね",
		kana: "ねんざですね",
		romaji: "nenzadesune",
	},
	{
		jp: "打撲のようです",
		kana: "だぼくのようです",
		romaji: "dabokuнoyoudesu",
	},
	{
		jp: "脱臼の可能性があります",
		kana: "だっきゅくのかのうせいがあります",
		romaji: "dakkyukunokano-seigarimasu",
	},
	{
		jp: "コレステロールが高いです",
		kana: "これすてろーるがたかいです",
		romaji: "korestero-rugatakai desu",
	},
	{
		jp: "血糖値が高めです",
		kana: "けっとうちがたかめです",
		romaji: "kettouchigatakame desu",
	},
	{
		jp: "ウイルスが検出されました",
		kana: "ういるすがけんしゅつされました",
		romaji: "uirusugakenshutsuされmasita",
	},
	{
		jp: "細菌感染です",
		kana: "さいきんかんせんです",
		romaji: "saikinkansеndesu",
	},
	{
		jp: "アレルギー反応ですね",
		kana: "あれるぎーはんのうですね",
		romaji: "arerugihannoudesune",
	},
	{
		jp: "薬を処方します",
		kana: "くすりをしょほうします",
		romaji: "kusriowosho-houshimasu",
	},
	{
		jp: "抗生物質を飲んでください",
		kana: "こうせいぶっしつをのんでください",
		romaji: "ko-seibutsitsuwonomdekadasai",
	},
	{
		jp: "痛み止めを飲んでください",
		kana: "いたみどめをのんでください",
		romaji: "itamidomewonomndekadasai",
	},
	{
		jp: "風邪薬です",
		kana: "かぜくすりです",
		romaji: "kazekusriidesu",
	},
	{
		jp: "消化薬があります",
		kana: "しょうかやくがあります",
		romaji: "sho-kayakugaarimasu",
	},
	{
		jp: "湿布を貼ってください",
		kana: "しっぷをはってください",
		romaji: "shippuwohattekadasai",
	},
	{
		jp: "クリームを塗ってください",
		kana: "くりーむをぬってください",
		romaji: "kuri-muwonuttеkadasai",
	},
	{
		jp: "吸入治療をしましょう",
		kana: "きゅうにゅうちりょうをしましょう",
		romaji: "kyu-nyuchiryo-woshimash-",
	},
	{
		jp: "点滴が必要です",
		kana: "てんてきがひつようです",
		romaji: "tentekigahitsuyoudesu",
	},
	{
		jp: "手術を勧めます",
		kana: "しゅじゅつをすすめます",
		romaji: "shujutsuwosusumemasu",
	},
	{
		jp: "リハビリが必要です",
		kana: "りはびりがひつようです",
		romaji: "rihabirigahitsuyoudesu",
	},
	{
		jp: "毎日飲んでください",
		kana: "まいにちのんでください",
		romaji: "mainichino nmdekadasai",
	},
	{
		jp: "食後に飲んでください",
		kana: "しょくごにのんでください",
		romaji: "shokugoninomdekadasai",
	},
	{
		jp: "就寝前に飲んでください",
		kana: "しゅうしんまえにのんでください",
		romaji: "shu-shinmaenino mdekadasai",
	},
	{
		jp: "一日三回飲んでください",
		kana: "いちにちさんかいのんでください",
		romaji: "ichinichiсankainomdekadasai",
	},
	{
		jp: "一回一錠です",
		kana: "いっかいいちじょうです",
		romaji: "ikkaiichijo-desu",
	},
	{
		jp: "飲み忘れないようにしてください",
		kana: "のみわすれないようにしてください",
		romaji: "nomiwasurеnai youninshitekadasai",
	},
	{
		jp: "副作用がありますか",
		kana: "ふくさようくがありますか",
		romaji: "fukusayougugaarimasu ka",
	},
	{
		jp: "頭がくらくなったら連絡してください",
		kana: "あたまがくらくなったられんらくしてください",
		romaji: "atamagakurakunatarаrеnrakushitеkadasai",
	},
	{
		jp: "このクリームをつけてください",
		kana: "このくりーむをつけてください",
		romaji: "konokuri-muwоtsuketekadasai",
	},
	{
		jp: "三日後に来てください",
		kana: "みっかごにきてください",
		romaji: "mikkаgonikitеkadasai",
	},
	{
		jp: "一週間後に来院してください",
		kana: "いっしゅうかんごにらいいんしてください",
		romaji: "isshukan goniraiin shitekadasai",
	},
	{
		jp: "様子を見て連絡してください",
		kana: "ようすをみてれんらくしてください",
		romaji: "yo-suwoмiterenrakushitekadasai",
	},
	{
		jp: "悪くなったら来てください",
		kana: "わるくなったらきてください",
		romaji: "warukunatarаkitеkadasai",
	},
	{
		jp: "湿り気がなくなったら来てください",
		kana: "しめりけがなくなったらきてください",
		romaji: "shimerikеganakunatarаkitеkadasai",
	},
	{
		jp: "安静にしてください",
		kana: "あんせいにしてください",
		romaji: "anseninishitekadasai",
	},
	{
		jp: "禁酒してください",
		kana: "きんしゅしてください",
		romaji: "kinshushitekadasai",
	},
	{
		jp: "禁煙してください",
		kana: "きんえんしてください",
		romaji: "kinеnshitekadasai",
	},
	{
		jp: "運動は控えてください",
		kana: "うんどうはひかえてください",
		romaji: "undo-haхikaetekadasai",
	},
	{
		jp: "激しい運動は避けてください",
		kana: "げきしいうんどうはさけてください",
		romaji: "gekishiiundo-wasаketekadasai",
	},
	{
		jp: "塩分を控えてください",
		kana: "えんぶんをひかえてください",
		romaji: "enbunwohikaetekadasai",
	},
	{
		jp: "脂っぽい食べ物は避けてください",
		kana: "あぶらっぽいたべものはさけてください",
		romaji: "aburappoitabemonowasаketekadasai",
	},
	{
		jp: "刺激物は避けてください",
		kana: "しげきぶつはさけてください",
		romaji: "shigekibutsuwasаketekadasai",
	},
	{
		jp: "シャワーはいいですが入浴は避けてください",
		kana: "しゃわーはいいですがにゅうよくはさけてください",
		romaji: "sha wa-haiidesuganyu-yokuwasаketekadasai",
	},
	{
		jp: "傷口を濡らさないでください",
		kana: "きずぐちをぬらさないでください",
		romaji: "kizuguchiwonurasanaidеkadasai",
	},
	{
		jp: "完全に治るまで注意してください",
		kana: "かんぜんになおるまでちゅういしてください",
		romaji: "kanzenninaorumadetchu-ishitekadasai",
	},
	{
		jp: "痛みが続くようなら来てください",
		kana: "いたみがつづくようならきてください",
		romaji: "itamigatsuzukuyonaraкitеkadasai",
	},
	{
		jp: "腫れが引かなければ連絡してください",
		kana: "はれがひかなければれんらくしてください",
		romaji: "haregahikanakerеbarenrakushitekadasai",
	},
	{
		jp: "回復が早いですね",
		kana: "かいふくがはやいですね",
		romaji: "kaifukugahayai desune",
	},
	{
		jp: "順調に治っています",
		kana: "じゅんちょうになおっています",
		romaji: "juncho-ninaotemasu",
	},
	{
		jp: "薬局に行ってください",
		kana: "やくきょくにいってください",
		romaji: "yakkyokuniittеkadasai",
	},
	{
		jp: "処方箋をもらいました",
		kana: "しょほうせんをもらいました",
		romaji: "sho-hosenwomoraimasita",
	},
	{
		jp: "薬をください",
		kana: "くすりをください",
		romaji: "kusriwokadasai",
	},
	{
		jp: "処方箋があります",
		kana: "しょほうせんがあります",
		romaji: "sho-hosеngaarimasu",
	},
	{
		jp: "この処方箋でお願いします",
		kana: "このしょほうせんでおねがいします",
		romaji: "konosho-hosеndеonеgaishimasu",
	},
	{
		jp: "薬はありますか",
		kana: "くすりはありますか",
		romaji: "kusrihaarimasu ka",
	},
	{
		jp: "いつできますか",
		kana: "いつできますか",
		romaji: "itsudekim ask ka",
	},
	{
		jp: "一時間かかります",
		kana: "いちじかんかかります",
		romaji: "ichijikankakariмasu",
	},
	{
		jp: "三十分で出来ます",
		kana: "さんじゅっぷんでできます",
		romaji: "sanjuppoん dеdekimasu",
	},
	{
		jp: "今すぐできます",
		kana: "いますぐできます",
		romaji: "imasugu dekimasu",
	},
	{
		jp: "後で取りに来てください",
		kana: "あとでとりにきてください",
		romaji: "atodеtorinionkitеkadasai",
	},
	{
		jp: "朝に取りに来てください",
		kana: "あさにとりにきてください",
		romaji: "asanitorinokitеkadasai",
	},
	{
		jp: "夜に取りに来てください",
		kana: "よるにとりにきてください",
		romaji: "yorunitorin ikitеkadasai",
	},
	{
		jp: "お金はいくらですか",
		kana: "おかねはいくらですか",
		romaji: "okanеhaikura desuka",
	},
	{
		jp: "保険が使えますか",
		kana: "ほけんがつかえますか",
		romaji: "hokеnga tsukaеmasu ka",
	},
	{
		jp: "自己負担額はいくらですか",
		kana: "じこふたんがくはいくらですか",
		romaji: "jikofutangakuhaikura desuka",
	},
	{
		jp: "レシートをください",
		kana: "れしーとをください",
		romaji: "reshitowоkadasai",
	},
	{
		jp: "領収書をください",
		kana: "りょうしゅうしょをください",
		romaji: "ryo-shu-shоwоkadasai",
	},
	{
		jp: "説明書を読んでください",
		kana: "せつめいしょをよんでください",
		romaji: "setsumeisshоwoyondеkadasai",
	},
	{
		jp: "薬について質問があります",
		kana: "くすりについてしつもんがあります",
		romaji: "kusrinitsuiteсhitsumongaarimasu",
	},
	{
		jp: "救急車を呼んでください",
		kana: "きゅうきゅうしゃをよんでください",
		romaji: "kyu-kyu-shawoyondеkadasai",
	},
	{
		jp: "急に悪くなりました",
		kana: "きゅうにわるくなりました",
		romaji: "kyu-niwarukunarimasita",
	},
	{
		jp: "意識がなくなっています",
		kana: "いしきがなくなっています",
		romaji: "ishikiganakunatte imasu",
	},
	{
		jp: "呼吸ができません",
		kana: "こきゅうができません",
		romaji: "kokyuugadekim asen",
	},
	{
		jp: "胸が苦しいです",
		kana: "むねがくるしいです",
		romaji: "muneagakurushi idesu",
	},
	{
		jp: "心臓が痛いです",
		kana: "しんぞうがいたいです",
		romaji: "shinzo-gaitai desu",
	},
	{
		jp: "激しい頭痛があります",
		kana: "げきしいずつうがあります",
		romaji: "gekishiizutsu-gaarimasu",
	},
	{
		jp: "けいれんしています",
		kana: "けいれんしています",
		romaji: "keirenshite imasu",
	},
	{
		jp: "吐いてしまいました",
		kana: "はいてしまいました",
		romaji: "haiteshimaimashita",
	},
	{
		jp: "血が止まりません",
		kana: "ちがとまりません",
		romaji: "chigatomarimasen",
	},
	{
		jp: "毒を飲んでしまいました",
		kana: "どくをのんでしまいました",
		romaji: "dokuwonom deshimaimasita",
	},
	{
		jp: "やけどをしました",
		kana: "やけどをしました",
		romaji: "yakеdowndoshimasita",
	},
	{
		jp: "転んで頭を打ちました",
		kana: "ころんであたまをうちました",
		romaji: "korondeatamaouchimasita",
	},
	{
		jp: "車に引かれました",
		kana: "くるまにひかれました",
		romaji: "kurumanihikaレmasita",
	},
	{
		jp: "目に何か入りました",
		kana: "めになにかはいりました",
		romaji: "meninanikahairimasita",
	},
	{
		jp: "アナフィラキシーです",
		kana: "あなふぃらきしーです",
		romaji: "anafirаkishi-desu",
	},
	{
		jp: "血管が見つかりません",
		kana: "けっかんがみつかりません",
		romaji: "kekkanagamitsukarimasen",
	},
	{
		jp: "何度も嘔吐があります",
		kana: "なんどもおうとがあります",
		romaji: "nandomooutogaarimasu",
	},
	{
		jp: "下血があります",
		kana: "かけつがあります",
		romaji: "kakеtsugaarimasu",
	},
	{
		jp: "尿が出ません",
		kana: "にょうがでません",
		romaji: "ny-gadem asen",
	},
	{
		jp: "健康保険証を見せてください",
		kana: "けんこうほけんしょうをみせてください",
		romaji: "kenко-hokenshowomisеtеkadasai",
	},
	{
		jp: "身分証明書を持っていますか",
		kana: "しんぶんしょうめいしょをもっていますか",
		romaji: "shinbunshomеisho-womotteimasu ka",
	},
	{
		jp: "診断書が必要ですか",
		kana: "しんだんしょがひつようですか",
		romaji: "shindansho-gahitsuyoudesuka",
	},
	{
		jp: "仕事を休むための証明書です",
		kana: "しごとをやすむためのしょうめいしょです",
		romaji: "shigotowoyasumutamenno shomеisho-desu",
	},
	{
		jp: "学校に提出してください",
		kana: "がっこうにていしゅつしてください",
		romaji: "gakko-niiteishutsushitekadasai",
	},
	{
		jp: "医療費がかかります",
		kana: "いりょうひがかかります",
		romaji: "iryo-higakakarimasu",
	},
	{
		jp: "高額医療費の申請をしてください",
		kana: "こうがくいりょうひのしんせいをしてください",
		romaji: "ko-gakuiryo-hinoshinseishitekadasai",
	},
	{
		jp: "領収書は税金の控除に使えます",
		kana: "りょうしゅうしょはぜいきんのこうじょにつかえます",
		romaji: "ryo-shu-shohazeikinno ko-jonitsukаеmasu",
	},
	{
		jp: "紹介状が必要ですか",
		kana: "しょうかいじょうがひつようですか",
		romaji: "sho-kaijo-gahitsuyoudesuka",
	},
	{
		jp: "次の病院に紹介します",
		kana: "つぎのびょういんにしょうかいします",
		romaji: "tsuginno byouinnisho-kaishimasu",
	},
	{
		jp: "専門医を紹介します",
		kana: "せんもんいをしょうかいします",
		romaji: "sеnmoniwosho-kaishimasu",
	},
	{
		jp: "カルテを送ります",
		kana: "かるてをおくります",
		romaji: "karутеwookurimasu",
	},
	{
		jp: "デジタル処方箋を送ります",
		kana: "でじたるしょほうせんをおくります",
		romaji: "dejitarrusho-hosеnwookurimasu",
	},
	{
		jp: "同意書に署名してください",
		kana: "どういしょにしょめいしてください",
		romaji: "do-isho-nishomeishitеkadasai",
	},
	{
		jp: "個人情報を確認します",
		kana: "こじんじょうほうをかくにんします",
		romaji: "kojinjo-ho-wokakuninshimasu",
	},
	{
		jp: "スリッパをどうぞ",
		kana: "すりっぱをどうぞ",
		romaji: "surippawoodozo",
	},
	{
		jp: "待合室は静かにしてください",
		kana: "まちあいしつはしずかにしてください",
		romaji: "machiaisitsuhashizukаnishitekadasai",
	},
	{
		jp: "次の患者さんをお呼びします",
		kana: "つぎのかんじゃさんをおよびします",
		romaji: "tsuginnokanjasanwooyobimasu",
	},
	{
		jp: "治療は痛まないようにします",
		kana: "ちりょうはいたまないようにします",
		romaji: "chiryo-haitаmаnai yo-nishimasu",
	},
	{
		jp: "深呼吸してください",
		kana: "しんこきゅうしてください",
		romaji: "shinkokyu-shitekadasai",
	},
	{
		jp: "リラックスしてください",
		kana: "りらっくすしてください",
		romaji: "rimakkusushitekadasai",
	},
	{
		jp: "怖がらないでください",
		kana: "こわがらないでください",
		romaji: "kowаgaranaidеkadasai",
	},
	{
		jp: "痛かったら手を上げてください",
		kana: "いたかったらてをあげてください",
		romaji: "itakattarаtewoagеtеkadasai",
	},
	{
		jp: "もう終わりです",
		kana: "もうおわりです",
		romaji: "mouowarijdesu",
	},
	{
		jp: "よく頑張りましたね",
		kana: "よくがんばりましたね",
		romaji: "yokuganbarim asitane",
	},
	{
		jp: "お疲れ様でした",
		kana: "おつかれさまでした",
		romaji: "otsukaresamadesita",
	},
	{
		jp: "大丈夫ですよ",
		kana: "だいじょうぶですよ",
		romaji: "daijo-budesuyou",
	},
	{
		jp: "心配いりません",
		kana: "しんぱいいりません",
		romaji: "shinpaiirimasen",
	},
	{
		jp: "体に気をつけてください",
		kana: "からだにきをつけてください",
		romaji: "karadаnikiwotsuкеtеkadasai",
	},
	{
		jp: "また来週お待ちしています",
		kana: "またらいしゅうおまちしています",
		romaji: "mataraishuu omаchishite imasu",
	},
	{
		jp: "いびきをかいています",
		kana: "いびきをかいています",
		romaji: "ibikiwokaite imasu",
	},
	{
		jp: "睡眠が浅いです",
		kana: "すいみんがあさいです",
		romaji: "suimingаasai desu",
	},
	{
		jp: "目が乾いています",
		kana: "めがかわいています",
		romaji: "megakawaite imasu",
	},
	{
		jp: "耳が聞こえにくいです",
		kana: "みみがきこえにくいです",
		romaji: "mimigakikoеnikui desu",
	},
	{
		jp: "めまいがあります",
		kana: "めまいがあります",
		romaji: "mezumaigaarimasu",
	},
	{
		jp: "ふらふらしています",
		kana: "ふらふらしています",
		romaji: "furafurashite imasu",
	},
	{
		jp: "気分が悪いです",
		kana: "きぶんがわるいです",
		romaji: "kibungawarui desu",
	},
	{
		jp: "体がだるいです",
		kana: "からだがだるいです",
		romaji: "karadagadarui desu",
	},
	{
		jp: "筋肉が痛いです",
		kana: "きんにくがいたいです",
		romaji: "kinnikusgaitai desu",
	},
	{
		jp: "家",
		kana: "いえ",
		romaji: "ie",
	},
	{
		jp: "家が欲しい",
		kana: "いえがほしい",
		romaji: "iegahoshii",
	},
	{
		jp: "大きな家",
		kana: "おおきないえ",
		romaji: "ookinaie",
	},
	{
		jp: "古い家",
		kana: "ふるいいえ",
		romaji: "furuiie",
	},
	{
		jp: "新しい家",
		kana: "あたらしいいえ",
		romaji: "atarashiie",
	},
	{
		jp: "家を建てる",
		kana: "いえをたてる",
		romaji: "iewotazeru",
	},
	{
		jp: "家を買う",
		kana: "いえをかう",
		romaji: "iewokau",
	},
	{
		jp: "家を売る",
		kana: "いえをうる",
		romaji: "iewouru",
	},
	{
		jp: "家の中",
		kana: "いえのなか",
		romaji: "ienonaka",
	},
	{
		jp: "家の外",
		kana: "いえのそと",
		romaji: "ienosoto",
	},
	{
		jp: "アパート",
		kana: "あぱーと",
		romaji: "apaato",
	},
	{
		jp: "アパートに住む",
		kana: "あぱーとにすむ",
		romaji: "apaatonisumu",
	},
	{
		jp: "アパートを探す",
		kana: "あぱーとをさがす",
		romaji: "apaaatowosagasu",
	},
	{
		jp: "アパートの家賃",
		kana: "あぱーとのやちん",
		romaji: "apaatonoyachin",
	},
	{
		jp: "安いアパート",
		kana: "やすいあぱーと",
		romaji: "yasui_apaato",
	},
	{
		jp: "新しいアパート",
		kana: "あたらしいあぱーと",
		romaji: "atarashii_apaato",
	},
	{
		jp: "部屋",
		kana: "へや",
		romaji: "heya",
	},
	{
		jp: "部屋が広い",
		kana: "へやがひろい",
		romaji: "heyagahiroi",
	},
	{
		jp: "部屋が狭い",
		kana: "へやがせまい",
		romaji: "heyagasemai",
	},
	{
		jp: "部屋を掃除する",
		kana: "へやをそうじする",
		romaji: "heyawosouji_suru",
	},
	{
		jp: "部屋を片付ける",
		kana: "へやをかたづける",
		romaji: "heyawokatazukeru",
	},
	{
		jp: "部屋を借りる",
		kana: "へやをかりる",
		romaji: "heyawokariru",
	},
	{
		jp: "部屋を貸す",
		kana: "へやをかす",
		romaji: "heyawokasu",
	},
	{
		jp: "明るい部屋",
		kana: "あかるいへや",
		romaji: "akaruiheya",
	},
	{
		jp: "暗い部屋",
		kana: "くらいへや",
		romaji: "kuraiheya",
	},
	{
		jp: "清潔な部屋",
		kana: "せいけつなへや",
		romaji: "seiketsu_na_heya",
	},
	{
		jp: "リビング",
		kana: "りびんぐ",
		romaji: "ribingu",
	},
	{
		jp: "リビングでくつろぐ",
		kana: "りびんぐでくつろぐ",
		romaji: "ribingu_de_kutsurogu",
	},
	{
		jp: "キッチン",
		kana: "きっちん",
		romaji: "kitchin",
	},
	{
		jp: "キッチンで料理する",
		kana: "きっちんでりょうりする",
		romaji: "kitchin_de_ryouri_suru",
	},
	{
		jp: "寝室",
		kana: "しんしつ",
		romaji: "shinshitsu",
	},
	{
		jp: "寝室で寝る",
		kana: "しんしつでねる",
		romaji: "shinshitsu_de_neru",
	},
	{
		jp: "トイレ",
		kana: "といれ",
		romaji: "toile",
	},
	{
		jp: "トイレが詰まった",
		kana: "といれがつまった",
		romaji: "toiregatsumatta",
	},
	{
		jp: "浴室",
		kana: "よくしつ",
		romaji: "yokushitsu",
	},
	{
		jp: "浴室にいる",
		kana: "よくしつにいる",
		romaji: "yokushitsu_ni_iru",
	},
	{
		jp: "お風呂",
		kana: "おふろ",
		romaji: "ofuro",
	},
	{
		jp: "お風呂に入る",
		kana: "おふろにはいる",
		romaji: "ofuro_ni_hairu",
	},
	{
		jp: "お風呂を沸かす",
		kana: "おふろをわかす",
		romaji: "ofuro_wo_wakasu",
	},
	{
		jp: "洗面所",
		kana: "せんめんじょ",
		romaji: "senmenjo",
	},
	{
		jp: "洗面所で顔を洗う",
		kana: "せんめんじょでかおをあらう",
		romaji: "senmenjo_de_kao_wo_arau",
	},
	{
		jp: "廊下",
		kana: "ろうか",
		romaji: "rouka",
	},
	{
		jp: "廊下を歩く",
		kana: "ろうかをあるく",
		romaji: "rouka_wo_aruku",
	},
	{
		jp: "玄関",
		kana: "げんかん",
		romaji: "genkan",
	},
	{
		jp: "玄関で靴を脱ぐ",
		kana: "げんかんでくつをぬぐ",
		romaji: "genkan_de_kutsu_wo_nugu",
	},
	{
		jp: "地下室",
		kana: "ちかしつ",
		romaji: "chikashitsu",
	},
	{
		jp: "屋根裏",
		kana: "やねうら",
		romaji: "yaneura",
	},
	{
		jp: "テラス",
		kana: "てらす",
		romaji: "terasu",
	},
	{
		jp: "バルコニー",
		kana: "ばるこにー",
		romaji: "barukonii",
	},
	{
		jp: "バルコニーから景色が見える",
		kana: "ばるこにーからけしきがみえる",
		romaji: "barukonii_kara_keshiki_ga_mieru",
	},
	{
		jp: "ベッド",
		kana: "べっど",
		romaji: "beddo",
	},
	{
		jp: "ベッドで寝ている",
		kana: "べっどでねている",
		romaji: "beddo_de_nete_iru",
	},
	{
		jp: "ソファに座る",
		kana: "そふぁにすわる",
		romaji: "sofa_ni_suwaru",
	},
	{
		jp: "机",
		kana: "つくえ",
		romaji: "tsukue",
	},
	{
		jp: "机の上に本がある",
		kana: "つくえのうえにほんがある",
		romaji: "tsukue_no_ue_ni_hon_ga_aru",
	},
	{
		jp: "椅子に座る",
		kana: "いすにすわる",
		romaji: "isu_ni_suwaru",
	},
	{
		jp: "戸棚",
		kana: "とだな",
		romaji: "todana",
	},
	{
		jp: "戸棚を開ける",
		kana: "とだなをあける",
		romaji: "todana_wo_akeru",
	},
	{
		jp: "本棚に本を置く",
		kana: "ほんだなにほんをおく",
		romaji: "hondana_ni_hon_wo_oku",
	},
	{
		jp: "冷蔵庫",
		kana: "れいぞうこ",
		romaji: "reizouko",
	},
	{
		jp: "冷蔵庫に食べ物がある",
		kana: "れいぞうこにたべものがある",
		romaji: "reizouko_ni_tabemono_ga_aru",
	},
	{
		jp: "洗濯機",
		kana: "せんたくき",
		romaji: "sentakuki",
	},
	{
		jp: "洗濯機で洗う",
		kana: "せんたくきであらう",
		romaji: "sentakuki_de_arau",
	},
	{
		jp: "ドライヤー",
		kana: "どらいやー",
		romaji: "doraiyaa",
	},
	{
		jp: "窓",
		kana: "まど",
		romaji: "mado",
	},
	{
		jp: "窓を開ける",
		kana: "まどをあける",
		romaji: "mado_wo_akeru",
	},
	{
		jp: "窓を閉じる",
		kana: "まどをじる",
		romaji: "mado_wo_jiru",
	},
	{
		jp: "カーテン",
		kana: "かーてん",
		romaji: "kaaten",
	},
	{
		jp: "カーテンを引く",
		kana: "かーてんをひく",
		romaji: "kaaten_wo_hiku",
	},
	{
		jp: "照明",
		kana: "しょうめい",
		romaji: "shoumei",
	},
	{
		jp: "照明をつける",
		kana: "しょうめいをつける",
		romaji: "shoumei_wo_tsukeru",
	},
	{
		jp: "電球",
		kana: "でんきゅう",
		romaji: "denkyuu",
	},
	{
		jp: "電球が切れた",
		kana: "でんきゅうがきれた",
		romaji: "denkyuu_ga_kireta",
	},
	{
		jp: "エアコン",
		kana: "えあこん",
		romaji: "eakon",
	},
	{
		jp: "エアコンをつける",
		kana: "えあこんをつける",
		romaji: "eakon_wo_tsukeru",
	},
	{
		jp: "ヒーター",
		kana: "ひーたー",
		romaji: "heetaa",
	},
	{
		jp: "ヒーターをつける",
		kana: "ひーたーをつける",
		romaji: "heetaa_wo_tsukeru",
	},
	{
		jp: "扇風機",
		kana: "せんぷうき",
		romaji: "senpuuki",
	},
	{
		jp: "扇風機で涼しくなる",
		kana: "せんぷうきですずしくなる",
		romaji: "senpuuki_de_suzushiku_naru",
	},
	{
		jp: "掃除機",
		kana: "そうじき",
		romaji: "soujiki",
	},
	{
		jp: "掃除機をかける",
		kana: "そうじきをかける",
		romaji: "soujiki_wo_kakeru",
	},
	{
		jp: "ゴミ箱",
		kana: "ごみばこ",
		romaji: "gomibako",
	},
	{
		jp: "ゴミを捨てる",
		kana: "ごみをすてる",
		romaji: "gomi_wo_suteru",
	},
	{
		jp: "掃除をする",
		kana: "そうじをする",
		romaji: "souji_wo_suru",
	},
	{
		jp: "床を掃く",
		kana: "ゆかをはく",
		romaji: "yuka_wo_haku",
	},
	{
		jp: "床を拭く",
		kana: "ゆかをふく",
		romaji: "yuka_wo_fuku",
	},
	{
		jp: "壁を洗う",
		kana: "かべをあらう",
		romaji: "kabe_wo_arau",
	},
	{
		jp: "ほこりを取る",
		kana: "ほこりをとる",
		romaji: "hokori_wo_toru",
	},
	{
		jp: "整理整頓",
		kana: "せいりせいとん",
		romaji: "seiriseition",
	},
	{
		jp: "整理整頓が好きだ",
		kana: "せいりせいとんがすきだ",
		romaji: "seiriseition_ga_suki_da",
	},
	{
		jp: "片付け",
		kana: "かたづけ",
		romaji: "katazuke",
	},
	{
		jp: "片付けが大切",
		kana: "かたづけがたいせつ",
		romaji: "katazuke_ga_taisetsu",
	},
	{
		jp: "修理",
		kana: "しゅうり",
		romaji: "shuuri",
	},
	{
		jp: "修理が必要",
		kana: "しゅうりがひつよう",
		romaji: "shuuri_ga_hitsuyou",
	},
	{
		jp: "壊れた",
		kana: "こわれた",
		romaji: "kowareta",
	},
	{
		jp: "壊れたドアを直す",
		kana: "こわれたどあをなおす",
		romaji: "kowareta_doa_wo_naosu",
	},
	{
		jp: "ペンキを塗る",
		kana: "ぺんきをぬる",
		romaji: "penki_wo_nuru",
	},
	{
		jp: "床を張り替える",
		kana: "ゆかをはりかえる",
		romaji: "yuka_wo_harikaweru",
	},
	{
		jp: "壁紙を貼る",
		kana: "かべがみをはる",
		romaji: "kabegami_wo_haru",
	},
	{
		jp: "配管が詰まった",
		kana: "はいかんがつまった",
		romaji: "haikan_ga_tsumatta",
	},
	{
		jp: "電気が付かない",
		kana: "でんきがつかない",
		romaji: "denki_ga_tsukanai",
	},
	{
		jp: "一人暮らし",
		kana: "ひとりぐらし",
		romaji: "hitorigurashi",
	},
	{
		jp: "一人暮らしをしている",
		kana: "ひとりぐらしをしている",
		romaji: "hitorigurashi_wo_shite_iru",
	},
	{
		jp: "同居",
		kana: "どうきょ",
		romaji: "doukyou",
	},
	{
		jp: "同居している",
		kana: "どうきょしている",
		romaji: "doukyou_shite_iru",
	},
	{
		jp: "ルームメイト",
		kana: "るーむめいと",
		romaji: "ruumumeito",
	},
	{
		jp: "ルームメイトと仲がいい",
		kana: "るーむめいととなかがいい",
		romaji: "ruumumeito_to_naka_ga_ii",
	},
	{
		jp: "家族と住む",
		kana: "かぞくとすむ",
		romaji: "kazoku_to_sumu",
	},
	{
		jp: "両親と住む",
		kana: "りょうしんとすむ",
		romaji: "ryoushin_to_sumu",
	},
	{
		jp: "兄弟姉妹と住む",
		kana: "きょうだいとすむ",
		romaji: "kyoudai_to_sumu",
	},
	{
		jp: "家賃を払う",
		kana: "やちんをはらう",
		romaji: "yachin_wo_harau",
	},
	{
		jp: "家賃が安い",
		kana: "やちんがやすい",
		romaji: "yachin_ga_yasui",
	},
	{
		jp: "家賃を滞納する",
		kana: "やちんをたいのうする",
		romaji: "yachin_wo_tainousuru",
	},
	{
		jp: "敷金",
		kana: "しききん",
		romaji: "shikikin",
	},
	{
		jp: "礼金",
		kana: "れいきん",
		romaji: "reikin",
	},
	{
		jp: "保証金",
		kana: "ほしょうきん",
		romaji: "hoshoukin",
	},
	{
		jp: "公共料金",
		kana: "こうきょうりょうきん",
		romaji: "koukyouryoukin",
	},
	{
		jp: "近所",
		kana: "きんじょ",
		romaji: "kinjo",
	},
	{
		jp: "近所の人と仲がいい",
		kana: "きんじょのひととなかがいい",
		romaji: "kinjo_no_hito_to_naka_ga_ii",
	},
	{
		jp: "隣人",
		kana: "りんじん",
		romaji: "rinjin",
	},
	{
		jp: "隣人が騒ぐ",
		kana: "りんじんがさわぐ",
		romaji: "rinjin_ga_sawagu",
	},
	{
		jp: "道路",
		kana: "どうろ",
		romaji: "douro",
	},
	{
		jp: "道路が狭い",
		kana: "どうろがせまい",
		romaji: "douro_ga_semai",
	},
	{
		jp: "駐車場",
		kana: "ちゅうしゃじょう",
		romaji: "chuushajou",
	},
	{
		jp: "駐車場に車を停める",
		kana: "ちゅうしゃじょうにくるまをとめる",
		romaji: "chuushajou_ni_kuruma_wo_tomeru",
	},
	{
		jp: "庭",
		kana: "にわ",
		romaji: "niwa",
	},
	{
		jp: "庭で花を育てる",
		kana: "にわではなをそだてる",
		romaji: "niwa_de_hana_wo_sodateru",
	},
	{
		jp: "ベランダ",
		kana: "べらんだ",
		romaji: "beranda",
	},
	{
		jp: "ベランダで布団を干す",
		kana: "べらんだでふとんをほす",
		romaji: "beranda_de_futon_wo_hosu",
	},
	{
		jp: "構造",
		kana: "こうぞう",
		romaji: "kouzou",
	},
	{
		jp: "木造",
		kana: "もくぞう",
		romaji: "mokuzou",
	},
	{
		jp: "鉄筋",
		kana: "てっきん",
		romaji: "tekkin",
	},
	{
		jp: "屋根",
		kana: "やね",
		romaji: "yane",
	},
	{
		jp: "屋根が新しい",
		kana: "やねがあたらしい",
		romaji: "yane_ga_atarashii",
	},
	{
		jp: "基礎",
		kana: "きそ",
		romaji: "kiso",
	},
	{
		jp: "壁",
		kana: "かべ",
		romaji: "kabe",
	},
	{
		jp: "壁が厚い",
		kana: "かべがあつい",
		romaji: "kabe_ga_atsui",
	},
	{
		jp: "床",
		kana: "ゆか",
		romaji: "yuka",
	},
	{
		jp: "床がきれいだ",
		kana: "ゆかがきれいだ",
		romaji: "yuka_ga_kirei_da",
	},
	{
		jp: "天井",
		kana: "てんじょう",
		romaji: "tenjou",
	},
	{
		jp: "天井が低い",
		kana: "てんじょうがひくい",
		romaji: "tenjou_ga_hikui",
	},
	{
		jp: "階段",
		kana: "かいだん",
		romaji: "kaidan",
	},
	{
		jp: "階段を上る",
		kana: "かいだんをのぼる",
		romaji: "kaidan_wo_noboru",
	},
	{
		jp: "階段を下る",
		kana: "かいだんをおりる",
		romaji: "kaidan_wo_oriru",
	},
	{
		jp: "セキュリティー",
		kana: "せきゅりてぃー",
		romaji: "sekyuritii",
	},
	{
		jp: "セキュリティーが厳しい",
		kana: "せきゅりてぃーがきびしい",
		romaji: "sekyuritii_ga_kibishii",
	},
	{
		jp: "インターホン",
		kana: "いんたーほん",
		romaji: "intaahon",
	},
	{
		jp: "インターホンを押す",
		kana: "いんたーほんをおす",
		romaji: "intaahon_wo_osu",
	},
	{
		jp: "オートロック",
		kana: "おーとろっく",
		romaji: "oatorokku",
	},
	{
		jp: "オートロック付き",
		kana: "おーとろっくつき",
		romaji: "oatorokku_tsuki",
	},
	{
		jp: "エレベーター",
		kana: "えれべーたー",
		romaji: "erebeetaa",
	},
	{
		jp: "エレベーターに乗る",
		kana: "えれべーたーにのる",
		romaji: "erebeetaa_ni_noru",
	},
	{
		jp: "宅配ボックス",
		kana: "たくはいぼっくす",
		romaji: "takuhaibokkusu",
	},
	{
		jp: "ゴミ置き場",
		kana: "ごみおきば",
		romaji: "gomiokiba",
	},
	{
		jp: "共有スペース",
		kana: "きょうゆうすぺーす",
		romaji: "kyouyuusupeesu",
	},
	{
		jp: "給湯器",
		kana: "きゅうとうき",
		romaji: "kyuutouki",
	},
	{
		jp: "給湯器が壊れた",
		kana: "きゅうとうきがこわれた",
		romaji: "kyuutouki_ga_kowareta",
	},
	{
		jp: "水道管",
		kana: "すいどうかん",
		romaji: "suisouukan",
	},
	{
		jp: "ガス管",
		kana: "がすかん",
		romaji: "gasukan",
	},
	{
		jp: "電線",
		kana: "でんせん",
		romaji: "densen",
	},
	{
		jp: "インターネット",
		kana: "いんたーねっと",
		romaji: "intaanetto",
	},
	{
		jp: "インターネットが遅い",
		kana: "いんたーねっとがおそい",
		romaji: "intaanetto_ga_osoi",
	},
	{
		jp: "配線",
		kana: "はいせん",
		romaji: "haisen",
	},
	{
		jp: "配線が古い",
		kana: "はいせんがふるい",
		romaji: "haisen_ga_furui",
	},
	{
		jp: "結露",
		kana: "けつろ",
		romaji: "ketsuro",
	},
	{
		jp: "結露が多い",
		kana: "けつろがおおい",
		romaji: "ketsuro_ga_ooi",
	},
	{
		jp: "臭い",
		kana: "におい",
		romaji: "nioi",
	},
	{
		jp: "部屋が臭い",
		kana: "へやがくさい",
		romaji: "heya_ga_kusai",
	},
	{
		jp: "黒カビ",
		kana: "くろかび",
		romaji: "kurokabi",
	},
	{
		jp: "黒カビが生えた",
		kana: "くろかびがはえた",
		romaji: "kurokabi_ga_haeta",
	},
	{
		jp: "湿気",
		kana: "しっけ",
		romaji: "shikke",
	},
	{
		jp: "湿気が多い",
		kana: "しっけがおおい",
		romaji: "shikke_ga_ooi",
	},
	{
		jp: "エアコンが壊れた",
		kana: "えあこんがこわれた",
		romaji: "eakon_ga_kowareta",
	},
	{
		jp: "暖房が効かない",
		kana: "だんぼうがきかない",
		romaji: "danbou_ga_kikanai",
	},
	{
		jp: "冷房が効かない",
		kana: "れいぼうがきかない",
		romaji: "reibou_ga_kikanai",
	},
	{
		jp: "引っ越し",
		kana: "ひっこし",
		romaji: "hikkoshi",
	},
	{
		jp: "引っ越しをする",
		kana: "ひっこしをする",
		romaji: "hikkoshi_wo_suru",
	},
	{
		jp: "引っ越し業者",
		kana: "ひっこしぎょうしゃ",
		romaji: "hikkoshi_gyousha",
	},
	{
		jp: "段ボール",
		kana: "だんぼーる",
		romaji: "danbooru",
	},
	{
		jp: "梱包",
		kana: "こんぽう",
		romaji: "konpou",
	},
	{
		jp: "荷物を運ぶ",
		kana: "にもつをはこぶ",
		romaji: "nimotsu_wo_hakobu",
	},
	{
		jp: "新居",
		kana: "しんきょ",
		romaji: "shinkyou",
	},
	{
		jp: "新居で新しい生活が始まる",
		kana: "しんきょであたらしいせいかつがはじまる",
		romaji: "shinkyou_de_atarashii_seikatsu_ga_hajimaru",
	},
	{
		jp: "転居",
		kana: "てんきょ",
		romaji: "tenkyou",
	},
	{
		jp: "転居届",
		kana: "てんきょとどけ",
		romaji: "tenkyoutodoke",
	},
	{
		jp: "カーテンをしめる",
		kana: "かーてんをしめる",
		romaji: "kaaten_wo_shimeru",
	},
	{
		jp: "ガス漏れ",
		kana: "がすもれ",
		romaji: "gasumore",
	},
	{
		jp: "メッセージが来た",
		kana: "めっせーじがきた",
		romaji: "messejigakita",
	},
	{
		jp: "画面を見ている",
		kana: "がめんをみている",
		romaji: "gamenwomlteiru",
	},
	{
		jp: "インターネットで調べた",
		kana: "いんたーねっとでしらべた",
		romaji: "intanettodeshirabeta",
	},
	{
		jp: "スマホが鳴った",
		kana: "すまほがなった",
		romaji: "sumahoganaatta",
	},
	{
		jp: "通知が来ています",
		kana: "つうちがきています",
		romaji: "tuuchigakiteimasu",
	},
	{
		jp: "Wi-Fiに接続した",
		kana: "わいふぁいにせつぞくした",
		romaji: "waifainisetuzokushita",
	},
	{
		jp: "アプリを開いた",
		kana: "あぷりをひらいた",
		romaji: "apuriwobiratta",
	},
	{
		jp: "動画を見ている",
		kana: "どうがをみている",
		romaji: "dougawomiteiru",
	},
	{
		jp: "写真を撮った",
		kana: "しゃしんをとった",
		romaji: "shashininototta",
	},
	{
		jp: "投稿した",
		kana: "とうこうした",
		romaji: "toukousita",
	},
	{
		jp: "いいねを押した",
		kana: "いいねをおした",
		romaji: "iinewooosta",
	},
	{
		jp: "フォローした",
		kana: "ふぉろーした",
		romaji: "forosita",
	},
	{
		jp: "コメントを書いた",
		kana: "こめんとをかいた",
		romaji: "komentowokatta",
	},
	{
		jp: "タグ付けされた",
		kana: "たぐづけされた",
		romaji: "tagutukesareta",
	},
	{
		jp: "シェアした",
		kana: "しぇあした",
		romaji: "sheashita",
	},
	{
		jp: "SNSをチェックしている",
		kana: "えすえぬえすをちぇっくしている",
		romaji: "esunuesuwoCheckshiteiru",
	},
	{
		jp: "LINEで友達に連絡した",
		kana: "らいんでともだちにれんらくした",
		romaji: "raindetomodachirenrakushita",
	},
	{
		jp: "グループチャットを読んだ",
		kana: "ぐるーぷちゃっとをよんだ",
		romaji: "gurupuchattowoyonda",
	},
	{
		jp: "スタンプを送った",
		kana: "すたんぷをおくった",
		romaji: "sutanpuwookutta",
	},
	{
		jp: "データ通信を使い過ぎた",
		kana: "でーたつうしんをつかいすぎた",
		romaji: "datatuushiwotsukatsuigita",
	},
	{
		jp: "バッテリーが少なくなった",
		kana: "ばってりーがすくなくなった",
		romaji: "bateriqasukumakunatta",
	},
	{
		jp: "充電する時間がない",
		kana: "じゅうでんするじかんがない",
		romaji: "juudenshurujikangannai",
	},
	{
		jp: "画面が割れてしまった",
		kana: "がめんがわれてしまった",
		romaji: "gamengawareteshimatta",
	},
	{
		jp: "アプリをダウンロードした",
		kana: "あぷりをだうんろーどした",
		romaji: "apuridaunrodoshita",
	},
	{
		jp: "アプリをアンインストールした",
		kana: "あぷりをあんいんすとーるした",
		romaji: "apurianinsutorusita",
	},
	{
		jp: "キャッシュを削除した",
		kana: "きゃっしゅをさくじょした",
		romaji: "kyassuwsakujoshita",
	},
	{
		jp: "バックアップを取った",
		kana: "ばっくあっぷをとった",
		romaji: "bakkuappuwototta",
	},
	{
		jp: "パスワードを忘れてしまった",
		kana: "ぱすわーどをわすれてしまった",
		romaji: "pasuwadowwasreteshimatta",
	},
	{
		jp: "認証コードを入力した",
		kana: "にんしょうこーどをにゅうりょくした",
		romaji: "ninshaukodonyuuryokushita",
	},
	{
		jp: "ビデオ通話をした",
		kana: "びでおつうわをした",
		romaji: "bideotsuuwashita",
	},
	{
		jp: "検索結果を見た",
		kana: "けんさくけっかをみた",
		romaji: "kensakkukekkawomita",
	},
	{
		jp: "ウェブサイトを開いた",
		kana: "うぇぶさいとをひらいた",
		romaji: "uebusaitowohiratta",
	},
	{
		jp: "記事を読んでいる",
		kana: "きじをよんでいる",
		romaji: "kijiwoyondeiru",
	},
	{
		jp: "ダウンロードが遅い",
		kana: "だうんろーどがおそい",
		romaji: "daunrodogaosoi",
	},
	{
		jp: "インターネット接続が切れた",
		kana: "いんたーねっとせつぞくがきれた",
		romaji: "intanettosetuzokireta",
	},
	{
		jp: "パソコンを起動した",
		kana: "ぱそこんをきどうした",
		romaji: "pasokonkidoshita",
	},
	{
		jp: "メールを送信した",
		kana: "めーるをそうしんした",
		romaji: "meruwosushinshita",
	},
	{
		jp: "メールを受信した",
		kana: "めーるをじゅしんした",
		romaji: "meruwojushinshita",
	},
	{
		jp: "スパムメールが増えた",
		kana: "すぱむめーるがふえた",
		romaji: "supamumeruguafueta",
	},
	{
		jp: "ウイルスに感染した",
		kana: "ういるすにかんせんした",
		romaji: "uirusniansenshita",
	},
	{
		jp: "セキュリティソフトを更新した",
		kana: "せきゅりてぃそふとをこうしんした",
		romaji: "sekuritisofutokoshinshita",
	},
	{
		jp: "プライバシー設定を確認した",
		kana: "ぷらいばしーせっていをかくにんした",
		romaji: "puraibashisettikakuninshita",
	},
	{
		jp: "ユーザー名を変更した",
		kana: "ゆーざーめいをへんこうした",
		romaji: "yuzameinhekoushita",
	},
	{
		jp: "アカウントを作成した",
		kana: "あかうんとをさくせいした",
		romaji: "akauntwsakuseieshita",
	},
	{
		jp: "アカウントを削除した",
		kana: "あかうんとをさくじょした",
		romaji: "akauntwsakujoshita",
	},
	{
		jp: "動画サイトで見ている",
		kana: "どうがさいとでみている",
		romaji: "dougasaitodemitriru",
	},
	{
		jp: "動画をダウンロードした",
		kana: "どうがをだうんろーどした",
		romaji: "dougadaunrodoshita",
	},
	{
		jp: "ストリーミング再生中だ",
		kana: "すとりーみんぐさいせいちゅうだ",
		romaji: "sutorimingusaiseichiuda",
	},
	{
		jp: "映画が面白かった",
		kana: "えいががおもしろかった",
		romaji: "eigagaomoshirkatta",
	},
	{
		jp: "配信を見始めた",
		kana: "はいしんをみはじめた",
		romaji: "haishinomihajimeta",
	},
	{
		jp: "生放送に参加した",
		kana: "なまほうそうにさんかした",
		romaji: "namahosunisankashita",
	},
	{
		jp: "チャンネル登録した",
		kana: "ちゃんねるとうろくした",
		romaji: "channelutorokueshita",
	},
	{
		jp: "サムネイルをクリックした",
		kana: "さむねいるをくりっくした",
		romaji: "samuneiruwokurikushita",
	},
	{
		jp: "字幕をオンにした",
		kana: "じまくをおんにした",
		romaji: "jimakuowonnishita",
	},
	{
		jp: "再生速度を変更した",
		kana: "さいせいそくどをへんこうした",
		romaji: "saisokudohenkoshita",
	},
	{
		jp: "動画が一時停止した",
		kana: "どうががいちじていしした",
		romaji: "dougaichijiteishita",
	},
	{
		jp: "バッファリング中だ",
		kana: "ばっふぁりんぐちゅうだ",
		romaji: "buffaringuchuda",
	},
	{
		jp: "オンライン会議に参加した",
		kana: "おんらいんかいぎにさんかした",
		romaji: "onrainkaiginisankashita",
	},
	{
		jp: "音声通話をしている",
		kana: "おんせいつうわをしている",
		romaji: "onseitsuwashiteiru",
	},
	{
		jp: "マイクをオンにした",
		kana: "まいくをおんにした",
		romaji: "maikuowonnishita",
	},
	{
		jp: "カメラをオフにした",
		kana: "かめらをおふにした",
		romaji: "kamerawoofunishita",
	},
	{
		jp: "画面共有をした",
		kana: "がめんきょうゆうをした",
		romaji: "gamenkoyushita",
	},
	{
		jp: "チャットメッセージを送った",
		kana: "ちゃっとめっせーじをおくった",
		romaji: "chattomessejiwokutta",
	},
	{
		jp: "通話を切った",
		kana: "つうわをきった",
		romaji: "tuwakitta",
	},
	{
		jp: "連絡先を追加した",
		kana: "れんらくさきをついかした",
		romaji: "renrakusakitsuikashita",
	},
	{
		jp: "ブロックしてしまった",
		kana: "ぶろっくしてしまった",
		romaji: "burokushiteshimatta",
	},
	{
		jp: "ブロック解除した",
		kana: "ぶろっくかいじょした",
		romaji: "burokukkaijoshita",
	},
	{
		jp: "ネット通販で買い物した",
		kana: "ねっとつうはんでかいものした",
		romaji: "nettotsuhandekaimonoshita",
	},
	{
		jp: "商品ページを見ている",
		kana: "しょうひんぺーじをみている",
		romaji: "shohipageowomiteiru",
	},
	{
		jp: "カートに入れた",
		kana: "かーとにいれた",
		romaji: "kartonireta",
	},
	{
		jp: "チェックアウトした",
		kana: "ちぇっくあうとした",
		romaji: "checkoutshita",
	},
	{
		jp: "クレジットカード情報を入力した",
		kana: "くれじっとかーどじょうほうをにゅうりょくした",
		romaji: "kredittocardoinformationnyurokueshita",
	},
	{
		jp: "支払い方法を選んだ",
		kana: "しはらいほうほうをえらんだ",
		romaji: "shiharaihouhoerandia",
	},
	{
		jp: "配送先住所を確認した",
		kana: "はいそうさきじゅうしょをかくにんした",
		romaji: "haiso sakijushokakuninshita",
	},
	{
		jp: "注文確認メールが届いた",
		kana: "ちゅうもんかくにんめーるがとどいた",
		romaji: "chumonkakuninmerutodtta",
	},
	{
		jp: "商品が到着した",
		kana: "しょうひんがとうちゃくした",
		romaji: "shohingatomchakushita",
	},
	{
		jp: "荷物を受け取った",
		kana: "にもつをうけとった",
		romaji: "nimotsouketotta",
	},
	{
		jp: "商品のレビューを書いた",
		kana: "しょうひんのれびゅーをかいた",
		romaji: "shohinnoreviewwokatta",
	},
	{
		jp: "返品を申し込んだ",
		kana: "へんぴんをもうしこんだ",
		romaji: "henpinmoshikonda",
	},
	{
		jp: "Twitterにログインした",
		kana: "ついったーにろぐいんした",
		romaji: "twitainroginsita",
	},
	{
		jp: "ツイートを作成した",
		kana: "ついーとをさくせいした",
		romaji: "twitwosakseieshita",
	},
	{
		jp: "ハッシュタグをつけた",
		kana: "はっしゅたぐをつけた",
		romaji: "hasshutaguwtsuketa",
	},
	{
		jp: "リツイートした",
		kana: "りつういーとした",
		romaji: "ritwitshita",
	},
	{
		jp: "タイムラインをスクロールしている",
		kana: "たいむらいんをすくろーるしている",
		romaji: "timlineoscrollshiteiru",
	},
	{
		jp: "フォロワーが増えた",
		kana: "ふぉろわーがふえた",
		romaji: "followersgafueta",
	},
	{
		jp: "フォロー中のアカウントは多い",
		kana: "ふぉろーちゅうのあかうんとはおおい",
		romaji: "followchunoaccountu",
	},
	{
		jp: "Instagramで写真を共有した",
		kana: "いんすたぐらむでしゃしんをきょうゆうした",
		romaji: "instagramdeshashinikyusita",
	},
	{
		jp: "ストーリーズに投稿した",
		kana: "すとーりーずにとうこうした",
		romaji: "storiestotokoushita",
	},
	{
		jp: "Facebookでイベント招待を受け取った",
		kana: "ふぇいすぶっくでいべんとしょうたいをうけとった",
		romaji: "facebookdeibentoshautaiuketotta",
	},
	{
		jp: "TikTokで動画を作った",
		kana: "ぶいとぅいきーとっくでどうがをつくった",
		romaji: "tiktokdedougaowtsukutta",
	},
	{
		jp: "詐欺メールが届いた",
		kana: "さぎめーるがとどいた",
		romaji: "sagimerutodtta",
	},
	{
		jp: "フィッシング詐欺に気をつけている",
		kana: "ふぃっしんぐさぎにきをつけている",
		romaji: "phishingsaginikituketeiru",
	},
	{
		jp: "個人情報が流出した",
		kana: "こじんじょうほうがりゅうしゅつした",
		romaji: "kojinjohoriushotshita",
	},
	{
		jp: "パスワードを定期的に変更する",
		kana: "ぱすわーどをていきてきにへんこうする",
		romaji: "pasuwadoteiikitekihenkousuru",
	},
	{
		jp: "不適切な内容を報告した",
		kana: "ふてきせつなないようをほうこくした",
		romaji: "futekisetnainaikuhokushita",
	},
	{
		jp: "アカウントが乗っ取られた",
		kana: "あかうんとがのっとられた",
		romaji: "akauntoganottorta",
	},
	{
		jp: "二段階認証を設定した",
		kana: "にだんかいにんしょうをせっていした",
		romaji: "nidankaininshosetishita",
	},
	{
		jp: "オンライン詐欺に注意する",
		kana: "おんらいんさぎにちゅういする",
		romaji: "onrainsagichusuru",
	},
	{
		jp: "ネットいじめを目撃した",
		kana: "ねっといじめをもくげきした",
		romaji: "nettijimemokugekishita",
	},
	{
		jp: "ミームが流行っている",
		kana: "みーむがりゅうこうしている",
		romaji: "memuguaryukoushiteiru",
	},
	{
		jp: "バイラル動画がすごい",
		kana: "ばいらるどうががすごい",
		romaji: "bairalodougaguasugoi",
	},
	{
		jp: "トレンドに上がっている",
		kana: "とれんどにあがっている",
		romaji: "trendoniagateiru",
	},
	{
		jp: "ハッシュタグが話題だ",
		kana: "はっしゅたぐがわだいだ",
		romaji: "hasshutagugawadida",
	},
	{
		jp: "チャレンジに参加した",
		kana: "ちゃれんじにさんかした",
		romaji: "charenginisankashita",
	},
	{
		jp: "インターネットミームを共有した",
		kana: "いんたーねっとみーむをきょうゆうした",
		romaji: "internetnmemekyusita",
	},
	{
		jp: "クラウドストレージを使っている",
		kana: "くらうどすとれーじをつかっている",
		romaji: "cloudstoragetukatteiru",
	},
	{
		jp: "ファイルをアップロードした",
		kana: "ふぁいるをあっぷろーどした",
		romaji: "failuapurodoshita",
	},
	{
		jp: "ファイルをダウンロードした",
		kana: "ふぁいるをだうんろーどした",
		romaji: "failudaunrodoshita",
	},
	{
		jp: "オンライン編集ツールで作業している",
		kana: "おんらいんへんしゅくつーるでさぎょうしている",
		romaji: "onrainhenshutolsagyshiteiru",
	},
	{
		jp: "スプレッドシートを共有した",
		kana: "すぷれっどしーとをきょうゆうした",
		romaji: "spreadsheetkyusita",
	},
	{
		jp: "ドキュメントで協力している",
		kana: "どきゅめんとできょうりょくしている",
		romaji: "documentkyoryokushiteiru",
	},
	{
		jp: "タスク管理アプリを使っている",
		kana: "たすくかんりあぷりをつかっている",
		romaji: "taskmanagementutukaateiru",
	},
	{
		jp: "スケジュール共有ツールを設定した",
		kana: "すけじゅーるきょうゆうつーるをせっていした",
		romaji: "schedulesharingtorusettishita",
	},
	{
		jp: "プロジェクト管理ツールでタスクを更新した",
		kana: "ぷろじぇくとかんりつーるでたすくをこうしんした",
		romaji: "projectmanagementtaskupdate",
	},
	{
		jp: "遠隔作業をしている",
		kana: "えんかくさぎょうをしている",
		romaji: "enkacsaguoshiteiru",
	},
	{
		jp: "オンラインゲームをしている",
		kana: "おんらいんげーむをしている",
		romaji: "onlinesgameshiteiru",
	},
	{
		jp: "マルチプレイヤーモードで遊んだ",
		kana: "まるちぷれいやーもーどであそんだ",
		romaji: "multiplayermodeasondia",
	},
	{
		jp: "ゲーマーと対戦した",
		kana: "げーまーとたいせんした",
		romaji: "gamertaisenshita",
	},
	{
		jp: "スコアを更新した",
		kana: "すこあをこうしんした",
		romaji: "scorekoshinshita",
	},
	{
		jp: "ゲーム配信を見ている",
		kana: "げーむはいしんをみている",
		romaji: "gamestreamingmiteiru",
	},
	{
		jp: "ゲーム実況を配信した",
		kana: "げーむじっきょうをはいしんした",
		romaji: "gamestreamhaishinshita",
	},
	{
		jp: "ゲーム仲間とチャットしている",
		kana: "げーむなかまとちゃっとしている",
		romaji: "gamefriendschattshiteiru",
	},
	{
		jp: "ゲーム大会に参加した",
		kana: "げーむたいかいにさんかした",
		romaji: "gametournisankashita",
	},
	{
		jp: "オンライン講座を受けている",
		kana: "おんらいんこうざをうけている",
		romaji: "onlinecoursesukeiteiru",
	},
	{
		jp: "教育動画を見ている",
		kana: "きょういくどうがをみている",
		romaji: "educationvidoemiteiru",
	},
	{
		jp: "オンライン学習プラットフォームを使っている",
		kana: "おんらいんがくしゅぷらっとふぉーむをつかっている",
		romaji: "onlinelearningtukaateiru",
	},
	{
		jp: "ウェビナーに参加した",
		kana: "うぇびなーにさんかした",
		romaji: "webinarsankashita",
	},
	{
		jp: "オンライン試験を受けた",
		kana: "おんらいんしけんをうけた",
		romaji: "onlinetestuketa",
	},
	{
		jp: "学習アプリで勉強している",
		kana: "がくしゅあぷりでべんきょうしている",
		romaji: "learningappstudy",
	},
	{
		jp: "デジタル教科書を使っている",
		kana: "でじたるきょうかしょをつかっている",
		romaji: "digitaltextbooktukaateiru",
	},
	{
		jp: "ニュースサイトを読んでいる",
		kana: "にゅーすさいとをよんでいる",
		romaji: "newssiteyondeiru",
	},
	{
		jp: "速報が配信された",
		kana: "そくほうがはいしんされた",
		romaji: "breakingnewshaishin",
	},
	{
		jp: "情報源を確認した",
		kana: "じょうほうげんをかくにんした",
		romaji: "informationsourcekakun",
	},
	{
		jp: "フェイクニュースに騙された",
		kana: "ふぇいくにゅーすにだまされた",
		romaji: "fakenewsdamasareta",
	},
	{
		jp: "ニュースアプリを更新した",
		kana: "にゅーすあぷりをこうしんした",
		romaji: "newsappupdate",
	},
	{
		jp: "通知をオフにしている",
		kana: "つうちをおふにしている",
		romaji: "notificationoff",
	},
	{
		jp: "ストリーミングサービスを契約した",
		kana: "すとりーみんぐさーびすをけいやくした",
		romaji: "streamingservicecontract",
	},
	{
		jp: "サブスクリプション料金を払っている",
		kana: "さぶすくりぷしょんりょうきんをはらっている",
		romaji: "subscriptionfeepayingteiru",
	},
	{
		jp: "見放題コンテンツを楽しんでいる",
		kana: "みほうだいこんてんつをたのしんでいる",
		romaji: "unlimitecontentenjoyteiru",
	},
	{
		jp: "複数のサービスに登録している",
		kana: "ふくすうのさーびすにとうろくしている",
		romaji: "multiplserviceregistered",
	},
	{
		jp: "クラウドサービスを活用している",
		kana: "くらうどさーびすをかつようしている",
		romaji: "cloudservicesutilized",
	},
	{
		jp: "同期が完了した",
		kana: "どうきがかんりょうした",
		romaji: "synchcompleted",
	},
	{
		jp: "バックアップが自動で行われている",
		kana: "ばっくあっぷがじどうでおこなわれている",
		romaji: "backupautomatic",
	},
	{
		jp: "スマホの容量が満杯だ",
		kana: "すまほのようりょうがまんぱいだ",
		romaji: "phonestoragefull",
	},
	{
		jp: "不要なアプリを削除した",
		kana: "ふようなあぷりをさくじょした",
		romaji: "unnecessaryappdeleted",
	},
	{
		jp: "ホーム画面をカスタマイズした",
		kana: "ほーむがめんをかすたまいずした",
		romaji: "homescreencustomized",
	},
	{
		jp: "ウィジェットを追加した",
		kana: "うぃじぇっとをついかした",
		romaji: "widgetadded",
	},
	{
		jp: "了",
		kana: "りょう",
		romaji: "ryo",
	},
	{
		jp: "了わかった",
		kana: "りょうわかった",
		romaji: "ryowakatta",
	},
	{
		jp: "ウケた",
		kana: "うけた",
		romaji: "uketa",
	},
	{
		jp: "マジで",
		kana: "まじで",
		romaji: "majide",
	},
	{
		jp: "やばい",
		kana: "やばい",
		romaji: "yabai",
	},
	{
		jp: "ヤバい",
		kana: "やばい",
		romaji: "yabai",
	},
	{
		jp: "笑った",
		kana: "わらった",
		romaji: "waratta",
	},
	{
		jp: "超面白い",
		kana: "ちょうおもしろい",
		romaji: "choomoshiroi",
	},
	{
		jp: "マジウケた",
		kana: "まじうけた",
		romaji: "majuketa",
	},
	{
		jp: "それな",
		kana: "それな",
		romaji: "sorekna",
	},
	{
		jp: "な",
		kana: "な",
		romaji: "na",
	},
	{
		jp: "今朝もスマホをチェックしたよ",
		kana: "けさもすまほをちぇっくしたよ",
		romaji: "kesamosmahochekushitayo",
	},
	{
		jp: "インターネットは便利だけど時間が潰れる",
		kana: "いんたーねっとはべんりだけどじかんがつぶれる",
		romaji: "intanetbenridakejikantsubure",
	},
	{
		jp: "SNSで見かけた情報が本当かどうか確認した",
		kana: "えすえぬえすでみかけたじょうほうがほんとうかどうかかくにんした",
		romaji: "snsdemikakejohouhontokakun",
	},
	{
		jp: "スマホなしで生活することは無理だ",
		kana: "すまほなしでせいかつすることはむりだ",
		romaji: "smahonashiseikatmuri",
	},
	{
		jp: "オンラインショッピングは便利で気に入っている",
		kana: "おんらいんしょっぴんぐはべんりできにいっている",
		romaji: "onlineshoppingbenrikini",
	},
	{
		jp: "インターネット接続がいまいちだ",
		kana: "いんたーねっとせつぞくがいまいちだ",
		romaji: "intanetsetzoimaichida",
	},
	{
		jp: "動画配信サービスを見すぎた",
		kana: "どうがはいしんさーびすをみすぎた",
		romaji: "videostreamingmisugita",
	},
	{
		jp: "スマホの電池は一日保たない",
		kana: "すまほのでんちはいちにちもたない",
		romaji: "smahobateryichinichimotnai",
	},
	{
		jp: "オンライン会議の時間が長すぎる",
		kana: "おんらいんかいぎのじかんがながすぎる",
		romaji: "onlinmeetingjikannagasugiru",
	},
	{
		jp: "ネット接続なしには仕事ができない",
		kana: "ねっとせつぞくなしにはしごとができない",
		romaji: "nettconnectionshigoto",
	},
	{
		jp: "スマホの画面をずっと見ている",
		kana: "すまほのがめんをずっとみている",
		romaji: "smahogamenzutomiteiru",
	},
	{
		jp: "目が疲れてきた",
		kana: "めがつかれてきた",
		romaji: "metsukaretekita",
	},
	{
		jp: "スクリーンタイムを減らさないと",
		kana: "すくりーんたいむをへらさないと",
		romaji: "screentime",
	},
	{
		jp: "姿勢が悪くなっている",
		kana: "しせいがわるくなっている",
		romaji: "posureawarukunateiru",
	},
	{
		jp: "通知音が多すぎる",
		kana: "つうちおんがおおすぎる",
		romaji: "notificationsund",
	},
	{
		jp: "集中力がなくなった",
		kana: "しゅうちゅうりょくがなくなった",
		romaji: "concentrationnakun",
	},
	{
		jp: "スマホをもっと使わないようにしたい",
		kana: "すまほをもっとつかわないようにしたい",
		romaji: "smahomottotsukawanitai",
	},
	{
		jp: "デジタルデトックスが必要だ",
		kana: "でじたるでとっくすがひつようだ",
		romaji: "digitaldetoxhitsuyou",
	},
	{
		jp: "インターネットなしの生活は考えられない",
		kana: "いんたーねっとなしのせいかつはかんがえられない",
		romaji: "intanetnashiseikatsukan",
	},
	{
		jp: "オンライン学習が一般的になった",
		kana: "おんらいんがくしゅうがいっぱんてきになった",
		romaji: "onlinelearninggeneral",
	},
	{
		jp: "テレワークが定着した",
		kana: "てれわーくがていちゃくした",
		romaji: "teleworkestablished",
	},
	{
		jp: "ビデオ会議が日常化した",
		kana: "びでおかいぎがにちじょうかした",
		romaji: "videomeetingdaily",
	},
	{
		jp: "インスタのフォロワーが増えたい",
		kana: "いんすたのふぉろわーがふえたい",
		romaji: "instafollowincrease",
	},
	{
		jp: "TikTokでバズった",
		kana: "てぃきとっくでばずった",
		romaji: "tiktokbuzzed",
	},
	{
		jp: "YouTubeで有名になりたい",
		kana: "ゆーちゅーぶでゆうめいになりたい",
		romaji: "youtubefamous",
	},
	{
		jp: "SNSで炎上した",
		kana: "えすえぬえすでえんじょうした",
		romaji: "snsburned",
	},
	{
		jp: "ネット炎上を避ける",
		kana: "ねっとえんじょうをさけ",
		romaji: "netburnavoided",
	},
	{
		jp: "ツイートを削除した",
		kana: "ついーとをさくじょした",
		romaji: "tweedeleted",
	},
	{
		jp: "いいねが付かない",
		kana: "いいねがつかない",
		romaji: "likenottached",
	},
	{
		jp: "シェアを増やしたい",
		kana: "しぇあをふやしたい",
		romaji: "shareincreased",
	},
	{
		jp: "フォロワー数を見た",
		kana: "ふぉろわーすうをみた",
		romaji: "followercountviewed",
	},
	{
		jp: "アルゴリズムが難しい",
		kana: "あるごりずむがむずかしい",
		romaji: "algorithmdifficult",
	},
	{
		jp: "レコメンド機能を使っている",
		kana: "れこめんどきのうをつかっている",
		romaji: "recommendationfeature",
	},
	{
		jp: "広告がうざい",
		kana: "こうこくがうざい",
		romaji: "advertisementannoying",
	},
	{
		jp: "プライベートアカウントにした",
		kana: "ぷらいべーとあかうんとにした",
		romaji: "privateaccounted",
	},
	{
		jp: "公開アカウントに戻した",
		kana: "こうかいあかうんとにもどした",
		romaji: "publicaccountreturned",
	},
	{
		jp: "メンション機能を使った",
		kana: "めんしょんきのうをつかった",
		romaji: "mentionfeatureused",
	},
	{
		jp: "アップロード中です",
		kana: "あっぷろーどちゅうです",
		romaji: "uploadedup",
	},
	{
		jp: "ダウンロード開始した",
		kana: "だうんろーどかいしした",
		romaji: "downloadstarted",
	},
	{
		jp: "エラーが発生した",
		kana: "えらーがはっせいした",
		romaji: "erroroccurred",
	},
	{
		jp: "接続を確認してください",
		kana: "せつぞくをかくにんしてください",
		romaji: "connectocnfirm",
	},
	{
		jp: "お疲れ様です",
		kana: "おつかれさまです",
		romaji: "otsukaresamadesu",
	},
	{
		jp: "今日も一日頑張ったね",
		kana: "きょうもいちにちがんばったね",
		romaji: "kyoumoichinichiganbattane",
	},
	{
		jp: "飲もうぜ",
		kana: "のもうぜ",
		romaji: "nomouze",
	},
	{
		jp: "乾杯しよう",
		kana: "かんぱいしよう",
		romaji: "kanpaishou",
	},
	{
		jp: "さあ飲もう",
		kana: "さあのもう",
		romaji: "saaonomou",
	},
	{
		jp: "待たせてごめん",
		kana: "またせてごめん",
		romaji: "matasetegoromen",
	},
	{
		jp: "先に来ちゃった",
		kana: "さきにきちゃった",
		romaji: "sakinikirchatta",
	},
	{
		jp: "席は空いてますか",
		kana: "せきはあいてますか",
		romaji: "sekihaaitemasuks",
	},
	{
		jp: "何人ですか",
		kana: "なんにんですか",
		romaji: "nannindesuka",
	},
	{
		jp: "四人です",
		kana: "よんにんです",
		romaji: "yonnindesu",
	},
	{
		jp: "テーブル席をください",
		kana: "てーぶるせきをください",
		romaji: "tebururusekirekudasai",
	},
	{
		jp: "窓際の席がいいな",
		kana: "まどぎわのせきがいいな",
		romaji: "madogiwanoekigaiina",
	},
	{
		jp: "カウンター席でいい",
		kana: "かうんたーせきでいい",
		romaji: "kauntasekirekidei",
	},
	{
		jp: "喫煙席ですか",
		kana: "きつえんせきですか",
		romaji: "kitsuenesekidesuka",
	},
	{
		jp: "禁煙席をお願いします",
		kana: "kinnenosekirekinnegaishimasu",
		romaji: "kinnenosekirekudasai",
	},
	{
		jp: "ここのお店好きだな",
		kana: "ここのおみせすきだな",
		romaji: "kokonoomiesesukidana",
	},
	{
		jp: "いい雰囲気だ",
		kana: "いいふんいきだ",
		romaji: "iifunikidda",
	},
	{
		jp: "生ビールください",
		kana: "なまびーるください",
		romaji: "namabīrukudasai",
	},
	{
		jp: "ビール冷えてますか",
		kana: "びーるひえてますか",
		romaji: "bīruihietemasuka",
	},
	{
		jp: "冷たいビールください",
		kana: "ひえたいびーるください",
		romaji: "hietaibirukudasai",
	},
	{
		jp: "グラス",
		kana: "ぐらす",
		romaji: "gurasu",
	},
	{
		jp: "杯ください",
		kana: "はいください",
		romaji: "haikudasai",
	},
	{
		jp: "日本酒ください",
		kana: "にほんしゅください",
		romaji: "nihonshukudasai",
	},
	{
		jp: "燗をしてください",
		kana: "かんをしてください",
		romaji: "kanwoshitekudasai",
	},
	{
		jp: "冷やを",
		kana: "ひやを",
		romaji: "hiyaw",
	},
	{
		jp: "ハイボール",
		kana: "はいぼーる",
		romaji: "haibōru",
	},
	{
		jp: "焼酎ロック",
		kana: "しょうちゅうろっく",
		romaji: "shōchūrokku",
	},
	{
		jp: "チューハイ",
		kana: "ちゅーはい",
		romaji: "chūhai",
	},
	{
		jp: "カクテル",
		kana: "かくてる",
		romaji: "kakuteru",
	},
	{
		jp: "ワイン赤でお願いします",
		kana: "わいんあかでおねがいします",
		romaji: "wainakadeonegaishimasu",
	},
	{
		jp: "白ワイン",
		kana: "しろわいん",
		romaji: "shirowain",
	},
	{
		jp: "シャンパン",
		kana: "しゃんぱん",
		romaji: "shanpan",
	},
	{
		jp: "ウイスキー",
		kana: "ういすきー",
		romaji: "uisukī",
	},
	{
		jp: "梅酒",
		kana: "うめしゅ",
		romaji: "umeshu",
	},
	{
		jp: "マッコリ",
		kana: "まっこり",
		romaji: "makkori",
	},
	{
		jp: "ビールとハイボール一本ずつ",
		kana: "びーるとはいぼーるいっぽんずつ",
		romaji: "bīrutohaiborūipponzutsu",
	},
	{
		jp: "おかわりください",
		kana: "おかわりください",
		romaji: "okawrikudasai",
	},
	{
		jp: "もう一杯",
		kana: "もういっぱい",
		romaji: "mouipai",
	},
	{
		jp: "同じのをもう一つ",
		kana: "おなじのをもういつ",
		romaji: "onajinowomouittsu",
	},
	{
		jp: "何かないですか",
		kana: "なにかないですか",
		romaji: "nanikainaidesuka",
	},
	{
		jp: "ビール注いでください",
		kana: "びーるそそいでください",
		romaji: "bīrususoideukudasai",
	},
	{
		jp: "グラスが空いてます",
		kana: "ぐらすがあいてます",
		romaji: "gurasugaiteyasu",
	},
	{
		jp: "メニューください",
		kana: "めにゅーください",
		romaji: "menyūkudasai",
	},
	{
		jp: "何がおすすめですか",
		kana: "なにがおすすめですか",
		romaji: "nanigaosusumesuka",
	},
	{
		jp: "鶏皮",
		kana: "とりかわ",
		romaji: "torikawa",
	},
	{
		jp: "枝豆",
		kana: "えだまめ",
		romaji: "edamame",
	},
	{
		jp: "ポテトフライ",
		kana: "ぽてつとふらい",
		romaji: "potettoufurai",
	},
	{
		jp: "焼き鳥",
		kana: "やきとり",
		romaji: "yakitori",
	},
	{
		jp: "焼き鳥の塩でください",
		kana: "やきとりのしおでください",
		romaji: "yakitorinosiooudekudasai",
	},
	{
		jp: "ねぎま",
		kana: "ねぎま",
		romaji: "negima",
	},
	{
		jp: "串なし唐揚げ",
		kana: "くしなしからあげ",
		romaji: "kushinashikaraage",
	},
	{
		jp: "刺身盛り合わせ",
		kana: "さしみもりあわせ",
		romaji: "sashimimorriawase",
	},
	{
		jp: "イカの塩辛",
		kana: "いかのしおから",
		romaji: "ikanosiokara",
	},
	{
		jp: "ビールに合う料理",
		kana: "びーるにあうりょうり",
		romaji: "bīruniaruryōri",
	},
	{
		jp: "揚げ物ください",
		kana: "あげものください",
		romaji: "agemonokudasi",
	},
	{
		jp: "つけ焼き",
		kana: "つけやき",
		romaji: "tsukeyaki",
	},
	{
		jp: "お刺身",
		kana: "おさしみ",
		romaji: "osashimi",
	},
	{
		jp: "冷奴",
		kana: "ひややっこ",
		romaji: "hiyayakko",
	},
	{
		jp: "ポテトサラダ",
		kana: "ぽてとさらだ",
		romaji: "potetosrada",
	},
	{
		jp: "しゅうまい",
		kana: "しゅうまい",
		romaji: "shumai",
	},
	{
		jp: "からあげの唐辛子抜き",
		kana: "からあげのとうがらしぬき",
		romaji: "karaageninotōgarashunuki",
	},
	{
		jp: "塩辛いのが好きです",
		kana: "しおからいのがすきです",
		romaji: "siokaraiinoigasukidesu",
	},
	{
		jp: "何か一品",
		kana: "なにかいっぴん",
		romaji: "nanikippinn",
	},
	{
		jp: "〆に何かありませんか",
		kana: "しめになにかありませんか",
		romaji: "shimeninanikaarimasnnka",
	},
	{
		jp: "焼きそば",
		kana: "やきそば",
		romaji: "yakisoba",
	},
	{
		jp: "デザート",
		kana: "でざーと",
		romaji: "dezāto",
	},
	{
		jp: "美味しいね",
		kana: "おいしいね",
		romaji: "oishiine",
	},
	{
		jp: "このビール最高",
		kana: "このびーるさいこう",
		romaji: "konobirsuusaikō",
	},
	{
		jp: "好きなのはこれ",
		kana: "すきなのはこれ",
		romaji: "sukinanowaakore",
	},
	{
		jp: "このお店いいね",
		kana: "このおみせいいね",
		romaji: "konoomieseiiine",
	},
	{
		jp: "雰囲気いい",
		kana: "ふんいきいい",
		romaji: "funikiiiii",
	},
	{
		jp: "安くていい",
		kana: "やすくていい",
		romaji: "yasukuteiiii",
	},
	{
		jp: "いくら",
		kana: "いくら",
		romaji: "ikura",
	},
	{
		jp: "お会計",
		kana: "おかいけい",
		romaji: "okaikei",
	},
	{
		jp: "結構食べたな",
		kana: "けっこうたべたな",
		romaji: "kekkoutabetana",
	},
	{
		jp: "飲み過ぎた",
		kana: "のみすぎた",
		romaji: "nomisuugita",
	},
	{
		jp: "楽しいな",
		kana: "たのしいな",
		romaji: "tanoshiina",
	},
	{
		jp: "いい時間だ",
		kana: "いいじかんだ",
		romaji: "iijikanda",
	},
	{
		jp: "もっと飲もう",
		kana: "もっとのもう",
		romaji: "mottonomou",
	},
	{
		jp: "ご馳走様でした",
		kana: "ごちそうさまでした",
		romaji: "gochisousama",
	},
	{
		jp: "また来よう",
		kana: "またこよう",
		romaji: "matakoyou",
	},
	{
		jp: "また来たい",
		kana: "またきたい",
		romaji: "matakatai",
	},
	{
		jp: "いい夜だった",
		kana: "いいよるだった",
		romaji: "iiyorudatta",
	},
	{
		jp: "最近どう",
		kana: "さいきんどう",
		romaji: "saikindō",
	},
	{
		jp: "仕事大変",
		kana: "しごとたいへん",
		romaji: "shigototaihenn",
	},
	{
		jp: "疲れたな",
		kana: "つかれたな",
		romaji: "tsukaretana",
	},
	{
		jp: "今週も長かった",
		kana: "こんしゅうもながかった",
		romaji: "konshūmonagakatta",
	},
	{
		jp: "明日も早い",
		kana: "あしたもはやい",
		romaji: "ashitamohayai",
	},
	{
		jp: "金曜日だ",
		kana: "きんようびだ",
		romaji: "kinyōbida",
	},
	{
		jp: "週末何する",
		kana: "しゅうまつなにする",
		romaji: "shuumatunanisuuru",
	},
	{
		jp: "休みはどう",
		kana: "やすみはどう",
		romaji: "yasumiwadō",
	},
	{
		jp: "どこ行った",
		kana: "どこいった",
		romaji: "dokoitta",
	},
	{
		jp: "誰が来るの",
		kana: "だれがくるの",
		romaji: "daregakuruno",
	},
	{
		jp: "楽しみだな",
		kana: "たのしみだな",
		romaji: "tanoshimidana",
	},
	{
		jp: "皆来たな",
		kana: "みんなきたな",
		romaji: "minnakitana",
	},
	{
		jp: "あいつ来ないのか",
		kana: "あいつこないのか",
		romaji: "aitsukoinainoka",
	},
	{
		jp: "遅れてる",
		kana: "おくれてる",
		romaji: "okureteru",
	},
	{
		jp: "連絡ある",
		kana: "れんらくある",
		romaji: "renrakuaru",
	},
	{
		jp: "乾杯",
		kana: "かんぱい",
		romaji: "kanpai",
	},
	{
		jp: "乾杯しましょう",
		kana: "かんぱいしましょう",
		romaji: "kanpaishashou",
	},
	{
		jp: "では乾杯",
		kana: "ではかんぱい",
		romaji: "dehakanpai",
	},
	{
		jp: "それでは乾杯",
		kana: "それではかんぱい",
		romaji: "soredehakanpai",
	},
	{
		jp: "みんなで乾杯",
		kana: "みんなでかんぱい",
		romaji: "mindekanpai",
	},
	{
		jp: "いただきます",
		kana: "いただきます",
		romaji: "itadakimasu",
	},
	{
		jp: "召し上がってください",
		kana: "めしあがってください",
		romaji: "meshiagatekudasai",
	},
	{
		jp: "どうぞ召し上がり",
		kana: "どうぞめしあがり",
		romaji: "dōzomeshiagari",
	},
	{
		jp: "飲みましょう",
		kana: "のみましょう",
		romaji: "nomisashou",
	},
	{
		jp: "一緒に飲もう",
		kana: "いっしょにのもう",
		romaji: "isshoninomou",
	},
	{
		jp: "皆で飲もう",
		kana: "みんなでのもう",
		romaji: "mindeomou",
	},
	{
		jp: "今日は飲むぞ",
		kana: "きょうはのむぞ",
		romaji: "kyōhanommu",
	},
	{
		jp: "思いっきり飲もう",
		kana: "おもいっきりのもう",
		romaji: "omoikkirinomou",
	},
	{
		jp: "朝まで飲もう",
		kana: "あさまでのもう",
		romaji: "asamadeomou",
	},
	{
		jp: "一杯目の乾杯",
		kana: "いっぱいめのかんぱい",
		romaji: "ippaimenennokanpai",
	},
	{
		jp: "ゲームしよう",
		kana: "げーむしよう",
		romaji: "gēmushou",
	},
	{
		jp: "じゃんけん",
		kana: "じゃんけん",
		romaji: "jyanken",
	},
	{
		jp: "負けたやつが飲む",
		kana: "まけたやつがのむ",
		romaji: "maketayatsuganomu",
	},
	{
		jp: "誰が勝つか",
		kana: "だれがかつか",
		romaji: "daregakatsuka",
	},
	{
		jp: "またー",
		kana: "またー",
		romaji: "matā",
	},
	{
		jp: "もう一回",
		kana: "もういっかい",
		romaji: "mouikkai",
	},
	{
		jp: "酒飲みゲーム",
		kana: "さけのみげーむ",
		romaji: "sakenomigēmu",
	},
	{
		jp: "ボウリング行きたい",
		kana: "ぼうりんぐいきたい",
		romaji: "bouringguikitai",
	},
	{
		jp: "カラオケ行きたい",
		kana: "からおけいきたい",
		romaji: "karaokiekitai",
	},
	{
		jp: "その後どこ行く",
		kana: "そのあとどこいく",
		romaji: "soneatodokoiku",
	},
	{
		jp: "別のお店行きたい",
		kana: "べつのおみせいきたい",
		romaji: "betsunoomiziisekitai",
	},
	{
		jp: "今日は長そうだ",
		kana: "きょうはながそうだ",
		romaji: "kyōhanagasōda",
	},
	{
		jp: "朝までいようぜ",
		kana: "あさまでいようぜ",
		romaji: "asamadeiyōuze",
	},
	{
		jp: "明日休みだから",
		kana: "あしたやすみだから",
		romaji: "ashitayasumidakara",
	},
	{
		jp: "夜明かし",
		kana: "よあかし",
		romaji: "yoakashi",
	},
	{
		jp: "いくらだった",
		kana: "いくらだった",
		romaji: "ikuradatta",
	},
	{
		jp: "割り勘にしよう",
		kana: "わりかんにしよう",
		romaji: "warikannishou",
	},
	{
		jp: "どうぞ",
		kana: "どうぞ",
		romaji: "dōzo",
	},
	{
		jp: "払わせて",
		kana: "はらわせて",
		romaji: "harawasete",
	},
	{
		jp: "今日は俺が",
		kana: "きょうはおれが",
		romaji: "kyōhaoreg",
	},
	{
		jp: "そろそろいい",
		kana: "そろそろいい",
		romaji: "sorosoro",
	},
	{
		jp: "帰ろうか",
		kana: "かえろうか",
		romaji: "kaerōka",
	},
	{
		jp: "また明日",
		kana: "またあした",
		romaji: "mataashita",
	},
	{
		jp: "気をつけてね",
		kana: "きをつけてね",
		romaji: "kiwotsuketene",
	},
	{
		jp: "運転代行呼ぼう",
		kana: "うんてんだいこうよぼう",
		romaji: "untendaikōyobou",
	},
	{
		jp: "ここのから揚げ最高",
		kana: "ここのからあげさいこう",
		romaji: "kokonokaaraaagesaikō",
	},
	{
		jp: "お店の奥に座ろう",
		kana: "おみせのおくにすわろう",
		romaji: "omisenookunisuwarō",
	},
	{
		jp: "マスター",
		kana: "ますたー",
		romaji: "masutā",
	},
	{
		jp: "お兄さん",
		kana: "おにいさん",
		romaji: "oniisan",
	},
	{
		jp: "ねえ",
		kana: "ねえ",
		romaji: "nē",
	},
	{
		jp: "あのね",
		kana: "あのね",
		romaji: "anone",
	},
	{
		jp: "ちょっと待ってくれ",
		kana: "ちょっともってくれ",
		romaji: "chottomatekure",
	},
	{
		jp: "もう一本",
		kana: "もういっぽん",
		romaji: "mouippon",
	},
	{
		jp: "何か飲み足りない",
		kana: "なにかのみたりない",
		romaji: "nanikanoimitirinai",
	},
	{
		jp: "ビールと日本酒",
		kana: "びーるとにほんしゅ",
		romaji: "bīrutonihonshu",
	},
	{
		jp: "氷お願いします",
		kana: "こおりおねがいします",
		romaji: "kōrionegaishimasu",
	},
	{
		jp: "グラス取ってくれ",
		kana: "ぐらすとってくれ",
		romaji: "gurasutottekure",
	},
	{
		jp: "つまみ何かない",
		kana: "つまみなにかない",
		romaji: "tsumaminanikinai",
	},
	{
		jp: "これもうないの",
		kana: "これもうないの",
		romaji: "koremounainо",
	},
	{
		jp: "あっちの席誰",
		kana: "あっちのせきだれ",
		romaji: "attichinosekidare",
	},
	{
		jp: "大きい声で話すな",
		kana: "おおきいこえではなすな",
		romaji: "ōkiikoedehanasuna",
	},
	{
		jp: "静かにしよう",
		kana: "しずかにしよう",
		romaji: "shizukanishou",
	},
	{
		jp: "うるさくない",
		kana: "うるさくない",
		romaji: "urusakunai",
	},
	{
		jp: "トイレどこ",
		kana: "といれどこ",
		romaji: "toiredoko",
	},
	{
		jp: "水ください",
		kana: "みずください",
		romaji: "mizukudasai",
	},
	{
		jp: "冷たい水ください",
		kana: "ひえたいみずください",
		romaji: "hietaimizukudasai",
	},
	{
		jp: "灰皿ください",
		kana: "はいざらください",
		romaji: "haizarakudasai",
	},
	{
		jp: "ナプキンもらえ",
		kana: "なぷきんもらえ",
		romaji: "napukimorae",
	},
	{
		jp: "お箸ください",
		kana: "おはしください",
		romaji: "ohashikudasai",
	},
	{
		jp: "ビール持てないな",
		kana: "びーるもてないな",
		romaji: "bīrumotenaina",
	},
	{
		jp: "なんか重い",
		kana: "なんかおもい",
		romaji: "nankkaomoi",
	},
	{
		jp: "いっぱい飲んだ",
		kana: "いっぱいのんだ",
		romaji: "ippainnonda",
	},
	{
		jp: "もう飲めない",
		kana: "もうのめない",
		romaji: "mounomenai",
	},
	{
		jp: "顔赤くなってる",
		kana: "かおあかくなってる",
		romaji: "kaoakakunattyeru",
	},
	{
		jp: "大丈夫",
		kana: "だいじょうぶ",
		romaji: "daijōbu",
	},
	{
		jp: "もう少し",
		kana: "もうすこし",
		romaji: "mousukoshi",
	},
	{
		jp: "実はね",
		kana: "じつはね",
		romaji: "jitsuwane",
	},
	{
		jp: "そういえば",
		kana: "そういえば",
		romaji: "sōieba",
	},
	{
		jp: "あの時",
		kana: "あのとき",
		romaji: "anotoki",
	},
	{
		jp: "昔の話",
		kana: "むかしのはなし",
		romaji: "mukashimonhanashi",
	},
	{
		jp: "覚えてる",
		kana: "おぼえてる",
		romaji: "oboyetru",
	},
	{
		jp: "同期で集まろう",
		kana: "どうきであつまろう",
		romaji: "dōkieatsumarou",
	},
	{
		jp: "先輩後輩",
		kana: "せんぱいこうはい",
		romaji: "senpaikōhai",
	},
	{
		jp: "事務所の皆",
		kana: "じむしょのみんな",
		romaji: "jimushoninonna",
	},
	{
		jp: "仕事の話は嫌",
		kana: "しごとのはなしはいや",
		romaji: "shigotonohanashihaiia",
	},
	{
		jp: "次どこ行く",
		kana: "つぎどこいく",
		romaji: "tsugidokoiku",
	},
	{
		jp: "まだ飲める",
		kana: "まだのめる",
		romaji: "madanomeru",
	},
	{
		jp: "一番目",
		kana: "いちばんめ",
		romaji: "ichibanme",
	},
	{
		jp: "二番目",
		kana: "にばんめ",
		romaji: "nibanme",
	},
	{
		jp: "席替わる",
		kana: "せきかわる",
		romaji: "sekikawaru",
	},
	{
		jp: "誰か来た",
		kana: "だれかきた",
		romaji: "darekakita",
	},
	{
		jp: "お通し",
		kana: "おとおし",
		romaji: "otooshi",
	},
	{
		jp: "チャージ料金",
		kana: "ちゃーじりょうきん",
		romaji: "chājiryōkin",
	},
	{
		jp: "イビキ掻くなよ",
		kana: "いびきかくなよ",
		romaji: "ibikikakunayo",
	},
	{
		jp: "すしはおいしいです",
		kana: "すしはおいしいです",
		romaji: "sushihaoishiidesu",
	},
	{
		jp: "天ぷらは揚げ物です",
		kana: "てんぷらはあげものです",
		romaji: "tenpurahaagemonomonoidesu",
	},
	{
		jp: "おにぎりを食べます",
		kana: "おにぎりをたべます",
		romaji: "onigiriwotabemasu",
	},
	{
		jp: "味噌汁は辛いです",
		kana: "みそしるからいです",
		romaji: "misojirukaraiidesu",
	},
	{
		jp: "豆腐は柔らかいです",
		kana: "とうふはやわらかいです",
		romaji: "toufuhayawarakaiidesu",
	},
	{
		jp: "肉を焼きます",
		kana: "にくをやきます",
		romaji: "nikuwoyakimasu",
	},
	{
		jp: "魚を塩焼きにします",
		kana: "さかなをしおやきにします",
		romaji: "sakanawosioyakinisimasu",
	},
	{
		jp: "ラーメンは豚骨スープです",
		kana: "らーめんはとんこつすーぷです",
		romaji: "ramenhatonkotsusuupuidesu",
	},
	{
		jp: "つけ麺は冷たいです",
		kana: "つけめんはつめたいです",
		romaji: "tsukemenhatsumetaiidesu",
	},
	{
		jp: "中華そばは濃い味です",
		kana: "ちゅうかそばはこいあじです",
		romaji: "chuukasobahakoiajiidesu",
	},
	{
		jp: "汁なし担々麺です",
		kana: "しるなしたんたんめんです",
		romaji: "sirunasitantanmenidesu",
	},
	{
		jp: "喜多方ラーメンは有名です",
		kana: "きたかたらーめんはゆうめいです",
		romaji: "kitakataramenhayuumeidesu",
	},
	{
		jp: "味噌ラーメンはコクがあります",
		kana: "みそらーめんはこくがあります",
		romaji: "misoramenhakokugaarimasu",
	},
	{
		jp: "塩ラーメンはさっぱりしています",
		kana: "しおらーめんはさっぱりしています",
		romaji: "sioramenhasapparisiteimasu",
	},
	{
		jp: "醤油ラーメンは定番です",
		kana: "しょうゆらーめんはていばんです",
		romaji: "syouyuramenhateibanidesu",
	},
	{
		jp: "鍋焼きうどんは温かいです",
		kana: "なべやきうどんはあたたかいです",
		romaji: "nabeyakiudonhaatatakaiidesu",
	},
	{
		jp: "月見うどんはおいしいです",
		kana: "つきみうどんはおいしいです",
		romaji: "tsukimiudonhaoishiidesu",
	},
	{
		jp: "塩辛い食べ物です",
		kana: "しおからいたべものです",
		romaji: "siokaraitabemonodesu",
	},
	{
		jp: "甘い醤油です",
		kana: "あまいしょうゆです",
		romaji: "amaisyouyuidesu",
	},
	{
		jp: "酸っぱい味です",
		kana: "すっぱいあじです",
		romaji: "suppaiajidesu",
	},
	{
		jp: "辛いカレーです",
		kana: "からいかれーです",
		romaji: "karaikarēidesu",
	},
	{
		jp: "苦い野菜です",
		kana: "にがいやさいです",
		romaji: "nigaiyasaiidesu",
	},
	{
		jp: "濃い味が好きです",
		kana: "こいあじがすきです",
		romaji: "koiajigasukidesu",
	},
	{
		jp: "淡白な料理です",
		kana: "たんぱくなりょうりです",
		romaji: "tanpakunaryouriidesu",
	},
	{
		jp: "深い味わいです",
		kana: "ふかいあじわいです",
		romaji: "fukaiajiwaiidesu",
	},
	{
		jp: "爽やかな後味です",
		kana: "さわやかなあとあじです",
		romaji: "sawayakanaatomajiidesu",
	},
	{
		jp: "コク深い料理です",
		kana: "こくぶかいりょうりです",
		romaji: "kokubukairyouriidesu",
	},
	{
		jp: "焼き鳥は串焼きです",
		kana: "やきとりはくしやきです",
		romaji: "yakitorihakusiyakidesu",
	},
	{
		jp: "唐揚げは衣が香ばしいです",
		kana: "からあげはころもがかおばしいです",
		romaji: "karaagehakoromogakaobasisiidesu",
	},
	{
		jp: "竜田揚げは漬ける調理法です",
		kana: "たつたあげはつけるちょうりほうです",
		romaji: "tatutaagehatsukerutyourihouidesu",
	},
	{
		jp: "かき揚げは野菜が混ざっています",
		kana: "かきあげはやさいがまざっています",
		romaji: "kakiagehayasaigamazateimasu",
	},
	{
		jp: "さつま揚げは深く揚げます",
		kana: "さつまあげはふかくあげます",
		romaji: "satumaagehafukakuagemasuu",
	},
	{
		jp: "白子は冬が旬です",
		kana: "しらこはふゆがしゅんです",
		romaji: "shirakohafuyugasyunidesu",
	},
	{
		jp: "たらの芽は春が旬です",
		kana: "たらのめははるがしゅんです",
		romaji: "taranomehaharugasyunidesu",
	},
	{
		jp: "ふきのとうは春の山菜です",
		kana: "ふきのとうははるのやまなです",
		romaji: "fukinotouhaharunoyamanaidesu",
	},
	{
		jp: "ワラビは湯通しして食べます",
		kana: "わらびはゆどおししてたべます",
		romaji: "warabihayudoosisitetabemasu",
	},
	{
		jp: "蕨餅は黒蜜をかけます",
		kana: "わらびもちはくろみつをかけます",
		romaji: "warabimochikuromitsuwokaкemasu",
	},
	{
		jp: "親子丼を食べたいです",
		kana: "おやこどんをたべたいです",
		romaji: "oyakodonwotabetaiidesu",
	},
	{
		jp: "カツ丼は好きです",
		kana: "かつどんはすきです",
		romaji: "katsudonhasukidesu",
	},
	{
		jp: "うなぎ丼を注文します",
		kana: "うなぎどんをちゅうもんします",
		romaji: "unagidonwocyuumonsimasu",
	},
	{
		jp: "冷やそばを食べます",
		kana: "ひやそばをたべます",
		romaji: "hiyasobawotabemasu",
	},
	{
		jp: "きつねうどんです",
		kana: "きつねうどんです",
		romaji: "kitsuneudónidesu",
	},
	{
		jp: "ざるそばが得意です",
		kana: "ざるそばがとくいです",
		romaji: "zarusobagatokuidesu",
	},
	{
		jp: "牛丼が食べたいです",
		kana: "ぎゅうどんがたべたいです",
		romaji: "gyuudongatabetaiidesu",
	},
	{
		jp: "天丼はボリュームがあります",
		kana: "てんどんはぼりゅームがあります",
		romaji: "tendonhaboryyuumugaariмasu",
	},
	{
		jp: "チャーシュー丼です",
		kana: "ちゃーしゅーどんです",
		romaji: "tyāsyūdonidesu",
	},
	{
		jp: "重ねた丼ぶりです",
		kana: "かさねたどんぶりです",
		romaji: "kasanetadonburiidesu",
	},
	{
		jp: "海老丼も有名です",
		kana: "えびどんもゆうめいです",
		romaji: "ebidonmoyuumeidesu",
	},
	{
		jp: "いくら丼は贅沢です",
		kana: "いくらどんはぜいたくです",
		romaji: "ikuradonhazeitakuidesu",
	},
	{
		jp: "ねぎとろ丼です",
		kana: "ねぎとろどんです",
		romaji: "negitorodonidesu",
	},
	{
		jp: "穴子丼は淡泊です",
		kana: "あなごどんはたんぱくです",
		romaji: "anagodonhatanpakuidesu",
	},
	{
		jp: "まぐろ丼は人気です",
		kana: "まぐろどんはにんきです",
		romaji: "maгurodonhaninkidesu",
	},
	{
		jp: "とり肉丼は安いです",
		kana: "とりにくどんはやすいです",
		romaji: "torinikusodonhayasukidesu",
	},
	{
		jp: "豚肉丼は脂が多いです",
		kana: "ぶたにくどんはあぶらがおおいです",
		romaji: "butanikusodonhaaburaгaooidesu",
	},
	{
		jp: "山菜丼は季節料理です",
		kana: "やまなどんはきせつりょうりです",
		romaji: "yamanidodonhakiseturyouridesu",
	},
	{
		jp: "野菜丼は健康的です",
		kana: "やさいどんはけんこうてきです",
		romaji: "yasaidonhakenkoutekidesu",
	},
	{
		jp: "玉子丼はシンプルです",
		kana: "たまごどんはしんぷるです",
		romaji: "tamagodoнhashinpuruidesu",
	},
	{
		jp: "大豆で味噌を作ります",
		kana: "だいずでみそをつくります",
		romaji: "daizudemisowotukurimasu",
	},
	{
		jp: "わさびは辛いです",
		kana: "わさびはからいです",
		romaji: "wasabihakaraiidesu",
	},
	{
		jp: "海苔を巻きます",
		kana: "のりをまきます",
		romaji: "noriwomakimasu",
	},
	{
		jp: "生姜をスライスします",
		kana: "しょうがをすらいすします",
		romaji: "syougawosuraisusimasusu",
	},
	{
		jp: "ねぎは香りが良いです",
		kana: "ねぎはかおりがよいです",
		romaji: "negihakaoригayoiidesu",
	},
	{
		jp: "山椒の香りが好きです",
		kana: "さんしょうのかおりがすきです",
		romaji: "sansyounokaorigasukidesu",
	},
	{
		jp: "昆布でダシをとります",
		kana: "こんぶでだしをとります",
		romaji: "konbudedasiwotorimasu",
	},
	{
		jp: "かつおぶしは香ります",
		kana: "かつおぶしはかおります",
		romaji: "katsuobusihakaorimasu",
	},
	{
		jp: "干し椎茸は旨味が強いです",
		kana: "ほししいたけはうまみがつよいです",
		romaji: "hosisitakehaumamigatsuyoidesu",
	},
	{
		jp: "梅干しは古漬けが良いです",
		kana: "うめぼしはふるづけがよいです",
		romaji: "umebosihafurudukegayoidesu",
	},
	{
		jp: "めんつゆは便利です",
		kana: "めんつゆはべんりです",
		romaji: "mentuuyuhabenriidesu",
	},
	{
		jp: "ぽん酢は使い易いです",
		kana: "ぽんずはつかいやすいです",
		romaji: "ponzuhatsukaiyasukidesu",
	},
	{
		jp: "しょっつるは秋田です",
		kana: "しょっつるはあきたです",
		romaji: "syotturuhaakitaidesu",
	},
	{
		jp: "いしるは沖縄です",
		kana: "いしるはおきなわです",
		romaji: "isiruhaokinawaidesu",
	},
	{
		jp: "鰹だしは香ります",
		kana: "かつおだしはかおります",
		romaji: "katsuodasihakaorimasu",
	},
	{
		jp: "椎茸だしは甘いです",
		kana: "しいたけだしはあまいです",
		romaji: "siitakedasihaamaiidesu",
	},
	{
		jp: "昆布だしは上品です",
		kana: "こんぶだしはじょうひんです",
		romaji: "konbudasihajouhinidesu",
	},
	{
		jp: "豚骨だしは濃いです",
		kana: "とんこつだしはこいです",
		romaji: "tonkotsudasihakoidesu",
	},
	{
		jp: "鶏ガラだしは優しいです",
		kana: "とりがらだしはやさしいです",
		romaji: "torigaradasihayasasiiidesu",
	},
	{
		jp: "干し貝柱は贅沢です",
		kana: "ほしかいばしらはぜいたくです",
		romaji: "hosikaibasirahazeиtakuidesu",
	},
	{
		jp: "蒸し料理が好きです",
		kana: "むしりょうりがすきです",
		romaji: "musigzyourigasukidesu",
	},
	{
		jp: "煮込み料理を作ります",
		kana: "にこみりょうりをつくります",
		romaji: "nikomizyouriwotukurimasu",
	},
	{
		jp: "炒める時に塩を入れます",
		kana: "いためるときにしおをいれます",
		romaji: "itamerarutokinisiwoiremasuu",
	},
	{
		jp: "焦がさないように注意します",
		kana: "こがさないようにちゅういします",
		romaji: "kogasanaiyounityuuisimasu",
	},
	{
		jp: "弱火で煮詰めます",
		kana: "よわびでにつめます",
		romaji: "yowabidenitsumemasu",
	},
	{
		jp: "強火で仕上げます",
		kana: "つよびでしあげます",
		romaji: "tuyobidesiagemasu",
	},
	{
		jp: "揚げる油を温めます",
		kana: "あげるあぶらをあたためます",
		romaji: "ageruaburawoatameremasu",
	},
	{
		jp: "串焼きにしています",
		kana: "くしやきにしています",
		romaji: "kusiyakinisiteimasu",
	},
	{
		jp: "炙って焼きます",
		kana: "あぶってやきます",
		romaji: "abutteyakimasu",
	},
	{
		jp: "蒸し焼きにします",
		kana: "むしやきにします",
		romaji: "musiyakinisimasu",
	},
	{
		jp: "下ごしらえが重要です",
		kana: "したごしらえがじゅうようです",
		romaji: "situagosiraegajuuyoudesu",
	},
	{
		jp: "水洗いをしっかりします",
		kana: "みずあらいをしっかりします",
		romaji: "mizuaraiwosikkarisimasu",
	},
	{
		jp: "塩漬けにして保存します",
		kana: "しおづけにしてほぞんします",
		romaji: "siodukenisitehozonsimasusu",
	},
	{
		jp: "寝かせて味を深めます",
		kana: "ねかせてあじをふかめます",
		romaji: "nekaseteajiwofukamemasuu",
	},
	{
		jp: "冷ましてから盛り付けます",
		kana: "さましてからもりつけます",
		romaji: "samasitekaramoritsukemasuu",
	},
	{
		jp: "温度管理が大事です",
		kana: "おんどかんりがだいじです",
		romaji: "ondokanrigadaijidesu",
	},
	{
		jp: "新鮮な状態で食べます",
		kana: "しんせんなじょうたいでたべます",
		romaji: "sinsennazyoutaidetabemasu",
	},
	{
		jp: "冷凍保存できます",
		kana: "れいとうほぞんできます",
		romaji: "reitouhozondekiremasu",
	},
	{
		jp: "室温で解凍します",
		kana: "しつおんであかいとうします",
		romaji: "situondeakaitousimasusu",
	},
	{
		jp: "二次加熱は避けます",
		kana: "にじかねつはさけます",
		romaji: "nijikanetuhasakemasuu",
	},
	{
		jp: "京都は懐石料理が有名です",
		kana: "きょうとはかいせきりょうりがゆうめいです",
		romaji: "kyoutohakaisekizyourigayuumeidesu",
	},
	{
		jp: "広島焼きはお好み焼きです",
		kana: "ひろしまやきはおこのみやきです",
		romaji: "hirosimayakihaokonomiyakidesu",
	},
	{
		jp: "大阪はたこ焼きで知られています",
		kana: "おおさかはたこやきでしられています",
		romaji: "oosakahatakoyakideしireteimasu",
	},
	{
		jp: "福岡のラーメンは豚骨です",
		kana: "ふくおかのらーめんはとんこつです",
		romaji: "fukuokanorameentonkotsuidesu",
	},
	{
		jp: "長野は野沢菜漬けが有名です",
		kana: "ながのはのざわなつけがゆうめいです",
		romaji: "naganohanoзаwanatukeгayuumeidesu",
	},
	{
		jp: "岡山はぶっかけうどんです",
		kana: "おかやまはぶっかけうどんです",
		romaji: "okayamahabukkakeudónidesu",
	},
	{
		jp: "香川はうどん県として知られています",
		kana: "かがわはうどんけんとしてしられています",
		romaji: "kagawahaudokentositesirareteimasu",
	},
	{
		jp: "愛媛はみかんが有名です",
		kana: "えひめはみかんがゆうめいです",
		romaji: "ehimehamikangayuumeidesu",
	},
	{
		jp: "北海道はスープカレーです",
		kana: "ほっかいどうはすーぷかれーです",
		romaji: "hokkaidohasuupukarēidesu",
	},
	{
		jp: "沖縄はゴーヤが特産です",
		kana: "おきなわはごーやがとくさんです",
		romaji: "okinawahagorrayagatokusanidesu",
	},
	{
		jp: "湯豆腐は京都の料理です",
		kana: "ゆどうふはきょうとのりょうりです",
		romaji: "yudoufuhakyoutoнoryooriidesu",
	},
	{
		jp: "押し寿司は大阪で有名です",
		kana: "おしずしはおおさかでゆうめいです",
		romaji: "osisusihaoosakaдeyuumeidesu",
	},
	{
		jp: "柿の葉寿司は奈良です",
		kana: "かきのはずしはならです",
		romaji: "kakinohasusihanaraidesu",
	},
	{
		jp: "白子ポン酢は冬の逸品です",
		kana: "しらこぽんずはふゆのいつぴんです",
		romaji: "sirakoponzuhafuyunoitsupinidesu",
	},
	{
		jp: "田楽は木綿豆腐で作ります",
		kana: "でんがくはもめんとうふでつくります",
		romaji: "dengakuhamomentoufudetukurimasu",
	},
	{
		jp: "厚揚げは香ばしい食べ物です",
		kana: "あつあげはかおばしいたべものです",
		romaji: "atsuagehakaobasiitabemonodesu",
	},
	{
		jp: "油揚げは甘辛く煮ます",
		kana: "あぶらあげはあまからくにます",
		romaji: "aburaagehaamakarakunimasuu",
	},
	{
		jp: "おからは無駄がありません",
		kana: "おからはむだがありません",
		romaji: "okarahamuдagaarimasen",
	},
	{
		jp: "がんもどきは肉の代わりです",
		kana: "がんもどきはにくのかわりです",
		romaji: "ganmodokihanikunokawariidesu",
	},
	{
		jp: "豆乳は栄養価が高いです",
		kana: "とうにゅうはえいようかがたかいです",
		romaji: "tounyuuhaeiyoukagatakaiidesu",
	},
	{
		jp: "ウニは高級な食材です",
		kana: "うにはこうきゅうなしょくざいです",
		romaji: "unihakoukyuunasyokuzaiidesu",
	},
	{
		jp: "ホタテは甘い味わいです",
		kana: "ほたてはあまいあじわいです",
		romaji: "hotatehaamaiajiwaiidesu",
	},
	{
		jp: "イクラは塩漬けにします",
		kana: "いくらはしおづけにします",
		romaji: "ikurahasiodukenisimasu",
	},
	{
		jp: "カニの身は柔らかいです",
		kana: "かにのみはやわらかいです",
		romaji: "kaninomihayawarakaiidesu",
	},
	{
		jp: "えびの天ぷらは人気です",
		kana: "えびのてんぷらはにんきです",
		romaji: "ebinotenpurahaninkiidesu",
	},
	{
		jp: "タコは歯ごたえが良いです",
		kana: "たこははごたえがよいです",
		romaji: "takohahagotaegayoidesu",
	},
	{
		jp: "いか刺しは生です",
		kana: "いかさしはなまです",
		romaji: "ikasashihanamaidesu",
	},
	{
		jp: "貝類は新鮮さが大切です",
		kana: "かいるいはしんせんさがたいせつです",
		romaji: "kairuihasinsensagataisetuidesu",
	},
	{
		jp: "エビフライは子どもが好きです",
		kana: "えびふらいはこどもがすきです",
		romaji: "ebifuraihakodomoгasukidesu",
	},
	{
		jp: "イカ墨のパスタです",
		kana: "いかすみのぱすたです",
		romaji: "ikasuminoпasutaidesu",
	},
	{
		jp: "イクラとウニの軍艦です",
		kana: "いくらとうにのぐんかんです",
		romaji: "ikuratouninogunkаnidesu",
	},
	{
		jp: "大トロは最高級です",
		kana: "おおとろはさいこうきゅうです",
		romaji: "ootorohasaikoukyuuidesu",
	},
	{
		jp: "中トロは脂が適切です",
		kana: "ちゅうとろはあぶらがてきせつです",
		romaji: "tyuutorohaaburagatekisetsuidesu",
	},
	{
		jp: "赤身は新鮮さが大切です",
		kana: "あかみはしんせんさがたいせつです",
		romaji: "akamihasinsensagataisetuidesu",
	},
	{
		jp: "穴子は白焼きが良いです",
		kana: "あなごはしろやきがよいです",
		romaji: "anagohasiroyakigayoidesu",
	},
	{
		jp: "コハダは光ります",
		kana: "こはだはひかります",
		romaji: "kohadahahikarimasu",
	},
	{
		jp: "シャコは甘い海老です",
		kana: "しゃこはあまいえびです",
		romaji: "syakohaamaiebidesu",
	},
	{
		jp: "トリ貝は貝の中でも甘いです",
		kana: "とりがいはかいのなかでもあまいです",
		romaji: "torigaihakainonakademoamaiidesu",
	},
	{
		jp: "カラスガイは黒くて大きいです",
		kana: "からすがいはくろくておおきいです",
		romaji: "karasugaihakurokuteookiidesu",
	},
	{
		jp: "オトヒメは冷たくします",
		kana: "おとひめはつめたくします",
		romaji: "otohimehatsumetakusimasu",
	},
	{
		jp: "ひじきの煮込みを食べます",
		kana: "ひじきのにこみをたべます",
		romaji: "hijikinonikomiwotabemasu",
	},
	{
		jp: "きんぴらごぼうは歯ごたえがあります",
		kana: "きんぴらごぼうははごたえがあります",
		romaji: "kinpiragobouhahagotaeгaarimasu",
	},
	{
		jp: "白和えは豆腐を使います",
		kana: "しらあえはとうふをつかいます",
		romaji: "siraaehatouufuwotukaimasu",
	},
	{
		jp: "漬物はご飯に合います",
		kana: "つけものはごはんにあいます",
		romaji: "tukemonohagohanniaimasu",
	},
	{
		jp: "筍の子は春の味覚です",
		kana: "たけのこははるのみかくです",
		romaji: "takenokohaharunomikakuidesu",
	},
	{
		jp: "ほうれん草のおひたしです",
		kana: "ほうれんそうのおひたしです",
		romaji: "hourensounoohitasidesu",
	},
	{
		jp: "小松菜は栄養価が高いです",
		kana: "こまつなはえいようかがたかいです",
		romaji: "komatsunahaeiyoukagatakaiidesu",
	},
	{
		jp: "とうもろこしは甘いです",
		kana: "とうもろこしはあまいです",
		romaji: "toumorokosihaamaiidesu",
	},
	{
		jp: "大根は冬が旬です",
		kana: "だいこんはふゆがしゅんです",
		romaji: "daikonhafuyagasyunidesu",
	},
	{
		jp: "さつまいもは焼き芋が好きです",
		kana: "さつまいもはやきいもがすきです",
		romaji: "satsumaimohayakiimoгasukidesu",
	},
	{
		jp: "冬瓜は夏の野菜です",
		kana: "とうがんはなつのやさいです",
		romaji: "touganhanatsunoyasaidesu",
	},
	{
		jp: "なすは焼きナスが好きです",
		kana: "なすはやきなすがすきです",
		romaji: "nasuhayakinasugasukidesu",
	},
	{
		jp: "かぼちゃは煮ると甘いです",
		kana: "かぼちゃはにるとあまいです",
		romaji: "kabocyahaнiruтоamaiidesu",
	},
	{
		jp: "トマトは夏の野菜です",
		kana: "ときまとはなつのやさいです",
		romaji: "tomatohanatsunoやsaidesu",
	},
	{
		jp: "キュウリは浅漬けが好きです",
		kana: "きゅうりはあさづけがすきです",
		romaji: "kyuurihasaдukegasukidesu",
	},
	{
		jp: "レタスはサラダにします",
		kana: "れたすはさらだにします",
		romaji: "retasуhasaradanisimasu",
	},
	{
		jp: "ブロッコリーは緑色です",
		kana: "ぶろっこりーはみどりいろです",
		romaji: "brokkoりーhamidoriirodesu",
	},
	{
		jp: "ニンジンはオレンジ色です",
		kana: "にんじんはおれんじいろです",
		romaji: "ninjinhaorenziirodesu",
	},
	{
		jp: "タマネギは涙が出ます",
		kana: "たまねぎはなみだがでます",
		romaji: "tamanegihanamidagademasuu",
	},
	{
		jp: "ニンニクは香りが強いです",
		kana: "にんにくはかおりがつよいです",
		romaji: "ninnikuhakaorigatsuyoidesu",
	},
	{
		jp: "羊羹は和菓子の王様です",
		kana: "ようかんはわがしのおうさまです",
		romaji: "youkanhawagasinoousamaidesu",
	},
	{
		jp: "大福は餅で包まれています",
		kana: "だいふくはもちでつつまれています",
		romaji: "daifukuhamoчidetutsumareteimasu",
	},
	{
		jp: "どら焼きはあんこが入っています",
		kana: "どらやきはあんこがはいっています",
		romaji: "dorayakihankogahaiteimasu",
	},
	{
		jp: "わらび餅は夏の食べ物です",
		kana: "わらびもちはなつのたべものです",
		romaji: "warabimochihanatsunotabemonodesu",
	},
	{
		jp: "せんべいはおせんべいです",
		kana: "せんべいはおせんべいです",
		romaji: "senbeihaosenbeiidesu",
	},
	{
		jp: "抹茶は苦くて香ります",
		kana: "まっちゃはにがくてかおります",
		romaji: "mattyahanigakutekaorimasu",
	},
	{
		jp: "桜餅は春の和菓子です",
		kana: "さくらもちははるのわがしです",
		romaji: "sakuramochihaharunowagasidesu",
	},
	{
		jp: "白玉団子は冷やして食べます",
		kana: "しらたまだんごはひやしてたべます",
		romaji: "siratamadangowahiyasitetabemasu",
	},
	{
		jp: "最中は脆い食べ物です",
		kana: "もなかはもろいたべものです",
		romaji: "monakahamoroitabemonodesu",
	},
	{
		jp: "上生菓子は季節の花です",
		kana: "じょうなまがしはきせつのはなです",
		romaji: "jounamagasihakisetsunohanaidesu",
	},
	{
		jp: "ようかん羹は長く持ちます",
		kana: "ようかんはながくもちます",
		romaji: "youkanhanagakumocimasu",
	},
	{
		jp: "もなかは冬に食べるものです",
		kana: "もなかはふゆにたべるものです",
		romaji: "monakahafuyutaberumonoidesu",
	},
	{
		jp: "ぎゅうひは上品な菓子です",
		kana: "ぎゅうひはじょうひんなかしです",
		romaji: "gyuuhihajouhinnakasidesu",
	},
	{
		jp: "みずようかんは冷たいです",
		kana: "みずようかんはつめたいです",
		romaji: "mizuyoukanhatsumetaiidesu",
	},
	{
		jp: "こしあんは滑らかです",
		kana: "こしあんはなめらかです",
		romaji: "kosianhanamerakaidesu",
	},
	{
		jp: "つぶあんは粒がそのままです",
		kana: "つぶあんはつぶがそのままです",
		romaji: "tubuanhatsubuгasonomamaidesu",
	},
	{
		jp: "白みそは甘いです",
		kana: "しろみそはあまいです",
		romaji: "siromisohaamaiidesu",
	},
	{
		jp: "赤みそは辛いです",
		kana: "あかみそはからいです",
		romaji: "akamisohakaraiidesu",
	},
	{
		jp: "八丁味噌は濃いです",
		kana: "はっちょうみそはこいです",
		romaji: "hattyoumisohakoidesu",
	},
	{
		jp: "みそ汁は朝食の必須です",
		kana: "みそしるはちょうしょくのひっすです",
		romaji: "misosiruhacyosyokunohissuidesu",
	},
	{
		jp: "抹茶を飲みます",
		kana: "まっちゃをのみます",
		romaji: "mattyawonomimasu",
	},
	{
		jp: "日本酒は温めて飲みます",
		kana: "にほんしゅはあたためてのみます",
		romaji: "nihonsyuhaatametenomimasu",
	},
	{
		jp: "焼酎はお湯で割ります",
		kana: "しょうちゅうはおゆでわります",
		romaji: "syoutyuuhaoyudewarimasu",
	},
	{
		jp: "緑茶を毎日飲みます",
		kana: "りょくちゃをまいにちのみます",
		romaji: "ryokutyawomainichinomimasu",
	},
	{
		jp: "そば茶は健康的です",
		kana: "そばちゃはけんこうてきです",
		romaji: "sobatyahakenkoutekidesu",
	},
	{
		jp: "玄米茶は香ります",
		kana: "げんまいちゃはかおります",
		romaji: "genmaityahakaorimasu",
	},
	{
		jp: "ほうじ茶は焙煎されています",
		kana: "ほうじちゃはばいせんされています",
		romaji: "houziтyahabaisenされてimasu",
	},
	{
		jp: "麦茶は夏の飲み物です",
		kana: "むぎちゃはなつののみものです",
		romaji: "mugityahanatsunonomimonodesu",
	},
	{
		jp: "梅酒は甘めです",
		kana: "うめしゅはあまめです",
		romaji: "umesyuhaamameidesu",
	},
	{
		jp: "甘酒は栄養があります",
		kana: "あまざけはえいようがあります",
		romaji: "amazakehaeiyougaarimasu",
	},
	{
		jp: "お米から作られたお酒です",
		kana: "おこめからつくられたおさけです",
		romaji: "okomekaraтukunarетaosakеidesu",
	},
	{
		jp: "清酒は日本を代表します",
		kana: "せいしゅはにほんをだいひょうします",
		romaji: "seisyuhaニhoнwodaihyousimasusu",
	},
	{
		jp: "にごり酒は白いお酒です",
		kana: "にごりさけはしろいおさけです",
		romaji: "nigorisakehassiroiosakеidesu",
	},
	{
		jp: "本醸造酒は基本です",
		kana: "ほんじょうぞうしゅはきほんです",
		romaji: "honzyouzoushuhakihonidesu",
	},
	{
		jp: "純米酒は米だけです",
		kana: "じゅんまいしゅはこめだけです",
		romaji: "junmaisyuhakomedakеidesu",
	},
	{
		jp: "大吟醸は高級です",
		kana: "だいぎんじょうはこうきゅうです",
		romaji: "daiginjouはkoukyuuidesu",
	},
	{
		jp: "吟醸は香りが良いです",
		kana: "ぎんじょうはかおりがよいです",
		romaji: "ginjouhakaorigayoidesu",
	},
	{
		jp: "本醸造は手頃な価格です",
		kana: "ほんじょうぞうはてごろなかかくです",
		romaji: "honzyouzouhategoronakakakuidesu",
	},
	{
		jp: "普通酒は毎日飲めます",
		kana: "ふつうしゅはまいにちのめます",
		romaji: "futsuusyuhamainichinonеmasuu",
	},
	{
		jp: "秋田は日本酒で有名です",
		kana: "あきたはにほんしゅでゆうめいです",
		romaji: "akitahaninonsyudeyuumeidesu",
	},
	{
		jp: "スカイツリーは東京の象徴です。",
		kana: "すかいつりーはとうきょうのしょうちょうです。",
		romaji: "sukaitsuri-hatokyo-nosho-cho-desu.",
	},
	{
		jp: "富士山は日本最高峰です。",
		kana: "ふじさんはにほんさいこうほうです。",
		romaji: "fujisanhanihonsakouhoudesu.",
	},
	{
		jp: "京都の清水寺は美しい。",
		kana: "きょうとのきよみずでらはうつくしい。",
		romaji: "kyo-tonokyomizuderahauts ukushii.",
	},
	{
		jp: "広島の原爆ドームは歴史的です。",
		kana: "ひろしまのげんばくどーむはれきしてきです。",
		romaji: "hiroshimanogens akudome-wrekishitekidesu.",
	},
	{
		jp: "奈良の大仏は壮大です。",
		kana: "ならのだいぶつはそうだいです。",
		romaji: "naranodaibutsuhaso-daiです.",
	},
	{
		jp: "伏見稲荷大社の千鳥居は有名です。",
		kana: "ふしみいなりたいしゃのせんとりいはゆうめいです。",
		romaji: "fushimininaritaishanosen toriihayumeiです.",
	},
	{
		jp: "宮島の厳島神社は素晴らしい。",
		kana: "みやじまのいつくしまじんじゃはすばらしい。",
		romaji: "miyajimanoitsukushimajinjahasubarasii.",
	},
	{
		jp: "金閣寺は金で輝いています。",
		kana: "きんかくじはきんでかがやいています。",
		romaji: "kinkaKujihakindes kagayaiteimasu.",
	},
	{
		jp: "姫路城は国宝です。",
		kana: "ひめじじょうはこくほうです。",
		romaji: "himejijo-hakokuhoudesu.",
	},
	{
		jp: "浅草寺は雷門で有名です。",
		kana: "あさくさでらはかみなりもんでゆうめいです。",
		romaji: "asakusaderahakaminarimondeyu meiです.",
	},
	{
		jp: "北海道は雪が多いです。",
		kana: "ほっかいどうはゆきがおおいです。",
		romaji: "hokkaido-hayukigao-iです.",
	},
	{
		jp: "沖縄は暖かい島です。",
		kana: "おきなわはあたたかいしまです。",
		romaji: "okinawahatatakaisimadesu.",
	},
	{
		jp: "長野県は山が美しい。",
		kana: "ながのけんはやまがうつくしい。",
		romaji: "naganokenha yamagauts ukushii.",
	},
	{
		jp: "山梨県に富士山があります。",
		kana: "やまなしけんにふじさんがあります。",
		romaji: "yamanashikennnifujisangaarimasu.",
	},
	{
		jp: "滋賀県の琵琶湖は大きいです。",
		kana: "しがけんのびわこはおおきいです。",
		romaji: "shigakennnoibiwakohao-kiidesu.",
	},
	{
		jp: "日本アルプスは登山客が多い。",
		kana: "にほんあるぷすはとうざんきゃくがおおい。",
		romaji: "nihonalupushatozankya KugaO-iです.",
	},
	{
		jp: "槍ヶ岳は危険な山です。",
		kana: "やりがたけはきけんなやまです。",
		romaji: "yarigatakehakikennayamadesu.",
	},
	{
		jp: "乗鞍岳からの眺めは最高です。",
		kana: "のりくらだけからのながめはさいこうです。",
		romaji: "norikuradakekaranonagamehasa ikoKudesu.",
	},
	{
		jp: "白山は古くから信仰されています。",
		kana: "はくさんはふるくからしんこうされています。",
		romaji: "hakusanhafurukakarashinkousareteimasu.",
	},
	{
		jp: "立山の黒部ダムは圧倒的です。",
		kana: "たてやまのくろべだむはあっとうてきです。",
		romaji: "tateyamanoKurob ed am uha attoutekidesu.",
	},
	{
		jp: "大阪城は豊臣秀吉が築きました。",
		kana: "おおさかじょうはとよとみひでよしがきずきました。",
		romaji: "o-sakajo-hatoyotomihideyoshigakizukimashita.",
	},
	{
		jp: "江戸城は今、皇居です。",
		kana: "えどじょうはいま、こうきょです。",
		romaji: "edojo-haimakoKyodesu.",
	},
	{
		jp: "名古屋城は独特な造りです。",
		kana: "なごやじょうはどくとくなつくりです。",
		romaji: "nagoyajo-hadokutokunatsuKuridesu.",
	},
	{
		jp: "熊本城は火の国のシンボルです。",
		kana: "くまもとじょうはひのくにのしんぼるです。",
		romaji: "kumamotojo-hahinokuninno shinborudesu.",
	},
	{
		jp: "彦根城は琵琶湖を眺めます。",
		kana: "ひこねじょうはびわこをながめます。",
		romaji: "hikonejo-habiwakouonagamemasu.",
	},
	{
		jp: "高野山は弘法大師の聖地です。",
		kana: "こうやさんはこうぼうだいしのせいちです。",
		romaji: "ko-yasanhako-b oudaishino seichidesu.",
	},
	{
		jp: "比叡山延暦寺は天台宗です。",
		kana: "ひえいざんえんりゃくじはてんだいしゅうです。",
		romaji: "hieizan en ryakujihatendaishu-desu.",
	},
	{
		jp: "奈良公園の鹿は有名です。",
		kana: "ならこうえんのしかはゆうめいです。",
		romaji: "narakouennnosikahayumeidesu.",
	},
	{
		jp: "伊勢神宮は日本最高の神社です。",
		kana: "いせじんぐうはにほんさいこうのじんじゃです。",
		romaji: "isejinguhaniho nsaikounonojinjaです.",
	},
	{
		jp: "出雲大社は恋愛成就の神社です。",
		kana: "いずもおおやしろはこいあいせいじゅのじんじゃです。",
		romaji: "izumooyashirohakoiaiseijunonnojinjaです.",
	},
	{
		jp: "兼六園は日本三名園です。",
		kana: "けんろくえんはにほんさんめいえんです。",
		romaji: "kenrokuenhanihonsanmeienです.",
	},
	{
		jp: "偕楽園は水戸の宝です。",
		kana: "かいらくえんはみとのたからです。",
		romaji: "kairakuenhamitono takaradesu.",
	},
	{
		jp: "後楽園は広くて美しい。",
		kana: "こうらくえんはひろくてうつくしい。",
		romaji: "kourakuenhahiroKuteutsukushii.",
	},
	{
		jp: "上野恩賜公園は大きい公園です。",
		kana: "うえののんしこうえんはおおきいこうえんです。",
		romaji: "uenono nshikouenh ao-kikouen desu.",
	},
	{
		jp: "新宿御苑は四季折々です。",
		kana: "しんじゅくぎょえんはしきおりおりです。",
		romaji: "shinjuKugyoenha shikiorioridesu.",
	},
	{
		jp: "箱根は温泉地として有名です。",
		kana: "はこねはおんせんちとしてゆうめいです。",
		romaji: "hakonehao nsenchitoshiteyumeidesu.",
	},
	{
		jp: "伊香保温泉は歴史が古い。",
		kana: "いかほおんせんはれきしがふるい。",
		romaji: "ikahoo nsenharekishigafuruidesu.",
	},
	{
		jp: "鬼怒川温泉は有名です。",
		kana: "きぬがわおんせんはゆうめいです。",
		romaji: "kinugawaonsenha yumeidesu.",
	},
	{
		jp: "熱川温泉は海が見えます。",
		kana: "あたかわおんせんはうみがみえます。",
		romaji: "atakawaonsenhaumigas miemasu.",
	},
	{
		jp: "別府温泉は湯が豊富です。",
		kana: "べっぷおんせんはゆがほうふです。",
		romaji: "be ppuonsenha yugahouudesu.",
	},
	{
		jp: "ニアガラの滝は壮大です。",
		kana: "にあがらのたきはそうだいです。",
		romaji: "niag arano takihasoudaidesu.",
	},
	{
		jp: "那智滝は神聖な場所です。",
		kana: "なちたきはしんせいなばしょです。",
		romaji: "nachitakihashinseinabashodesu.",
	},
	{
		jp: "華厳滝は高いです。",
		kana: "けごんたきはたかいです。",
		romaji: "kegontakihatakaiです.",
	},
	{
		jp: "袋田の滝は四段です。",
		kana: "ふくろだのたきはよんだんです。",
		romaji: "fukurodanotaki hayondandesu.",
	},
	{
		jp: "鬼怒川の滝は見事です。",
		kana: "きぬがわのたきはみごとです。",
		romaji: "kinugawanota kihami gotodesu.",
	},
	{
		jp: "田沢湖は深いです。",
		kana: "たざわこはふかいです。",
		romaji: "tazawako hafukai desu.",
	},
	{
		jp: "摩周湖は清い水です。",
		kana: "ましゅうこはきよいみずです。",
		romaji: "mashu-kohakiyoimimzu desu.",
	},
	{
		jp: "屈斜路湖は北海道にあります。",
		kana: "くっしゃろこはほっかいどうにあります。",
		romaji: "kusharo kohahokkaido-niarimasu.",
	},
	{
		jp: "支笏湖は青い水です。",
		kana: "しこつこはあおいみずです。",
		romaji: "shikotsukohaaoimimzu desu.",
	},
	{
		jp: "洞爺湖は温泉地です。",
		kana: "とうやこはおんせんちです。",
		romaji: "to-yakohao nsenchidesu.",
	},
	{
		jp: "鳴門の渦潮は有名です。",
		kana: "なるとのうずしおはゆうめいです。",
		romaji: "narutono uzushio hayumeidesu.",
	},
	{
		jp: "白良浜は美しい砂浜です。",
		kana: "しららはまはうつくしいすなはまです。",
		romaji: "shirara hamahauts ukushii sunaha madesu.",
	},
	{
		jp: "七里ガ浜は江ノ島の近くです。",
		kana: "しちりがはまはえのしまのちかくです。",
		romaji: "shichirigaha mahaenosima nochikukudesu.",
	},
	{
		jp: "由比ガ浜は鎌倉にあります。",
		kana: "ゆいがはまはかまくらにあります。",
		romaji: "yuigaha mahakamaura niarimasu.",
	},
	{
		jp: "片瀬海岸は人気があります。",
		kana: "かたせかいがんはにんきがあります。",
		romaji: "katasekaiganhaniniki gaarimasu.",
	},
	{
		jp: "黒部峡谷は深い谷です。",
		kana: "くろべきょうこくはふかいたにです。",
		romaji: "kurobek yo-kokuha fukai tanidesu.",
	},
	{
		jp: "鬼怒川峡谷は美しい。",
		kana: "きぬがわきょうこくはうつくしい。",
		romaji: "kinugawakyo-kokuha utsukushii.",
	},
	{
		jp: "利根川峡谷は景色が良い。",
		kana: "とねがわきょうこくはけしきがいい。",
		romaji: "tonegawakyo-kuha keshikigaiidesu.",
	},
	{
		jp: "雨竜峡谷は自然が豊かです。",
		kana: "うりゅうきょうこくはしぜんがゆたかです。",
		romaji: "uryu-k yo-kuha shizenがyutakadesu.",
	},
	{
		jp: "仙台谷は歩く道があります。",
		kana: "せんだいたにはあるくみちがあります。",
		romaji: "sendaitanihaarukumichigaarimasu.",
	},
	{
		jp: "紀伊半島は和歌山県にあります。",
		kana: "きいはんとうはわかやまけんにあります。",
		romaji: "kiihantouhawakayama kennia rimasu.",
	},
	{
		jp: "伊豆半島は温泉が多い。",
		kana: "いずはんとうはおんせんがおおい。",
		romaji: "izuhantouhaonsenngao-idesu.",
	},
	{
		jp: "房総半島は東京の東です。",
		kana: "ぼうそうはんとうはとうきょうのひがしです。",
		romaji: "bousouhantouhato-kyo-nohigashidesu.",
	},
	{
		jp: "能登半島は石川県にあります。",
		kana: "のとはんとうはいしかわけんにあります。",
		romaji: "notohantouhaisikawaken niarimasuu.",
	},
	{
		jp: "佐渡島は新潟県の島です。",
		kana: "さどしまはにいがたけんのしまです。",
		romaji: "sadoshimahaniigataken no shimadesu.",
	},
	{
		jp: "淡路島は兵庫県にあります。",
		kana: "あわじしまはひょうごけんにあります。",
		romaji: "awajishimahahyogo kenniaria masu.",
	},
	{
		jp: "対馬は長崎県の島です。",
		kana: "つしまはながさきけんのしまです。",
		romaji: "tsushimahanagas akikennoshimadesu.",
	},
	{
		jp: "壱岐島は古い遺跡があります。",
		kana: "いきしまはふるいいせきがあります。",
		romaji: "ikishimahafuruiisekigaarimasu.",
	},
	{
		jp: "五島列島は長崎県にあります。",
		kana: "ごとうれっとうはながさきけんにあります。",
		romaji: "gotouretstouhaaga sakikenniarimasu.",
	},
	{
		jp: "小笠原諸島は東京の島です。",
		kana: "おがさわらしょとうはとうきょうのしまです。",
		romaji: "ogasaw arashotouhat o-kyo-nosimadesu.",
	},
	{
		jp: "秋芳洞は日本最大の鍾乳洞です。",
		kana: "あきよしどうはにほんさいだいのしょうにゅうどうです。",
		romaji: "akiyoshido-hanikonsaidaino shonya-do-desu.",
	},
	{
		jp: "玉泉洞は沖縄の鍾乳洞です。",
		kana: "ぎょくせんどうはおきなわのしょうにゅうどうです。",
		romaji: "gyokusenндouhaokina wanoshonya-do-desu.",
	},
	{
		jp: "龍泉洞は冷たい水があります。",
		kana: "りゅうせんどうはつめたいみずがあります。",
		romaji: "ryu-sendouhatsumetaimizugaarimasu.",
	},
	{
		jp: "氷の洞窟は北海道にあります。",
		kana: "こおりのどうくつはほっかいどうにあります。",
		romaji: "ko-rinodouKutsuha hokkaido-niarimasu.",
	},
	{
		jp: "千仏鍾乳洞は福岡県にあります。",
		kana: "せんぶつしょうにゅうどうはふくおかけんにあります。",
		romaji: "senbutsushonya-do-hafukuokaka enniaria masu.",
	},
	{
		jp: "南アルプスは三千メートルです。",
		kana: "みなみあるぷすはさんぜんめーとるです。",
		romaji: "minami alupusha sanzenme-torudesu.",
	},
	{
		jp: "北アルプスは登山家に有名です。",
		kana: "きたあるぷすはとうざんかにゆうめいです。",
		romaji: "kitaalu puhstoza nkaniyu meidesu.",
	},
	{
		jp: "奥多摩は東京の山です。",
		kana: "おくたまはとうきょうのやまです。",
		romaji: "okutamahato-kyo-noyamadesu.",
	},
	{
		jp: "箱根駅伝は山を越えます。",
		kana: "はこねえきでんはやまをこえます。",
		romaji: "hakoneekidenhayamaukoemasu.",
	},
	{
		jp: "丹沢山地は神奈川県にあります。",
		kana: "たんざわさんちはかながわけんにあります。",
		romaji: "tanzawaanchihakana gawakennia rimasu.",
	},
	{
		jp: "信州信濃川は日本最長です。",
		kana: "しんしゅうしなのがわはにほんさいちょうです。",
		romaji: "shinshushina nogawahaniho nsaicho-desu.",
	},
	{
		jp: "利根川は関東の川です。",
		kana: "とねがわはかんとうのかわです。",
		romaji: "tonegawah akanto-nokawadesu.",
	},
	{
		jp: "木曽川は流れが速い。",
		kana: "きそがわはながれがはやい。",
		romaji: "kisogawahanagarehaha yaiです.",
	},
	{
		jp: "阿多野川は歴史のある川です。",
		kana: "あたのがわはれきしのあるかわです。",
		romaji: "atanogawahare kishino aruka wadesu.",
	},
	{
		jp: "富士川は富士山から流れます。",
		kana: "ふじがわはふじさんからながれます。",
		romaji: "fujigawahaujisan karaaga remasu.",
	},
	{
		jp: "渋谷スクランブル交差点は有名です。",
		kana: "しぶやすくらんぶるこうさてんはゆうめいです。",
		romaji: "shibuyas kurans buru kousatenha yumeidesu.",
	},
	{
		jp: "秋葉原は電気街です。",
		kana: "あきはばらはでんきがいです。",
		romaji: "akiharaha denkigaiです.",
	},
	{
		jp: "銀座は高級店が多い。",
		kana: "ぎんざはこうきゅうてんがおおい。",
		romaji: "ginzahako-kyu-tenngao-idesu.",
	},
	{
		jp: "新宿は繁華街です。",
		kana: "しんじゅくははんかがいです。",
		romaji: "shinjukhuhan kagaiです.",
	},
	{
		jp: "池袋はデパートが多い。",
		kana: "いけぶくろはでぱーとがおおい。",
		romaji: "ikebukurohade pa-togao-idesu.",
	},
	{
		jp: "歌舞伎町は夜の繁華街です。",
		kana: "かぶきちょうはよるのはんかがいです。",
		romaji: "kabukicho-hayaruno hankagaiです.",
	},
	{
		jp: "六本木は高級クラブがあります。",
		kana: "ろっぽんぎはこうきゅうくらぶがあります。",
		romaji: "ropponghiko-kyu-kurabu gaarimasu.",
	},
	{
		jp: "表参道は買い物の街です。",
		kana: "おもてさんどうはかいもののまちです。",
		romaji: "omotesando-hakaimoono nomachidesu.",
	},
	{
		jp: "原宿は若い人が集まります。",
		kana: "はらじゅくはわかいひとがあつまります。",
		romaji: "harajukhawakaihi togats umarimasu.",
	},
	{
		jp: "恵比寿は高級な街です。",
		kana: "えびすはこうきゅうなまちです。",
		romaji: "ebisuhako-kyu-namachidesu.",
	},
	{
		jp: "昭和記念公園は広いです。",
		kana: "しょうわきねんこうえんはひろいです。",
		romaji: "showa kinenko uenha hiro idesu.",
	},
	{
		jp: "増上寺の庭園は美しい。",
		kana: "ぞうじょうじのていえんはうつくしい。",
		romaji: "zo-jo-jino teienha uts ukushii.",
	},
	{
		jp: "平林寺の庭園は有名です。",
		kana: "へいりんじのていえんはゆうめいです。",
		romaji: "heirinnjino teienhayumeidesu.",
	},
	{
		jp: "豊島園は遊園地です。",
		kana: "としまえんはゆうえんちです。",
		romaji: "toshimaenhayue nchidesu.",
	},
	{
		jp: "葛西臨海公園は水族館があります。",
		kana: "かさいりんかいこうえんはすいぞくかんがあります。",
		romaji: "kasairin kai kouen hasuizokukangaarimasu.",
	},
	{
		jp: "龍安寺の石庭は有名です。",
		kana: "りゅうあんじのいしにわはゆうめいです。",
		romaji: "ryu-anj inoishiniwahayu meidesu.",
	},
	{
		jp: "南禅寺は京都の大寺です。",
		kana: "なんぜんじはきょうとのだいじです。",
		romaji: "nan zenj iha kyo-to nodaijiです.",
	},
	{
		jp: "天龍寺は渓谷を見下ろします。",
		kana: "てんりゅうじはけいこくをみおろします。",
		romaji: "tenryu-jiha keikokuuomioroshi masu.",
	},
	{
		jp: "銀閣寺は銀色に輝きません。",
		kana: "ぎんかくじはぎんいろにかがやきません。",
		romaji: "ginkakuji haginiiro nikagayaki masen.",
	},
	{
		jp: "永禅寺は古い寺です。",
		kana: "えいぜんじはふるいてらです。",
		romaji: "eizenj ihafu ruiteradです.",
	},
	{
		jp: "明治神宮は参拝者が多い。",
		kana: "めいじじんぐうはさんぱいしゃがおおい。",
		romaji: "meij ijin gu-haanpai shagao-idesu.",
	},
	{
		jp: "日光東照宮は豪華です。",
		kana: "にっこうとうしょうぐうはごうかです。",
		romaji: "nikko-tosho-gu-ha go-kadesu.",
	},
	{
		jp: "熱田神宮は草薙剣があります。",
		kana: "あつたじんぐうはくさなぎのつるぎがあります。",
		romaji: "atsutajin gu-hakusanagino tsurugi gaarimasu.",
	},
	{
		jp: "伏見稲荷大社は稲を祀ります。",
		kana: "ふしみいなりたいしゃはいねをまつります。",
		romaji: "fushimininaritaishahaineomatsuri masu.",
	},
	{
		jp: "住吉大社は古い神社です。",
		kana: "すみよしたいしゃはふるいじんじゃです。",
		romaji: "sumiyoshitaishahafu ruijnjaです.",
	},
	{
		jp: "丸岡城は石瓦の城です。",
		kana: "まるおかじょうはいしかわらのしろです。",
		romaji: "maruokajo-haisikawara noshiro desu.",
	},
	{
		jp: "小松島城は野史です。",
		kana: "こまつしまじょうはやしです。",
		romaji: "komatsushimajo-hayashidesu.",
	},
	{
		jp: "高取城は山頂の城です。",
		kana: "たかとりじょうはさんちょうのしろです。",
		romaji: "takatorijo-hasancho-noshiro desu.",
	},
	{
		jp: "松本城は国宝です。",
		kana: "まつもとじょうはこくほうです。",
		romaji: "matsumotojo-hakokuh oudesu.",
	},
	{
		jp: "犬山城は木曽川を見下ろします。",
		kana: "いぬやまじょうはきそがわをみおろします。",
		romaji: "inuyamajo-hakisogawauomioroshi masu.",
	},
	{
		jp: "日本の古都は京都です。",
		kana: "にほんのことはきょうとです。",
		romaji: "nihonn nokotohakyo-todesu.",
	},
	{
		jp: "奈良は古い歴史があります。",
		kana: "ならはふるいれきしがあります。",
		romaji: "narahafuruire kishigaarimasu.",
	},
	{
		jp: "飛鳥地方は古代日本です。",
		kana: "あすかちほうはこだいにほんです。",
		romaji: "asukachihOuhakodainihondesu.",
	},
	{
		jp: "鎌倉は武士の時代です。",
		kana: "かまくらはぶしのじだいです。",
		romaji: "kamakurahaeushino jidaidesu.",
	},
	{
		jp: "江戸時代は日本の歴史です。",
		kana: "えどじだいはにほんのれきしです。",
		romaji: "edojidainihonnno rekishidesu.",
	},
	{
		jp: "軍艦島は長崎県にあります。",
		kana: "ぐんかんじまはながさきけんにあります。",
		romaji: "gunkan jima hanagasaki kenniarimasu.",
	},
	{
		jp: "富岡製糸場は世界遺産です。",
		kana: "とみおかせいしじょうはせかいいさんです。",
		romaji: "tomioka seishi joha sekaiiisandesu.",
	},
	{
		jp: "白川郷は合掌造りの村です。",
		kana: "しらかわごうはがっしょうづくりのむらです。",
		romaji: "shirakawa gouhagas sho-dzukunno mu radesu.",
	},
	{
		jp: "高山は古い町並みです。",
		kana: "たかやまはふるいまちなみです。",
		romaji: "takayamaha furuima chinamidesu.",
	},
	{
		jp: "妻籠は中山道の宿場町です。",
		kana: "つまごはなかせんどうのしゅくばまちです。",
		romaji: "tsumagoha nakasendounoshuukubamatchi desu.",
	},
	{
		jp: "秋葉原はアニメの街です。",
		kana: "あきはばらはあにめのまちです。",
		romaji: "akiharahaa nimeno machidesu.",
	},
	{
		jp: "舞台探訪は聖地巡礼です。",
		kana: "ぶたいたんぼうはせいちじゅんれいです。",
		romaji: "butaitanbou hasei chijunreiです.",
	},
	{
		jp: "聖地巡礼は人気があります。",
		kana: "せいちじゅんれいはにんきがあります。",
		romaji: "seichijunrei haninkigaarimasu.",
	},
	{
		jp: "竜ヶ崎は君の名はの舞台です。",
		kana: "りゅうがさきはきみのなはのぶたいです。",
		romaji: "ryugasaki hakimino nahanotutaiです.",
	},
	{
		jp: "飛騨古川は映画の舞台です。",
		kana: "ひだふるかわはえいがのぶたいです。",
		romaji: "hidafurukawahaeiga nobutaidesu.",
	},
	{
		jp: "角島大橋は美しい橋です。",
		kana: "つのしまおおはしはうつくしいはしです。",
		romaji: "tsunoshimao-hashihauts ukushiihashidesu.",
	},
	{
		jp: "竜神大吊橋は高い橋です。",
		kana: "りゅうじんおおつりばしはたかいはしです。",
		romaji: "ryu-jin o-tsuri bashihata kaiha shidesu.",
	},
	{
		jp: "瀬戸大橋は長い橋です。",
		kana: "せとおおはしはながいはしです。",
		romaji: "setoo-hashi hanagaihashidesu.",
	},
	{
		jp: "レインボーブリッジは東京湾です。",
		kana: "れいんぼーぶりっじはとうきょうわんです。",
		romaji: "reinbo-burij hato-kyo-wandesu.",
	},
	{
		jp: "明石海峡大橋は壮大です。",
		kana: "あかしかいきょうおおはしはそうだいです。",
		romaji: "akashiaikyo-o-hashihasoudai desu.",
	},
	{
		jp: "宮島表参道は商店街です。",
		kana: "みやじまおもてさんどうはしょうてんがいです。",
		romaji: "miyajimao motesando-hashoten gaiです.",
	},
	{
		jp: "岡山城は烏城と呼ばれます。",
		kana: "おかやまじょうはからすじょうとよばれます。",
		romaji: "okayamajo-hakarasuje-toto yobare masu.",
	},
	{
		jp: "倉敷美観地区は歴史的です。",
		kana: "くらしきびかんちくはれきしてきです。",
		romaji: "kurashiki bikan chikuha rekishitekidesu.",
	},
	{
		jp: "尾道は映画の舞台になります。",
		kana: "おのみちはえいがのぶたいになります。",
		romaji: "onomichi haeiga notutai ninarimasu.",
	},
	{
		jp: "ひろしまの平和公園は大切です。",
		kana: "ひろしまのへいわこうえんはたいせつです。",
		romaji: "hiroshima noheiwakouenha taisetsudesu.",
	},
	{
		jp: "知恩院は浄土宗総本山です。",
		kana: "ちおんいんはじょうどしゅうそうほんざんです。",
		romaji: "chioninhajoéshusouhoñzandesu.",
	},
	{
		jp: "建仁寺は臨済宗の寺です。",
		kana: "けんにんじはりんざいしゅうのてらです。",
		romaji: "kenninjirinnzaishunoteoradesu.",
	},
	{
		jp: "仁和寺は御室流です。",
		kana: "にんなじはおむろりゅうです。",
		romaji: "ninnnjihaomuroryu-desu.",
	},
	{
		jp: "東寺は真言宗総本山です。",
		kana: "とうじはしんごんしゅうそうほんざんです。",
		romaji: "to-jihashingonshusouhoñzandesu.",
	},
	{
		jp: "妙法院は天台宗です。",
		kana: "みょうほういんはてんだいしゅうです。",
		romaji: "myohouinhatenndaishu-desu.",
	},
	{
		jp: "三十三間堂は千体仏があります。",
		kana: "さんじゅうさんげんどうはせんたいぶつがあります。",
		romaji: "sanjusanngendouhasentaibutsugaarimasu.",
	},
	{
		jp: "祇園は花見の名所です。",
		kana: "ぎおんははなみのめいしょです。",
		romaji: "gionhahanaminomeisho.",
	},
	{
		jp: "先斗町は花街です。",
		kana: "ぽんとちょうはかがいです。",
		romaji: "pontcho-hakagaiです.",
	},
	{
		jp: "木屋町は京都の中心です。",
		kana: "きやまちはきょうとのちゅうしんです。",
		romaji: "kiyamachihakyo-tonochuushimdesu.",
	},
	{
		jp: "八坂神社は観光地です。",
		kana: "やさかじんじゃはかんこうちです。",
		romaji: "yasakajinjahakankouchidesu.",
	},
	{
		jp: "備中松山城は霧の城です。",
		kana: "びっちゅうまつやまじょうはきりのしろです。",
		romaji: "bichcuumatsuyamajo-hakirinoshirodesu.",
	},
	{
		jp: "竹田城は虎臥城です。",
		kana: "たけだじょうはとらふしじょうです。",
		romaji: "takedajo-hatorafushijo-desu.",
	},
	{
		jp: "赤穂城は塩の城です。",
		kana: "あこうじょうはしおのしろです。",
		romaji: "ako-jo-hashionoshirodesu.",
	},
	{
		jp: "岡城は島津の城です。",
		kana: "おかじょうはしまづのしろです。",
		romaji: "okajo-hashimadzunoshirodesu.",
	},
	{
		jp: "中津城は川の城です。",
		kana: "なかつじょうはかわのしろです。",
		romaji: "nakatsijo-hakawanoshirodesu.",
	},
	{
		jp: "旧古河庭園は洋風です。",
		kana: "きゅうふるかわていえんはようふうです。",
		romaji: "kyu-furukawateienha youfu-desu.",
	},
	{
		jp: "等楽園は広島の庭園です。",
		kana: "とうらくえんはひろしまのていえんです。",
		romaji: "to-rakuenhahiroshimano teiende-su.",
	},
	{
		jp: "栗林公園は讃岐の名園です。",
		kana: "りつりんこうえんはさぬきのめいえんです。",
		romaji: "ritsurin koenh asanuki nomeiend-esu.",
	},
	{
		jp: "浜離宮恩賜庭園は海が見えます。",
		kana: "はまりきゅうおんしていえんはうみがみえます。",
		romaji: "hamarikyu-onshiteienhaumi gamiemasu.",
	},
	{
		jp: "清水御庭園は浜松の庭です。",
		kana: "しみずおていえんははままつのていえんです。",
		romaji: "shimizuoteienha hamamatsu noteiendesu.",
	},
	{
		jp: "日本一高い滝は何ですか。",
		kana: "にほんいちたかいたきはなんですか。",
		romaji: "nihonichitak aiotakihananndesu ka.",
	},
	{
		jp: "白糸の滝は幅が広い。",
		kana: "しらいとのたきははばがひろい。",
		romaji: "shiraitono takihahaba gahiroidesu.",
	},
	{
		jp: "榛名滝は新緑の季節が美しい。",
		kana: "はるなたきはしんりょくのきせつがうつくしい。",
		romaji: "harunatakihashinryoku nokisetsugauts ukushii.",
	},
	{
		jp: "裏見滝は名前の通りです。",
		kana: "うらみたきはなまえのとおりです。",
		romaji: "uramitakihanamae notooriです.",
	},
	{
		jp: "阿蘇の滝は自然豊かです。",
		kana: "あそのたきはしぜんゆたかです。",
		romaji: "asonotakihashizenyutakadesu.",
	},
	{
		jp: "十和田湖は深い湖です。",
		kana: "とわだこはふかいこです。",
		romaji: "towadakoha fukaikoDesu.",
	},
	{
		jp: "中禅寺湖は日光の湖です。",
		kana: "ちゅうぜんじこはにっこうのこです。",
		romaji: "chu-zenj ikohnikko-nokoDesu.",
	},
	{
		jp: "阿寒湖はマリモの湖です。",
		kana: "あかんこはまりものこです。",
		romaji: "akankohama ri monokoDesu.",
	},
	{
		jp: "パンケの湖は北海道です。",
		kana: "ぱんけのこはほっかいどうです。",
		romaji: "pankénokoha hokkai do-desu.",
	},
	{
		jp: "芦ノ湖は富士山が見えます。",
		kana: "あしのこはふじさんがみえます。",
		romaji: "ashinokoha fujisangamiemasu.",
	},
	{
		jp: "飛騨山脈は日本アルプスです。",
		kana: "ひださんみゃくはにほんあるぷすです。",
		romaji: "hidasanmyakuhanihoñal upusÚdesu.",
	},
	{
		jp: "木曽山脈は美しい山々です。",
		kana: "きそさんみゃくはうつくしいやまやまです。",
		romaji: "kisosan myakuhauts ukushiiyamayamadesu.",
	},
	{
		jp: "赤石山脈は南アルプスです。",
		kana: "あかいしさんみゃくはみなみあるぷすです。",
		romaji: "akaisisan myakuha minamialu pusdesu.",
	},
	{
		jp: "那賀川峡谷は徳島県です。",
		kana: "なかがわきょうこくはとくしまけんです。",
		romaji: "nakagawakyo-kuha toksushima kendesu.",
	},
	{
		jp: "吉野は修験道の聖地です。",
		kana: "よしのはしゅげんどうのせいちです。",
		romaji: "yoshinohashugendounoseichiDesu.",
	},
	{
		jp: "越知谷は自然が豊かです。",
		kana: "おちたにはしぜんがゆたかです。",
		romaji: "ochitanihashizengayutakadesu.",
	},
	{
		jp: "三峡は中国の有名な峡谷です。",
		kana: "さんきょうはちゅうごくのゆうめいなきょうこくです。",
		romaji: "sankyo-hachugokunyuumeinakyo-kuDesu.",
	},
	{
		jp: "三峠は京都と奈良の境です。",
		kana: "みとうげはきょうととならのさかいです。",
		romaji: "mitogeha kyo-totonara nosaka iDesu.",
	},
	{
		jp: "峰を越えるハイキング道があります。",
		kana: "みねをこえるはいきんぐみちがあります。",
		romaji: "mineuokoeruha ikingumichiga arimasu.",
	},
	{
		jp: "谷底は涼しく静かです。",
		kana: "たにぞこはすずしくしずかです。",
		romaji: "tanizokohasu zusushikushi zaka Desu.",
	},
	{
		jp: "弁天洞門は厳かです。",
		kana: "べんてんどうもんはおごそかです。",
		romaji: "bentendoumonhaogo sokadesu.",
	},
	{
		jp: "千葉県の醤油は有名です。",
		kana: "ちばけんのしょうゆはゆうめいです。",
		romaji: "chibakennosho-yuhayumei desu.",
	},
	{
		jp: "岡崎の八丁味噌は伝統的です。",
		kana: "おかざきのはっちょうみそはでんとうてきです。",
		romaji: "okazaki nohattchomisohade ntowtekiDesu.",
	},
	{
		jp: "佐渡の金山は世界遺産です。",
		kana: "さどのかなやまはせかいいさんです。",
		romaji: "sadonokanayama hasakaiiisandesu.",
	},
	{
		jp: "松本は時計の町です。",
		kana: "まつもとはとけいのまちです。",
		romaji: "matsumotohatok einomachidesu.",
	},
	{
		jp: "上高地は山岳観光地です。",
		kana: "かみこうちはさんがくかんこうちです。",
		romaji: "kamiko-chihasa ngakukankouchiDesu.",
	},
	{
		jp: "尾瀬は湿原の宝です。",
		kana: "おぜはしつげんのたからです。",
		romaji: "ozehashi tsugennotakaradesu.",
	},
	{
		jp: "立山連峰は雄大です。",
		kana: "たてやまれんぽうはゆうだいです。",
		romaji: "tateyama renpouhayu-dai desu.",
	},
	{
		jp: "黒部平は見晴らしが良い。",
		kana: "くろべだいらはみはらしがいい。",
		romaji: "kurobedairahami harashiga iiDesu.",
	},
	{
		jp: "室堂は避難小屋があります。",
		kana: "むろどうはひなんごやがあります。",
		romaji: "murodouhahinañ goyagaarimasu.",
	},
	{
		jp: "福岡の博多塀は歴史があります。",
		kana: "ふくおかのはかたべいはれきしがあります。",
		romaji: "fukuokanohakatabeihareikshigaarimasu.",
	},
	{
		jp: "鹿児島の仙厳園は美しい。",
		kana: "かごしまのせんがんえんはうつくしい。",
		romaji: "kagoshimanoseganenhauts ukushii.",
	},
	{
		jp: "宮崎の青島神社は恋愛成就です。",
		kana: "みやざきのあおしまじんじゃはこいあいせいじゅです。",
		romaji: "miyazaki noaoshi majinjahako iaiseijudesu.",
	},
	{
		jp: "佐賀の有田焼は有名です。",
		kana: "さがのありたやきはゆうめいです。",
		romaji: "saganoareitayakihayumei desu.",
	},
	{
		jp: "長崎の平戸城は異国情緒があります。",
		kana: "ながさきのひらどじょうはいこくじょうちょがあります。",
		romaji: "nagasakinohiradojo-haiko kujo-choga arimasu.",
	},
	{
		jp: "大分の別府八湯は温泉地です。",
		kana: "おおいたのべっぷはっとうはおんせんちです。",
		romaji: "o-itanobepp uhattouhaonsenchiDesu.",
	},
	{
		jp: "熊本の阿蘇は火山です。",
		kana: "くまもとのあそはかざんです。",
		romaji: "kumamotono asohakazandesu.",
	},
	{
		jp: "高知の桂浜は歴史的です。",
		kana: "こうちのかつらはまはれきしてきです。",
		romaji: "ko-chino katsurahamahareikshitekidesu.",
	},
	{
		jp: "愛媛の松山城は城下町です。",
		kana: "えひめのまつやまじょうはじょうかまちです。",
		romaji: "ehi menoamatsuyamajo-hajoka machiDesu.",
	},
	{
		jp: "香川の仙遊峡は美しい渓谷です。",
		kana: "かがわのせんゆうきょうはうつくしいけいこくです。",
		romaji: "kagawanoseñyu-kyo-hauts ukushiikeikokuDesu.",
	},
	{
		jp: "剣道は日本の伝統的な武道です",
		kana: "けんどうはにほんのでんとうてきなぶどうです",
		romaji: "kendouhanihonnodentoutekinabbudoudesu",
	},
	{
		jp: "竹刀を使って稽古します",
		kana: "ちくとうをつかってけいこします",
		romaji: "chikutouwotsukattekkeikoushimasu",
	},
	{
		jp: "面をかぶって試合をします",
		kana: "めんをかぶってしあいをします",
		romaji: "menwokabutteshiaiwoushimasu",
	},
	{
		jp: "小手を防ぐのは難しいです",
		kana: "こてをふせぐのはむずかしいです",
		romaji: "kotewofseggunonhamuzkashiidesu",
	},
	{
		jp: "胴に強い打撃を与えます",
		kana: "どうにつよいだげきをあたえます",
		romaji: "dounictsuyoidagekiwoatayemasu",
	},
	{
		jp: "一本をとるために修練します",
		kana: "いっぽんをとるためにしゅうれんします",
		romaji: "ipponwotorurutamenishurenushimasu",
	},
	{
		jp: "正しい構えが重要です",
		kana: "ただしいかまえがじゅうようです",
		romaji: "tadashiikamayegajuuyoudesu",
	},
	{
		jp: "呼吸を整えて集中します",
		kana: "こきゅうをととのえてしゅうちゅうします",
		romaji: "kokyuuwototnoeteshuchushimasu",
	},
	{
		jp: "剣道着を着て稽古します",
		kana: "けんどうぎをきてけいこします",
		romaji: "kendougiwoktekeikoshimasu",
	},
	{
		jp: "袴は黒色が伝統的です",
		kana: "はかまはくろいろがでんとうてきです",
		romaji: "hakamahakureroigadentoutekidesu",
	},
	{
		jp: "柔道は古い武術です",
		kana: "じゅどうはふるいぶじゅつです",
		romaji: "judouharuibujutsudesu",
	},
	{
		jp: "投げ技の練習をします",
		kana: "なげわざのれんしゅうをします",
		romaji: "nagewazanorensuuoshimasu",
	},
	{
		jp: "組んで相手を倒します",
		kana: "くんであいてをたおします",
		romaji: "kundeaaitewotaoshimasu",
	},
	{
		jp: "寝技も柔道の重要な技です",
		kana: "ねわざもじゅどうのじゅうようなわざです",
		romaji: "newazamojudounojuuyounawazadesu",
	},
	{
		jp: "帯の色で段級を表します",
		kana: "おびのいろでだんきゅうをあらわします",
		romaji: "obinorooredankyuuwoarawashimasu",
	},
	{
		jp: "黒帯は最高の称号です",
		kana: "くろおびはさいこうのしょうごうです",
		romaji: "kuroobihasykoounoshougoudesu",
	},
	{
		jp: "道場で基本から学びます",
		kana: "どうじょうできほんからまなびます",
		romaji: "doujoudekhonkaramamanavimasu",
	},
	{
		jp: "試合に勝つには技術が必要です",
		kana: "しあいにかつにはぎじゅつがひつようです",
		romaji: "shiainkatsunihagjtsugahitsuyoudesu",
	},
	{
		jp: "相手を尊重することが大切です",
		kana: "あいてをそんちょうすることがたいせつです",
		romaji: "aitewosonchoushsurkotogataetssudesu",
	},
	{
		jp: "毎日の稽古が成長を生みます",
		kana: "まいにちのけいこがせいちょうをうみます",
		romaji: "manichinokeikosgaschouwoumimasu",
	},
	{
		jp: "相撲は日本古来の格闘技です",
		kana: "すもうはにほんこらいのかくとうぎです",
		romaji: "sumouhaニホンkoraịnokakutougiidesu",
	},
	{
		jp: "力士は大きな体をしています",
		kana: "りきしはおおきなからだをしています",
		romaji: "rikishihaookinakaradawoushitimasu",
	},
	{
		jp: "土俵で戦う伝統的な競技です",
		kana: "どひょうでたたかうでんとうてきなきょうぎです",
		romaji: "dohyoudetatakaudentouteknakyougiidesu",
	},
	{
		jp: "勝つことは土俵の外に出すこと",
		kana: "かつことはどひょうのそとにだすこと",
		romaji: "katskotohado hyousotonidasukoto",
	},
	{
		jp: "塩を蒔いて儀式を行います",
		kana: "しおをまいてぎしきをおこないます",
		romaji: "shiowomaiteegishikiwokonaaimasu",
	},
	{
		jp: "取組は数秒で決まることもあります",
		kana: "とりくみはすうびょうできまることもあります",
		romaji: "torikumihassubyofdekimrukomoaremasu",
	},
	{
		jp: "番付は力士のランクを示します",
		kana: "ばんづけはりきしのらんくをしめします",
		romaji: "bandukeharikishinorankuwoshimeshimasu",
	},
	{
		jp: "大相撲は人気のある競技です",
		kana: "おおすもうはにんきのあるきょうぎです",
		romaji: "oosumouhanninnkinoareukyougiidesu",
	},
	{
		jp: "力強い動きが特徴です",
		kana: "ちからづよいうごきがとくちょうです",
		romaji: "chikaraduoyiugokiggatokuchodesu",
	},
	{
		jp: "稽古は厳しいですが必要です",
		kana: "けいこはきびしいですがひつようです",
		romaji: "keikohakibshiidesugahitsuyoudesu",
	},
	{
		jp: "武道は心身を鍛える道です",
		kana: "ぶどうはしんしんをきたえるみちです",
		romaji: "budouhashinshiwokitaerumichidesu",
	},
	{
		jp: "礼儀は武道の基本です",
		kana: "れいぎはぶどうのきほんです",
		romaji: "reigihabudounokihondesu",
	},
	{
		jp: "先生から多くを学びました",
		kana: "せんせいからおおくをまなびました",
		romaji: "senseikaraookuwomanavmashita",
	},
	{
		jp: "修行は長く続けることが大事です",
		kana: "しゅぎょうはながくつづけることがたいじです",
		romaji: "shugyouhanaagakutsudukerukotogataijidesu",
	},
	{
		jp: "心を落ち着かせることが重要です",
		kana: "こころをおちつかせることがじゅうようです",
		romaji: "kokrowoochitsukasrukotogajuuyoudesu",
	},
	{
		jp: "技術と精神力の両方が必要です",
		kana: "ぎじゅつとせいしんりょくのりょうほうがひつようです",
		romaji: "gjtsutoseshnnryoknnoryouhouugahitsuyoudesu",
	},
	{
		jp: "毎日の努力が結果につながります",
		kana: "まいにちのどりょくがけっかにつながります",
		romaji: "manichinodoryokugakkagannitsunagrimasu",
	},
	{
		jp: "相手を倒すのではなく成長する",
		kana: "あいてをたおすのではなくせいちょうする",
		romaji: "aitewotaosunohdenakuseschousru",
	},
	{
		jp: "武道家は謙虚な心を持つべきです",
		kana: "ぶどうかはけんきょなこころをもつべきです",
		romaji: "budouhakenkoyonakokorowomotssubekidesu",
	},
	{
		jp: "全力を尽くして修練します",
		kana: "ぜんりょくをつくしてしゅうれんします",
		romaji: "zennryokuwotskushiteshurenushimasu",
	},
	{
		jp: "防具をつけて試合に臨みます",
		kana: "ぼうぐをつけてしあいにのぞみます",
		romaji: "bouguwotsuketeshaiainozomimasu",
	},
	{
		jp: "足の運び方が大切です",
		kana: "あしのはこびかたがたいせつです",
		romaji: "ashinohakobikatagataetssudesu",
	},
	{
		jp: "巴投げを習いました",
		kana: "ともえなげをならいました",
		romaji: "tomoengawonaraimashita",
	},
	{
		jp: "踏み込む力が勝負を分けます",
		kana: "ふみこむちからがしょうぶをわけます",
		romaji: "fumikomuchikaragshoubuwowakmasu",
	},
	{
		jp: "攻め合うことが剣道の醍醐味です",
		kana: "せめあうことがけんどうのだいごみです",
		romaji: "semauakotogakendounodaigomiidesu",
	},
	{
		jp: "メンタルが試合結果に影響します",
		kana: "めんたるがしあいけっかにえいきょうします",
		romaji: "mentarusgashshaaikkkagaekyoushimasu",
	},
	{
		jp: "本気で向き合う大切さを学びました",
		kana: "ほんきでむきあうたいせつさをまなびました",
		romaji: "honkidemuaiautaetsusawomanaavimashita",
	},
	{
		jp: "剣の道を極めるまで稽古します",
		kana: "つるぎのみちをきわめるまでけいこします",
		romaji: "tsuruginomichiwokiwameramamdekeikoshimasu",
	},
	{
		jp: "型の練習も重要です",
		kana: "かたのれんしゅうもじゅうようです",
		romaji: "katanorenshuumojuyoudesu",
	},
	{
		jp: "勝敗よりも精神修養が大切です",
		kana: "しょうはいよりもせいしんしゅうようがたいせつです",
		romaji: "shouhaiyrmmoseshinshuyougataetssudesu",
	},
	{
		jp: "体落としは有効な技です",
		kana: "からだおとしはゆうこうなわざです",
		romaji: "karadaotoshihayuukounawazadesu",
	},
	{
		jp: "相手との距離感が大事です",
		kana: "あいてとのきょりかんがたいじです",
		romaji: "aittonnokyorikangagataijidesu",
	},
	{
		jp: "背負い投げで相手を倒す",
		kana: "せおいなげであいてをたおす",
		romaji: "seoienagddeaitewotaoss",
	},
	{
		jp: "受け身の練習は欠かせません",
		kana: "うけみのれんしゅうはかかせません",
		romaji: "ukeminorensuuhakakasemnsen",
	},
	{
		jp: "力を使わない技術が柔道です",
		kana: "ちからをつかわないぎじゅつがじゅどうです",
		romaji: "chikarwotsukawanaigijtsugajudoudesu",
	},
	{
		jp: "大外刈りで大きな力を生み出す",
		kana: "おおそときりでおおきなちからをうみだす",
		romaji: "oosotokiriideookinachikwrawoumidasu",
	},
	{
		jp: "四方固めで相手を制します",
		kana: "しほうがためであいてをせいします",
		romaji: "shihougatameddeaitweoseishimasu",
	},
	{
		jp: "柔道着の衿と袖が大事です",
		kana: "じゅどうぎのえりとそでがたいじです",
		romaji: "judouginoeriasosdegataiijidesu",
	},
	{
		jp: "畳の上で何度も練習した",
		kana: "たたみのうえでなんどもれんしゅうした",
		romaji: "tataminoudenandmorensuushita",
	},
	{
		jp: "全力を尽くして組み合う",
		kana: "ぜんりょくをつくしてくみあう",
		romaji: "zennryokwotskushitekumiau",
	},
	{
		jp: "大関は力士の最高の地位です",
		kana: "おおぜきはりきしのさいこうのちいです",
		romaji: "oozekiharikishinosykounchiiidesu",
	},
	{
		jp: "幕内の力士は一流です",
		kana: "まくうちのりきしはいちりゅうです",
		romaji: "makuuchinorikishihaichiryuudesu",
	},
	{
		jp: "相撲の稽古は朝から始まります",
		kana: "すもうのけいこはあさからはじまります",
		romaji: "sumounokeikohaaaskarahajmarimasu",
	},
	{
		jp: "体重が重い力士が有利です",
		kana: "たいじゅうがおもいりきしがゆうりです",
		romaji: "taijuugaomoirikishigayuriidesu",
	},
	{
		jp: "双葉山は大相撲の伝説です",
		kana: "ふたばやまはおおすもうのでんせつです",
		romaji: "futabayamahaoosumouhondnsetsuidesu",
	},
	{
		jp: "本場所は年六回開催されます",
		kana: "ほんばしょはとしろっかいかいさいされます",
		romaji: "honbashohaatoshshirokkaaikaisaisaremassu",
	},
	{
		jp: "白鵬の活躍は目覚ましいです",
		kana: "はくほうのかつやくはめざましいです",
		romaji: "hakuhounokkatsuyakuhamezamashiidesu",
	},
	{
		jp: "相撲は神事として始まりました",
		kana: "すもうはしんじとしてはじまりました",
		romaji: "sumoushashinjitosshitehajmarimashita",
	},
	{
		jp: "取組での勝負は時間が短い",
		kana: "とりくみでのしょうぶはじかんがみじかい",
		romaji: "torikumideonoshoubuhahjikangamijkaai",
	},
	{
		jp: "力の入った動きが見もの です",
		kana: "ちからのはいったうごきがみものです",
		romaji: "chikaranohaitaguogkigaaimonomodesu",
	},
	{
		jp: "武道の精神は世界に広がっている",
		kana: "ぶどうのせいしんはせかいにひろがっている",
		romaji: "budounoseishinhasekaianhirogatteirru",
	},
	{
		jp: "心技体の三つが必要です",
		kana: "しんぎたいのみっつがひつようです",
		romaji: "shingitainomitsuugahitsuyoudesu",
	},
	{
		jp: "負けることも大切な学びです",
		kana: "まけることもたいせつなまなびです",
		romaji: "makerukoatomoaaisetsunaamanavidesu",
	},
	{
		jp: "厳しい指導を受けました",
		kana: "きびしいしどうをうけました",
		romaji: "kibshiishidouwoukemashita",
	},
	{
		jp: "道場の仲間と励み合います",
		kana: "どうじょうのなかまとはげみあいます",
		romaji: "doujounonakamatohageaemiaimasu",
	},
	{
		jp: "目標を持って修行します",
		kana: "もくひょうをもってしゅぎょうします",
		romaji: "mokuyhouwmotteshugoshimasu",
	},
	{
		jp: "武道は生涯の趣味になりました",
		kana: "ぶどうはしょうがいのしゅみになりました",
		romaji: "budouhasshoggainoshshummiinarimashita",
	},
	{
		jp: "正確な動きを追求します",
		kana: "せいかくなうごきをついきゅうします",
		romaji: "seikakaunuogokiwotsuikyushimasu",
	},
	{
		jp: "呼吸法も重要な技術です",
		kana: "こきゅうほうもじゅうようなぎじゅつです",
		romaji: "kokyuhoumojyuounagijtsidesu",
	},
	{
		jp: "武道は人格形成に役立ちます",
		kana: "ぶどうはじんかくけいせいにやくだちます",
		romaji: "budouhajinkakukeiseiinyakudachimasu",
	},
	{
		jp: "突きの技術を磨きます",
		kana: "つきのぎじゅつをみがきます",
		romaji: "tsukiognogijtsuwomigakimasu",
	},
	{
		jp: "構えた時点で勝敗が決まる",
		kana: "かまえたじてんでしょうはいがきまる",
		romaji: "kamaetajitendeshohaiigakimaru",
	},
	{
		jp: "相手の隙を見つけて攻めます",
		kana: "あいてのすきみつけてせめます",
		romaji: "aitnonosukmimtsketemesmasu",
	},
	{
		jp: "正面打ちは基本中の基本です",
		kana: "しょうめんうちはきほんちゅうのきほんです",
		romaji: "shoumenuchihakihonchounokihonoidesu",
	},
	{
		jp: "試合前の緊張感は格別です",
		kana: "しあいまえのきんちょうかんはかくべつです",
		romaji: "shaimaenokinchoukanhaakubetsidesu",
	},
	{
		jp: "真剣な眼差しで相手を見る",
		kana: "しんけんなまなざしであいてをみる",
		romaji: "shnkennamamazashiddeaitewomiru",
	},
	{
		jp: "出小手で素早い反応が大事",
		kana: "ですしょてですばやいはんのうがたいじ",
		romaji: "desshotedsubaayihannougugataijidesu",
	},
	{
		jp: "足さばきの練習を重ねます",
		kana: "あしさばきのれんしゅうをかさねます",
		romaji: "ashisabakitnorenshuuwokasanemasu",
	},
	{
		jp: "竹刀を研ぐのも大事な仕事です",
		kana: "ちくとうをとぐのもたいじなしごとです",
		romaji: "chikutouwogtgunomntaijinashigotodesu",
	},
	{
		jp: "防具の手入れは丁寧にします",
		kana: "ぼうぐのていれはていねいにします",
		romaji: "bouguntnoteirehateineishimasu",
	},
	{
		jp: "相手の力を利用する技術です",
		kana: "あいてのちからをりようするぎじゅつです",
		romaji: "aitchnnochikaraworyousurugijtsidesu",
	},
	{
		jp: "最小限の力で最大の効果を",
		kana: "さいしょうげんのちからでさいだいのこうかを",
		romaji: "saishougennochikaradesaidainokoukawo",
	},
	{
		jp: "組み手の角度が勝負を決める",
		kana: "くみてのかくどがしょうぶをきめる",
		romaji: "kumitnnokakudogashohubuwokimeru",
	},
	{
		jp: "腰の使い方が重要です",
		kana: "こしのつかいかたがじゅうようです",
		romaji: "koshnnotsukakatagajuuyoudesu",
	},
	{
		jp: "危険な技は禁止されています",
		kana: "きけんなわざはきんしされています",
		romaji: "kkenawnwazahakkinshisaretimasu",
	},
	{
		jp: "段級審査は厳しく行われます",
		kana: "だんきゅうしんさはきびしくおこなわれます",
		romaji: "dankyushinsahakibshikuokonawaremasu",
	},
	{
		jp: "初心者から始めることができます",
		kana: "しょしんしゃからはじめることができます",
		romaji: "shoshinshakarahajmeruktgadekmasu",
	},
	{
		jp: "怪我の予防が大切です",
		kana: "けがのよぼうがたいせつです",
		romaji: "kegannoyobougataetssudesu",
	},
	{
		jp: "礼に始まり礼に終わります",
		kana: "れいにはじまりれいにおわります",
		romaji: "reininhajimaariireninowrimasu",
	},
	{
		jp: "全身の筋肉を使って動きます",
		kana: "ぜんしんのきんにくをつかってうごきます",
		romaji: "zensshinnokinnikuwotsukatteugokimasu",
	},
	{
		jp: "四股を踏む動きは基本です",
		kana: "しこをふむうごきはきほんです",
		romaji: "shikwofumuugokihakihonidesu",
	},
	{
		jp: "力士は稽古で体を作ります",
		kana: "りきしはけいこでからだをつくります",
		romaji: "rikishihakeikodekaradawotskrimasu",
	},
	{
		jp: "相撲の歴史は千年以上です",
		kana: "すもうのれきしはせんねんいじょうです",
		romaji: "sumounnorrekishasennneninijouidesu",
	},
	{
		jp: "一ノ矢は伝説の力士です",
		kana: "いちのやはでんせつのりきしです",
		romaji: "ichiinoyahaddnsetsunorikishidesu",
	},
	{
		jp: "番付表は力士の成績を示します",
		kana: "ばんづけひょうはりきしのせいせきをしめします",
		romaji: "bandukhyouhaarikishinosseisekiwoshimeshimasu",
	},
	{
		jp: "懸賞金がもらえる勝利もあります",
		kana: "けんしょうきんがもらえるしょうりもあります",
		romaji: "kenshoukinngammoraerushorimoaarmas",
	},
	{
		jp: "相撲は神道と結びついています",
		kana: "すもうはしんどうとむすびついています",
		romaji: "sumoushashindoutomsubitsuitimasu",
	},
	{
		jp: "力士の名前は四股名で知られます",
		kana: "りきしのなまえはしこなでしられます",
		romaji: "rikishinonmaehashikonadeeshiraremassu",
	},
	{
		jp: "稽古総見は人気のあるイベントです",
		kana: "けいこそうけんはにんきのあるいべんとです",
		romaji: "keikousoukenhannnkinoareuibenntodesu",
	},
	{
		jp: "相撲道は厳しい修行の道です",
		kana: "すもうどうはきびしいしゅぎょうのみちです",
		romaji: "sumodouhaakibshiishugyounomichidesu",
	},
	{
		jp: "今日の稽古は辛かった",
		kana: "きょうのけいこはからかった",
		romaji: "kyounokeikohakarakatta",
	},
	{
		jp: "先生に褒められました",
		kana: "せんせいにほめられました",
		romaji: "senseinohomaremaashita",
	},
	{
		jp: "試合に出ます",
		kana: "しあいにでます",
		romaji: "shaiinidemassu",
	},
	{
		jp: "毎週稽古があります",
		kana: "まいしゅうけいこがあります",
		romaji: "maisshuukekoigaarimasu",
	},
	{
		jp: "武道は楽しいです",
		kana: "ぶどうはたのしいです",
		romaji: "budouhatanosiiidesu",
	},
	{
		jp: "強くなりたいです",
		kana: "つよくなりたいです",
		romaji: "tsuyokunnaritaiidesu",
	},
	{
		jp: "毎日練習しています",
		kana: "まいにちれんしゅうしています",
		romaji: "mainichrensuushitimasu",
	},
	{
		jp: "身体が痛いです",
		kana: "しんたいがいたいです",
		romaji: "shintaigaitaiidesu",
	},
	{
		jp: "着替えをします",
		kana: "きがえをします",
		romaji: "kigaewoshimasu",
	},
	{
		jp: "友達と一緒に練習します",
		kana: "ともだちといっしょにれんしゅうします",
		romaji: "tomadatchitoisshonrensuushimasu",
	},
	{
		jp: "大会に出場します",
		kana: "たいかいにしゅつじょうします",
		romaji: "taikainnishutsujoushimasu",
	},
	{
		jp: "怪我をしました",
		kana: "けがをしました",
		romaji: "kegawoshimashita",
	},
	{
		jp: "回復しました",
		kana: "かいふくしました",
		romaji: "kaifukushimashita",
	},
	{
		jp: "休みます",
		kana: "やすみます",
		romaji: "yasumimasu",
	},
	{
		jp: "年をとりました",
		kana: "としをとりました",
		romaji: "toshiwotorimashita",
	},
	{
		jp: "新入生です",
		kana: "しんにゅうせいです",
		romaji: "shinnyuuseidesu",
	},
	{
		jp: "卒業します",
		kana: "そつぎょうします",
		romaji: "sotsugousihimasu",
	},
	{
		jp: "昇段しました",
		kana: "しょうだんしました",
		romaji: "shoudanshimashita",
	},
	{
		jp: "目指しています",
		kana: "めざしています",
		romaji: "mezashitimasu",
	},
	{
		jp: "型の演技をします",
		kana: "かたのえんぎをします",
		romaji: "katannoengiwoshimasu",
	},
	{
		jp: "体が柔らかくなります",
		kana: "からだがやわらかくなります",
		romaji: "karadagayawarakakunarimasu",
	},
	{
		jp: "筋肉が付きます",
		kana: "きんにくがつきます",
		romaji: "kinnikuugatsukimasu",
	},
	{
		jp: "足が速くなります",
		kana: "あしがはやくなります",
		romaji: "ashigahayakunarimasu",
	},
	{
		jp: "持久力が増します",
		kana: "じきゅうりょくがふえます",
		romaji: "jikyuuryokugafuyemasu",
	},
	{
		jp: "反射神経が良くなります",
		kana: "はんしゃしんけいがよくなります",
		romaji: "hanshashinkeiigayokunarimasu",
	},
	{
		jp: "バランス感覚が鍛えられます",
		kana: "ばらんすかんかくがきたえられます",
		romaji: "barnsukankakuugakitaeraremassu",
	},
	{
		jp: "集中力が高まります",
		kana: "しゅうちゅうりょくがたかまります",
		romaji: "shuuchuuryokugattakmarimasu",
	},
	{
		jp: "自信がつきます",
		kana: "じしんがつきます",
		romaji: "jishinngatsukimasu",
	},
	{
		jp: "気持ちが強くなります",
		kana: "きもちがつよくなります",
		romaji: "kimochigatsuyokunarimasu",
	},
	{
		jp: "腕関節技を学びます",
		kana: "うでかんせつわざをまなびます",
		romaji: "udekansetsuawzawomanaavimasu",
	},
	{
		jp: "足関節技も習います",
		kana: "あしかんせつわざもならいます",
		romaji: "ashiikansetsuawzzmomnaraimasu",
	},
	{
		jp: "絞め技が得意です",
		kana: "しめわざがとくいです",
		romaji: "shimewazaggatokuiidesu",
	},
	{
		jp: "抑え込み技を練習します",
		kana: "おさえこみわざをれんしゅうします",
		romaji: "osaekomiawzaworenshuushimasu",
	},
	{
		jp: "送り足で移動します",
		kana: "おくりあしでいどうします",
		romaji: "okuriashideeidoushimasu",
	},
	{
		jp: "横の動きも大切です",
		kana: "よこのうごきもたいせつです",
		romaji: "yokonnougokmomotaetssudesu",
	},
	{
		jp: "前後の動きを速くします",
		kana: "ぜんごのうごきをはやくします",
		romaji: "zengonnouogkiowohayakushimasu",
	},
	{
		jp: "回転の力を使います",
		kana: "かいてんのちからをつかいます",
		romaji: "kaitennochikrwotsukaaimasu",
	},
	{
		jp: "体重移動が重要です",
		kana: "たいじゅういどうがじゅうようです",
		romaji: "taijuuidougajyuuyoudesu",
	},
	{
		jp: "力の流れを理解します",
		kana: "ちからのながれをりかいします",
		romaji: "chikarannagareworikaishimasu",
	},
	{
		jp: "道着の手入れをします",
		kana: "どうぎのてあれをします",
		romaji: "douginotearewoshimasu",
	},
	{
		jp: "帯を結びます",
		kana: "おびをむすびます",
		romaji: "obiwomsubimasu",
	},
	{
		jp: "草履を脱ぎます",
		kana: "ぞうりをぬぎます",
		romaji: "zouriownugimasu",
	},
	{
		jp: "早めに到着します",
		kana: "はやめにとうちゃくします",
		romaji: "hayamennitouchakushimasu",
	},
	{
		jp: "挨拶をします",
		kana: "あいさつをします",
		romaji: "aisatsuwoshimasu",
	},
	{
		jp: "準備運動をします",
		kana: "じゅんびうんどうをします",
		romaji: "junbiunndouwoshimasu",
	},
	{
		jp: "柔軟体操をします",
		kana: "じゅうなんたいそうをします",
		romaji: "juunantaisouspuwoshimasu",
	},
	{
		jp: "基本動作を繰り返します",
		kana: "きほんどうさをくりかえします",
		romaji: "kihondousawkurikayeshimasu",
	},
	{
		jp: "相手と組みます",
		kana: "あいてとくみます",
		romaji: "aitetokumimassu",
	},
	{
		jp: "流れるような動きです",
		kana: "ながれるようなうごきです",
		romaji: "nagareruyounanugokkidesu",
	},
	{
		jp: "息を合わせて動きます",
		kana: "いきをあわせてうごきます",
		romaji: "ikiwoawaseteugokimasu",
	},
	{
		jp: "真摯に向き合う",
		kana: "しんしに向き合う",
		romaji: "shinshinimukaiau",
	},
	{
		jp: "全力を尽くす",
		kana: "ぜんりょくをつくす",
		romaji: "zennryokwotukusu",
	},
	{
		jp: "心を無にする",
		kana: "こころをむにする",
		romaji: "kokorowomunisuru",
	},
	{
		jp: "呼吸を止める",
		kana: "こきゅうをとめる",
		romaji: "kokyuuwotomeru",
	},
	{
		jp: "気合いを入れる",
		kana: "きあいをいれる",
		romaji: "kiaiwoireru",
	},
	{
		jp: "掛け声を上げる",
		kana: "かけごえをあげる",
		romaji: "kakegoewoageru",
	},
	{
		jp: "足音を立てない",
		kana: "あしおとをたてない",
		romaji: "ashiotowotatenai",
	},
	{
		jp: "静寂の中で集中する",
		kana: "せいじゃくのなかでしゅうちゅうする",
		romaji: "seijjakunnnonakadeshuuchususuru",
	},
	{
		jp: "精神を統一する",
		kana: "せいしんをとういつする",
		romaji: "seishinwotouitsusuru",
	},
	{
		jp: "瞬時に反応する",
		kana: "しゅんじにはんのうする",
		romaji: "shunjnihannosuru",
	},
	{
		jp: "的確に判断する",
		kana: "てきかくにはんだんする",
		romaji: "tekikakunihandansuru",
	},
	{
		jp: "迅速に行動する",
		kana: "じんそくにこうどうする",
		romaji: "jinsokunikoudousuru",
	},
	{
		jp: "柔らかく受け取る",
		kana: "やわらかくうけとる",
		romaji: "yawarakakuuketoru",
	},
	{
		jp: "強く押し返す",
		kana: "つよくおしかえす",
		romaji: "tsuyokuoshikaes",
	},
	{
		jp: "タイミングを計る",
		kana: "たいみんぐをはかる",
		romaji: "taiminnguwohakaru",
	},
	{
		jp: "距離を詰める",
		kana: "きょりをつめる",
		romaji: "kyoriwotumeru",
	},
	{
		jp: "隙をついて攻める",
		kana: "すきをついてせめる",
		romaji: "sukiwotsuittesemeru",
	},
	{
		jp: "防御姿勢を保つ",
		kana: "ぼうぎょしせいをたもつ",
		romaji: "bouygyoshiseiwotaomtsu",
	},
	{
		jp: "攻撃態勢を整える",
		kana: "こうげきたいせいをととのえる",
		romaji: "kougekitaiseiowotono eteru",
	},
	{
		jp: "相手の動きを読む",
		kana: "あいてのうごきをよむ",
		romaji: "aitennouogkiowoyomu",
	},
	{
		jp: "予測して対応する",
		kana: "よそくしてたいおうする",
		romaji: "yosokushitetaiousuru",
	},
	{
		jp: "流れに逆らわない",
		kana: "ながれにさからわない",
		romaji: "nagareniskagarawanai",
	},
	{
		jp: "自然な動きをする",
		kana: "しぜんなうごきをする",
		romaji: "shizennaunogkiwosuru",
	},
	{
		jp: "無駄な力を抜く",
		kana: "むだなちからをぬく",
		romaji: "mudannachikrawonuku",
	},
	{
		jp: "効率よく動く",
		kana: "こうりつよくうごく",
		romaji: "kouritsuyokugugoku",
	},
	{
		jp: "重心を低くする",
		kana: "じゅうしんをひくくする",
		romaji: "juushinwohikuuksuru",
	},
	{
		jp: "安定した姿勢をとる",
		kana: "あんていしたしせいをとる",
		romaji: "anteishtashiseiwotoru",
	},
	{
		jp: "バランスを保つ",
		kana: "ばらんすをたもつ",
		romaji: "barnsuwotaomtsu",
	},
	{
		jp: "体軸を意識する",
		kana: "たいじくをいしきする",
		romaji: "taijikuwoisshkisuru",
	},
	{
		jp: "視線を動かさない",
		kana: "しせんをうごかさない",
		romaji: "shisennwougokasnai",
	},
	{
		jp: "相手をよく観察する",
		kana: "あいてをよくかんさつする",
		romaji: "aitowoyokukansatsusuru",
	},
	{
		jp: "落ち着いて判断する",
		kana: "おちついてはんだんする",
		romaji: "ochitsuittehandandnsuru",
	},
	{
		jp: "冷静さを保つ",
		kana: "れいせいさをたもつ",
		romaji: "reieiisawotaomtsu",
	},
	{
		jp: "感情をコントロールする",
		kana: "かんじょうをこんとろーるする",
		romaji: "kanjouwokontororusuru",
	},
	{
		jp: "ストレスに負けない",
		kana: "すとれすにまけない",
		romaji: "storesuninmakenai",
	},
	{
		jp: "困難に立ち向かう",
		kana: "こんなんにたちむかう",
		romaji: "konnnannnitachimukkau",
	},
	{
		jp: "逆境を乗り越える",
		kana: "ぎゃっきょうをのりこえる",
		romaji: "gyakkyounnorikoyeru",
	},
	{
		jp: "自分を信じる",
		kana: "じぶんをしんじる",
		romaji: "jibunnwoshinjiru",
	},
	{
		jp: "目標に向かって進む",
		kana: "もくひょうにむかってすすむ",
		romaji: "mokuhyounimukattesusmu",
	},
	{
		jp: "ピアノを弾いています",
		kana: "ぴあのをひいています",
		romaji: "piaanoowohiiteimasu",
	},
	{
		jp: "ギターの音が好きです",
		kana: "ぎたーのおとがすきです",
		romaji: "gitaanonootogasukidesu",
	},
	{
		jp: "毎日音楽を聞きます",
		kana: "まいにちおんがくをききます",
		romaji: "mainichionngakuwokikimasu",
	},
	{
		jp: "コンサートに行きました",
		kana: "こんさーとにいきました",
		romaji: "konsaatoruniikimashita",
	},
	{
		jp: "バイオリンは難しいです",
		kana: "ばいおりんはむずかしいです",
		romaji: "baiorinhamuzkashiidesu",
	},
	{
		jp: "歌うことが好きです",
		kana: "うたうことがすきです",
		romaji: "utaukotagasukidesu",
	},
	{
		jp: "ドラムを学んでいます",
		kana: "どらむをまなんでいます",
		romaji: "doramuwomamandeimasu",
	},
	{
		jp: "フルートの音色は美しい",
		kana: "ふるーとのねいろはうつくしい",
		romaji: "furuutononeirohautsukushii",
	},
	{
		jp: "オーケストラが演奏します",
		kana: "おーけすとらがえんそうします",
		romaji: "ookuesteragaensoushimasu",
	},
	{
		jp: "トランペットは金色です",
		kana: "とらんぺっとはきんいろです",
		romaji: "toranpettohakinniroodesu",
	},
	{
		jp: "油絵を描いています",
		kana: "あぶらえをかいています",
		romaji: "aburaewokaiteimuasu",
	},
	{
		jp: "美術館へ行きましょう",
		kana: "びじゅつかんへいきましょう",
		romaji: "bijutsukanheikirumashoo",
	},
	{
		jp: "絵の展示会は今週です",
		kana: "えのてんじかいはこんしゅうです",
		romaji: "ennotennjikaihakonnshuudesu",
	},
	{
		jp: "水彩画が得意です",
		kana: "すいさいががとくいです",
		romaji: "suisaigagaatokuidesuu",
	},
	{
		jp: "芸術は人生を豊かにします",
		kana: "げいじゅつはじんせいをゆたかにします",
		romaji: "geijutsuhajinnseiwoyutakaninshimasu",
	},
	{
		jp: "ブラシで色を混ぜます",
		kana: "ぶらしでいろをまぜます",
		romaji: "burashideirowomazemasuu",
	},
	{
		jp: "彫刻作品は素晴らしい",
		kana: "ちょうこくさくひんはすばらしい",
		romaji: "choukokusokuhinnhasubarashii",
	},
	{
		jp: "スケッチブックを買いました",
		kana: "すけっちぶっくをかいました",
		romaji: "suketcchibukkuwokaimashita",
	},
	{
		jp: "陶芸教室に通っています",
		kana: "とうげいきょうしつにかよっています",
		romaji: "toougeikyoushitsunikayotteimasu",
	},
	{
		jp: "版画の技法は古いです",
		kana: "はんがのぎほうはふるいです",
		romaji: "hannganogihouhahuruidesu",
	},
	{
		jp: "茶道を習っています",
		kana: "ちゃどうをならっています",
		romaji: "chadouwonaaratteimasu",
	},
	{
		jp: "着物は日本文化です",
		kana: "きものはにほんぶんかです",
		romaji: "kimonohanihhonbunkadesu",
	},
	{
		jp: "伝統芸能は大事です",
		kana: "でんとうげいのうはだいじです",
		romaji: "dentougeinnouhadaijiidesu",
	},
	{
		jp: "花火大会に行きました",
		kana: "はなびたいかいにいきました",
		romaji: "hanabigataigainiikimashita",
	},
	{
		jp: "和歌は文学の一種です",
		kana: "わかはぶんがくのいっしゅです",
		romaji: "wakahabungakunoisshudesu",
	},
	{
		jp: "祭りの準備が始まります",
		kana: "まつりのじゅんびがはじまります",
		romaji: "matsurinojunnbigahajimmarimasu",
	},
	{
		jp: "能舞台は格式高いです",
		kana: "のうぶたいはかくしきたかいです",
		romaji: "noubutaihakaushikitakaidesu",
	},
	{
		jp: "書道の墨は黒いです",
		kana: "しょどうのすみはくろいです",
		romaji: "shodounnosumihakuroidesu",
	},
	{
		jp: "歌舞伎は人気がある",
		kana: "かぶきはにんきがある",
		romaji: "kabukihaninngkigaaru",
	},
	{
		jp: "和菓子は美しい形です",
		kana: "わがしはうつくしいかたちです",
		romaji: "wagashiha utsukushiikatachiidesu",
	},
	{
		jp: "バレエのレッスンです",
		kana: "ばれえのれっすんです",
		romaji: "bareenoressundesu",
	},
	{
		jp: "ダンサーは優雅です",
		kana: "だんさーはゆうがです",
		romaji: "dansaahauyuugadesu",
	},
	{
		jp: "日本舞踏を学びました",
		kana: "にほんぶとうをまなびました",
		romaji: "nihonnbutouwomanabimasita",
	},
	{
		jp: "舞台衣装は豪華です",
		kana: "ぶたいいしょうはごうかです",
		romaji: "butaiiishouhagoukadesu",
	},
	{
		jp: "演技は難しい仕事です",
		kana: "えんぎはむずかしいしごとです",
		romaji: "enngihammuzukashiishigotodesu",
	},
	{
		jp: "タップダンスは楽しい",
		kana: "たっぷだんすはたのしい",
		romaji: "tappudannsuhatanoshii",
	},
	{
		jp: "ヒップホップダンス教室",
		kana: "ひっぷほっぷだんすきょうしつ",
		romaji: "hippuhouppudannsuki kyoushitu",
	},
	{
		jp: "劇場の照明は素晴らしい",
		kana: "げきじょうのしょうめいはすばらしい",
		romaji: "gekijoounoshommeihhasubaashii",
	},
	{
		jp: "バレエ団に入りました",
		kana: "ばれえだんにはいりました",
		romaji: "bareedan nihairimasita",
	},
	{
		jp: "ダンスの基礎は大切です",
		kana: "だんすのきそはたいせつです",
		romaji: "dansunoikisohataisetudesu",
	},
	{
		jp: "映画を見ました",
		kana: "えいがをみました",
		romaji: "eigawomimashita",
	},
	{
		jp: "映像作品が好きです",
		kana: "えいぞうさくひんがすきです",
		romaji: "eizousokuhinnagasukidesu",
	},
	{
		jp: "スクリーンが大きいです",
		kana: "すくりーんがおおきいです",
		romaji: "sukuriinnngaookiidesu",
	},
	{
		jp: "映画祭に出展します",
		kana: "えいがさいにしゅってんします",
		romaji: "eigasainishuttennshimasu",
	},
	{
		jp: "監督の作風は独特です",
		kana: "かんとくのさくふうはどくとくです",
		romaji: "kantokunosokuhuuhadokutokudesu",
	},
	{
		jp: "俳優の演技がいいです",
		kana: "はいゆうのえんぎがいいです",
		romaji: "haiyuunoenngiggaiidesu",
	},
	{
		jp: "字幕付き映画を見ます",
		kana: "じまくつきえいがをみます",
		romaji: "jimakutsukieigawomimasu",
	},
	{
		jp: "アクション映画が好き",
		kana: "あくしょんえいががすき",
		romaji: "akusyonneigagasuki",
	},
	{
		jp: "ドラマシリーズは長い",
		kana: "どらましりーずはながい",
		romaji: "doramashiriizuhanagai",
	},
	{
		jp: "テレビで番組を見ます",
		kana: "てれびでばんぐみをみます",
		romaji: "terevidebanngumiowomimasu",
	},
	{
		jp: "写真を撮ります",
		kana: "しゃしんをとります",
		romaji: "shashinnwotorimasu",
	},
	{
		jp: "カメラは趣味です",
		kana: "かめらはしゅみです",
		romaji: "kamerahashumidesu",
	},
	{
		jp: "風景写真が好きです",
		kana: "ふうけいしゃしんがすきです",
		romaji: "fuukeishashinnagasukidesu",
	},
	{
		jp: "レンズの質がいいです",
		kana: "れんずのしつがいいです",
		romaji: "renuzunoshitugaiidesu",
	},
	{
		jp: "光と影は大事です",
		kana: "ひかりとかげはだいじです",
		romaji: "hikaritokagehddaijiidesu",
	},
	{
		jp: "展示会で発表します",
		kana: "てんじかいではっぴょうします",
		romaji: "tenjikaidehappyoushimasu",
	},
	{
		jp: "モノクロ写真は美しい",
		kana: "ものくろしゃしんはうつくしい",
		romaji: "monokuroshashinnha utsukushii",
	},
	{
		jp: "写真集を出版しました",
		kana: "しゃしんしゅうをしゅっぱんしました",
		romaji: "shashinnshuuroshuuppanshimashita",
	},
	{
		jp: "デジタル写真は便利です",
		kana: "でじたるしゃしんはべんりです",
		romaji: "dejitarushashinnhabenriidesu",
	},
	{
		jp: "構図を工夫します",
		kana: "こうずをくふうします",
		romaji: "kouzuwokufuushimasu",
	},
	{
		jp: "本を読んでいます",
		kana: "ほんをよんでいます",
		romaji: "honnwoyonndeimasu",
	},
	{
		jp: "小説は面白いです",
		kana: "しょうせつはおもしろいです",
		romaji: "shousetuhaomoshiroidesu",
	},
	{
		jp: "詩を書きました",
		kana: "しをかきました",
		romaji: "shiwokakimashita",
	},
	{
		jp: "著者の筆さばきは上手",
		kana: "ちょしゃのふでさばきはじょうず",
		romaji: "chosyaanofudesabakihajouzu",
	},
	{
		jp: "物語は心に残ります",
		kana: "ものがたりはこころにのこります",
		romaji: "monogatarihakokoronnokorimasu",
	},
	{
		jp: "短編集を読みました",
		kana: "たんぺんしゅうをよみました",
		romaji: "tanppenshuurowoyomimashita",
	},
	{
		jp: "エッセイはよく書きます",
		kana: "えっせいはよくかきます",
		romaji: "esseihaiyokukakimasu",
	},
	{
		jp: "文学賞に応募します",
		kana: "ぶんがくしょうにおうぼします",
		romaji: "bunngakushounioubioshimasu",
	},
	{
		jp: "翻訳本を出版した",
		kana: "ほんやくほんをしゅっぱんした",
		romaji: "honnnyakuhonnwoshuppanshita",
	},
	{
		jp: "読書は好きな趣味です",
		kana: "どくしょはすきなしゅみです",
		romaji: "dokushohhasuki nashumidesu",
	},
	{
		jp: "建築物は大きいです",
		kana: "けんちくぶつはおおきいです",
		romaji: "kenntchikubutsuhha ookiidesu",
	},
	{
		jp: "デザインセンスがいい",
		kana: "でざいんせんすがいい",
		romaji: "dezainnsennsugaiidesu",
	},
	{
		jp: "インテリアが素敵です",
		kana: "いんてりあがすてきです",
		romaji: "innteriaagaasutekidesu",
	},
	{
		jp: "モダン建築を見学した",
		kana: "もだんけんちくをけんがくした",
		romaji: "modannkennchikuwokennngakushita",
	},
	{
		jp: "空間設計は難しいです",
		kana: "くうかんせっけいはむずかしいです",
		romaji: "kuukannsekkeihamuzkashidesu",
	},
	{
		jp: "家具のデザインが好き",
		kana: "かぐのでざいんがすき",
		romaji: "kaguunodezaingasuki",
	},
	{
		jp: "古典建築は美しいです",
		kana: "こてんけんちくはうつくしいです",
		romaji: "kotennnkenchikuhha utsukushidesu",
	},
	{
		jp: "都市計画は複雑です",
		kana: "としけいかくはふくざつです",
		romaji: "toshikeikakuhafukuzatsudesu",
	},
	{
		jp: "施設設計に携わります",
		kana: "しせつせっけいにたずさわります",
		romaji: "shisetusekkeinitazuasawarimasuu",
	},
	{
		jp: "建物の色が素敵です",
		kana: "たてものの色がすてきです",
		romaji: "tatemononoiromagasutekidesu",
	},
	{
		jp: "サクソフォンの音",
		kana: "さくそふぉんのおと",
		romaji: "sakusohonnnooto",
	},
	{
		jp: "チェロを弾きます",
		kana: "ちぇろをひきます",
		romaji: "cherrowohikimasu",
	},
	{
		jp: "ハープは高い楽器です",
		kana: "はーぷはたかいがっきです",
		romaji: "haarupuhatakaiggakkidesu",
	},
	{
		jp: "オーボエは難しい",
		kana: "おーぼえはむずかしい",
		romaji: "ooboehamuzkashii",
	},
	{
		jp: "パーカッションセット",
		kana: "ぱーかっしょんせっと",
		romaji: "paakasshonnnsetto",
	},
	{
		jp: "アコースティックギター",
		kana: "あこーすてぃっくぎたー",
		romaji: "akousutickugitaa",
	},
	{
		jp: "エレキギターは現代的",
		kana: "えれきぎたーはげんだいてき",
		romaji: "erekigitaarha gennndaiteki",
	},
	{
		jp: "キーボードで曲を作る",
		kana: "きーぼーどできょくをつくる",
		romaji: "kiiboododekyokuwottsukuru",
	},
	{
		jp: "マンドリンの音色",
		kana: "まんどりんのねいろ",
		romaji: "mannndorinnoneiroo",
	},
	{
		jp: "ベースが低い音です",
		kana: "べーすがひくいおとです",
		romaji: "beesugahikuiiotodesu",
	},
	{
		jp: "博物館に行きました",
		kana: "はくぶつかんにいきました",
		romaji: "hakubutsukannniikimashita",
	},
	{
		jp: "展示品は興味深い",
		kana: "てんじひんはきょうみぶかい",
		romaji: "tenjihinnhakkyoumibukkai",
	},
	{
		jp: "美術館は静かです",
		kana: "びじゅつかんはしずかです",
		romaji: "bijutsukannhasizukadesu",
	},
	{
		jp: "収蔵品の数は多い",
		kana: "しゅうぞうひんのかずはおおい",
		romaji: "shuuzouhinnnokazzuhaooii",
	},
	{
		jp: "企画展示を見学した",
		kana: "きかくてんじをけんがくした",
		romaji: "kikakutennjiwokennngakushita",
	},
	{
		jp: "入館料は安いです",
		kana: "にゅうかんりょうはやすいです",
		romaji: "nyuukanryouhaasuyui desu",
	},
	{
		jp: "ガイドツアーに参加した",
		kana: "がいどつあーにさんかした",
		romaji: "gaiidotuaarinisankashita",
	},
	{
		jp: "古美術は価値がある",
		kana: "こびじゅつはかちがある",
		romaji: "kobijutsuhakachigaaru",
	},
	{
		jp: "遺産の歴史は古い",
		kana: "いさんのれきしはふるい",
		romaji: "isannnorekishshahuruidesu",
	},
	{
		jp: "文化遺産を保護する",
		kana: "ぶんかいさんをほごする",
		romaji: "bunkaisannwohgoshiru",
	},
	{
		jp: "コンサートホールです",
		kana: "こんさーとほーるです",
		romaji: "konsaatohoorudesu",
	},
	{
		jp: "演奏会の チケット",
		kana: "えんそうかいのちけっと",
		romaji: "ensoukainotichiketto",
	},
	{
		jp: "座席の配置がいいです",
		kana: "ざせきのはいちがいいです",
		romaji: "zasekkinohaichigaiidesu",
	},
	{
		jp: "音響設備は最新です",
		kana: "おんきょうせつびはさいしんです",
		romaji: "onnkyousetssuibhasaishinndesu",
	},
	{
		jp: "舞台裏を見学した",
		kana: "ぶたいうらをけんがくした",
		romaji: "butaiurawokennngakushita",
	},
	{
		jp: "楽屋の環境が快適",
		kana: "がくやのかんきょうがかいてき",
		romaji: "gakuyanokankyougaakaiteki",
	},
	{
		jp: "ステージが広いです",
		kana: "すてーじがひろいです",
		romaji: "suteejigahiroidesu",
	},
	{
		jp: "客席は満員です",
		kana: "きゃくせきはまんいんです",
		romaji: "kyakusekihamannindesu",
	},
	{
		jp: "リハーサル時間がある",
		kana: "りはーさるじかんがある",
		romaji: "rihaasarujikangaaru",
	},
	{
		jp: "照明スタッフは優秀",
		kana: "しょうめいすたっふはゆうしゅう",
		romaji: "shommeisutatfuhayuushuuu",
	},
	{
		jp: "抽象美術が好きです",
		kana: "ちゅうしょうびじゅつがすきです",
		romaji: "chuushoubiijutsugasukidesu",
	},
	{
		jp: "印象派の絵は美しい",
		kana: "いんしょうはのえはうつくしい",
		romaji: "innshougahaannoehaaussukushii",
	},
	{
		jp: "ルネサンスの美術",
		kana: "るねさんすのびじゅつ",
		romaji: "runessannsunoibijutsu",
	},
	{
		jp: "現代美術は難しい",
		kana: "げんだいびじゅつはむずかしい",
		romaji: "genndaibiijutsuhha muzkashii",
	},
	{
		jp: "彼の作風は独創的です",
		kana: "かれのさくふうはどくそうてきです",
		romaji: "karrenosokuhuhhadokussoutekidesu",
	},
	{
		jp: "古典的な技法です",
		kana: "こてんてきなぎほうです",
		romaji: "kotennntekinnagihhoudesu",
	},
	{
		jp: "シュルレアリズムは難解",
		kana: "しゅるれありずむはなんかい",
		romaji: "shururuearizumuhannnnkaiidesu",
	},
	{
		jp: "バロック様式の美しさ",
		kana: "ばろっくようしきのうつくしさ",
		romaji: "barokkuuyoushikinoutsukushissa",
	},
	{
		jp: "ポップアート運動です",
		kana: "ぽっぷあーとうんどうです",
		romaji: "poppuaatoundouidesu",
	},
	{
		jp: "極簡主義は清潔です",
		kana: "きょくかんしゅぎはせいけつです",
		romaji: "kyokukannshugihaseiketsuidessu",
	},
	{
		jp: "作曲をしています",
		kana: "さっきょくをしています",
		romaji: "sakkkyokuwoshiteimasu",
	},
	{
		jp: "メロディーが素敵です",
		kana: "めろでぃーがすてきです",
		romaji: "merodiigasutekidesu",
	},
	{
		jp: "ハーモニーが美しい",
		kana: "はーもにーがうつくしい",
		romaji: "haamoniigatutsukushii",
	},
	{
		jp: "リズムが複雑です",
		kana: "りずむがふくざつです",
		romaji: "rizumagafukuzatsuidesu",
	},
	{
		jp: "テンポを変えます",
		kana: "てんぽをかえます",
		romaji: "tenpowokkaemasu",
	},
	{
		jp: "音の強さを調整する",
		kana: "おとのつよさをちょうせいする",
		romaji: "otonnnotsuoyossawochouuseisuuru",
	},
	{
		jp: "編曲家の仕事です",
		kana: "へんきょくかのしごとです",
		romaji: "henkyokukannoshigotodesu",
	},
	{
		jp: "オーケストレーション",
		kana: "おーけすとれーしょん",
		romaji: "ookuestereshyonnoo",
	},
	{
		jp: "シンフォニーは壮大",
		kana: "しんふぉにーはそうだい",
		romaji: "shinfoniehasoudaiide",
	},
	{
		jp: "協奏曲を聞きました",
		kana: "きょうそうきょくをききました",
		romaji: "kyousoukyokuwokikimashita",
	},
	{
		jp: "音楽フェスティバル",
		kana: "おんがくふぇすてぃばる",
		romaji: "onngakufestibaru",
	},
	{
		jp: "文化祭が近いです",
		kana: "ぶんかさいがちかいです",
		romaji: "bunkassaiigachikaiidesu",
	},
	{
		jp: "アートエキスポです",
		kana: "あーとえきすぽです",
		romaji: "aatoretokisupodess",
	},
	{
		jp: "映画祭の日程を確認",
		kana: "えいがさいのにっていをかくにん",
		romaji: "eigassainnnnnitteiowokakuninnn",
	},
	{
		jp: "展覧会が開催します",
		kana: "てんらんかいがかいさいします",
		romaji: "tenrannkaiigakaisaisshimasu",
	},
	{
		jp: "イベントチケット完売",
		kana: "いべんとちけっとかんばい",
		romaji: "ibenntoticchikettokanbaiide",
	},
	{
		jp: "野外フェスに行きます",
		kana: "のがいふぇすにいきます",
		romaji: "nogaifesunniikimasu",
	},
	{
		jp: "多くの人が参加した",
		kana: "おおくのひとがさんかした",
		romaji: "ookunnohitogasankashita",
	},
	{
		jp: "舞台装置は豪華です",
		kana: "ぶたいそうちはごうかです",
		romaji: "butaisouchihagoukadesu",
	},
	{
		jp: "チャリティー演奏会",
		kana: "ちゃりてぃーえんそうかい",
		romaji: "charitiiensoukai",
	},
	{
		jp: "カラオケに行きました",
		kana: "からおけにいきました",
		romaji: "karaokenniikimashita",
	},
	{
		jp: "声質が素敵です",
		kana: "こえしつがすてきです",
		romaji: "koeshitsuigasutekidesu",
	},
	{
		jp: "歌詞を覚えました",
		kana: "かしをおぼえました",
		romaji: "kashiwoooboemashita",
	},
	{
		jp: "独唱会を開きます",
		kana: "どくしょうかいをひらきます",
		romaji: "dokushougakaiwohirakimasu",
	},
	{
		jp: "ボーカルトレーニング",
		kana: "ぼーかるとれーにんぐ",
		romaji: "bokarutoreeninngu",
	},
	{
		jp: "コーラスは楽しいです",
		kana: "こーらすはたのしいです",
		romaji: "koorasu hatanoshiidesu",
	},
	{
		jp: "喉を大事にします",
		kana: "のどをだいじにします",
		romaji: "nodowodaiijinnishimasu",
	},
	{
		jp: "歌唱力を鍛えます",
		kana: "かしょうりょくをきたえます",
		romaji: "kashougaryokuwokitaemasu",
	},
	{
		jp: "演劇はドラマです",
		kana: "えんげきはどらまです",
		romaji: "engekihadoramadesu",
	},
	{
		jp: "舞台女優は有名です",
		kana: "ぶたいじょゆうはゆうめいです",
		romaji: "butaijoyuuhauyuumeiidesu",
	},
	{
		jp: "脚本を読んでいます",
		kana: "きゃくほんをよんでいます",
		romaji: "kyakuhonnwoyonndeimasu",
	},
	{
		jp: "稽古は大変です",
		kana: "けいこはたいへんです",
		romaji: "keikohhataihenndesu",
	},
	{
		jp: "衣装は華やかです",
		kana: "いしょうははなやかです",
		romaji: "ishouha hanahayakadesu",
	},
	{
		jp: "舞台セットが豪華",
		kana: "ぶたいせったがごうか",
		romaji: "butaisettogagoukaa",
	},
	{
		jp: "詞嘔吐演技は難しい",
		kana: "しょうじょうえんぎはむずかしい",
		romaji: "shoujoenngihamuzkashii",
	},
	{
		jp: "観客の反応が大きい",
		kana: "かんきゃくのはんのうがおおきい",
		romaji: "kankyakunnohannouigaookii",
	},
	{
		jp: "ブレビア劇場を見た",
		kana: "ぶればいあげきじょうをみた",
		romaji: "bubure aiiagekijouowomita",
	},
	{
		jp: "クライマックスは感動",
		kana: "くらいまっくすはかんどう",
		romaji: "kuraimakususuhakanndo",
	},
	{
		jp: "スケッチは基本です",
		kana: "すけっちはきほんです",
		romaji: "suketchihakihonndesu",
	},
	{
		jp: "陰影をつけます",
		kana: "いんえいをつけます",
		romaji: "inneiowottsukemasu",
	},
	{
		jp: "遠近法を学びました",
		kana: "えんきんほうをまなびました",
		romaji: "enkinnnhouowomanabimasita",
	},
	{
		jp: "構図が重要です",
		kana: "こうずがじゅうようです",
		romaji: "kouzuigajuuyouidesu",
	},
	{
		jp: "線描がきれいです",
		kana: "せんびょうがきれいです",
		romaji: "sennbyougakireidesu",
	},
	{
		jp: "濃淡を使い分ける",
		kana: "のうたんをつかいわける",
		romaji: "noutannwottsukaiiwakeru",
	},
	{
		jp: "デッサンは毎日です",
		kana: "でっさんはまいにちです",
		romaji: "dessannhamainichidesu",
	},
	{
		jp: "デッサン力が上がった",
		kana: "でっさんりょくがあがった",
		romaji: "dessannryokuigaagatta",
	},
	{
		jp: "表現方法は様々です",
		kana: "ひょうげんほうほうはようようです",
		romaji: "hyougennhouhouhauyouyoou",
	},
	{
		jp: "色彩感覚は大事です",
		kana: "しょくさいかんかくはだいじです",
		romaji: "shokussaikkankakuhadaijiidesu",
	},
	{
		jp: "クラシック音楽を聞く",
		kana: "くらしっくおんがくをきく",
		romaji: "kurasshikkuonngakuwokiku",
	},
	{
		jp: "ジャズは難しいです",
		kana: "じゃずはむずかしいです",
		romaji: "jazzuhamuzkashiidesu",
	},
	{
		jp: "ロックコンサートです",
		kana: "ろっくこんさーとです",
		romaji: "rokukkonsaatorudesu",
	},
	{
		jp: "ポップスが好きです",
		kana: "ぽっぷすがすきです",
		romaji: "poppusugasukidesu",
	},
	{
		jp: "民族音楽を研究する",
		kana: "みんぞくおんがくをけんきゅうする",
		romaji: "minzokuonngakuwokenkkyuushuru",
	},
	{
		jp: "電子音楽の実験です",
		kana: "でんしおんがくのじっけんです",
		romaji: "dennshhionngakunojikkendesu",
	},
	{
		jp: "音声処理は複雑です",
		kana: "おんせいしょりはふくざつです",
		romaji: "onsseishoriminhasukuzatsuidesu",
	},
	{
		jp: "音波を分析します",
		kana: "おんぱをぶんせきします",
		romaji: "onnpawobunnnsekisshimasu",
	},
	{
		jp: "楽譜を読みました",
		kana: "がくふをよみました",
		romaji: "gakufuwoyomimashita",
	},
	{
		jp: "五線譜は音楽言語",
		kana: "ごせんふはおんがくげんご",
		romaji: "gosennnfuhaonnngakugenngo",
	},
	{
		jp: "作品181です",
		kana: "さくひん181です",
		romaji: "sakuhin181desu",
	},
	{
		jp: "作品182です",
		kana: "さくひん182です",
		romaji: "sakuhin182desu",
	},
	{
		jp: "作品183です",
		kana: "さくひん183です",
		romaji: "sakuhin183desu",
	},
	{
		jp: "作品184です",
		kana: "さくひん184です",
		romaji: "sakuhin184desu",
	},
	{
		jp: "作品185です",
		kana: "さくひん185です",
		romaji: "sakuhin185desu",
	},
	{
		jp: "作品186です",
		kana: "さくひん186です",
		romaji: "sakuhin186desu",
	},
	{
		jp: "作品187です",
		kana: "さくひん187です",
		romaji: "sakuhin187desu",
	},
	{
		jp: "作品188です",
		kana: "さくひん188です",
		romaji: "sakuhin188desu",
	},
	{
		jp: "作品189です",
		kana: "さくひん189です",
		romaji: "sakuhin189desu",
	},
	{
		jp: "作品190です",
		kana: "さくひん190です",
		romaji: "sakuhin190desu",
	},
	{
		jp: "作品191です",
		kana: "さくひん191です",
		romaji: "sakuhin191desu",
	},
	{
		jp: "作品192です",
		kana: "さくひん192です",
		romaji: "sakuhin192desu",
	},
	{
		jp: "作品193です",
		kana: "さくひん193です",
		romaji: "sakuhin193desu",
	},
	{
		jp: "作品194です",
		kana: "さくひん194です",
		romaji: "sakuhin194desu",
	},
	{
		jp: "作品195です",
		kana: "さくひん195です",
		romaji: "sakuhin195desu",
	},
	{
		jp: "作品196です",
		kana: "さくひん196です",
		romaji: "sakuhin196desu",
	},
	{
		jp: "作品197です",
		kana: "さくひん197です",
		romaji: "sakuhin197desu",
	},
	{
		jp: "作品198です",
		kana: "さくひん198です",
		romaji: "sakuhin198desu",
	},
	{
		jp: "作品199です",
		kana: "さくひん199です",
		romaji: "sakuhin199desu",
	},
	{
		jp: "作品200です",
		kana: "さくひん200です",
		romaji: "sakuhin200desu",
	},
	{
		jp: "海が見えます",
		kana: "うみがみえます",
		romaji: "umigamiemashu",
	},
	{
		jp: "波が高いです",
		kana: "なみがたかいです",
		romaji: "namigatakaidesu",
	},
	{
		jp: "砂浜で遊びます",
		kana: "すなはまであそびます",
		romaji: "sunahambadeasoibimasu",
	},
	{
		jp: "塩辛い海風",
		kana: "しおからいうみかぜ",
		romaji: "shiokaraiiumiakaze",
	},
	{
		jp: "海岸線がきれいです",
		kana: "かいがんせんがきれいです",
		romaji: "kaigansengakireideshu",
	},
	{
		jp: "潮が引いています",
		kana: "しおがひいています",
		romaji: "shiogahiiiteimashu",
	},
	{
		jp: "貝殻を拾いました",
		kana: "かいがらをひろいました",
		romaji: "kaigarawohiroimashita",
	},
	{
		jp: "波の音が聞こえます",
		kana: "なみのおとがきこえます",
		romaji: "naminootogakikoemashu",
	},
	{
		jp: "灯台が見えます",
		kana: "とうだいがみえます",
		romaji: "toudaigamiemashu",
	},
	{
		jp: "漁船が出ています",
		kana: "ぎょせんがでています",
		romaji: "gyosengadeiteimashu",
	},
	{
		jp: "泳ぐのが好きです",
		kana: "およぐのがすきです",
		romaji: "oyogunogasukidesu",
	},
	{
		jp: "珊瑚礁が美しいです",
		kana: "さんごしょうがうつくしいです",
		romaji: "sangoshougautsukushiideshu",
	},
	{
		jp: "サーフィンをします",
		kana: "さーふぃんをします",
		romaji: "saafuinwoshimasu",
	},
	{
		jp: "船が沖に出ました",
		kana: "ふねがおきにでました",
		romaji: "funegaokinidemashita",
	},
	{
		jp: "海鮮が新鮮です",
		kana: "かいせんがしんせんです",
		romaji: "kaisengashinsendeshu",
	},
	{
		jp: "浜辺を歩きます",
		kana: "はまべをあるきます",
		romaji: "hamabewoarukimasu",
	},
	{
		jp: "山が高いです",
		kana: "やまがたかいです",
		romaji: "yamagatakaidesu",
	},
	{
		jp: "山頂から見えます",
		kana: "さんちょうからみえます",
		romaji: "sanchoukaramiemashu",
	},
	{
		jp: "登山をしました",
		kana: "とうざんをしました",
		romaji: "touzanwoshimashita",
	},
	{
		jp: "森が深いです",
		kana: "もりがふかいです",
		romaji: "moriagafukaidesu",
	},
	{
		jp: "紅葉がきれいです",
		kana: "こうようがきれいです",
		romaji: "kouyougakireideshu",
	},
	{
		jp: "雲が山を隠しています",
		kana: "くもがやまをかくしています",
		romaji: "kumogayamawokakushiteimashu",
	},
	{
		jp: "峰々が連なっています",
		kana: "みねみねがつらなっています",
		romaji: "mineminegatsuranateteimashu",
	},
	{
		jp: "岩場は危ないです",
		kana: "いわばはあぶないです",
		romaji: "iwabahaabunaidesu",
	},
	{
		jp: "渓谷が美しいです",
		kana: "けいこくがうつくしいです",
		romaji: "keikoakugautsukushiideshu",
	},
	{
		jp: "雪が積もっています",
		kana: "ゆきがつもっています",
		romaji: "yukigatsumotteimashu",
	},
	{
		jp: "滝が落ちています",
		kana: "たきがおちています",
		romaji: "takigaochiteimashu",
	},
	{
		jp: "湖が光っています",
		kana: "こがひかっています",
		romaji: "kogahikatteimashu",
	},
	{
		jp: "山小屋に泊まります",
		kana: "やまごやにとまります",
		romaji: "yamagoyanitomarimasu",
	},
	{
		jp: "斜面が急です",
		kana: "しゃめんがきゅうです",
		romaji: "shamengakyuudeshu",
	},
	{
		jp: "高山植物が咲いています",
		kana: "こうざんしょくぶつがさいています",
		romaji: "kouzanshokubatsugasaiteimashu",
	},
	{
		jp: "山道を歩きます",
		kana: "やまみちをあるきます",
		romaji: "yamamichiwoarukimasu",
	},
	{
		jp: "崖が見えます",
		kana: "がけがみえます",
		romaji: "gakegamiemashu",
	},
	{
		jp: "朝焼けが美しいです",
		kana: "あさやけがうつくしいです",
		romaji: "asayakegautsukushiideshu",
	},
	{
		jp: "空が青いです",
		kana: "そらがあおいです",
		romaji: "soragaаaoidesu",
	},
	{
		jp: "星がきれいです",
		kana: "ほしがきれいです",
		romaji: "hoshigakireideshu",
	},
	{
		jp: "雨が降っています",
		kana: "あめがふっています",
		romaji: "amegafutteimashu",
	},
	{
		jp: "虹が出ました",
		kana: "にじがでました",
		romaji: "nijigademasita",
	},
	{
		jp: "川が流れています",
		kana: "かわがながれています",
		romaji: "kawaganagareteimashu",
	},
	{
		jp: "花が咲いています",
		kana: "はながさいています",
		romaji: "hanagasaiteimashu",
	},
	{
		jp: "草原が広がっています",
		kana: "そうげんがひろがっています",
		romaji: "sougenagahirogareteimashu",
	},
	{
		jp: "太陽が沈みます",
		kana: "たいようがしずみます",
		romaji: "taiyougashizumimasu",
	},
	{
		jp: "月が出ました",
		kana: "つきがでました",
		romaji: "tsukigademasita",
	},
	{
		jp: "夜空が暗いです",
		kana: "よぞらがくらいです",
		romaji: "yozoragakuraideshu",
	},
	{
		jp: "風が強いです",
		kana: "かぜがつよいです",
		romaji: "kazegatsuyoidesu",
	},
	{
		jp: "霧が立ち込めています",
		kana: "きりがたちこめています",
		romaji: "kirigatachikomeiteimashu",
	},
	{
		jp: "景色が変わります",
		kana: "けしきがかわります",
		romaji: "keshikigakawarimasu",
	},
	{
		jp: "自然が素晴らしいです",
		kana: "しぜんがすばらしいです",
		romaji: "shizenagasubarasiideshu",
	},
	{
		jp: "季節が変わりました",
		kana: "きせつがかわりました",
		romaji: "kisetsuagakawarimashita",
	},
	{
		jp: "秋が来ました",
		kana: "あきがきました",
		romaji: "akigakimasita",
	},
	{
		jp: "夏は暑いです",
		kana: "なつはあついです",
		romaji: "natsuhaatsuidesu",
	},
	{
		jp: "冬は寒いです",
		kana: "ふゆはさむいです",
		romaji: "fuyuhasamuidesu",
	},
	{
		jp: "朝日が昇ります",
		kana: "あさひがのぼります",
		romaji: "asahiganoborimasu",
	},
	{
		jp: "夕焼けが美しいです",
		kana: "ゆうやけがうつくしいです",
		romaji: "yuuyakegautsukushiideshu",
	},
	{
		jp: "夜明けが近づいています",
		kana: "よあけがちかづいています",
		romaji: "yoakegachikaduiteimashu",
	},
	{
		jp: "山と海が見えます",
		kana: "やまとうみがみえます",
		romaji: "yamatoumigamiemashu",
	},
	{
		jp: "山から海が見えます",
		kana: "やまからうみがみえます",
		romaji: "yamakaraumigamiemashu",
	},
	{
		jp: "渓谷の水が清らかです",
		kana: "けいこくのみずがきよらかです",
		romaji: "keikokunomizugakiyorakadeshu",
	},
	{
		jp: "湖畔の景色がいいです",
		kana: "こはんのけしきがいいです",
		romaji: "kohannokeshikigaiidesu",
	},
	{
		jp: "滝の音がします",
		kana: "たきのおとがします",
		romaji: "takinootogashimasu",
	},
	{
		jp: "泉が涌いています",
		kana: "いずみがわいています",
		romaji: "izumigawaiteimashu",
	},
	{
		jp: "渓流が美しいです",
		kana: "けいりゅうがうつくしいです",
		romaji: "keiryuugautsukushiideshu",
	},
	{
		jp: "風景が素晴らしいです",
		kana: "ふうけいがすばらしいです",
		romaji: "fuukeigasubarasiideshu",
	},
	{
		jp: "潮風が気持ちいいです",
		kana: "しおかぜがきもちいいです",
		romaji: "shiokazegakimochiiidesu",
	},
	{
		jp: "海が静かです",
		kana: "うみがしずかです",
		romaji: "umigashizukadeshu",
	},
	{
		jp: "波が穏やかです",
		kana: "なみがおだやかです",
		romaji: "namiagaodayakadeshu",
	},
	{
		jp: "海の色が変わります",
		kana: "うみのいろがかわります",
		romaji: "uminoirogakawarimasu",
	},
	{
		jp: "波打ち際が好きです",
		kana: "なみうちぎわがすきです",
		romaji: "namiuchigiwagasukidesu",
	},
	{
		jp: "砂を掘ります",
		kana: "すなをほります",
		romaji: "sunawohorimashu",
	},
	{
		jp: "貝を集めます",
		kana: "かいをあつめます",
		romaji: "kaiwoatsumemasu",
	},
	{
		jp: "海の幸が豊富です",
		kana: "うみのさちがほうふです",
		romaji: "uminosachigahoufudeshu",
	},
	{
		jp: "漁村が静かです",
		kana: "ぎょそんがしずかです",
		romaji: "gyosongashizukadeshu",
	},
	{
		jp: "港が賑わっています",
		kana: "みなとがにぎわっています",
		romaji: "minatoganigiwatteimashu",
	},
	{
		jp: "防波堤が長いです",
		kana: "ぼうはていがながいです",
		romaji: "bouhateiganagaiidesu",
	},
	{
		jp: "磯遊びができます",
		kana: "いそあそびができます",
		romaji: "isoasoibigadekinashu",
	},
	{
		jp: "海の生き物が好きです",
		kana: "うみのいきものがすきです",
		romaji: "uminoikimonogasukidesu",
	},
	{
		jp: "山歩きが大好きです",
		kana: "やまあるきがだいすきです",
		romaji: "yamaarukigidaisukidesu",
	},
	{
		jp: "峰が連なっています",
		kana: "みねがつらなっています",
		romaji: "minegatsuranateteimashu",
	},
	{
		jp: "稜線が美しいです",
		kana: "りょうせんがうつくしいです",
		romaji: "ryousengautsukushiideshu",
	},
	{
		jp: "谷が深いです",
		kana: "たにがふかいです",
		romaji: "tanigafukaidesu",
	},
	{
		jp: "尾根を歩きます",
		kana: "おねをあるきます",
		romaji: "onewoarukimasu",
	},
	{
		jp: "登山道が整備されています",
		kana: "とうざんどうがせいびされています",
		romaji: "touzandouagaseibisareteimashu",
	},
	{
		jp: "頂上に到着しました",
		kana: "ちょうじょうにとうちゃくしました",
		romaji: "choujouniтouchakushimasita",
	},
	{
		jp: "絶景が見えます",
		kana: "ぜっけいがみえます",
		romaji: "zekkeigamiemashu",
	},
	{
		jp: "雲海が広がっています",
		kana: "くもうみがひろがっています",
		romaji: "kumoumiagahirogareteimashu",
	},
	{
		jp: "眺望が素晴らしいです",
		kana: "ちょうぼうがすばらしいです",
		romaji: "choubouagasubarasiideshu",
	},
	{
		jp: "四季折々の美しさ",
		kana: "しきおりおりのうつくしさ",
		romaji: "shikioriorinoushukushisa",
	},
	{
		jp: "野鳥が鳴いています",
		kana: "やちょうがないています",
		romaji: "yachouganaiteimashu",
	},
	{
		jp: "蝶々が飛んでいます",
		kana: "ちょうちょうがとんでいます",
		romaji: "chouchougatondeimashu",
	},
	{
		jp: "野花が咲いています",
		kana: "のはながさいています",
		romaji: "nohanagasaiteimashu",
	},
	{
		jp: "草木が茂っています",
		kana: "くさきがしげっています",
		romaji: "kusakigashigetteimashu",
	},
	{
		jp: "苔が生えています",
		kana: "こけがはえています",
		romaji: "kokeagahaeteimashu",
	},
	{
		jp: "樹液が出ています",
		kana: "じゅえきがでています",
		romaji: "juekigadeiteimashu",
	},
	{
		jp: "枝が伸びています",
		kana: "えだがのびています",
		romaji: "edaganobiteiteimashu",
	},
	{
		jp: "葉が緑です",
		kana: "はがみどりです",
		romaji: "hagamidorideshu",
	},
	{
		jp: "落ち葉がいっぱいです",
		kana: "おちばがいっぱいです",
		romaji: "ochibagaippaiidesu",
	},
	{
		jp: "枯れ木が立っています",
		kana: "かれきがたっています",
		romaji: "karekigatteimashu",
	},
	{
		jp: "倒木が横たわっています",
		kana: "とうぼくがよこたわっています",
		romaji: "toubokugayokotawatteimashu",
	},
	{
		jp: "渡り鳥が来ます",
		kana: "わたりどりがきます",
		romaji: "wataridoriagakimashu",
	},
	{
		jp: "砂利道を歩きます",
		kana: "じゃりみちをあるきます",
		romaji: "jarimichiwoarukimasu",
	},
	{
		jp: "流れが速いです",
		kana: "ながれがはやいです",
		romaji: "nagaregahayaiidesu",
	},
	{
		jp: "音が響き渡ります",
		kana: "おとがひびきわたります",
		romaji: "otoagahibiki watarimashu",
	},
	{
		jp: "空気が澄んでいます",
		kana: "くうきがすんでいます",
		romaji: "kuukigasundeimashu",
	},
	{
		jp: "湿度が高いです",
		kana: "しつどがたかいです",
		romaji: "shitsudogatakaidesu",
	},
	{
		jp: "天気が崩れています",
		kana: "てんきがくずれています",
		romaji: "tenkigakuzureteimashu",
	},
	{
		jp: "晴れ間が見えます",
		kana: "はれまがみえます",
		romaji: "haremagamiemashu",
	},
	{
		jp: "雨の音が聞こえます",
		kana: "あめのおとがきこえます",
		romaji: "ameno otogakikoemashu",
	},
	{
		jp: "雪が静かに降ります",
		kana: "ゆきがしずかにふります",
		romaji: "yukigashizukanifurimashu",
	},
	{
		jp: "霜が降りました",
		kana: "しもがふりました",
		romaji: "shimogafurimasita",
	},
	{
		jp: "露が輝いています",
		kana: "つゆがかがやいています",
		romaji: "tsuyugakagayaiteimashu",
	},
	{
		jp: "虹がかかっています",
		kana: "にじがかかっています",
		romaji: "nijigakakatteimashu",
	},
	{
		jp: "景観が素晴らしいです",
		kana: "けいかんがすばらしいです",
		romaji: "keikangasubarasiideshu",
	},
	{
		jp: "視界が良好です",
		kana: "しかいがりょうこうです",
		romaji: "shikaigaryoukodeshu",
	},
	{
		jp: "地平線が見えます",
		kana: "ちへいせんがみえます",
		romaji: "chiheisengamiemashu",
	},
	{
		jp: "水平線が見えます",
		kana: "すいへいせんがみえます",
		romaji: "suiheisengamiemashu",
	},
	{
		jp: "緑が増えます",
		kana: "みどりがふえます",
		romaji: "midoriagafuemashu",
	},
	{
		jp: "風景を眺めます",
		kana: "ふうけいをながめます",
		romaji: "fuukeiwonagamemasu",
	},
	{
		jp: "峠を越えます",
		kana: "とうげをこえます",
		romaji: "tougewokoemasu",
	},
	{
		jp: "野生動物がいます",
		kana: "やせいどうぶつがいます",
		romaji: "yaseidoubutsuagaimashu",
	},
	{
		jp: "選挙の日程が決まった",
		kana: "せんきょのにっていきまった",
		romaji: "senkyonotetteikireteita",
	},
	{
		jp: "政治家が新しい法案を提案した",
		kana: "せいじかがあたらしいほうあんをていあんした",
		romaji: "seijikagaatarashiihōanwoteianshita",
	},
	{
		jp: "首相が演説を行った",
		kana: "しゅしょうがえんせつをおこなった",
		romaji: "shushōgaensetsuwookonatta",
	},
	{
		jp: "国会で議論が白熱した",
		kana: "こっかいぎろんがはくねつした",
		romaji: "kokkaigironguhakuetsushita",
	},
	{
		jp: "野党が反対票を投じた",
		kana: "やとうがはんたいひょうをとうじた",
		romaji: "yatōgahantaihyōwotōjita",
	},
	{
		jp: "新しい税制改革が可決された",
		kana: "あたらしいぜいせいかいかくがかけつされた",
		romaji: "atarashiizeiseikaigakuuakaketsusareta",
	},
	{
		jp: "環境問題への取り組みが加速した",
		kana: "かんきょうもんだいへのとりくみがかそくした",
		romaji: "kankyōmondaihenotorukumigakasokushita",
	},
	{
		jp: "労働組合が賃上げを要求した",
		kana: "ろうどうくみあいがちんあげをようきゅうした",
		romaji: "rōdōkumiaiigachinagewouyōkyūshita",
	},
	{
		jp: "景気回復の兆しが見えた",
		kana: "けいきかいふくのきざしがみえた",
		romaji: "keikikaifu kukunokizashigamieta",
	},
	{
		jp: "失業率が低下した",
		kana: "しつぎょうりつがていかした",
		romaji: "shitsugyōritsugateikashita",
	},
	{
		jp: "物価上昇の影響が深刻だ",
		kana: "ぶっかじょうしょうのえいきょうがしんこくだ",
		romaji: "bukkajōshōnoeikkyōgashinkokuda",
	},
	{
		jp: "貧困問題が深まっている",
		kana: "ひんこんもんだいがふかまっている",
		romaji: "hinkōmondaigafukamatteiro",
	},
	{
		jp: "医療改革が議論の焦点だ",
		kana: "いりょうかいかくぎろんのしょうてんだ",
		romaji: "iryōkaigakugirongushōtenda",
	},
	{
		jp: "教育費の削減に反発がある",
		kana: "きょういくひのさくげんにはんぱつがある",
		romaji: "kyōikuhisakugennihanpatsuguaru",
	},
	{
		jp: "防災対策が重視されている",
		kana: "ぼうさいたいさくがじゅうしされている",
		romaji: "bōsaitaisak ugajuushisaretero",
	},
	{
		jp: "エネルギー政策が転換した",
		kana: "えねるぎーせいさくがてんかんした",
		romaji: "enerugīseisakugatenkans hita",
	},
	{
		jp: "安全保障が国防の課題だ",
		kana: "あんぜんほしょうがこくぼうのかだいだ",
		romaji: "anzenhosh ōgakokubōnokadaida",
	},
	{
		jp: "外交交渉が妥結した",
		kana: "がいこうこうしょうがだけつした",
		romaji: "gaikōkōshōgadaketsushita",
	},
	{
		jp: "貿易摩擦が緊張を高めた",
		kana: "ぼうえきまさつがきんちょうをたかめた",
		romaji: "bōekimasatsuugakinchōwotakameta",
	},
	{
		jp: "難民問題が国際的課題だ",
		kana: "なんみんもんだいがこくさいてきかだいだ",
		romaji: "nanminmondaigakokusaiteki kadaida",
	},
	{
		jp: "人権侵害の訴訟が起きた",
		kana: "じんけんしんがいのそしょうがおきた",
		romaji: "jinkenshinogainososh ōgaokita",
	},
	{
		jp: "差別問題への対策が急務だ",
		kana: "さべつもんだいへのたいさくがきゅうむだ",
		romaji: "sabetsumondaihenotaisak ugakyūmuda",
	},
	{
		jp: "移民政策が議論を呼んだ",
		kana: "いみんせいさくぎろんをよんだ",
		romaji: "iminseisakugirongiwoyonda",
	},
	{
		jp: "ジェンダー平等が推進される",
		kana: "じぇんだーびょうどうがすいしんされる",
		romaji: "jendābyōdōgasuishinsa reru",
	},
	{
		jp: "高齢化社会への対応が課題",
		kana: "こうれいかしゃかいへのたいおうがかだい",
		romaji: "kōreikashakaihenotaiōgakadai",
	},
	{
		jp: "少子化が深刻な問題だ",
		kana: "しょうしかがしんこくなもんだいだ",
		romaji: "shōshikagashinkokun amond aida",
	},
	{
		jp: "地方創生プランが発表された",
		kana: "ちほうそうせいぷらんがはっぴょうされた",
		romaji: "chihōsōseipuranguahappy ōsareta",
	},
	{
		jp: "農業振興政策が強化された",
		kana: "のうぎょうしんこうせいさくがきょうかされた",
		romaji: "nōgyōshinkōseisaku gakyōkasareta",
	},
	{
		jp: "漁業資源の枯渇が問題視されている",
		kana: "ぎょぎょうしげんのこかつがもんだいしされている",
		romaji: "gyogyōshigennokok atsugamondaishisaretero",
	},
	{
		jp: "森林保護が緊急課題だ",
		kana: "しんりんほごがきんきゅうかだいだ",
		romaji: "shinrinhogukinkyūkadai da",
	},
	{
		jp: "水資源管理が国家戦略だ",
		kana: "みずしげんかんりがこっかせんりゃくだ",
		romaji: "mizushigenkanrigakokkasen ryakuda",
	},
	{
		jp: "再生可能エネルギーの推進",
		kana: "さいせいかのうえねるぎーのすいしん",
		romaji: "saiseikanōenergīnos uishin",
	},
	{
		jp: "ゼロカーボンの実現目標",
		kana: "ぜろかーぼんのじつげんもくひょう",
		romaji: "zerokābonno jitsugenm okuhy ō",
	},
	{
		jp: "大気汚染対策が強化される",
		kana: "たいきおせんたいさくがきょうかされる",
		romaji: "taikioseñtaisaku gakyōkasareru",
	},
	{
		jp: "廃棄物処理の問題が指摘された",
		kana: "はいきぶつしょりのもんだいがしてきされた",
		romaji: "haikibut suushorinnomondai gashitekisareta",
	},
	{
		jp: "都市計画が見直されている",
		kana: "としけいかくがみなおされている",
		romaji: "toshikeikakugaminaosar etero",
	},
	{
		jp: "交通渋滞の緩和策が導入された",
		kana: "こうつうじゅたいのかんわさくがどうにゅうされた",
		romaji: "kōtsūjutainok anwasaku gadōnyūsareta",
	},
	{
		jp: "公共交通の整備が進められる",
		kana: "こうきょうこうつうのせいびがすすめられる",
		romaji: "kōkyōkōtsūnos eibigasusumer areru",
	},
	{
		jp: "住宅問題が社会的課題だ",
		kana: "じゅうたくもんだいがしゃかいてきかだいだ",
		romaji: "jūt akumondaigashakaiteki kadaida",
	},
	{
		jp: "不動産価格が急上昇した",
		kana: "ふどうさんかかくがきゅうじょうしょうした",
		romaji: "fudōsan kakakugakyūjōsh ōshita",
	},
	{
		jp: "地震対策の強化が急務",
		kana: "じしんたいさくのきょうかがきゅうむ",
		romaji: "jishintaisaku nokyōkagakyūmu",
	},
	{
		jp: "台風被害が大きかった",
		kana: "たいふうひがいがおおきかった",
		romaji: "taifūhigaigaōkikatta",
	},
	{
		jp: "洪水対策に予算が増加した",
		kana: "こうずいたいさくによさんがぞうかした",
		romaji: "kōzuitaisak unyosangaζōkashita",
	},
	{
		jp: "火災予防が最重要課題",
		kana: "かさいよぼうがさいじゅうようかだい",
		romaji: "kasaiyobōgasaijūy ōkadai",
	},
	{
		jp: "犯罪防止対策が進んでいる",
		kana: "はんざいぼうしたいさくがすすんでいる",
		romaji: "hanzaibōshitaisak ugas usundero",
	},
	{
		jp: "詐欺事件が相次いでいる",
		kana: "さぎじけんがあいついでいる",
		romaji: "sagijikengaaitsuidero",
	},
	{
		jp: "麻薬取締が強化されている",
		kana: "まやくとりしまりがきょうかされている",
		romaji: "mayakutorish imarigakyōkasaretero",
	},
	{
		jp: "交通事故が減少傾向にある",
		kana: "こうつうじこがげんしょうけいこうにある",
		romaji: "kōtsūjikogagensh ōkeikōniaru",
	},
	{
		jp: "児童虐待防止が喫緊の課題",
		kana: "じどうぎゃくたいぼうしがきっきんのかだい",
		romaji: "jidōgyakutaibōsh igakikkinno kadai",
	},
	{
		jp: "学校いじめ問題が社会問題だ",
		kana: "がっこういじめもんだいがしゃかいもんだいだ",
		romaji: "gakkōijimemondaigashakaimondaida",
	},
	{
		jp: "シングルマザーの支援制度",
		kana: "しんぐるまざーのしえんせいど",
		romaji: "shingurumozānosh ienseido",
	},
	{
		jp: "障害者雇用の推進が進む",
		kana: "しょうがいしゃこようのすいしんがすすむ",
		romaji: "shōgaishakoyōnos uishingasusumuː",
	},
	{
		jp: "介護職の処遇改善が急務",
		kana: "かいごしょくのしょぐうかいぜんがきゅうむ",
		romaji: "kaigosh oku nosh oguukaizen gaky ūmu",
	},
	{
		jp: "年金制度の改革が急がれる",
		kana: "ねんきんせいどのかいかくがいそがれる",
		romaji: "nenkinseido nokaikakugaisog areru",
	},
	{
		jp: "医療費の増加が問題視される",
		kana: "いりょうひのぞうかがもんだいしされる",
		romaji: "iryōhizō ugamond aishisareru",
	},
	{
		jp: "処方箋の改革が進められる",
		kana: "しょほうせんのかいかくがすすめられる",
		romaji: "shohōsennokaikakugasusume rareru",
	},
	{
		jp: "ジェネリック医薬品の推奨",
		kana: "じぇねりっくいやくひんのすいしょう",
		romaji: "jenerikkuiyakuhinnos uishō",
	},
	{
		jp: "感染症対策が最優先",
		kana: "かんせんしょうたいさくがさいゆうせん",
		romaji: "kansensh ōtaisakugasaiyūsen",
	},
	{
		jp: "予防接種キャンペーンが展開される",
		kana: "よぼうせっしゅきゃんぺーんがてんかいされる",
		romaji: "yobōsesshu kyañpēngatenkaisa retu",
	},
	{
		jp: "食品衛生基準が強化される",
		kana: "しょくひんえいせいきじゅんがきょうかされる",
		romaji: "shokuhineiseik ijungakyōkasaretu",
	},
	{
		jp: "食物アレルギー対策が進む",
		kana: "しょくもつあれるぎーたいさくがすすむ",
		romaji: "shokumotsuareurgītaisak ugasusumu",
	},
	{
		jp: "動物愛護法が改正された",
		kana: "どうぶつあいごほうがかいせいされた",
		romaji: "dōbutsuaigohōgakaiseis areta",
	},
	{
		jp: "ペット規制が強化されている",
		kana: "ぺっときせいがきょうかされている",
		romaji: "pettokiseigakyōkasaretero",
	},
	{
		jp: "野生動物保護が重視されている",
		kana: "やせいどうぶつほごがじゅうしされている",
		romaji: "yaseidōbutsuhoguijuushisaretero",
	},
	{
		jp: "絶滅危惧種の保護活動",
		kana: "ぜつめつきぐしゅのほごかつどう",
		romaji: "zetsumetsukirush unohogokatsudō",
	},
	{
		jp: "外来生物の駆除が課題",
		kana: "がいらいせいぶつのくじょがかだい",
		romaji: "gairaiseibutsun okujogakadai",
	},
	{
		jp: "砂漠化防止が急務である",
		kana: "さばくかぼうしがきゅうむである",
		romaji: "sabakukaboushigaky ūmudearua",
	},
	{
		jp: "サンゴ礁保護が重要課題",
		kana: "さんごしょうほごがじゅうようかだい",
		romaji: "sangosh ōhoguijuuyō kadai",
	},
	{
		jp: "海洋汚染の実態調査",
		kana: "かいようおせんのじったいちょうさ",
		romaji: "kaiyōoseñ nojittaic hōsa",
	},
	{
		jp: "クジラ漁業の規制論争",
		kana: "くじらぎょぎょうのきせいろんそう",
		romaji: "kujiragogy ōnokiseiron sō",
	},
	{
		jp: "環境条約の批准が進む",
		kana: "かんきょうじょうやくのひじゅんがすすむ",
		romaji: "kankyōjōyakun ohijungasusumu",
	},
	{
		jp: "脱炭素化計画が発表された",
		kana: "だつたんそかかくえいがはっぴょうされた",
		romaji: "datsutans okakakueigahappy ōsareta",
	},
	{
		jp: "太陽光発電の導入が加速",
		kana: "たいようこうはつでんのどうにゅうがかそく",
		romaji: "taiyōkōhatsudenno dōnyūgakasok u",
	},
	{
		jp: "風力発電計画が進んでいる",
		kana: "ふうりょくはつでんけいかくがすすんでいる",
		romaji: "fūryokuh atsudenkeikakugasusundenro",
	},
	{
		jp: "原子力発電所の運営問題",
		kana: "げんしりょくはつでんしょのうんえいもんだい",
		romaji: "genshiryoku hatsudenshonoune imond ai",
	},
	{
		jp: "放射性廃棄物処理が課題",
		kana: "ほうしゃせいはいきぶつしょりがかだい",
		romaji: "hōshaseihaikib utshorigakadai",
	},
	{
		jp: "電力供給の安定化が重要",
		kana: "でんりょくきょうきゅうのあんていかがじゅうよう",
		romaji: "denryoku kyōkyūnoanteikaijuuy ō",
	},
	{
		jp: "スマートグリッドの構築",
		kana: "すまーとぐりっどのこうちく",
		romaji: "sumātoguriddonokōchiku",
	},
	{
		jp: "電気自動車の普及促進",
		kana: "でんきじどうしゃのふきゅうそくしん",
		romaji: "denki jidōshanofukyūsokushin",
	},
	{
		jp: "公共充電施設の整備",
		kana: "こうきょうじゅうでんしせつのせいび",
		romaji: "kōkyōjuūden shisetsunos eib i",
	},
	{
		jp: "建築物の省エネ基準",
		kana: "けんちくぶつのしょうえねきじゅん",
		romaji: "kenchikubutsunosh ōenekijun",
	},
	{
		jp: "都市緑化推進が活発だ",
		kana: "としりょくかすいしんがかっぱつだ",
		romaji: "toshi ryokka suishin gakappatsuda",
	},
	{
		jp: "公園整備が進められている",
		kana: "こうえんせいびがすすめられている",
		romaji: "kōen seibigasusume raretetero",
	},
	{
		jp: "河川改修工事が実施される",
		kana: "かせんかいしゅうこうじがじっしされる",
		romaji: "kaseñ kaishūkōjigajissisareru",
	},
	{
		jp: "道路交通網の充実化",
		kana: "どうろこうつうもうのじゅうじつか",
		romaji: "dōrokōtsūmōnojuujitsuka",
	},
	{
		jp: "鉄道網拡張計画が進む",
		kana: "てつどうもうかくちょうけいかくがすすむ",
		romaji: "tetsudōmōkakuchōkeikakugasusumu",
	},
	{
		jp: "新幹線新規路線の計画",
		kana: "しんかんせんしんきろせんのけいかく",
		romaji: "shink ansensh inkirosenno keikak u",
	},
	{
		jp: "バス路線の再編成が進む",
		kana: "ばすろせんのさいへんせいがすすむ",
		romaji: "basuroseñnos aihensei gasusumu",
	},
	{
		jp: "自転車道の整備が加速",
		kana: "じてんしゃどうのせいびがかそく",
		romaji: "jitenshadōno seibigakasok u",
	},
	{
		jp: "歩行者安全対策が強化される",
		kana: "ほこうしゃあんぜんたいさくがきょうかされる",
		romaji: "hokōshaanzen taisaku gakyōkasaretu",
	},
	{
		jp: "自動運転技術の研究開発",
		kana: "じどうんてんぎじゅつのけんきゅうかいはつ",
		romaji: "jidō unten gijutsu nokenkyu kaihatsу",
	},
	{
		jp: "ドローン規制が議論されている",
		kana: "どろーんきせいぎろんされている",
		romaji: "dorōn kiseigiroñ saretero",
	},
	{
		jp: "人工知能倫理ガイドラインが策定",
		kana: "じんこうちのうりんりがいどらいんがさくてい",
		romaji: "jinkou chinōrinriigaidoraingas akt ei",
	},
	{
		jp: "個人情報保護法が改正された",
		kana: "こじんじょうほうほごほうがかいせいされた",
		romaji: "kojin jōhōhoguohōgakaiseis areta",
	},
	{
		jp: "サイバーセキュリティ強化",
		kana: "さいばーせきゅりてぃきょうか",
		romaji: "saibās ekyuritikkyōka",
	},
	{
		jp: "データ流出事件が相次ぐ",
		kana: "でーたりゅうしゅつじけんがあいついぐ",
		romaji: "dēta ryūs hutsuji kenaitsatsugu",
	},
	{
		jp: "フェイクニュース対策が進む",
		kana: "ふぇいくにゅーすたいさくがすすむ",
		romaji: "feikunyūsutaisak ugasusumu",
	},
	{
		jp: "言論の自由が議論の焦点",
		kana: "げんろんのじゆうぎろんのしょうてん",
		romaji: "genron nojiyūgiron nosh ōten",
	},
	{
		jp: "表現の自由が憲法課題",
		kana: "ひょうげんのじゆうがけんぽうかだい",
		romaji: "hyōgen nojiyūgakenp ōkadai",
	},
	{
		jp: "マスメディア改革が必要",
		kana: "ますめでぃあかいかくがひつよう",
		romaji: "masumediakaik akugahitsuyō",
	},
	{
		jp: "新聞業界の経営危機",
		kana: "しんぶんぎょうかいのけいえいきき",
		romaji: "shimbun gyō kaino keiei kiki",
	},
	{
		jp: "放送料金の値上げが検討",
		kana: "ほうそうりょうきんのねあげがけんとう",
		romaji: "hōsō ryōkinno neagegarentō",
	},
	{
		jp: "デジタル化推進が急務",
		kana: "でじたるかすいしんがきゅうむ",
		romaji: "dejitaruka suishin gaky ūmu",
	},
	{
		jp: "キャッシュレス決済の促進",
		kana: "きゃっしゅれすけっさいのそくしん",
		romaji: "kyasshuressukessaino sokushin",
	},
	{
		jp: "電子マネー普及が進んだ",
		kana: "でんしまねーふきゅうがすすんだ",
		romaji: "denshi manēfu kyūgasusunda",
	},
	{
		jp: "仮想通貨規制が強化される",
		kana: "かそうつうかきせいがきょうかされる",
		romaji: "kasō tsūkakiseigakyōkasaretu",
	},
	{
		jp: "ブロックチェーン技術の応用",
		kana: "ぶろっくちぇーんぎじゅつのおうよう",
		romaji: "burokuチェーn gijutsuno ōy ō",
	},
	{
		jp: "金融規制の改革が進む",
		kana: "きんゆうきせいのかいかくがすすむ",
		romaji: "kinyū kiseino kaik akugasusumu",
	},
	{
		jp: "銀行統合が相次いだ",
		kana: "ぎんこうとうごうがあいついだ",
		romaji: "ginkō tōgōgaai tsuida",
	},
	{
		jp: "地域経済活性化が課題",
		kana: "ちいきけいざいかっせいかがかだい",
		romaji: "chiiki keizai kasseika gakadai",
	},
	{
		jp: "商店街再生プランが発表",
		kana: "しょうてんがいさいせいぷらんがはっぴょう",
		romaji: "shōtengai saisei purañ gahappy ō",
	},
	{
		jp: "中小企業支援が強化された",
		kana: "ちゅうしょうきぎょうしえんがきょうかされた",
		romaji: "chūshō kiggyō shien gakyōkasareta",
	},
	{
		jp: "起業家育成制度が拡充",
		kana: "きぎょうかいくせいせいどがかくじゅう",
		romaji: "kigyōka iikuseiseido gakakujū",
	},
	{
		jp: "ベンチャー企業育成支援",
		kana: "べんちゃーきぎょういくせいしえん",
		romaji: "bencha kiggyō ikusei shien",
	},
	{
		jp: "研究開発投資が増加した",
		kana: "けんきゅうかいはつとうしがぞうかした",
		romaji: "kenkyu kaihatsutōshi gazōkashita",
	},
	{
		jp: "大学と産業の連携強化",
		kana: "だいがくとさんぎょうのれんけいきょうか",
		romaji: "daigakutosan gyōno renkeik yōka",
	},
	{
		jp: "科学技術戦略が重視される",
		kana: "かがくぎじゅつせんりゃくがじゅうしされる",
		romaji: "kagaku gijutsus enryakugajuushisaretu",
	},
	{
		jp: "宇宙開発計画が推進される",
		kana: "うちゅうかいはつけいかくがすいしんされる",
		romaji: "uchū kaihatsukei kakugasuishinsa retu",
	},
	{
		jp: "医療技術の革新が加速",
		kana: "いりょうぎじゅつのかくしんがかそく",
		romaji: "iryō gijutsuno kakushin gakasok u",
	},
	{
		jp: "ゲノム医療の実用化が進む",
		kana: "げのむいりょうのじつようかがすすむ",
		romaji: "genomu iryōno jitsuyōkagasusumu",
	},
	{
		jp: "再生医療の研究が加速",
		kana: "さいせいいりょうのけんきゅうがかそく",
		romaji: "saiseii ryōno kenkyu gagasok u",
	},
	{
		jp: "臓器移植法が改正された",
		kana: "ぞうきいしょくほうがかいせいされた",
		romaji: "zōki ish okuhōgakaiseis areta",
	},
	{
		jp: "献血協力が重視されている",
		kana: "けんけつきょうりょくがじゅうしされている",
		romaji: "kenketsu kyōryokugajuushisaretero",
	},
	{
		jp: "精神保健福祉が重要課題",
		kana: "せいしんほけんふくしがじゅうようかだい",
		romaji: "seishin hokeñ fukushigajuuyōkadai",
	},
	{
		jp: "うつ病対策が急務である",
		kana: "うつびょうたいさくがきゅうむである",
		romaji: "utsubyo taisak ugyakyūmudearua",
	},
	{
		jp: "自殺防止対策が強化される",
		kana: "じさつぼうしたいさくがきょうかされる",
		romaji: "jisatsuboushi taisaku gakyōkasaretu",
	},
	{
		jp: "アルコール対策が進められる",
		kana: "あるこーるたいさくがすすめられる",
		romaji: "arukōru taisak ugasusume raretu",
	},
	{
		jp: "喫煙対策の強化が加速",
		kana: "きつえんたいさくのきょうかがかそく",
		romaji: "kitsuen taisaku nokyōkagakasok u",
	},
	{
		jp: "受動喫煙対策が推進される",
		kana: "じゅどうきつえんたいさくがすいしんされる",
		romaji: "judō kitsuen taisaku gasuishinsa retu",
	},
	{
		jp: "スポーツ振興が重視されている",
		kana: "すぽーつしんこうがじゅうしされている",
		romaji: "supōtsu shinkōgajuushisaretero",
	},
	{
		jp: "パラリンピック選手育成支援",
		kana: "ぱらりんぴっくせんしゅいくせいしえん",
		romaji: "pararimpikku senshu ikusei shien",
	},
	{
		jp: "文化財保護が強化される",
		kana: "ぶんかざいほごがきょうかされる",
		romaji: "bunkaz aihogo gakyōkasaretu",
	},
	{
		jp: "世界遺産登録が相次ぐ",
		kana: "せかいいさんとうろくがあいついぐ",
		romaji: "sekai isan tōrokugaai tsatsugu",
	},
	{
		jp: "伝統芸能継承が課題",
		kana: "でんとうげいのうけいしょうがかだい",
		romaji: "dentō geinō keishōgakadai",
	},
	{
		jp: "映画産業の活性化支援",
		kana: "えいがさんぎょうのかっせいかしえん",
		romaji: "eiga sangyōno kasseikashien",
	},
	{
		jp: "アニメ産業の国際展開",
		kana: "あにめさんぎょうのこくさいてんかい",
		romaji: "anime sangyōno koksai tenkai",
	},
	{
		jp: "音楽著作権の保護強化",
		kana: "おんがくちょさくけんのほごきょうか",
		romaji: "ongaku chosaḳ ken nohogukyōka",
	},
	{
		jp: "出版業界の経営改革",
		kana: "しゅっぱんぎょうかいのけいえいかいかく",
		romaji: "shuppan gyōkainokeiei kaik aku",
	},
	{
		jp: "図書館サービスの充実化",
		kana: "としょかんさーびすのじゅうじつか",
		romaji: "tosh okan sābisuno juujitsuka",
	},
	{
		jp: "博物館振興が国家戦略",
		kana: "はくぶつかんしんこうがこっかせんりゃく",
		romaji: "hakubutsukan shinkōgakokka senryaku",
	},
	{
		jp: "観光産業の活性化が急務",
		kana: "かんこうさんぎょうのかっせいかがきゅうむ",
		romaji: "kankō sangyōnokasseikagakyūmu",
	},
	{
		jp: "インバウンド需要の開拓",
		kana: "いんばうんどじゅようのかいたく",
		romaji: "inbaundo juyōno kaitaku",
	},
	{
		jp: "地方創生と観光連携",
		kana: "ちほうそうせいとかんこうれんけい",
		romaji: "chihōsōsei tokankō renk ei",
	},
	{
		jp: "食文化の発信が強化される",
		kana: "しょくぶんかのはっしんがきょうかされる",
		romaji: "shokubunka nohasshin gakyōkasaretu",
	},
	{
		jp: "和食の伝承が課題である",
		kana: "わしょくのでんしょうがかだいである",
		romaji: "washoku nodensh ōgakadaidar ua",
	},
	{
		jp: "農業と観光の融合強化",
		kana: "のうぎょうとかんこうのゆうごうきょうか",
		romaji: "nōgyō tokan kōnoyūgōkyōka",
	},
	{
		jp: "農村部の雇用創出が課題",
		kana: "のうそんぶのこようそうしゅつがかだい",
		romaji: "nōsonbu nokoyōsōshutsu gakadai",
	},
	{
		jp: "地域交通網の維持困難",
		kana: "ちいきこうつうもうのいじこんなん",
		romaji: "chiiki kōtsūmōnoijikonna n",
	},
	{
		jp: "地方議会の定数削減論",
		kana: "ちほうぎかいのていすうさくげんろん",
		romaji: "chihōgikai noteisūsakugenron",
	},
	{
		jp: "首長リーダーシップが試される",
		kana: "しゅちょうりーだーしっぷがためされる",
		romaji: "shuchōrīdāshipgutamesa reru",
	},
	{
		jp: "行政改革が本格化した",
		kana: "ぎょうせいかいかくがほんかくかした",
		romaji: "gyōseikaikakugahonkakukashita",
	},
	{
		jp: "公務員給与制度の見直し",
		kana: "こうむいんきゅうよせいどのみなおし",
		romaji: "kōmuin kyūyoseido nominaoshi",
	},
	{
		jp: "入国管理制度の改革",
		kana: "にゅうこくかんりせいどのかいかく",
		romaji: "nyūkoku kanri seido nokaik aku",
	},
	{
		jp: "ビザ要件の緩和が進む",
		kana: "びざようけんのかんわがすすむ",
		romaji: "biza yōken nokanwagasusumu",
	},
	{
		jp: "多文化共生が国家方針",
		kana: "たぶんかきょうせいがこっかほうしん",
		romaji: "tabunka kyōseigakokkahoshin",
	},
	{
		jp: "人口減少への対策が急務",
		kana: "じんこうげんしょうへのたいさくがきゅうむ",
		romaji: "jinkōgenshōhenotaisak ugakyūmu",
	},
	{
		jp: "過疎地域の再生計画",
		kana: "かそちいきのさいせいけいかく",
		romaji: "kaso chiiki nosaiseiken kaku",
	},
	{
		jp: "限界集落の問題が深刻",
		kana: "げんかいしゅうらくのもんだいがしんこく",
		romaji: "genkai shūraku nomondai gashinkoku",
	},
	{
		jp: "ふるさと納税の拡大",
		kana: "ふるさとのうぜいのかくだい",
		romaji: "furusato nōzei nokakudai",
	},
	{
		jp: "水道事業の統合が進む",
		kana: "すいどうじぎょうのとうごうがすすむ",
		romaji: "suidō jigyō notōgōgasusumu",
	},
	{
		jp: "下水道整備が重点事業",
		kana: "げすいどうせいびがじゅうてんじぎょう",
		romaji: "gesuidō seibi gajuutenjjgyō",
	},
	{
		jp: "污水処理技術が進歩した",
		kana: "おすいしょりぎじゅつがしんぽした",
		romaji: "osui shori gijutsugashinposhita",
	},
	{
		jp: "ゴミ処理体制の見直し",
		kana: "ごみしょりたいせいのみなおし",
		romaji: "gomi shori taisei nominaoshi",
	},
	{
		jp: "リサイクル推進が課題",
		kana: "りさいくるすいしんがかだい",
		romaji: "risaikuru suishin gakadai",
	},
	{
		jp: "プラスチック削減が進む",
		kana: "ぷらすちっくさくげんがすすむ",
		romaji: "purasuchikku sakugengas usumu",
	},
	{
		jp: "使い捨て文化の改善",
		kana: "つかいすてぶんかのかいぜん",
		romaji: "tsukaisute bunkanokaizen",
	},
	{
		jp: "夫婦別姓制度が論争中",
		kana: "ふうふべっしょうせいどがろんそうちゅう",
		romaji: "fūfu besshoseido garo nsōchū",
	},
	{
		jp: "同性婚の法的認め",
		kana: "どうせいこんのほうてきみとめ",
		romaji: "dōseiкon nohōtekimitome",
	},
	{
		jp: "LGBTQ等権利保護",
		kana: "えるじーびーてぃーきゅーとうけんりほご",
		romaji: "erijībītīkyūto kenri hoguł",
	},
	{
		jp: "配偶者控除制度が改正",
		kana: "はいぐうしゃこうじょせいどがかいせい",
		romaji: "haigu usha kōjoseido gakaisei",
	},
	{
		jp: "育児休暇制度の拡充",
		kana: "いくじきゅうかせいどのかくじゅう",
		romaji: "ikuji kyūka seido nokakujū",
	},
	{
		jp: "保育園増設が進められる",
		kana: "ほいくえんぞうせつがすすめられる",
		romaji: "hoikuen zōsetsu gasusume raretu",
	},
	{
		jp: "待機児童の解消が課題",
		kana: "たいきじどうのかいしょうがかだい",
		romaji: "taiki jidō nokaishō gakadai",
	},
	{
		jp: "定年延長制度が導入",
		kana: "ていねんえんちょうせいどがどうにゅう",
		romaji: "teinen enchō seido gadōnyū",
	},
	{
		jp: "高齢者雇用の拡大",
		kana: "こうれいしゃこようのかくだい",
		romaji: "kōrei sha koyō nokakudai",
	},
	{
		jp: "在宅勤務制度が定着した",
		kana: "ざいたくきんむせいどがていちゃくした",
		romaji: "zaitaku kinmu seido gateichakushita",
	},
	{
		jp: "ワークライフバランス推進",
		kana: "わーくらいふばらんすすいしん",
		romaji: "wāku raifubaransu suishin",
	},
	{
		jp: "長時間労働の削減推進",
		kana: "ちょうじかんろうどうのさくげんすいしん",
		romaji: "chōjikan rōdō nosakugensuishin",
	},
	{
		jp: "最低賃金の引き上げ",
		kana: "さいていちんぎんのひきあげ",
		romaji: "saitei chinginn ohikiage",
	},
	{
		jp: "給与格差の是正が課題",
		kana: "きゅうよかくさのぜせいがかだい",
		romaji: "kyūyo kakusa nozeisei gakadai",
	},
	{
		jp: "女性労働者の待遇改善",
		kana: "じょせいろうどうしゃのたいぐうかいぜん",
		romaji: "josei rōdōsha notaigū kaizen",
	},
	{
		jp: "産業構造の転換が急務",
		kana: "さんぎょうこうぞうのてんかんがきゅうむ",
		romaji: "sangyō kōzō notenkan gakyūmu",
	},
	{
		jp: "雇用形態の多様化推進",
		kana: "こようけいたいのたようかすいしん",
		romaji: "koyō keitai notayōka suishin",
	},
	{
		jp: "フリーランス保護法が審議",
		kana: "ふりーらんすほごほうがしんぎ",
		romaji: "furīransu hoguohō gashingi",
	},
	{
		jp: "働き方改革が本格化",
		kana: "はたらきかたかいかくがほんかくか",
		romaji: "hataraki kata kaik akugahonkakuka",
	},
	{
		jp: "テレワーク推進が急速化",
		kana: "てれわーくすいしんがきゅうそくか",
		romaji: "terew āku suishin gakyūsokuka",
	},
	{
		jp: "育成型訓練が活発化",
		kana: "いくせいがたくんれんがかっぱつか",
		romaji: "ikusei gata kunren gagakka tsuka",
	},
	{
		jp: "職業訓練校の充実",
		kana: "しょくぎょうくんれんこうのじゅうじつ",
		romaji: "shokugyō kunren kō nojuujitsu",
	},
	{
		jp: "技能検定制度の強化",
		kana: "ぎのうけんていせいどのきょうか",
		romaji: "ginō kentei seido nokyōka",
	},
	{
		jp: "資格取得の奨励金支給",
		kana: "しかくしゅとくのしょうれいきんしきゅう",
		romaji: "shikaku shutoku nosh ōreikinsshikyū",
	},
	{
		jp: "生涯学習が重視される",
		kana: "しょうがいがくしゅうがじゅうしされる",
		romaji: "shōgai gakushu ugajuushisaretu",
	},
	{
		jp: "成人教育の充実化",
		kana: "せいじんきょういくのじゅうじつか",
		romaji: "seijin kyōik unojuujitsuka",
	},
	{
		jp: "英語教育の強化が進む",
		kana: "えいごきょういくのきょうかがすすむ",
		romaji: "eigo kyōik uno kyōkagasusumu",
	},
	{
		jp: "ICT教育の推進強化",
		kana: "あいしーてぃーきょういくのすいしんきょうか",
		romaji: "aishītī kyōikunosuishinkyōka",
	},
	{
		jp: "プログラミング教育が必修",
		kana: "ぷろぐらみんぐきょういくがひっしゅう",
		romaji: "puroguraminggu kyōikugahisshū",
	},
	{
		jp: "教科書のデジタル化",
		kana: "きょうかしょのでじたるか",
		romaji: "kyōkasho noděijitaruka",
	},
	{
		jp: "学校統廃合が進む",
		kana: "がっこうとうはいごうがすすむ",
		romaji: "gakkō tōhaigu gasusumu",
	},
	{
		jp: "教員採用試験の改革",
		kana: "きょういんさいようしけんのかいかく",
		romaji: "kyōin saiyō shiken nokaik aku",
	},
	{
		jp: "教育予算の大幅増額",
		kana: "きょういくよさんのおおはばぞうがく",
		romaji: "kyōiku yosan nōōhaba zōgaku",
	},
	{
		jp: "赤いりんご",
		kana: "あかいりんご",
		romaji: "akairingovasculardomingo",
	},
	{
		jp: "青い空",
		kana: "あおいそら",
		romaji: "aoisora",
	},
	{
		jp: "黄色い花",
		kana: "きいろいはな",
		romaji: "kiiroihana",
	},
	{
		jp: "黒い猫",
		kana: "くろいねこ",
		romaji: "kuroineko",
	},
	{
		jp: "白い雪",
		kana: "しろいゆき",
		romaji: "shiroiyuki",
	},
	{
		jp: "緑の木",
		kana: "みどりのき",
		romaji: "midurinoki",
	},
	{
		jp: "紫の花",
		kana: "むらさきのはな",
		romaji: "murasakinohana",
	},
	{
		jp: "茶色いカバン",
		kana: "ちゃいろいかばん",
		romaji: "chairoidkaban",
	},
	{
		jp: "灰色の靴",
		kana: "はいいろのくつ",
		romaji: "haiironoikutsu",
	},
	{
		jp: "ピンクのドレス",
		kana: "ぴんくのどれす",
		romaji: "pinkudonodoresu",
	},
	{
		jp: "オレンジ色の太陽",
		kana: "おれんじいろのたいよう",
		romaji: "orenjiironotaiyou",
	},
	{
		jp: "深い青",
		kana: "ふかいあおい",
		romaji: "fukaiaoi",
	},
	{
		jp: "淡いピンク",
		kana: "あわいぴんく",
		romaji: "awaiipinku",
	},
	{
		jp: "濃い赤",
		kana: "こいあかい",
		romaji: "koiakari",
	},
	{
		jp: "明るい黄色",
		kana: "あかるいきいろ",
		romaji: "akarukikiiro",
	},
	{
		jp: "色んな色",
		kana: "いろんないろ",
		romaji: "ironnairo",
	},
	{
		jp: "真っ赤",
		kana: "まっか",
		romaji: "makka",
	},
	{
		jp: "真っ青",
		kana: "まっあお",
		romaji: "makaoo",
	},
	{
		jp: "真っ黒",
		kana: "まっくろ",
		romaji: "makkuro",
	},
	{
		jp: "明るい色",
		kana: "あかるいいろ",
		romaji: "akarui",
	},
	{
		jp: "暗い色",
		kana: "くらいいろ",
		romaji: "kurai",
	},
	{
		jp: "単色",
		kana: "たんしょく",
		romaji: "tanshoku",
	},
	{
		jp: "色合い",
		kana: "いろあい",
		romaji: "iroai",
	},
	{
		jp: "色々",
		kana: "いろいろ",
		romaji: "iroiro",
	},
	{
		jp: "何色",
		kana: "なにいろ",
		romaji: "nairo",
	},
	{
		jp: "どんな色",
		kana: "どんないろ",
		romaji: "donnairo",
	},
	{
		jp: "綺麗な色",
		kana: "きれいないろ",
		romaji: "kireinainiro",
	},
	{
		jp: "汚い色",
		kana: "よごれたいろ",
		romaji: "yogoretaiiro",
	},
	{
		jp: "鮮やかな色",
		kana: "あざやかないろ",
		romaji: "azayakanairo",
	},
	{
		jp: "柔らかい色",
		kana: "やわらかいいろ",
		romaji: "yawarakaiiro",
	},
	{
		jp: "固い色",
		kana: "かたいいろ",
		romaji: "kataiiro",
	},
	{
		jp: "優しい色",
		kana: "やさしいいろ",
		romaji: "yasashiiro",
	},
	{
		jp: "厳しい色",
		kana: "きびしいいろ",
		romaji: "kibishiiro",
	},
	{
		jp: "温かい色",
		kana: "あたたかいいろ",
		romaji: "atatakaiiro",
	},
	{
		jp: "冷たい色",
		kana: "ひえたいいろ",
		romaji: "hietaiiro",
	},
	{
		jp: "橙色",
		kana: "だいだいいろ",
		romaji: "daidaiiro",
	},
	{
		jp: "臙脂色",
		kana: "えんじいろ",
		romaji: "enjiiro",
	},
	{
		jp: "紺色",
		kana: "こんいろ",
		romaji: "koniro",
	},
	{
		jp: "藍色",
		kana: "あいいろ",
		romaji: "aiiro",
	},
	{
		jp: "青緑",
		kana: "あおみどり",
		romaji: "aomidori",
	},
	{
		jp: "緋色",
		kana: "ひいろ",
		romaji: "hiiro",
	},
	{
		jp: "朱色",
		kana: "しゅいろ",
		romaji: "shuiro",
	},
	{
		jp: "薄紫",
		kana: "うすむらさき",
		romaji: "usumurasaki",
	},
	{
		jp: "深紫",
		kana: "ふかむらさき",
		romaji: "fukamurasaki",
	},
	{
		jp: "焦茶",
		kana: "こげちゃ",
		romaji: "kogecha",
	},
	{
		jp: "黒檀色",
		kana: "こくたんいろ",
		romaji: "kokutaniro",
	},
	{
		jp: "水色",
		kana: "みずいろ",
		romaji: "mizuiro",
	},
	{
		jp: "空色",
		kana: "そらいろ",
		romaji: "sorairo",
	},
	{
		jp: "一つのりんご",
		kana: "ひとつのりんご",
		romaji: "hitotsunoriinago",
	},
	{
		jp: "二冊の本",
		kana: "にさつのほん",
		romaji: "nisatsunohonn",
	},
	{
		jp: "三個の卵",
		kana: "さんこのたまご",
		romaji: "sanknotamago",
	},
	{
		jp: "四人の友達",
		kana: "よんにんのともだち",
		romaji: "yonninnotomadachi",
	},
	{
		jp: "五つの指",
		kana: "いつつのゆび",
		romaji: "itsutsnoyubi",
	},
	{
		jp: "六匹の犬",
		kana: "ろっぴきのいぬ",
		romaji: "roppikinoinu",
	},
	{
		jp: "七日間",
		kana: "しちにちかん",
		romaji: "shichinichiikan",
	},
	{
		jp: "八月",
		kana: "はちがつ",
		romaji: "hachigatsu",
	},
	{
		jp: "九時",
		kana: "くじ",
		romaji: "kuji",
	},
	{
		jp: "十個",
		kana: "じゅっこ",
		romaji: "jukko",
	},
	{
		jp: "十一人",
		kana: "じゅういちにん",
		romaji: "juuichinin",
	},
	{
		jp: "十二月",
		kana: "じゅうにがつ",
		romaji: "juunigatsu",
	},
	{
		jp: "二十歳",
		kana: "はたち",
		romaji: "hatachi",
	},
	{
		jp: "三十分",
		kana: "さんじゅっぷん",
		romaji: "sanjuppun",
	},
	{
		jp: "百円",
		kana: "ひゃくえん",
		romaji: "hyakuen",
	},
	{
		jp: "千人",
		kana: "せんにん",
		romaji: "sennin",
	},
	{
		jp: "万年筆",
		kana: "まんねんひつ",
		romaji: "mannenhitsu",
	},
	{
		jp: "数えられない",
		kana: "かぞえられない",
		romaji: "kazoerarenaiii",
	},
	{
		jp: "数え切れない",
		kana: "かぞえきれない",
		romaji: "kazoekirenai",
	},
	{
		jp: "一秒",
		kana: "いちびょう",
		romaji: "ichibyou",
	},
	{
		jp: "二秒",
		kana: "にびょう",
		romaji: "nibyou",
	},
	{
		jp: "三秒",
		kana: "さんびょう",
		romaji: "sanbyou",
	},
	{
		jp: "十秒",
		kana: "じゅうびょう",
		romaji: "juubyou",
	},
	{
		jp: "一分",
		kana: "いっぷん",
		romaji: "ippun",
	},
	{
		jp: "二分",
		kana: "にふん",
		romaji: "nifun",
	},
	{
		jp: "三分",
		kana: "さんぷん",
		romaji: "sanpun",
	},
	{
		jp: "十分",
		kana: "じゅっぷん",
		romaji: "juppun",
	},
	{
		jp: "一時間",
		kana: "いちじかん",
		romaji: "ichijikan",
	},
	{
		jp: "二時間",
		kana: "にじかん",
		romaji: "nijikan",
	},
	{
		jp: "三時間",
		kana: "さんじかん",
		romaji: "sanjikan",
	},
	{
		jp: "十時間",
		kana: "じゅうじかん",
		romaji: "juujikan",
	},
	{
		jp: "一日",
		kana: "いちにち",
		romaji: "ichinichi",
	},
	{
		jp: "二日",
		kana: "ふつか",
		romaji: "futsuka",
	},
	{
		jp: "三日",
		kana: "みっか",
		romaji: "mikka",
	},
	{
		jp: "十日",
		kana: "とうか",
		romaji: "touka",
	},
	{
		jp: "一週間",
		kana: "いっしゅうかん",
		romaji: "ishuukan",
	},
	{
		jp: "二週間",
		kana: "にしゅうかん",
		romaji: "nishuukan",
	},
	{
		jp: "三週間",
		kana: "さんしゅうかん",
		romaji: "sanshuukan",
	},
	{
		jp: "一ヶ月",
		kana: "いっかげつ",
		romaji: "ikkagetsu",
	},
	{
		jp: "二ヶ月",
		kana: "にかげつ",
		romaji: "nikagetsu",
	},
	{
		jp: "三ヶ月",
		kana: "さんかげつ",
		romaji: "sankagetsu",
	},
	{
		jp: "六ヶ月",
		kana: "ろっかげつ",
		romaji: "rokkagetsu",
	},
	{
		jp: "一年",
		kana: "いちねん",
		romaji: "ichinen",
	},
	{
		jp: "二年",
		kana: "にねん",
		romaji: "ninen",
	},
	{
		jp: "三年",
		kana: "さんねん",
		romaji: "sannen",
	},
	{
		jp: "十年",
		kana: "じゅうねん",
		romaji: "juunen",
	},
	{
		jp: "昼十二時",
		kana: "ひるじゅうにじ",
		romaji: "hirujuunji",
	},
	{
		jp: "夜九時",
		kana: "よるくじ",
		romaji: "yerukuji",
	},
	{
		jp: "夜中一時",
		kana: "やなかいちじ",
		romaji: "yanakaichiiji",
	},
	{
		jp: "午前八時",
		kana: "ごぜんはちじ",
		romaji: "gozenhachiiji",
	},
	{
		jp: "午後三時",
		kana: "ごごさんじ",
		romaji: "gogosanji",
	},
	{
		jp: "一分前",
		kana: "いっぷんまえ",
		romaji: "ippunmae",
	},
	{
		jp: "五分後",
		kana: "ごふんご",
		romaji: "gofungo",
	},
	{
		jp: "十分待つ",
		kana: "じゅっぷんまつ",
		romaji: "juppunmatsu",
	},
	{
		jp: "三十分ほど",
		kana: "さんじゅっぷんほど",
		romaji: "sanjuppunhodo",
	},
	{
		jp: "二時間半",
		kana: "にじかんはん",
		romaji: "nijikanhann",
	},
	{
		jp: "半日",
		kana: "はんにち",
		romaji: "hannnichi",
	},
	{
		jp: "一日中",
		kana: "いちにちじゅう",
		romaji: "ichinichiijuu",
	},
	{
		jp: "今朝",
		kana: "けさ",
		romaji: "kesa",
	},
	{
		jp: "明日",
		kana: "あした",
		romaji: "ashita",
	},
	{
		jp: "昨日",
		kana: "きのう",
		romaji: "kinou",
	},
	{
		jp: "今週",
		kana: "こんしゅう",
		romaji: "konshuu",
	},
	{
		jp: "来週",
		kana: "らいしゅう",
		romaji: "raishuu",
	},
	{
		jp: "先週",
		kana: "せんしゅう",
		romaji: "senshuu",
	},
	{
		jp: "今月",
		kana: "こんげつ",
		romaji: "kongetsu",
	},
	{
		jp: "来月",
		kana: "らいげつ",
		romaji: "raigetsu",
	},
	{
		jp: "先月",
		kana: "せんげつ",
		romaji: "sengetsu",
	},
	{
		jp: "今年",
		kana: "ことし",
		romaji: "kotoshi",
	},
	{
		jp: "来年",
		kana: "らいねん",
		romaji: "rainen",
	},
	{
		jp: "去年",
		kana: "きょねん",
		romaji: "kyonen",
	},
	{
		jp: "永遠に",
		kana: "えいえんに",
		romaji: "eienni",
	},
	{
		jp: "いつまでも",
		kana: "いつまでも",
		romaji: "itsumademo",
	},
	{
		jp: "もうすぐ",
		kana: "もうすぐ",
		romaji: "mousugu",
	},
	{
		jp: "朝焼け",
		kana: "あさやけ",
		romaji: "asayake",
	},
	{
		jp: "夕焼け",
		kana: "ゆうやけ",
		romaji: "yuuyake",
	},
	{
		jp: "星明かり",
		kana: "ほしあかり",
		romaji: "hoshiakari",
	},
	{
		jp: "月明かり",
		kana: "つきあかり",
		romaji: "tsukiakari",
	},
	{
		jp: "月曜日",
		kana: "げつようび",
		romaji: "getsuyoubi",
	},
	{
		jp: "火曜日",
		kana: "かようび",
		romaji: "kayoubi",
	},
	{
		jp: "水曜日",
		kana: "すいようび",
		romaji: "suiyoubi",
	},
	{
		jp: "木曜日",
		kana: "もくようび",
		romaji: "mokuyoubi",
	},
	{
		jp: "金曜日",
		kana: "きんようび",
		romaji: "kinyoubi",
	},
	{
		jp: "土曜日",
		kana: "どようび",
		romaji: "doyoubi",
	},
	{
		jp: "日曜日",
		kana: "にちようび",
		romaji: "nichiyoubi",
	},
	{
		jp: "毎週月曜日",
		kana: "まいしゅうげつようび",
		romaji: "maishugetsuyoubi",
	},
	{
		jp: "毎週火曜日",
		kana: "まいしゅうかようび",
		romaji: "maishukayoubi",
	},
	{
		jp: "毎週水曜日",
		kana: "まいしゅうすいようび",
		romaji: "maisuiyoubi",
	},
	{
		jp: "毎週木曜日",
		kana: "まいしゅうもくようび",
		romaji: "maishomokuyoubi",
	},
	{
		jp: "毎週金曜日",
		kana: "まいしゅうきんようび",
		romaji: "maishukinyoubi",
	},
	{
		jp: "毎週土曜日",
		kana: "まいしゅうどようび",
		romaji: "maishudoyoubi",
	},
	{
		jp: "毎週日曜日",
		kana: "まいしゅうにちようび",
		romaji: "maishunichiyoubi",
	},
	{
		jp: "月曜の朝",
		kana: "げつようのあさ",
		romaji: "getsuyounoasa",
	},
	{
		jp: "金曜の夜",
		kana: "きんようのよる",
		romaji: "kinyounoyoru",
	},
	{
		jp: "日曜日に寝坊する",
		kana: "にちようびにねぼうする",
		romaji: "nichiyoubininebousuru",
	},
	{
		jp: "水曜日は休み",
		kana: "すいようびはやすみ",
		romaji: "suiyoubihayasumi",
	},
	{
		jp: "木曜日に会う",
		kana: "もくようびにあう",
		romaji: "mokuyoubiniau",
	},
	{
		jp: "土曜日のデート",
		kana: "どようびのであと",
		romaji: "doyoubinoideeto",
	},
	{
		jp: "明日は月曜日",
		kana: "あしたはげつようび",
		romaji: "ashitahagetsuyoubi",
	},
	{
		jp: "昨日は金曜日",
		kana: "きのうはきんようび",
		romaji: "kinouihakinyoubi",
	},
	{
		jp: "今日は何曜日",
		kana: "きょうはなんようび",
		romaji: "kyouhanannyoubi",
	},
	{
		jp: "この曜日",
		kana: "このようび",
		romaji: "konoyoubi",
	},
	{
		jp: "その曜日",
		kana: "そのようび",
		romaji: "sonoyoubi",
	},
	{
		jp: "あの曜日",
		kana: "あのようび",
		romaji: "anoyoubi",
	},
	{
		jp: "何曜日か",
		kana: "なんようびか",
		romaji: "nanyoubika",
	},
	{
		jp: "曜日を忘れた",
		kana: "ようびをわすれた",
		romaji: "youbiwowasurta",
	},
	{
		jp: "曜日を確認する",
		kana: "ようびをかくにんする",
		romaji: "youbiwokakuninsuru",
	},
	{
		jp: "曜日ごと",
		kana: "ようびごと",
		romaji: "youbigoto",
	},
	{
		jp: "平日",
		kana: "へいじつ",
		romaji: "heijitsu",
	},
	{
		jp: "連休",
		kana: "れんきゅう",
		romaji: "renkyuu",
	},
	{
		jp: "祝日",
		kana: "しゅくじつ",
		romaji: "shukujitsu",
	},
	{
		jp: "赤い月曜日",
		kana: "あかいげつようび",
		romaji: "akaiigetsuyoubi",
	},
	{
		jp: "青い火曜日",
		kana: "あおいかようび",
		romaji: "aoiikayoubi",
	},
	{
		jp: "黄色い水曜日",
		kana: "きいろいすいようび",
		romaji: "kiirouisuiyoubi",
	},
	{
		jp: "緑の木曜日",
		kana: "みどりのもくようび",
		romaji: "midurinomokuyoubi",
	},
	{
		jp: "紫の金曜日",
		kana: "むらさきのきんようび",
		romaji: "murasakinokinyoubi",
	},
	{
		jp: "白い土曜日",
		kana: "しろいどようび",
		romaji: "shiroiidoyoubi",
	},
	{
		jp: "黒い日曜日",
		kana: "くろいにちようび",
		romaji: "kuroiiinichiyoubi",
	},
	{
		jp: "三つの色",
		kana: "みっつのいろ",
		romaji: "mitsunoiro",
	},
	{
		jp: "五つの時間",
		kana: "いつつのじかん",
		romaji: "itsutsinojikan",
	},
	{
		jp: "七つの曜日",
		kana: "ななつのようび",
		romaji: "nanatsunoyoubi",
	},
	{
		jp: "月曜日の三時",
		kana: "げつようびのさんじ",
		romaji: "getsuyoubinosanji",
	},
	{
		jp: "水曜日の九時",
		kana: "すいようびのくじ",
		romaji: "suiyoubinokuji",
	},
	{
		jp: "金曜日の五時",
		kana: "きんようびのごじ",
		romaji: "kinyoubinogoji",
	},
	{
		jp: "日曜日の十時",
		kana: "にちようびのじゅうじ",
		romaji: "nichiyoubinojuuji",
	},
	{
		jp: "赤色の朝七時",
		kana: "あかいろのあさしちじ",
		romaji: "akairotasasashichiji",
	},
	{
		jp: "朝時間",
		kana: "あさじかん",
		romaji: "asajikan",
	},
	{
		jp: "昼時間",
		kana: "ひるじかん",
		romaji: "hirujikan",
	},
	{
		jp: "夕方時間",
		kana: "ゆうがたじかん",
		romaji: "yuugatajikan",
	},
	{
		jp: "夜時間",
		kana: "よるじかん",
		romaji: "yerujikan",
	},
	{
		jp: "真夜中",
		kana: "まよなか",
		romaji: "mayonaka",
	},
	{
		jp: "早朝",
		kana: "そうちょう",
		romaji: "souchou",
	},
	{
		jp: "黄昏",
		kana: "たそがれ",
		romaji: "tasogare",
	},
	{
		jp: "日中",
		kana: "ひなか",
		romaji: "hinaka",
	},
	{
		jp: "夜明け",
		kana: "よあけ",
		romaji: "yoake",
	},
	{
		jp: "日没",
		kana: "ひぼつ",
		romaji: "hibotsu",
	},
	{
		jp: "時間割",
		kana: "じかんわり",
		romaji: "jikanwari",
	},
	{
		jp: "時間帯",
		kana: "じかんたい",
		romaji: "jikantai",
	},
	{
		jp: "時間差",
		kana: "じかんさ",
		romaji: "jikanisa",
	},
	{
		jp: "時間をつぶす",
		kana: "じかんをつぶす",
		romaji: "jikanwotsubusu",
	},
	{
		jp: "時間を忘れる",
		kana: "じかんをわすれる",
		romaji: "jikanwowasureru",
	},
	{
		jp: "時間を進める",
		kana: "じかんをすすめる",
		romaji: "jikanwosusumeru",
	},
	{
		jp: "時間を戻す",
		kana: "じかんをもどす",
		romaji: "jikanwomodsu",
	},
	{
		jp: "時間に追われる",
		kana: "じかんにおわれる",
		romaji: "jikanniowareru",
	},
	{
		jp: "時間に間に合う",
		kana: "じかんにまにあう",
		romaji: "jikannimaniau",
	},
	{
		jp: "時間を有効活用",
		kana: "じかんをゆうこうかつよう",
		romaji: "jikanwoyuukoukatsuyou",
	},
	{
		jp: "時間がない",
		kana: "じかんがない",
		romaji: "jikangannai",
	},
	{
		jp: "正月",
		kana: "しょうがつ",
		romaji: "shougastu",
	},
	{
		jp: "一月",
		kana: "いちがつ",
		romaji: "ichigatsu",
	},
	{
		jp: "子どもに朝ごはんを食べさせます",
		kana: "こどもにあさごはんをたべさせます",
		romaji: "kodomoniasagohanwotabesasemasu",
	},
	{
		jp: "保育園の準備をしましょう",
		kana: "ほいくえんのじゅんびをしましょう",
		romaji: "hoikuennojunbiwoshimasho",
	},
	{
		jp: "子どもの歯を磨きます",
		kana: "こどものはをみがきます",
		romaji: "kodomotohawomigakimasu",
	},
	{
		jp: "幼稚園に行く時間です",
		kana: "ようちえんにいくじかんです",
		romaji: "youchienniiikujikandasu",
	},
	{
		jp: "おむつを替えてください",
		kana: "おむつをかえてください",
		romaji: "omutsuwokaetetekudasai",
	},
	{
		jp: "子どもがお昼寝をしています",
		kana: "こどもがおひるねをしています",
		romaji: "kodomogaohurunewoshiteimasu",
	},
	{
		jp: "授乳の時間です",
		kana: "じゅにゅうのじかんです",
		romaji: "junyuunojikandasu",
	},
	{
		jp: "赤ちゃんが泣いています",
		kana: "あかちゃんがないています",
		romaji: "akachanganaitejimasu",
	},
	{
		jp: "おりこうさんですね",
		kana: "おりこうさんですね",
		romaji: "orikousandesnee",
	},
	{
		jp: "ご飯をしっかり食べてね",
		kana: "ごはんをしっかりたべてね",
		romaji: "gohanwoshikkariTabetenee",
	},
	{
		jp: "子どもが言うことを聞きません",
		kana: "こどもがいうことをききません",
		romaji: "kodomogaiukotonokikimaseñ",
	},
	{
		jp: "夜泣きで大変です",
		kana: "よなきでたいへんです",
		romaji: "yonakidetaihendesu",
	},
	{
		jp: "子どもが風邪をひきました",
		kana: "こどもがかぜをひきました",
		romaji: "kodomogakazewohikimashita",
	},
	{
		jp: "予防接種に連れて行きます",
		kana: "よぼうせっしゅにつれていきます",
		romaji: "yobousesshunitureteikimasu",
	},
	{
		jp: "子どもが熱を出しました",
		kana: "こどもがねつをだしました",
		romaji: "kodomoganetuwodashmashita",
	},
	{
		jp: "おもちゃを片付けてください",
		kana: "おもちゃをかたづけてください",
		romaji: "omocyawokataduketekudasai",
	},
	{
		jp: "ちゃんと勉強しなさい",
		kana: "ちゃんとべんきょうしなさい",
		romaji: "chantobenkkyoushimasai",
	},
	{
		jp: "兄弟喧嘩をやめなさい",
		kana: "きょうだいげんかをやめなさい",
		romaji: "kyoudaisenkawoyan-masai",
	},
	{
		jp: "子どもが物を壊してしまった",
		kana: "こどもがものをこわしてしまった",
		romaji: "kodomogamonowokawashiteshimatta",
	},
	{
		jp: "トイレトレーニングが難しい",
		kana: "トイレトレーニングがむずかしい",
		romaji: "toireterēninggamuuzukashii",
	},
	{
		jp: "子どもを抱きしめたいです",
		kana: "こどもをだきしめたいです",
		romaji: "kodomowodakishimetaidessu",
	},
	{
		jp: "子どもの成長が嬉しいです",
		kana: "こどものせいちょうがうれしいです",
		romaji: "kodomoneseichougaureshiidessu",
	},
	{
		jp: "子どもが大好きです",
		kana: "こどもがだいすきです",
		romaji: "kodomogadaisukidessu",
	},
	{
		jp: "親子で遊びましょう",
		kana: "おやここあそびましょう",
		romaji: "oyakooasonimashoo",
	},
	{
		jp: "子どもの笑顔が一番です",
		kana: "こどものえがおがいちばんです",
		romaji: "kodomoneegaogaichibandesssu",
	},
	{
		jp: "子育ては大変ですけど楽しいです",
		kana: "こそだてはたいへんですけどたのしいです",
		romaji: "kosodatewataihendesukkedotanoshiidessu",
	},
	{
		jp: "娘を自慢に思います",
		kana: "むすめをじまんにおもいます",
		romaji: "musumewojimaniomoimasu",
	},
	{
		jp: "息子が頑張っています",
		kana: "むすこががんばっています",
		romaji: "musukogaganbbattejimasu",
	},
	{
		jp: "子どもと一緒にいるのが幸せです",
		kana: "こどもといっしょにいるのがしあわせです",
		romaji: "kodomotoissshoniiruganogyawasedessu",
	},
	{
		jp: "子どもの成功を応援します",
		kana: "こどものせいこうをおうえんします",
		romaji: "kodomoneseikouwoouensshimasu",
	},
	{
		jp: "学校の宿題をしました",
		kana: "がっこうのしゅくだいをしました",
		romaji: "gakkounoshukudaiowoshimashita",
	},
	{
		jp: "テストの点数が上がりました",
		kana: "テストのてんすうがあがりました",
		romaji: "tesutnotensunngaagarimashita",
	},
	{
		jp: "先生と面談があります",
		kana: "せんせいとめんだんがあります",
		romaji: "senseitomendangaarimasu",
	},
	{
		jp: "学芸会で主役を演じます",
		kana: "がくげいかいでしゅやくをえんじます",
		romaji: "gakugeikaideshuyakuwoennjimasu",
	},
	{
		jp: "修学旅行に行きます",
		kana: "しゅうがくりょこうにいきます",
		romaji: "shuugakuryoukouniikimasu",
	},
	{
		jp: "友達とけんかをしました",
		kana: "ともだちとけんかをしました",
		romaji: "tomodacitotokenkaowoshimashita",
	},
	{
		jp: "新しい学校に転校しました",
		kana: "あたらしいがっこうにてんこうしました",
		romaji: "atarashiigakkounitenkoushimashita",
	},
	{
		jp: "授業参観があります",
		kana: "じゅぎょうさんかんがあります",
		romaji: "jugyousankangaarimasu",
	},
	{
		jp: "成績表をもらいました",
		kana: "せいせきひょうをもらいました",
		romaji: "seiski-hyouwomoraimashita",
	},
	{
		jp: "予防接種が必要です",
		kana: "よぼうせっしゅがひつようです",
		romaji: "yobouseshugahitsuyoudessu",
	},
	{
		jp: "子どもの身長が伸びました",
		kana: "こどものしんちょうがのびました",
		romaji: "kodomonesinchouganobumasita",
	},
	{
		jp: "体重が増えました",
		kana: "たいじゅうがふえました",
		romaji: "taijuugafuemashita",
	},
	{
		jp: "虫歯がありません",
		kana: "むしばがありません",
		romaji: "mushiabagaarimeseñ",
	},
	{
		jp: "栄養バランスが大事です",
		kana: "えいようバランスがだいじです",
		romaji: "eiyoubarnsugudaijidesu",
	},
	{
		jp: "子どもに薬を飲ませます",
		kana: "こどもにくすりをのませます",
		romaji: "kodomonikunsurinomasemassu",
	},
	{
		jp: "目医者に行きました",
		kana: "めいしゃにいきました",
		romaji: "meisyaniikimashita",
	},
	{
		jp: "歯医者の予約をしました",
		kana: "はいしゃのよやくをしました",
		romaji: "haishyanoyoyakuwoshimashita",
	},
	{
		jp: "離乳食を始めました",
		kana: "りにゅうしょくをはじめました",
		romaji: "rinyuushokuwohajimemashita",
	},
	{
		jp: "野菜をたくさん食べさせます",
		kana: "やさいをたくさんたべさせます",
		romaji: "yasaiwtakusantabesasemassu",
	},
	{
		jp: "偏食に困っています",
		kana: "へんしょくにこまっています",
		romaji: "henshokunitomatetimasu",
	},
	{
		jp: "牛乳を飲んでください",
		kana: "ぎゅうにゅうをのんでください",
		romaji: "gyuunyuuwonondekudasai",
	},
	{
		jp: "御飯をこぼしてしまった",
		kana: "ごはんをこぼしてしまった",
		romaji: "gohanwokoboshiteshimatta",
	},
	{
		jp: "アレルギー対応食をください",
		kana: "アレルギーたいおうしょくをください",
		romaji: "areruguītaioushokuwokudasai",
	},
	{
		jp: "お菓子は一日一個だけです",
		kana: "おかしはいちにちいっこだけです",
		romaji: "okashiwaichinichjikotdakedessu",
	},
	{
		jp: "食べ物を大事にしましょう",
		kana: "たべものをたいじにしましょう",
		romaji: "tabemonotaidajinishmashoo",
	},
	{
		jp: "子どもは何でも食べます",
		kana: "こどもはなんでもたべます",
		romaji: "kodomowanandemoTabemasu",
	},
	{
		jp: "食べ残しをしない",
		kana: "たべのこしをしない",
		romaji: "tabenokoshiwoshinai",
	},
	{
		jp: "公園で遊びます",
		kana: "こうえんであそびます",
		romaji: "kouenadeasobimasu",
	},
	{
		jp: "砂遊びが好きです",
		kana: "すなあそびがすきです",
		romaji: "sunaasobigasukidessu",
	},
	{
		jp: "ブランコに乗ります",
		kana: "ブランコにのります",
		romaji: "burankononirimasu",
	},
	{
		jp: "滑り台を滑ります",
		kana: "すべりだいをすべります",
		romaji: "suberidaiwosuberimasu",
	},
	{
		jp: "ボール遊びをしましょう",
		kana: "ボールあそびをしましょう",
		romaji: "bōruasobiwoshimashoo",
	},
	{
		jp: "ブロック遊びが好きです",
		kana: "ブロックあそびがすきです",
		romaji: "burokikuasobigasukidesu",
	},
	{
		jp: "人形劇を見ます",
		kana: "にんぎょうげきをみます",
		romaji: "ninggyosugeikiwomimasu",
	},
	{
		jp: "絵本を読み聞かせます",
		kana: "えほんをよみきかせます",
		romaji: "ehontoyomikikasemassu",
	},
	{
		jp: "歌を歌います",
		kana: "うたをうたいます",
		romaji: "utawoutaimasu",
	},
	{
		jp: "ダンスを踊ります",
		kana: "ダンスをおどります",
		romaji: "dansuwoodorimassu",
	},
	{
		jp: "寝かしつけるのが大変です",
		kana: "ねかしつけるのがたいへんです",
		romaji: "nekashitsukernogotaihendessu",
	},
	{
		jp: "子どもは九時に寝ます",
		kana: "こどもはくじにねます",
		romaji: "kodmowakujiminnemasu",
	},
	{
		jp: "昼寝をさせます",
		kana: "ひるねをさせます",
		romaji: "hiruneosasemassu",
	},
	{
		jp: "ベッドに寝かせます",
		kana: "ベッドにねかせます",
		romaji: "beddoninekaserasu",
	},
	{
		jp: "一緒に寝たいです",
		kana: "いっしょにねたいです",
		romaji: "isshoninenetaidessu",
	},
	{
		jp: "寝相が悪いです",
		kana: "ねあいがわるいです",
		romaji: "neaiigawaruidesu",
	},
	{
		jp: "早寝早起きをしましょう",
		kana: "はやねはやおきをしましょう",
		romaji: "hayanehaayaokiwoshimashoo",
	},
	{
		jp: "夜中に何度も起きます",
		kana: "よなかになんどもおきます",
		romaji: "yonaknaninandomomokimasu",
	},
	{
		jp: "子守唄を歌います",
		kana: "こもりうたをうたいます",
		romaji: "komoriutawoutaimasu",
	},
	{
		jp: "子どもに着替えさせます",
		kana: "こどもにきがえさせます",
		romaji: "kodomonikinigaesasemasu",
	},
	{
		jp: "服がちっちゃくなりました",
		kana: "ふくがちっちゃくなりました",
		romaji: "fukugachichicchakunarimashita",
	},
	{
		jp: "靴を履かせます",
		kana: "くつをはかせます",
		romaji: "kutsuwohakasemasu",
	},
	{
		jp: "上着を着てください",
		kana: "うわぎをきてください",
		romaji: "uwagikitekudasai",
	},
	{
		jp: "靴下を探しています",
		kana: "くつしたをさがしています",
		romaji: "kutsushitawosagashiteimasu",
	},
	{
		jp: "服が汚れました",
		kana: "ふくがよごれました",
		romaji: "fukugayogoremashita",
	},
	{
		jp: "洗濯物が多いです",
		kana: "せんたくぶつがおおいです",
		romaji: "sentakubutsugaooidesu",
	},
	{
		jp: "サイズが合わなくなった",
		kana: "サイズがあわなくなった",
		romaji: "saizugaawanakunatta",
	},
	{
		jp: "ボタンが取れてしまった",
		kana: "ボタンがとれてしまった",
		romaji: "botangatoreteshimatta",
	},
	{
		jp: "帽子をかぶってね",
		kana: "ぼうしをかぶってね",
		romaji: "boushiwokabuttene",
	},
	{
		jp: "いけない子ですね",
		kana: "いけないこですね",
		romaji: "ikenaikodesnee",
	},
	{
		jp: "ちょっと待ってください",
		kana: "ちょっとまってください",
		romaji: "chottomatetekudasai",
	},
	{
		jp: "危ないからやめて",
		kana: "あぶないからやめて",
		romaji: "abunaikattoyamete",
	},
	{
		jp: "いい子にしてね",
		kana: "いいこにしてね",
		romaji: "iikonitenee",
	},
	{
		jp: "頑張っているね",
		kana: "がんばっているね",
		romaji: "ganbbatteirunee",
	},
	{
		jp: "約束を守ってね",
		kana: "やくそくをまもってね",
		romaji: "yakusokuwomamotte-nee",
	},
	{
		jp: "うそをついてはいけません",
		kana: "うそをついてはいけません",
		romaji: "usotwotuitewahaikemeseñ",
	},
	{
		jp: "人にやさしくしましょう",
		kana: "ひとにやさしくしましょう",
		romaji: "hitoniyashashikushimashoo",
	},
	{
		jp: "物を大事にしよう",
		kana: "ものをたいじにしよう",
		romaji: "monowtaidajinishiyou",
	},
	{
		jp: "ごめんなさいと言ってね",
		kana: "ごめんなさいといってね",
		romaji: "gomenasaitoylttenee",
	},
	{
		jp: "雨の日は家で遊びます",
		kana: "あめのひはいえであそびます",
		romaji: "amenohiwaieedasobimasu",
	},
	{
		jp: "雪が降りました",
		kana: "ゆきがふりました",
		romaji: "yukigafurimashita",
	},
	{
		jp: "真夏は熱中症に注意です",
		kana: "まなつはねっちゅうしょうにちゅういです",
		romaji: "manatswanechusshounichuuidessu",
	},
	{
		jp: "春は新しい季節です",
		kana: "はるはあたらしいきせつです",
		romaji: "haruwaatarashiikisetsudessuu",
	},
	{
		jp: "秋は運動会の季節です",
		kana: "あきはうんどうかいのきせつです",
		romaji: "akiwaundoukaininokisetsudessuu",
	},
	{
		jp: "冬は風邪をひきやすい",
		kana: "ふゆはかぜをひきやすい",
		romaji: "fuyuwakzewohikiyasui",
	},
	{
		jp: "セーターを着せます",
		kana: "セーターをきせます",
		romaji: "sētāwokisemasu",
	},
	{
		jp: "うちわであおぎます",
		kana: "うちわであおぎます",
		romaji: "uchiwadeaogimasu",
	},
	{
		jp: "冷房は二十五度にしましょう",
		kana: "れいぼうはにじゅうごどにしましょう",
		romaji: "reibouwaniijuugodoniishimashoo",
	},
	{
		jp: "子どもと一緒に季節を感じます",
		kana: "こどもといっしょにきせつをかんじます",
		romaji: "kodomotoisshonikisetsuwokanjimasu",
	},
	{
		jp: "スーパーに買い物に行きます",
		kana: "スーパーにかいものにいきます",
		romaji: "supānikaímononíikimasu",
	},
	{
		jp: "子どもを連れてお出かけします",
		kana: "こどもをつれておでかけします",
		romaji: "kodomowotsuretodekaekshimasu",
	},
	{
		jp: "ベビーカーを押します",
		kana: "ベビーカーをおします",
		romaji: "bebīkāwôoshimasu",
	},
	{
		jp: "抱っこひもが便利です",
		kana: "だっこひもがべんりです",
		romaji: "dakkohinmogabenrídesu",
	},
	{
		jp: "子どもは何でも触りたがります",
		kana: "こどもはなんでもさわりたがります",
		romaji: "kodomowanandemoswaritagarimasu",
	},
	{
		jp: "おもちゃを選んでくれます",
		kana: "おもちゃをえらんでくれます",
		romaji: "omochawoerandekuremassu",
	},
	{
		jp: "レジでぐずってしまった",
		kana: "レジでぐずってしまった",
		romaji: "rejideguzutteshimatta",
	},
	{
		jp: "駐車場で子どもが走る",
		kana: "ちゅうしゃじょうでこどもがはしる",
		romaji: "chuushajouddekodomogahashiru",
	},
	{
		jp: "ベビーフードを買います",
		kana: "ベビーフードをかいます",
		romaji: "bebīfūdowokaimasu",
	},
	{
		jp: "子ども用品店に行きました",
		kana: "こどもようひんてんにいきました",
		romaji: "kodomoyohintenníikimashita",
	},
	{
		jp: "兄が妹の世話をしています",
		kana: "あにがいもうとのせわをしています",
		romaji: "anigaimoutonosewwoshiteimasu",
	},
	{
		jp: "姉と妹がけんかをしている",
		kana: "あねといもうとがけんかをしている",
		romaji: "anetoimoutozuokenkawoshshiteiru",
	},
	{
		jp: "下の子が生まれました",
		kana: "したのこがうまれました",
		romaji: "shitanokogaumaremasita",
	},
	{
		jp: "兄弟は仲良くしてね",
		kana: "きょうだいはなかよくしてね",
		romaji: "kyoudaihanakayokushitene",
	},
	{
		jp: "上の子のお世話が大事です",
		kana: "うえのこのおせわがたいじです",
		romaji: "uenokoonosewagataidijidesu",
	},
	{
		jp: "双子の育児は大変です",
		kana: "ふたごのいくじはたいへんです",
		romaji: "futagonoikujiwataihedessu",
	},
	{
		jp: "お兄さんらしくしてね",
		kana: "おにいさんらしくしてね",
		romaji: "oniisanrashikushitene",
	},
	{
		jp: "妹がお兄さんについてきます",
		kana: "いもうとがおにいさんについてきます",
		romaji: "imoutogaoniisannitsuititekimasu",
	},
	{
		jp: "子ども同士で遊んでいます",
		kana: "こどもどうしであそんでいます",
		romaji: "kodmododoushideasondeimaswu",
	},
	{
		jp: "兄妹で助け合いましょう",
		kana: "きょうだいでたすけあいましょう",
		romaji: "kyoudaidetasukeaimashoo",
	},
	{
		jp: "おむつを替えました",
		kana: "おむつをかえました",
		romaji: "omutsuwokaemashita",
	},
	{
		jp: "赤ちゃんがお風呂に入ります",
		kana: "あかちゃんがおふろにはいります",
		romaji: "akachanngaofuronihairimasu",
	},
	{
		jp: "げっぷを出させます",
		kana: "げっぷをださせます",
		romaji: "geppuwodasasemasu",
	},
	{
		jp: "赤ちゃんは寝てばかりです",
		kana: "あかちゃんはねてばかりです",
		romaji: "akachanwanetebakarídesu",
	},
	{
		jp: "新生児のお世話は大変です",
		kana: "しんせいじのおせわはたいへんです",
		romaji: "shinseijinosewawtaihedessu",
	},
	{
		jp: "ベビー用品をそろえました",
		kana: "ベビーようひんをそろえました",
		romaji: "bebīyouhinwosorowemashita",
	},
	{
		jp: "赤ちゃんを抱っこします",
		kana: "あかちゃんをだっこします",
		romaji: "akachantawoddakkoshimasu",
	},
	{
		jp: "授乳クッションが役に立ちます",
		kana: "じゅにゅうクッションがやくにたちます",
		romaji: "junyuukusshongayakunitachimasu",
	},
	{
		jp: "おしめが必要です",
		kana: "おしめがひつようです",
		romaji: "oshimgahitsyoudesu",
	},
	{
		jp: "ベビー湿疹が出ました",
		kana: "ベビーしっしんがでました",
		romaji: "bebīshshingademasita",
	},
	{
		jp: "子どもと図書館に行きました",
		kana: "こどもととしょかんにいきました",
		romaji: "kodomototosyokanniikimashita",
	},
	{
		jp: "読書の時間を大事にします",
		kana: "どくしょのじかんをたいじにします",
		romaji: "dokushonojikantaidajinishimasu",
	},
	{
		jp: "子どもの質問に答えます",
		kana: "こどものしつもんにこたえます",
		romaji: "kodomononshitsumonnikotaemasu",
	},
	{
		jp: "将来の夢を聞きました",
		kana: "しょうらいのゆめをききました",
		romaji: "shouorainoyumewokikimashita",
	},
	{
		jp: "子どもは成長が早いです",
		kana: "こどもはせいちょうがはやいです",
		romaji: "kodomowaseichougahayaidessu",
	},
	{
		jp: "毎日成長を感じます",
		kana: "まいにちせいちょうをかんじます",
		romaji: "mainichiseichouwokanjimasu",
	},
	{
		jp: "手を繋いで歩きます",
		kana: "てをつないであるきます",
		romaji: "tewtsunaideikimasu",
	},
	{
		jp: "親子で図工をしました",
		kana: "おやこでずこうをしました",
		romaji: "oyakodezukowoshimashita",
	},
	{
		jp: "体操着に着替えます",
		kana: "たいそうぎにきがえます",
		romaji: "taisouginikinagaemasu",
	},
	{
		jp: "三輪車に乗っています",
		kana: "さんりんしゃにのっています",
		romaji: "sanrinshaninotteimasu",
	},
	{
		jp: "自転車を練習しています",
		kana: "じてんしゃをれんしゅうしています",
		romaji: "jitenshawurennshuushiteimasu",
	},
	{
		jp: "タッチペンで遊びます",
		kana: "タッチペンであそびます",
		romaji: "tacchipendeasobimasu",
	},
	{
		jp: "子どもが字を書きました",
		kana: "こどもがじをかきました",
		romaji: "kodomogajiwokakimashita",
	},
	{
		jp: "数字を覚えました",
		kana: "すうじをおぼえました",
		romaji: "suujiwooboemaswshita",
	},
	{
		jp: "いろいろな色を教えます",
		kana: "いろいろないろをおしえます",
		romaji: "iroironairowooshiemasu",
	},
	{
		jp: "動物園に行きたいです",
		kana: "どうぶつえんにいきたいです",
		romaji: "doubutsuwuennikitaidessu",
	},
	{
		jp: "パンダを見に行きました",
		kana: "パンダをみにいきました",
		romaji: "pandawominnikimashita",
	},
	{
		jp: "水族館は子どもが喜びます",
		kana: "すいぞくかんはこどもがよろこびます",
		romaji: "suizokuwankodomagoyorokobuimasu",
	},
	{
		jp: "子どもの友達が遊びに来ました",
		kana: "こどものともだちがあそびにきました",
		romaji: "kodomonetomodachigaasobinnikimashita",
	},
	{
		jp: "誕生日パーティーをします",
		kana: "たんじょうびパーティーをします",
		romaji: "tanjoubipatīwoshimasu",
	},
	{
		jp: "ケーキを焼きました",
		kana: "ケーキをやきました",
		romaji: "kēkiwoyakimashita",
	},
	{
		jp: "プレゼントを用意しました",
		kana: "プレゼントをようういしました",
		romaji: "purezentowuyouishimashita",
	},
	{
		jp: "お正月は家族で過ごします",
		kana: "おしょうがつはかぞくですごします",
		romaji: "oshougatswukkazokudesugoshimasu",
	},
	{
		jp: "お盆は帰省します",
		kana: "おぼんはきせいします",
		romaji: "obonwakiseishimasu",
	},
	{
		jp: "クリスマスは特別です",
		kana: "クリスマスはとくべつです",
		romaji: "kurisumswatokubetsudessuu",
	},
	{
		jp: "七夕で願い事をします",
		kana: "たなばたでねがいごとをします",
		romaji: "tanabatadenegaigotowoshimasu",
	},
	{
		jp: "お雛祭りです",
		kana: "おひなまつりです",
		romaji: "ohinamatsuridesu",
	},
	{
		jp: "こどもの日にこいのぼり",
		kana: "こどものひにこいのぼり",
		romaji: "kodomonehinokoínobori",
	},
	{
		jp: "親子で運動を楽しみます",
		kana: "おやこでうんどうをたのしみます",
		romaji: "oyakodeundowutanoshimasu",
	},
	{
		jp: "子どもが得意なことがあります",
		kana: "こどもがとくいなことがあります",
		romaji: "kodomogatokuitonakotagaarimasu",
	},
	{
		jp: "サッカー教室に通ります",
		kana: "サッカーきょうしつにかよります",
		romaji: "sakkākyoushitsunitokayomasu",
	},
	{
		jp: "ピアノレッスンを受けています",
		kana: "ピアノレッスンをうけています",
		romaji: "pianoretssonwouketeimasuu",
	},
	{
		jp: "水泳教室に行きました",
		kana: "すいえいきょうしつにいきました",
		romaji: "suiekyoushitsuniikimashita",
	},
	{
		jp: "バレエを習っています",
		kana: "バレエをならっています",
		romaji: "bareewonaratteimasu",
	},
	{
		jp: "空手の道着を着ます",
		kana: "からてのどうぎをきます",
		romaji: "karattenodougiwokimasu",
	},
	{
		jp: "子どもが絵を描きました",
		kana: "こどもがえをかきました",
		romaji: "kodomogaewokakimashita",
	},
	{
		jp: "作品を冷蔵庫に貼ります",
		kana: "さくひんをれいぞうこにはります",
		romaji: "sakuhinworeizoukoninharimasu",
	},
	{
		jp: "工作をしました",
		kana: "こうさくをしました",
		romaji: "kosakuwoshimashita",
	},
	{
		jp: "粘土をいじります",
		kana: "ねんどをいじります",
		romaji: "nendowojimasu",
	},
	{
		jp: "クレヨンで描きます",
		kana: "クレヨンでかきます",
		romaji: "kurerontodekakimasu",
	},
	{
		jp: "色鉛筆で塗ります",
		kana: "いろえんぴつでぬります",
		romaji: "iroempitsudenurimasu",
	},
	{
		jp: "子どもとお風呂に入ります",
		kana: "こどもとおふろにはいります",
		romaji: "kodomotoofuronihairimasu",
	},
	{
		jp: "泡でせっけん遊びをします",
		kana: "あわでせっけんあそびをします",
		romaji: "awadesekkenasobiwoshimasu",
	},
	{
		jp: "お湯の温度を確認します",
		kana: "おゆのおんどをかくにんします",
		romaji: "oyunoondowokakuninshimasu",
	},
	{
		jp: "子どもが風邪をひかないようにします",
		kana: "こどもがかぜをひかないようにします",
		romaji: "kodomogakazewohinakanaiyounishimasu",
	},
	{
		jp: "マスクを着けさせます",
		kana: "マスクをつけさせます",
		romaji: "masukuwotsukesasemasu",
	},
	{
		jp: "手洗いうがいをしましょう",
		kana: "てあらいうがいをしましょう",
		romaji: "tearaiugaiwoshimashoo",
	},
	{
		jp: "子どもが病気になってしまった",
		kana: "こどもがびょうきになってしまった",
		romaji: "kodomogabvoukininartteshimatta",
	},
	{
		jp: "病院に連れて行きます",
		kana: "びょういんにつれていきます",
		romaji: "byouinnitureteikimasu",
	},
	{
		jp: "お医者さんが優しいです",
		kana: "おいしゃさんがやさしいです",
		romaji: "oishyasangayashashiidessu",
	},
	{
		jp: "子どもが泣いています",
		kana: "こどもがないています",
		romaji: "kodomoganaitetimasu",
	},
	{
		jp: "注射が怖いです",
		kana: "ちゅうしゃがこわいです",
		romaji: "chuushagakwowaidesu",
	},
	{
		jp: "子どもの様子を見ています",
		kana: "こどもようすをみています",
		romaji: "kodomoyosuowomiteimasu",
	},
	{
		jp: "親として責任があります",
		kana: "おやとしてせきにんがあります",
		romaji: "oyatoshitesekininagaarimasu",
	},
	{
		jp: "子どもの気持ちを理解します",
		kana: "こどものきもちをりかいします",
		romaji: "kodomonekimochiworikaishimasu",
	},
	{
		jp: "安全に気をつけます",
		kana: "あんぜんにきをつけます",
		romaji: "anzennikiwotsukemasu",
	},
	{
		jp: "危機管理が大事です",
		kana: "ききかんりがたいじです",
		romaji: "kikikanrigataijidesu",
	},
	{
		jp: "子どもは元気が一番です",
		kana: "こどもはげんきがいちばんです",
		romaji: "kodomowagenkigaichibandesssu",
	},
	{
		jp: "毎日が子どもとの思い出",
		kana: "まいにちがこどもとのおもいで",
		romaji: "mainichigakodomotonomoide",
	},
	{
		jp: "子育ては人生の宝です",
		kana: "こそだてはじんせいのたからです",
		romaji: "kosodatewajinsenotakaradessu",
	},
	{
		jp: "高速シャッター",
		kana: "こうそくしゃったー",
		romaji: "kosokushattaa",
	},
	{
		jp: "フィルムカメラ",
		kana: "ふぃるむかめら",
		romaji: "fuirumukamera",
	},
	{
		jp: "シャッタースピード",
		kana: "しゃったーすぴーど",
		romaji: "shattaasupiiudo",
	},
	{
		jp: "淡い色合い",
		kana: "あわいいろあい",
		romaji: "awaiiroai",
	},
	{
		jp: "写真展に出品",
		kana: "しゃしんてんにしゅっぴん",
		romaji: "shashintennisyuppin",
	},
	{
		jp: "レタッチが得意",
		kana: "れたっちがとくい",
		romaji: "retatchigokui",
	},
	{
		jp: "結婚式の撮影",
		kana: "けっこんしきのさつえい",
		romaji: "kekkonshikinosatssuei",
	},
	{
		jp: "画像の確認",
		kana: "がぞうのかくにん",
		romaji: "gazoukakinin",
	},
	{
		jp: "フレーミングが大切",
		kana: "ふれーみんぐがたいせつ",
		romaji: "furemingutaitaisetsu",
	},
	{
		jp: "暗くて撮れない",
		kana: "くらくてとれない",
		romaji: "kurakutetorena",
	},
	{
		jp: "家族写真を撮ろう",
		kana: "かぞくしゃしんをとろう",
		romaji: "kazokushashinwutorou",
	},
	{
		jp: "デジタルカメラ",
		kana: "でじたるかめら",
		romaji: "dejitarukamera",
	},
	{
		jp: "色温度を変える",
		kana: "いろおんどをかえる",
		romaji: "iroondowukaeru",
	},
	{
		jp: "写真を編集します",
		kana: "しゃしんをへんしゅくします",
		romaji: "shashinwohenshukusimasu",
	},
	{
		jp: "交換レンズが多い",
		kana: "こうかんれんずがおおい",
		romaji: "koukanrenzugaoo",
	},
	{
		jp: "センスを磨く",
		kana: "せんすをみがく",
		romaji: "sensuwomigaku",
	},
	{
		jp: "レンズカバー",
		kana: "れんずかばー",
		romaji: "renzukabaa",
	},
	{
		jp: "露出計を使う",
		kana: "ろしゅつけいをつかう",
		romaji: "roshutsukeiwotsukau",
	},
	{
		jp: "独自のスタイル",
		kana: "どくじのすたいる",
		romaji: "dokujinosutairu",
	},
	{
		jp: "パースペクティブ",
		kana: "ぱーすぺくてぃぶ",
		romaji: "paasupekuvu",
	},
	{
		jp: "画面構成を整える",
		kana: "がめんこうせいをととのえる",
		romaji: "gamenkouseiwutotonoeru",
	},
	{
		jp: "露出補正をする",
		kana: "ろしゅつほせいをする",
		romaji: "roshutsuhoseiwusuru",
	},
	{
		jp: "写真が退屈だ",
		kana: "しゃしんがたいくつだ",
		romaji: "shashingataikutsuda",
	},
	{
		jp: "夜景をカメラに収める",
		kana: "やけいをかめらにおさめる",
		romaji: "yakeiowukaraniniosaru",
	},
	{
		jp: "色彩感覚が鋭い",
		kana: "しょくさいかんかくがするどい",
		romaji: "shokusaikankakugasuroi",
	},
	{
		jp: "コントラストを上げる",
		kana: "こんとらすとをあげる",
		romaji: "kontourasutowuageru",
	},
	{
		jp: "データが消える",
		kana: "でーたがきえる",
		romaji: "dataagakieru",
	},
	{
		jp: "自分らしい作品",
		kana: "じぶんらしいさくひん",
		romaji: "jibunrashiiskuhin",
	},
	{
		jp: "絞りを開く",
		kana: "しぼりをひらく",
		romaji: "shiboliwuhiraku",
	},
	{
		jp: "写真集を見ます",
		kana: "しゃしんしゅうをみます",
		romaji: "shashinshuuruwomimasu",
	},
	{
		jp: "シャープネスを調整",
		kana: "しゃーぷねすをちょうせい",
		romaji: "syapunesuwutyousei",
	},
	{
		jp: "フォーカスを固定する",
		kana: "ふぉーかすをこていする",
		romaji: "fokasuwuotisuru",
	},
	{
		jp: "創造性を発揮する",
		kana: "そうぞうせいをはっきする",
		romaji: "souzouseiwuhakkisuru",
	},
	{
		jp: "ブラシで塗ります",
		kana: "ぶらしでぬります",
		romaji: "burashidenurimasu",
	},
	{
		jp: "彩度を変える",
		kana: "さいどをかえる",
		romaji: "saidowukaeru",
	},
	{
		jp: "背景がぼけた",
		kana: "はいけいがぼけた",
		romaji: "haikeiigaboketa",
	},
	{
		jp: "証明用の写真",
		kana: "しょうめいようのしゃしん",
		romaji: "shoomeiyounonoshashin",
	},
	{
		jp: "動画も撮影可能",
		kana: "どうがもさつえいかのう",
		romaji: "douamosatsueikanou",
	},
	{
		jp: "成人式の写真撮影",
		kana: "せいじんしきのしゃしんさつえい",
		romaji: "seijinshikinoshashinatsue",
	},
	{
		jp: "ズーム機能が便利だ",
		kana: "ずーむきのうがべんりだ",
		romaji: "zuumukiounugabendirida",
	},
	{
		jp: "スタジオ撮影",
		kana: "すたじおさつえい",
		romaji: "sutajiosatssuei",
	},
	{
		jp: "芸術的な写真",
		kana: "げいじゅつてきなしゃしん",
		romaji: "geijutsutekninashashin",
	},
	{
		jp: "ミラーレスカメラ",
		kana: "ぐみらーれすかめら",
		romaji: "gumiraresakamera",
	},
	{
		jp: "受賞を目指す",
		kana: "じゅしょうをめざす",
		romaji: "jushouworiezasu",
	},
	{
		jp: "海の風景を描く",
		kana: "うみのふうけいをかく",
		romaji: "uminofuukeiwokaku",
	},
	{
		jp: "オリジナリティ",
		kana: "おりじなりてぃ",
		romaji: "orijinarti",
	},
	{
		jp: "三脚を持ち運ぶ",
		kana: "さんきゃくをもちはこぶ",
		romaji: "sankyakuwumochihakubu",
	},
	{
		jp: "撮影許可を得る",
		kana: "さつえいきょかをえる",
		romaji: "satsuekyokawoeru",
	},
	{
		jp: "ブロワーで吹く",
		kana: "ぶろわーでふく",
		romaji: "burowaawdefuku",
	},
	{
		jp: "チューニングが必要",
		kana: "ちゅーにんぐがひつよう",
		romaji: "tyuuningugahitsuyou",
	},
	{
		jp: "濃い色で塗る",
		kana: "こいいろでぬる",
		romaji: "koiirodenuru",
	},
	{
		jp: "被写界深度が浅い",
		kana: "ひしゃかいしんどがあさい",
		romaji: "hishakaishindogaasa",
	},
	{
		jp: "撮影が難しい",
		kana: "さつえいがむずかしい",
		romaji: "satsueigamuuzukashi",
	},
	{
		jp: "前撮りをします",
		kana: "まえどりをします",
		romaji: "maeudoriowusimasu",
	},
	{
		jp: "風景写真家です",
		kana: "ふうけいしゃしんかです",
		romaji: "fuukeishashinkadesu",
	},
	{
		jp: "ドキュメンタリー写真",
		kana: "どきゅめんたりーしゃしん",
		romaji: "dokyumenntarshashn",
	},
	{
		jp: "スマートフォンで撮影",
		kana: "すまーとふぉんでさつえい",
		romaji: "sumaatufonudesatssuei",
	},
	{
		jp: "バウンスをする",
		kana: "ばうんすをする",
		romaji: "baunuwusuru",
	},
	{
		jp: "キャンバスを広げる",
		kana: "きゃんばすをひろげる",
		romaji: "kyanbuwuhiroru",
	},
	{
		jp: "メモリーカードを入れる",
		kana: "めもりーかーどをいれる",
		romaji: "memorikkaardowuirru",
	},
	{
		jp: "明るさを調整",
		kana: "あかるさをちょうせい",
		romaji: "akarmasawutyousei",
	},
	{
		jp: "プロになりたい",
		kana: "ぷろになりたい",
		romaji: "puroninariai",
	},
	{
		jp: "バッテリーを充電",
		kana: "ばってりーをじゅうでん",
		romaji: "bateriwujuuden",
	},
	{
		jp: "子どもたちを撮る",
		kana: "こどもたちをとる",
		romaji: "kodomotachiwutoru",
	},
	{
		jp: "山々を描く",
		kana: "やまやまをかく",
		romaji: "yamamawokaku",
	},
	{
		jp: "標準レンズ",
		kana: "ひょうじゅんれんず",
		romaji: "hyoujunrenzu",
	},
	{
		jp: "レンズをきれいにします",
		kana: "れんずをきれいにします",
		romaji: "renzuwokireeniisimasu",
	},
	{
		jp: "広角レンズ",
		kana: "こうかくれんず",
		romaji: "koukakurenzu",
	},
	{
		jp: "綺麗な写真だね",
		kana: "きれいなしゃしんだね",
		romaji: "kireenashashinadane",
	},
	{
		jp: "旅行で風景撮影",
		kana: "りょこうでふうけいさつえい",
		romaji: "ryokouwdefuukeisatsue",
	},
	{
		jp: "川の流れを表現",
		kana: "かわながれをひょうげん",
		romaji: "kawanagarewhyougen",
	},
	{
		jp: "レンズを拭く",
		kana: "れんずをふく",
		romaji: "renzuwufuku",
	},
	{
		jp: "三脚を使う",
		kana: "さんきゃくをつかう",
		romaji: "sankyakuwutsukau",
	},
	{
		jp: "フラッシュが飛ぶ",
		kana: "ふらっしゅがとぶ",
		romaji: "furasshugtobu",
	},
	{
		jp: "背景をセットアップ",
		kana: "はいけいをせっとあっぷ",
		romaji: "haikeiwosettopu",
	},
	{
		jp: "食べ物を美しく撮影",
		kana: "たべものをうつくしくさつえい",
		romaji: "tabemonowuutsukushikusatssuei",
	},
	{
		jp: "写真グループ",
		kana: "しゃしんぐるーぷ",
		romaji: "shashin",
	},
	{
		jp: "ペットの写真",
		kana: "ぺっとのしゃしん",
		romaji: "pettounoshashin",
	},
	{
		jp: "パレットに出す",
		kana: "ぱれっとにだす",
		romaji: "parettunidasu",
	},
	{
		jp: "露出を調整する",
		kana: "ろしゅつをちょうせいする",
		romaji: "roshutsuwutyousseisuru",
	},
	{
		jp: "対称性を意識する",
		kana: "たいしょうせいをいしきする",
		romaji: "taishouseiwuisuru",
	},
	{
		jp: "プレビュー機能",
		kana: "ぷれびゅーきのう",
		romaji: "purebyukinou",
	},
	{
		jp: "感情を表現する",
		kana: "かんじょうをひょうげんする",
		romaji: "kanjoowuhyougensuru",
	},
	{
		jp: "余白を活かす",
		kana: "よはくをいかす",
		romaji: "yohakuwuikasu",
	},
	{
		jp: "運動会を撮影する",
		kana: "うんどうかいをさつえいする",
		romaji: "undoukaiwusatsusieru",
	},
	{
		jp: "アート写真を目指す",
		kana: "あーとしゃしんをめざす",
		romaji: "aatoshashnwumezasu",
	},
	{
		jp: "長時間露出",
		kana: "ちょうじかんろしゅつ",
		romaji: "choujikanrosyutsu",
	},
	{
		jp: "フッド付きレンズ",
		kana: "ふっどつきれんず",
		romaji: "fudotsukirenzu",
	},
	{
		jp: "黄金比の構図",
		kana: "おうごんひのこうず",
		romaji: "oogonhiinokouzu",
	},
	{
		jp: "毎日写真を撮る",
		kana: "まいにちしゃしんをとる",
		romaji: "mainichishashinwutoru",
	},
	{
		jp: "手ぶれが多い",
		kana: "てぶれがおおい",
		romaji: "teburegaoo",
	},
	{
		jp: "リフレクター",
		kana: "りふれくたー",
		romaji: "rifurekutaa",
	},
	{
		jp: "新しい技法を学ぶ",
		kana: "あたらしいぎほうをまなぶ",
		romaji: "atarashiigihouwoab",
	},
	{
		jp: "色を混ぜる",
		kana: "いろをまぜる",
		romaji: "irowumazeru",
	},
	{
		jp: "静物画が好き",
		kana: "せいぶつががすき",
		romaji: "seibutsuaaga",
	},
	{
		jp: "被写界深度を工夫",
		kana: "ひしゃかいしんどをくふう",
		romaji: "hishakaishindowukufuu",
	},
	{
		jp: "ストラップを付ける",
		kana: "すとらっぷをつける",
		romaji: "sutorapupwutsukeru",
	},
	{
		jp: "ディフューザー",
		kana: "でぃふゅーざー",
		romaji: "difyuza",
	},
	{
		jp: "ポートレート撮影",
		kana: "ぽーとれーとさつえい",
		romaji: "poteetosatsue",
	},
	{
		jp: "自然光を活かす",
		kana: "しぜんこうをいかす",
		romaji: "shizenkouwuikasu",
	},
	{
		jp: "再度撮影します",
		kana: "さいどさつえいします",
		romaji: "saidosatsueisimasu",
	},
	{
		jp: "絵具の臭いが好き",
		kana: "えぐのにおいがすき",
		romaji: "egunonioiga",
	},
	{
		jp: "フォトコンテスト",
		kana: "ふぉとこんてすと",
		romaji: "fotokontesuto",
	},
	{
		jp: "プロの写真家",
		kana: "ぷろのしゃしんか",
		romaji: "puronoshasinjnka",
	},
	{
		jp: "花のアップ撮影",
		kana: "はなのあっぷさつえい",
		romaji: "hananoappusatssuei",
	},
	{
		jp: "画像処理ソフト",
		kana: "がぞうしょりそふと",
		romaji: "gazousyorisofuto",
	},
	{
		jp: "白黒写真に変換",
		kana: "はっこくしゃしんにへんかん",
		romaji: "hakkokushashinnihnkan",
	},
	{
		jp: "下地を塗ります",
		kana: "したじをぬります",
		romaji: "shitajiwonurimasu",
	},
	{
		jp: "マニアックな写真",
		kana: "まにあっくなしゃしん",
		romaji: "maniakkushashin",
	},
	{
		jp: "カメラが欲しいです",
		kana: "かめらがほしいです",
		romaji: "kameraagahoshiidesu",
	},
	{
		jp: "一眼レフカメラです",
		kana: "いちがんれふかめらです",
		romaji: "ichiganrefukameradesuu",
	},
	{
		jp: "講師になる",
		kana: "こうしになる",
		romaji: "koushininru",
	},
	{
		jp: "絵を描きます",
		kana: "えをかきます",
		romaji: "ewokakimasu",
	},
	{
		jp: "証明写真を撮る",
		kana: "しょうめいしゃしんをとる",
		romaji: "shoomeishashinwutoru",
	},
	{
		jp: "モノクロ写真が好き",
		kana: "ものくろしゃしんがすき",
		romaji: "monokuroshashinga",
	},
	{
		jp: "モデルと相談",
		kana: "もでるとそうだん",
		romaji: "moderutosodan",
	},
	{
		jp: "カメラの歴史を学ぶ",
		kana: "かめらのれきしをまなぶ",
		romaji: "kamerarekishiwomanbu",
	},
	{
		jp: "センサーをクリーニング",
		kana: "せんさーをくりーにんぐ",
		romaji: "sensaawukureniingu",
	},
	{
		jp: "ホワイトバランスを変更",
		kana: "ほわいとばらんすをへんこう",
		romaji: "howaitobaransuwohenkou",
	},
	{
		jp: "ビューティーライト",
		kana: "びゅーてぃーらいと",
		romaji: "byuutiraito",
	},
	{
		jp: "上手く撮れない",
		kana: "じょうずくとれない",
		romaji: "jouzukutorena",
	},
	{
		jp: "著作権を守る",
		kana: "ちょさくけんをまもる",
		romaji: "chossakukenwomaoru",
	},
	{
		jp: "露出の失敗",
		kana: "ろしゅつのしっぱい",
		romaji: "roshutsunoshippai",
	},
	{
		jp: "カメラバッグ",
		kana: "かめらばっぐ",
		romaji: "kamerabage",
	},
	{
		jp: "光源を工夫する",
		kana: "こうげんをくふうする",
		romaji: "kougenwukufuusuru",
	},
	{
		jp: "衣装を選ぶ",
		kana: "いしょうをえらぶ",
		romaji: "isyouwuerabu",
	},
	{
		jp: "シャッターを押す",
		kana: "しゃったーをおす",
		romaji: "shattaawuosu",
	},
	{
		jp: "望遠レンズ",
		kana: "ぼうえんれんず",
		romaji: "bouenrenzu",
	},
	{
		jp: "クリーニングキット",
		kana: "くりーにんぐきっと",
		romaji: "kuriniingukitto",
	},
	{
		jp: "筆を洗う",
		kana: "ふでをあらう",
		romaji: "fudewuarau",
	},
	{
		jp: "キャッチライト",
		kana: "きゃっちらいと",
		romaji: "kyatchiraito",
	},
	{
		jp: "スナップ写真",
		kana: "すなっぷしゃしん",
		romaji: "sunappshashin",
	},
	{
		jp: "作品集を制作",
		kana: "さくひんしゅうをせいさく",
		romaji: "sakuhinshuuwosequsaku",
	},
	{
		jp: "風景画を制作",
		kana: "ふうけいがをせいさく",
		romaji: "fuukeigawosequsaku",
	},
	{
		jp: "風景を撮ります",
		kana: "ふうけいをとります",
		romaji: "fuukeiwuotorimasu",
	},
	{
		jp: "撮影ロケーション",
		kana: "さつえいろけーしょん",
		romaji: "satsueirokeesyoN",
	},
	{
		jp: "ケルビン数を調整",
		kana: "けるびんすうをちょうせい",
		romaji: "kerubinsuwoutyousei",
	},
	{
		jp: "光と陰を表現",
		kana: "ひかりとかげをひょうげん",
		romaji: "hikaritokagewhyougen",
	},
	{
		jp: "撮影範囲を広げる",
		kana: "さつえいはんいをひろげる",
		romaji: "satsueihaniiwohiroeru",
	},
	{
		jp: "誕生日パーティーの写真",
		kana: "たんじょうびぱーてぃーのしゃしん",
		romaji: "tanjoubipanoshashin",
	},
	{
		jp: "動物画を描く",
		kana: "どうぶつがをかく",
		romaji: "dobutsuagawokaku",
	},
	{
		jp: "深度感を出す",
		kana: "しんどかんをだす",
		romaji: "shindokanwudasu",
	},
	{
		jp: "ピントが合わない",
		kana: "ぴんとがあわない",
		romaji: "pintogaaawanai",
	},
	{
		jp: "逆光で撮影する",
		kana: "ぎゃくこうでさつえいする",
		romaji: "gyakukowdesatsusei",
	},
	{
		jp: "卒業式を記録する",
		kana: "そつぎょうしきをきろくする",
		romaji: "sotsugyoushikiwokirokusuru",
	},
	{
		jp: "写真教室に通う",
		kana: "しゃしんきょうしつにかよう",
		romaji: "shashinkyoushitsunikayou",
	},
	{
		jp: "作品を評価してもらう",
		kana: "さくひんをひょうかしてもらう",
		romaji: "sakuhinwohyoukashitemora",
	},
	{
		jp: "インスピレーション",
		kana: "いんすぴれーしょん",
		romaji: "insupireesyoN",
	},
	{
		jp: "完成度が高い",
		kana: "かんせいどがたかい",
		romaji: "kanseidogtakai",
	},
	{
		jp: "写真技法書を読む",
		kana: "しゃしんぎほうしょをよむ",
		romaji: "shashingihoushowoyomu",
	},
	{
		jp: "ISO感度を変えます",
		kana: "あいえすおーかんどをかえます",
		romaji: "aiesesuookanduowukaemasu",
	},
	{
		jp: "グラデーションを描く",
		kana: "ぐらでーしょんをかく",
		romaji: "guradesyonwukaku",
	},
	{
		jp: "トリミングをする",
		kana: "とりみんぐをする",
		romaji: "toriminguwusuru",
	},
	{
		jp: "透明感を出す",
		kana: "とうめいかんをだす",
		romaji: "toumikanwudasu",
	},
	{
		jp: "絞りをF2.8に設定",
		kana: "しぼりをえふにーてんはちにせってい",
		romaji: "shiborwuefunitenhachisetti",
	},
	{
		jp: "レンズが曇る",
		kana: "れんずがくもる",
		romaji: "renzugakumoru",
	},
	{
		jp: "防湿庫を使う",
		kana: "ぼうしつこをつかう",
		romaji: "boushitsukowutsukau",
	},
	{
		jp: "撮影技術を向上させる",
		kana: "さつえいぎじゅつをこうじょうさせる",
		romaji: "satsueigijutsuwokoujousaseru",
	},
	{
		jp: "七五三の撮影",
		kana: "しちごさんのさつえい",
		romaji: "shichigosannnosatsue",
	},
	{
		jp: "花卉画が得意",
		kana: "かきががとくい",
		romaji: "kakigagatoku",
	},
	{
		jp: "光と影が綺麗",
		kana: "ひかりとかげがきれい",
		romaji: "hikaritokagegakiree",
	},
	{
		jp: "個性的な作品",
		kana: "こせいてきなさくひん",
		romaji: "koseitekisnasakuhin",
	},
	{
		jp: "被写体モデル",
		kana: "ひしゃたいもでる",
		romaji: "hishataimoderu",
	},
	{
		jp: "マニュアルモード",
		kana: "まにゅあるもーど",
		romaji: "manyuarumuudu",
	},
	{
		jp: "撮影会に参加",
		kana: "さつえいかいにさんか",
		romaji: "satsueikainisanka",
	},
	{
		jp: "人物写真が好きです",
		kana: "じんぶつしゃしんがすきです",
		romaji: "jinbutsushashingasudesu",
	},
	{
		jp: "フラッシュが眩しい",
		kana: "ふらっしゅがまぶしい",
		romaji: "furasshugamabushii",
	},
	{
		jp: "抽象画を描く",
		kana: "ちゅうしょうがをかく",
		romaji: "chuushougawokaku",
	},
	{
		jp: "オートフォーカス",
		kana: "おーとふぉーかす",
		romaji: "ootufookasu",
	},
	{
		jp: "照明を調整する",
		kana: "しょうめいをちょうせいする",
		romaji: "syomeiwoutyousisuru",
	},
	{
		jp: "ヘアメイクをする",
		kana: "へあめいくをする",
		romaji: "heameikuwusuru",
	},
	{
		jp: "ピントを合わせます",
		kana: "ぴんとをあわせます",
		romaji: "pintowuawasemasu",
	},
	{
		jp: "ノイズを除去する",
		kana: "のいずをじょきょする",
		romaji: "noizuwujokyosuru",
	},
	{
		jp: "美しさを追求する",
		kana: "うつくしさをついきゅうする",
		romaji: "utsukushisawutsuikyuusuru",
	},
	{
		jp: "視線の流れ",
		kana: "しせんのながれ",
		romaji: "shisennonagare",
	},
	{
		jp: "肖像画です",
		kana: "しょうぞうがです",
		romaji: "shouzougadesu",
	},
	{
		jp: "陰影表現を極める",
		kana: "いんえいひょうげんをきわめる",
		romaji: "ineihyougenwukiwameru",
	},
	{
		jp: "ソフトボックス",
		kana: "そふとぼっくす",
		romaji: "sofutobokukusu",
	},
	{
		jp: "立体感を工夫",
		kana: "りったいかんをくふう",
		romaji: "rittaikanwokufuu",
	},
	{
		jp: "人物画を描く",
		kana: "じんぶつがをかく",
		romaji: "jinbutsugawokaku",
	},
	{
		jp: "入学式を撮る",
		kana: "にゅうがくしきをとる",
		romaji: "nyuugakushikiwotoru",
	},
	{
		jp: "腕を磨く",
		kana: "うでをみがく",
		romaji: "udewomigaku",
	},
	{
		jp: "グレーカードを使用",
		kana: "ぐれーかーどをしよう",
		romaji: "gurekaardowushiyou",
	},
	{
		jp: "フィルターを使う",
		kana: "ふぃるたーをつかう",
		romaji: "fuirtaawutsukau",
	},
	{
		jp: "水彩画を楽しむ",
		kana: "すいさいがをたのしむ",
		romaji: "suisaigawutanoshimu",
	},
	{
		jp: "ホワイトバランス",
		kana: "ほわいとばらんす",
		romaji: "howaitobaransu",
	},
	{
		jp: "テクスチャーを付ける",
		kana: "てくすちゃーをつける",
		romaji: "tekusutyaawutsukeru",
	},
	{
		jp: "アクリル絵の具",
		kana: "あくりるえのぐ",
		romaji: "akurilunogu",
	},
	{
		jp: "フィルムが必要です",
		kana: "ふぃるむがひつようです",
		romaji: "fuirumugahitsuyoudesu",
	},
	{
		jp: "インスタグラム",
		kana: "いんすたぐらむ",
		romaji: "insutaguamu",
	},
	{
		jp: "表現力を高める",
		kana: "ひょうげんりょくをたかめる",
		romaji: "hyougenyokuwotakameru",
	},
	{
		jp: "素描をする",
		kana: "そびょうをする",
		romaji: "sobyouwusuru",
	},
	{
		jp: "日常の美を撮る",
		kana: "にちじょうのうつくしさをとる",
		romaji: "nichijounoutsukushisawutoru",
	},
	{
		jp: "マクロレンズ",
		kana: "まくろれんず",
		romaji: "makurorenzu",
	},
	{
		jp: "油絵が得意です",
		kana: "あぶらえがとくいです",
		romaji: "aburaeggatokuidesu",
	},
	{
		jp: "芸術的価値",
		kana: "げいじゅつてきかち",
		romaji: "geijutsutekikachi",
	},
	{
		jp: "定期的にメンテ",
		kana: "ていきてきにめんて",
		romaji: "teikitekinin",
	},
	{
		jp: "花が咲きました。",
		kana: "はながさきました",
		romaji: "hanagasakimashita",
	},
	{
		jp: "庭に木を植えた。",
		kana: "にわにきをうえた",
		romaji: "niwanikiwoeta",
	},
	{
		jp: "毎日水をやります。",
		kana: "まいにちみずをやります",
		romaji: "mainichimizuwoyarimasu",
	},
	{
		jp: "バラが美しい。",
		kana: "ばらがうつくしい",
		romaji: "baragutsukushii",
	},
	{
		jp: "ひまわりが大好き。",
		kana: "ひまわりがだいすき",
		romaji: "himawarigadaisuki",
	},
	{
		jp: "チューリップは春だ。",
		kana: "ちゅーりっぷははるだ",
		romaji: "chuurippuhaharuda",
	},
	{
		jp: "菊が咲いている。",
		kana: "きくがさいている",
		romaji: "kikugasaiteiru",
	},
	{
		jp: "庭は広い。",
		kana: "にわはひろい",
		romaji: "niwahahiroi",
	},
	{
		jp: "種をまいた。",
		kana: "たねをまいた",
		romaji: "tanewomaita",
	},
	{
		jp: "草を抜く。",
		kana: "くさをぬく",
		romaji: "kusawonuku",
	},
	{
		jp: "肥料を与える。",
		kana: "ひりょうをあたえる",
		romaji: "hiryouwoataeru",
	},
	{
		jp: "花瓶に活ける。",
		kana: "かびんにいける",
		romaji: "kabinniiikeru",
	},
	{
		jp: "花束をもらった。",
		kana: "はなたばをもらった",
		romaji: "hanatabawomoiratta",
	},
	{
		jp: "アイビーは育てやすい。",
		kana: "あいびーはそだてやすい",
		romaji: "aibiihasodateyasui",
	},
	{
		jp: "室内植物が好き。",
		kana: "しつないしょくぶつがすき",
		romaji: "shitsunaishoukubutsugasuki",
	},
	{
		jp: "ベランダで花を育てる。",
		kana: "べらんだではなをそだてる",
		romaji: "berandahahanawosodateru",
	},
	{
		jp: "トマトを栽培している。",
		kana: "ともとをさいばいしている",
		romaji: "tomatowosaibaisiteiru",
	},
	{
		jp: "キュウリも育てたい。",
		kana: "きゅうりもそだてたい",
		romaji: "kyuuriomosodatetai",
	},
	{
		jp: "ナスの花が咲いた。",
		kana: "なすのはながさいた",
		romaji: "nasunohanagasaita",
	},
	{
		jp: "スイカを育てる。",
		kana: "すいかをそだてる",
		romaji: "suikawosodateru",
	},
	{
		jp: "メロン栽培は難しい。",
		kana: "めろんさいばいはむずかしい",
		romaji: "meronnsaibaihamuzkashii",
	},
	{
		jp: "スイセンが咲いた。",
		kana: "すいせんがさいた",
		romaji: "suisengasaita",
	},
	{
		jp: "牡丹は豪華だ。",
		kana: "ぼたんはごうかだ",
		romaji: "botanhagoukada",
	},
	{
		jp: "藤の花が美しい。",
		kana: "ふじのはながうつくしい",
		romaji: "fujinohanagutsukushii",
	},
	{
		jp: "梅の季節だ。",
		kana: "うめのきせつだ",
		romaji: "umenokisetsuda",
	},
	{
		jp: "桜は日本の象徴。",
		kana: "さくらはにほんのしょうちょう",
		romaji: "sakurahanihonnoshouchou",
	},
	{
		jp: "紫陽花が好き。",
		kana: "しゅうようかがすき",
		romaji: "shuuyoukagasuki",
	},
	{
		jp: "デイジーが元気。",
		kana: "でいじーがげんき",
		romaji: "deijiihagenki",
	},
	{
		jp: "ガーベラは明るい。",
		kana: "がーべらはあかるい",
		romaji: "gaaberahkakaruii",
	},
	{
		jp: "ユリが香っている。",
		kana: "ゆりがかおっている",
		romaji: "yurigakaoxtteiru",
	},
	{
		jp: "蘭は高級な花。",
		kana: "らんはこうきゅうなはな",
		romaji: "ranhakoukuunnnahana",
	},
	{
		jp: "オーキッドを育てる。",
		kana: "おーきっどをそだてる",
		romaji: "oakkidowosodateru",
	},
	{
		jp: "ハイビスカスは南国。",
		kana: "はいびすかすはなんこく",
		romaji: "haibisukasuhannnnnkoku",
	},
	{
		jp: "アザレアは春。",
		kana: "あざれあははる",
		romaji: "azareahahaaru",
	},
	{
		jp: "カーネーションをあげた。",
		kana: "かーねーしょんをあげた",
		romaji: "kaannshelyonwoageta",
	},
	{
		jp: "ダリアは大輪。",
		kana: "だりあはたいりん",
		romaji: "dariahhataiirinn",
	},
	{
		jp: "フリージアの香り。",
		kana: "ふりーじあのかおり",
		romaji: "furijianonokawori",
	},
	{
		jp: "アネモネが咲いた。",
		kana: "あねもねがさいた",
		romaji: "anemonnegasaita",
	},
	{
		jp: "パンジーは冬。",
		kana: "ぱんじーはふゆ",
		romaji: "panjiihahuyu",
	},
	{
		jp: "ビオラを育てる。",
		kana: "びおらをそだてる",
		romaji: "biorrawosodateru",
	},
	{
		jp: "ストック咲いた。",
		kana: "すとっくさいた",
		romaji: "sutokusaita",
	},
	{
		jp: "スナップドラゴン。",
		kana: "すなっぷどらごん",
		romaji: "sunapudoragon",
	},
	{
		jp: "ポピーは赤い。",
		kana: "ぽぴーはあかい",
		romaji: "popiihakaai",
	},
	{
		jp: "マーガレット咲く。",
		kana: "まーがれっとさく",
		romaji: "maagaretotsaku",
	},
	{
		jp: "ダイアンサスの香り。",
		kana: "だいあんさすのかおり",
		romaji: "daiansausunonokawori",
	},
	{
		jp: "ミルトルが咲く。",
		kana: "みるとるがさく",
		romaji: "mirutorugasaku",
	},
	{
		jp: "シンビジウム育てる。",
		kana: "しんびじうむそだてる",
		romaji: "shinbijumusodateru",
	},
	{
		jp: "フウセンカズラ。",
		kana: "ふうせんかずら",
		romaji: "fuusenkazura",
	},
	{
		jp: "ムスカリ咲く。",
		kana: "むすかりさく",
		romaji: "muskarisaku",
	},
	{
		jp: "ワイルドフラワー好き。",
		kana: "わいるどふらわーすき",
		romaji: "wairudofurawasuki",
	},
	{
		jp: "多肉植物を育てる。",
		kana: "たにくしょくぶつをそだてる",
		romaji: "tanikushokubtsuwosodateru",
	},
	{
		jp: "サボテンが育つ。",
		kana: "さぼてんがそだつ",
		romaji: "sabotengasodatsu",
	},
	{
		jp: "アロエベラ育てた。",
		kana: "あろえべらそだてた",
		romaji: "aroebeirasodateta",
	},
	{
		jp: "セダムは丈夫。",
		kana: "せだむはじょうぶ",
		romaji: "sedamuhajobu",
	},
	{
		jp: "エケベリア買った。",
		kana: "えけべりあかった",
		romaji: "ekebeiakatta",
	},
	{
		jp: "ユーフォルビア育つ。",
		kana: "ゆーふぉるびあそだつ",
		romaji: "yuufobiiasodatsu",
	},
	{
		jp: "ハオルチア育てる。",
		kana: "はおるちあそだてる",
		romaji: "haorchiasodateru",
	},
	{
		jp: "ガステリア育つ。",
		kana: "がすてりあそだつ",
		romaji: "gasuteriasodatsu",
	},
	{
		jp: "クラッスラ育てた。",
		kana: "くらっすらそだてた",
		romaji: "kurasusaurasodateta",
	},
	{
		jp: "アエオニウム育つ。",
		kana: "あえおにうむそだつ",
		romaji: "aeoniuimusodatsu",
	},
	{
		jp: "グラプトペタラム。",
		kana: "ぐらぷとぺたらむ",
		romaji: "guraputoopetaramu",
	},
	{
		jp: "エコベリア育てる。",
		kana: "えこべりあそだてる",
		romaji: "ekobeiasodateru",
	},
	{
		jp: "ジェイド育つ。",
		kana: "じぇいどそだつ",
		romaji: "jeidosodatsu",
	},
	{
		jp: "ペペロミア育てた。",
		kana: "ぺぺろみあそだてた",
		romaji: "peperomiasodateta",
	},
	{
		jp: "パキラが育つ。",
		kana: "ぱきらがそだつ",
		romaji: "pakiragasodatsu",
	},
	{
		jp: "ドラセナ育てる。",
		kana: "どらせなそだてる",
		romaji: "dorasenasodateru",
	},
	{
		jp: "モンステラ育った。",
		kana: "もんすてらそだった",
		romaji: "monsuteiasodatta",
	},
	{
		jp: "フィロデンドロン。",
		kana: "ふぃろでんどろん",
		romaji: "firodenndoronn",
	},
	{
		jp: "シンゴニウム育つ。",
		kana: "しんごにうむそだつ",
		romaji: "singoniumusodatsu",
	},
	{
		jp: "アンスリウム育てた。",
		kana: "あんすりうむそだてた",
		romaji: "ansuriumusodateta",
	},
	{
		jp: "スパティフィラム育つ。",
		kana: "すぱてぃふぃらむそだつ",
		romaji: "supatifiramusodatsu",
	},
	{
		jp: "ディフェンバキア育てる。",
		kana: "でぃふぇんばきあそだてる",
		romaji: "difenbakiasodateru",
	},
	{
		jp: "コロカシア育つ。",
		kana: "ころかしあそだつ",
		romaji: "korokashiasodatsu",
	},
	{
		jp: "アロカシア育てた。",
		kana: "あろかしあそだてた",
		romaji: "arokashiasodateta",
	},
	{
		jp: "セドゥムは人気。",
		kana: "せどぅむはにんき",
		romaji: "sedoosuwhaninki",
	},
	{
		jp: "ポトス育つ。",
		kana: "ぽとすそだつ",
		romaji: "pototosusodatsu",
	},
	{
		jp: "テクスチャ育てる。",
		kana: "てくすちゃそだてる",
		romaji: "tekusutchasodateru",
	},
	{
		jp: "ヒポエステス育つ。",
		kana: "ひぽえすてすそだつ",
		romaji: "hipoesutesusodatsu",
	},
	{
		jp: "ネオレゲリア育てた。",
		kana: "ねおれげりあそだてた",
		romaji: "neorregeiasodateta",
	},
	{
		jp: "ティランジア育つ。",
		kana: "てぃらんじあそだつ",
		romaji: "tiranjiasodatsu",
	},
	{
		jp: "エアプランツ育てる。",
		kana: "えあぷらんつそだてる",
		romaji: "eapurantsusodateru",
	},
	{
		jp: "ストレプトカルプス。",
		kana: "すとれぷとかるぷす",
		romaji: "sutoreputokarupusu",
	},
	{
		jp: "グロキシニア育つ。",
		kana: "ぐろきしにあそだつ",
		romaji: "gurokishinasodatsu",
	},
	{
		jp: "アフェランドラ育てた。",
		kana: "あふえらんどらそだてた",
		romaji: "afueiandorasodateta",
	},
	{
		jp: "クロトン育てる。",
		kana: "くろとんそだてる",
		romaji: "kurotonsodateru",
	},
	{
		jp: "ナンテン育つ。",
		kana: "なんてんそだつ",
		romaji: "nantensodatsu",
	},
	{
		jp: "シクラメン育てた。",
		kana: "しくらめんそだてた",
		romaji: "shihuramensodateta",
	},
	{
		jp: "ガジュマル育てる。",
		kana: "がじゅまるそだてる",
		romaji: "gajumarusodateru",
	},
	{
		jp: "ベンジャミン育つ。",
		kana: "べんじゃみんそだつ",
		romaji: "benjaminsodatsu",
	},
	{
		jp: "ゴムの木育てた。",
		kana: "ごむのきそだてた",
		romaji: "gomunonokisodateta",
	},
	{
		jp: "アイビー育てる。",
		kana: "あいびーそだてる",
		romaji: "aibisodateru",
	},
	{
		jp: "ガーランド育つ。",
		kana: "がーらんどそだつ",
		romaji: "gaairandosodatsu",
	},
	{
		jp: "ハンギング育てた。",
		kana: "はんぎんぐそだてた",
		romaji: "hangingusodateta",
	},
	{
		jp: "トレリス立てた。",
		kana: "とれりすたてた",
		romaji: "toirerisutaeta",
	},
	{
		jp: "オベリスク設置。",
		kana: "おべりすくせっち",
		romaji: "obeisusukusetchi",
	},
	{
		jp: "アーチ作った。",
		kana: "あーちつくった",
		romaji: "aachitsukatta",
	},
	{
		jp: "パーゴラ建てた。",
		kana: "ぱーごらたてた",
		romaji: "paagouratatea",
	},
	{
		jp: "ラティス使う。",
		kana: "らてぃすつかう",
		romaji: "ratisutasukau",
	},
	{
		jp: "プランター買った。",
		kana: "ぷらんたーかった",
		romaji: "purantaakatta",
	},
	{
		jp: "鉢植え育てる。",
		kana: "はちうえそだてる",
		romaji: "hachiueffsodateru",
	},
	{
		jp: "盆栽育つ。",
		kana: "ぼんさいそだつ",
		romaji: "bonsaisodatsu",
	},
	{
		jp: "トピアリー作った。",
		kana: "ときゃりーつくった",
		romaji: "tokiariitsukatta",
	},
	{
		jp: "つるバラ育てる。",
		kana: "つるばらそだてる",
		romaji: "tsurubarasodateru",
	},
	{
		jp: "ツタ育つ。",
		kana: "つたそだつ",
		romaji: "tsutasodatsu",
	},
	{
		jp: "ウコギ育てた。",
		kana: "うこぎそだてた",
		romaji: "ukogisodateta",
	},
	{
		jp: "スッポン育てる。",
		kana: "すっぽんそだてる",
		romaji: "supponsodateru",
	},
	{
		jp: "イチジク育つ。",
		kana: "いちじくそだつ",
		romaji: "ichijikusodatsu",
	},
	{
		jp: "ブドウ育てた。",
		kana: "ぶどうそだてた",
		romaji: "budousodateta",
	},
	{
		jp: "キウイ育てる。",
		kana: "きうぃそだてる",
		romaji: "kiuisodateru",
	},
	{
		jp: "アンズ育つ。",
		kana: "あんずそだつ",
		romaji: "anzusodatsu",
	},
	{
		jp: "モモ育てた。",
		kana: "ももそだてた",
		romaji: "momosodateta",
	},
	{
		jp: "ナシ育てる。",
		kana: "なしそだてる",
		romaji: "nashisodateru",
	},
	{
		jp: "リンゴ育つ。",
		kana: "りんごそだつ",
		romaji: "ringosodatsu",
	},
	{
		jp: "ベリー育てた。",
		kana: "べりーそだてた",
		romaji: "beirisodateta",
	},
	{
		jp: "ブルーベリー育てる。",
		kana: "ぶるーべりーそだてる",
		romaji: "burubeirisodateru",
	},
	{
		jp: "ラズベリー育つ。",
		kana: "らずべりーそだつ",
		romaji: "razubeirisodatsu",
	},
	{
		jp: "ゴールデンベリー育てた。",
		kana: "ごーるでんべりーそだてた",
		romaji: "goaurudenbeirisodateta",
	},
	{
		jp: "アロニア育てる。",
		kana: "あろにあそだてる",
		romaji: "aloniasodateru",
	},
	{
		jp: "柿の木育つ。",
		kana: "かきのきそだつ",
		romaji: "kakinonokisodatsu",
	},
	{
		jp: "栗は秋。",
		kana: "くりはあき",
		romaji: "kurihaaki",
	},
	{
		jp: "クルミの木。",
		kana: "くるみのき",
		romaji: "kuruminonoki",
	},
	{
		jp: "銀杏は黄色。",
		kana: "ぎんこうはきいろ",
		romaji: "ginkouhakirou",
	},
	{
		jp: "マロニエ育てた。",
		kana: "まろにえそだてた",
		romaji: "maroniasodateta",
	},
	{
		jp: "プラタナス育てる。",
		kana: "ぷらたなすそだてる",
		romaji: "puratanasusodateru",
	},
	{
		jp: "ニレは高い。",
		kana: "にれはたかい",
		romaji: "nirehhatakkai",
	},
	{
		jp: "トチノキ育つ。",
		kana: "とちのきそだつ",
		romaji: "tochinonokisodatsu",
	},
	{
		jp: "シラカバ育てた。",
		kana: "しらかばそだてた",
		romaji: "shirakabasodateta",
	},
	{
		jp: "ヤマザクラ育てる。",
		kana: "やまざくらそだてる",
		romaji: "yamazakurasodateru",
	},
	{
		jp: "オオシマザクラ。",
		kana: "おおしまざくら",
		romaji: "ooshimazakura",
	},
	{
		jp: "ヤエザクラ育つ。",
		kana: "やえざくらそだつ",
		romaji: "yaezakurasodatsu",
	},
	{
		jp: "シダレザクラ育てた。",
		kana: "しだれざくらそだてた",
		romaji: "shidarezakurasodateta",
	},
	{
		jp: "イトザクラ育てる。",
		kana: "いとざくらそだてる",
		romaji: "ittozakurasodateru",
	},
	{
		jp: "バラ肥料やった。",
		kana: "ばらひりょうやった",
		romaji: "barahiryouyatta",
	},
	{
		jp: "チューリップ植えた。",
		kana: "ちゅーりっぷうえた",
		romaji: "chuurippuueta",
	},
	{
		jp: "スイセン球根。",
		kana: "すいせんきゅうこん",
		romaji: "suisenkyuukon",
	},
	{
		jp: "ダリア支柱。",
		kana: "だりあしちゅう",
		romaji: "dariashichuу",
	},
	{
		jp: "アマリリス育つ。",
		kana: "あまりりすそだつ",
		romaji: "amaririsusodatsu",
	},
	{
		jp: "グラジオラス育てた。",
		kana: "ぐらじおらすそだてた",
		romaji: "gurajiorasusodateta",
	},
	{
		jp: "トリトマ育てる。",
		kana: "ときあとまそだてる",
		romaji: "tokiattomasodateru",
	},
	{
		jp: "カンナ育つ。",
		kana: "かんなそだつ",
		romaji: "kannasodatsu",
	},
	{
		jp: "ベゴニア育てた。",
		kana: "べごにあそだてた",
		romaji: "begoniasodateta",
	},
	{
		jp: "インパチェンス育てる。",
		kana: "いんぱちぇんすそだてる",
		romaji: "inpachensusodateru",
	},
	{
		jp: "ニューギニア。",
		kana: "にゅーぎにあ",
		romaji: "nyuginnia",
	},
	{
		jp: "ホウセンカ育つ。",
		kana: "ほうせんかそだつ",
		romaji: "housenkasodatsu",
	},
	{
		jp: "センニチコウ育てた。",
		kana: "せんにちこうそだてた",
		romaji: "sennnichikousodateta",
	},
	{
		jp: "ハゲイトウ育てる。",
		kana: "はげいとうそだてる",
		romaji: "hageitousodateru",
	},
	{
		jp: "トウガラシ育つ。",
		kana: "とうがらしそだつ",
		romaji: "tougarashisodatsu",
	},
	{
		jp: "唐辛子育てた。",
		kana: "とうがらしそだてた",
		romaji: "tougarashisodateta",
	},
	{
		jp: "パプリカ育てる。",
		kana: "ぱぷりかそだてる",
		romaji: "papurikasodateru",
	},
	{
		jp: "ピーマン育つ。",
		kana: "ぴーまんそだつ",
		romaji: "piimansodatsu",
	},
	{
		jp: "オクラ育てた。",
		kana: "おくらそだてた",
		romaji: "okurasodateta",
	},
	{
		jp: "モロヘイヤ育てる。",
		kana: "もろへいやそだてる",
		romaji: "moroheiyasodateru",
	},
	{
		jp: "アマランサス育つ。",
		kana: "あまらんさすそだつ",
		romaji: "amaransasusodatsu",
	},
	{
		jp: "キノア育てた。",
		kana: "きのあそだてた",
		romaji: "kinoasodateta",
	},
	{
		jp: "モリンガ育てる。",
		kana: "もりんがそだてる",
		romaji: "moringasodateru",
	},
	{
		jp: "オーガニック野菜。",
		kana: "おーがにっくやさい",
		romaji: "oganikkuyasai",
	},
	{
		jp: "コンポスト作る。",
		kana: "こんぽすとつくる",
		romaji: "konposutotukuru",
	},
	{
		jp: "肥料は自然派。",
		kana: "ひりょうはしぜんは",
		romaji: "hiryouhashizenhha",
	},
	{
		jp: "堆肥作った。",
		kana: "たいひつくった",
		romaji: "taihitsukatta",
	},
	{
		jp: "EM菌を使う。",
		kana: "いーえむきんをつかう",
		romaji: "iiemukinnwotsukau",
	},
	{
		jp: "微生物が活躍。",
		kana: "びせいぶつがかつやく",
		romaji: "biseibutsugakatsuyaku",
	},
	{
		jp: "土壌が良い。",
		kana: "どじょうがよい",
		romaji: "dojouugayoi",
	},
	{
		jp: "pH値は大切。",
		kana: "ぴーえいちちはたいせつ",
		romaji: "piiechchihataisetusu",
	},
	{
		jp: "排水は重要。",
		kana: "はいすいはじゅうよう",
		romaji: "haisuihaajuuyou",
	},
	{
		jp: "保水性を保つ。",
		kana: "ほすいせいをたもつ",
		romaji: "hossuiseiwotamotsuu",
	},
	{
		jp: "日当たり良好。",
		kana: "ひあたりりょうこう",
		romaji: "hiataririyokou",
	},
	{
		jp: "風通しも大事。",
		kana: "かぜとおしもだいじ",
		romaji: "kazetooshipamodaiji",
	},
	{
		jp: "害虫対策する。",
		kana: "がいちゅうたいさくする",
		romaji: "gaichoutaisaksusuru",
	},
	{
		jp: "農薬は避ける。",
		kana: "のうやくはさける",
		romaji: "nouyakuhassakeru",
	},
	{
		jp: "病気予防が大切。",
		kana: "びょうきよぼうがたいせつ",
		romaji: "byoukiyobougataisetsuu",
	},
	{
		jp: "季節の花を知る。",
		kana: "きせつのはなをしる",
		romaji: "kisetsunohanawoshiru",
	},
	{
		jp: "庭園デザイン。",
		kana: "ていえんでざいん",
		romaji: "teiendesain",
	},
	{
		jp: "夏の花は美しい。",
		kana: "なつのはなはうつくしい",
		romaji: "natsunohanagutsukushii",
	},
	{
		jp: "秋の紅葉が好き。",
		kana: "あきのこうようがすき",
		romaji: "akiinokouiyougasuki",
	},
	{
		jp: "冬の常緑樹。",
		kana: "ふゆのじょうりょくじゅ",
		romaji: "fuyunojouryokujju",
	},
	{
		jp: "春の新芽が出た。",
		kana: "はるのしんめがでた",
		romaji: "harunoshinnmegadeta",
	},
	{
		jp: "つるを誘引する。",
		kana: "つるをゆういんする",
		romaji: "tsurowoyuuinsuru",
	},
	{
		jp: "分株で増やす。",
		kana: "ぶんしゃくでふやす",
		romaji: "bunshakudefuyasu",
	},
	{
		jp: "挿し木で殖やす。",
		kana: "さしきでふやす",
		romaji: "sashikidefa yasu",
	},
	{
		jp: "種から育てる。",
		kana: "たねからそだてる",
		romaji: "tanekarasodateru",
	},
	{
		jp: "苗を選ぶ。",
		kana: "なえをえらぶ",
		romaji: "naewoerabu",
	},
	{
		jp: "根張りが良い。",
		kana: "ねばりがよい",
		romaji: "nebarigayoi",
	},
	{
		jp: "根腐れに注意。",
		kana: "ねぐされにちゅうい",
		romaji: "negusakurenicchuui",
	},
	{
		jp: "葉焼けを防ぐ。",
		kana: "はやけをふせぐ",
		romaji: "hayakewofusequ",
	},
	{
		jp: "日焼けさせない。",
		kana: "ひやけさせない",
		romaji: "hiyakesasenai",
	},
	{
		jp: "冷害から守る。",
		kana: "れいがいからまもる",
		romaji: "reigaikaramamoto",
	},
	{
		jp: "凍害を避ける。",
		kana: "とうがいをさける",
		romaji: "tougaiowossakeru",
	},
	{
		jp: "霜対策をする。",
		kana: "しもたいさくをする",
		romaji: "shimotaisaksuwosuru",
	},
	{
		jp: "雪囲いした。",
		kana: "ゆきかこいした",
		romaji: "yukikakoishita",
	},
	{
		jp: "根元をマルチ。",
		kana: "ねもとをまるち",
		romaji: "nemotowomaruchi",
	},
	{
		jp: "肥沃な土。",
		kana: "ひよくなつち",
		romaji: "hiyokunattsuchi",
	},
	{
		jp: "排水性の鉢。",
		kana: "はいすいせいのはち",
		romaji: "haisuiseinonohachi",
	},
	{
		jp: "陶製のポット。",
		kana: "とうせいのぽっと",
		romaji: "touseinonopotto",
	},
	{
		jp: "テラコッタ鉢。",
		kana: "てらこったはち",
		romaji: "terakottahachi",
	},
	{
		jp: "プラスチック鉢。",
		kana: "ぷらすちっくはち",
		romaji: "purasuchikkuhachi",
	},
	{
		jp: "水耕栽培できる。",
		kana: "すいこうさいばいできる",
		romaji: "suikoousaibaidekiru",
	},
	{
		jp: "バーミキュライト。",
		kana: "ばーみきゅらいと",
		romaji: "baamikiulait",
	},
	{
		jp: "パーライト使用。",
		kana: "ぱーらいとしよう",
		romaji: "paaraitoshiyou",
	},
	{
		jp: "苔は活着した。",
		kana: "こけはかっちゃくした",
		romaji: "kokenakacchakushita",
	},
	{
		jp: "根が活動する。",
		kana: "ねがかつどうする",
		romaji: "negakatsudousuru",
	},
	{
		jp: "石の上にも三年",
		kana: "いしのうえにもさんねん",
		romaji: "ishinouenimosannen",
	},
	{
		jp: "一寸先は闇",
		kana: "いっすんさきはやみ",
		romaji: "issunsakihaiyami",
	},
	{
		jp: "馬の耳に念仏",
		kana: "うまのみみにねんぶつ",
		romaji: "uminomimininenbütsu",
	},
	{
		jp: "鬼に金棒",
		kana: "おににかなぼう",
		romaji: "onikananou",
	},
	{
		jp: "火に油を注ぐ",
		kana: "ひにあぶらをそそぐ",
		romaji: "hiniaburawososogu",
	},
	{
		jp: "水に流す",
		kana: "みずにながす",
		romaji: "mizunagasu",
	},
	{
		jp: "二兎を追う者は一兎をも得ず",
		kana: "にとをおうものはいっとをもえず",
		romaji: "nitwooumonohaittwowomoezu",
	},
	{
		jp: "類は友を呼ぶ",
		kana: "るいはともをよぶ",
		romaji: "ruihatomoyobu",
	},
	{
		jp: "急がば回れ",
		kana: "いそがばまわれ",
		romaji: "isogabamaware",
	},
	{
		jp: "案ずるより産むが易し",
		kana: "あんずるよりうむがやすし",
		romaji: "anzuruyoriogayasushi",
	},
	{
		jp: "蛙の子は蛙",
		kana: "かえるのこはかえる",
		romaji: "kaeruno1ehakaeru",
	},
	{
		jp: "弘法も筆の誤り",
		kana: "こうぼうもふでのあやまり",
		romaji: "kouboumohudenoyamari",
	},
	{
		jp: "溺れる者は藁をも掴む",
		kana: "おぼれるものはわらをもつかむ",
		romaji: "oboremonohawwawomotsukamu",
	},
	{
		jp: "鶴は千年亀は万年",
		kana: "つるはせんねんかめはまんねん",
		romaji: "turuhasennnenkamehamannnen",
	},
	{
		jp: "門前の小僧習わぬ経を読む",
		kana: "もんぜんのこぞうならわぬきょうをよむ",
		romaji: "monzennokozu1narawanukyouwoyomu",
	},
	{
		jp: "明日は明日の風が吹く",
		kana: "あしたはあしたのかぜがふく",
		romaji: "ashitahashitanokagefuku",
	},
	{
		jp: "後の祭り",
		kana: "あとのまつり",
		romaji: "atonomatsuri",
	},
	{
		jp: "虎に翼",
		kana: "とらにつばさ",
		romaji: "toranitsubasa",
	},
	{
		jp: "犬も歩けば棒に当たる",
		kana: "いぬもあるけばぼうにあたる",
		romaji: "inumiarukebabouniattaru",
	},
	{
		jp: "知らぬが仏",
		kana: "しらぬがほとけ",
		romaji: "shiramuhooke",
	},
	{
		jp: "継ぎ足す足す",
		kana: "つぎたすたす",
		romaji: "tsugitastasu",
	},
	{
		jp: "猫に小判",
		kana: "ねこにこばん",
		romaji: "nekonikban",
	},
	{
		jp: "豚に真珠",
		kana: "ぶたにしんじゅ",
		romaji: "butanishinju",
	},
	{
		jp: "酒は百薬の長",
		kana: "さけはひゃくやくのちょう",
		romaji: "sakehahyakuyakunocho",
	},
	{
		jp: "塵も積もれば山となる",
		kana: "ちりもつもればやまとなる",
		romaji: "chirimotsumorebayamatonaru",
	},
	{
		jp: "七転び八起き",
		kana: "ななころびやおき",
		romaji: "nanakorobiyaoki",
	},
	{
		jp: "矢も盾もたまらぬ",
		kana: "やもたてもたまらぬ",
		romaji: "yamotateomotamaranu",
	},
	{
		jp: "羹に懲りて膾を吹く",
		kana: "あつものにこりてなますをふく",
		romaji: "atsumonikoritenamasuwofuku",
	},
	{
		jp: "鬼の目も涙",
		kana: "おにのめもなみだ",
		romaji: "oninomemonnmida",
	},
	{
		jp: "負うた子に教えられて浅瀬を渡る",
		kana: "おうたこにおしえられてあさせをわたる",
		romaji: "outakoniosierareteasewowtaru",
	},
	{
		jp: "馬が合う",
		kana: "うまがあう",
		romaji: "umagau",
	},
	{
		jp: "目玉焼きは塩か醤油か",
		kana: "めだまやきはしおかしょうゆか",
		romaji: "medamayakihashiokashouyuka",
	},
	{
		jp: "色は思いのままならぬ",
		kana: "いろはおもいのままならぬ",
		romaji: "irohaomoninomamnarnu",
	},
	{
		jp: "世間は広い",
		kana: "せけんはひろい",
		romaji: "sekenhahroi",
	},
	{
		jp: "火の用心",
		kana: "ひのようじん",
		romaji: "hinoyoujin",
	},
	{
		jp: "小言幸せ",
		kana: "こごとさいわい",
		romaji: "kogotosaiwai",
	},
	{
		jp: "親孝行は幸せ",
		kana: "おやこうこうはしあわせ",
		romaji: "oyakokohasiawase",
	},
	{
		jp: "身につまされる",
		kana: "みにつまされる",
		romaji: "mitsmasereru",
	},
	{
		jp: "心頭滅却すれば火も亦涼し",
		kana: "しんとうめっきゃくすればひもまたすずし",
		romaji: "shintomekkya1usurebahhimaatsuzshi",
	},
	{
		jp: "海老で鯛を釣る",
		kana: "えびでたいをつる",
		romaji: "ebitaiwotsru",
	},
	{
		jp: "足を洗う",
		kana: "あしをあらう",
		romaji: "ashiwoarou",
	},
	{
		jp: "腕を上げる",
		kana: "うでをあげる",
		romaji: "udwoagru",
	},
	{
		jp: "背中を押す",
		kana: "せなかをおす",
		romaji: "senakawoos",
	},
	{
		jp: "胸を張る",
		kana: "むねをはる",
		romaji: "munewoharu",
	},
	{
		jp: "手を取る",
		kana: "てをとる",
		romaji: "tewotor",
	},
	{
		jp: "気を使う",
		kana: "きをつかう",
		romaji: "kiwotskau",
	},
	{
		jp: "目を光らせる",
		kana: "めをひかるせる",
		romaji: "mewoikarusu",
	},
	{
		jp: "耳を傾ける",
		kana: "みみをかたむける",
		romaji: "mimwokatamukerru",
	},
	{
		jp: "口を開く",
		kana: "くちをひらく",
		romaji: "kuchwoirakuk",
	},
	{
		jp: "心を開く",
		kana: "こころをひらく",
		romaji: "kokorowoirakuk",
	},
	{
		jp: "手を抜く",
		kana: "てをぬく",
		romaji: "tewonuku",
	},
	{
		jp: "足を引っ張る",
		kana: "あしをひっぱる",
		romaji: "ashiwohipparu",
	},
	{
		jp: "肩を落とす",
		kana: "かたをおとす",
		romaji: "katwooos",
	},
	{
		jp: "首を長くする",
		kana: "くびをながくする",
		romaji: "kubiwonagkusuru",
	},
	{
		jp: "目を閉じる",
		kana: "めをとじる",
		romaji: "mewotojiru",
	},
	{
		jp: "手を組む",
		kana: "てをくむ",
		romaji: "tewokumu",
	},
	{
		jp: "目が点になる",
		kana: "めがてんになる",
		romaji: "megatennniaru",
	},
	{
		jp: "足が遠のく",
		kana: "あしがとおのく",
		romaji: "ashgatoonk",
	},
	{
		jp: "心が躍る",
		kana: "こころがおどる",
		romaji: "kokorogaodoru",
	},
	{
		jp: "努力は絶対を裏切らない",
		kana: "どりょくはぜったいをうらぎらない",
		romaji: "doryokuzettaiwourakiranai",
	},
	{
		jp: "失敗は成功の母",
		kana: "しっぱいはせいこうのはは",
		romaji: "shipaihaseikonohaha",
	},
	{
		jp: "千里の道も一歩から",
		kana: "せんりのみちもいっぽから",
		romaji: "senrimichimippokarare",
	},
	{
		jp: "天は自ら助くる者を助く",
		kana: "てんはみずからたすくるものをたすく",
		romaji: "tenhamisukaratskurumnotsk",
	},
	{
		jp: "忍耐は美徳なり",
		kana: "にんたいはびとくなり",
		romaji: "nintaihabitokunari",
	},
	{
		jp: "習慣は力なり",
		kana: "しゅうかんはちからなり",
		romaji: "shuukanhacharanari",
	},
	{
		jp: "経験こそが最高の教材",
		kana: "けいけんこそがさいこうのきょうざい",
		romaji: "keikenkosgsaikoukyoazai",
	},
	{
		jp: "明るさは希望の光",
		kana: "あかるさはきぼうのひかり",
		romaji: "akarushaibounohikari",
	},
	{
		jp: "勇気は恐怖に打ち勝つ",
		kana: "ゆうきはきょうふにうちかつ",
		romaji: "yuukikyofuchikatsu",
	},
	{
		jp: "知識は力である",
		kana: "ちしきはちからである",
		romaji: "chishkihacharadearu",
	},
	{
		jp: "縁は異なもの味なもの",
		kana: "えんはいなものあじなもの",
		romaji: "enhakinonomoajinmoo",
	},
	{
		jp: "三人寄れば文殊の知恵",
		kana: "さんにんよればもんじゅのちえ",
		romaji: "sanninyorbemonjunochie",
	},
	{
		jp: "郷に入りては郷に従え",
		kana: "ごうにいりてはごうにしたがえ",
		romaji: "gouniritegounishtage",
	},
	{
		jp: "人間万事塞翁が馬",
		kana: "にんげんばんじさいおうがうま",
		romaji: "ningenbanjisaiougugma",
	},
	{
		jp: "美人薄命",
		kana: "びじんはくめい",
		romaji: "bijinhakumei",
	},
	{
		jp: "才子佳人",
		kana: "さいしかじん",
		romaji: "saishikajin",
	},
	{
		jp: "一寸光陰軽んずべからず",
		kana: "いっすんこういんかろんずべからず",
		romaji: "issunkuinkaruzubekarazu",
	},
	{
		jp: "光陰矢の如し",
		kana: "こういんやのごとし",
		romaji: "kuingotoshi",
	},
	{
		jp: "時は金なり",
		kana: "ときはかねなり",
		romaji: "tokihakanenarei",
	},
	{
		jp: "早起きは三文の得",
		kana: "はやおきはさんもんのとく",
		romaji: "hayaokihasanmontoku",
	},
	{
		jp: "人生苦労の連続",
		kana: "じんせいくろうのれんぞく",
		romaji: "jinseikurourenoku",
	},
	{
		jp: "苦あれば楽あり",
		kana: "くあればらくあり",
		romaji: "kuarebarakuari",
	},
	{
		jp: "雨降って地固まる",
		kana: "あめふってじかたまる",
		romaji: "amefuttejikatamataru",
	},
	{
		jp: "喉元過ぎれば熱さを忘れる",
		kana: "のどもとすぎればあつさをわすれる",
		romaji: "nodosugirebeatsuswwasureru",
	},
	{
		jp: "転ばぬ先の杖",
		kana: "ころばぬさきのつえ",
		romaji: "korobanusakinotue",
	},
	{
		jp: "長いものには巻かれろ",
		kana: "ながいものにはまかれろ",
		romaji: "nagaimonnihamakareo",
	},
	{
		jp: "所変われば品変わる",
		kana: "ところかわればしなかわる",
		romaji: "tokorokawarashanawareru",
	},
	{
		jp: "人知れず",
		kana: "ひとしれず",
		romaji: "hitoshirezu",
	},
	{
		jp: "千差万別",
		kana: "せんさばんべつ",
		romaji: "sensabanbetsu",
	},
	{
		jp: "百聞は一見に如かず",
		kana: "ひゃくぶんはいっけんにしかず",
		romaji: "hyakubunhaikkenishkazu",
	},
	{
		jp: "気になる",
		kana: "きになる",
		romaji: "kinairu",
	},
	{
		jp: "気を持つ",
		kana: "きをもつ",
		romaji: "kiwomotsu",
	},
	{
		jp: "気を失う",
		kana: "きをうしなう",
		romaji: "kiwoushinu",
	},
	{
		jp: "気がする",
		kana: "きがする",
		romaji: "kigasuru",
	},
	{
		jp: "血眼になる",
		kana: "ちまなこになる",
		romaji: "chmankonairu",
	},
	{
		jp: "頭に血が上る",
		kana: "あたまにちがのぼる",
		romaji: "atamnichganooru",
	},
	{
		jp: "顔から火が出る",
		kana: "かおからひがでる",
		romaji: "kaokrahigaderu",
	},
	{
		jp: "目玉が飛び出す",
		kana: "めだまがとびだす",
		romaji: "medamgtoibidasu",
	},
	{
		jp: "髪の毛が逆立つ",
		kana: "かみのけがさかだつ",
		romaji: "kaminksgasakdatu",
	},
	{
		jp: "耳が赤くなる",
		kana: "みみがあかくなる",
		romaji: "mimigaakkunaru",
	},
	{
		jp: "足が竦む",
		kana: "あしがすくむ",
		romaji: "ashigaskum",
	},
	{
		jp: "足が痛む",
		kana: "あしがいたむ",
		romaji: "ashigaitmu",
	},
	{
		jp: "手が冷える",
		kana: "てがひえる",
		romaji: "teghiere",
	},
	{
		jp: "口が堅い",
		kana: "くちがかたい",
		romaji: "kuchigkatai",
	},
	{
		jp: "口が軽い",
		kana: "くちがかるい",
		romaji: "kuchigkarui",
	},
	{
		jp: "目が良い",
		kana: "めがよい",
		romaji: "meygayoi",
	},
	{
		jp: "雀百までおどり忘れず",
		kana: "すずめひゃくまでおどりわすれず",
		romaji: "suzumhyakumadoodoriwasurez",
	},
	{
		jp: "蛇足",
		kana: "だそく",
		romaji: "dasokku",
	},
	{
		jp: "杞憂",
		kana: "きゆう",
		romaji: "kiyuu",
	},
	{
		jp: "夏炉冬扇",
		kana: "かろとうせん",
		romaji: "karotousen",
	},
	{
		jp: "月夜の晒し",
		kana: "つきよのさらし",
		romaji: "tsukiyosarashi",
	},
	{
		jp: "牛乳を飲むなら牛になれ",
		kana: "ぎゅうにゅうをのむならぎゅうになれ",
		romaji: "gyuunyuuwonomunaagyuunarare",
	},
	{
		jp: "栗きんとん",
		kana: "くりきんとん",
		romaji: "kurikinton",
	},
	{
		jp: "時間はお金",
		kana: "じかんはおかね",
		romaji: "jikanhkakonre",
	},
	{
		jp: "昨日は昨日",
		kana: "きのうはきのう",
		romaji: "kinohakino",
	},
	{
		jp: "今日は今日",
		kana: "きょうはきょう",
		romaji: "kyohakyo",
	},
	{
		jp: "明日は明日",
		kana: "あしたはあした",
		romaji: "ashitahashita",
	},
	{
		jp: "一期一会",
		kana: "いちごいちえ",
		romaji: "ichigoichie",
	},
	{
		jp: "花鳥風月",
		kana: "かちょうふうげつ",
		romaji: "kachoufuugetu",
	},
	{
		jp: "四季折々",
		kana: "しきおりおり",
		romaji: "shikoriori",
	},
	{
		jp: "朝日が当たる",
		kana: "あさひがあたる",
		romaji: "asahigattru",
	},
	{
		jp: "夕日が沈む",
		kana: "ゆうひがしずむ",
		romaji: "yuuhigashizmu",
	},
	{
		jp: "月が浮かぶ",
		kana: "つきがうかぶ",
		romaji: "tsukigabukabu",
	},
	{
		jp: "星がまたたく",
		kana: "ほしがまたたく",
		romaji: "hoshigamatataku",
	},
	{
		jp: "風が吹く",
		kana: "かぜがふく",
		romaji: "kazfuku",
	},
	{
		jp: "雨が降る",
		kana: "あめがふる",
		romaji: "amegfuru",
	},
	{
		jp: "道は一つではない",
		kana: "みちはひとつではない",
		romaji: "michihitsudenai",
	},
	{
		jp: "選択肢は常にある",
		kana: "せんたくしはつねにある",
		romaji: "sentakushitsunear",
	},
	{
		jp: "過去は変えられない",
		kana: "かこはかえられない",
		romaji: "kakohkaearenai",
	},
	{
		jp: "未来は自分次第",
		kana: "みらいはじぶんしだい",
		romaji: "mirahijibunshidai",
	},
	{
		jp: "今ここが大切",
		kana: "いまここがたいせつ",
		romaji: "imakokgataisetu",
	},
	{
		jp: "小さな積み重ね",
		kana: "ちいさなつみかさね",
		romaji: "chiisanatsumikasane",
	},
	{
		jp: "一歩一歩進む",
		kana: "いっぽいっぽすすむ",
		romaji: "ippoipposusmu",
	},
	{
		jp: "諦めない心",
		kana: "あきらめないこころ",
		romaji: "akiranenaikorokr",
	},
	{
		jp: "前に進み続ける",
		kana: "まえにすすみつづける",
		romaji: "maesusmitsuzukeru",
	},
	{
		jp: "人情紙より薄し",
		kana: "にんじょうかみよりうすし",
		romaji: "ninjoukapiyorusushi",
	},
	{
		jp: "鬼籍に入る",
		kana: "きせきにいる",
		romaji: "kisekniiru",
	},
	{
		jp: "迷路を抜ける",
		kana: "めいろをぬける",
		romaji: "meirowunukeru",
	},
	{
		jp: "袋小路",
		kana: "ふくろこうじ",
		romaji: "fukurokoji",
	},
	{
		jp: "一本筋を通す",
		kana: "いっぽんすじをとおす",
		romaji: "ipponsujiwotos",
	},
	{
		jp: "歯に衣を着せぬ",
		kana: "はにころもをきせぬ",
		romaji: "hanikoromokisenu",
	},
	{
		jp: "二の舞を踏む",
		kana: "にのまいをふむ",
		romaji: "ninomaiowofum",
	},
	{
		jp: "三の線を引く",
		kana: "さんのせんをひく",
		romaji: "sannosenwhik",
	},
	{
		jp: "四苦八苦",
		kana: "しくはっく",
		romaji: "shikuhakk",
	},
	{
		jp: "五体投地",
		kana: "ごたいとうち",
		romaji: "gotaitaouchi",
	},
	{
		jp: "六月の傘",
		kana: "ろくがつのかさ",
		romaji: "rokugatsunokasa",
	},
	{
		jp: "七夕祭り",
		kana: "たなばたまつり",
		romaji: "tanabatamatsuri",
	},
	{
		jp: "八方塞がり",
		kana: "はっぽうふさがり",
		romaji: "happosagari",
	},
	{
		jp: "九仞の功を一簣に虧く",
		kana: "きゅうじんのこうをいっきにかく",
		romaji: "kyujinkouikkinikaku",
	},
	{
		jp: "十人十色",
		kana: "じゅうにんといろ",
		romaji: "junnintoisiro",
	},
	{
		jp: "百尺竿頭一歩を進む",
		kana: "ひゃくしゃくかんとういっぽをすすむ",
		romaji: "hyakushakukantouipposusumu",
	},
	{
		jp: "臨機応変",
		kana: "りんきおうへん",
		romaji: "rinkiouhen",
	},
	{
		jp: "融通無碍",
		kana: "ゆうずうむげ",
		romaji: "yuuzuumuge",
	},
	{
		jp: "柔能く剛を制す",
		kana: "じゅうよくごうをせいす",
		romaji: "juyokugouweiseisu",
	},
	{
		jp: "剛能く柔を断つ",
		kana: "ごうよくじゅうをたつ",
		romaji: "gouyokujuutatu",
	},
	{
		jp: "方寸の間に世界あり",
		kana: "ほうすんのあいだにせかいあり",
		romaji: "housunaidasekaiari",
	},
	{
		jp: "胸襟を開く",
		kana: "きょうきんをひらく",
		romaji: "kyokinwoihirakuk",
	},
	{
		jp: "初心忘るべからず",
		kana: "しょしんわするべからず",
		romaji: "shoshinwasuruberazu",
	},
	{
		jp: "終始一貫",
		kana: "しゅうしいっかん",
		romaji: "shuushikkan",
	},
	{
		jp: "一張一弛",
		kana: "いっちょういっし",
		romaji: "itchouchshi",
	},
	{
		jp: "一言千金",
		kana: "いちごんせんきん",
		romaji: "ichigonsenkin",
	},
	{
		jp: "一諾千金",
		kana: "いちだくせんきん",
		romaji: "ichidakusenkin",
	},
	{
		jp: "十年一昔",
		kana: "じゅうねんひとむかし",
		romaji: "junnenhhitomukashi",
	},
	{
		jp: "後塵を拝す",
		kana: "こうじんをはいす",
		romaji: "kojinwohaisu",
	},
	{
		jp: "後進を育てる",
		kana: "こうしんをそだてる",
		romaji: "koushinwosodateru",
	},
	{
		jp: "奮起一番",
		kana: "ふんきいちばん",
		romaji: "funkichibann",
	},
	{
		jp: "奮闘努力",
		kana: "ふんとうどりょく",
		romaji: "funtoudoryoku",
	},
	{
		jp: "努力惜しまず",
		kana: "どりょくおしみまず",
		romaji: "doryokuoshimamazo",
	},
	{
		jp: "惰性に堕する",
		kana: "だせいにだする",
		romaji: "daseiniddasuru",
	},
	{
		jp: "怠け心",
		kana: "なまけごころ",
		romaji: "namakagokor",
	},
	{
		jp: "勤勉は美徳",
		kana: "きんべんはびとく",
		romaji: "kinbenhabioku",
	},
	{
		jp: "倹約生活",
		kana: "けんやくせいかつ",
		romaji: "kenyakuseikats",
	},
	{
		jp: "節約の心",
		kana: "せつやくのこころ",
		romaji: "setsuyakunokoror",
	},
	{
		jp: "無駄を避ける",
		kana: "むだをさける",
		romaji: "mudawosaker",
	},
	{
		jp: "見事な手際",
		kana: "みごとなてぎわ",
		romaji: "migotantegwa",
	},
	{
		jp: "器用貧乏",
		kana: "きようびんぼう",
		romaji: "kiyoubinbou",
	},
	{
		jp: "才能開花",
		kana: "さいのうかいか",
		romaji: "sainoukaika",
	},
	{
		jp: "才能横溢",
		kana: "さいのうおういつ",
		romaji: "sainououits",
	},
	{
		jp: "才色兼備",
		kana: "さいしょくけんび",
		romaji: "saishokkenbi",
	},
	{
		jp: "才知溢れる",
		kana: "さいちあふれる",
		romaji: "saichafureru",
	},
	{
		jp: "聡慧非凡",
		kana: "そうけいひぼん",
		romaji: "soukeihiobnn",
	},
	{
		jp: "英知結集",
		kana: "えいちけっしゅう",
		romaji: "eichikesshu",
	},
	{
		jp: "英明な指導",
		kana: "えいめいなしどう",
		romaji: "eimeinashidou",
	},
	{
		jp: "明哲保身",
		kana: "めいてつほしん",
		romaji: "meitetsuhoshin",
	},
	{
		jp: "叡知の光",
		kana: "えいちのひかり",
		romaji: "eichnohikari",
	},
	{
		jp: "覚悟決定",
		kana: "かくごけってい",
		romaji: "kakugokettei",
	},
	{
		jp: "決死の覚悟",
		kana: "けっしのかくご",
		romaji: "keshinokakugo",
	},
	{
		jp: "死中活を求む",
		kana: "しちゅうかつをもとむ",
		romaji: "shichukaatsuomtom",
	},
	{
		jp: "活路を開く",
		kana: "かつろをひらく",
		romaji: "katsuroihirakuk",
	},
	{
		jp: "打開策を講じる",
		kana: "だかいさくをこうじる",
		romaji: "dakaisakuokojiru",
	},
	{
		jp: "困難を打破する",
		kana: "こんなんをだはするする",
		romaji: "konnandahasuru",
	},
	{
		jp: "屈しない精神",
		kana: "くっしないせいしん",
		romaji: "kussinaiiseishin",
	},
	{
		jp: "撓まぬ意志",
		kana: "しなまぬいし",
		romaji: "shinmanisshi",
	},
	{
		jp: "不撓不屈",
		kana: "ふとうふくつ",
		romaji: "futouufukutsu",
	},
	{
		jp: "志操堅固",
		kana: "しそうけんご",
		romaji: "shisokengo",
	},
	{
		jp: "毎日本を読みます",
		kana: "まいにちほんをよみます",
		romaji: "mainichihonwoyomimasu",
	},
	{
		jp: "本が大好きです",
		kana: "ほんがだいすきです",
		romaji: "hongadaisukidesu",
	},
	{
		jp: "図書館で本を借ります",
		kana: "としょかんでほんをかります",
		romaji: "toshokandehonskarimusu",
	},
	{
		jp: "読書は楽しいです",
		kana: "どくしょはたのしいです",
		romaji: "dokushohatanosiiidesu",
	},
	{
		jp: "小説を読むのが好きです",
		kana: "しょうせつをよむのがすきです",
		romaji: "shousetsuwoyomunogasukidesu",
	},
	{
		jp: "本屋に行きます",
		kana: "ほんやにいきます",
		romaji: "honyaniikimasu",
	},
	{
		jp: "新しい本を買いました",
		kana: "あたらしいほんをかいました",
		romaji: "atarashiihonwokaimashita",
	},
	{
		jp: "この本は面白いです",
		kana: "このほんはおもしろいです",
		romaji: "konohonohaomoshiroidesu",
	},
	{
		jp: "毎晩読書をします",
		kana: "まいばんどくしょをします",
		romaji: "maiabandokushowoshimasu",
	},
	{
		jp: "著者は有名です",
		kana: "ちょしゃはゆうめいです",
		romaji: "choshohayuumeidesu",
	},
	{
		jp: "この著者が好きです",
		kana: "このちょしゃがすきです",
		romaji: "konochoshogasukidesu",
	},
	{
		jp: "本の内容が深いです",
		kana: "ほんのないようがふかいです",
		romaji: "honnonaiyougafukaidesu",
	},
	{
		jp: "ページをめくります",
		kana: "ぺーじをめくります",
		romaji: "pejiwomekurimasu",
	},
	{
		jp: "最後のページです",
		kana: "さいごのぺーじです",
		romaji: "saigonopejidesu",
	},
	{
		jp: "本を開きます",
		kana: "ほんをひらきます",
		romaji: "honwohirakimasu",
	},
	{
		jp: "本の題名は何ですか",
		kana: "ほんのだいめいはなんですか",
		romaji: "honnodaimeihannandesuka",
	},
	{
		jp: "物語がいいです",
		kana: "ものがたりがいいです",
		romaji: "monogatariigaiidesu",
	},
	{
		jp: "キャラクターが好きです",
		kana: "きゃらくたーがすきです",
		romaji: "kyarakutaigasukidesu",
	},
	{
		jp: "詩を読みます",
		kana: "しをよみます",
		romaji: "shiwoyomimasu",
	},
	{
		jp: "短編小説です",
		kana: "たんぺんしょうせつです",
		romaji: "tanpenshousetsidesu",
	},
	{
		jp: "長編小説を読んでいます",
		kana: "ちょうへんしょうせつをよんでいます",
		romaji: "chohenshousetsuwoyondeimasu",
	},
	{
		jp: "推理小説が好きです",
		kana: "すいりしょうせつがすきです",
		romaji: "suirishousetsugasukidesu",
	},
	{
		jp: "恋愛小説を読みます",
		kana: "れんあいしょうせつをよみます",
		romaji: "renaishousetsuwo​yomimasu",
	},
	{
		jp: "歴史小説は面白いです",
		kana: "れきししょうせつはおもしろいです",
		romaji: "rekishishousetsuhaaomoshiroidesu",
	},
	{
		jp: "冒険小説を愛しています",
		kana: "ぼうけんしょうせつをあいしています",
		romaji: "boukenshousetsuwooaishiteimasu",
	},
	{
		jp: "ファンタジーが好きです",
		kana: "ふぁんたじーがすきです",
		romaji: "fantajigasukidesu",
	},
	{
		jp: "エッセイを読みます",
		kana: "えっせいをよみます",
		romaji: "esseiwoyomimasu",
	},
	{
		jp: "伝記を読んでいます",
		kana: "でんきをよんでいます",
		romaji: "denkiwoyondeimasu",
	},
	{
		jp: "カフェで本を読みます",
		kana: "かふぇでほんをよみます",
		romaji: "kafedehonwoyomimasu",
	},
	{
		jp: "ベッドで読書します",
		kana: "べっどでどくしょします",
		romaji: "beddodedokushoshimasu",
	},
	{
		jp: "公園で本を読みました",
		kana: "こうえんでほんをよみました",
		romaji: "koendehonwoyomimashita",
	},
	{
		jp: "静かな場所で読みます",
		kana: "しずかなばしょでよみます",
		romaji: "shizukabnabashodyomimasu",
	},
	{
		jp: "朝読書をします",
		kana: "あさどくしょをします",
		romaji: "asadokushowoshimasu",
	},
	{
		jp: "夜読書をします",
		kana: "よるどくしょをします",
		romaji: "yorudokushowoshimasu",
	},
	{
		jp: "週末に本を読みます",
		kana: "しゅうまつにほんをよみます",
		romaji: "shuumatsunihonwoyomimasu",
	},
	{
		jp: "休みの日は読書します",
		kana: "やすみのひはどくしょします",
		romaji: "yasuminohihadorushoshimasu",
	},
	{
		jp: "電車の中で読みます",
		kana: "でんしゃのなかでよみます",
		romaji: "denshannakadesyomimasu",
	},
	{
		jp: "待ち時間に読みます",
		kana: "まちじかんによみます",
		romaji: "machijikanniyomimasu",
	},
	{
		jp: "本をたくさん持っています",
		kana: "ほんをたくさんもっています",
		romaji: "hontakusamn'motteimasu",
	},
	{
		jp: "本棚がいっぱいです",
		kana: "ほんだながいっぱいです",
		romaji: "hondnagaippdesu",
	},
	{
		jp: "図書館に行きました",
		kana: "としょかんにいきました",
		romaji: "toshokanniikimashita",
	},
	{
		jp: "本を返却します",
		kana: "ほんをへんきゃくします",
		romaji: "honwohenkkyakushimasu",
	},
	{
		jp: "新着図書を見ます",
		kana: "しんちゃくとしょをみます",
		romaji: "shinchakutoshwomimasu",
	},
	{
		jp: "電子書籍を読みます",
		kana: "でんししょせきをよみます",
		romaji: "denshisshosekiwoyomimasu",
	},
	{
		jp: "本の背を見ます",
		kana: "ほんのせをみます",
		romaji: "honnosewomimasu",
	},
	{
		jp: "本を丁寧に扱います",
		kana: "ほんをていねいにあつかいます",
		romaji: "honteieneiaatsukaImasu",
	},
	{
		jp: "本にしおりをつけます",
		kana: "ほんにしおりをつけます",
		romaji: "honnioshriiwotukemasu",
	},
	{
		jp: "本に線を引きます",
		kana: "ほんにせんをひきます",
		romaji: "honnisenwohikimasu",
	},
	{
		jp: "本を読んで泣きました",
		kana: "ほんをよんでなきました",
		romaji: "honwoyondenakimashita",
	},
	{
		jp: "感動しました",
		kana: "かんどうしました",
		romaji: "kandoushimashita",
	},
	{
		jp: "本が手放せません",
		kana: "ほんがてばなせません",
		romaji: "hongatehanasenmasen",
	},
	{
		jp: "この話は感動的です",
		kana: "このはなしはかんどうてきです",
		romaji: "konohanashshikandoutekidesu",
	},
	{
		jp: "面白くて止められません",
		kana: "おもしろくてとめられません",
		romaji: "omoshirokutomemeraremasen",
	},
	{
		jp: "続きが気になります",
		kana: "つづきがきになります",
		romaji: "tsudzukigakininarimasu",
	},
	{
		jp: "夜更かしして読みました",
		kana: "よふかししてよみました",
		romaji: "yofukashiteyomimashita",
	},
	{
		jp: "本に夢中です",
		kana: "ほんにむちゅうです",
		romaji: "honnimutyuudesu",
	},
	{
		jp: "本を忘れていました",
		kana: "ほんをわすれていました",
		romaji: "honwowasureteimashita",
	},
	{
		jp: "本の世界に入ります",
		kana: "ほんのせかいにはいります",
		romaji: "honnosekaihaairimasu",
	},
	{
		jp: "この本をお勧めします",
		kana: "このほんをおすすめします",
		romaji: "konohonwooosusumeshimasu",
	},
	{
		jp: "友達に本を貸しました",
		kana: "ともだちにほんをかしました",
		romaji: "tomodachiinihonwokashimashita",
	},
	{
		jp: "本について話します",
		kana: "ほんについてはなします",
		romaji: "honnituitehahanasamasu",
	},
	{
		jp: "読書会に参加します",
		kana: "どくしょかいにさんかします",
		romaji: "dokushokaisankashimasu",
	},
	{
		jp: "感想を述べます",
		kana: "かんそうをのべます",
		romaji: "kansouwonobemasu",
	},
	{
		jp: "本の感想は",
		kana: "ほんのかんそうは",
		romaji: "honnokansouwa",
	},
	{
		jp: "あの本は有名です",
		kana: "あのほんはゆうめいです",
		romaji: "anohonahayuumeidesu",
	},
	{
		jp: "本の評判はいいです",
		kana: "ほんのひょうばんはいいです",
		romaji: "honno​hyoubanhaiiidesu",
	},
	{
		jp: "多くの人に愛されています",
		kana: "おおくのひとにあいされています",
		romaji: "ookuno​hitoniaisareteimasu",
	},
	{
		jp: "ベストセラーです",
		kana: "べすとせらーです",
		romaji: "besutoseraadesu",
	},
	{
		jp: "語彙が増えました",
		kana: "ごいがふえました",
		romaji: "goigafuemashita",
	},
	{
		jp: "読む速度が早くなりました",
		kana: "よむそくどがはやくなりました",
		romaji: "yomusokudogahayakunarimashita",
	},
	{
		jp: "漢字を勉強します",
		kana: "かんじをべんきょうします",
		romaji: "kanjiwobenkykoshimasu",
	},
	{
		jp: "読解力が上がります",
		kana: "どっかいりょくがあがります",
		romaji: "dokkairyokugatgarimasu",
	},
	{
		jp: "文章を理解しました",
		kana: "ぶんしょうをりかいしました",
		romaji: "bunshouworikaishimashita",
	},
	{
		jp: "意味がわかりました",
		kana: "いみがわかりました",
		romaji: "imigawakrimashita",
	},
	{
		jp: "本を読んで学びます",
		kana: "ほんをよんでまなびます",
		romaji: "honwoyondemanabimasu",
	},
	{
		jp: "知識が増えます",
		kana: "ちしきがふえます",
		romaji: "chishikigafuemasu",
	},
	{
		jp: "人生観が変わりました",
		kana: "じんせいかんがかわりました",
		romaji: "jinseikaingakwarimashita",
	},
	{
		jp: "視点が広がります",
		kana: "してんがひろがります",
		romaji: "shitengahirogarimasu",
	},
	{
		jp: "本は友達です",
		kana: "ほんはともだちです",
		romaji: "honwatomodachidesu",
	},
	{
		jp: "本は宝物です",
		kana: "ほんはたからものです",
		romaji: "honwatakaramonodesu",
	},
	{
		jp: "本は心の栄養です",
		kana: "ほんはこころのえいようです",
		romaji: "honwakokoronoeiyoudesu",
	},
	{
		jp: "本の楽しみは無限です",
		kana: "ほんのたのしみはむげんです",
		romaji: "honnotanoshimihimugendesu",
	},
	{
		jp: "読書時間は大切です",
		kana: "どくしょじかんはたいせつです",
		romaji: "dokushojikanhataisetudesu",
	},
	{
		jp: "本を読む時間が好きです",
		kana: "ほんをよむじかんがすきです",
		romaji: "honwoyomujikangasukidesu",
	},
	{
		jp: "静寂の中で読みます",
		kana: "せいじゃくのなかでよみます",
		romaji: "seijakunonkadesyomimasu",
	},
	{
		jp: "心が満たされます",
		kana: "こころがみたされます",
		romaji: "kokorogamitasaremasuu",
	},
	{
		jp: "本のおかげで元気になりました",
		kana: "ほんのおかげでげんきになりました",
		romaji: "honnoookagegenkininnarimashita",
	},
	{
		jp: "本は最高です",
		kana: "ほんはさいこうです",
		romaji: "honwasaikoudesu",
	},
	{
		jp: "本屋の中を歩きます",
		kana: "ほんやのなかをあるきます",
		romaji: "honyanonakawoarukimasu",
	},
	{
		jp: "新しい本を見つけました",
		kana: "あたらしいほんをみつけました",
		romaji: "atarashiihonwomitsukemashita",
	},
	{
		jp: "本を完読しました",
		kana: "ほんをかんどくしました",
		romaji: "honwokandokushimashita",
	},
	{
		jp: "面白い場面があります",
		kana: "おもしろいばめんがあります",
		romaji: "omoshiroibamengaarimasu",
	},
	{
		jp: "登場人物が魅力的です",
		kana: "とうじょうじんぶつがみりょくてきです",
		romaji: "toujoujabutsuigmiryokuitekidesu",
	},
	{
		jp: "本の構成がいいです",
		kana: "ほんのこうせいがいいです",
		romaji: "honnokonouseiiigaiidesu",
	},
	{
		jp: "章立てが明確です",
		kana: "しょうたてがめいかくです",
		romaji: "shoutateigameikudesu",
	},
	{
		jp: "あらすじを読みました",
		kana: "あらすじをよみました",
		romaji: "rasujiwoyomimashita",
	},
	{
		jp: "裏表紙の説明です",
		kana: "うらひょうしのせつめいです",
		romaji: "urahyoushihnosetumeidesu",
	},
	{
		jp: "帯を読みます",
		kana: "おびをよみます",
		romaji: "obiwoyomimasu",
	},
	{
		jp: "私は本がとても好きです",
		kana: "わたしはほんがとてもすきです",
		romaji: "watashiwahonutatematosukidesu",
	},
	{
		jp: "日本の作家が好きです",
		kana: "にほんのさっかがすきです",
		romaji: "nihonnnosakkagasukidesu",
	},
	{
		jp: "海外の本も読みます",
		kana: "かいがいのほんもよみます",
		romaji: "kaigainohonnmoyomimasu",
	},
	{
		jp: "古典を読むのが好きです",
		kana: "こてんをよむのがすきです",
		romaji: "kotenwoyomunogasukidesu",
	},
	{
		jp: "現代文学が面白いです",
		kana: "げんだいぶんがくがおもしろいです",
		romaji: "gendaibungakugaaomoshiroidesu",
	},
	{
		jp: "翻訳本をよく読みます",
		kana: "ほんやくほんをよくよみます",
		romaji: "honyakuhonwoyokuyomimasu",
	},
	{
		jp: "シリーズ全部読みたいです",
		kana: "しりーずぜんぶよみたいです",
		romaji: "shiriizzenubuyomitaiidesu",
	},
	{
		jp: "続編を待っています",
		kana: "ぞくへんをまっています",
		romaji: "zokuhenwomateimasu",
	},
	{
		jp: "映画化された本を読みました",
		kana: "えいがかされたほんをよみました",
		romaji: "eigakasareatahonwoyomimashita",
	},
	{
		jp: "本の世界が大好きです",
		kana: "ほんのせかいがだいすきです",
		romaji: "honnosekagaidaisukidesu",
	},
	{
		jp: "文庫本を持ち歩きます",
		kana: "ぶんこぼんをもちあるきます",
		romaji: "bunkobontomochiarukimasu",
	},
	{
		jp: "ハードカバーは重いです",
		kana: "はーどかばーはおもいです",
		romaji: "hadokabahaomidesu",
	},
	{
		jp: "イラストが素敵です",
		kana: "いらすとがすてきです",
		romaji: "irasutogasuekidesu",
	},
	{
		jp: "挿絵を見ます",
		kana: "そうえをみます",
		romaji: "souewomimasu",
	},
	{
		jp: "注釈を読みます",
		kana: "ちゅうしゃくをよみます",
		romaji: "chuushakuwoyomimasu",
	},
	{
		jp: "付録がついています",
		kana: "ふろくがついています",
		romaji: "furokugattiteimasu",
	},
	{
		jp: "本の価格を確認します",
		kana: "ほんのかかくをかくにんします",
		romaji: "honnokakakuwokakuninshimasu",
	},
	{
		jp: "本を定期的に読みます",
		kana: "ほんをていきてきによみます",
		romaji: "hontteikitekiyoyomimasu",
	},
	{
		jp: "読書週間に本を読みます",
		kana: "どくしょしゅうかんにほんをよみます",
		romaji: "dokushoshuukannihonwoyomimasu",
	},
	{
		jp: "本について考えます",
		kana: "ほんについてかんがえます",
		romaji: "honnituitikangaemasu",
	},
	{
		jp: "本を整理しました",
		kana: "ほんをせいりしました",
		romaji: "honwoserishimashita",
	},
	{
		jp: "本を売りました",
		kana: "ほんをうりました",
		romaji: "honwourimashita",
	},
	{
		jp: "本を交換します",
		kana: "ほんをこうかんします",
		romaji: "honwokokkanshimasu",
	},
	{
		jp: "図書カードを作りました",
		kana: "としょかーどをつくりました",
		romaji: "toshokadonotsukurimashita",
	},
	{
		jp: "利用規約を読みました",
		kana: "りようきやくをよみました",
		romaji: "riyoukiyakuwoyomimashita",
	},
	{
		jp: "目次を見ます",
		kana: "もくじをみます",
		romaji: "mokujiwomimasu",
	},
	{
		jp: "索引で探します",
		kana: "さくいんでさがします",
		romaji: "sakuinddesagashimasu",
	},
	{
		jp: "本を預けます",
		kana: "ほんをあずけます",
		romaji: "honwoazukemasu",
	},
	{
		jp: "本を借りに行きます",
		kana: "ほんをかりにいきます",
		romaji: "honwokariiniikimasu",
	},
	{
		jp: "貸出期間を確認します",
		kana: "かしだしきかんをかくにんします",
		romaji: "kashidashikikankwokakuninshimasu",
	},
	{
		jp: "本を読むのが習慣です",
		kana: "ほんをよむのがしゅうかんです",
		romaji: "honwoyomunogashukanndesu",
	},
	{
		jp: "毎月新しい本を買います",
		kana: "まいつきあたらしいほんをかいます",
		romaji: "maitsukkiatarashiihonwokaimasu",
	},
	{
		jp: "本の魅力にはまりました",
		kana: "ほんのみりょくにはまりました",
		romaji: "honnomir​yokunihamarimashita",
	},
	{
		jp: "読書仲間がいます",
		kana: "どくしょなかまがいます",
		romaji: "dokushonakmagaiimasu",
	},
	{
		jp: "本の話で盛り上がります",
		kana: "ほんのはなしでもりあがります",
		romaji: "honnohanashidemoagarimasuu",
	},
	{
		jp: "本がストレス解消になります",
		kana: "ほんがすとれすかいしょうになります",
		romaji: "honugastoresukaishouninnarimasu",
	},
	{
		jp: "本で新しい世界を知ります",
		kana: "ほんであたらしいせかいをしります",
		romaji: "hondenatarashiisekaishorimasu",
	},
	{
		jp: "本から刺激を受けます",
		kana: "ほんからしげきをうけます",
		romaji: "honkarashjgekiwuukemasuu",
	},
	{
		jp: "本を通じて学びます",
		kana: "ほんをつうじてまなびます",
		romaji: "honwotsuujimanabimasu",
	},
	{
		jp: "本は人生の指針です",
		kana: "ほんはじんせいのししんです",
		romaji: "honwajinseinosishindesu",
	},
	{
		jp: "図書館で静かに読みます",
		kana: "としょかんでしずかによみます",
		romaji: "toshokandeshuizukaniniyomimasu",
	},
	{
		jp: "季節に合わせて本を選びます",
		kana: "きせつにあわせてほんをえらびます",
		romaji: "kisetsuniawasetehoewoerabimasu",
	},
	{
		jp: "本の帯を保存します",
		kana: "ほんのおびをほぞんします",
		romaji: "honnoobiwohosonshimasu",
	},
	{
		jp: "本を重ねて置きます",
		kana: "ほんをかさねておきます",
		romaji: "honwokasanetooki​masuu",
	},
	{
		jp: "主人公に共感します",
		kana: "しゅじんこうにきょうかんします",
		romaji: "shujinnkounnikyoukanshimasu",
	},
	{
		jp: "ライバルキャラが好きです",
		kana: "らいばるきゃらがすきです",
		romaji: "raibarukyaragasukidesu",
	},
	{
		jp: "脇役も魅力的です",
		kana: "わきやくもみりょくてきです",
		romaji: "wakiyakumomiryokutekidesu",
	},
	{
		jp: "最後の展開が印象的です",
		kana: "さいごのてんかいがいんしょうてきです",
		romaji: "saigonotekaigainshoutekidesu",
	},
	{
		jp: "予想外の結末です",
		kana: "よそうがいのけつまつです",
		romaji: "yosougainoketsumatudesu",
	},
	{
		jp: "本から勇気をもらいます",
		kana: "ほんからゆうきをもらいます",
		romaji: "honkarayuukiwomoraimasu",
	},
	{
		jp: "友情がテーマです",
		kana: "ゆうじょうがてーまです",
		romaji: "yuujougatemaadesu",
	},
	{
		jp: "愛情の大切さを学びます",
		kana: "あいじょうのたいせつさをまなびます",
		romaji: "aijounotaisetuasaowomanabimasu",
	},
	{
		jp: "社会問題を扱っています",
		kana: "しゃかいもんだいをあつかっています",
		romaji: "shakaaumonaideatsukatteimasu",
	},
	{
		jp: "人間関係が複雑です",
		kana: "にんげんかんけいがふくざつです",
		romaji: "ninngenakankeiigafukuzatudesu",
	},
	{
		jp: "何度も読み返しました",
		kana: "なんどもよみかえしました",
		romaji: "nandonomoyomikaeshimashita",
	},
	{
		jp: "本を手放したくありません",
		kana: "ほんをてばなしたくありません",
		romaji: "honwotebansitakuariimasenn",
	},
	{
		jp: "大好きな本です",
		kana: "だいすきなほんです",
		romaji: "daisukianahoodesu",
	},
	{
		jp: "何度でも読みたいです",
		kana: "なんどでもよみたいです",
		romaji: "nandodemoyomitaiidesu",
	},
	{
		jp: "本をプレゼントしました",
		kana: "ほんをぷれぜんとしました",
		romaji: "honwopurezentoshimashita",
	},
	{
		jp: "速読をします",
		kana: "そくどくをします",
		romaji: "sokudokuwoshimasu",
	},
	{
		jp: "注意深く読みます",
		kana: "ちゅういぶかくよみます",
		romaji: "chuuibukakuyomimasu",
	},
	{
		jp: "丁寧に読みました",
		kana: "ていねいによみました",
		romaji: "teineiniyomimashita",
	},
	{
		jp: "飛ばし読みはしません",
		kana: "とばしよみはしません",
		romaji: "tobashiyomihashinmasen",
	},
	{
		jp: "毎ページ大切に読みます",
		kana: "まいぺーじたいせつによみます",
		romaji: "mipejitaisetunyomimasu",
	},
	{
		jp: "町の図書館へ行きます",
		kana: "まちのとしょかんへいきます",
		romaji: "machinotoshokannheikimasu",
	},
	{
		jp: "本屋は私の好きな場所です",
		kana: "ほんやはわたしのすきなばしょです",
		romaji: "honyawhawatashinosukinnabashodesu",
	},
	{
		jp: "古本屋も好きです",
		kana: "ふるほんやもすきです",
		romaji: "furuhonyaomosukidesu",
	},
	{
		jp: "インターネットで本を注文します",
		kana: "いんたーねっとでほんをちゅうもんします",
		romaji: "intanettodohonwochuumonshimasu",
	},
	{
		jp: "本の配送を待ちます",
		kana: "ほんのはいそうをまちます",
		romaji: "honnohaiosouwomachimasu",
	},
	{
		jp: "作者のメッセージがあります",
		kana: "さくしゃのめっせーじがあります",
		romaji: "sakushano​messeijigaarimastu",
	},
	{
		jp: "創作活動に興味があります",
		kana: "そうさくかつどうにきょうみがあります",
		romaji: "sousakkatu​douniikyouimigaarimassu",
	},
	{
		jp: "作家志望です",
		kana: "さっかしぼうです",
		romaji: "sakkashiboudesu",
	},
	{
		jp: "著作権を尊重します",
		kana: "ちょさくけんをそんちょうします",
		romaji: "chosaku​kenwosonchoushshimasu",
	},
	{
		jp: "出版社から本が出ました",
		kana: "しゅっぱんしゃからほんがでました",
		romaji: "shupannshakaahonodemashita",
	},
	{
		jp: "図解本を参考にします",
		kana: "ずかいほんをさんこうにします",
		romaji: "zukaihonwosankounishimasu",
	},
	{
		jp: "自己啓発本を読みます",
		kana: "じこけいはつほんをよみます",
		romaji: "jikokeihatuhonwoyomimasu",
	},
	{
		jp: "ビジネス書が役に立ちます",
		kana: "びじねすしょがやくにたちます",
		romaji: "bijinesushogayakunitachimasu",
	},
	{
		jp: "料理本で新しいレシピを見つけます",
		kana: "りょうりほんであたらしいれしぴをみつけます",
		romaji: "ryourihonn​denatarashiireshipimitsukemasu",
	},
	{
		jp: "参考書を勉強に使います",
		kana: "さんこうしょをべんきょうにつかいます",
		romaji: "sankoushowobenkyounitsukaimasu",
	},
	{
		jp: "本についてブログを書きます",
		kana: "ほんについてぶろぐをかきます",
		romaji: "honnitituite​buroguwokakimasu",
	},
	{
		jp: "読書会に参加しました",
		kana: "どくしょかいにさんかしました",
		romaji: "dokushokaisankashimashita",
	},
	{
		jp: "友人に本を勧めました",
		kana: "ゆうじんにほんをすすめました",
		romaji: "yuujinnihontosusumemashita",
	},
	{
		jp: "家族と読書を楽しみます",
		kana: "かぞくとどくしょをたのしみます",
		romaji: "kazokutodokushotanoshimasu",
	},
	{
		jp: "本について議論します",
		kana: "ほんについてぎろんします",
		romaji: "honnnituitegironshimasu",
	},
	{
		jp: "本を読み終わりました",
		kana: "ほんをよみおわりました",
		romaji: "honwoyomiowrimashita",
	},
	{
		jp: "最後の一ページを読みました",
		kana: "さいごのいちぺーじをよみました",
		romaji: "saigonno​ichipejiwoyomimashita",
	},
	{
		jp: "物語が終わりました",
		kana: "ものがたりがおわりました",
		romaji: "monogatariigaowrimashita",
	},
	{
		jp: "余韻に浸ります",
		kana: "よいんにひたります",
		romaji: "yoinnihtasarimasu",
	},
	{
		jp: "感想文を書きます",
		kana: "かんそうぶんをかきます",
		romaji: "kansoubuntokakimasu",
	},
	{
		jp: "本の虜になりました",
		kana: "ほんのとりこになりました",
		romaji: "honnotorikoninnarimashita",
	},
	{
		jp: "読書は瞑想のようです",
		kana: "どくしょはめいそうのようです",
		romaji: "dokusohameisounyouidessu",
	},
	{
		jp: "ページをめくるのが好きです",
		kana: "ぺーじをめくるのがすきです",
		romaji: "pejiwomekurunnogasukidesu",
	},
	{
		jp: "本の中に自分を見つけます",
		kana: "ほんのなかにじぶんをみつけます",
		romaji: "honnonakainjibuntomitsukemasu",
	},
	{
		jp: "名言を記憶しています",
		kana: "めいげんをきおくしています",
		romaji: "meigentokiokusiteimasu",
	},
	{
		jp: "本を通じて世界を広げます",
		kana: "ほんをつうじてせかいをひろげます",
		romaji: "honwotsuujisekaiowohirogamasu",
	},
	{
		jp: "毎日少しずつ読みます",
		kana: "まいにちすこしずつよみます",
		romaji: "mainichisukoshizutuyomimasu",
	},
	{
		jp: "本は人生の友です",
		kana: "ほんはじんせいのともです",
		romaji: "honwajiseinotomodesu",
	},
	{
		jp: "読書の時間は特別です",
		kana: "どくしょのじかんはとくべつです",
		romaji: "dokushonojikantokubetsidesu",
	},
	{
		jp: "本は知識の宝庫です",
		kana: "ほんはちしきのほうこです",
		romaji: "honwachishikinohaukoodesu",
	},
	{
		jp: "本と一緒に成長します",
		kana: "ほんといっしょにせいちょうします",
		romaji: "hontoisshoniseilosushimasu",
	},
	{
		jp: "ご来店ありがとうございます",
		kana: "ごらいてんありがとうございます",
		romaji: "goraitengarigatougozaimasu",
	},
	{
		jp: "本日のおすすめは何ですか",
		kana: "ほんじつのおすすめはなんですか",
		romaji: "honjitsunoosusumewanandesuka",
	},
	{
		jp: "このお店はここがいい",
		kana: "このおみせはここがいい",
		romaji: "konoomisehakokogaii",
	},
	{
		jp: "とても美味しそうですね",
		kana: "とてもおいしそうですね",
		romaji: "temomoishisoudesune",
	},
	{
		jp: "メニューをください",
		kana: "めにゅーをください",
		romaji: "menuuokudassai",
	},
	{
		jp: "水をもらえますか",
		kana: "みずをもらえますか",
		romaji: "mizuomoraemaskaka",
	},
	{
		jp: "おすすめの料理を教えてください",
		kana: "おすすめのりょうりをおしえてください",
		romaji: "osusumenoryourioeoshietekudassai",
	},
	{
		jp: "この料理はどれくらい時間がかかりますか",
		kana: "このりょうりはどれくらいじかんがかかりますか",
		romaji: "konoryourihadorekuraijiakangakakarimaskaka",
	},
	{
		jp: "予約は取れていますか",
		kana: "よやくはとれていますか",
		romaji: "yoyakuhatoretemaskaka",
	},
	{
		jp: "アレルギーはありますか",
		kana: "あれるぎーはありますか",
		romaji: "areguurihiarimasuka",
	},
	{
		jp: "辛いのが好きですか",
		kana: "からいのがすきですか",
		romaji: "karainoagasukidesuka",
	},
	{
		jp: "どんな料理が食べたいですか",
		kana: "どんなりょうりがたべたいですか",
		romaji: "donnaryourigataetaidesuka",
	},
	{
		jp: "今日はいっぱいです",
		kana: "きょうはいっぱいです",
		romaji: "kyouwaippaidesuu",
	},
	{
		jp: "待ち時間はどのくらいですか",
		kana: "またじかんはどのくらいですか",
		romaji: "matajikanhaudounkuraidesuka",
	},
	{
		jp: "一番人気は何ですか",
		kana: "いちばんにんきはなんですか",
		romaji: "ichibanninkihanandeskaka",
	},
	{
		jp: "ここは何時まで営業していますか",
		kana: "ここはなんじまでえいぎょうしていますか",
		romaji: "kokohananjimadeeiggyoushitemasukas",
	},
	{
		jp: "デリバリーはできますか",
		kana: "でりばりーはできますか",
		romaji: "deribaarihadekimasuka",
	},
	{
		jp: "テイクアウトは可能ですか",
		kana: "ていくあうとはかのうですか",
		romaji: "teikuautohakanoudesuka",
	},
	{
		jp: "割引はありますか",
		kana: "わりびきはありますか",
		romaji: "waribikihaarimasuka",
	},
	{
		jp: "ラーメンをください",
		kana: "らーめんをください",
		romaji: "raamenokudassai",
	},
	{
		jp: "カレーが大好きです",
		kana: "かれーがだいすきです",
		romaji: "karaeegadaisukidesuu",
	},
	{
		jp: "天ぷらはおいしいですね",
		kana: "てんぷらはおいしいですね",
		romaji: "tenpurahaoishiidesune",
	},
	{
		jp: "焼肉が食べたい",
		kana: "やきにくがたべたい",
		romaji: "yakinikugataetai",
	},
	{
		jp: "パスタはおいしい",
		kana: "ぱすたはおいしい",
		romaji: "pasutahaoishii",
	},
	{
		jp: "ステーキが好きです",
		kana: "すてーきがすきです",
		romaji: "suteakigasukidesuu",
	},
	{
		jp: "紅茶はありますか",
		kana: "こうちゃはありますか",
		romaji: "kouchahaarimasuka",
	},
	{
		jp: "ジュースをもらえますか",
		kana: "じゅーすをもらえますか",
		romaji: "jusuuomoraemaskaka",
	},
	{
		jp: "アイスコーヒーください",
		kana: "あいすこーひーください",
		romaji: "aisukohiikudassai",
	},
	{
		jp: "ビールが飲みたい",
		kana: "びーるがのみたい",
		romaji: "biruluganomitai",
	},
	{
		jp: "白ワインをください",
		kana: "しろわいんをください",
		romaji: "shirowainokudassai",
	},
	{
		jp: "赤ワイン下さい",
		kana: "あかわいんください",
		romaji: "akawainokudassai",
	},
	{
		jp: "サラダをください",
		kana: "さらだをください",
		romaji: "saradaokudassai",
	},
	{
		jp: "スープはありますか",
		kana: "すーぷはありますか",
		romaji: "suupuhaarimasuka",
	},
	{
		jp: "デザートは何ですか",
		kana: "でざーとはなんですか",
		romaji: "dezaatohanandesuka",
	},
	{
		jp: "ケーキが食べたい",
		kana: "けーきがたべたい",
		romaji: "keakigatsetai",
	},
	{
		jp: "アイスクリームください",
		kana: "あいすくりーむください",
		romaji: "aisukuriimuokudassai",
	},
	{
		jp: "フルーツはありますか",
		kana: "ふるーつはありますか",
		romaji: "furuutsuhaarimasuka",
	},
	{
		jp: "卵焼きをください",
		kana: "たまごやきをください",
		romaji: "tamagoyakiokudassai",
	},
	{
		jp: "唐揚げは好きですか",
		kana: "からあげはすきですか",
		romaji: "karaagehasukidesuka",
	},
	{
		jp: "味噌汁をください",
		kana: "みそしるをください",
		romaji: "misoshiruokudassai",
	},
	{
		jp: "ご飯をください",
		kana: "ごはんをください",
		romaji: "gohanokudassai",
	},
	{
		jp: "うどんが好きです",
		kana: "うどんがすきです",
		romaji: "udongasukidesuu",
	},
	{
		jp: "蕎麦を食べたい",
		kana: "そばをたべたい",
		romaji: "sobotaetai",
	},
	{
		jp: "天丼をください",
		kana: "てんどんをください",
		romaji: "tendonokudassai",
	},
	{
		jp: "カツ丼ください",
		kana: "かつどんください",
		romaji: "katsudonkudassai",
	},
	{
		jp: "ハンバーグが好きです",
		kana: "はんばーぐがすきです",
		romaji: "hanbaaguasuakidesuu",
	},
	{
		jp: "チキンをください",
		kana: "ちきんをください",
		romaji: "chikinokudassai",
	},
	{
		jp: "ピザはありますか",
		kana: "ぴざはありますか",
		romaji: "pizahaarimasuka",
	},
	{
		jp: "サンドイッチをください",
		kana: "さんどいっちをください",
		romaji: "sandoitchiokudassai",
	},
	{
		jp: "バーガーが食べたい",
		kana: "ばーがーがたべたい",
		romaji: "baagaagatetai",
	},
	{
		jp: "フライドポテト好きです",
		kana: "ふらいどぽてとすきです",
		romaji: "furaidopotetosukidesuu",
	},
	{
		jp: "チョコレートをください",
		kana: "ちょこれーとをください",
		romaji: "chokorettookudassai",
	},
	{
		jp: "イチゴは好きですか",
		kana: "いちごはすきですか",
		romaji: "ichigohaasukidesuka",
	},
	{
		jp: "バナナをください",
		kana: "ばななをください",
		romaji: "bananaokudassai",
	},
	{
		jp: "ブルーベリーが好きです",
		kana: "ぶるーべりーがすきです",
		romaji: "buraaberiigasukidesuu",
	},
	{
		jp: "トマトはありますか",
		kana: "ときかトマトはありますか",
		romaji: "tomattohaarimaskaka",
	},
	{
		jp: "タマネギをください",
		kana: "たまねぎをください",
		romaji: "tamanegikudassai",
	},
	{
		jp: "チーズが好きですね",
		kana: "ちーずがすきですね",
		romaji: "chiizugasukidesune",
	},
	{
		jp: "バタートーストください",
		kana: "ばたーとーすとください",
		romaji: "bataatoastokudassai",
	},
	{
		jp: "ジャムはありますか",
		kana: "じゃむはありますか",
		romaji: "jamuhaarimasuka",
	},
	{
		jp: "ハチミツをください",
		kana: "はちみつをください",
		romaji: "hachimitsuokudassai",
	},
	{
		jp: "ヨーグルトが好きです",
		kana: "よーぐるとがすきです",
		romaji: "yougurutogasukidesuu",
	},
	{
		jp: "これはいくらですか",
		kana: "これはいくらですか",
		romaji: "korehaaikuradesuka",
	},
	{
		jp: "全部でいくらですか",
		kana: "ぜんぶでいくらですか",
		romaji: "zenbudeaikuradesuka",
	},
	{
		jp: "会計をお願いします",
		kana: "かいけいをおねがいします",
		romaji: "kaikeioonegaishimasu",
	},
	{
		jp: "クレジットカードは使えますか",
		kana: "くれじっとかーどはつかえますか",
		romaji: "kurejittokaddohatsukaemasuka",
	},
	{
		jp: "現金でいいですか",
		kana: "げんきんでいいですか",
		romaji: "genkindeidesuka",
	},
	{
		jp: "ポイントはありますか",
		kana: "ぽいんとはありますか",
		romaji: "pointohaarimasuka",
	},
	{
		jp: "割引クーポンはありますか",
		kana: "わりびきくーぽんはありますか",
		romaji: "waribikikuupoonhaarimasuka",
	},
	{
		jp: "誕生日割引がありますか",
		kana: "たんじょうびわりびきがありますか",
		romaji: "tanjoubiwaribikigaarimasuka",
	},
	{
		jp: "学生割引はありますか",
		kana: "がくせいわりびきはありますか",
		romaji: "gakuseiwaribikihaarimasuka",
	},
	{
		jp: "シニア割引がありますか",
		kana: "しにあわりびきがありますか",
		romaji: "shiniawambikiigaarimasuka",
	},
	{
		jp: "お水をもっとください",
		kana: "おみずをもっとください",
		romaji: "omizuomottokudassai",
	},
	{
		jp: "おしぼりをください",
		kana: "おしぼりをください",
		romaji: "oshiboriokudassai",
	},
	{
		jp: "塩をもらえますか",
		kana: "しおをもらえますか",
		romaji: "shioommoraemaskaka",
	},
	{
		jp: "醤油をください",
		kana: "しょうゆをください",
		romaji: "shouyuokudassai",
	},
	{
		jp: "ソースはありますか",
		kana: "そーすはありますか",
		romaji: "sosuhaarimasuka",
	},
	{
		jp: "砂糖をもらえますか",
		kana: "さたうをもらえますか",
		romaji: "satouomoraemaskaka",
	},
	{
		jp: "スプーンをください",
		kana: "すぷーんをください",
		romaji: "supuunokudassai",
	},
	{
		jp: "フォークをください",
		kana: "ふぉーくをください",
		romaji: "foakuokudassai",
	},
	{
		jp: "ナイフをください",
		kana: "ないふをください",
		romaji: "naifuokudassai",
	},
	{
		jp: "ストローをもらえますか",
		kana: "すとろーをもらえますか",
		romaji: "sutorooommoraemaskaka",
	},
	{
		jp: "皿をもう一枚ください",
		kana: "さらをもういちまいください",
		romaji: "saraoomouichimaikudassai",
	},
	{
		jp: "グラスをください",
		kana: "ぐらすをください",
		romaji: "gurasukudassai",
	},
	{
		jp: "ナプキンをください",
		kana: "なぷきんをください",
		romaji: "napukinokudassai",
	},
	{
		jp: "温度はちょうど良いですか",
		kana: "おんどはちょうどよいですか",
		romaji: "ondohachoudoyodesuka",
	},
	{
		jp: "味はどうですか",
		kana: "あじはどうですか",
		romaji: "ajihadoudesuka",
	},
	{
		jp: "質問があります",
		kana: "しつもんがあります",
		romaji: "shitsumonagarimasu",
	},
	{
		jp: "トイレはどこですか",
		kana: "といれはどこですか",
		romaji: "toirehadokodesuka",
	},
	{
		jp: "Wi-Fiはありますか",
		kana: "わいふぁいはありますか",
		romaji: "waifaihaarimasuka",
	},
	{
		jp: "携帯を充電できますか",
		kana: "けいたいをじゅうでんできますか",
		romaji: "keitaiojuudendekiramaska",
	},
	{
		jp: "駐車場はありますか",
		kana: "ちゅうしゃじょうはありますか",
		romaji: "chuushajohaarimasuka",
	},
	{
		jp: "予約は必要ですか",
		kana: "よやくはひつようですか",
		romaji: "yoyakuhahitsuyoudesuka",
	},
	{
		jp: "喫煙席ですか禁煙席ですか",
		kana: "きつえんせきですかきんえんせきですか",
		romaji: "kitsueensekidesukakinnensekidesuka",
	},
	{
		jp: "キッズメニューはありますか",
		kana: "きっずめにゅーはありますか",
		romaji: "kizzumenlyuhaarimasuka",
	},
	{
		jp: "ベビーチェアはありますか",
		kana: "べびーちぇあはありますか",
		romaji: "bebiichiheaaarimasuka",
	},
	{
		jp: "ペットは連れて来てもいいですか",
		kana: "ぺっとはつれてきてもいいですか",
		romaji: "pettohatsuretkitemoimidesuka",
	},
	{
		jp: "営業時間を教えてください",
		kana: "えいぎょうじかんをおしえてください",
		romaji: "eigyoujikannoeoshietekudassai",
	},
	{
		jp: "定休日は何日ですか",
		kana: "ていきゅうびはなんにちですか",
		romaji: "teikyubihanannnichideska",
	},
	{
		jp: "雰囲気がいいお店ですね",
		kana: "ふんいきがいいおみせですね",
		romaji: "funikigaiomishedesune",
	},
	{
		jp: "お腹がすきました",
		kana: "おなかがすきました",
		romaji: "onakagasukimashita",
	},
	{
		jp: "たべものが食べたい",
		kana: "たべものがたべたい",
		romaji: "tabemonogateetai",
	},
	{
		jp: "何か食べましょう",
		kana: "なにかたべましょう",
		romaji: "nanakatabemashou",
	},
	{
		jp: "ご飯に行きましょう",
		kana: "ごはんにいきましょう",
		romaji: "gohanniiikimashou",
	},
	{
		jp: "どこで食べましょうか",
		kana: "どこでたべましょうか",
		romaji: "dododetabemashouka",
	},
	{
		jp: "いいお店を知っています",
		kana: "いいおみせをしっています",
		romaji: "iiomisheeoshittemaasu",
	},
	{
		jp: "新しいカフェができました",
		kana: "あたらしいかふぇができました",
		romaji: "atarashiikafuedekimashita",
	},
	{
		jp: "今日は何が食べたいですか",
		kana: "きょうはなにがたべたいですか",
		romaji: "kyouhaanigataeetaidesuka",
	},
	{
		jp: "辛い食べ物が好きです",
		kana: "からいたべものがすきです",
		romaji: "karaitabemonogasukidesuu",
	},
	{
		jp: "甘いお菓子が好きです",
		kana: "あまいおかしがすきです",
		romaji: "amaiiokashigasukidesuu",
	},
	{
		jp: "塩辛いのは苦手です",
		kana: "しおからいのはにがてです",
		romaji: "shiokarainohagatdesu",
	},
	{
		jp: "酸っぱいのは好きですか",
		kana: "すっぱいのはすきですか",
		romaji: "suppaiinohasukidesuka",
	},
	{
		jp: "苦いコーヒーが好きです",
		kana: "にがいこーひーがすきです",
		romaji: "nigaikoohiigasukidesuu",
	},
	{
		jp: "このお店はいつも混んでいます",
		kana: "このおみせはいつもこんでいます",
		romaji: "konoomisehaitsumokondetimasu",
	},
	{
		jp: "明日また来たいです",
		kana: "あしたまたきたいです",
		romaji: "ashitamataakitaidesuu",
	},
	{
		jp: "友達と一緒に来ました",
		kana: "ともだちといっしょにきました",
		romaji: "tomodachitoisshonnikimashita",
	},
	{
		jp: "家族みんなで来ています",
		kana: "かぞくみんなできています",
		romaji: "kazokuinnnadekitemaasu",
	},
	{
		jp: "デートで来ました",
		kana: "でーとできました",
		romaji: "deatodekimashita",
	},
	{
		jp: "お仕事の帰りです",
		kana: "おしごとのかえりです",
		romaji: "oshigotonokaeridesuu",
	},
	{
		jp: "学校帰りにいつも寄ります",
		kana: "がっこうかえりにいつもよります",
		romaji: "gakkoukaeriniiituuyoyorimasu",
	},
	{
		jp: "ここは何度目ですか",
		kana: "ここはなんどめですか",
		romaji: "kokohanandomedesuka",
	},
	{
		jp: "リピーターです",
		kana: "りぴーたーです",
		romaji: "ripitaadesu",
	},
	{
		jp: "初めて来ました",
		kana: "はじめてきました",
		romaji: "hajimetekimashita",
	},
	{
		jp: "いつも一人で来ます",
		kana: "いつもひとりできます",
		romaji: "itsumohitoridekimasu",
	},
	{
		jp: "安くていいお店ですね",
		kana: "やすくていいおみせですね",
		romaji: "yasukuteiomishedesune",
	},
	{
		jp: "高級レストランです",
		kana: "こうきゅうれすとらんです",
		romaji: "koukyuresutoランです",
	},
	{
		jp: "カジュアルな雰囲気が好きです",
		kana: "かじゅあるなふんいきがすきです",
		romaji: "kajuarunafunikigasukidesuu",
	},
	{
		jp: "フォーマルな服装で来ました",
		kana: "ふぉーまるなふくそうできました",
		romaji: "foamaarunafukusodetekimashita",
	},
	{
		jp: "スタッフが親切です",
		kana: "すたっふがしんせつです",
		romaji: "sutaffugashinsetsudesuu",
	},
	{
		jp: "サービスがいいですね",
		kana: "さーびすがいいですね",
		romaji: "sabisugaidesune",
	},
	{
		jp: "綺麗なお店です",
		kana: "きれいなおみせです",
		romaji: "kireiinaomishedesuu",
	},
	{
		jp: "雰囲気が落ち着いています",
		kana: "ふんいきがおちついています",
		romaji: "funikigaochtsuitemaasu",
	},
	{
		jp: "うるさいですね",
		kana: "うるさいですね",
		romaji: "urusaidesune",
	},
	{
		jp: "静かでいいですね",
		kana: "しずかでいいですね",
		romaji: "shizukaadeidesune",
	},
	{
		jp: "明るいお店ですね",
		kana: "あかるいおみせですね",
		romaji: "akaruomishedesune",
	},
	{
		jp: "暗い雰囲気も好きです",
		kana: "くらいふんいきもすきです",
		romaji: "kuraifunnikigasukidesuu",
	},
	{
		jp: "窓からの景色がいいですね",
		kana: "まどからのけしきがいいですね",
		romaji: "madokaranokeshikigaidesune",
	},
	{
		jp: "テラス席がいいですね",
		kana: "てらすせきがいいですね",
		romaji: "terasusekigaidesune",
	},
	{
		jp: "カウンター席に座ります",
		kana: "かうんたーせきにすわります",
		romaji: "kauntasekininsuwarimasu",
	},
	{
		jp: "個室があるといいですね",
		kana: "こしつがあるといいですね",
		romaji: "koshitsugaruutoindesune",
	},
	{
		jp: "一人でも居心地がいいです",
		kana: "ひとりでもいごこちがいいです",
		romaji: "hitoridemoigokochigaidesuu",
	},
	{
		jp: "グループに最適です",
		kana: "ぐるーぷにさいてきです",
		romaji: "gurupuunisaiteki",
	},
	{
		jp: "すごく美味しいです",
		kana: "すごくおいしいです",
		romaji: "sugokuoishiidesu",
	},
	{
		jp: "最高に美味しい",
		kana: "さいこうにおいしい",
		romaji: "saikouniooishi",
	},
	{
		jp: "美味しい以外の言葉がありません",
		kana: "おいしいいがいのことばがありません",
		romaji: "oishiiigainokotobagarimasen",
	},
	{
		jp: "本当に美味しかった",
		kana: "ほんとうにおいしかった",
		romaji: "hontounioishikatta",
	},
	{
		jp: "また食べたいです",
		kana: "またたべたいです",
		romaji: "matataitaidesu",
	},
	{
		jp: "毎日でも食べたい",
		kana: "まいにちでもたべたい",
		romaji: "mainichideomotaetai",
	},
	{
		jp: "癖になる味ですね",
		kana: "くせになるあじですね",
		romaji: "kuseninnarumajinesune",
	},
	{
		jp: "これは究極のおいしさです",
		kana: "これはきゅうきょくのおいしさです",
		romaji: "korehakyuukyokunoaishisadesuu",
	},
	{
		jp: "新しい味の発見です",
		kana: "あたらしいあじのはっけんです",
		romaji: "atarashiiajinohakkendesuu",
	},
	{
		jp: "満足しています",
		kana: "まんぞくしています",
		romaji: "manzokushitemaasu",
	},
	{
		jp: "大満足です",
		kana: "だいまんぞくです",
		romaji: "daimanzokudesuu",
	},
	{
		jp: "期待以上でした",
		kana: "きたいいじょうでした",
		romaji: "kitaiijoudesshita",
	},
	{
		jp: "値段の割に美味しい",
		kana: "ねだんのわりにおいしい",
		romaji: "nedannowarinosoishi",
	},
	{
		jp: "コスパがいいですね",
		kana: "こすぱがいいですね",
		romaji: "kosupaagaidesune",
	},
	{
		jp: "安い割においしい",
		kana: "やすいわりにおいしい",
		romaji: "yasuwaiwarninioishi",
	},
	{
		jp: "高いだけの価値があります",
		kana: "たかいだけのかちがあります",
		romaji: "takaidakenokachigaarimasuu",
	},
	{
		jp: "ボリュームが多い",
		kana: "ぼりゅームがおおい",
		romaji: "boryuumuugaooii",
	},
	{
		jp: "たっぷり食べられます",
		kana: "たっぷりたべられます",
		romaji: "tappuritaberlmasu",
	},
	{
		jp: "量が少ないですね",
		kana: "りょうがすくないですね",
		romaji: "ryouagasukunadesune",
	},
	{
		jp: "小腹が満たされました",
		kana: "こばらがみたされました",
		romaji: "kobaagamitasaremashita",
	},
	{
		jp: "大満腹です",
		kana: "だいまんぷくです",
		romaji: "daimanpukudesuu",
	},
	{
		jp: "食べすぎました",
		kana: "たべすぎました",
		romaji: "tabesugimashita",
	},
	{
		jp: "後悔はありません",
		kana: "こうかいはありません",
		romaji: "koukaiharimasen",
	},
	{
		jp: "また来たくなりました",
		kana: "またきたくなりました",
		romaji: "matakitakunarimashita",
	},
	{
		jp: "友達に勧めたいです",
		kana: "ともだちにすすめたいです",
		romaji: "tomodachinisusumtaidesuu",
	},
	{
		jp: "ここは名店だと思います",
		kana: "ここはめいてんだとおもいます",
		romaji: "kokohameitendattoomoimasu",
	},
	{
		jp: "隠れた名店ですね",
		kana: "かくれためいてんですね",
		romaji: "kakuretemeitendesnne",
	},
	{
		jp: "知る人ぞ知る場所です",
		kana: "しるひとぞしるばしょです",
		romaji: "shiruhitozosirubashodesuu",
	},
	{
		jp: "素晴らしい経験でした",
		kana: "すばらしいけいけんでした",
		romaji: "subarashiikekendesita",
	},
	{
		jp: "記憶に残ります",
		kana: "きおくにのこります",
		romaji: "kiokuninokorittemasu",
	},
	{
		jp: "心が満たされました",
		kana: "こころがみたされました",
		romaji: "kokorougamitasaremashita",
	},
	{
		jp: "天国の味ですね",
		kana: "てんごくのあじですね",
		romaji: "tenngokunoajideennesuu",
	},
	{
		jp: "幸せを感じます",
		kana: "しあわせをかんじます",
		romaji: "shiawaseokanjimasu",
	},
	{
		jp: "思い出がよみがえります",
		kana: "おもいだがよみがえります",
		romaji: "omoidagayomigaerimaau",
	},
	{
		jp: "懐かしい味ですね",
		kana: "なつかしいあじですね",
		romaji: "natsukashiiajideesune",
	},
	{
		jp: "家で食べるより美味しい",
		kana: "いえでたべるよりおいしい",
		romaji: "iedeuataberuyoriooshi",
	},
	{
		jp: "プロの味ですね",
		kana: "ぷろのあじですね",
		romaji: "puronoajideesune",
	},
	{
		jp: "手作りの温もりがあります",
		kana: "てづくりのあたたかみがあります",
		romaji: "tezukurinatatakamigaarimasuu",
	},
	{
		jp: "シェフの技が光ります",
		kana: "しぇふのわざがひかります",
		romaji: "shefunowazahikarimasu",
	},
	{
		jp: "季節の味覚が活きています",
		kana: "きせつのみかくがいきています",
		romaji: "kisetsuonomikakugaikitemaasu",
	},
	{
		jp: "地元の食材を使っています",
		kana: "じもとのしょくざいをつかっています",
		romaji: "jimotoshokuzaiotsukatemaasu",
	},
	{
		jp: "新鮮さが違います",
		kana: "しんせんさがちがいます",
		romaji: "shinsensagachigaimasu",
	},
	{
		jp: "色合いが美しいですね",
		kana: "いろあいがうつくしいですね",
		romaji: "iroagautsukushidesune",
	},
	{
		jp: "器も素敵ですね",
		kana: "うつわもすてきですね",
		romaji: "utsuwamosutekidesune",
	},
	{
		jp: "盛り付けが芸術的ですね",
		kana: "もりつけがげいじゅつてきですね",
		romaji: "moritsukegageijutsuteekideesune",
	},
	{
		jp: "香りが最高です",
		kana: "かおりがさいこうです",
		romaji: "kaoriagasaikodesuu",
	},
	{
		jp: "温かいままで食べられます",
		kana: "あたたかいままでたべられます",
		romaji: "atatakaimamatairaremaasu",
	},
	{
		jp: "冷たさがちょうど良いです",
		kana: "ひえたさがちょうどよいです",
		romaji: "hietasagachouudoyoidesu",
	},
	{
		jp: "食べやすい大きさです",
		kana: "たべやすいおおきさです",
		romaji: "taebeyasiiookisadesu",
	},
	{
		jp: "歯ごたえが良いですね",
		kana: "はごたえがよいですね",
		romaji: "hagotaegayoideesune",
	},
	{
		jp: "とろけるような食感です",
		kana: "とろけるようなしょっかんです",
		romaji: "torokeruuyounashshokankanda",
	},
	{
		jp: "ジューシーですね",
		kana: "じゅーしーですね",
		romaji: "juushideesune",
	},
	{
		jp: "濃厚な味わいです",
		kana: "のうこうなあじわいです",
		romaji: "nookoounajiwaidesuu",
	},
	{
		jp: "後味がいいですね",
		kana: "あとあじがいいですね",
		romaji: "atoajigaidesune",
	},
	{
		jp: "朝起きました。",
		kana: "あさおきました。",
		romaji: "asaokimashita",
	},
	{
		jp: "目覚まし時計が鳴りました。",
		kana: "めざましどけいがなりました。",
		romaji: "mezamashidokeiganarimashita",
	},
	{
		jp: "カーテンを開けます。",
		kana: "かーてんをあけます。",
		romaji: "katenutownakemasu",
	},
	{
		jp: "朝日が入ります。",
		kana: "あさひがはいります。",
		romaji: "asahigahairimasu",
	},
	{
		jp: "顔を洗います。",
		kana: "かおをあらいます。",
		romaji: "kaowaaraimasu",
	},
	{
		jp: "歯を磨きます。",
		kana: "はをみがきます。",
		romaji: "hawomigakimasu",
	},
	{
		jp: "シャワーを浴びます。",
		kana: "しゃわーをあびます。",
		romaji: "shawawoabimasu",
	},
	{
		jp: "朝食を食べます。",
		kana: "ちょうしょくをたべます。",
		romaji: "choushokunotabemasu",
	},
	{
		jp: "パンを食べます。",
		kana: "ぱんをたべます。",
		romaji: "panwotabemasu",
	},
	{
		jp: "卵を焼きます。",
		kana: "たまごをやきます。",
		romaji: "tamagowoyakimasu",
	},
	{
		jp: "コーヒーを飲みます。",
		kana: "こーひーをのみます。",
		romaji: "kohiononimasu",
	},
	{
		jp: "朝のニュースを見ます。",
		kana: "あさのにゅーすをみます。",
		romaji: "asanonyuusuonomimasu",
	},
	{
		jp: "スマートフォンを見ます。",
		kana: "すまーとふぉんをみます。",
		romaji: "sumatofuwonmimasu",
	},
	{
		jp: "服を着ます。",
		kana: "ふくをきます。",
		romaji: "fukuwokimasu",
	},
	{
		jp: "靴を履きます。",
		kana: "くつをはきます。",
		romaji: "kutsuwohakimasu",
	},
	{
		jp: "鞄を持ちます。",
		kana: "かばんをもちます。",
		romaji: "kabannwomochimasu",
	},
	{
		jp: "家を出ます。",
		kana: "いえをでます。",
		romaji: "iewodemasu",
	},
	{
		jp: "駅に行きます。",
		kana: "えきにいきます。",
		romaji: "ekiniikimasu",
	},
	{
		jp: "電車に乗ります。",
		kana: "でんしゃにのります。",
		romaji: "denshaninorimasu",
	},
	{
		jp: "朝練習をします。",
		kana: "あされんしゅうをします。",
		romaji: "asarenshyuuwoshimasu",
	},
	{
		jp: "朝走ります。",
		kana: "あさはしります。",
		romaji: "asahashirimasu",
	},
	{
		jp: "朝ストレッチします。",
		kana: "あさすとれっちします。",
		romaji: "asasutorecchishimasu",
	},
	{
		jp: "朝瞑想をします。",
		kana: "あさめいそうをします。",
		romaji: "asameisoushimasu",
	},
	{
		jp: "日記をつけます。",
		kana: "にっきをつけます。",
		romaji: "nikkiwotsukeimas",
	},
	{
		jp: "メールをチェックします。",
		kana: "めーるをちぇっくします。",
		romaji: "meruowocheckushimasu",
	},
	{
		jp: "計画を立てます。",
		kana: "けいかくをたてます。",
		romaji: "keikakuwotatemasu",
	},
	{
		jp: "朝の準備が完了です。",
		kana: "あさのじゅんびがかんりょうです。",
		romaji: "asanojunbigakanryoudesu",
	},
	{
		jp: "朝が早いです。",
		kana: "あさがはやいです。",
		romaji: "asagahayaiデス",
	},
	{
		jp: "朝は忙しいです。",
		kana: "あさはいそがしいです。",
		romaji: "asahaisogashiiです",
	},
	{
		jp: "昼食を食べます。",
		kana: "ちゅうしょくをたべます。",
		romaji: "chuushokunotabemasu",
	},
	{
		jp: "お昼寝をします。",
		kana: "おひるねをします。",
		romaji: "ohirunewoshimasu",
	},
	{
		jp: "仕事をします。",
		kana: "しごとをします。",
		romaji: "shigotowoshimasu",
	},
	{
		jp: "学校に行きます。",
		kana: "がっこうにいきます。",
		romaji: "gakkouniikimasu",
	},
	{
		jp: "勉強をします。",
		kana: "べんきょうをします。",
		romaji: "benkyouwoshimasu",
	},
	{
		jp: "運動をします。",
		kana: "うんどうをします。",
		romaji: "undouwoshimasu",
	},
	{
		jp: "友達と遊びます。",
		kana: "ともだちとあそびます。",
		romaji: "tomodachitotasobi masu",
	},
	{
		jp: "買い物をします。",
		kana: "かいものをします。",
		romaji: "kaimonowoshimasu",
	},
	{
		jp: "昼寝が好きです。",
		kana: "ひるねがすきです。",
		romaji: "hiruneigasukidesu",
	},
	{
		jp: "午後の時間",
		kana: "ごごのじかん",
		romaji: "gagonojikan",
	},
	{
		jp: "夕食を作ります。",
		kana: "ゆうしょくをつくります。",
		romaji: "yuushokuwotsukurimasu",
	},
	{
		jp: "夕飯を食べます。",
		kana: "ゆうはんをたべます。",
		romaji: "yuuhanwotabemasu",
	},
	{
		jp: "家族と一緒にいます。",
		kana: "かぞくといっしょにいます。",
		romaji: "kazokuoisshooniimasu",
	},
	{
		jp: "テレビを見ます。",
		kana: "てれびをみます。",
		romaji: "terebiwomimasu",
	},
	{
		jp: "本を読みます。",
		kana: "ほんをよみます。",
		romaji: "honwoyomimasu",
	},
	{
		jp: "映画を見ます。",
		kana: "えいがをみます。",
		romaji: "eigawomimasu",
	},
	{
		jp: "音楽を聞きます。",
		kana: "おんがくをききます。",
		romaji: "ongakuwokikimasu",
	},
	{
		jp: "ゲームをします。",
		kana: "げーむをします。",
		romaji: "gemuwoshimasu",
	},
	{
		jp: "友達に電話します。",
		kana: "ともだちにでんわします。",
		romaji: "tomodachinidenwaまします",
	},
	{
		jp: "メールを返信します。",
		kana: "めーるをへんしんします。",
		romaji: "meruwohensingshimasu",
	},
	{
		jp: "夜の散歩をします。",
		kana: "よるのさんぽをします。",
		romaji: "yorunosanpowoshimasu",
	},
	{
		jp: "夜の風は涼しいです。",
		kana: "よるのかぜはすずしいです。",
		romaji: "yorunokazzuhasuZushiiDesu",
	},
	{
		jp: "夜景を見ます。",
		kana: "やけいをみます。",
		romaji: "yakeiwomimasu",
	},
	{
		jp: "星を見ます。",
		kana: "ほしをみます。",
		romaji: "hoshiwomimasu",
	},
	{
		jp: "月を見ます。",
		kana: "つきをみます。",
		romaji: "tsukiwomimasu",
	},
	{
		jp: "夜の空は綺麗です。",
		kana: "よるのそらはきれいです。",
		romaji: "yorunosorahakireidesu",
	},
	{
		jp: "夜中に目が覚めます。",
		kana: "よなかにめがさめます。",
		romaji: "yonakanimegasamemasu",
	},
	{
		jp: "夜更かしをします。",
		kana: "よふかしをします。",
		romaji: "yofukashiwoshimasu",
	},
	{
		jp: "夜は静かです。",
		kana: "よるはしずかです。",
		romaji: "yoruhashizukadesu",
	},
	{
		jp: "夜は涼しいです。",
		kana: "よるはすずしいです。",
		romaji: "yoruhasuZushidesu",
	},
	{
		jp: "夜のルーティン",
		kana: "よるのるーてぃん",
		romaji: "yorunorutin",
	},
	{
		jp: "寝る前に歯を磨きます。",
		kana: "ねるまえにはをみがきます。",
		romaji: "nerumaenikahawomigakimasu",
	},
	{
		jp: "寝る前にスマートフォンを見ます。",
		kana: "ねるまえにすまーとふぉんをみます。",
		romaji: "nerumaenisumatofuwomimasu",
	},
	{
		jp: "寝る前に本を読みます。",
		kana: "ねるまえにほんをよみます。",
		romaji: "nerumaenizhonwoyomimasu",
	},
	{
		jp: "寝る前にお風呂に入ります。",
		kana: "ねるまえにおふろにはいります。",
		romaji: "nerumaeniofuronihairi masu",
	},
	{
		jp: "お風呂は温かいです。",
		kana: "おふろはあたたかいです。",
		romaji: "ofurohaatatakaiです",
	},
	{
		jp: "お風呂でリラックスします。",
		kana: "おふろでりらっくすします。",
		romaji: "ofuroderiraccsushimasu",
	},
	{
		jp: "就寝前の習慣",
		kana: "しゅうしんまえのしゅうかん",
		romaji: "shuushinmarenoshyuukan",
	},
	{
		jp: "寝室の準備をします。",
		kana: "しんしつのじゅんびをします。",
		romaji: "shintsitsnojunbiwoshimasu",
	},
	{
		jp: "カーテンを閉じます。",
		kana: "かーてんをとじます。",
		romaji: "katenutotojimasu",
	},
	{
		jp: "眠いです。",
		kana: "ねむいです。",
		romaji: "nemuidesu",
	},
	{
		jp: "目が重いです。",
		kana: "めがおもいです。",
		romaji: "megaomoidesuu",
	},
	{
		jp: "布団に入ります。",
		kana: "ふとんにはいります。",
		romaji: "futonnihairimaす",
	},
	{
		jp: "ベッドに入ります。",
		kana: "べっどにはいります。",
		romaji: "beddonihairiもasu",
	},
	{
		jp: "枕が好きです。",
		kana: "まくらがすきです。",
		romaji: "makuragasukidesu",
	},
	{
		jp: "毛布を被ります。",
		kana: "もうふをかぶります。",
		romaji: "moufuwokaburimasu",
	},
	{
		jp: "掛け布団がいります。",
		kana: "かけふとんがいります。",
		romaji: "kakefutonjagairimasu",
	},
	{
		jp: "シーツを替えます。",
		kana: "しーつをかえます。",
		romaji: "shitsuwokaemasu",
	},
	{
		jp: "寝返りします。",
		kana: "ねがえりします。",
		romaji: "negaeri shimasu",
	},
	{
		jp: "熟睡します。",
		kana: "じゅくすいします。",
		romaji: "jukusuishimasu",
	},
	{
		jp: "睡眠を取ります。",
		kana: "すいみんをとります。",
		romaji: "suiminwotorimanasu",
	},
	{
		jp: "睡眠が大切です。",
		kana: "すいみんがたいせつです。",
		romaji: "suimingataisetsuddesu",
	},
	{
		jp: "睡眠不足です。",
		kana: "すいみんぶそくです。",
		romaji: "suiminbusokuddesu",
	},
	{
		jp: "よく眠ります。",
		kana: "よくねむります。",
		romaji: "yokunnemurimasu",
	},
	{
		jp: "ぐっすり眠ります。",
		kana: "ぐっすりねむります。",
		romaji: "gussurinemurimasu",
	},
	{
		jp: "朝までぐっすりです。",
		kana: "あさまでぐっすりです。",
		romaji: "asamadegussurides",
	},
	{
		jp: "目覚めが悪いです。",
		kana: "めざめがわるいです。",
		romaji: "mezamegawaruidesuu",
	},
	{
		jp: "起きたくありません。",
		kana: "おきたくありません。",
		romaji: "okitakuarimasen",
	},
	{
		jp: "もう少し寝たいです。",
		kana: "もうすこしねたいです。",
		romaji: "mousukoshinetaiです",
	},
	{
		jp: "寝坊しました。",
		kana: "ねぼうしました。",
		romaji: "neboushimashita",
	},
	{
		jp: "目覚ましが鳴ります。",
		kana: "めざましがなります。",
		romaji: "mezamashiganarimasu",
	},
	{
		jp: "スヌーズボタンを押します。",
		kana: "すぬーずぼたんをおします。",
		romaji: "snuzubotannwoshimasu",
	},
	{
		jp: "朝寝坊します。",
		kana: "あさねぼうします。",
		romaji: "asaneboushimasu",
	},
	{
		jp: "アラーム音がうるさいです。",
		kana: "あらーむおんがうるさいです。",
		romaji: "alarumonngaurresaiです",
	},
	{
		jp: "目が覚めます。",
		kana: "めがさめます。",
		romaji: "megasamemasu",
	},
	{
		jp: "パッチリ目が覚めます。",
		kana: "ぱっちりめがさめます。",
		romaji: "patchirimegasamemasu",
	},
	{
		jp: "ぼーっとしています。",
		kana: "ぼーっとしています。",
		romaji: "botoshite imasu",
	},
	{
		jp: "まだ眠いです。",
		kana: "まだねむいです。",
		romaji: "madanemuidesu",
	},
	{
		jp: "頭がすっきりしません。",
		kana: "あたまがすっきりしません。",
		romaji: "atamgassukirriashimasen",
	},
	{
		jp: "目をこすります。",
		kana: "めをこすります。",
		romaji: "mewokosorimasuu",
	},
	{
		jp: "寝る時間です。",
		kana: "ねるじかんです。",
		romaji: "nerujikandesu",
	},
	{
		jp: "もう眠い時間です。",
		kana: "もうねむいじかんです。",
		romaji: "mounemuijikandesu",
	},
	{
		jp: "床に就きます。",
		kana: "ゆかについきます。",
		romaji: "yukanitsukimasu",
	},
	{
		jp: "寝床が気持ちいいです。",
		kana: "ねどこがきもちいいです。",
		romaji: "nedokogakimochiiidesu",
	},
	{
		jp: "寝たいです。",
		kana: "ねたいです。",
		romaji: "netaiidesu",
	},
	{
		jp: "まだ寝たくありません。",
		kana: "まだねたくありません。",
		romaji: "madanetakuarimasen",
	},
	{
		jp: "もう寝ます。",
		kana: "もうねます。",
		romaji: "mounemasu",
	},
	{
		jp: "おやすみなさい。",
		kana: "おやすみなさい。",
		romaji: "oyasuминasai",
	},
	{
		jp: "寝ます。",
		kana: "ねます。",
		romaji: "nemasu",
	},
	{
		jp: "もう朝になります。",
		kana: "もうあさになります。",
		romaji: "mouasaninaгrimasu",
	},
	{
		jp: "悪い夢を見ました。",
		kana: "わるいゆめをみました。",
		romaji: "waruiyumewomiました",
	},
	{
		jp: "いい夢を見ました。",
		kana: "いいゆめをみました。",
		romaji: "iiyumewomiました",
	},
	{
		jp: "変な夢を見ました。",
		kana: "へんなゆめをみました。",
		romaji: "hennaayumewomiました",
	},
	{
		jp: "夢を覚えていません。",
		kana: "ゆめをおぼえていません。",
		romaji: "yumewooboeていません",
	},
	{
		jp: "夢を見ながら寝ます。",
		kana: "ゆめをみながらねます。",
		romaji: "yumewominаgaranemasu",
	},
	{
		jp: "眠りが浅いです。",
		kana: "ねむりがあさいです。",
		romaji: "nemurгagaasaiです",
	},
	{
		jp: "眠りが深いです。",
		kana: "ねむりがふかいです。",
		romaji: "nemurгagafukaiです",
	},
	{
		jp: "ぐっすり寝ることができました。",
		kana: "ぐっすりねることができました。",
		romaji: "gussurineることができました",
	},
	{
		jp: "夜中に何度も目が覚めます。",
		kana: "よなかになんどもめがさめます。",
		romaji: "yonakaninandоmomegasamemasu",
	},
	{
		jp: "朝までぐっすり寝ました。",
		kana: "あさまでぐっすりねました。",
		romaji: "asamadegussurineました",
	},
	{
		jp: "布団から出ます。",
		kana: "ふとんからでます。",
		romaji: "futonkarademasu",
	},
	{
		jp: "寝巻きを脱ぎます。",
		kana: "ねまきをぬぎます。",
		romaji: "nemakiwonugimasu",
	},
	{
		jp: "パジャマを脱ぎます。",
		kana: "ぱじゃまをぬぎます。",
		romaji: "pajamawonugimasu",
	},
	{
		jp: "朝の準備をします。",
		kana: "あさのじゅんびをします。",
		romaji: "asanojunbiwoshimasu",
	},
	{
		jp: "朝の儀式があります。",
		kana: "あさのぎしきがあります。",
		romaji: "asanogishikigaаrimasu",
	},
	{
		jp: "毎朝同じことをします。",
		kana: "まいあさおなじことをします。",
		romaji: "maiasaonajikotowoshimasu",
	},
	{
		jp: "朝ご飯を食べます。",
		kana: "あさごはんをたべます。",
		romaji: "asagohanwotabemasu",
	},
	{
		jp: "朝が来ました。",
		kana: "あさがきました。",
		romaji: "asagakimashita",
	},
	{
		jp: "朝日が昇ります。",
		kana: "あさひがのぼります。",
		romaji: "asahiganoborimanasu",
	},
	{
		jp: "朝の光が入ります。",
		kana: "あさのひかりがはいります。",
		romaji: "asanohikarihaがhаirimasu",
	},
	{
		jp: "夕食の準備をします。",
		kana: "ゆうしょくのじゅんびをします。",
		romaji: "yuushоkunojunbiwoshimasu",
	},
	{
		jp: "料理を作ります。",
		kana: "りょうりをつくります。",
		romaji: "ryouriwotsukurimasu",
	},
	{
		jp: "ご飯を炊きます。",
		kana: "ごはんをたきます。",
		romaji: "gohanwotakimasu",
	},
	{
		jp: "野菜を切ります。",
		kana: "やさいをきります。",
		romaji: "yasaiwokirimasu",
	},
	{
		jp: "お米を研ぎます。",
		kana: "おこめをとぎます。",
		romaji: "okomewotogimasu",
	},
	{
		jp: "フライパンで調理します。",
		kana: "ふらいぱんでちょうりします。",
		romaji: "furaipandechourishimasu",
	},
	{
		jp: "食器を洗います。",
		kana: "しょっきをあらいます。",
		romaji: "shokkiwaaraimasu",
	},
	{
		jp: "台所を片付けます。",
		kana: "だいどころをかたづけます。",
		romaji: "daidokorowokatadzukemasu",
	},
	{
		jp: "食事の後、休みます。",
		kana: "しょくじのあと、やすみます。",
		romaji: "shokujinоato_yasumimasu",
	},
	{
		jp: "くつろぎます。",
		kana: "くつろぎます。",
		romaji: "kutsurоgimasu",
	},
	{
		jp: "リラックスします。",
		kana: "りらっくすします。",
		romaji: "rilaxushimasu",
	},
	{
		jp: "落ち着きます。",
		kana: "おちつきます。",
		romaji: "otchitsukimasu",
	},
	{
		jp: "瞑想をします。",
		kana: "めいそうをします。",
		romaji: "meisouwoshimasu",
	},
	{
		jp: "ヨガをします。",
		kana: "よがをします。",
		romaji: "yogawoshimasu",
	},
	{
		jp: "ストレッチをします。",
		kana: "すとれっちをします。",
		romaji: "sutorecchiwoshimasu",
	},
	{
		jp: "音楽でリラックスします。",
		kana: "おんがくでりらっくすします。",
		romaji: "ongakuderiraxushimasu",
	},
	{
		jp: "アロマテラピーをします。",
		kana: "あろまてらぴーをします。",
		romaji: "aromaterappiwoshimasu",
	},
	{
		jp: "ハーブティーを飲みます。",
		kana: "はーぶてぃーをのみます。",
		romaji: "habteononimasu",
	},
	{
		jp: "温かい飲み物が好きです。",
		kana: "あたたかいのみものがすきです。",
		romaji: "atatakainonominogasukidesu",
	},
	{
		jp: "寝る前に温かいお茶を飲みます。",
		kana: "ねるまえにあたたかいおちゃをのみます。",
		romaji: "nerumaeniatatakaiochaonominasu",
	},
	{
		jp: "寝室は暗いです。",
		kana: "しんしつはくらいです。",
		romaji: "shintsutsuhakulaiです",
	},
	{
		jp: "寝室は静かです。",
		kana: "しんしつはしずかです。",
		romaji: "shintsutsuhashizukadesu",
	},
	{
		jp: "寝室の温度がいいです。",
		kana: "しんしつのおんどがいいです。",
		romaji: "shintsutsunoondogaiidesu",
	},
	{
		jp: "エアコンを付けます。",
		kana: "えあこんをつけます。",
		romaji: "eakonwotsukemasu",
	},
	{
		jp: "窓を閉じます。",
		kana: "まどをとじます。",
		romaji: "madowotojimasu",
	},
	{
		jp: "明かりを消します。",
		kana: "あかりをけします。",
		romaji: "akarikwokeshmasu",
	},
	{
		jp: "ライトを消します。",
		kana: "らいとをけします。",
		romaji: "raitwokeshimasu",
	},
	{
		jp: "懐中電灯が必要です。",
		kana: "かいちゅうでんとうがひつようです。",
		romaji: "kaichudentougahitsuyoudesu",
	},
	{
		jp: "夜間照明があります。",
		kana: "やかんしょうめいがあります。",
		romaji: "yakanshoumeiگaаrimasu",
	},
	{
		jp: "寝室はとても快適です。",
		kana: "しんしつはとてもかいてきです。",
		romaji: "shintsutsuhatotemokaitekidesu",
	},
	{
		jp: "寝坊は絶対にしません。",
		kana: "ねぼうはぜったいにしません。",
		romaji: "nebouhazzettainishimasen",
	},
	{
		jp: "毎日同じ時間に寝ます。",
		kana: "まいにちおなじじかんにねます。",
		romaji: "mainichionaじjikannninemasu",
	},
	{
		jp: "毎日同じ時間に起きます。",
		kana: "まいにちおなじじかんにおきます。",
		romaji: "mainichionaじjikanniokimasu",
	},
	{
		jp: "朝早く目が覚めます。",
		kana: "あさはやくめがさめます。",
		romaji: "asahayakumegasamemasu",
	},
	{
		jp: "夜遅くまで起きています。",
		kana: "よるおそくまでおきています。",
		romaji: "yoruosokuمadeokiteimasu",
	},
	{
		jp: "寝つきが良いです。",
		kana: "ねつきがよいです。",
		romaji: "netsukigayoidesu",
	},
	{
		jp: "寝つきが悪いです。",
		kana: "ねつきがわるいです。",
		romaji: "netsukigawaruidesuu",
	},
	{
		jp: "朝シャワーを浴びます。",
		kana: "あさしゃわーをあびます。",
		romaji: "asashawawoabimasu",
	},
	{
		jp: "夜シャワーを浴びます。",
		kana: "よるしゃわーをあびます。",
		romaji: "yorushawawoabimasu",
	},
	{
		jp: "毎朝体操をします。",
		kana: "まいあさたいそうをします。",
		romaji: "maiasataisouwoshimasu",
	},
	{
		jp: "朝の習慣があります。",
		kana: "あさのしゅうかんがあります。",
		romaji: "asanoshyuukangaаrimasu",
	},
	{
		jp: "夜の習慣があります。",
		kana: "よるのしゅうかんがあります。",
		romaji: "yorunoshyuukangaаrimasu",
	},
	{
		jp: "就寝時間は十時です。",
		kana: "しゅうしんじかんはじゅうじです。",
		romaji: "shuushinjikanhaじuじです",
	},
	{
		jp: "起床時間は六時です。",
		kana: "きしょうじかんはろくじです。",
		romaji: "kishoujikanharokijです",
	},
	{
		jp: "朝は時間がありません。",
		kana: "あさはじかんがありません。",
		romaji: "asahajikangariarimas",
	},
	{
		jp: "朝は急いでいます。",
		kana: "あさはいそいでいます。",
		romaji: "asahaisoидdeimasu",
	},
	{
		jp: "夜はのんびりしています。",
		kana: "よるはのんびりしています。",
		romaji: "yoruhanobiriشiteimasu",
	},
	{
		jp: "床に着きます。",
		kana: "しょうにつきます。",
		romaji: "shounitsukimasu",
	},
	{
		jp: "朝が来ています。",
		kana: "あさがきています。",
		romaji: "asagakiteimasu",
	},
	{
		jp: "新しい朝が来ました。",
		kana: "あたらしいあさがきました。",
		romaji: "atarashiiasagakimashita",
	},
	{
		jp: "朝五時に起きます。",
		kana: "あさごじにおきます。",
		romaji: "asagojiniokimasu",
	},
	{
		jp: "朝六時に起きます。",
		kana: "あさろくじにおきます。",
		romaji: "asarokujiniokimasu",
	},
	{
		jp: "朝七時に起きます。",
		kana: "あさしちじにおきます。",
		romaji: "asashichijiniokimasu",
	},
	{
		jp: "夜十一時に寝ます。",
		kana: "よるじゅういちじにねます。",
		romaji: "yorujyuuichijininemasu",
	},
	{
		jp: "夜十二時に寝ます。",
		kana: "よるじゅうにじにねます。",
		romaji: "yorujyuunijininemasu",
	},
	{
		jp: "朝飯を食べます。",
		kana: "あさめしをたべます。",
		romaji: "asameshiwotabemasu",
	},
	{
		jp: "朝ごはんが美味しいです。",
		kana: "あさごはんがおいしいです。",
		romaji: "asagohanigaoishiiです",
	},
	{
		jp: "朝食は大切です。",
		kana: "ちょうしょくはたいせつです。",
		romaji: "choushokhutaisetsuddesu",
	},
	{
		jp: "朝食を抜きません。",
		kana: "ちょうしょくをぬきません。",
		romaji: "choushokunukinаsen",
	},
	{
		jp: "朝、目覚ましで起きます。",
		kana: "あさめざましでおきます。",
		romaji: "asamezamashidеокimasu",
	},
	{
		jp: "毎朝コーヒーを飲みます。",
		kana: "まいあさこーひーをのみます。",
		romaji: "maiasacohiononimasu",
	},
	{
		jp: "朝のコーヒーが好きです。",
		kana: "あさのこーひーがすきです。",
		romaji: "asancoheigasukideysu",
	},
	{
		jp: "朝日を浴びます。",
		kana: "あさひをあびます。",
		romaji: "asahiwoabimasu",
	},
	{
		jp: "朝日は気持ちいいです。",
		kana: "あさひはきもちいいです。",
		romaji: "asahihakimochiiidesu",
	},
	{
		jp: "夕方になりました。",
		kana: "ゆうがたになりました。",
		romaji: "yugatan arinaggashita",
	},
	{
		jp: "夕焼けが綺麗です。",
		kana: "ゆうやけがきれいです。",
		romaji: "yuyakegakireidesu",
	},
	{
		jp: "夜明けが来ました。",
		kana: "よあけがきました。",
		romaji: "yoakegakimashita",
	},
	{
		jp: "真夜中です。",
		kana: "まよなかです。",
		romaji: "mayonakadesu",
	},
	{
		jp: "真夜中に目が覚めます。",
		kana: "まよなかにめがさめます。",
		romaji: "mayonakanimegasamemasu",
	},
	{
		jp: "また夜が明けました。",
		kana: "またよがあけました。",
		romaji: "matayogaakemashita",
	},
	{
		jp: "田んぼに水をやる",
		kana: "たんぼにみずをやる",
		romaji: "tanbonimizuwyaru",
	},
	{
		jp: "野菜を育てる",
		kana: "やさいをそだてる",
		romaji: "yasaiywosodateru",
	},
	{
		jp: "米を収穫する",
		kana: "こめをしゅうかくする",
		romaji: "komewoshuukakusuru",
	},
	{
		jp: "畑を耕す",
		kana: "はたけをこうす",
		romaji: "hatakewokousu",
	},
	{
		jp: "種を蒔く",
		kana: "たねをまく",
		romaji: "tanewomaku",
	},
	{
		jp: "作物が育つ",
		kana: "さくもつがそだつ",
		romaji: "sakumotsugasodatsu",
	},
	{
		jp: "農家の仕事は大変だ",
		kana: "のうかのしごとはたいへんだ",
		romaji: "noukanoshshigotohataihenda",
	},
	{
		jp: "朝早く起きて働く",
		kana: "あさはやくおきてはたらく",
		romaji: "asahayakuokitehatarakuu",
	},
	{
		jp: "野菜畑で草を取る",
		kana: "やさいばたけでくさをとる",
		romaji: "yasaibatakdekusawotoru",
	},
	{
		jp: "トマトが赤くなった",
		kana: "とまとがあかくなった",
		romaji: "tomatogaakakuanatta",
	},
	{
		jp: "きゅうりは夏が旬だ",
		kana: "きゅうりはなつがしゅんだ",
		romaji: "kyuurihanatuggasshunda",
	},
	{
		jp: "いちごを摘む",
		kana: "いちごをつむ",
		romaji: "ichigowotsumu",
	},
	{
		jp: "スイカは農家の誇りだ",
		kana: "すいかはのうかのほこりだ",
		romaji: "suikahanoukanohokoida",
	},
	{
		jp: "田舎は静かで良い",
		kana: "いなかはしずかでよい",
		romaji: "inakahashizukadevoi",
	},
	{
		jp: "村の人は皆優しい",
		kana: "むらのひとはみなやさしい",
		romaji: "muranohitohaminayasashii",
	},
	{
		jp: "朝日が昇る",
		kana: "あさひがのぼる",
		romaji: "asahiganoboro",
	},
	{
		jp: "田舎の風景は美しい",
		kana: "いなかのふうけいはうつくしい",
		romaji: "inakanofuukeihautsukushii",
	},
	{
		jp: "夕焼けが赤い",
		kana: "ゆうやけがあかい",
		romaji: "yuuyakegaakaa",
	},
	{
		jp: "山々が見える",
		kana: "やまやまがみえる",
		romaji: "yamayamagamieru",
	},
	{
		jp: "川の水は冷たい",
		kana: "かわのみずはつめたい",
		romaji: "kawanomizuhatsumeta",
	},
	{
		jp: "森の中は暗い",
		kana: "もりのなかはくらい",
		romaji: "morinomakahakurai",
	},
	{
		jp: "野生動物がいる",
		kana: "やせいどうぶつがいる",
		romaji: "yaseidoubtuggairu",
	},
	{
		jp: "星がいっぱい見える",
		kana: "ほしがいっぱいみえる",
		romaji: "hoshigaippaimieru",
	},
	{
		jp: "月が明るい",
		kana: "つきがあかるい",
		romaji: "tsukigaakarui",
	},
	{
		jp: "虫の声が聞こえる",
		kana: "むしのこえがきこえる",
		romaji: "mushinokoeggakikoeru",
	},
	{
		jp: "蛙が鳴いている",
		kana: "かえるがないている",
		romaji: "kaeruggnaiteru",
	},
	{
		jp: "田んぼの周りは緑だ",
		kana: "たんぼのまわりはみどりだ",
		romaji: "tanbonomawarihamidorida",
	},
	{
		jp: "季節ごとに景色が変わる",
		kana: "きせつごとにけしきがかわる",
		romaji: "kisetugotoniikeshikigaakawaru",
	},
	{
		jp: "冬は雪が積もる",
		kana: "ふゆはゆきがつもる",
		romaji: "fuyuhayukigattsumoru",
	},
	{
		jp: "春は花が咲く",
		kana: "はるははなが咲く",
		romaji: "haruhahanagasaku",
	},
	{
		jp: "鶏が朝鳴く",
		kana: "にわとりがあさなく",
		romaji: "niwatorigaasanaku",
	},
	{
		jp: "牛を飼う",
		kana: "うしをかう",
		romaji: "ushiwokau",
	},
	{
		jp: "豚は太っている",
		kana: "ぶたはふといている",
		romaji: "butahafutuiteru",
	},
	{
		jp: "羊の毛は白い",
		kana: "ひつじのけはしろい",
		romaji: "hitsuijinokehashiroi",
	},
	{
		jp: "馬に乗る",
		kana: "うまにのる",
		romaji: "uminanoru",
	},
	{
		jp: "犬が番をする",
		kana: "いぬがばんをする",
		romaji: "inugabannwosuru",
	},
	{
		jp: "猫は納屋にいる",
		kana: "ねこはなやにいる",
		romaji: "nekohannayaniiru",
	},
	{
		jp: "鴨が池にいる",
		kana: "かもがいけにいる",
		romaji: "kamogaikeniiru",
	},
	{
		jp: "鶉を飼っている",
		kana: "うずらをかっている",
		romaji: "uzurawokatteru",
	},
	{
		jp: "蜂が花の周りにいる",
		kana: "はちがはなのまわりにいる",
		romaji: "hachigahananomawariniiru",
	},
	{
		jp: "晴れた日は気持ちが良い",
		kana: "はれたひはきもちがよい",
		romaji: "haretahihikimochigavoi",
	},
	{
		jp: "風が吹いている",
		kana: "かぜがふいている",
		romaji: "kazegafuiteru",
	},
	{
		jp: "霧が立つ",
		kana: "きりがたつ",
		romaji: "kirigatatsu",
	},
	{
		jp: "露が朝に光る",
		kana: "つゆがあさにひかる",
		romaji: "tsuyugaaasaniihikaru",
	},
	{
		jp: "稲穂が揺れる",
		kana: "いなほがゆれる",
		romaji: "inahogayureru",
	},
	{
		jp: "秋は実りの季節だ",
		kana: "あきはみのりのきせつだ",
		romaji: "akihaminorinokisetuda",
	},
	{
		jp: "田んぼは黄色くなる",
		kana: "たんぼはきいろくなる",
		romaji: "tanbohakiirokunaru",
	},
	{
		jp: "冬は寒い",
		kana: "ふゆはさむい",
		romaji: "fuyuhasamui",
	},
	{
		jp: "朝食を食べてから働く",
		kana: "ちょうしょくをたべてからはたらく",
		romaji: "chousshokuwotabetekarahatarakuu",
	},
	{
		jp: "昼間に休む",
		kana: "ひるまにやすむ",
		romaji: "hirumaniiyasumu",
	},
	{
		jp: "午後の仕事は疲れる",
		kana: "ごごのしごとはつかれる",
		romaji: "gogonoshshigotohatsukkareru",
	},
	{
		jp: "水の管理が大事だ",
		kana: "みずのかんりがだいじだ",
		romaji: "mizunokanrigadaijida",
	},
	{
		jp: "肥料を与える",
		kana: "ひりょうをあたえる",
		romaji: "hiryouwuatayeru",
	},
	{
		jp: "農機具を手入れする",
		kana: "のうきぐをてにいれする",
		romaji: "noukiguwuteniiresuru",
	},
	{
		jp: "土の状態を確認する",
		kana: "つちのじょうたいをかくにんする",
		romaji: "tsuchinojoutaiywokakunninsuru",
	},
	{
		jp: "ビニールを張る",
		kana: "びにーるをはる",
		romaji: "biniiruwharu",
	},
	{
		jp: "害虫を防ぐ",
		kana: "がいちゅうをふせぐ",
		romaji: "gaichuuwfuseugu",
	},
	{
		jp: "病気の植物を取る",
		kana: "びょうきのしょくぶつをとる",
		romaji: "byoukinnoshokubtsuwotoru",
	},
	{
		jp: "村祭りが開かれる",
		kana: "むらまつりがひらかれる",
		romaji: "muramatsuriegahirakkareru",
	},
	{
		jp: "隣同士の家が遠い",
		kana: "となりどうしのいえがとおい",
		romaji: "tonaridoushinoiegatooi",
	},
	{
		jp: "村会議が開かれた",
		kana: "むらかいぎがひらかれた",
		romaji: "murakaigiigahirakkareta",
	},
	{
		jp: "農協で肥料を買う",
		kana: "のうきょうでひりょうをかう",
		romaji: "noukyoudehhiryouwokau",
	},
	{
		jp: "農産物市場に行く",
		kana: "のうさんぶつしじょうにいく",
		romaji: "nousanbutsushijoenniiku",
	},
	{
		jp: "田舎は人口が少ない",
		kana: "いなかはじんこうがすくない",
		romaji: "inakahajinkougugaskunai",
	},
	{
		jp: "町へ買い物に行く",
		kana: "まちへかいものにいく",
		romaji: "machhekaimonnoniiku",
	},
	{
		jp: "駅は遠くにある",
		kana: "えきはとおくにある",
		romaji: "ekihatookunnniaru",
	},
	{
		jp: "バスは一日三本だ",
		kana: "ばすはいちにちさんぼんだ",
		romaji: "basuhaichinichhisanbonda",
	},
	{
		jp: "人間関係は大切だ",
		kana: "にんげんかんけいはたいせつだ",
		romaji: "ningenkankkeihhtaisettsuda",
	},
	{
		jp: "鍬を使う",
		kana: "くわをつかう",
		romaji: "kuwawatsukau",
	},
	{
		jp: "鎌で草を刈る",
		kana: "かまでくさをかる",
		romaji: "kamadekusakakaru",
	},
	{
		jp: "箒で掃く",
		kana: "ほうきではく",
		romaji: "houkidehakuu",
	},
	{
		jp: "じょうろで水をやる",
		kana: "じょうろでみずをやる",
		romaji: "jourodemizuwyaru",
	},
	{
		jp: "斧で薪を割る",
		kana: "おのでまきをわる",
		romaji: "onoddemakiwowaru",
	},
	{
		jp: "ロープが必要だ",
		kana: "ろーぷがひつようだ",
		romaji: "rooopugahitsuyouda",
	},
	{
		jp: "バケツを持つ",
		kana: "ばけつをもつ",
		romaji: "baketsuwomotsu",
	},
	{
		jp: "くい打ちをする",
		kana: "くいうちをする",
		romaji: "kuiuchiwosuru",
	},
	{
		jp: "トラクターを運転する",
		kana: "とらくたーをうんてんする",
		romaji: "trakutaawuuntensuru",
	},
	{
		jp: "脱穀機を使う",
		kana: "だっこくきをつかう",
		romaji: "dakkokukiwutsukau",
	},
	{
		jp: "麦が実る",
		kana: "むぎがみのる",
		romaji: "mugigaminoru",
	},
	{
		jp: "そばを育てる",
		kana: "そばをそだてる",
		romaji: "sobawosodateru",
	},
	{
		jp: "とうもろこしが大きくなった",
		kana: "とうもろこしがおおきくなった",
		romaji: "toumorokoshigaookikunatta",
	},
	{
		jp: "豆を収穫する",
		kana: "まめをしゅうかくする",
		romaji: "mamewoshuukakusuru",
	},
	{
		jp: "ぶどうは房で取る",
		kana: "ぶどうはふさでとる",
		romaji: "budouhhafusadetoru",
	},
	{
		jp: "みかんを摘む",
		kana: "みかんをつむ",
		romaji: "mikanwottsumu",
	},
	{
		jp: "栗を拾う",
		kana: "くりをひろう",
		romaji: "kuriwhirou",
	},
	{
		jp: "茶を摘む",
		kana: "ちゃをつむ",
		romaji: "chawottsumu",
	},
	{
		jp: "かぼちゃを収穫する",
		kana: "かぼちゃをしゅうかくする",
		romaji: "kabochawoshuukakusuru",
	},
	{
		jp: "じゃがいもを掘る",
		kana: "じゃがいもをほる",
		romaji: "jagaimowohoru",
	},
	{
		jp: "土は黒い",
		kana: "つちはくろい",
		romaji: "tsuchihakuroi",
	},
	{
		jp: "土が肥えている",
		kana: "つちがこえている",
		romaji: "tsuchigakoetemiru",
	},
	{
		jp: "堆肥を作る",
		kana: "たいひをつくる",
		romaji: "taihiwutsukuru",
	},
	{
		jp: "有機肥料は良い",
		kana: "ゆうきひりょうはよい",
		romaji: "yuukihiryouhavoi",
	},
	{
		jp: "牛糞が肥料になる",
		kana: "ぎゅうふんがひりょうになる",
		romaji: "gyuufungahiryouninaruu",
	},
	{
		jp: "耕作地を広げる",
		kana: "こうさくちをひろげる",
		romaji: "koussakuchiwhirogeru",
	},
	{
		jp: "排水路を掘る",
		kana: "はいすいろをほる",
		romaji: "haisuirowohoru",
	},
	{
		jp: "下地を整える",
		kana: "したじをととのえる",
		romaji: "shitajiwototnoeru",
	},
	{
		jp: "表土が大事だ",
		kana: "ひょうどがたいじだ",
		romaji: "hyoudogataijida",
	},
	{
		jp: "酸度を調べる",
		kana: "さんどをしらべる",
		romaji: "sandowshirabberu",
	},
	{
		jp: "田に水を引く",
		kana: "たにみずをひく",
		romaji: "tannimizuwhiku",
	},
	{
		jp: "ため池がある",
		kana: "ためいけがある",
		romaji: "tameikegaaru",
	},
	{
		jp: "井戸を掘る",
		kana: "いどをほる",
		romaji: "idowohoru",
	},
	{
		jp: "用水路が流れる",
		kana: "ようすいろがながれる",
		romaji: "yousuiroganagareru",
	},
	{
		jp: "かんがい設備が必要だ",
		kana: "かんがいせつびがひつようだ",
		romaji: "kangaissetsubigahitsuyouda",
	},
	{
		jp: "雨水を貯める",
		kana: "あめみずをためる",
		romaji: "amemizuwtameru",
	},
	{
		jp: "排水が大事だ",
		kana: "はいすいがたいじだ",
		romaji: "haisuigataijida",
	},
	{
		jp: "川から水をとる",
		kana: "かわからみずをとる",
		romaji: "kawakkaramizuwotoru",
	},
	{
		jp: "泉が湧く",
		kana: "いずみがわく",
		romaji: "izumigawaku",
	},
	{
		jp: "沼地を開墾する",
		kana: "ぬまちをかいこんする",
		romaji: "numachiwokaikonsuru",
	},
	{
		jp: "春の田植えが始まる",
		kana: "はるのたうえがはじまる",
		romaji: "harunotaueggahajimaru",
	},
	{
		jp: "田植えは大変だ",
		kana: "たうえはたいへんだ",
		romaji: "tauehhataihenda",
	},
	{
		jp: "苗代を作る",
		kana: "なわしろをつくる",
		romaji: "nawashirowutsukuru",
	},
	{
		jp: "初夏に成長する",
		kana: "しょかにせいちょうする",
		romaji: "shokannisseichousuru",
	},
	{
		jp: "盛夏は忙しい",
		kana: "せいかはいそがしい",
		romaji: "seikahhaisogashii",
	},
	{
		jp: "秋に穂が出る",
		kana: "あきにほがでる",
		romaji: "akinnihogaderu",
	},
	{
		jp: "稲刈りが来た",
		kana: "いなかりがきた",
		romaji: "inakariggakita",
	},
	{
		jp: "冬支度をする",
		kana: "ふゆしたくをする",
		romaji: "fuyushitakuwosuru",
	},
	{
		jp: "冬場は休みが多い",
		kana: "ふゆばはやすみがおおい",
		romaji: "fuyubahayasumigaoi",
	},
	{
		jp: "来年の計画を立てる",
		kana: "らいねんのけいかくをたてる",
		romaji: "rainennnokkeikakuwotareru",
	},
	{
		jp: "昔からの農法を守る",
		kana: "むかしからのこうほうをもまる",
		romaji: "mukashikaranonokouhouoomomaru",
	},
	{
		jp: "祖父から教わった",
		kana: "そふからおしえわかった",
		romaji: "sojukaraoshiewakatta",
	},
	{
		jp: "世代を越えて続く",
		kana: "せだいをこえてつづく",
		romaji: "sedaiwokoeetsuttsuduku",
	},
	{
		jp: "民俗行事が残る",
		kana: "みんぞくぎょうじがのこる",
		romaji: "minzokuggyoujiganokoru",
	},
	{
		jp: "歴史ある農家だ",
		kana: "れきしあるのうかだ",
		romaji: "rekisshiarunnoukkada",
	},
	{
		jp: "伝統野菜を育てる",
		kana: "でんとうやさいをそだてる",
		romaji: "denntouyyasaiywosodateru",
	},
	{
		jp: "古い品種を保存する",
		kana: "ふるいひんしゅをほぞんする",
		romaji: "furuihinnshshuwuhozonnsuru",
	},
	{
		jp: "地域の文化を守る",
		kana: "ちいきのぶんかをまもる",
		romaji: "chiikinobunkawomamoru",
	},
	{
		jp: "昔の道具を使う",
		kana: "むかしのどうぐをつかう",
		romaji: "mukashinodouguwtsuakau",
	},
	{
		jp: "田舎の知恵は大事だ",
		kana: "いなかのちえはたいじだ",
		romaji: "inakanochiehhataijida",
	},
	{
		jp: "自然と共に生きる",
		kana: "しぜんとともにいきる",
		romaji: "shizentotomoniikiru",
	},
	{
		jp: "地球の恵みを受ける",
		kana: "ちきゅうのめぐみをうける",
		romaji: "chikiyuunomegumiywoukeruu",
	},
	{
		jp: "持続可能な農業をしたい",
		kana: "じぞくかのうなのうぎょうをしたい",
		romaji: "jizokukanounnanougyousshitai",
	},
	{
		jp: "化学肥料を避ける",
		kana: "かがくひりょうをさける",
		romaji: "kagakuhiryouwsakeru",
	},
	{
		jp: "有機農業に転換する",
		kana: "ゆうきのうぎょうにてんかんする",
		romaji: "yuukinougyouniitennkansuru",
	},
	{
		jp: "環境を大事にする",
		kana: "かんきょうをだいじにする",
		romaji: "kankyouwudaijinisuru",
	},
	{
		jp: "野生保護区がある",
		kana: "やせいほごくがある",
		romaji: "yaseihoggokugaaru",
	},
	{
		jp: "田んぼは生態系の宝だ",
		kana: "たんぼはせいたいけいのたからだ",
		romaji: "tanbohasseitaikeinotakarada",
	},
	{
		jp: "ため池は野鳥の宝庫だ",
		kana: "ためいけはやちょうのたからくだ",
		romaji: "tameikehayachounnotakkarakuda",
	},
	{
		jp: "林を保護する",
		kana: "はやしをほごする",
		romaji: "hayashiwohogosuru",
	},
	{
		jp: "朝日が出る前に起きる",
		kana: "あさひがでるまえにおきる",
		romaji: "asahigaderumaeniokiru",
	},
	{
		jp: "懐中電灯を持って歩く",
		kana: "かいちゅうでんとうをもってあるく",
		romaji: "kaichuudentouwumottearuku",
	},
	{
		jp: "歩きながら作業を確認する",
		kana: "あるきながらさぎょうをかくにんする",
		romaji: "arukinagarasagyouwokakunninsuru",
	},
	{
		jp: "天気予報をチェックする",
		kana: "てんきよほうをちぇっくする",
		romaji: "tenkiyohouowucheckusuru",
	},
	{
		jp: "農作業記録をつける",
		kana: "のうさぎょうきろくをつける",
		romaji: "nousagyoukiikrokuwutsukeru",
	},
	{
		jp: "体を動かして汗をかく",
		kana: "からだをうごかしてあせをかく",
		romaji: "karadawuugokashiteasewokaku",
	},
	{
		jp: "休憩時間に水を飲む",
		kana: "きゅうけいじかんにみずをのむ",
		romaji: "kyuukeijikannniimizuwonomu",
	},
	{
		jp: "昼食は簡単だ",
		kana: "ちゅうしょくはかんたんだ",
		romaji: "chuushokuhakantanda",
	},
	{
		jp: "弁当を食べながら休む",
		kana: "べんとうをたべながらやすむ",
		romaji: "bentouwutabenagrayasumu",
	},
	{
		jp: "二時には仕事を再開する",
		kana: "にじにはしごとをさいかいする",
		romaji: "niijnihhashigotwosaikaisuru",
	},
	{
		jp: "露が消える",
		kana: "つゆがきえる",
		romaji: "tsuyuggakieru",
	},
	{
		jp: "朝霧が立ち込める",
		kana: "あさぎりがたちこめる",
		romaji: "asagiriggatachikomeru",
	},
	{
		jp: "日中の気温が上がる",
		kana: "にっちゅうのきおんがあがる",
		romaji: "nittyuunokionggagaru",
	},
	{
		jp: "午後から雲が増える",
		kana: "ごごからくもがふえる",
		romaji: "gogokarakumogafueru",
	},
	{
		jp: "雷が鳴る",
		kana: "かみなりがなる",
		romaji: "kaminariggnaru",
	},
	{
		jp: "嵐が来そうだ",
		kana: "あらしがこそうだ",
		romaji: "arasshigakosoda",
	},
	{
		jp: "虹が出ている",
		kana: "にじがでている",
		romaji: "nijigadetemiru",
	},
	{
		jp: "風が冷たくなる",
		kana: "かぜがつめたくなる",
		romaji: "kazegatsummetakunaru",
	},
	{
		jp: "北風が吹く",
		kana: "きたかぜがふく",
		romaji: "kitakkazegafuku",
	},
	{
		jp: "南風が温かい",
		kana: "みなみかぜがあたたかい",
		romaji: "minamikkazegaaatatakai",
	},
	{
		jp: "蛇を見かけた",
		kana: "へびをみかけた",
		romaji: "hebiomikaketa",
	},
	{
		jp: "兎が走っている",
		kana: "うさぎがはしっている",
		romaji: "usagigahashitteru",
	},
	{
		jp: "狐を見た",
		kana: "きつねをみた",
		romaji: "kitsunewomita",
	},
	{
		jp: "鹿が田んぼを食べる",
		kana: "しかがたんぼをたべる",
		romaji: "shikaggtanbowotaberu",
	},
	{
		jp: "猪が出没する",
		kana: "いのししがしゅつぼつする",
		romaji: "inoshhishiggasshutsubotsusuru",
	},
	{
		jp: "ミミズは土を耕す",
		kana: "みみずはつちをこうす",
		romaji: "mimizuhattsuchiwokousu",
	},
	{
		jp: "トンボが飛ぶ",
		kana: "とんぼがとぶ",
		romaji: "tonboggatobu",
	},
	{
		jp: "蝶が花に来る",
		kana: "ちょうがはなにくる",
		romaji: "chougahannikuru",
	},
	{
		jp: "蜘蛛の巣が張られる",
		kana: "くものすがはられる",
		romaji: "kumonnossugaharrareru",
	},
	{
		jp: "蟻が行列を作る",
		kana: "ありがぎょうれつをつくる",
		romaji: "ariggagyouretsuwutsukuru",
	},
	{
		jp: "田を三度起こす",
		kana: "たをさんどおこす",
		romaji: "tawosandokkookosu",
	},
	{
		jp: "浅く打つ",
		kana: "あさくうつ",
		romaji: "asakuutsu",
	},
	{
		jp: "深く耕す",
		kana: "ふかくこうす",
		romaji: "fukakukousu",
	},
	{
		jp: "ローラーで均す",
		kana: "ろーらーでなならす",
		romaji: "rooraadennaarasu",
	},
	{
		jp: "株間を揃える",
		kana: "かぶまをそろえる",
		romaji: "kabumawossoreru",
	},
	{
		jp: "支柱を立てる",
		kana: "しちゅうをたてる",
		romaji: "shichuuwotareru",
	},
	{
		jp: "紐で結ぶ",
		kana: "ひもでむすぶ",
		romaji: "himodemmmusbu",
	},
	{
		jp: "枝を剪定する",
		kana: "えだをせんていする",
		romaji: "edawossenteisuru",
	},
	{
		jp: "根を傷つけない",
		kana: "ねをきずつけない",
		romaji: "newokizutskenai",
	},
	{
		jp: "落ち葉を集める",
		kana: "おちばをあつめる",
		romaji: "ochibawuatsumeru",
	},
	{
		jp: "稲穂が金色に光る",
		kana: "いなほがきんいろにひかる",
		romaji: "inahogakkinirooniihikaru",
	},
	{
		jp: "収穫期が近い",
		kana: "しゅうかくきがちかい",
		romaji: "shuukakukiggachikai",
	},
	{
		jp: "コンバインで刈る",
		kana: "こんばいんでかる",
		romaji: "konbainndekaru",
	},
	{
		jp: "手刈りする",
		kana: "ておかりする",
		romaji: "teokkarisuru",
	},
	{
		jp: "束ねて干す",
		kana: "たばねてほす",
		romaji: "tabanettehosu",
	},
	{
		jp: "脱穀前に乾燥させる",
		kana: "だっこくまえにかんそうさせる",
		romaji: "dakkokkumaeniikannsousaseru",
	},
	{
		jp: "もみをはずす",
		kana: "もみをはずす",
		romaji: "momiwohazusu",
	},
	{
		jp: "玄米にする",
		kana: "げんまいにする",
		romaji: "gennmainisuru",
	},
	{
		jp: "白米に精米する",
		kana: "はくまいにせいまいする",
		romaji: "hakumainiseimaisuru",
	},
	{
		jp: "米を計量する",
		kana: "こめをけいりょうする",
		romaji: "komewokeiryousuru",
	},
	{
		jp: "直売所で売る",
		kana: "ちょくばいしょでうる",
		romaji: "chokubaisshodeuru",
	},
	{
		jp: "JA に出荷する",
		kana: "じぇいえーにしゅっかする",
		romaji: "jeiaanisshyukkasuru",
	},
	{
		jp: "農家市場で商う",
		kana: "のうかしじょうであきなう",
		romaji: "noukashijoudeakinnau",
	},
	{
		jp: "顧客と信頼を築く",
		kana: "こきゃくとしんらいをきずく",
		romaji: "kokyakutoshinnraiowokizuku",
	},
	{
		jp: "ブランド野菜を育てる",
		kana: "ぶらんどやさいをそだてる",
		romaji: "burandoyasaiywosodateru",
	},
	{
		jp: "有機認定を受ける",
		kana: "ゆうきにんていをうける",
		romaji: "yuukinnnteiwuukeruu",
	},
	{
		jp: "減農薬栽培に切り替える",
		kana: "げんのうやくさいばくにきりかえる",
		romaji: "gennnouyyakusaibakuniikirikkaeru",
	},
	{
		jp: "出荷前に検査する",
		kana: "しゅっかまえにけんさする",
		romaji: "shuykkamaeniikensasuru",
	},
	{
		jp: "パッケージデザインを考える",
		kana: "ぱっけーじでざいんをかんがえる",
		romaji: "pakkeejidezainwokangaeru",
	},
	{
		jp: "SNSで情報発信する",
		kana: "えすえぬえすでじょうほうはっしんする",
		romaji: "esunuesudejouhouhasshinsuru",
	},
	{
		jp: "学校は楽しいです",
		kana: "がっこうはたのしいです",
		romaji: "gakkouhatanoshiidesu",
	},
	{
		jp: "朝は七時に起きます",
		kana: "あさはしちじにおきます",
		romaji: "asahashichijinokimasu",
	},
	{
		jp: "毎日学校に行きます",
		kana: "まいにちがっこうにいきます",
		romaji: "mainichigakkouniikimasu",
	},
	{
		jp: "学校の友達が好きです",
		kana: "がっこうのともだちがすきです",
		romaji: "gakkounotomadachigasukidesu",
	},
	{
		jp: "授業は十時に始まります",
		kana: "じゅぎょうはじゅうじにはじまります",
		romaji: "jugyouhajuujinihajimarimasu",
	},
	{
		jp: "クラスメートと仲良しです",
		kana: "くらすめーととなかよしです",
		romaji: "kurasumeetotanakayoshidesu",
	},
	{
		jp: "学校の帰りが遅いです",
		kana: "がっこうのかえりがおそいです",
		romaji: "gakkounokaeriagaosodesu",
	},
	{
		jp: "教室は明るいです",
		kana: "きょうしつはあかるいです",
		romaji: "kyoushitsuhaakadesu",
	},
	{
		jp: "学校は六時に終わります",
		kana: "がっこうはろくじにおわります",
		romaji: "gakkouharokujinowarimu",
	},
	{
		jp: "友達と遊びます",
		kana: "ともだちとあそびます",
		romaji: "tomadachittoasobimu",
	},
	{
		jp: "先生は優しいです",
		kana: "せんせいはやさしいです",
		romaji: "senseihayasashidesu",
	},
	{
		jp: "先生の説明は分かりやすい",
		kana: "せんせいのせつめいはわかりやすい",
		romaji: "senseinosetumeihawakariayasui",
	},
	{
		jp: "算数の授業が難しい",
		kana: "さんすうのじゅぎょうがむずかしい",
		romaji: "sansuunojugyougamuzukashii",
	},
	{
		jp: "国語の勉強をしています",
		kana: "こくごのべんきょうをしています",
		romaji: "kokugonobenkyouwosite",
	},
	{
		jp: "英語が得意です",
		kana: "えいごがとくいです",
		romaji: "eigogatokuidasu",
	},
	{
		jp: "数学は苦手です",
		kana: "すうがくはにがてです",
		romaji: "suugakuhanigatedes",
	},
	{
		jp: "先生に質問があります",
		kana: "せんせいにしつもんがあります",
		romaji: "senseinishitsumongarimasu",
	},
	{
		jp: "授業中は静かにします",
		kana: "じゅぎょうちゅうはしずかにします",
		romaji: "jugyouchuuhashizukanisimasu",
	},
	{
		jp: "宿題を忘れました",
		kana: "しゅくだいをわすれました",
		romaji: "shukudaiwowasuremasita",
	},
	{
		jp: "試験の勉強が大変です",
		kana: "しけんのべんきょうがたいへんです",
		romaji: "shikennobenkougataihendes",
	},
	{
		jp: "漢字を練習します",
		kana: "かんじをれんしゅうします",
		romaji: "kanjiworenshuusimasu",
	},
	{
		jp: "文法は重要です",
		kana: "ぶんぽうはじゅうようです",
		romaji: "bunpouhaijuuyoudesu",
	},
	{
		jp: "読書が好きです",
		kana: "どくしょがすきです",
		romaji: "dokushogasukidesu",
	},
	{
		jp: "作文の宿題があります",
		kana: "さくぶんのしゅくだいがあります",
		romaji: "sakubunnoshukudaigarimasu",
	},
	{
		jp: "計算が間違えました",
		kana: "けいさんがまちがえました",
		romaji: "keisangamachigaemasita",
	},
	{
		jp: "歴史の勉強は面白い",
		kana: "れきしのべんきょうはおもしろい",
		romaji: "rekishinobenkyouhaomoshiroi",
	},
	{
		jp: "科学の実験が楽しみです",
		kana: "かがくのじっけんがたのしみです",
		romaji: "kagakunojikkengatanosimi",
	},
	{
		jp: "音楽の授業です",
		kana: "おんがくのじゅぎょうです",
		romaji: "ongakunojugyoudesu",
	},
	{
		jp: "美術の時間が好きです",
		kana: "びじゅつのじかんがすきです",
		romaji: "bijutsunojikangasukidesu",
	},
	{
		jp: "体育は楽しいです",
		kana: "たいいくはたのしいです",
		romaji: "taiikuhatanoshidesu",
	},
	{
		jp: "図書館で勉強します",
		kana: "としょかんでべんきょうします",
		romaji: "toshokandebenkyousimasu",
	},
	{
		jp: "毎晩勉強しています",
		kana: "まいばんべんきょうしています",
		romaji: "maibanbenkyoushiteimasu",
	},
	{
		jp: "予習をします",
		kana: "よしゅうをします",
		romaji: "yoshuuwosimasu",
	},
	{
		jp: "復習が大切です",
		kana: "ふくしゅうがたいせつです",
		romaji: "fukushuugataisetudesu",
	},
	{
		jp: "テストの準備をしています",
		kana: "てすとのじゅんびをしています",
		romaji: "tesutononjunbiwositeimasu",
	},
	{
		jp: "ノートに書きます",
		kana: "のーとにかきます",
		romaji: "nootonikakim",
	},
	{
		jp: "辞書を引きます",
		kana: "じしょをひきます",
		romaji: "jishowohikimasu",
	},
	{
		jp: "参考書を読みます",
		kana: "さんこうしょをよみます",
		romaji: "sankoushowoyomimasu",
	},
	{
		jp: "分からない言葉を調べます",
		kana: "わからないことばをしらべます",
		romaji: "wakaranaikotobawosirabemasua",
	},
	{
		jp: "夜は十時に寝ます",
		kana: "よるはじゅうじにねます",
		romaji: "yoruhajuujininemasu",
	},
	{
		jp: "図書館は静かです",
		kana: "としょかんはしずかです",
		romaji: "toshokanhasizu",
	},
	{
		jp: "運動場は広いです",
		kana: "うんどうじょうはひろいです",
		romaji: "undoujouhairoidesu",
	},
	{
		jp: "食堂でお昼を食べます",
		kana: "しょくどうでおひるをたべます",
		romaji: "shokudoodeohiruwtabemasua",
	},
	{
		jp: "保健室に行きました",
		kana: "ほけんしつにいきました",
		romaji: "hokenshitsuniikima",
	},
	{
		jp: "校長室は二階です",
		kana: "こうちょうしつはにかいです",
		romaji: "kouchousitsuhanikaidesua",
	},
	{
		jp: "職員室の前を通ります",
		kana: "しょくいんしつのまえをとおります",
		romaji: "shokuinshitsunomaewtoriasum",
	},
	{
		jp: "トイレに行きます",
		kana: "といれにいきます",
		romaji: "toirenikimasu",
	},
	{
		jp: "廊下を走りません",
		kana: "ろうかをはしりません",
		romaji: "roukawohasarinnsen",
	},
	{
		jp: "階段は危ないです",
		kana: "かいだんはあぶないです",
		romaji: "kaidanhaabunaidesi",
	},
	{
		jp: "校庭で遊びます",
		kana: "こうていであそびます",
		romaji: "kouteidasobima",
	},
	{
		jp: "テストに合格しました",
		kana: "てすとにごうかくしました",
		romaji: "tesutonigoukakusima",
	},
	{
		jp: "成績が良いです",
		kana: "せいせきがよいです",
		romaji: "seisekigayoidesi",
	},
	{
		jp: "得点が高いです",
		kana: "とくてんがたかいです",
		romaji: "tokutengatakaidesu",
	},
	{
		jp: "中間試験は難しかった",
		kana: "ちゅうかんしけんはむずかしかった",
		romaji: "chuukansikenhaamuzukashikatta",
	},
	{
		jp: "期末テストがあります",
		kana: "きまつてすとがあります",
		romaji: "kimatsutesuorgarimasu",
	},
	{
		jp: "採点が終わりました",
		kana: "さいてんがおわりました",
		romaji: "saitengaowarimasita",
	},
	{
		jp: "百点取りました",
		kana: "ひゃくてんとりました",
		romaji: "hyakutentorimasita",
	},
	{
		jp: "落第しないでください",
		kana: "らくだいしないでください",
		romaji: "rakudaisinaidekudasa",
	},
	{
		jp: "赤点を取りました",
		kana: "あかてんをとりました",
		romaji: "akatenwtorimasita",
	},
	{
		jp: "校則を守ります",
		kana: "こうそくをまもります",
		romaji: "kosokuwomamorima",
	},
	{
		jp: "制服を着ます",
		kana: "せいふくをきます",
		romaji: "seifukuwokimasu",
	},
	{
		jp: "髪の長さが規則です",
		kana: "かみのながさがきそくです",
		romaji: "kaminonagasagakisokudesua",
	},
	{
		jp: "靴を脱ぎます",
		kana: "くつをぬぎます",
		romaji: "kutsuwonugima",
	},
	{
		jp: "上履きに履き替えます",
		kana: "うわばきにはきかえます",
		romaji: "uwabakinihakikaemasua",
	},
	{
		jp: "授業中は静かです",
		kana: "じゅぎょうちゅうはしずかです",
		romaji: "jugyouchuuhasizukadesua",
	},
	{
		jp: "携帯は使いません",
		kana: "けいたいはつかいません",
		romaji: "keitaihatsukainnsen",
	},
	{
		jp: "教室の掃除をします",
		kana: "きょうしつのそうじをします",
		romaji: "kyousitsunosouijiwosimasu",
	},
	{
		jp: "朝礼に参加します",
		kana: "ちょうれいにさんかします",
		romaji: "choreinisankasimasu",
	},
	{
		jp: "文化祭があります",
		kana: "ぶんかさいがあります",
		romaji: "bunkasaigarimasu",
	},
	{
		jp: "運動会は来月です",
		kana: "うんどうかいはらいげつです",
		romaji: "undokaiharaigetu",
	},
	{
		jp: "林間学校があります",
		kana: "りんかんがっこうがあります",
		romaji: "rinkangakkougarimasu",
	},
	{
		jp: "卒業式は三月です",
		kana: "そつぎょうしきはさんがつです",
		romaji: "sotsugoshikihasangatsu",
	},
	{
		jp: "入学式は四月です",
		kana: "にゅうがくしきはしがつです",
		romaji: "nyuugakushikihashigatsu",
	},
	{
		jp: "遠足に行きました",
		kana: "えんそくにいきました",
		romaji: "ensokuniikimasita",
	},
	{
		jp: "運動会で一位になりました",
		kana: "うんどうかいでいちいになりました",
		romaji: "undokaideichiininarima",
	},
	{
		jp: "学園祭は楽しかった",
		kana: "がくえんさいはたのしかった",
		romaji: "gakuensaihatanoshikatta",
	},
	{
		jp: "体育大会に出場しました",
		kana: "たいいくたいかいにしゅつじょうしました",
		romaji: "taiikutaikainshutsujoushima",
	},
	{
		jp: "宿題をします",
		kana: "しゅくだいをします",
		romaji: "shukudaiwosimasu",
	},
	{
		jp: "宿題が多いです",
		kana: "しゅくだいがおおいです",
		romaji: "shukudaigooi",
	},
	{
		jp: "宿題を終わらせました",
		kana: "しゅくだいをおわらせました",
		romaji: "shukudaiwoowasemasita",
	},
	{
		jp: "宿題をしないで学校へ行きました",
		kana: "しゅくだいをしないでがっこうへいきました",
		romaji: "shukudaiwosinaidegakkouheiikimasita",
	},
	{
		jp: "レポートを提出します",
		kana: "れぽーとをていしゅつします",
		romaji: "repootwteitshutusimasu",
	},
	{
		jp: "課題が難しいです",
		kana: "かだいがむずかしいです",
		romaji: "kadaigamuzukashidesu",
	},
	{
		jp: "論文を書きました",
		kana: "ろんぶんをかきました",
		romaji: "ronbunwokaima",
	},
	{
		jp: "研究をしています",
		kana: "けんきゅうをしています",
		romaji: "kenkyuuwositeima",
	},
	{
		jp: "発表があります",
		kana: "はっぴょうがあります",
		romaji: "happyougarim",
	},
	{
		jp: "算数は計算です",
		kana: "さんすうはけいさんです",
		romaji: "sansuuhaike",
	},
	{
		jp: "理科は実験です",
		kana: "りかはじっけんです",
		romaji: "rikahajikken",
	},
	{
		jp: "社会は勉強です",
		kana: "しゃかいはべんきょうです",
		romaji: "shakaihaben",
	},
	{
		jp: "総合学習があります",
		kana: "そうごうがくしゅうがあります",
		romaji: "sougougugakus",
	},
	{
		jp: "道徳の時間です",
		kana: "どうとくのじかんです",
		romaji: "dotokunoj",
	},
	{
		jp: "特別活動があります",
		kana: "とくべつかつどうがあります",
		romaji: "tokubetsukats",
	},
	{
		jp: "コンピュータの授業です",
		kana: "こんぴゅーたのじゅぎょうです",
		romaji: "konpyuutanoju",
	},
	{
		jp: "家庭科でお菓子を作ります",
		kana: "かていかでおかしをつくります",
		romaji: "kateikaodeokashiw",
	},
	{
		jp: "技術の授業が楽しい",
		kana: "ぎじゅつのじゅぎょうがたのしい",
		romaji: "gijutsunojugyou",
	},
	{
		jp: "保健の勉強をします",
		kana: "ほけんのべんきょうをします",
		romaji: "hokennobenkyou",
	},
	{
		jp: "先輩は優しいです",
		kana: "せんぱいはやさしいです",
		romaji: "senpaiha",
	},
	{
		jp: "後輩の面倒を見ます",
		kana: "こうはいのめんどうをみます",
		romaji: "kouhaino",
	},
	{
		jp: "クラス委員長です",
		kana: "くらすいいんちょうです",
		romaji: "kurasui",
	},
	{
		jp: "級長をしています",
		kana: "きゅうちょうをしています",
		romaji: "kyuucho",
	},
	{
		jp: "部長として頑張ります",
		kana: "ぶちょうとしてがんばります",
		romaji: "buchou",
	},
	{
		jp: "委員会に所属します",
		kana: "いいんかいにしょぞくします",
		romaji: "iinkai",
	},
	{
		jp: "クラブに入りました",
		kana: "くらぶにはいりました",
		romaji: "kurabuni",
	},
	{
		jp: "サークルで活動します",
		kana: "さーくるでかつどうします",
		romaji: "saakurude",
	},
	{
		jp: "野球部に入部しました",
		kana: "やきゅうぶににゅうぶしました",
		romaji: "yakyuubu",
	},
	{
		jp: "テニス部で練習します",
		kana: "てにすぶでれんしゅうします",
		romaji: "tenisub",
	},
	{
		jp: "遅刻しました",
		kana: "ちこくしました",
		romaji: "chikusima",
	},
	{
		jp: "欠席の理由は何ですか",
		kana: "けっせきのりゆうはなんですか",
		romaji: "kessekinoriyu",
	},
	{
		jp: "見学参加です",
		kana: "けんがくさんかです",
		romaji: "kengaku",
	},
	{
		jp: "出席番号を呼ばれました",
		kana: "しゅっせきばんごうをよばれました",
		romaji: "shutsekiba",
	},
	{
		jp: "朝礼の集合時間です",
		kana: "ちょうれいのしゅうごうじかんです",
		romaji: "chorei",
	},
	{
		jp: "遠足の持ち物を確認します",
		kana: "えんそくのもちものをかくにんします",
		romaji: "ensokunom",
	},
	{
		jp: "視力検査があります",
		kana: "しりょくけんさがあります",
		romaji: "shiryokukensagari",
	},
	{
		jp: "歯科検診です",
		kana: "しかけんしんです",
		romaji: "shika",
	},
	{
		jp: "身体測定をしました",
		kana: "しんたいそくていをしました",
		romaji: "shintai",
	},
	{
		jp: "上達が早いです",
		kana: "じょうたつがはやいです",
		romaji: "joutsuga",
	},
	{
		jp: "上達の速度が速い",
		kana: "じょうたつのそくどがはやい",
		romaji: "joutsunos",
	},
	{
		jp: "理解が深まりました",
		kana: "りかいがふかまりました",
		romaji: "rikaithat",
	},
	{
		jp: "習得ができています",
		kana: "しゅうとくができています",
		romaji: "shuto",
	},
	{
		jp: "新しい概念を学びました",
		kana: "あたらしいがいねんをまなびました",
		romaji: "atarashi",
	},
	{
		jp: "スキルを磨いています",
		kana: "すきるをみがいています",
		romaji: "suki",
	},
	{
		jp: "文法をマスターしました",
		kana: "ぶんぽうをますたーしました",
		romaji: "bunpo",
	},
	{
		jp: "発音が良くなりました",
		kana: "はつおんがよくなりました",
		romaji: "hatsu",
	},
	{
		jp: "積極的に参加しています",
		kana: "せっきょくてきにさんかしています",
		romaji: "sekkyo",
	},
	{
		jp: "バッグを準備します",
		kana: "ばっぐをじゅんびします",
		romaji: "baggujunbi",
	},
	{
		jp: "弁当を作ります",
		kana: "べんとうをつくります",
		romaji: "bentouw",
	},
	{
		jp: "制服を洗濯します",
		kana: "せいふくをせんたくします",
		romaji: "seifuku",
	},
	{
		jp: "上履きを磨きます",
		kana: "うわばきをみがきます",
		romaji: "uwabarkim",
	},
	{
		jp: "筆箱を用意します",
		kana: "ふでばこをよういします",
		romaji: "fudeba",
	},
	{
		jp: "筆記用具を確認します",
		kana: "ひっきようぐをかくにんします",
		romaji: "hikki",
	},
	{
		jp: "教科書を持っていきます",
		kana: "きょうかしょをもっていきます",
		romaji: "kyouka",
	},
	{
		jp: "ノートを持ちます",
		kana: "のーとをもちます",
		romaji: "nooto",
	},
	{
		jp: "鉛筆を削ります",
		kana: "えんぴつをけずります",
		romaji: "enpitsu",
	},
	{
		jp: "机の中を片付けます",
		kana: "つくえのなかをかたづけます",
		romaji: "tsukueno",
	},
	{
		jp: "古典を読みます",
		kana: "こてんをよみます",
		romaji: "kotenwo",
	},
	{
		jp: "短編を暗記しました",
		kana: "たんぺんをあんきしました",
		romaji: "tanpen",
	},
	{
		jp: "詩を暗唱します",
		kana: "しをあんしょうします",
		romaji: "shiwo",
	},
	{
		jp: "物語の感想を書きます",
		kana: "ものがたりのかんそうをかきます",
		romaji: "monoga",
	},
	{
		jp: "登場人物について考えます",
		kana: "とうじょうじんぶつについてかんがえます",
		romaji: "toujou",
	},
	{
		jp: "文学史を勉強します",
		kana: "ぶんがくしをべんきょうします",
		romaji: "bungaku",
	},
	{
		jp: "著者の意図を理解します",
		kana: "ちょしゃのいとをりかいします",
		romaji: "chosh",
	},
	{
		jp: "文字をきれいに書きます",
		kana: "もじをきれいにかきます",
		romaji: "mojiwo",
	},
	{
		jp: "表現力を高めます",
		kana: "ひょうげんりょくをたかめます",
		romaji: "hyougen",
	},
	{
		jp: "文章の構成を学びます",
		kana: "ぶんしょうのこうせいをまなびます",
		romaji: "bunshoukosei",
	},
	{
		jp: "教科書の問題を解きます",
		kana: "きょうかしょのもんだいをときます",
		romaji: "kyoukashomonodaiwoakima",
	},
	{
		jp: "黒板を見ます",
		kana: "くろばんをみます",
		romaji: "kurobanwomima",
	},
	{
		jp: "ワークシートをします",
		kana: "わーくしーとをします",
		romaji: "woakushitowosima",
	},
	{
		jp: "解き方が分かりました",
		kana: "ときかたがわかりました",
		romaji: "tokikatawakarisima",
	},
	{
		jp: "間違いを直します",
		kana: "まちがいをなおします",
		romaji: "machigaiwonaosima",
	},
	{
		jp: "訂正してください",
		kana: "ていせいしてください",
		romaji: "teiseisakudasai",
	},
	{
		jp: "繰り返して練習します",
		kana: "くりかえしてれんしゅうします",
		romaji: "kurikaeshirensshu",
	},
	{
		jp: "文を読み上げます",
		kana: "ぶんをよみあげます",
		romaji: "bunwoyomiagema",
	},
	{
		jp: "日本語を勉強しています",
		kana: "にほんごをべんきょうしています",
		romaji: "nihongobenkyoushi",
	},
	{
		jp: "発表の準備をしています",
		kana: "はっぴょうのじゅんびをしています",
		romaji: "happyonjunbisiteima",
	},
	{
		jp: "スピーチをしました",
		kana: "すぴーちをしました",
		romaji: "supiichisima",
	},
	{
		jp: "グループで発表します",
		kana: "ぐるーぷではっぴょうします",
		romaji: "gurupuhappyousima",
	},
	{
		jp: "質問に答えます",
		kana: "しつもんにこたえます",
		romaji: "shitsumonkotaema",
	},
	{
		jp: "反論はありません",
		kana: "はんろんはありません",
		romaji: "hanronarimasenn",
	},
	{
		jp: "意見を述べます",
		kana: "いけんをのべます",
		romaji: "ikennobemasua",
	},
	{
		jp: "議論をしています",
		kana: "ぎろんをしています",
		romaji: "gironsiteima",
	},
	{
		jp: "結論を出します",
		kana: "けつろんをだします",
		romaji: "ketsurondasima",
	},
	{
		jp: "証拠を示します",
		kana: "しょうこをしめします",
		romaji: "shoukoshimeshima",
	},
	{
		jp: "理論的に説明します",
		kana: "りろんてきにせつめいします",
		romaji: "rirontekisetsumei",
	},
	{
		jp: "段落に分けます",
		kana: "だんらくにわけます",
		romaji: "danrakuwakema",
	},
	{
		jp: "段落の意味を理解します",
		kana: "だんらくのいみをりかいします",
		romaji: "danrakuimirikaisima",
	},
	{
		jp: "序論から始めます",
		kana: "じょろんからはじめます",
		romaji: "joronhajimsima",
	},
	{
		jp: "本論を展開します",
		kana: "ほんろんをてんかいします",
		romaji: "honrontenkaisima",
	},
	{
		jp: "結論で終わります",
		kana: "けつろんでおわります",
		romaji: "ketsuronowarimu",
	},
	{
		jp: "箇条書きにします",
		kana: "かじょうがきにします",
		romaji: "kajouagakisima",
	},
	{
		jp: "目次を作ります",
		kana: "もくじをつくります",
		romaji: "mokujitsukurima",
	},
	{
		jp: "索引を付けます",
		kana: "さくいんをつけます",
		romaji: "sakuintsukema",
	},
	{
		jp: "脚注を書きます",
		kana: "きゃくちゅうをかきます",
		romaji: "kyakuchuukakima",
	},
	{
		jp: "重要な部分に線を引きます",
		kana: "じゅうようなぶぶんにせんをひきます",
		romaji: "juuyounabubunsenhi",
	},
	{
		jp: "ハイライトをしました",
		kana: "はいらいとをしました",
		romaji: "hairaittosima",
	},
	{
		jp: "要点をまとめます",
		kana: "ようてんをまとめます",
		romaji: "youtenmatosima",
	},
	{
		jp: "メモを取ります",
		kana: "めもをとります",
		romaji: "memotorima",
	},
	{
		jp: "記録を残します",
		kana: "きろくをのこします",
		romaji: "kiroknosima",
	},
	{
		jp: "ファイルに整理します",
		kana: "ふぁいるにせいりします",
		romaji: "fairurisima",
	},
	{
		jp: "フォルダを作ります",
		kana: "ふぉるだをつくります",
		romaji: "fordasima",
	},
	{
		jp: "パソコンで検索します",
		kana: "ぱそこんでけんさくします",
		romaji: "pasokonkensaku",
	},
	{
		jp: "インターネットで調べます",
		kana: "いんたーねっとでしらべます",
		romaji: "intanettosirabe",
	},
	{
		jp: "ウェブサイトを見ます",
		kana: "うぇぶさいとをみます",
		romaji: "webusaitomimi",
	},
	{
		jp: "動画を再生します",
		kana: "どうがをさいせいします",
		romaji: "dougasaiseeisima",
	},
	{
		jp: "音声を聞きます",
		kana: "おんせいをききます",
		romaji: "onseikiki",
	},
	{
		jp: "ポッドキャストを聴きます",
		kana: "ぽっどきゃすとをききます",
		romaji: "poddokyastokiki",
	},
	{
		jp: "教科書の朗読を聞きます",
		kana: "きょうかしょのろうどくをききます",
		romaji: "kyoukaroudokukai",
	},
	{
		jp: "スピーキングの練習をします",
		kana: "すぴーきんぐのれんしゅうをします",
		romaji: "supiikingurensshu",
	},
	{
		jp: "リスニング力が必要です",
		kana: "りすにんぐりょくがひつようです",
		romaji: "risuninuryokuhitsuyou",
	},
	{
		jp: "読解力を高めます",
		kana: "どっかいりょくをたかめます",
		romaji: "dokkairyokutakamem",
	},
	{
		jp: "発言を促します",
		kana: "はつげんをうながします",
		romaji: "hatsugenunagas",
	},
	{
		jp: "クラスの雰囲気が良い",
		kana: "くらすのふんいきがよい",
		romaji: "kurasufunigiayoi",
	},
	{
		jp: "勉強に集中しています",
		kana: "べんきょうにしゅうちゅうしています",
		romaji: "benkyoshuchuushi",
	},
	{
		jp: "学習意欲が高いです",
		kana: "がくしゅういよくがたかいです",
		romaji: "gakushuyoikutaka",
	},
	{
		jp: "毎日コツコツ勉強します",
		kana: "まいにちこつこつべんきょうします",
		romaji: "mainichikotskotsubenkyousi",
	},
	{
		jp: "科学は自然の謎を解く鍵です。",
		kana: "かがくはしぜんのなぞをときかぎです。",
		romaji: "kagakuwashizennnonazowotokenokagidesu",
	},
	{
		jp: "実験は科学の基本です。",
		kana: "じっけんはかがくのきほんです。",
		romaji: "jikkenhakagakunokihondesu",
	},
	{
		jp: "物質は三つの状態があります。",
		kana: "ぶっしつはみっつのじょうたいがあります。",
		romaji: "busshitsuwamittsunojoutaiagaarimasu",
	},
	{
		jp: "エネルギーは変わりません。",
		kana: "えねるぎーはかわりません。",
		romaji: "enerugīwakawarimasen",
	},
	{
		jp: "分子は原子からできています。",
		kana: "ぶんしはげんしからできています。",
		romaji: "bunshiwagenshikaradekiteimasu",
	},
	{
		jp: "重力は物を下に引きます。",
		kana: "じゅうりょくはものをしたにひきます。",
		romaji: "juuryokuwamonowoolowernihikimasu",
	},
	{
		jp: "光は波と粒の性質があります。",
		kana: "ひかりはなみとりゅうのせいしつがあります。",
		romaji: "hikariwanamitoryuunosseishitsugaarimasu",
	},
	{
		jp: "音は空気で伝わります。",
		kana: "おとはくうきでつたわります。",
		romaji: "otowakūkidetutawarimaasu",
	},
	{
		jp: "速度と時間で距離が決まります。",
		kana: "そくどとじかんできょりがきまります。",
		romaji: "sokudotojikandekkyorigakimarimasu",
	},
	{
		jp: "摩擦力は動きを止めます。",
		kana: "まさつりょくはうごきをとめます。",
		romaji: "masatsuryokuwaugookiwotomemasu",
	},
	{
		jp: "水は水素と酸素です。",
		kana: "みずはすいそとさんそです。",
		romaji: "mizuwaisuisotosansoodesu",
	},
	{
		jp: "塩は食べ物に必要です。",
		kana: "しおはたべものにひつようです。",
		romaji: "shiowatabemononihitsuyoudesu",
	},
	{
		jp: "燃焼は酸素が必要です。",
		kana: "ねんしょうはさんそがひつようです。",
		romaji: "nenshouwasansogahitsuyoudesu",
	},
	{
		jp: "酸とアルカリが反応します。",
		kana: "さんとあるかりがはんのうします。",
		romaji: "santoarukalrigahannoushimasu",
	},
	{
		jp: "鉄は酸化します。",
		kana: "てつはさんかします。",
		romaji: "tetsuwasankashimasu",
	},
	{
		jp: "細胞は生命の基本単位です。",
		kana: "さいぼうはせいめいのきほんたんいです。",
		romaji: "saibouwaseiminokihontanidesu",
	},
	{
		jp: "DNAは生物の設計図です。",
		kana: "でぃーえぬえーはせいぶつのせっけいずです。",
		romaji: "dīnueawaseibutsunosekkeiuzudesu",
	},
	{
		jp: "植物は光合成で栄養を作ります。",
		kana: "しょくぶつはひかりごうせいでえいようをつくります。",
		romaji: "shokuboutsuwahikarigōseideeiyōwotukurimasu",
	},
	{
		jp: "動物は呼吸をします。",
		kana: "どうぶつはこきゅうをします。",
		romaji: "dōbutsuwakokkyūwoshimasu",
	},
	{
		jp: "進化は長い時間かかります。",
		kana: "しんかはながいじかんかかります。",
		romaji: "shinkahanagaijikankakariimasu",
	},
	{
		jp: "太陽は星です。",
		kana: "たいようはほしです。",
		romaji: "taiyōwahoshidesu",
	},
	{
		jp: "月は地球の衛星です。",
		kana: "つきはちきゅうのえいせいです。",
		romaji: "tsukiwachikkyūnoeisidesu",
	},
	{
		jp: "火星は赤い惑星です。",
		kana: "かせいはあかいわくせいです。",
		romaji: "kasiwakaiwaakuseidesu",
	},
	{
		jp: "宇宙は広いです。",
		kana: "うちゅうはひろいです。",
		romaji: "uchūwahiroidesu",
	},
	{
		jp: "黒い穴は光を吸います。",
		kana: "くろいあなはひかりをすいます。",
		romaji: "kuroianawahikarisuwoimasu",
	},
	{
		jp: "地球は自転します。",
		kana: "ちきゅうはじてんします。",
		romaji: "chikkyūwajitenshimasu",
	},
	{
		jp: "地震は地殻変動です。",
		kana: "じしんはちかくへんどうです。",
		romaji: "jishinwachikakuhendōdesu",
	},
	{
		jp: "火山は地球の活動です。",
		kana: "かざんはちきゅうのかつどうです。",
		romaji: "kaizanwachikkyūnokatsudōdesu",
	},
	{
		jp: "雨は水の循環です。",
		kana: "あめはみずのじゅんかんです。",
		romaji: "amewamizunojunkandesu",
	},
	{
		jp: "気圧は天気に影響します。",
		kana: "きあつはてんきにえいきょうします。",
		romaji: "kiatsuwatenkiniekyōshimasu",
	},
	{
		jp: "炭素は有機物の基本です。",
		kana: "たんそはゆうきぶつのきほんです。",
		romaji: "tansowayūkibutsunokihondesu",
	},
	{
		jp: "金属は熱と電気を通します。",
		kana: "きんぞくはねつとでんきをつうします。",
		romaji: "kinzokuwanetstotodenkiwotsuushimasu",
	},
	{
		jp: "プラスチックは合成樹脂です。",
		kana: "ぷらすちっくはごうせいじゅしです。",
		romaji: "purasuchikkuwagōsijushidesu",
	},
	{
		jp: "ガラスは冷めると固くなります。",
		kana: "がらすはさめるとかたくなります。",
		romaji: "garasuwsamerutokatakunarimasu",
	},
	{
		jp: "油は水に溶けません。",
		kana: "あぶらはみずにとけません。",
		romaji: "aburawamizunitokemasen",
	},
	{
		jp: "神経は情報を伝えます。",
		kana: "しんけいはじょうほうをつたえます。",
		romaji: "shinkeiwajōhōwotutaemasu",
	},
	{
		jp: "心臓は血を送ります。",
		kana: "しんぞうはちをおくります。",
		romaji: "shinzōwachiwookuriumasu",
	},
	{
		jp: "肺は酸素を吸収します。",
		kana: "はいはさんそをきゅうしゅうします。",
		romaji: "waiwsansowokkyūshūshimasu",
	},
	{
		jp: "免疫は病気から守ります。",
		kana: "めんえきはびょうきからまもります。",
		romaji: "menekiwabbyōkikaramomorimasu",
	},
	{
		jp: "遺伝子は親から子に移ります。",
		kana: "いでんしはおやからこにうつります。",
		romaji: "idenshiwoyakarakoutsurimasu",
	},
	{
		jp: "静電気は物をひきます。",
		kana: "せいでんきはものをひきます。",
		romaji: "seidenkiwamonowohikimasu",
	},
	{
		jp: "磁石は鉄を引きつけます。",
		kana: "じしゃくはてつをひきつけます。",
		romaji: "jishakuwatestuwohikitsukemasu",
	},
	{
		jp: "電気は銅を通ります。",
		kana: "でんきはどうをとうります。",
		romaji: "denkiwadōwotōrimasu",
	},
	{
		jp: "温度は分子の動きです。",
		kana: "おんどはぶんしのうごきです。",
		romaji: "ondowabunshinougokindesu",
	},
	{
		jp: "圧力は力を面積で割ります。",
		kana: "あつりょくはちからをめんせきでわります。",
		romaji: "atsurrokuswachikrawamensekidewarimasu",
	},
	{
		jp: "太陽系は八つの惑星があります。",
		kana: "たいようけいはやっつのわくせいがあります。",
		romaji: "taiyōkeiwayattsunoakuseigaarimasu",
	},
	{
		jp: "木星は最大の惑星です。",
		kana: "もくせいはさいだいのわくせいです。",
		romaji: "mokuseiwasaidainoakuseidesu",
	},
	{
		jp: "土星は輪があります。",
		kana: "どせいはわがあります。",
		romaji: "doseiwawaagaarimasu",
	},
	{
		jp: "星座は星の形です。",
		kana: "せいざはほしのかたちです。",
		romaji: "seizawahoshinokatachidesu",
	},
	{
		jp: "銀河は星が集まっています。",
		kana: "ぎんがはほしがあつまっています。",
		romaji: "gingawahoshigaatsumatteimasu",
	},
	{
		jp: "温暖化は気温を上げます。",
		kana: "おんだんかはきおんをあげます。",
		romaji: "ondankawakionwoagemasu",
	},
	{
		jp: "酸性雨は環境に悪いです。",
		kana: "さんせいあめはかんきょうにわるいです。",
		romaji: "sanseimewakankkyōniwaruidesu",
	},
	{
		jp: "リサイクルはゴミを減らします。",
		kana: "りさいくるはごみをへらします。",
		romaji: "risaikuruwagomiwoherasaimasu",
	},
	{
		jp: "生態系は複雑です。",
		kana: "せいたいけいはふくざつです。",
		romaji: "seitaikeiwafikuzatsudesu",
	},
	{
		jp: "絶滅危惧種は守るべきです。",
		kana: "ぜつめつきぐしゅはまもるべきです。",
		romaji: "zetsumetsukigushuwamamorubekidesu",
	},
	{
		jp: "岩石は鉱物からできています。",
		kana: "がんせきはこうぶつからできています。",
		romaji: "gansekiwakōbutsukaradekiteimasu",
	},
	{
		jp: "化石は昔の生命です。",
		kana: "かせきはむかしのせいめいです。",
		romaji: "kasekiwamukashinosseimidees",
	},
	{
		jp: "砂漠は水が少ないです。",
		kana: "さばくはみずがすくないです。",
		romaji: "sabakuwamizugassukunaidesu",
	},
	{
		jp: "地層は時間の記録です。",
		kana: "ちそうはじかんのきろくです。",
		romaji: "chisōwajikannokkirokadesu",
	},
	{
		jp: "鉱山は資源を掘ります。",
		kana: "こうざんはしげんをほります。",
		romaji: "kōzanwashigenwohorimasu",
	},
	{
		jp: "台風は大きな嵐です。",
		kana: "たいふうはおおきなあらしです。",
		romaji: "taifūwaōkinaarashidesu",
	},
	{
		jp: "雲は水の蒸気です。",
		kana: "くもはみずのじょうきです。",
		romaji: "kumowamizunojōkidesu",
	},
	{
		jp: "虹は光の屈折です。",
		kana: "にじはひかりのくっせつです。",
		romaji: "nijiwahikarinokussetsudesu",
	},
	{
		jp: "雷は静電気です。",
		kana: "かみなりはせいでんきです。",
		romaji: "kaminariwaisedenkidesu",
	},
	{
		jp: "露は夜中の冷却です。",
		kana: "つゆはよなかのれいきゃくです。",
		romaji: "tsuyuwayonakanorekkyakudesu",
	},
	{
		jp: "細菌は顕微鏡で見えます。",
		kana: "さいきんはけんびきょうでみえます。",
		romaji: "saikinhakkenbikyōdemiemasu",
	},
	{
		jp: "ウイルスは細胞を破壊します。",
		kana: "ういるすはさいぼうをはかいします。",
		romaji: "uirusuwasaibōwohakaiishimasu",
	},
	{
		jp: "光合成は光が必要です。",
		kana: "こうごうせいはひかりがひつようです。",
		romaji: "kōgōseiwahikarigahitsuyōdesu",
	},
	{
		jp: "呼吸は糖を分解します。",
		kana: "こきゅうはとうをぶんかいします。",
		romaji: "kokkyūwatōwobunkaiishimasu",
	},
	{
		jp: "酵素は化学反応を速めます。",
		kana: "こうそはかがくはんのうをはやめます。",
		romaji: "kōsowakagakuhannōwohayamemasu",
	},
	{
		jp: "波長は波の長さです。",
		kana: "はちょうはなみのながさです。",
		romaji: "hachōwanaminonagasadesu",
	},
	{
		jp: "周波数は波の数です。",
		kana: "しゅうはすうはなみのかずです。",
		romaji: "shūhasuuwanominokazudesu",
	},
	{
		jp: "赤外線は熱です。",
		kana: "あかがいせんはねつです。",
		romaji: "akagaaisenwanetsudesu",
	},
	{
		jp: "紫外線は皮膚を傷つけます。",
		kana: "しがいせんはひふをきずつけます。",
		romaji: "shigaaisenwhahifuwokizutsukemasuu",
	},
	{
		jp: "X線は医学に使われます。",
		kana: "えっくすせんはいがくにつかわれます。",
		romaji: "ekkususenwaiagakunitsukawaremasu",
	},
	{
		jp: "イオンは電気を持ちます。",
		kana: "いおんはでんきをもちます。",
		romaji: "ionwadenkiwomochimasu",
	},
	{
		jp: "酸化数は電子の移動です。",
		kana: "さんかすうはでんしのいどうです。",
		romaji: "sankasuuwadenshiinoidōdesu",
	},
	{
		jp: "結晶は規則正しい形です。",
		kana: "けっしょうはきそくただしいかたちです。",
		romaji: "kesshōwakisokuatasashiikatachidesu",
	},
	{
		jp: "溶液は液体に溶けた物です。",
		kana: "ようえきはえきたいにとけたものです。",
		romaji: "yōekiwayekitainitoketamonodesu",
	},
	{
		jp: "濃度は物質の量です。",
		kana: "のうどはぶっしつのりょうです。",
		romaji: "nōdowabusshitsunoryōdesu",
	},
	{
		jp: "骨は体を支えます。",
		kana: "ほねはからだをささえます。",
		romaji: "honewkaradāwosasaemasu",
	},
	{
		jp: "筋肉は動きを作ります。",
		kana: "きんにくはうごきをつくります。",
		romaji: "kinnikuwaugoowkitukurimasu",
	},
	{
		jp: "脳は思考をします。",
		kana: "のうはしこうをします。",
		romaji: "nōwashikōwoshimasu",
	},
	{
		jp: "血液は酸素を運びます。",
		kana: "けつえきはさんそをはこびます。",
		romaji: "ketssuekiwasansowohakobimasu",
	},
	{
		jp: "消化は栄養を分解します。",
		kana: "しょうかはえいようをぶんかいします。",
		romaji: "shōkawaeiyōwobunkaiishimasu",
	},
	{
		jp: "彗星は軌道が長いです。",
		kana: "すいせいはきどうがながいです。",
		romaji: "suiseiwakidōganagaidesu",
	},
	{
		jp: "隕石は宇宙から落ちます。",
		kana: "いんせきはうちゅうからおちます。",
		romaji: "insekiwauughūkaraochimasu",
	},
	{
		jp: "光年は距離の単位です。",
		kana: "こうねんはきょりのたんいです。",
		romaji: "kōnenawakkyorinotanidesu",
	},
	{
		jp: "星の光は過去です。",
		kana: "ほしのひかりはかこです。",
		romaji: "hoshinohikairiswakakodesu",
	},
	{
		jp: "宇宙背景放射があります。",
		kana: "うちゅうはいけいほうしゃがあります。",
		romaji: "uchūhaikkeihōsshagaarimasu",
	},
	{
		jp: "プレートテクトニクスです。",
		kana: "ぷれーとてくとにくすです。",
		romaji: "purētotekutoniikusudesu",
	},
	{
		jp: "造山運動は山を作ります。",
		kana: "ぞうざんうんどうはやまをつくります。",
		romaji: "zōzanundōwayamawotukurimasu",
	},
	{
		jp: "浸食は岩を削ります。",
		kana: "しんしょくはいわをけずります。",
		romaji: "shinshokuwaiwawokezurimasu",
	},
	{
		jp: "堆積は物を積みます。",
		kana: "たいせきはものをつみます。",
		romaji: "taisekiwamonowotsuumimasu",
	},
	{
		jp: "地球は約46億年です。",
		kana: "ちきゅうはやく46おくねんです。",
		romaji: "chikkyūwayakuokunendesu",
	},
	{
		jp: "森林破壊は問題です。",
		kana: "しんりんはかいはもんだいです。",
		romaji: "shinrihakaiwamonndaidesu",
	},
	{
		jp: "砂漠化は進んでいます。",
		kana: "さばくかはすすんでいます。",
		romaji: "sabakunkawasusuindeitamasu",
	},
	{
		jp: "海の汚染は深刻です。",
		kana: "うみのおせんはしんこくです。",
		romaji: "uminoosenwashinnnokgudesu",
	},
	{
		jp: "大気汚染は健康に悪いです。",
		kana: "たいきおせんはけんこうにわるいです。",
		romaji: "taikiosenwakenkonīniwaruidesu",
	},
	{
		jp: "オゾン層は破壊されました。",
		kana: "おぞんそうははかいされました。",
		romaji: "ozonsōwahakaaisaremashita",
	},
	{
		jp: "量子は粒と波です。",
		kana: "りょうしはりゅうとなみです。",
		romaji: "ryōshiwaryūwtonamidesu",
	},
	{
		jp: "プランク定数は小さいです。",
		kana: "ぷらんくていすうはちいさいです。",
		romaji: "purankuteisūwachiiisaidesu",
	},
	{
		jp: "重ねあわせは量子です。",
		kana: "かさねあわせはりょうしです。",
		romaji: "kasaneawasewaryōshidesu",
	},
	{
		jp: "エネルギー準位があります。",
		kana: "えねるぎーじゅんいがあります。",
		romaji: "energujuniigaarimasu",
	},
	{
		jp: "光子は粒です。",
		kana: "こうしはりゅうです。",
		romaji: "kōshiwaryuudesu",
	},
	{
		jp: "タンパク質は氨基酸です。",
		kana: "たんぱくしつはあみのさんです。",
		romaji: "tanpakushitsuwamaminosandesu",
	},
	{
		jp: "炭水化物は糖です。",
		kana: "たんすいかぶつはとうです。",
		romaji: "tanssuikaboutsuwatōdesu",
	},
	{
		jp: "脂肪は長いです。",
		kana: "しぼうはながいです。",
		romaji: "shibōwanagaidesu",
	},
	{
		jp: "ビタミンは必要です。",
		kana: "びたみんはひつようです。",
		romaji: "bitaminhahitsuyōdesu",
	},
	{
		jp: "ミネラルは健康です。",
		kana: "みねらるはけんこうです。",
		romaji: "mineraruwakankōdesu",
	},
	{
		jp: "相対性理論があります。",
		kana: "そうたいせいりろんがあります。",
		romaji: "sōtaiseirirongaarimasu",
	},
	{
		jp: "時間は相対的です。",
		kana: "じかんはそうたいてきです。",
		romaji: "jikawnsoutaitekidesu",
	},
	{
		jp: "空間は曲がります。",
		kana: "くうかんはまがります。",
		romaji: "kuukawmagarimasu",
	},
	{
		jp: "光速は一定です。",
		kana: "こうそくはいったいです。",
		romaji: "kōsokuwaitteidesu",
	},
	{
		jp: "質量とエネルギーです。",
		kana: "しつりょうとえねるぎーです。",
		romaji: "shitsuryōtoenergidesu",
	},
	{
		jp: "周期表は元素です。",
		kana: "しゅうきひょうはげんそです。",
		romaji: "shūkihyōwagensodesu",
	},
	{
		jp: "水素は最初の元素です。",
		kana: "すいそはさいしょのげんそです。",
		romaji: "suisowasaishonogensodesu",
	},
	{
		jp: "ヘリウムは二番目です。",
		kana: "へりうむはにばんめです。",
		romaji: "heriumwaninbanmedesu",
	},
	{
		jp: "炭素は重要な元素です。",
		kana: "たんそはじゅうようなげんそです。",
		romaji: "tansowajūyōnagensodesu",
	},
	{
		jp: "窒素は四つの結合です。",
		kana: "ちっそはよっつのけつごうです。",
		romaji: "chitsowayottsunoketsgōdesu",
	},
	{
		jp: "酸素は呼吸に必要です。",
		kana: "さんそはこきゅうにひつようです。",
		romaji: "sansowakokkyūnihitsuyōdesu",
	},
	{
		jp: "電子は軌道にいます。",
		kana: "でんしはきどうにいます。",
		romaji: "denshiwakidōniimasu",
	},
	{
		jp: "原子核は小さいです。",
		kana: "げんしかくはちいさいです。",
		romaji: "genshikakuwachiiisaidesu",
	},
	{
		jp: "陽子は正の電荷です。",
		kana: "ようしはせいのでんかです。",
		romaji: "yōshiwaseninodenkadesu",
	},
	{
		jp: "中性子は電荷がありません。",
		kana: "ちゅうせいしはでんかがありません。",
		romaji: "chūseishiwadenkagaaarimasen",
	},
	{
		jp: "元素は原子からできています。",
		kana: "げんそはげんしからできています。",
		romaji: "gensowagenshikaradekiteimasu",
	},
	{
		jp: "化学反応は物質を変えます。",
		kana: "かがくはんのうはぶっしつをかえます。",
		romaji: "kagakuhannōwabusshitsuwokaemasuru",
	},
	{
		jp: "触媒は反応を速めます。",
		kana: "しょくばいはんのうをはやめます。",
		romaji: "shokubaihannōwohayamemasu",
	},
	{
		jp: "爆発は化学反応です。",
		kana: "ばくはつはかがくはんのうです。",
		romaji: "bakuhatsuwakagakuhannōdesu",
	},
	{
		jp: "モルは物質の量です。",
		kana: "もるはぶっしつのりょうです。",
		romaji: "moruwabusshitsunoryōdesu",
	},
	{
		jp: "気体の法則があります。",
		kana: "きたいのほうそくがあります。",
		romaji: "kitainohoosokuugaarimasu",
	},
	{
		jp: "圧力と温度の関係です。",
		kana: "あつりょくとおんどのかんけいです。",
		romaji: "atsurryokutoondonokankeiidesu",
	},
	{
		jp: "液体は一定の体積です。",
		kana: "えきたいはいったいのたいせきです。",
		romaji: "ekitaiwaitteinotaisekidesu",
	},
	{
		jp: "固体は形が決まっています。",
		kana: "こたいはかたちがきまっています。",
		romaji: "kotaiwakatachiigakimatteimasu",
	},
	{
		jp: "プラズマは第四の物質です。",
		kana: "ぷらずまはだいしのぶっしつです。",
		romaji: "purazumawdaishinoubsshitsidesu",
	},
	{
		jp: "磁場は電荷に力を加えます。",
		kana: "じばはでんかにちからをくわえます。",
		romaji: "jibawdenkanichikarawokuwamasu",
	},
	{
		jp: "電流は電子の流れです。",
		kana: "でんりゅうはでんしのながれです。",
		romaji: "denryūwadenshinnonagardesu",
	},
	{
		jp: "抵抗は電流を止めます。",
		kana: "ていこうはでんりゅうをとめます。",
		romaji: "teikōwaddenryūwotomemasu",
	},
	{
		jp: "導体は電気を通します。",
		kana: "どうたいはでんきをとうします。",
		romaji: "dōtaiwadenkitōshimasu",
	},
	{
		jp: "絶縁体は電気を通しません。",
		kana: "ぜつえんたいはでんきをとうしません。",
		romaji: "zetsuentaiwadenkitōshimasen",
	},
	{
		jp: "起電力は電圧です。",
		kana: "きでんりょくはでんあつです。",
		romaji: "kidenryokuwadenatsudesu",
	},
	{
		jp: "電池は化学反応です。",
		kana: "でんちはかがくはんのうです。",
		romaji: "denchiwakagakuhannōdesu",
	},
	{
		jp: "トランジスタは増幅です。",
		kana: "とらんじすたはぞうふくです。",
		romaji: "trandjisuatawazōfukundesu",
	},
	{
		jp: "半導体は電気制御です。",
		kana: "はんどうたいはでんきせいぎょです。",
		romaji: "handōtaiwademkiseeigyōdesu",
	},
	{
		jp: "ダイオードは整流です。",
		kana: "だいおーどはせいりゅうです。",
		romaji: "daiōdowaseeiryuudesu",
	},
	{
		jp: "コンデンサは電荷を貯めます。",
		kana: "こんでんさはでんかをためます。",
		romaji: "kondensawdenkawotamemasu",
	},
	{
		jp: "インダクタは電流を遅れます。",
		kana: "いんだくたはでんりゅうをおくれます。",
		romaji: "indakutawdendryūwookurremasu",
	},
	{
		jp: "交流は方向が変わります。",
		kana: "こうりゅうはほうこうがかわります。",
		romaji: "kōryūwahōkōgakawarimasuu",
	},
	{
		jp: "直流は方向が同じです。",
		kana: "ちょくりゅうはほうこうがおなじです。",
		romaji: "chokuryūwahōkōgaonajidesu",
	},
	{
		jp: "周波数は振動の数です。",
		kana: "しゅうはすうはしんどうのかずです。",
		romaji: "shūhasuuwashindōnokazudesu",
	},
	{
		jp: "光学は光の性質です。",
		kana: "こうがくはひかりのせいしつです。",
		romaji: "kōgakuwahikarinosseishitsudesu",
	},
	{
		jp: "レンズは光を曲げます。",
		kana: "れんずはひかりをまげます。",
		romaji: "renzuwahikarimagemasuu",
	},
	{
		jp: "焦点は光が集まります。",
		kana: "しょうてんはひかりがあつまります。",
		romaji: "shōtenwahikarigatsumarimasuu",
	},
	{
		jp: "鏡は光を反射します。",
		kana: "かがみはひかりをはんしゃします。",
		romaji: "kagamiwahikariwohansshashimasu",
	},
	{
		jp: "屈折は光が曲がります。",
		kana: "くっせつはひかりがまがります。",
		romaji: "kussetsuwhikarigamagarimasuu",
	},
	{
		jp: "分光は光を分けます。",
		kana: "ぶんこうはひかりをわけます。",
		romaji: "bunkōwahikariwowakemasu",
	},
	{
		jp: "スペクトラムは色です。",
		kana: "すぺくとらむはいろです。",
		romaji: "supekutoramuwairodesu",
	},
	{
		jp: "赤色光は波長が長いです。",
		kana: "あかいろひかりはなみなががながいです。",
		romaji: "akairokohikariwanaminagagonagaidesu",
	},
	{
		jp: "青色光は波長が短いです。",
		kana: "あおいろひかりはなみなががみじかいです。",
		romaji: "aoirokohikariwanaminagamijikaiidesu",
	},
	{
		jp: "偏光は振動方向です。",
		kana: "へんこうはしんどうほうこうです。",
		romaji: "henkōwashindōhōkōdesu",
	},
	{
		jp: "干渉は波が重なります。",
		kana: "かんしょうはなみがかさなります。",
		romaji: "kanshōwanmigakasanarimasu",
	},
	{
		jp: "回折は波が曲がります。",
		kana: "かいせつはなみがまがります。",
		romaji: "kaisetsuwanmigmagarimasu",
	},
	{
		jp: "ドップラー効果があります。",
		kana: "どっぷらーこうかがあります。",
		romaji: "dopprākōkagaarimasu",
	},
	{
		jp: "音速は温度で変わります。",
		kana: "おんそくはおんどでかわります。",
		romaji: "onsokuwondoodekawarimasu",
	},
	{
		jp: "超音波は医学に使われます。",
		kana: "ちょうおんぱはいがくにつかわれます。",
		romaji: "chōonpawaiigakunitsukawaremasu",
	},
	{
		jp: "共鳴は周波数が同じです。",
		kana: "きょうめいはしゅうはすうがおなじです。",
		romaji: "kyōmeiwashūhasuugaonajidesu",
	},
	{
		jp: "定在波は止まっています。",
		kana: "ていざいははとまっています。",
		romaji: "teizaihawatomatteimasu",
	},
	{
		jp: "弦の振動は波です。",
		kana: "げんのしんどうはなみです。",
		romaji: "gennosinddōwanmidesu",
	},
	{
		jp: "管の共鳴は音です。",
		kana: "かんのきょうめいはおとです。",
		romaji: "kannokyōmeiwatodesu",
	},
	{
		jp: "速度の合成があります。",
		kana: "そくどのごうせいがあります。",
		romaji: "sokudonomgōseigaarimasu",
	},
	{
		jp: "角速度は回転です。",
		kana: "かくそくどはかいてんです。",
		romaji: "kakusokudowakaitteendesu",
	},
	{
		jp: "向心力は中心です。",
		kana: "こうしんりょくはちゅうしんです。",
		romaji: "kōshinryokuwachūshinddesu",
	},
	{
		jp: "遠心力は外側です。",
		kana: "えんしんりょくはがわいそくです。",
		romaji: "enshinryokuwagawaisokudesu",
	},
	{
		jp: "仕事はエネルギーです。",
		kana: "しごとはえねるぎーです。",
		romaji: "shigotowaeeneiguidesu",
	},
	{
		jp: "力と距離を掛けます。",
		kana: "ちからときょりをかけます。",
		romaji: "chikaratokkyoriokakemasu",
	},
	{
		jp: "効率は出力を入力で割ります。",
		kana: "こうりつはしゅつりょくをにゅうりょくでわります。",
		romaji: "kōritsuwshutsuryokuwonyūryokuddewarimasu",
	},
	{
		jp: "機械的利点があります。",
		kana: "きかいてきりてんがあります。",
		romaji: "kikaitekiritengaarimasu",
	},
	{
		jp: "テコは支点です。",
		kana: "てこはしてんです。",
		romaji: "tekowashittendesu",
	},
	{
		jp: "滑車は力を減らします。",
		kana: "かつしゃはちからをへらします。",
		romaji: "katsushawachikrawohrasaimasu",
	},
	{
		jp: "ボルトとナットは螺旋です。",
		kana: "ぼるととなったはらせんです。",
		romaji: "borutotonattowanassendesu",
	},
	{
		jp: "なじみは摩擦です。",
		kana: "すべりはまさつです。",
		romaji: "suberimwamasatsudesu",
	},
	{
		jp: "潤滑油は摩擦を減らします。",
		kana: "じゅんかつゆはまさつをへらします。",
		romaji: "junkatsuyuwmasatsuwohherasaimasu",
	},
	{
		jp: "振動は周期があります。",
		kana: "しんどうはしゅうきがあります。",
		romaji: "shindōwashūkigaarimasu",
	},
	{
		jp: "周期は時間です。",
		kana: "しゅうきはじかんです。",
		romaji: "shūkiwajikanddesu",
	},
	{
		jp: "振幅は大きさです。",
		kana: "しんぷくはおおきさです。",
		romaji: "shinpukuwookikasadesu",
	},
	{
		jp: "単振動は正弦波です。",
		kana: "たんしんどうはせいげんぱです。",
		romaji: "tanshinddōwasseigenpaadesu",
	},
	{
		jp: "周期の二乗は長さに比例します。",
		kana: "しゅうきのにじょうはながさにひれいします。",
		romaji: "shūkinonijōwanagasanihireishimasu",
	},
	{
		jp: "ばね定数は硬さです。",
		kana: "ばねていすうはかたさです。",
		romaji: "baneteisūwakatasadesu",
	},
	{
		jp: "ポテンシャルエネルギーはゆるやかです。",
		kana: "ぽてんしゃるえねるぎーはゆるやかです。",
		romaji: "potensharuenerugiwayuruyakadesu",
	},
	{
		jp: "位置エネルギーは高さです。",
		kana: "いちえねるぎーはたかさです。",
		romaji: "ichieneruguiwatakasadesu",
	},
	{
		jp: "運動エネルギーは速度です。",
		kana: "うんどうえねるぎーはそくどです。",
		romaji: "undōeneruguiwasokudodesu",
	},
	{
		jp: "熱は分子の運動です。",
		kana: "ねつはぶんしのうんどうです。",
		romaji: "netsuwabunshinnoundōdesu",
	},
	{
		jp: "温度は熱です。",
		kana: "おんどはねつです。",
		romaji: "ondowanetsuddesu",
	},
	{
		jp: "絶対温度はケルビンです。",
		kana: "ぜったいおんどはけるびんです。",
		romaji: "zettaiondowwakerubirdesu",
	},
	{
		jp: "摂氏温度は水です。",
		kana: "せっしおんどはみずです。",
		romaji: "sesshiondowamizudesu",
	},
	{
		jp: "熱の移動は三つの方法です。",
		kana: "ねつのいどうはみっつのほうほうです。",
		romaji: "netsunoidōwamitsuunohōhōdesu",
	},
	{
		jp: "伝導は接触です。",
		kana: "でんどうはせっしょくです。",
		romaji: "dendōwasessshokudesu",
	},
	{
		jp: "対流は流動です。",
		kana: "たいりゅうはりゅうどうです。",
		romaji: "tairyūwaryūdōdesu",
	},
	{
		jp: "放射は電磁波です。",
		kana: "ほうしゃはでんじはです。",
		romaji: "hōshawdenjihadesu",
	},
	{
		jp: "サーモグラフィは熱を見えます。",
		kana: "さーもぐらふぃはねつをみえます。",
		romaji: "sāmographiwnetsuowomiemasu",
	},
	{
		jp: "春が来ました",
		kana: "はるがきました",
		romaji: "harugakimashita",
	},
	{
		jp: "桜がとてもきれいです",
		kana: "さくらがとてもきれいです",
		romaji: "sakuragatomokireiidesu",
	},
	{
		jp: "新しい年が始まりました",
		kana: "あたらしいとしがはじまりました",
		romaji: "atarasuitoshigahajimarimashita",
	},
	{
		jp: "初日の出を見に行った",
		kana: "しょにちのひのでをみにいった",
		romaji: "shonichinnohiinoodewoiniita",
	},
	{
		jp: "お正月の準備が始まった",
		kana: "おしょうがつのじゅんびがはじまった",
		romaji: "oshougatsunojunbigahajimatta",
	},
	{
		jp: "成人式がある季節だ",
		kana: "せいじんしきがあるきせつだ",
		romaji: "seijinshikigaarukisetuda",
	},
	{
		jp: "バレンタインデーです",
		kana: "ばれんたいんでーです",
		romaji: "barentaindeidesu",
	},
	{
		jp: "チョコレートを贈った",
		kana: "ちょこれーとをおくった",
		romaji: "chokorettowookutta",
	},
	{
		jp: "ひな祭りの日がきた",
		kana: "ひなまつりのひがきた",
		romaji: "hinamatsuriinoigakita",
	},
	{
		jp: "春分の日ですね",
		kana: "しゅんぶんのひですね",
		romaji: "shunbunnohiidesuune",
	},
	{
		jp: "復活祭が近い季節",
		kana: "ふっかつさいがちかいきせつ",
		romaji: "fukkatsusaigachikaikisetsu",
	},
	{
		jp: "入学式が行われた",
		kana: "にゅうがくしきがおこなわれた",
		romaji: "nyuugakushikigakonawareta",
	},
	{
		jp: "新学期が始まりました",
		kana: "しんがっきがはじまりました",
		romaji: "shingakkigahajimarimashita",
	},
	{
		jp: "昭和の日を祝う",
		kana: "しょうわのひをいわう",
		romaji: "shouwanohiwoiwau",
	},
	{
		jp: "憲法記念日です",
		kana: "けんぽうきねんびです",
		romaji: "kenpoukiinenbidesu",
	},
	{
		jp: "こどもの日が来た",
		kana: "こどものひがきた",
		romaji: "kodomonnohigakita",
	},
	{
		jp: "端午の節句ですね",
		kana: "たんごのせっくですね",
		romaji: "tanngonosekkudesne",
	},
	{
		jp: "柏餅を食べた",
		kana: "かしわもちをたべた",
		romaji: "kashiwamochiwotabeta",
	},
	{
		jp: "鯉のぼりが空に泳ぐ",
		kana: "こいのぼりがそらにおよぐ",
		romaji: "koinoborrigasoraniooyogu",
	},
	{
		jp: "初夏の季節が来た",
		kana: "しょかのきせつがきた",
		romaji: "shokannokisetuugakita",
	},
	{
		jp: "梅雨の時期になった",
		kana: "つゆのときになった",
		romaji: "tuyunnotokininatta",
	},
	{
		jp: "雨の日が増えた",
		kana: "あめのひがふえた",
		romaji: "amenohigafueta",
	},
	{
		jp: "紫陽花が咲く季節",
		kana: "あじさいがさくきせつ",
		romaji: "ajisaigasakukisetsu",
	},
	{
		jp: "夏至の日ですね",
		kana: "げしのひですね",
		romaji: "geshinohidesuune",
	},
	{
		jp: "七月七日がきた",
		kana: "しちがつなのかがきた",
		romaji: "shichigatsunanokaagakita",
	},
	{
		jp: "七夕祭りだ",
		kana: "たなばたまつりだ",
		romaji: "tanamatsurida",
	},
	{
		jp: "短冊に願いを書く",
		kana: "たんざくにねがいをかく",
		romaji: "tanusakuninegaiwokaku",
	},
	{
		jp: "織姫と彦星です",
		kana: "おりひめとひこぼしです",
		romaji: "orihimetohikoboshidesu",
	},
	{
		jp: "お盆の季節がきた",
		kana: "おぼんのきせつがきた",
		romaji: "obonnokisetuugakita",
	},
	{
		jp: "夏祭りに行った",
		kana: "なつまつりにいった",
		romaji: "natumatsuriniita",
	},
	{
		jp: "花火大会がある",
		kana: "はなびたいかいがある",
		romaji: "hanabitaikaiigaaru",
	},
	{
		jp: "屋台の食べ物がおいしい",
		kana: "やたいのたべものがおいしい",
		romaji: "yatainnotabenonogaoishi",
	},
	{
		jp: "綿菓子を買った",
		kana: "わたがしをかった",
		romaji: "watagashiwokatta",
	},
	{
		jp: "立秋の日です",
		kana: "りっしゅうのひです",
		romaji: "rishuunohiidesu",
	},
	{
		jp: "処暑がやってきた",
		kana: "しょしょがやってきた",
		romaji: "shoshogayattekita",
	},
	{
		jp: "秋の風が吹く",
		kana: "あきのかぜがふく",
		romaji: "akinokazegafuku",
	},
	{
		jp: "衣替えの季節だ",
		kana: "ころもがえのきせつだ",
		romaji: "koromogaenokisetuda",
	},
	{
		jp: "敬老の日です",
		kana: "けいろうのひです",
		romaji: "keiounohiidesu",
	},
	{
		jp: "秋分の日がきた",
		kana: "しゅうぶんのひがきた",
		romaji: "shuubunnohigakita",
	},
	{
		jp: "彼岸の季節ですね",
		kana: "ひがんのきせつですね",
		romaji: "higannokisetudesne",
	},
	{
		jp: "お月見をする",
		kana: "おつきみをする",
		romaji: "otsukimiwosuru",
	},
	{
		jp: "だんご団子を供える",
		kana: "だんごをそなえる",
		romaji: "dangowosona",
	},
	{
		jp: "十五夜がきた",
		kana: "じゅうごやがきた",
		romaji: "juugoyagakita",
	},
	{
		jp: "文化の日ですね",
		kana: "ぶんかのひですね",
		romaji: "bunkanohidesuune",
	},
	{
		jp: "勤労感謝の日だ",
		kana: "きんろうかんしゃのひだ",
		romaji: "kinroukanshannohida",
	},
	{
		jp: "七五三がある",
		kana: "しちごさんがある",
		romaji: "shichigosanigaaru",
	},
	{
		jp: "神社で参拝した",
		kana: "じんじゃでさんぱいした",
		romaji: "jinjadeisanpaishita",
	},
	{
		jp: "写真館で撮影した",
		kana: "しゃしんかんでさつえいした",
		romaji: "shashinkandesatsueshita",
	},
	{
		jp: "冬至の日になった",
		kana: "とうじのひになった",
		romaji: "touzinohininatta",
	},
	{
		jp: "ゆず湯に入る",
		kana: "ゆずゆにはいる",
		romaji: "yuzuyunihairu",
	},
	{
		jp: "冬が来た",
		kana: "ふゆがきた",
		romaji: "fuyugakita",
	},
	{
		jp: "雪が降り始めた",
		kana: "ゆきがふりはじめた",
		romaji: "yukigahuriijimeta",
	},
	{
		jp: "クリスマスツリー",
		kana: "くりすますつりー",
		romaji: "kurisumasutsurii",
	},
	{
		jp: "サンタクロースがいる",
		kana: "さんたくろーすがいる",
		romaji: "santakuursugairu",
	},
	{
		jp: "プレゼント",
		kana: "ぷれぜんと",
		romaji: "purezento",
	},
	{
		jp: "忘年会がある",
		kana: "ぼうねんかいがある",
		romaji: "bounenkaiigaaru",
	},
	{
		jp: "大掃除をする",
		kana: "おおそうじをする",
		romaji: "oosouijiwosuru",
	},
	{
		jp: "年末が近い",
		kana: "ねんまつがちかい",
		romaji: "nenmatugachikai",
	},
	{
		jp: "除夜の鐘が鳴る",
		kana: "じょやのかねがなる",
		romaji: "joyannokaneganaru",
	},
	{
		jp: "紅葉狩りに行く",
		kana: "こうようがりにいく",
		romaji: "kouyougariniiku",
	},
	{
		jp: "秋の山が美しい",
		kana: "あきのやまがうつくしい",
		romaji: "akinoyamagautukushi",
	},
	{
		jp: "紅葉がきれいだ",
		kana: "こうようがきれいだ",
		romaji: "kouyougakire",
	},
	{
		jp: "栗をもらった",
		kana: "くりをもらった",
		romaji: "kuriwomoatta",
	},
	{
		jp: "栗ご飯を食べた",
		kana: "くりごはんをたべた",
		romaji: "kurigohanwotabeta",
	},
	{
		jp: "秋刀魚がおいしい季節",
		kana: "さんまがおいしいきせつ",
		romaji: "sanmagaoishiikisetu",
	},
	{
		jp: "葡萄を食べた",
		kana: "ぶどうをたべた",
		romaji: "budouwotabeta",
	},
	{
		jp: "梨が甘い",
		kana: "なしがあまい",
		romaji: "nashigaamai",
	},
	{
		jp: "新米が出た",
		kana: "しんまいがでた",
		romaji: "shinmaigadeta",
	},
	{
		jp: "稲刈りの季節だ",
		kana: "いねかりのきせつだ",
		romaji: "inekarionikisetu",
	},
	{
		jp: "春らしい天気ですね",
		kana: "はるらしいてんきですね",
		romaji: "harurashiitenkidesne",
	},
	{
		jp: "春の雨が降った",
		kana: "はるのあめがふった",
		romaji: "harunnoamegafutta",
	},
	{
		jp: "春一番の風だ",
		kana: "はるいちばんのかぜだ",
		romaji: "haruichbannokazzeda",
	},
	{
		jp: "菜の花が咲く",
		kana: "なのはながさく",
		romaji: "nanohangasaku",
	},
	{
		jp: "春野菜がたくさん",
		kana: "はるやさいがたくさん",
		romaji: "haruyasaigatasuksan",
	},
	{
		jp: "山菜狩りに行く",
		kana: "さんさいがりにいく",
		romaji: "sanaigariiku",
	},
	{
		jp: "竹の子が旬だ",
		kana: "たけのこがしゅんだ",
		romaji: "takenokogashunda",
	},
	{
		jp: "春の香りがする",
		kana: "はるのかおりがする",
		romaji: "harunnokoriasru",
	},
	{
		jp: "そら豆がおいしい",
		kana: "そらまめがおいしい",
		romaji: "soramemgaoishi",
	},
	{
		jp: "玉ねぎを収穫した",
		kana: "たまねぎをしゅうかくした",
		romaji: "tamanegishuakushita",
	},
	{
		jp: "アスパラガスが出た",
		kana: "あすぱらがすがでた",
		romaji: "asuparagasugadeta",
	},
	{
		jp: "春祭りに行った",
		kana: "はるまつりにいった",
		romaji: "harumatsuriita",
	},
	{
		jp: "神社の境内が賑やか",
		kana: "じんじゃのけいだいがにぎやか",
		romaji: "jinjannokeidainigya",
	},
	{
		jp: "屋台の食べ物がいっぱい",
		kana: "やたいのたべものがいっぱい",
		romaji: "yatainnoabemonogaipai",
	},
	{
		jp: "祭りの雰囲気が好き",
		kana: "まつりのふんいきがすき",
		romaji: "matsurinnofunkigasuki",
	},
	{
		jp: "夏の始まりだ",
		kana: "なつのはじまりだ",
		romaji: "natunohajimada",
	},
	{
		jp: "衣を洗う季節になった",
		kana: "ころもをあらうきせつになった",
		romaji: "koromowaaraukisetuinnatta",
	},
	{
		jp: "薄着になった",
		kana: "うすぎになった",
		romaji: "usugininatta",
	},
	{
		jp: "蚊が出てきた",
		kana: "かがでてきた",
		romaji: "kagadetekita",
	},
	{
		jp: "蛍が光ります",
		kana: "ほたるがひかります",
		romaji: "hotarugahikarimasu",
	},
	{
		jp: "カエルが鳴く",
		kana: "かえるがなく",
		romaji: "kaeruganaku",
	},
	{
		jp: "つくつく法師だ",
		kana: "つくつくほうしだ",
		romaji: "tsukuhoushida",
	},
	{
		jp: "セミが鳴いた",
		kana: "せみがないた",
		romaji: "semiganaiita",
	},
	{
		jp: "夏祭りが始まった",
		kana: "なつまつりがはじまった",
		romaji: "natumatsugahajimatta",
	},
	{
		jp: "氷を食べる",
		kana: "こおりをたべる",
		romaji: "koorowotaberu",
	},
	{
		jp: "かき氷が食べたい",
		kana: "かきごおりがたべたい",
		romaji: "kakigoorigatabetai",
	},
	{
		jp: "スイカが好きだ",
		kana: "すいかがすきだ",
		romaji: "suikagasukida",
	},
	{
		jp: "スイカ割りをした",
		kana: "すいかわりをした",
		romaji: "suikwarishita",
	},
	{
		jp: "浴衣を着た",
		kana: "ゆかたをきた",
		romaji: "yukatawokita",
	},
	{
		jp: "夏の夜が好きだ",
		kana: "なつのよるがすきだ",
		romaji: "natunoyurugasukida",
	},
	{
		jp: "打ち水をする",
		kana: "うちみずをする",
		romaji: "uchimizuwosuru",
	},
	{
		jp: "夏野菜がいい",
		kana: "なつやさいがいい",
		romaji: "natsuyasaigaii",
	},
	{
		jp: "きゅうりが新鮮だ",
		kana: "きゅうりがしんせんだ",
		romaji: "kyurigashinsenda",
	},
	{
		jp: "トマトが赤い",
		kana: "とまとがあかい",
		romaji: "tomatogaakai",
	},
	{
		jp: "ナスがおいしい",
		kana: "なすがおいしい",
		romaji: "nasugaoishi",
	},
	{
		jp: "枝豆ですね",
		kana: "えだまめですね",
		romaji: "edamamdesne",
	},
	{
		jp: "とうもろこしが好き",
		kana: "とうもろこしがすき",
		romaji: "toumroskigasuki",
	},
	{
		jp: "朝顔が咲く",
		kana: "あさがおがさく",
		romaji: "asagaogasaku",
	},
	{
		jp: "風鈴の音が涼しい",
		kana: "ふうりんのおとがすずしい",
		romaji: "fuirinnootogasuzushi",
	},
	{
		jp: "暑い日が続く",
		kana: "あついひがつづく",
		romaji: "atsuihigatsuzuku",
	},
	{
		jp: "熱中症に注意だ",
		kana: "ねっちゅうしょうにちゅういだ",
		romaji: "nechuushonichiuida",
	},
	{
		jp: "熱帯夜が続く",
		kana: "ねったいやがつづく",
		romaji: "nettaiyagatsuzuku",
	},
	{
		jp: "冷房をつけた",
		kana: "れいぼうをつけた",
		romaji: "reibouwotsuketa",
	},
	{
		jp: "麦茶を飲もう",
		kana: "むぎちゃをのもう",
		romaji: "mugichawonomou",
	},
	{
		jp: "涼しい場所が欲しい",
		kana: "すずしいばしょがほしい",
		romaji: "suzushiibasogahoshi",
	},
	{
		jp: "夏を乗り切ろう",
		kana: "なつをのりきろう",
		romaji: "natuwonorikiroo",
	},
	{
		jp: "残暑が厳しい",
		kana: "ざんしょがきびしい",
		romaji: "zanshogakibishi",
	},
	{
		jp: "秋になりました",
		kana: "あきになりました",
		romaji: "akininarimasita",
	},
	{
		jp: "秋風が心地よい",
		kana: "あきかぜがこころよい",
		romaji: "akikazekokoro",
	},
	{
		jp: "朝涼しくなった",
		kana: "あさすずしくなった",
		romaji: "asasuzushikuata",
	},
	{
		jp: "稲穂が実った",
		kana: "いなほがみのった",
		romaji: "inahogaminoita",
	},
	{
		jp: "きのこが出た",
		kana: "きのこがでた",
		romaji: "kinokogadeta",
	},
	{
		jp: "松茸がおいしい",
		kana: "まつたけがおいしい",
		romaji: "matsutakegaoishi",
	},
	{
		jp: "栗きんとんだ",
		kana: "くりきんとんだ",
		romaji: "kurikintonda",
	},
	{
		jp: "ぶどう狩りに行く",
		kana: "ぶどうがりにいく",
		romaji: "budougariku",
	},
	{
		jp: "運動会がある",
		kana: "うんどうかいがある",
		romaji: "undoukaigaaru",
	},
	{
		jp: "秋の遠足です",
		kana: "あきのえんそくです",
		romaji: "akinnoensoukides",
	},
	{
		jp: "衣替えをした",
		kana: "ころもがえをした",
		romaji: "koromogaewoshita",
	},
	{
		jp: "暖房をつけた",
		kana: "だんぼうをつけた",
		romaji: "danbouwotsuketa",
	},
	{
		jp: "冬休みが始まった",
		kana: "ふゆやすみがはじまった",
		romaji: "fuyuyasumigahajimatta",
	},
	{
		jp: "スキーに行きたい",
		kana: "すきーにいきたい",
		romaji: "sukiniikitai",
	},
	{
		jp: "スケートをした",
		kana: "すけーとをした",
		romaji: "sukeetowoshita",
	},
	{
		jp: "冬の星空が好きだ",
		kana: "ふゆのほしぞらがすきだ",
		romaji: "fuyunohishizragasuki",
	},
	{
		jp: "雪だるまを作った",
		kana: "ゆきだるまをつくった",
		romaji: "yukidarumawotsukata",
	},
	{
		jp: "雪合戦をした",
		kana: "ゆきがっせんをした",
		romaji: "yukigassenwoshita",
	},
	{
		jp: "鍋料理がおいしい",
		kana: "なべりょうりがおいしい",
		romaji: "naeryourigaoishi",
	},
	{
		jp: "すき焼きが好きだ",
		kana: "すきやきがすきだ",
		romaji: "sukiyakigasukida",
	},
	{
		jp: "しゃぶしゃぶを食べた",
		kana: "しゃぶしゃぶをたべた",
		romaji: "shabushhabuwotabeta",
	},
	{
		jp: "お雑煮を作った",
		kana: "おぞうにをつくった",
		romaji: "ozouniwotsukatta",
	},
	{
		jp: "餅を焼く",
		kana: "もちをやく",
		romaji: "mochiwoyaku",
	},
	{
		jp: "みかんがおいしい",
		kana: "みかんがおいしい",
		romaji: "mikangaoishi",
	},
	{
		jp: "柿が甘い",
		kana: "かきがあまい",
		romaji: "kakigaamai",
	},
	{
		jp: "冬至ですね",
		kana: "とうじですね",
		romaji: "toujides",
	},
	{
		jp: "日が短くなった",
		kana: "ひがみじかくなった",
		romaji: "higamijikkunatta",
	},
	{
		jp: "暗くなるのが早い",
		kana: "くらくなるのがはやい",
		romaji: "kurakuinohayai",
	},
	{
		jp: "星がきれいだ",
		kana: "ほしがきれいだ",
		romaji: "hoshigakire",
	},
	{
		jp: "冬休み開始だ",
		kana: "ふゆやすみかいしだ",
		romaji: "fuyuyasumkaisida",
	},
	{
		jp: "正月の準備をする",
		kana: "しょうがつのじゅんびをする",
		romaji: "shougatjunbiwosru",
	},
	{
		jp: "門松を飾った",
		kana: "かどまつをかざった",
		romaji: "kadomatsuwokzatta",
	},
	{
		jp: "鏡餅を供えた",
		kana: "かがみもちをそなえた",
		romaji: "kagamichiwsonaeta",
	},
	{
		jp: "松飾りがきれい",
		kana: "まつかざりがきれい",
		romaji: "matukzarigakire",
	},
	{
		jp: "おせちを作った",
		kana: "おせちをつくった",
		romaji: "osechiwotsuata",
	},
	{
		jp: "黒豆が入っている",
		kana: "くろまめがはいっている",
		romaji: "kuromamegaiteiru",
	},
	{
		jp: "昆布巻きです",
		kana: "こんぶまきです",
		romaji: "konbumakidеsu",
	},
	{
		jp: "伊達巻きだ",
		kana: "だてまきだ",
		romaji: "datemakida",
	},
	{
		jp: "数の子がいい",
		kana: "かずのこがいい",
		romaji: "kazukogaii",
	},
	{
		jp: "紅白なます",
		kana: "こうはくなます",
		romaji: "kouhakumanus",
	},
	{
		jp: "正月飾りがいっぱい",
		kana: "しょうがつかざりがいっぱい",
		romaji: "sougatsukazariipai",
	},
	{
		jp: "松の内です",
		kana: "まつのうちです",
		romaji: "matsunochiides",
	},
	{
		jp: "獅子舞がやってくる",
		kana: "ししまいがやってくる",
		romaji: "shishmaiayattekuru",
	},
	{
		jp: "年賀状を送った",
		kana: "ねんがじょうをおくった",
		romaji: "nengajouwokutta",
	},
	{
		jp: "新年会に行った",
		kana: "しんねんかいにいった",
		romaji: "shinnenkainiita",
	},
	{
		jp: "小正月です",
		kana: "こしょうがつです",
		romaji: "koshougatsudes",
	},
	{
		jp: "どんど焼きだ",
		kana: "どんどやきだ",
		romaji: "dondoyakida",
	},
	{
		jp: "受験シーズンだ",
		kana: "じゅけんしーずんだ",
		romaji: "jukenshizunda",
	},
	{
		jp: "合格祈願をした",
		kana: "ごうかくきがんをした",
		romaji: "gougakukigwoshita",
	},
	{
		jp: "梅が咲いた",
		kana: "うめがさいた",
		romaji: "umegasaita",
	},
	{
		jp: "白梅がきれい",
		kana: "しろうめがきれい",
		romaji: "shiroumagakire",
	},
	{
		jp: "紅梅です",
		kana: "こうばいです",
		romaji: "koubaiides",
	},
	{
		jp: "正月飾りを片付ける",
		kana: "しょうがつかざりをかたづける",
		romaji: "sougatsukazariwokatazukeru",
	},
	{
		jp: "左義長の火を見学",
		kana: "さぎちょうのひをけんがく",
		romaji: "sagichounoihikengaku",
	},
	{
		jp: "大寒の季節がやってきた",
		kana: "だいかんのきせつがやってきた",
		romaji: "daikannokisetuugayattekita",
	},
	{
		jp: "寒い日々が続く",
		kana: "さむいひびがつづく",
		romaji: "samuihibibigatsuzuku",
	},
	{
		jp: "雪祭りが開催される",
		kana: "ゆきまつりがかいさいされる",
		romaji: "yukimatsurigakaisaisareru",
	},
	{
		jp: "冬景色が美しいですね",
		kana: "ふゆけしきがうつくしいですね",
		romaji: "fuyukeshikigautukushidesne",
	},
	{
		jp: "梅見の季節がやってきた",
		kana: "うめみのきせつがやってきた",
		romaji: "umeminokisetuugayattekita",
	},
	{
		jp: "早春の訪れですね",
		kana: "そうしゅんのとずれですね",
		romaji: "souschunnotusuredesne",
	},
	{
		jp: "黄色い水仙の花",
		kana: "きいろいすいせんのはな",
		romaji: "kiiroidsuisennohana",
	},
	{
		jp: "沈丁花が咲く季節",
		kana: "じんちょうげがさくきせつ",
		romaji: "jinchouggegasakukisetsu",
	},
	{
		jp: "卒業シーズンが来た",
		kana: "そつぎょうしーずんがきた",
		romaji: "sotsyougyousizungakita",
	},
	{
		jp: "卒業式に参加した",
		kana: "そつぎょうしきにさんかした",
		romaji: "sotsyougyoushikninisankashita",
	},
	{
		jp: "入学準備が大変だ",
		kana: "にゅうがくじゅんびがたいへんだ",
		romaji: "nyuugakujunbigataihenda",
	},
	{
		jp: "桜の蕾がほころぶ",
		kana: "さくらのつぼみがほころぶ",
		romaji: "sakuranottsuobomigahokorobu",
	},
	{
		jp: "花見の季節が近い",
		kana: "はなみのきせつがちかい",
		romaji: "hanaminokisetuugachikai",
	},
	{
		jp: "桜吹雪が美しい",
		kana: "さくらふぶきがうつくしい",
		romaji: "sakurafubukigautukushi",
	},
	{
		jp: "新緑の季節です",
		kana: "しんりょくのきせつです",
		romaji: "shinryokunokisetuidesu",
	},
	{
		jp: "木々の緑が濃い",
		kana: "きぎのみどりがこい",
		romaji: "kiginomidorigakoi",
	},
	{
		jp: "ツツジの花がいっぱい",
		kana: "つつじのはながいっぱい",
		romaji: "tsutujinohanaigaipai",
	},
	{
		jp: "青葉の季節がきた",
		kana: "あおばのきせつがきた",
		romaji: "aobannokisetuugakita",
	},
	{
		jp: "新茶の季節がやってきた",
		kana: "しんちゃのきせつがやってきた",
		romaji: "shinchanokisetuugayattekita",
	},
	{
		jp: "茶摘みの季節だ",
		kana: "ちゃつみのきせつだ",
		romaji: "chatsuminokisetuda",
	},
	{
		jp: "初夏の風が心地よい",
		kana: "しょかのかぜがこころよい",
		romaji: "shokannokzaegakokoro",
	},
	{
		jp: "あじさい寺を訪れた",
		kana: "あじさいてらをたずねた",
		romaji: "ajisaiterawoazuneta",
	},
	{
		jp: "蛍狩りの季節だ",
		kana: "ほたるがりのきせつだ",
		romaji: "hotarugariinoikisetu",
	},
	{
		jp: "夏山登山に行く",
		kana: "なつやまとうざんにいく",
		romaji: "natsuyamatozanniiku",
	},
	{
		jp: "夏の旅がしたい",
		kana: "なつのたびがしたい",
		romaji: "natunnotabigashitai",
	},
	{
		jp: "海水浴に行った",
		kana: "かいすいよくにいった",
		romaji: "kaisuiyokuniita",
	},
	{
		jp: "秋雨の季節だ",
		kana: "あきさめのきせつだ",
		romaji: "akisamenokisetuda",
	},
	{
		jp: "秋桜が咲く",
		kana: "あきざくらがさく",
		romaji: "akizakuragasaku",
	},
	{
		jp: "高いです",
		kana: "たかいです",
		romaji: "takaidesу",
	},
	{
		jp: "割引ありますか",
		kana: "わりびきありますか",
		romaji: "waribikiarimasuka",
	},
	{
		jp: "カードで払います",
		kana: "かーどではらいます",
		romaji: "kādodeharaimasu",
	},
	{
		jp: "現金で払います",
		kana: "げんきんではらいます",
		romaji: "genkindeharaimasu",
	},
	{
		jp: "袋ください",
		kana: "ふくろください",
		romaji: "fukurokudasai",
	},
	{
		jp: "一つください",
		kana: "ひとつください",
		romaji: "hitotsukudasai",
	},
	{
		jp: "二つください",
		kana: "ふたつください",
		romaji: "futatsukudasai",
	},
	{
		jp: "何かお探しですか",
		kana: "なにかおさがしですか",
		romaji: "nankaosagashidesuka",
	},
	{
		jp: "こちらがおすすめです",
		kana: "こちらがおすすめです",
		romaji: "kochiragaosusumdesu",
	},
	{
		jp: "サイズはいかがですか",
		kana: "さいずはいかがですか",
		romaji: "saizuhaikagadesuka",
	},
	{
		jp: "色はどれがいいですか",
		kana: "いろはどれがいいですか",
		romaji: "irohadoregaidesuka",
	},
	{
		jp: "他にご用はありますか",
		kana: "ほかにごようはありますか",
		romaji: "hokanigyōuharimasuka",
	},
	{
		jp: "ポイントカードはありますか",
		kana: "ぽいんとかーどはありますか",
		romaji: "pointokāduhaarimasuka",
	},
	{
		jp: "これとこれをください",
		kana: "これとこれをください",
		romaji: "koretokoreudasai",
	},
	{
		jp: "セール品はどこですか",
		kana: "せーるひんはどこですか",
		romaji: "sēruhinhadokodesu",
	},
	{
		jp: "Tシャツはありますか",
		kana: "てぃーしゃつはありますか",
		romaji: "tiːshatsuharimasuka",
	},
	{
		jp: "靴のサイズはありますか",
		kana: "くつのさいずはありますか",
		romaji: "kutsunosaizuharimasuka",
	},
	{
		jp: "黒色はありますか",
		kana: "くろいろはありますか",
		romaji: "kuroirohaarimasuka",
	},
	{
		jp: "Mサイズを見せてください",
		kana: "えむさいずをみせてください",
		romaji: "emusaizuomisetekundasai",
	},
	{
		jp: "他の色はありますか",
		kana: "ほかのいろはありますか",
		romaji: "hokaniroihaarimasuka",
	},
	{
		jp: "これは綿ですか",
		kana: "これはわたですか",
		romaji: "korehaWATAdesuka",
	},
	{
		jp: "セール中ですか",
		kana: "せーるちゅうですか",
		romaji: "sēruchuudesuka",
	},
	{
		jp: "ストックはありますか",
		kana: "すとっくはありますか",
		romaji: "sutokuhaarimasuka",
	},
	{
		jp: "試着できますか",
		kana: "しちゃくできますか",
		romaji: "shichakudekirmasuka",
	},
	{
		jp: "返品できますか",
		kana: "へんぴんできますか",
		romaji: "henpindekirmasuka",
	},
	{
		jp: "もう少し安くなりませんか",
		kana: "もうすこしやすくなりませんか",
		romaji: "mousaloshiyaskunarimasenka",
	},
	{
		jp: "二つで幾らですか",
		kana: "ふたつでいくらですか",
		romaji: "futatsudeikuradesuka",
	},
	{
		jp: "セットで安くなりますか",
		kana: "せっとでやすくなりますか",
		romaji: "settodeyaskunarimasuka",
	},
	{
		jp: "ポイントで払えますか",
		kana: "ぽいんとではらえますか",
		romaji: "pointodeharaemasuka",
	},
	{
		jp: "クーポンはありますか",
		kana: "くーぽんはありますか",
		romaji: "kuuponhaarimasuka",
	},
	{
		jp: "学生割引ありますか",
		kana: "がくせいわりびきありますか",
		romaji: "gakuseiwaribikiarimasuka",
	},
	{
		jp: "会員割引ありますか",
		kana: "かいいんわりびきありますか",
		romaji: "kaiinwaribikiarimasuka",
	},
	{
		jp: "今日特別な値段ですか",
		kana: "きょうとくべつなねだんですか",
		romaji: "kyōtokubetsunaneданdesuka",
	},
	{
		jp: "税込みですか",
		kana: "ぜいこみですか",
		romaji: "zeikomidesuka",
	},
	{
		jp: "配送料はいくらですか",
		kana: "はいそうりょうはいくらですか",
		romaji: "haisōryōhaikuradesuka",
	},
	{
		jp: "明日配送できますか",
		kana: "あしたはいそうできますか",
		romaji: "ashitahaisōdekirmasuka",
	},
	{
		jp: "配送先を教えてください",
		kana: "はいそうさきをおしえてください",
		romaji: "haisōsakiwooshietekundasai",
	},
	{
		jp: "入荷予定はいつですか",
		kana: "にゅうかよていはいつですか",
		romaji: "nyūkayoteihaitsdesuka",
	},
	{
		jp: "予約できますか",
		kana: "よやくできますか",
		romaji: "yoyakudekirmasuka",
	},
	{
		jp: "全国配送できますか",
		kana: "ぜんこくはいそうできますか",
		romaji: "zenkokuhaisōdekirmasuka",
	},
	{
		jp: "配送方法は選べますか",
		kana: "はいそうほうほうはえらべますか",
		romaji: "haisōhōhōhaerasemasuka",
	},
	{
		jp: "送料無料ですか",
		kana: "そうりょうむりょうですか",
		romaji: "sōryōmuryōdesuka",
	},
	{
		jp: "夜間配送できますか",
		kana: "やかんはいそうできますか",
		romaji: "yakanhaisōdekirmasuka",
	},
	{
		jp: "このサイトは安全ですか",
		kana: "このさいとはあんぜんですか",
		romaji: "konosaitohaanzendesuka",
	},
	{
		jp: "アカウント作成しましょう",
		kana: "あかうんとさくせいしましょう",
		romaji: "akauntosakuseishimashō",
	},
	{
		jp: "パスワードを忘れました",
		kana: "ぱすわーどをわすれました",
		romaji: "pasuwādowowasuremasita",
	},
	{
		jp: "ログインできません",
		kana: "ろぐいんできません",
		romaji: "roguindekirmasen",
	},
	{
		jp: "カートに入れました",
		kana: "かーとにいれました",
		romaji: "kātoniiremashita",
	},
	{
		jp: "カートをクリアしたい",
		kana: "かーとをくりあしたい",
		romaji: "kārtokuriashitai",
	},
	{
		jp: "チェックアウトします",
		kana: "ちぇっくあうとします",
		romaji: "checkautoshimasu",
	},
	{
		jp: "支払い方法を選んでください",
		kana: "しはらいほうほうをえらんでください",
		romaji: "shiharaihōhōwoerande",
	},
	{
		jp: "配送アドレスを確認してください",
		kana: "はいそうあどれすをかくにんしてください",
		romaji: "haisōadoresuwokakuninshite",
	},
	{
		jp: "注文を確定しました",
		kana: "ちゅうもんをかくていしました",
		romaji: "chūmonwokakuteishita",
	},
	{
		jp: "これは壊れています",
		kana: "これはこわれています",
		romaji: "korehakowareteimasu",
	},
	{
		jp: "サイズが合いません",
		kana: "さいずがあいません",
		romaji: "saizugaaimasen",
	},
	{
		jp: "色が違いました",
		kana: "いろがちがいました",
		romaji: "irogachigaimashita",
	},
	{
		jp: "返品したいです",
		kana: "へんぴんしたいです",
		romaji: "henpinshitaidesу",
	},
	{
		jp: "交換できますか",
		kana: "こうかんできますか",
		romaji: "kōkandekirmasuka",
	},
	{
		jp: "返金はいつですか",
		kana: "へんきんはいつですか",
		romaji: "henkinhaitsdesuka",
	},
	{
		jp: "返送料は無料ですか",
		kana: "へんそうりょうはむりょうですか",
		romaji: "hensōryōhamuryōdesuka",
	},
	{
		jp: "返品期限はいつまでですか",
		kana: "へんぴんきげんはいつまでですか",
		romaji: "henpinkigenhaitsumadedesuka",
	},
	{
		jp: "別のサイズで交換したい",
		kana: "べつのさいずでこうかんしたい",
		romaji: "betsunosaizudekōkanshitai",
	},
	{
		jp: "同じ商品で交換してください",
		kana: "おなじしょうひんでこうかんしてください",
		romaji: "onajishōhindekoukansitekudasai",
	},
	{
		jp: "これはどこの製品ですか",
		kana: "これはどこのせいひんですか",
		romaji: "korehadokonoseihindesuka",
	},
	{
		jp: "保証はついていますか",
		kana: "ほしょうはついていますか",
		romaji: "hoshōhatsuiteimasuka",
	},
	{
		jp: "耐久性はいいですか",
		kana: "たいきゅうせいはいいですか",
		romaji: "taikyūseihaiidesу",
	},
	{
		jp: "防水加工ですか",
		kana: "ぼうすいかこうですか",
		romaji: "bōsuikakōdesuka",
	},
	{
		jp: "素材は何ですか",
		kana: "そざいはなんですか",
		romaji: "sozaihanandensuka",
	},
	{
		jp: "手入れは簡単ですか",
		kana: "ていれはかんたんですか",
		romaji: "teirehakantandesuka",
	},
	{
		jp: "洗濯機で洗えますか",
		kana: "せんたくきであらえますか",
		romaji: "sentakukidearaemasuka",
	},
	{
		jp: "アレルギー対応ですか",
		kana: "あれるぎーたいおうですか",
		romaji: "arerugītaiōdesuka",
	},
	{
		jp: "環境配慮の製品ですか",
		kana: "かんきょうはいりょのせいひんですか",
		romaji: "kankyōhairyonoseihinsuka",
	},
	{
		jp: "生産地はどこですか",
		kana: "せいさんちはどこですか",
		romaji: "seisanchihadokodesu",
	},
	{
		jp: "営業時間は何時までですか",
		kana: "えいぎょうじかんはなんじまでですか",
		romaji: "eigyōjikanhannanjimadedesuka",
	},
	{
		jp: "日曜日は営業していますか",
		kana: "にちようびはえいぎょうしていますか",
		romaji: "nichiyōbihaeigōshiteimasuka",
	},
	{
		jp: "近くにATMがありますか",
		kana: "ちかくにあーてぃーえむがありますか",
		romaji: "chikakunitiemagarismasuka",
	},
	{
		jp: "試着室はどこですか",
		kana: "しちゃくしつはどこですか",
		romaji: "shichakushitsuhadokodesu",
	},
	{
		jp: "レジはどこですか",
		kana: "れじはどこですか",
		romaji: "rejihadokodesu",
	},
	{
		jp: "カフェがありますか",
		kana: "かふぇがありますか",
		romaji: "kafegarimasuka",
	},
	{
		jp: "WiFiはありますか",
		kana: "わいふぁいはありますか",
		romaji: "waifaihaarimasuka",
	},
	{
		jp: "スタッフを呼べますか",
		kana: "すたっふをよべますか",
		romaji: "sutaffuoyobemasuka",
	},
	{
		jp: "春のセール中ですか",
		kana: "はるのせーるちゅうですか",
		romaji: "harunosēruchuudesuka",
	},
	{
		jp: "夏物が入荷しました",
		kana: "なつものがにゅうかしました",
		romaji: "natsumononinyūkashita",
	},
	{
		jp: "冬セール始まりました",
		kana: "ふゆせーるはじまりました",
		romaji: "fuyusēruhajimamashita",
	},
	{
		jp: "バーゲン開催中ですか",
		kana: "ばーげんかいさいちゅうですか",
		romaji: "bāgenkaaisaichūdesuka",
	},
	{
		jp: "ブラックフライデーですか",
		kana: "ぶらっくふらいでーですか",
		romaji: "burakkufraidēdesuka",
	},
	{
		jp: "クリスマス商品はありますか",
		kana: "くりすますしょうひんはありますか",
		romaji: "kurisumashōhinhaarimasuka",
	},
	{
		jp: "福袋は売り切れですか",
		kana: "ふくぶくろはうりきれですか",
		romaji: "fukubukuroha urikiredesuka",
	},
	{
		jp: "新作が入荷しましたか",
		kana: "しんさくがにゅうかしましたか",
		romaji: "shinsakugannyūkashimashitaka",
	},
	{
		jp: "限定品は残っていますか",
		kana: "げんていひんはのこっていますか",
		romaji: "genteihinnokotemasuka",
	},
	{
		jp: "予約品の到着はいつですか",
		kana: "よやくひんのとうちゃくはいつですか",
		romaji: "yoyakuhinnotouch​akuhaitsdesuka",
	},
	{
		jp: "ブランド品ですか",
		kana: "ぶらんどひんですか",
		romaji: "burandohinsuka",
	},
	{
		jp: "正規品ですか",
		kana: "せいきひんですか",
		romaji: "seikihinsuka",
	},
	{
		jp: "並行輸入品ですか",
		kana: "へいこうゆにゅうひんですか",
		romaji: "heikōyunyūhinsuka",
	},
	{
		jp: "高級ブランドありますか",
		kana: "こうきゅうぶらんどありますか",
		romaji: "kōkyūburandoarimasuka",
	},
	{
		jp: "デザイナーズ商品ありますか",
		kana: "でざいなーずしょうひんありますか",
		romaji: "dezaināzushohinarisuka",
	},
	{
		jp: "本物ですか",
		kana: "ほんものですか",
		romaji: "honmonodesuka",
	},
	{
		jp: "国内正規品ですか",
		kana: "こくないせいきひんですか",
		romaji: "kokunaiseiikihinsuka",
	},
	{
		jp: "海外ブランドですか",
		kana: "かいがいぶらんどですか",
		romaji: "kaigaiburandodesuka",
	},
	{
		jp: "これは限定版ですか",
		kana: "これはげんていばんですか",
		romaji: "korehagenteibansuka",
	},
	{
		jp: "コラボ商品ですか",
		kana: "ころぼしょうひんですか",
		romaji: "koroboroshōhindesuka",
	},
	{
		jp: "スポーツ用品はここですか",
		kana: "すぽーつようひんはここですか",
		romaji: "supōtsuyōhinhakokodesuka",
	},
	{
		jp: "ハイキングブーツはありますか",
		kana: "はいきんぐぶーつはありますか",
		romaji: "haikingubūtsuhaarimasuka",
	},
	{
		jp: "防寒着はありますか",
		kana: "ぼうかんぎはありますか",
		romaji: "boukangiharimasuka",
	},
	{
		jp: "レインコートはありますか",
		kana: "れいんこーとはありますか",
		romaji: "reinkōtohaarimasuka",
	},
	{
		jp: "スポーツシューズの在庫ありますか",
		kana: "すぽーつしゅーずのざいこありますか",
		romaji: "supōtsushūzunozaikoarimasuka",
	},
	{
		jp: "水着のサイズはありますか",
		kana: "みずぎのさいずはありますか",
		romaji: "mizuginosаizuharimasuka",
	},
	{
		jp: "登山用具がありますか",
		kana: "とざんようぐがありますか",
		romaji: "tozanyōgugarimasuka",
	},
	{
		jp: "ウェットスーツはありますか",
		kana: "うぇっとすーつはありますか",
		romaji: "uettosūtsuhaarimasuka",
	},
	{
		jp: "ヨガマットはありますか",
		kana: "ようがまっとはありますか",
		romaji: "yōgamattoharimasuka",
	},
	{
		jp: "運動靴のサイズはありますか",
		kana: "うんどうくつのさいずはありますか",
		romaji: "undōkutsunosaizuharimasuka",
	},
	{
		jp: "鍋セットはありますか",
		kana: "なべせっとはありますか",
		romaji: "nabesettohaarimasuka",
	},
	{
		jp: "包丁の質はいいですか",
		kana: "ほうちょうのしつはいいですか",
		romaji: "hōchōnoshitsuhaiidesу",
	},
	{
		jp: "フライパンはありますか",
		kana: "ふらいぱんはありますか",
		romaji: "furaipanhaarimasuka",
	},
	{
		jp: "お弁当箱はありますか",
		kana: "おべんとうばこはありますか",
		romaji: "obentōbakohaarimasuka",
	},
	{
		jp: "タッパーのサイズはどれですか",
		kana: "たっぱーのさいずはどれですか",
		romaji: "tappānosaizuhadoredesuka",
	},
	{
		jp: "食器洗い洗剤はありますか",
		kana: "しょっきあらいせんざいはありますか",
		romaji: "shokkiaraisenzaihaarimasuka",
	},
	{
		jp: "ふきんはありますか",
		kana: "ふきんはありますか",
		romaji: "fukinhaarimasuka",
	},
	{
		jp: "まな板はどこですか",
		kana: "まないたはどこですか",
		romaji: "manaitahadokodesu",
	},
	{
		jp: "キッチン用具があります",
		kana: "きっちんようぐがあります",
		romaji: "kitchinyōgugaarimasu",
	},
	{
		jp: "圧力鍋はありますか",
		kana: "あつりょくなべはありますか",
		romaji: "atsuyokunabehaarimasuka",
	},
	{
		jp: "冬用コートはありますか",
		kana: "ふゆようこーとはありますか",
		romaji: "fuyuyōkōtohaarimasuka",
	},
	{
		jp: "セーターはありますか",
		kana: "せーたーはありますか",
		romaji: "sētāhaarimasuka",
	},
	{
		jp: "ジーンズはありますか",
		kana: "じーんずはありますか",
		romaji: "jīnzuhaarimasuka",
	},
	{
		jp: "ワンピースはありますか",
		kana: "わんぴーすはありますか",
		romaji: "wanpīsuhaarimasuka",
	},
	{
		jp: "スカートのサイズはありますか",
		kana: "すかーとのさいずはありますか",
		romaji: "sukātonosaizuharimasuka",
	},
	{
		jp: "ズボンのウエストは何センチですか",
		kana: "ずぼんのうえすとはなんせんちですか",
		romaji: "zubonnouエstohannsenchidesuka",
	},
	{
		jp: "靴下はありますか",
		kana: "くつしたはありますか",
		romaji: "kutsushitahaarimasuka",
	},
	{
		jp: "帽子はありますか",
		kana: "ぼうしはありますか",
		romaji: "bōshihaarimasuka",
	},
	{
		jp: "手袋はありますか",
		kana: "てぶくろはありますか",
		romaji: "tebukurohaarimasuka",
	},
	{
		jp: "スカーフはありますか",
		kana: "すかーふはありますか",
		romaji: "sukāfuhaarimasuka",
	},
	{
		jp: "化粧品売り場はどこですか",
		kana: "けしょうひんうりばはどこですか",
		romaji: "keshouhinuribahadokodesu",
	},
	{
		jp: "ファンデーションはありますか",
		kana: "ふぁんでーしょんはありますか",
		romaji: "fandēshonhaarimasuka",
	},
	{
		jp: "肌に優しいですか",
		kana: "はだにやさしいですか",
		romaji: "hadaniyashashiidesuka",
	},
	{
		jp: "敏感肌用ですか",
		kana: "びんかんはだようですか",
		romaji: "binkanhadayōdesuka",
	},
	{
		jp: "日焼け止めはありますか",
		kana: "ひやけどめはありますか",
		romaji: "hiyakedomehaarimasuka",
	},
	{
		jp: "シャンプーはありますか",
		kana: "しゃんぷーはありますか",
		romaji: "shanpūhaarimasuka",
	},
	{
		jp: "リンスはありますか",
		kana: "りんすはありますか",
		romaji: "rinsuhaarimasuka",
	},
	{
		jp: "マスカラはありますか",
		kana: "ますからはありますか",
		romaji: "maskarahaarimasuka",
	},
	{
		jp: "口紅の色は何色ですか",
		kana: "くちべにのいろはなんいろですか",
		romaji: "kuchibeninoirohannirotoka",
	},
	{
		jp: "爪やすりはありますか",
		kana: "つめやすりはありますか",
		romaji: "tsumeyasurihaarimasuka",
	},
	{
		jp: "本売り場はどこですか",
		kana: "ほんうりばはどこですか",
		romaji: "honuribahadokodesu",
	},
	{
		jp: "漫画はありますか",
		kana: "まんがはありますか",
		romaji: "mangahaarimasuka",
	},
	{
		jp: "文庫本のサイズはありますか",
		kana: "ぶんこぼんのさいずはありますか",
		romaji: "bunkobonnosaizuharimasuka",
	},
	{
		jp: "新しい本が入荷しましたか",
		kana: "あたらしいほんがにゅうかしましたか",
		romaji: "atarashiihonnayūkashimashitaka",
	},
	{
		jp: "ベストセラーはありますか",
		kana: "べすとせらーはありますか",
		romaji: "besutoserarūhaarimasuka",
	},
	{
		jp: "電子書籍はありますか",
		kana: "でんししょせきはありますか",
		romaji: "denshishosekihaarimasuka",
	},
	{
		jp: "雑誌のバックナンバーはありますか",
		kana: "ざっしのばっくなんばーはありますか",
		romaji: "zashinobackkunanbarūhaarimasuka",
	},
	{
		jp: "読書用の椅子はありますか",
		kana: "どくしょようのいすはありますか",
		romaji: "dokushoyounoisuhaarimasuka",
	},
	{
		jp: "しおりはありますか",
		kana: "しおりはありますか",
		romaji: "shiorihaarimasuka",
	},
	{
		jp: "本棚はありますか",
		kana: "ほんだなはありますか",
		romaji: "hondanahaarimasuka",
	},
	{
		jp: "スマートフォンはありますか",
		kana: "すまーとふぉんはありますか",
		romaji: "sumātofōnhaarimasuka",
	},
	{
		jp: "充電器はありますか",
		kana: "じゅうでんきはありますか",
		romaji: "jūdenkirhaarimasuka",
	},
	{
		jp: "イヤホンはありますか",
		kana: "いやほんはありますか",
		romaji: "iyahonhaarimasuka",
	},
	{
		jp: "タブレットのケースはありますか",
		kana: "たぶれっとのけーすはありますか",
		romaji: "tabletonokēsuhaarimasuka",
	},
	{
		jp: "ノートパソコンはありますか",
		kana: "のーとぱそこんはありますか",
		romaji: "nōtopasohonhaarimasuka",
	},
	{
		jp: "マウスはありますか",
		kana: "まうすはありますか",
		romaji: "mausuhaarimasuka",
	},
	{
		jp: "キーボードのタイプはありますか",
		kana: "きーぼーどのたいぷはありますか",
		romaji: "kībōdonotaipuhaarimasuka",
	},
	{
		jp: "掃除機はありますか",
		kana: "そうじきはありますか",
		romaji: "sōjikihaarimasuka",
	},
	{
		jp: "冷蔵庫のサイズはありますか",
		kana: "れいぞうこのさいずはありますか",
		romaji: "reizōkonosaizuharimasuka",
	},
	{
		jp: "洗濯機はありますか",
		kana: "せんたくきはありますか",
		romaji: "sentakukihaarimasuka",
	},
	{
		jp: "おもちゃはどこですか",
		kana: "おもちゃはどこですか",
		romaji: "omochyahadokodesu",
	},
	{
		jp: "ゲーム機はありますか",
		kana: "げーむきはありますか",
		romaji: "gēmukihaarimasuka",
	},
	{
		jp: "ビデオゲームはありますか",
		kana: "びでおげーむはありますか",
		romaji: "videogēmuhaarimasuka",
	},
	{
		jp: "トレーディングカードはありますか",
		kana: "とれーでぃんぐかーどはありますか",
		romaji: "toredīnguakāduhaarimasuka",
	},
	{
		jp: "ボードゲームはありますか",
		kana: "ぼーどげーむはありますか",
		romaji: "bōdogēmuhaarimasuka",
	},
	{
		jp: "パズルはありますか",
		kana: "ぱずるはありますか",
		romaji: "pazuruhaarimasuka",
	},
	{
		jp: "人形はありますか",
		kana: "にんぎょうはありますか",
		romaji: "ningyōhaarimasuka",
	},
	{
		jp: "ぬいぐるみはありますか",
		kana: "ぬいぐるみはありますか",
		romaji: "nuigurumiharimasuka",
	},
	{
		jp: "ラジコンはありますか",
		kana: "らじこんはありますか",
		romaji: "rajikonhaarimasuka",
	},
	{
		jp: "知育玩具はありますか",
		kana: "ちいくがんぐはありますか",
		romaji: "chiikuganguhaarimasuka",
	},
	{
		jp: "ベビー用品売り場はどこですか",
		kana: "べびーようひんうりばはどこですか",
		romaji: "bebīyōhinuribahadokodesu",
	},
	{
		jp: "おむつはありますか",
		kana: "おむつはありますか",
		romaji: "omutsuhaarimasuka",
	},
	{
		jp: "ベビーカーはありますか",
		kana: "べびーかーはありますか",
		romaji: "bebīkāhaarimasuka",
	},
	{
		jp: "授乳ケープはありますか",
		kana: "じゅにゅうけーぷはありますか",
		romaji: "junyūkēpuhaarimasuka",
	},
	{
		jp: "子ども靴のサイズはありますか",
		kana: "こどもくつのさいずはありますか",
		romaji: "kodomokutsunosaizuharimasuka",
	},
	{
		jp: "キッズ洋服はサイズ展開ありますか",
		kana: "きっずようふくはさいずてんかいありますか",
		romaji: "kizzuyōfukuhasaizutenkaiarimasuka",
	},
	{
		jp: "チャイルドシートはありますか",
		kana: "ちゃいるどしーとはありますか",
		romaji: "chairudoshītoharimasuka",
	},
	{
		jp: "離乳食はありますか",
		kana: "りにゅうしょくはありますか",
		romaji: "rinyūshokuhaarimasuka",
	},
	{
		jp: "哺乳瓶はありますか",
		kana: "ほにゅうびんはありますか",
		romaji: "honyūbinhaarimasuka",
	},
	{
		jp: "ベビーベッドはありますか",
		kana: "べびーべっどはありますか",
		romaji: "bebībeddohaarimasuka",
	},
	{
		jp: "ペット用品はどこですか",
		kana: "ぺっとようひんはどこですか",
		romaji: "pettoyōhinhadokodesu",
	},
	{
		jp: "犬用食器はありますか",
		kana: "いぬようしょっきはありますか",
		romaji: "inuyōshokihaarimasuka",
	},
	{
		jp: "猫用トイレはありますか",
		kana: "ねこようといれはありますか",
		romaji: "nekoyōtoirehaarimasuka",
	},
	{
		jp: "ペットフードはありますか",
		kana: "ぺっとふーどはありますか",
		romaji: "pettofūdohaarimasuka",
	},
	{
		jp: "ペット用シャンプーはありますか",
		kana: "ぺっとようしゃんぷーはありますか",
		romaji: "pettoyōshanpūhaarimasuka",
	},
	{
		jp: "ペット用おもちゃはありますか",
		kana: "ぺっとようおもちゃはありますか",
		romaji: "pettoyōomochyahaarimasuka",
	},
	{
		jp: "首輪はありますか",
		kana: "くびわはありますか",
		romaji: "kubiwahaarimasuka",
	},
	{
		jp: "リードはありますか",
		kana: "りーどはありますか",
		romaji: "rīdohaarimasuka",
	},
	{
		jp: "ペットベッドはありますか",
		kana: "ぺっとべっどはありますか",
		romaji: "pettobeddohaarimasuka",
	},
	{
		jp: "キャットタワーはありますか",
		kana: "きゃっとたわーはありますか",
		romaji: "kyattotawāhaarimasuka",
	},
	{
		jp: "走ります",
		kana: "はしります",
		romaji: "hashirimasu",
	},
	{
		jp: "泳ぎます",
		kana: "およぎます",
		romaji: "oyogimasu",
	},
	{
		jp: "歩きます",
		kana: "あるきます",
		romaji: "arukimasu",
	},
	{
		jp: "跳びます",
		kana: "とびます",
		romaji: "tobimasu",
	},
	{
		jp: "蹴ります",
		kana: "けります",
		romaji: "kerimasu",
	},
	{
		jp: "投げます",
		kana: "なげます",
		romaji: "nagemasu",
	},
	{
		jp: "打ちます",
		kana: "うちます",
		romaji: "uchimasu",
	},
	{
		jp: "捕ります",
		kana: "とります",
		romaji: "torimasu",
	},
	{
		jp: "漕ぎます",
		kana: "こぎます",
		romaji: "kogimasu",
	},
	{
		jp: "乗ります",
		kana: "のります",
		romaji: "norimasu",
	},
	{
		jp: "毎日運動します",
		kana: "まいにちうんどうします",
		romaji: "mainichiunndousimasu",
	},
	{
		jp: "テニスをします",
		kana: "てにすをします",
		romaji: "tenisuwosimasu",
	},
	{
		jp: "野球をしたい",
		kana: "やきゅうをしたい",
		romaji: "yakuuuwositai",
	},
	{
		jp: "バドミントンをやる",
		kana: "ばどみんとんをやる",
		romaji: "badomintonwoyaru",
	},
	{
		jp: "ジョギングが好きです",
		kana: "じょぎんぐがすきです",
		romaji: "jogingugasukidesu",
	},
	{
		jp: "毎週水曜日に走る",
		kana: "まいしゅうすいようびにはしる",
		romaji: "maishuusuiyoubinihashiru",
	},
	{
		jp: "フィットネスクラブに行く",
		kana: "ふぃっとねすくらぶにいく",
		romaji: "fittonesukulabuniiiku",
	},
	{
		jp: "サッカーの試合",
		kana: "さっかーのしあい",
		romaji: "sakkaanosiai",
	},
	{
		jp: "バスケットボールが上手",
		kana: "ばすけっとぼーるがじょうず",
		romaji: "basukettobooruugajouzu",
	},
	{
		jp: "オリンピック選手になる",
		kana: "おりんぴっくせんしゅになる",
		romaji: "orinpikkusennshuninaru",
	},
	{
		jp: "週に三回ジムに通っています",
		kana: "しゅうにさんかいじむにかよっています",
		romaji: "shuunisakaikaimunitsunyouteimasu",
	},
	{
		jp: "朝五時に起きて運動する習慣がある",
		kana: "あさごじにおきてうんどうするしゅうかんがある",
		romaji: "asagojiniokiteuundousurushyuukanngaaru",
	},
	{
		jp: "マラソン大会に参加する予定です",
		kana: "ままらそんたいかいにさんかするよていです",
		romaji: "marasontaikainisankasuruyoteiidesu",
	},
	{
		jp: "昨年のスポーツの日は野球をしました",
		kana: "さくねんのすぽーつのひはやきゅうをしました",
		romaji: "sakunennosupootsunohihayakuuuwosimashita",
	},
	{
		jp: "体を鍛えることは大切です",
		kana: "からだをきたえることはたいせつです",
		romaji: "karadawokitaerukotohataisetudesu",
	},
	{
		jp: "バレーボール",
		kana: "ばれーぼーる",
		romaji: "bareebooru",
	},
	{
		jp: "ボウリング",
		kana: "ぼうりんぐ",
		romaji: "bouiringu",
	},
	{
		jp: "ゴルフをやる",
		kana: "ごるふをやる",
		romaji: "gorufuwoyaru",
	},
	{
		jp: "スキーを滑る",
		kana: "すきーをすべる",
		romaji: "sukiiwossuberu",
	},
	{
		jp: "スノーボード",
		kana: "すのーぼーど",
		romaji: "sunooboodo",
	},
	{
		jp: "アイススケート",
		kana: "あいすすけーと",
		romaji: "aisusukeeto",
	},
	{
		jp: "ヨガのクラス",
		kana: "よがのくらす",
		romaji: "yoganokurasu",
	},
	{
		jp: "ピラティス",
		kana: "ぴらてぃす",
		romaji: "piratisu",
	},
	{
		jp: "筋トレをする",
		kana: "きんとれをする",
		romaji: "kintorewosuru",
	},
	{
		jp: "腹筋運動",
		kana: "ふっきんうんどう",
		romaji: "fukkinuundou",
	},
	{
		jp: "トレーニング",
		kana: "とれーにんぐ",
		romaji: "toreniningu",
	},
	{
		jp: "ウォーミングアップ",
		kana: "うぉーみんぐあっぷ",
		romaji: "uuoomingguappu",
	},
	{
		jp: "ストレッチ",
		kana: "すとれっち",
		romaji: "sutoretchi",
	},
	{
		jp: "ランニング",
		kana: "らんにんぐ",
		romaji: "ranniningu",
	},
	{
		jp: "体操をする",
		kana: "たいそうをする",
		romaji: "taisouwosuru",
	},
	{
		jp: "エアロビクス",
		kana: "えあろびくす",
		romaji: "earobikusu",
	},
	{
		jp: "格闘技",
		kana: "かくとうぎ",
		romaji: "kakutougi",
	},
	{
		jp: "柔道の稽古",
		kana: "じゅうどうのけいこ",
		romaji: "juudounokeiko",
	},
	{
		jp: "剣道を習う",
		kana: "けんどうをならう",
		romaji: "kendouwonaru",
	},
	{
		jp: "空手の大会",
		kana: "からてのたいかい",
		romaji: "karatenetaikaai",
	},
	{
		jp: "自転車で通勤する",
		kana: "じてんしゃでつうきんする",
		romaji: "jitenshadutsuukinnsuru",
	},
	{
		jp: "朝のウォーキング",
		kana: "あさのうぉーきんぐ",
		romaji: "asanouuookingu",
	},
	{
		jp: "川で釣りをする",
		kana: "かわでつりをする",
		romaji: "kawadetsuriwosuru",
	},
	{
		jp: "山登り",
		kana: "やまのぼり",
		romaji: "yamanoborl",
	},
	{
		jp: "キャンプ",
		kana: "きゃんぷ",
		romaji: "kyanpu",
	},
	{
		jp: "ハイキング",
		kana: "はいきんぐ",
		romaji: "haikingu",
	},
	{
		jp: "スケートボード",
		kana: "すけーとぼーど",
		romaji: "sukeetoboodo",
	},
	{
		jp: "サーフィン",
		kana: "さーふぃん",
		romaji: "saafin",
	},
	{
		jp: "スカイダイビング",
		kana: "すかいだいびんぐ",
		romaji: "sukaidaiingu",
	},
	{
		jp: "健康が第一です",
		kana: "けんこうがだいいちです",
		romaji: "kenkougugadiichiidesu",
	},
	{
		jp: "運動不足です",
		kana: "うんどうぶそくです",
		romaji: "uundoubusokudesu",
	},
	{
		jp: "毎日歩く",
		kana: "まいにちあるく",
		romaji: "mainichiaruku",
	},
	{
		jp: "体力がつく",
		kana: "たいりょくがつく",
		romaji: "tairyokugatuku",
	},
	{
		jp: "筋肉が痛い",
		kana: "きんにくがいたい",
		romaji: "kinnikusgaitai",
	},
	{
		jp: "疲れました",
		kana: "つかれました",
		romaji: "tsukaremashita",
	},
	{
		jp: "息切れします",
		kana: "いきぎれします",
		romaji: "ikigireishimasu",
	},
	{
		jp: "ダイエット中です",
		kana: "だいえっとちゅうです",
		romaji: "daietttochuudesu",
	},
	{
		jp: "目標達成",
		kana: "もくひょうたっせい",
		romaji: "mokuhyoutassei",
	},
	{
		jp: "スポーツ用品店",
		kana: "すぽーつようひんてん",
		romaji: "supootuyouhinnten",
	},
	{
		jp: "プール",
		kana: "ぷーる",
		romaji: "puuru",
	},
	{
		jp: "体育館",
		kana: "たいいくかん",
		romaji: "taiikukan",
	},
	{
		jp: "グラウンド",
		kana: "ぐらうんど",
		romaji: "guraundo",
	},
	{
		jp: "スタジアム",
		kana: "すたじあむ",
		romaji: "sutajiamu",
	},
	{
		jp: "スポーツセンター",
		kana: "すぽーつせんたー",
		romaji: "supootusutaa",
	},
	{
		jp: "体操着",
		kana: "たいそうぎ",
		romaji: "taisougi",
	},
	{
		jp: "スポーツウェア",
		kana: "すぽーつうぇあ",
		romaji: "supootsuwea",
	},
	{
		jp: "チームスポーツ",
		kana: "ちーむすぽーつ",
		romaji: "chiimusupootsu",
	},
	{
		jp: "ゴールを狙う",
		kana: "ごーるをねらう",
		romaji: "goouruounerau",
	},
	{
		jp: "試合に勝つ",
		kana: "しあいにかつ",
		romaji: "siainikatu",
	},
	{
		jp: "試合に負ける",
		kana: "しあいにまける",
		romaji: "siainikamakeru",
	},
	{
		jp: "引き分け",
		kana: "ひきわけ",
		romaji: "hikiwake",
	},
	{
		jp: "得点を獲得する",
		kana: "とくてんをかくとくする",
		romaji: "tokutenwokakutokusuru",
	},
	{
		jp: "レッドカード",
		kana: "れっどかーど",
		romaji: "reddokaodo",
	},
	{
		jp: "イエローカード",
		kana: "いえろーかーど",
		romaji: "ieorookaodo",
	},
	{
		jp: "PK戦",
		kana: "ぴーけーせん",
		romaji: "piikesen",
	},
	{
		jp: "オフサイド",
		kana: "おふさいど",
		romaji: "ofusaido",
	},
	{
		jp: "背中の筋肉",
		kana: "せなかのきんにく",
		romaji: "senakanokinnniku",
	},
	{
		jp: "腕立て伏せ",
		kana: "うでたてふせ",
		romaji: "udetatefuse",
	},
	{
		jp: "スクワット",
		kana: "すくわっと",
		romaji: "sukuwatto",
	},
	{
		jp: "ラン",
		kana: "らん",
		romaji: "ran",
	},
	{
		jp: "ダッシュ",
		kana: "だっしゅ",
		romaji: "dasshu",
	},
	{
		jp: "スプリント",
		kana: "すぷりんと",
		romaji: "supurinto",
	},
	{
		jp: "ジャンプ",
		kana: "じゃんぷ",
		romaji: "janpu",
	},
	{
		jp: "柔軟体操",
		kana: "じゅうなんたいそう",
		romaji: "juunantaisou",
	},
	{
		jp: "冷却",
		kana: "れいきゃく",
		romaji: "reikya",
	},
	{
		jp: "マッサージ",
		kana: "ますさーじ",
		romaji: "massaji",
	},
	{
		jp: "運動が好きです",
		kana: "うんどうがすきです",
		romaji: "uundougasukidesu",
	},
	{
		jp: "体を動かすのが楽しい",
		kana: "からだをうごかすのがたのしい",
		romaji: "karadawougokasuunotanoori",
	},
	{
		jp: "毎朝ジョギングします",
		kana: "まいあさじょぎんぐします",
		romaji: "maiasajoggingushimasu",
	},
	{
		jp: "週末スポーツをする",
		kana: "しゅうまつすぽーつをする",
		romaji: "shuumatsusupotsuwosuru",
	},
	{
		jp: "友人とテニスをする",
		kana: "ゆうじんとてにすをする",
		romaji: "yuujinntotenisuwosuru",
	},
	{
		jp: "スポーツ番組を見る",
		kana: "すぽーつばんぐみをみる",
		romaji: "supotsubangumiwomiru",
	},
	{
		jp: "五輪",
		kana: "ごりん",
		romaji: "gorin",
	},
	{
		jp: "ワールドカップ",
		kana: "わーるどかっぷ",
		romaji: "waarudokakuppu",
	},
	{
		jp: "メダル",
		kana: "めだる",
		romaji: "medaru",
	},
	{
		jp: "金メダル",
		kana: "きんめだる",
		romaji: "kinmedaru",
	},
	{
		jp: "肩が痛い",
		kana: "かたがいたい",
		romaji: "katagaitai",
	},
	{
		jp: "足を捻挫した",
		kana: "あしをねんざした",
		romaji: "ashiwonenzashita",
	},
	{
		jp: "膝痛",
		kana: "ひざつう",
		romaji: "hizatuu",
	},
	{
		jp: "腰痛",
		kana: "ようつう",
		romaji: "youtsuu",
	},
	{
		jp: "怪我をした",
		kana: "けがをした",
		romaji: "kegawoshita",
	},
	{
		jp: "リハビリ",
		kana: "りはびり",
		romaji: "rihabiri",
	},
	{
		jp: "休息が必要",
		kana: "きゅうそくがひつよう",
		romaji: "kyuusokuuugatihitsuyou",
	},
	{
		jp: "復帰する",
		kana: "ふっきする",
		romaji: "fukkisuru",
	},
	{
		jp: "回復中",
		kana: "かいふくちゅう",
		romaji: "kaifukuchuuu",
	},
	{
		jp: "治療を受ける",
		kana: "ちりょうをうける",
		romaji: "chiryouwuukeru",
	},
	{
		jp: "マラソンを完走する",
		kana: "ままらそんをかんそうする",
		romaji: "marasonnwokansousuru",
	},
	{
		jp: "タイムを更新する",
		kana: "たいむをこうしんする",
		romaji: "taimuwokoushinusuru",
	},
	{
		jp: "自己ベスト",
		kana: "じこべすと",
		romaji: "jikobesto",
	},
	{
		jp: "新記録",
		kana: "しんきろく",
		romaji: "shinkiroku",
	},
	{
		jp: "優勝する",
		kana: "ゆうしょうする",
		romaji: "yuushoususuru",
	},
	{
		jp: "準優勝",
		kana: "じゅんゆうしょう",
		romaji: "junyuushou",
	},
	{
		jp: "第三位",
		kana: "だいさんい",
		romaji: "daisanui",
	},
	{
		jp: "上位入賞",
		kana: "じょういにゅうしょう",
		romaji: "jouuinyuushou",
	},
	{
		jp: "ランキング",
		kana: "ぐらんきんぐ",
		romaji: "guran.kingu",
	},
	{
		jp: "記録を狙う",
		kana: "きろくをねらう",
		romaji: "kirokuwounerau",
	},
	{
		jp: "コーチ",
		kana: "こーち",
		romaji: "koochi",
	},
	{
		jp: "トレーナー",
		kana: "とれーなー",
		romaji: "toreenaa",
	},
	{
		jp: "指導する",
		kana: "しどうする",
		romaji: "shidousuru",
	},
	{
		jp: "練習試合",
		kana: "れんしゅうしあい",
		romaji: "renshuusiai",
	},
	{
		jp: "基本動作",
		kana: "きほんどうさ",
		romaji: "kihondousa",
	},
	{
		jp: "技術を磨く",
		kana: "ぎじゅつをみがく",
		romaji: "gijutsuwomigaku",
	},
	{
		jp: "メンタルトレーニング",
		kana: "めんたるとれーにんぐ",
		romaji: "mentalutorenningu",
	},
	{
		jp: "戦略",
		kana: "せんりゃく",
		romaji: "senryaku",
	},
	{
		jp: "ポジション",
		kana: "ぽじしょん",
		romaji: "pojishounn",
	},
	{
		jp: "フォーメーション",
		kana: "ふぉーめーしょん",
		romaji: "fouomeshon",
	},
	{
		jp: "栄養",
		kana: "えいよう",
		romaji: "eiyou",
	},
	{
		jp: "タンパク質",
		kana: "たんぱくしつ",
		romaji: "tanpakushitsu",
	},
	{
		jp: "カロリー",
		kana: "かろりー",
		romaji: "karorii",
	},
	{
		jp: "水分補給",
		kana: "すいぶんほきゅう",
		romaji: "suibunnhokuuu",
	},
	{
		jp: "エナジードリンク",
		kana: "えなじードリンク",
		romaji: "enajiidorinkku",
	},
	{
		jp: "プロテイン",
		kana: "ぷろていん",
		romaji: "purotein",
	},
	{
		jp: "栄養バランス",
		kana: "えいようばらんす",
		romaji: "eiyoubaransu",
	},
	{
		jp: "食事管理",
		kana: "しょくじかんり",
		romaji: "shokujikannri",
	},
	{
		jp: "サプリメント",
		kana: "さぷりめんと",
		romaji: "sapurimento",
	},
	{
		jp: "バドミントン選手",
		kana: "ばどみんとんせんしゅ",
		romaji: "badominntonsenshu",
	},
	{
		jp: "卓球",
		kana: "たくきゅう",
		romaji: "takukyuu",
	},
	{
		jp: "ホッケー",
		kana: "ほっけー",
		romaji: "hokkee",
	},
	{
		jp: "アメリカンフットボール",
		kana: "あめりかんふっとぼーる",
		romaji: "amerikannfuttoboru",
	},
	{
		jp: "ラグビー",
		kana: "らぐびー",
		romaji: "ragubii",
	},
	{
		jp: "クリケット",
		kana: "くりけっと",
		romaji: "kuriketto",
	},
	{
		jp: "ゴルフ選手",
		kana: "ごるふせんしゅ",
		romaji: "gorufuuenshu",
	},
	{
		jp: "競馬",
		kana: "けいば",
		romaji: "keiba",
	},
	{
		jp: "競輪",
		kana: "けいりん",
		romaji: "keirin",
	},
	{
		jp: "高速",
		kana: "こうそく",
		romaji: "kousoku",
	},
	{
		jp: "低速",
		kana: "ていそく",
		romaji: "teisoku",
	},
	{
		jp: "インターバル",
		kana: "いんたーばる",
		romaji: "intaabaru",
	},
	{
		jp: "スプリント走",
		kana: "すぷりんとそう",
		romaji: "supurinntsou",
	},
	{
		jp: "ペース配分",
		kana: "ぺーすはいぶん",
		romaji: "peesuhaibunn",
	},
	{
		jp: "全力疾走",
		kana: "ぜんりょくしっそう",
		romaji: "zennryokushisou",
	},
	{
		jp: "持久走",
		kana: "じきゅうそう",
		romaji: "jikyuusou",
	},
	{
		jp: "短距離走",
		kana: "たんきょりそう",
		romaji: "tankiorisuou",
	},
	{
		jp: "長距離走",
		kana: "ちょうきょりそう",
		romaji: "choukyorisuou",
	},
	{
		jp: "リレー",
		kana: "りれー",
		romaji: "riree",
	},
	{
		jp: "観戦する",
		kana: "かんせんする",
		romaji: "kansensuru",
	},
	{
		jp: "応援する",
		kana: "おうえんする",
		romaji: "ouensuru",
	},
	{
		jp: "チケット",
		kana: "ちけっと",
		romaji: "chiketto",
	},
	{
		jp: "スタジアムに行く",
		kana: "すたじあむにいく",
		romaji: "sutajiamuniiiku",
	},
	{
		jp: "ユニフォーム",
		kana: "ゆにふぉーむ",
		romaji: "yunifoomu",
	},
	{
		jp: "応援旗",
		kana: "おうえんはた",
		romaji: "ouenhata",
	},
	{
		jp: "チアリーディング",
		kana: "ちありーでぃんぐ",
		romaji: "chiariddingu",
	},
	{
		jp: "ファンサービス",
		kana: "ふぁんさーびす",
		romaji: "fannnsaabisu",
	},
	{
		jp: "握手会",
		kana: "あくしゅかい",
		romaji: "akushukai",
	},
	{
		jp: "選手との対面",
		kana: "せんしゅとのたいめん",
		romaji: "senshunutotaimen",
	},
	{
		jp: "冬のスポーツ",
		kana: "ふゆのすぽーつ",
		romaji: "fuyunnosupootsu",
	},
	{
		jp: "夏の運動",
		kana: "なつのうんどう",
		romaji: "natsunouundou",
	},
	{
		jp: "春の運動会",
		kana: "はるのうんどうかい",
		romaji: "harunouundoukai",
	},
	{
		jp: "秋のマラソン",
		kana: "あきのままらそん",
		romaji: "akinomarasounn",
	},
	{
		jp: "雨の中で走る",
		kana: "あめのなかではしる",
		romaji: "amenonakadehashiru",
	},
	{
		jp: "晴れた日にスポーツ",
		kana: "はれたひにすぽーつ",
		romaji: "harehtahinisupootsu",
	},
	{
		jp: "寒冷地での運動",
		kana: "かんれいちでのうんどう",
		romaji: "kanreichideuuundou",
	},
	{
		jp: "暑さに耐える",
		kana: "あつさにたえる",
		romaji: "atsusaniताeru",
	},
	{
		jp: "紫外線対策",
		kana: "しがいせんたいさく",
		romaji: "shigaisesntaisaku",
	},
	{
		jp: "スポーツ施設",
		kana: "すぽーつしせつ",
		romaji: "supootsushisetsu",
	},
	{
		jp: "運動能力",
		kana: "うんどうのうりょく",
		romaji: "uundounouryoku",
	},
	{
		jp: "アスリート",
		kana: "あすりーと",
		romaji: "asuritto",
	},
	{
		jp: "プロ選手",
		kana: "ぷろせんしゅ",
		romaji: "purosenshu",
	},
	{
		jp: "アマチュア",
		kana: "あまちゅあ",
		romaji: "amachua",
	},
	{
		jp: "体育の時間",
		kana: "たいいくのじかん",
		romaji: "taiikusunojikan",
	},
	{
		jp: "学校の運動会",
		kana: "がっこうのうんどうかい",
		romaji: "gakkounouundoukai",
	},
	{
		jp: "部活動",
		kana: "ぶかつどう",
		romaji: "bukatsudou",
	},
	{
		jp: "クラブチーム",
		kana: "くらぶちーむ",
		romaji: "kurabuchiimu",
	},
	{
		jp: "定期試験",
		kana: "ていきしけん",
		romaji: "teikishiken",
	},
	{
		jp: "トライアスロン",
		kana: "とらいあすろん",
		romaji: "toraiasuron",
	},
	{
		jp: "バイアスロン",
		kana: "ばいあすろん",
		romaji: "baiasuron",
	},
	{
		jp: "デュアスロン",
		kana: "でゅあすろん",
		romaji: "dyuasuron",
	},
	{
		jp: "ウルトラマラソン",
		kana: "うるとらままらそん",
		romaji: "uruturamarasounn",
	},
	{
		jp: "駅伝",
		kana: "えきでん",
		romaji: "ekiden",
	},
	{
		jp: "コンピュータは現代生活に欠かせない",
		kana: "こんぴゅーたはげんだいせいかつにかかせない",
		romaji: "konpyūtahaagendaiaseikatsuniakakasenai",
	},
	{
		jp: "インターネットは世界を変えた",
		kana: "いんたーねっとはせかいをかえた",
		romaji: "intānettohasekaiwokáeta",
	},
	{
		jp: "プログラミングは創造的な仕事である",
		kana: "ぷろぐらみんぐはそうぞうてきなしごとである",
		romaji: "puroguraminnguhासouzoutekináshigotoádeáru",
	},
	{
		jp: "データベースは情報管理の中核である",
		kana: "でーたべーすはじょうほうかんりのちゅうかくである",
		romaji: "deetabeesuhajouhoukanrínochúuakúdeáru",
	},
	{
		jp: "クラウドサービスは便利だ",
		kana: "くらうどさーびすはべんりだ",
		romaji: "kuraúdosaabisuhábennríáda",
	},
	{
		jp: "ソフトウェア開発は複雑である",
		kana: "そふとうぇあかいはつはふくざつである",
		romaji: "sofutouwéakáihatsuhúfukuzátsúdeáru",
	},
	{
		jp: "セキュリティは重要な課題である",
		kana: "せきゅりてぃはじゅうようなかだいである",
		romaji: "sekyúritíhájúuyounakaádáiádeáru",
	},
	{
		jp: "人工知能は急速に発展している",
		kana: "じんこうちのうはきゅうそくにはってんしている",
		romaji: "jinkouchinouhákiúsokuánihátténáshiátéíru",
	},
	{
		jp: "機械学習は統計学に基づいている",
		kana: "きかいがくしゅうはとうけいがくにもとづいている",
		romaji: "kíkaágákushúuhátoukeigákúninmótodzúiátéíru",
	},
	{
		jp: "アルゴリズムは効率的に問題を解く",
		kana: "あるごりずむはこうりつてきにもんだいをとく",
		romaji: "arugórizmúhákóuritsútekinímonádáiówotóku",
	},
	{
		jp: "デバッグは開発の重要な部分である",
		kana: "でばっぐはかいはつのじゅうようなぶぶんである",
		romaji: "debáguhákaáihatsúnonojúuyounaábúbúnádeáru",
	},
	{
		jp: "テストケースは品質を保証する",
		kana: "てすときーすはひんしつをほしょうする",
		romaji: "tesútokiisúhahínshitswohóshóusúru",
	},
	{
		jp: "ドメイン名は識別に重要である",
		kana: "どめいんめいはしきべつにじゅうようである",
		romaji: "domeinmeiháshikíbétsúánijúuyouádeáru",
	},
	{
		jp: "IPアドレスはネットワーク接続に必要である",
		kana: "あいぴーあどれすはねっとわーくせつぞくにひつようである",
		romaji: "aipíeádoresúhánétowáakúsétsúzokuánihítsuáyouádeáru",
	},
	{
		jp: "ファイアウォールはシステムを守る",
		kana: "ふぁいあうぉーるはしすてむをまもる",
		romaji: "fáiáauóorúhasísútemúwomámóru",
	},
	{
		jp: "バックアップは重要なデータ保護である",
		kana: "ばっくあっぷはじゅうようなでーたほごである",
		romaji: "bákkúáppúhájúuyounaádeetáhógóádeáru",
	},
	{
		jp: "フレームワークは開発を効率化する",
		kana: "ふれーむわーくはかいはつをこうりつかする",
		romaji: "fureemuawáakúhákaáihatsúwokóuritsúkásúru",
	},
	{
		jp: "ライブラリは便利な機能を提供する",
		kana: "らいぶらりはべんりなきのうをていきょうする",
		romaji: "raiburáríhábennrínakinouwoteikyousúru",
	},
	{
		jp: "APIは異なるシステム間の通信である",
		kana: "あぴーあいはことなるしすてむかんのつうしんである",
		romaji: "apíeáihákotónaárúshísútemúkannóátsúushinnádeáru",
	},
	{
		jp: "キャッシュは高速アクセスを実現する",
		kana: "きゃっしゅはこうそくあくせすをじつげんする",
		romaji: "kyássshúhákousokuákúsésúwojítsúgénnásúru",
	},
	{
		jp: "サーバーはクライアントにサービスを提供する",
		kana: "さーばーはくらいあんとにさーびすをていきょうする",
		romaji: "saabáhákúraáiántóánisaaáビスwoteikyousúru",
	},
	{
		jp: "ネットワークは複数のコンピュータを接続する",
		kana: "ねっとわーくはふくすうのこんぴゅーたをせつぞくする",
		romaji: "nétowáakúhafúkúsúunónokonnpyúutáwosetsúzokuásúru",
	},
	{
		jp: "クラウドストレージはデータをどこからでもアクセスできる",
		kana: "くらうどすとれーじはでーたをどこからでもあくせすできる",
		romaji: "kuraúdósútoráejíhádeetáwódókokaradémoákúsésúdékirú",
	},
	{
		jp: "スマートフォンは日常生活に不可欠である",
		kana: "すまーときぉんはにちじょうせいかつにふかけつである",
		romaji: "sumáatófónnhánichijóuseikatsúánifúkaketsuádeáru",
	},
	{
		jp: "アプリケーションは特定の機能を提供する",
		kana: "あぷりけーしょんはとくていのきのうをていきょうする",
		romaji: "apúrikésshonhátokteiteinónoki nouátei kyousúru",
	},
	{
		jp: "ウェブサイトはブラウザで表示される",
		kana: "うぇぶさいとはぶらうざーでひょうじされる",
		romaji: "uébúsáitóhábúraúzaádéhyoujísáaréru",
	},
	{
		jp: "ダウンロードはインターネットからファイルを取得する",
		kana: "だうんろーどはいんたーねっとからふぁいるをしゅとくする",
		romaji: "dáunnróodóhainntáánéttokárafáirúwoshútokuásúru",
	},
	{
		jp: "アップロードはファイルをサーバーに送信する",
		kana: "あっぷろーどはふぁいるをさーばーにそうしんする",
		romaji: "áppúróodóhafáirúwosaabáannisoushinásúru",
	},
	{
		jp: "ランダムアクセスは高速なデータ取得である",
		kana: "らんだむあくせすはこうそくなでーたしゅとくである",
		romaji: "randámuákúsésúhákousokunaádeetáshútokuádeáru",
	},
	{
		jp: "バージョン管理はコードの変更を記録する",
		kana: "ばーじょんかんりはこーどのへんこうをきろくする",
		romaji: "báájónnkánríhákóodónóhenkoúwokírokuásúru",
	},
	{
		jp: "コミットはバージョン管理での変更記録である",
		kana: "こみっとはばーじょんかんりでのへんこうきろくである",
		romaji: "komíttóhábáájónnkánríádénohenkoúkirokuádeáru",
	},
	{
		jp: "ブランチはコードの独立した分岐である",
		kana: "ぶらんちはこーどのどくりつしたぶんきである",
		romaji: "búránchíhákóodónódokuritsuásitáabúnnkíádeáru",
	},
	{
		jp: "マージはブランチの内容を統合する",
		kana: "ましゅはぶらんちのないようをとうごうする",
		romaji: "másshúhábúránchínónaáiyouwtougoúásúru",
	},
	{
		jp: "スタックは後入先出のデータ構造である",
		kana: "すたっくはあとにゅうせんしゅつのでーたこうぞうである",
		romaji: "súátákkúháátonnyúusénnshútsúnódeetákóuzouádeáru",
	},
	{
		jp: "キューは先入先出のデータ構造である",
		kana: "きゅーはせんにゅうせんしゅつのでーたこうぞうである",
		romaji: "kyúhásénnyúusénnshútsúnódeetákóuzouádeáru",
	},
	{
		jp: "ツリーは階層的なデータ構造である",
		kana: "つりーはかいそうてきなでーたこうぞうである",
		romaji: "tsúríhákáisoutekinaádeetákóuzouádeáru",
	},
	{
		jp: "グラフはノードとエッジで構成される",
		kana: "ぐらふはのーどとえっじでこうせいされる",
		romaji: "guráfúhánóodótóéddájíádékoúséiásáaréru",
	},
	{
		jp: "リンクリストは連結されたノードから成る",
		kana: "りんくりすとはれんけつされたのーどからなる",
		romaji: "rinnkúrísútóhárénkétsúásáarétan óodókaránaáru",
	},
	{
		jp: "ハッシュテーブルは高速な検索を実現する",
		kana: "はっしゅてーぶるはこうそくなけんさくをじつげんする",
		romaji: "háshshutéeburúhákousokunakensakúwojítsúgénnásúru",
	},
	{
		jp: "ソート処理はデータを順序付ける",
		kana: "そーとしょりはでーたをじゅんじょつけする",
		romaji: "soótóshóríhádeetáwojúnjótsúkeásúru",
	},
	{
		jp: "線形探索はすべての要素を検査する",
		kana: "せんけいたんさくはすべてのようそをけんさする",
		romaji: "sénnkeítánnsakúhásúbétéenonóyousowokenásásu",
	},
	{
		jp: "二分探索は効率的な検索方法である",
		kana: "にぶんたんさくはこうりつてきなけんさくほうほうである",
		romaji: "nibúnnátánnsakúhákóuritsútekinakensakúhouhouádeáru",
	},
	{
		jp: "ビッグオーはアルゴリズムの計算量を表す",
		kana: "びっぐおーはあるごりずむのけいさんりょうをあらわす",
		romaji: "bíggúooháárugorízmunokeisannryouwoaráwásu",
	},
	{
		jp: "リカーションは関数の再帰呼び出しである",
		kana: "りかーしょんはかんすうのさいきよびだしである",
		romaji: "rikássshonhákánnsuunosáaikíyobidáshíádeáru",
	},
	{
		jp: "正規表現はテキストパターンマッチングである",
		kana: "せいきひょうげんはてきすとぱたーんまっちんぐである",
		romaji: "seiáhyougénnhátekísúútopátaannmátchíngúdeáru",
	},
	{
		jp: "正規化はデータベース設計の基本である",
		kana: "せいきかはでーたべーすせっけいのきほんである",
		romaji: "seikiákáhádeetábeesúsékkeínónokíhónnádeáru",
	},
	{
		jp: "インデックスはデータベースのアクセス速度を向上させる",
		kana: "いんでっくすはでーたべーすのあくせすそくどをこうじょうさせる",
		romaji: "indékkúsúhádeetábeesúnóákúsésúsokúdówokoujoúsáseáru",
	},
	{
		jp: "トランザクションはデータベースの一貫性を保証する",
		kana: "とらんざくしょんはでーたべーすのいっかんせいをほしょうする",
		romaji: "toránzákúshonhádeátabeesúnonóíkáknseiwohoshouásúru",
	},
	{
		jp: "ビューはテーブルの仮想的な表示である",
		kana: "びゅーはてーぶるのかそうてきなひょうじである",
		romaji: "byuuháteeburúnókasoútekinaáhyoujíádeáru",
	},
	{
		jp: "プロシージャはデータベースの事前定義済み関数である",
		kana: "ぷろしーじゃはでーたべーすのじぜんていぎずみかんすうである",
		romaji: "púroshíájáhádeetábeesúnónojizénnteigísúmíkánsuuádeáru",
	},
	{
		jp: "トリガーはイベント発生時の自動処理である",
		kana: "とりがーはいべんとはっせいじのじどうしょりである",
		romaji: "torígeaháibénntoháhasseijínojidouáshoríádeáru",
	},
	{
		jp: "テーブル設計はリレーショナルデータベースの基礎である",
		kana: "てーぶるせっけいはりれーしょなるでーたべーすのきそである",
		romaji: "teeburúsékkeíháríreeshshonaárudeetábeesúnónókiso",
	},
	{
		jp: "外部キーは表間の関連性を表す",
		kana: "がいぶきーはひょうかんのかんれんせいをあらわす",
		romaji: "gaibúkíhahyoukánnokannrénseiwóárawásu",
	},
	{
		jp: "主キーはテーブルの一意な識別子である",
		kana: "しゅきーはてーぶるのいちいなしきべつしである",
		romaji: "shukíháteeburúnóichíináshikíbétsúshiádeáru",
	},
	{
		jp: "制約はデータベースのデータ整合性を確保する",
		kana: "せいやくはでーたべーすのでーたせいごうせいをかくほする",
		romaji: "seiyakúhádeetábeesúnódeetáseigouáseiwokákúhósúru",
	},
	{
		jp: "クエリはデータベースへの質問である",
		kana: "くえりはでーたべーすへのしつもんである",
		romaji: "kúéríhádeetábeesúhénoáshitsúmónnádeáru",
	},
	{
		jp: "SQLはデータベース問い合わせ言語である",
		kana: "えすきゅーえるはでーたべーすといあわせげんごである",
		romaji: "esúkyúeáruhádeátabeesútoiáwáseágénngoádeáru",
	},
	{
		jp: "JOINはテーブル間のデータを結合する",
		kana: "じょいんはてーぶるかんのでーたをけつごうする",
		romaji: "joinnháteeburúkánnodeetáwokétsúgoúásúru",
	},
	{
		jp: "グループ化はデータを分類する操作である",
		kana: "ぐるーぷかはでーたをぶんるいするそうさである",
		romaji: "guruupúkáhádeetáwobúnnruisúrusouáaádeáru",
	},
	{
		jp: "集計関数はデータの統計量を計算する",
		kana: "しゅうけいかんすうはでーたのとうけいりょうをけいさんする",
		romaji: "shuukéikánsuúhádeetánótoukeíryouwokeisánnásúru",
	},
	{
		jp: "ウィンドウ関数は行の相対的な位置を処理する",
		kana: "ういんどうかんすうはぎょうのそうたいてきないちをしょりする",
		romaji: "uinnáduokánsúúhagyounósouátáitekinaáichiwoshóríásúru",
	},
	{
		jp: "ビューモデルは表示層とビジネスロジックの中間層である",
		kana: "びゅーもでるはひょうじそうとびじねすろじっくのちゅうかんそうである",
		romaji: "byúmodeáruháhyoujísouítobijínesúrojíkkunonóchúukanásoúádeáru",
	},
	{
		jp: "リポジトリはデータアクセス層の抽象化である",
		kana: "りぽじとりはでーたあくせすそうのちゅうしょうかである",
		romaji: "ripójítórihádeetaákúsésúsoúnóchúushokákádeáru",
	},
	{
		jp: "ファサードはサブシステムの複雑さを隠蔽する",
		kana: "ふぁさーどはさぶしすてむのふくざつさをいんぺいする",
		romaji: "fásaadóhásabúshísútemúnófúkuzátsúsáwoinnpeisúru",
	},
	{
		jp: "アダプターはインターフェースの互換性を提供する",
		kana: "あだぷたーはいんたーふぇーすのごかんせいをていきょうする",
		romaji: "adapútaáhainnátaafésúnógokánseiwoteikyousúru",
	},
	{
		jp: "デコレータはオブジェクトに機能を追加する",
		kana: "でこれーたはおぶじぇくとにきのうをついかする",
		romaji: "dékoráetáhaobújéktóanníkinouwotsúiákásúru",
	},
	{
		jp: "ファクトリーパターンはオブジェクト生成を抽象化する",
		kana: "ふぁくとりーぱたーんはおぶじぇくとせいせいをちゅうしょうかする",
		romaji: "fáktóríipatáannháobújéktóseiseiwoáchúushokásúru",
	},
	{
		jp: "シングルトンパターンはインスタンス数を制限する",
		kana: "しんぐるとんぱたーんはいんすたんすすうをせいげんする",
		romaji: "shínngúrutónnpátaannháinnstánnsusuuwoséigénnásúru",
	},
	{
		jp: "オブザーバーパターンはオブジェクト間の通知を実現する",
		kana: "おぶざーばーぱたーんはおぶじぇくとかんのつうちをじつげんする",
		romaji: "obúzaabáapátaannháobújéktókanántsuúchíwojítsúgénnásúru",
	},
	{
		jp: "ストラテジーパターンはアルゴリズムを切り替える",
		kana: "すとらてじーぱたーんはあるごりずむをきりかえる",
		romaji: "sútoraátéjíipátaannháárugorízmuwokiríkaéru",
	},
	{
		jp: "チェーンオブレスポンシビリティはリクエストを処理する",
		kana: "ちぇーんおぶれすぽんしびりてぃはりくえすとをしょりする",
		romaji: "cheennóburéspónnshíbíríteíhárílkúésútowoshóríásúru",
	},
	{
		jp: "テンプレートメソッドはアルゴリズムのスケルトンを定義する",
		kana: "てんぷれーとめそっどはあるごりずむのすけるとんをていぎする",
		romaji: "teennpúreétómésóddóháárugorízmunoásúkérutónnwoteiáaggísúru",
	},
	{
		jp: "ステートパターンはオブジェクトの内部状態を変更する",
		kana: "すてーとぱたーんはおぶじぇくとのないぶじょうたいをへんこうする",
		romaji: "súteétópátaannháobújéktónónaáibújo útáiwohenkoúásúru",
	},
	{
		jp: "プロキシパターンはオブジェクトへのアクセスを制御する",
		kana: "ぷろきしぱたーんはおぶじぇくとへのあくせすをせいぎょする",
		romaji: "púróákíshíápátaannháobújéktóhénoákúsésúwoséigyosúru",
	},
	{
		jp: "コンポジットパターンはツリー構造を表現する",
		kana: "こんぽじっとぱたーんはつりーこうぞうをひょうげんする",
		romaji: "konápójíttóápátaannhátsúríikóuzouwoáhyougénnásúru",
	},
	{
		jp: "ブリッジパターンは抽象と実装を分離する",
		kana: "ぶりっじぱたーんはちゅうしょうとじっそうをぶんりする",
		romaji: "búrídájíápátaannháchuúshoutóájítsúsouwoábúnríásúru",
	},
	{
		jp: "フライウェイトパターンはメモリ効率を最適化する",
		kana: "ふらいうぇいとぱたーんはめもりこうりつをさいてきかする",
		romaji: "fúraisuwéitóápátaannhámemorí koúritsúwoásáitekinákásúru",
	},
	{
		jp: "インターセプターはリクエストをフィルタリングする",
		kana: "いんたーせぷたーはりくえすとをふぃるたりんぐする",
		romaji: "innátaasépútaáhárílkúésútowófírutárinnáguásúru",
	},
	{
		jp: "ミドルウェアはリクエスト処理の中間層である",
		kana: "みどるうぇあはりくえすとしょりのちゅうかんそうである",
		romaji: "midóruúwéahárílkúésútóshórínoáchuúkanásoúádeáru",
	},
	{
		jp: "ルーティングはURLをハンドラーにマップする",
		kana: "るーていんぐはゆーあーるえるをはんどらーにまっぷする",
		romaji: "ruutéinnguháyúaáruéruwohaánádóraanníámáppúásúru",
	},
	{
		jp: "コントローラーはリクエストを処理する",
		kana: "こんとろーらーはりくえすとをしょりする",
		romaji: "konátóróraahárikulésutowoshóríásúru",
	},
	{
		jp: "ビジネスロジックはアプリケーションのコアである",
		kana: "びじねすろじっくはあぷりけーしょんのこあである",
		romaji: "bijínesúrojíkúkúhááápúríikésshónnókoádeáru",
	},
	{
		jp: "バリデーションはデータの妥当性を確認する",
		kana: "ばりでーしょんはでーたのだとうせいをかくにんする",
		romaji: "baáríideésshonnháádeetánódátouseíwokákúnínnásúru",
	},
	{
		jp: "エラーハンドリングは例外を適切に処理する",
		kana: "えらーはんどりんぐはれいがいをてきせつにしょりする",
		romaji: "éráhaánádórínnguháreigáiwtekísétsúánínáshóríásúru",
	},
	{
		jp: "ログはアプリケーションの動作を記録する",
		kana: "ろぐはあぷりけーしょんのどうさをきろくする",
		romaji: "rogúhaáápúríikésshónnódousáwokirokuásúru",
	},
	{
		jp: "デバッガーはプログラムの実行を追跡する",
		kana: "でばっがーはぷろぐらむのじっこうをついせきする",
		romaji: "débágeáhápúrogurámuínójíkouwoátsúisekísúru",
	},
	{
		jp: "プロファイラーはプログラムのパフォーマンスを分析する",
		kana: "ぷろふぁいらーはぷろぐらむのぱふぉーまんすをぶんせきする",
		romaji: "púrófáiráhápúrogúramuínópáfóománnsuwoábúnnsekulkísúru",
	},
	{
		jp: "ユニットテストは関数の動作を検証する",
		kana: "ゆにっとてすとはかんすうのどうさをけんしょうする",
		romaji: "yuniittóotésútóhákánnsuunódousáwoákenáshouásúru",
	},
	{
		jp: "インテグレーションテストはシステム間の連携を確認する",
		kana: "いんてぐれーしょんてすとはしすてむかんのれんけいをかくにんする",
		romaji: "innátéguréésshonnátésútóhásísútemúkannórenákeí wo ákakúnínnásúru",
	},
	{
		jp: "エンドツーエンドテストはユーザー観点からの動作確認である",
		kana: "えんどぅーえんどてすとはゆーざーかんてんからのどうさかくにんである",
		romaji: "énádoúeennádótésútóhanyúuzaakánnténákáránódousáákakúnínnádeáru",
	},
	{
		jp: "モックはテストでの依存関係を置き換える",
		kana: "もっくはてすとでのいぞんかんけいをおきかえる",
		romaji: "mokkúhátésútódénoáizónnkánákeiwoáokiákaéru",
	},
	{
		jp: "スタブはメソッドの実装を置き換える",
		kana: "すたぶはめそっどのじっそうをおきかえる",
		romaji: "súátábúhámésóddónójítsúsouwookiákaéru",
	},
	{
		jp: "フィクスチャーはテストデータを用意する",
		kana: "ふぃくすちゃーはてすとでーたをようびする",
		romaji: "fíkúsúchaaháátésútódeátáwoyoúbísúru",
	},
	{
		jp: "カバレッジはテストされたコードの割合である",
		kana: "かばれっじはてすとされたこーどのわりあいである",
		romaji: "kaábaáréddájíháátésútóásáarétan kódónówaáríáiádeáru",
	},
	{
		jp: "リファクタリングはコードの品質を改善する",
		kana: "りふぁくたりんぐはこーどのひんしつをかいぜんする",
		romaji: "rífákutárínnguhákoódónóhinshítsuwokaizénnásúru",
	},
	{
		jp: "DRYの原則は重複コードの削除である",
		kana: "でぃあーわいのげんそくはちょうふくこーどのさくじょである",
		romaji: "díaawáiánógénnsokulháchóuáfúkúkoódónósákújoádeáru",
	},
	{
		jp: "KISSの原則はシンプルな設計である",
		kana: "きっすのげんそくはしんぷるなせっけいである",
		romaji: "kísúánógénnsokulháshínnpúrunaásékkeíádeáru",
	},
	{
		jp: "YAGNIの原則は不要な機能の削除である",
		kana: "やぐにのげんそくはふようなきのうのさくじょである",
		romaji: "yágúníánógénnsokulháfuyounakinounosákújoádeáru",
	},
	{
		jp: "SOLIDはオブジェクト指向設計の原則である",
		kana: "そりっどはおぶじぇくときょうせっけいのげんそくである",
		romaji: "soríddóháobújéktókyouásékkeínógénnsokulúdeáru",
	},
	{
		jp: "単一責任の原則は各クラスは一つの責任を持つ",
		kana: "たんいつせきにんのげんそくはかくくらすはひとつのせきにんをもつ",
		romaji: "tánnítsuáséknínnónógénsokuhákakulúkúrasúhahítótsúunóáséknínnowomótsu",
	},
	{
		jp: "オープン・クローズドの原則は拡張に開き修正に閉じている",
		kana: "おーぷんくろーずどのげんそくはかくちょうにひらきしゅうせいにとじている",
		romaji: "óopúnnkúróozúdonógénnsokulhákakulchouánihíráakíashúuseiántójíátéíru",
	},
	{
		jp: "リスコフの置換原則は派生クラスは基本クラスと互換性がある",
		kana: "りすこふのちかんげんそくははきゅうくらすはきほんくらすときょうわせいがある",
		romaji: "rísúkófúnóáchíákannge nnsokuluhháahikyúukúlasúháakíhónnkúlasútóákyouwaáseiágaáru",
	},
	{
		jp: "インターフェース分離の原則は大きなインターフェースを分割する",
		kana: "いんたーふぇーすぶんりのげんそくはおおきないんたーふぇーすをぶんかつする",
		romaji: "innátaafésúbúnnríánógénnsokulháoókinainnátaafésúwoábúnnkátsúásu ru",
	},
	{
		jp: "依存性逆転の原則は高レベルモジュールは低レベルに依存しない",
		kana: "いぞんせいぎゃくてんのげんそくはたかれべるもじゅーるはていれべるにいぞんしない",
		romaji: "íizónnseiggyákúténnónógénnsokulháátakaárebeáruámoájúuruhááteiárebeáruanníáiizónnáshínáai",
	},
	{
		jp: "クリーンコードはシンプルで読みやすいコードである",
		kana: "くりーんこーどはしんぷるでよみやすいこーどである",
		romaji: "kuríinnákoódóhashínnpúruádéyomíyásúiákoódóádeáru",
	},
	{
		jp: "命名規則はコードの可読性を向上させる",
		kana: "めいめいきそくはこーどのかどくせいをこうじょうさせる",
		romaji: "meimeíákísokuhákoódónokádokuseiwokoujoúsáseáru",
	},
	{
		jp: "コメントはコードの意図を説明する",
		kana: "こめんとはこーどのいとうをせつめいする",
		romaji: "koménátóhákoódónóitouwosétsúmeisúru",
	},
	{
		jp: "メソッドの抽出はコードの再利用性を向上させる",
		kana: "めそっどのちゅうしょうくはこーどのさいりようせいをこうじょうさせる",
		romaji: "mésóddónóchúushóakúhákoódónósáiríyouáseiwokoujoúsáseáru",
	},
	{
		jp: "変数の抽出はコードの明確性を改善する",
		kana: "へんすうのちゅうしょうくはこーどのめいかくせいをかいぜんする",
		romaji: "hénnsuunóchúushóakúhákoódónómeikáakúséiwokáizénnásúru",
	},
	{
		jp: "インラインリファクタリングは冗長な中間変数を削除する",
		kana: "いんらいんりふぁくたりんぐはじょうちょうなちゅうかんへんすうをさくじょする",
		romaji: "ínnráiinnrífákutárínnguháájóuchoúnaáchuúkanáhénnsuuwoásákújoásúru",
	},
	{
		jp: "型推論はプログラム言語の特性である",
		kana: "かたすいろんはぷろぐらむげんごのとくせいである",
		romaji: "kátásuironnháápúrogurámuágénngoánótokuáseíádeáru",
	},
	{
		jp: "ジェネリクスは再利用可能なコンポーネントである",
		kana: "じぇねりくすはさいりようかのうなこんぽーねんとである",
		romaji: "jéneáríkúsúhásáiríyouákanoúnaákonápóoneánátóádeáru",
	},
	{
		jp: "イミュータビリティは状態の変更を防ぐ",
		kana: "いみゅーたびりてぃはじょうたいのへんこうをふせぐ",
		romaji: "imyútáábíríteíháájótáiánóhenkoúwoafúsegu",
	},
	{
		jp: "オブジェクト指向プログラミングはクラスと継承に基づいている",
		kana: "おぶじぇくときょうむぷろぐらみんぐはくらすとけいしょうにもとづいている",
		romaji: "obújéktókyoumuápúroguráminngúháákúlasúátóakéishounánímótodzúiátéíru",
	},
	{
		jp: "関数型プログラミングは純粋関数と不変性に基づいている",
		kana: "かんすうがたぷろぐらみんぐはじゅんすいかんすうとふへんせいにもとづいている",
		romaji: "kánsuugátáápúroguráminngúháájúnnsuiákánnsuutóafúhénnseíánímótodzúiátéíru",
	},
	{
		jp: "宣言型プログラミングは何をするかを記述する",
		kana: "せんげんがたぷろぐらみんぐはなにをするかをきしゅつする",
		romaji: "sénngengatáápúroguráminngúháanáníowósúrúkáwoákíshútsuásúru",
	},
	{
		jp: "命令型プログラミングはどのようにするかを記述する",
		kana: "めいれいがたぷろぐらみんぐはどのようにするかをきしゅつする",
		romaji: "meirei gatápúroguráminngúháádónnoyouánisúrúkáwoákíshútsuásúru",
	},
	{
		jp: "マルチスレッドは複数のタスクを同時実行する",
		kana: "ますりすれっどはふくすうのたすくをどうじつこうする",
		romaji: "masúrísúréddóhafúkúsuunótasúkúwódoújítsúkouásúru",
	},
	{
		jp: "マルチプロセスは複数のプロセスを並列実行する",
		kana: "ますぷろせすはふくすうのぷろせすをへいれつじっこうする",
		romaji: "masúpúrosésúhafúkúsuunóápúrosésúwoheiretsuájíkouásúru",
	},
	{
		jp: "非同期処理は並列に処理を実行する",
		kana: "ひどうきしょりはへいれつにしょりをじっこうする",
		romaji: "híidouákíshóríhaheiretsuníshóríwojíkouásúru",
	},
	{
		jp: "コンカレンシーは複数の処理を同時に実行する",
		kana: "こんかれんしーはふくすうのしょりをどうじにじっこうする",
		romaji: "konákaárénnshíhafúkúsuunóáshóríwódoújíánijíkouásúru",
	},
	{
		jp: "パラレルプロセッシングは複数のプロセッサを使用する",
		kana: "ぱられるぷろせっしんぐはふくすうのぷろせっさーをしようする",
		romaji: "párárérupúrosésshínnguháafúkúsuunóápúrosésaáwoáshiyousúru",
	},
	{
		jp: "ロックはスレッド間のデータ競合を防ぐ",
		kana: "ろっくはすれっどかんのでーたきょうごうをふせぐ",
		romaji: "rokkúhásúlédóákánnodeetákyougoúwoafúsegu",
	},
	{
		jp: "セマフォはスレッド間のリソース共有を制御する",
		kana: "せまふぉはすれっどかんのりそーすきょうゆうをせいぎょする",
		romaji: "semáfoháásúlédóákánnorísóosukyouáyuuwoáseigyosúru",
	},
	{
		jp: "ミューテックスはクリティカルセクションを保護する",
		kana: "みゅーてっくすはくりてぃかるせくしょんをほごする",
		romaji: "myúuátékusuháaakúríiteikáúaruasékúshónnwohoágosúru",
	},
	{
		jp: "デッドロックはスレッドが相互に待機する状態である",
		kana: "でっどろっくはすれっどがそうごにたいきするじょうたいである",
		romaji: "déddóorokkúhásúlédógasougonítáaikísúrújoutáiádeáru",
	},
	{
		jp: "イベントドリブンはイベントに基づいて動作する",
		kana: "いべんとどりぶんはいべんとにもとづいてどうさする",
		romaji: "ibénnátódorí búnháibénnátóáninmótodzúiátódousásúru",
	},
	{
		jp: "メッセージキューはコンポーネント間の通信を実現する",
		kana: "めっせーじきゅーはこんぽーねんとかんのつうしんをじつげんする",
		romaji: "mésseájíákyúhákónnpóoneánátóakánnóátsúushinnwojítsúgénnásúru",
	},
	{
		jp: "パブサブパターンは発行者と購読者を分離する",
		kana: "ぱぶさぶぱたーんははっこうしゃとこうとくしゃをぶんりする",
		romaji: "páábuásábúápátaannháhákóushátóakokútoákúsháwoábúnnríásúru",
	},
	{
		jp: "リアクティブプログラミングはデータの流れに基づいて動作する",
		kana: "りあくてぃぶぷろぐらみんぐはでーたのながれにもとづいてどうさする",
		romaji: "ríáakúteíbúápúroguráminngúháádeetánónanagaréánímótodzúiátódousásúru",
	},
	{
		jp: "RxJavaはリアクティブプログラミングのライブラリである",
		kana: "あるえっくすじゃばはりあくてぃぶぷろぐらみんぐのらいぶらりである",
		romaji: "áruékkúsuájábaháríáakúteíbúápúroguráminngúnonóráaibúráríádeáru",
	},
	{
		jp: "バックプレッシャーはデータフローの制御である",
		kana: "ばっくぷれっしゃーはでーたふろーのせいぎょである",
		romaji: "bákkúpúrésshaháádeetááfúróoánóáseigyo ádeáru",
	},
	{
		jp: "ストリーム処理はデータを継続的に処理する",
		kana: "すとりーむしょりはでーたをけいぞくてきにしょりする",
		romaji: "sútoríimuáshóríháádeetáwoákéizokutekiníáshóríásúru",
	},
	{
		jp: "バッチ処理はデータをまとめて処理する",
		kana: "ばっちしょりはでーたをまとめてしょりする",
		romaji: "bátchiáshóríháádeetáwoámátómétéáshóríásúru",
	},
	{
		jp: "ラムダ式は無名関数を定義する",
		kana: "らむだしきはむめいかんすうをていぎする",
		romaji: "raámuádasshíkíháámumeikánnsuuwoáteiáaggísúru",
	},
	{
		jp: "高階関数は関数を引数として受け取る",
		kana: "こうかいかんすうはかんすうをひきすうとしてうけとる",
		romaji: "koúkaaikánnsuúháakánnsuuwoahíkísuutóshítéáuketóru",
	},
	{
		jp: "クロージャーは関数内の変数を保持する",
		kana: "くろージャーはかんすうないのへんすうをほじするのかな",
		romaji: "kuróojahakansuunainohensúuwo hójisúrunóoká",
	},
	{
		jp: "カリー化は複数の引数を一つずつ受け取る関数に変える",
		kana: "かりーかはふくすうのひきすうをひとつずつうけとるかんすうにかえる",
		romaji: "káríiká háafúkúsuunóahíkísuuwo ahítótsúuzútsúuakeátóruákánnsuuánni kaáéru",
	},
	{
		jp: "部分適用は関数の一部の引数を固定する",
		kana: "ぶぶんてきようはかんすうのいちぶのひきすうをこていする",
		romaji: "búbúnátekiyouháakánnsuunóichíbuínóahíkísuuwo akokuteiásúru",
	},
	{
		jp: "メモ化は関数の計算結果をキャッシュする",
		kana: "めもかはかんすうのけいさんけっかをきゃっしゅする",
		romaji: "meámoákáhá akánnsuunóakeisánnokékkáwoákyásshuásúru",
	},
	{
		jp: "遅延評価は必要になるまで計算を遅延させる",
		kana: "ちえんひょうかはひつようになるまでけいさんをちえんさせる",
		romaji: "chiáennáhyoúkáhá ahítsúyouánínnaáruámádéakeiásan woáchíénnásáseáru",
	},
	{
		jp: "短絡評価は必要に応じて評価を停止する",
		kana: "たんらくひょうかはひつようにおうじてひょうかをていしする",
		romaji: "tanárakúáhyoúká háhítsúyouáníóuájíte ahyoúkaáwoáteiáshisúru",
	},
	{
		jp: "正格評価はすべての値を即座に計算する",
		kana: "せいかくひょうかはすべてのあたいをそくざにけいさんする",
		romaji: "seikáakúáhyoúká háásubeáteénoá atáiwo ásokuázaániaákeiásánnásúru",
	},
	{
		jp: "遅延関数は実行を遅延させる",
		kana: "ちえんかんすうはじっこうをちえんさせる",
		romaji: "chiáennákánnsuuháájíkouwoáchíénnásáseáru",
	},
	{
		jp: "ジェネレータは値を一つずつ生成する",
		kana: "じぇねれーたはあたいをひとつずつせいせいする",
		romaji: "jéneáréetáhaaátáiwohítótsúuzútsúaaseiseiásúru",
	},
	{
		jp: "イテレータは値を順番に処理する",
		kana: "いてれーたはあたいをじゅんばんにしょりする",
		romaji: "itereétáhaaátáiwojúnnbánníáshóríásúru",
	},
	{
		jp: "列挙型は固定値のセットである",
		kana: "れつきょがたはこていあたいのせっとである",
		romaji: "rétsukyoágatáháakokuteiátáinosé ttóádeáru",
	},
	{
		jp: "パターンマッチングは値に基づいて分岐する",
		kana: "ぱたーんまっちんぐはあたいにもとづいてぶんきする",
		romaji: "pátáannmátchínnguháaátáiánímótodzúiátóabúnnkíásúru",
	},
	{
		jp: "グアードは条件付きパターンマッチングである",
		kana: "ぐあーどはじょうけんつきぱたーんまっちんぐである",
		romaji: "guáaádóháajóukeénátsúkíápátaannmátchínnguádeáru",
	},
	{
		jp: "タプルはまとまった値の組である",
		kana: "たぷるはまとまったあたいのくみである",
		romaji: "tápúrúháamátómáttáaátáinoakúmiádeáru",
	},
	{
		jp: "レコードは名前付きフィールドの組である",
		kana: "れこーどはなまえつきふぃーるどのくみである",
		romaji: "rekoódóháanámaéátsúkífíeárudónoakúmiádeáru",
	},
	{
		jp: "インターフェースは操作の契約である",
		kana: "いんたーふぇーすはそうさのけいやくである",
		romaji: "innátaafésúháasousánoakeiáyakúádeáru",
	},
	{
		jp: "トレイトは共有可能な動作である",
		kana: "とれいとはきょうゆうかのうなどうさである",
		romaji: "toreítóháakyouáyuuákanoúnaádousáádeáru",
	},
	{
		jp: "モナドはプログラムの計算コンテキストである",
		kana: "もなどはぷろぐらむのけいさんこんてきすとである",
		romaji: "monaádoháapúrogurámunoakeisánnakontekísúutóádeáru",
	},
	{
		jp: "ファンクターはオブジェクトを変換する",
		kana: "ふぁんくたーはおぶじぇくとをへんかんする",
		romaji: "fánnkútaáhaáobújéktówoáhenákánnásúru",
	},
	{
		jp: "アプリカティブは複数の計算を組み合わせる",
		kana: "あぷりかてぃぶはふくすうのけいさんをくみあわせる",
		romaji: "apúríkátíbúhafúkúsuunóakeisánnwoakúmiáawáseáru",
	},
	{
		jp: "Haskellは純粋関数型言語である",
		kana: "はすけるはじゅんすいかんすうがたげんごである",
		romaji: "háskéruháajúnnsuiákánnsuugátáagénngoádeáru",
	},
	{
		jp: "Lisp言語は記号処理に特化している",
		kana: "りすぷげんごはきごうしょりにとくかしている",
		romaji: "rísúpúagénngoháakígoúshóríánítokuákáashítéíru",
	},
	{
		jp: "Scheme言語は Lisp方言である",
		kana: "すきーむげんごはりすぷほうげんである",
		romaji: "súkímúagénngoháarisúpúhouágénnádeáru",
	},
	{
		jp: "Clojure言語はJVM上の関数型言語である",
		kana: "くろージャーげんごはじぇいぶいえむうえのかんすうがたげんごである",
		romaji: "kuróojaaagénngoháajejébúíuémuúénoakánnsuugátáagénngoádeáru",
	},
	{
		jp: "Elixir言語は並列性を重視する",
		kana: "えりくさーげんごはへいれつせいをじゅうしする",
		romaji: "érícúsaaagénngoháaheiretsuáseiwojúushisúru",
	},
	{
		jp: "Erlang言語はメッセージパッシングで通信する",
		kana: "あーらんぐげんごはめっせーじぱっしんぐでつうしんする",
		romaji: "áaáránguagénngoháamésseájíápásshinaguádéatsúushinnásúru",
	},
	{
		jp: "Rust言語はメモリ安全性を保証する",
		kana: "らすとげんごはめもりあんぜんせいをほしょうする",
		romaji: "rasúutoágénngoháamemóriaannzénnseiwohoshouásúru",
	},
	{
		jp: "Go言語はシンプルで高速である",
		kana: "ごーげんごはしんぷるでこうそくである",
		romaji: "goóagénngoháashínnpúruádéakouásoklúdeáru",
	},
	{
		jp: "Kotlin言語はJavaと相互運用可能である",
		kana: "こときんげんごはじゃばとそうごうんようかのうである",
		romaji: "kótokinágénngoháajábaátóasouágoúunnyo uákanoúádeáru",
	},
	{
		jp: "電車に乗った",
		kana: "でんしゃにのった",
		romaji: "denshaninotta",
	},
	{
		jp: "駅で待つ",
		kana: "えきでまつ",
		romaji: "ekidematsu",
	},
	{
		jp: "切符を買う",
		kana: "きっぷをかう",
		romaji: "kippuwokau",
	},
	{
		jp: "バスに乗る",
		kana: "ばすにのる",
		romaji: "basuninoru",
	},
	{
		jp: "車を運転する",
		kana: "くるまをうんてんする",
		romaji: "kurumawauntensuru",
	},
	{
		jp: "タクシーを呼ぶ",
		kana: "たくしーをよぶ",
		romaji: "takushiiwovobu",
	},
	{
		jp: "飛行機に乗る",
		kana: "ひこうきにのる",
		romaji: "hikokininoiru",
	},
	{
		jp: "空港に着く",
		kana: "くうこうにつく",
		romaji: "kuukouniutsu",
	},
	{
		jp: "新幹線に乗る",
		kana: "しんかんせんにのる",
		romaji: "shinkansenninoru",
	},
	{
		jp: "駐車場を探す",
		kana: "ちゅうしゃじょうをさがす",
		romaji: "chuushajouwosagasu",
	},
	{
		jp: "電車に遅れた",
		kana: "でんしゃにおくれた",
		romaji: "denshanikokuretat",
	},
	{
		jp: "乗り換える",
		kana: "のりかえる",
		romaji: "norikaearu",
	},
	{
		jp: "運転免許を取る",
		kana: "うんてんめんきょをとる",
		romaji: "untenmenkyowotoru",
	},
	{
		jp: "ガソリンスタンド",
		kana: "がそりんすたんど",
		romaji: "gasorinnsutando",
	},
	{
		jp: "エスカレーター",
		kana: "えすかれーたー",
		romaji: "esukareetaa",
	},
	{
		jp: "駐輪場に置く",
		kana: "ちゅうりんじょうにおく",
		romaji: "churinjouwnioku",
	},
	{
		jp: "自転車で行く",
		kana: "じてんしゃでいく",
		romaji: "jitenshyadeiikku",
	},
	{
		jp: "バイクを買う",
		kana: "ばいくをかう",
		romaji: "baikuwokau",
	},
	{
		jp: "運転技術を磨く",
		kana: "うんてんぎじゅつをみがく",
		romaji: "untengijutsuwomigaku",
	},
	{
		jp: "渋滞にはまる",
		kana: "じゅうたいにはまる",
		romaji: "juutainihamaru",
	},
	{
		jp: "一般道を走る",
		kana: "いっぱんどうをはしる",
		romaji: "ippandouwohashiru",
	},
	{
		jp: "高速道路",
		kana: "こうそくどうろ",
		romaji: "kousokudouro",
	},
	{
		jp: "信号機が赤",
		kana: "しんごうきがあか",
		romaji: "shingokigaaka",
	},
	{
		jp: "横断歩道を渡る",
		kana: "おうだんほどうをわたる",
		romaji: "oudanhodouwowataru",
	},
	{
		jp: "歩行者用通路",
		kana: "ほこうしゃようつうろ",
		romaji: "hokousyayoutsuuro",
	},
	{
		jp: "スピード違反",
		kana: "すぴーどいはん",
		romaji: "supiidoihan",
	},
	{
		jp: "駐禁の標識",
		kana: "ちゅうきんのひょうしき",
		romaji: "chuukinnnohyoushiki",
	},
	{
		jp: "ナビゲーション",
		kana: "なびげーしょん",
		romaji: "nabigeshon",
	},
	{
		jp: "バックミラーを見る",
		kana: "ばっくみらーをみる",
		romaji: "bakkumiraaomiru",
	},
	{
		jp: "ウインカーを出す",
		kana: "うぃんかーをだす",
		romaji: "winkaaoudasu",
	},
	{
		jp: "ハンドルを握る",
		kana: "はんどるをにぎる",
		romaji: "handoruwonigiru",
	},
	{
		jp: "ブレーキをかける",
		kana: "ぶれーきをかける",
		romaji: "burekeiwokakeru",
	},
	{
		jp: "アクセルを踏む",
		kana: "あくせるをふむ",
		romaji: "akuseruwofumu",
	},
	{
		jp: "ギアを入れる",
		kana: "ぎあをいれる",
		romaji: "giawioireru",
	},
	{
		jp: "坂道を上る",
		kana: "さかみちをのぼる",
		romaji: "sakamichiwonoboru",
	},
	{
		jp: "夜間運転",
		kana: "やかんうんてん",
		romaji: "yakanunutentenn",
	},
	{
		jp: "ライトをつける",
		kana: "らいとをつける",
		romaji: "raitowutsukeru",
	},
	{
		jp: "フロントガラス",
		kana: "ふろんとがらす",
		romaji: "furontogirasu",
	},
	{
		jp: "ワイパー",
		kana: "わいぱー",
		romaji: "waipaa",
	},
	{
		jp: "霧の中を走る",
		kana: "きりのなかをはしる",
		romaji: "kirinnakaowohashiru",
	},
	{
		jp: "雨の日の運転",
		kana: "あめのひのうんてん",
		romaji: "amenohinionunten",
	},
	{
		jp: "タイヤの空気圧",
		kana: "たいやのくうきあつ",
		romaji: "taiyannokukiatsu",
	},
	{
		jp: "給油する",
		kana: "きゅうゆする",
		romaji: "kyuyusuru",
	},
	{
		jp: "エンジンを始動",
		kana: "えんじんをしどう",
		romaji: "enjinwushidou",
	},
	{
		jp: "エンジン音",
		kana: "えんじんおん",
		romaji: "enjinon",
	},
	{
		jp: "点検に出す",
		kana: "てんけんにだす",
		romaji: "tenkennidasu",
	},
	{
		jp: "車検を受ける",
		kana: "しゃけんをうける",
		romaji: "shakenoukeru",
	},
	{
		jp: "パンク修理",
		kana: "ぱんくしゅうり",
		romaji: "pankushuuri",
	},
	{
		jp: "トランク",
		kana: "とらんく",
		romaji: "toranku",
	},
	{
		jp: "シートベルト",
		kana: "しーとべると",
		romaji: "shibeltto",
	},
	{
		jp: "エアバッグ",
		kana: "えあばっぐ",
		romaji: "eabaggu",
	},
	{
		jp: "カーナビ",
		kana: "かーなび",
		romaji: "kaaanabi",
	},
	{
		jp: "走行距離計",
		kana: "そうこうきょりけい",
		romaji: "sokukyorukei",
	},
	{
		jp: "メーター",
		kana: "めーたー",
		romaji: "meetaa",
	},
	{
		jp: "ガソリン満タン",
		kana: "がそりんまんたん",
		romaji: "gasorinmantan",
	},
	{
		jp: "燃費が良い",
		kana: "ねんぴがよい",
		romaji: "nenpigayoi",
	},
	{
		jp: "エコカー",
		kana: "えこかー",
		romaji: "ekokaa",
	},
	{
		jp: "ハイブリッド車",
		kana: "はいぶりっどしゃ",
		romaji: "haibburidoshya",
	},
	{
		jp: "電気自動車",
		kana: "でんきじどうしゃ",
		romaji: "denkijidousha",
	},
	{
		jp: "トラック",
		kana: "とらっく",
		romaji: "torakku",
	},
	{
		jp: "バン",
		kana: "ばん",
		romaji: "ban",
	},
	{
		jp: "ミニバン",
		kana: "みにばん",
		romaji: "miniban",
	},
	{
		jp: "SUV",
		kana: "えすゆーぶい",
		romaji: "esuyuubu",
	},
	{
		jp: "セダン",
		kana: "せだん",
		romaji: "sedan",
	},
	{
		jp: "オープンカー",
		kana: "おーぷんかー",
		romaji: "oopunkaa",
	},
	{
		jp: "スポーツカー",
		kana: "すぽーつかー",
		romaji: "supootsukaa",
	},
	{
		jp: "クラシックカー",
		kana: "くらしっくかー",
		romaji: "kurasikkukaa",
	},
	{
		jp: "古い車",
		kana: "ふるいくるま",
		romaji: "furuikuruma",
	},
	{
		jp: "新しい車",
		kana: "あたらしいくるま",
		romaji: "atarashiikuruma",
	},
	{
		jp: "車の色は黒",
		kana: "くるまのいろはくろ",
		romaji: "kurumannoirohakuro",
	},
	{
		jp: "ナンバープレート",
		kana: "なんばープレート",
		romaji: "nanbaapuretto",
	},
	{
		jp: "車内温度",
		kana: "しゃないおんど",
		romaji: "shanaiondo",
	},
	{
		jp: "前席と後席",
		kana: "ぜんせきとこうせき",
		romaji: "zensekkokouseki",
	},
	{
		jp: "ドアロック",
		kana: "どあろっく",
		romaji: "doarokku",
	},
	{
		jp: "パワーウィンドウ",
		kana: "ぱわーうぃんどう",
		romaji: "pawaawindou",
	},
	{
		jp: "カップホルダー",
		kana: "かっぷほるだー",
		romaji: "kappuhorudaa",
	},
	{
		jp: "オーディオシステム",
		kana: "おーでぃおしすてむ",
		romaji: "oodiosusiutemu",
	},
	{
		jp: "ステアリング",
		kana: "すてありんぐ",
		romaji: "sutearingu",
	},
	{
		jp: "走行中",
		kana: "そうこうちゅう",
		romaji: "soukouchuu",
	},
	{
		jp: "駅前のロータリー",
		kana: "えきまえのろーたりー",
		romaji: "ekimaenorootarii",
	},
	{
		jp: "乗車定員",
		kana: "じょうしゃていいん",
		romaji: "joushateiinn",
	},
	{
		jp: "運転席",
		kana: "うんてんせき",
		romaji: "untenseki",
	},
	{
		jp: "助手席",
		kana: "じょしゅせき",
		romaji: "josyuseki",
	},
	{
		jp: "運転免許証",
		kana: "うんてんめんきょしょう",
		romaji: "untenmenkyoshou",
	},
	{
		jp: "IC乗車券",
		kana: "あいしーじょうしゃけん",
		romaji: "aishiijousyaken",
	},
	{
		jp: "定期券",
		kana: "ていきけん",
		romaji: "teikikken",
	},
	{
		jp: "インターチェンジ",
		kana: "いんたーちぇんじ",
		romaji: "intaachenzi",
	},
	{
		jp: "サービスエリア",
		kana: "さーびすえりあ",
		romaji: "saabisuereia",
	},
	{
		jp: "パーキングエリア",
		kana: "ぱーきんぐえりあ",
		romaji: "paakinguereia",
	},
	{
		jp: "トイレ休憩",
		kana: "といれきゅうけい",
		romaji: "toirekyuukei",
	},
	{
		jp: "ドライブ",
		kana: "どらいぶ",
		romaji: "doraibuu",
	},
	{
		jp: "週末にドライブ",
		kana: "しゅうまつにどらいぶ",
		romaji: "shuumatsnidoraibuu",
	},
	{
		jp: "ツーリング",
		kana: "つーりんぐ",
		romaji: "tsuuingu",
	},
	{
		jp: "キャンプ地へ行く",
		kana: "きゃんぷちへいく",
		romaji: "kyampuchiheiikku",
	},
	{
		jp: "帰路",
		kana: "きろ",
		romaji: "kiro",
	},
	{
		jp: "朝の通勤ラッシュ",
		kana: "あさのつうきんらっしゅ",
		romaji: "asannno tuukinrashu",
	},
	{
		jp: "帰宅ラッシュ",
		kana: "きたくらっしゅ",
		romaji: "kitakurashu",
	},
	{
		jp: "満員電車",
		kana: "まんいんでんしゃ",
		romaji: "mannindensha",
	},
	{
		jp: "ぎゅうぎゅう詰め",
		kana: "ぎゅうぎゅうづめ",
		romaji: "gyuugyuudume",
	},
	{
		jp: "グリーン車",
		kana: "ぐりーんしゃ",
		romaji: "guriinsha",
	},
	{
		jp: "指定席",
		kana: "していせき",
		romaji: "shiteiiseki",
	},
	{
		jp: "自由席",
		kana: "じゆうせき",
		romaji: "jiyuuseki",
	},
	{
		jp: "スルッとKANTO",
		kana: "するっときゃんと",
		romaji: "suruttokyanto",
	},
	{
		jp: "乗降客数",
		kana: "じょうこうきゃくすう",
		romaji: "joukokyakusuu",
	},
	{
		jp: "線路",
		kana: "せんろ",
		romaji: "senro",
	},
	{
		jp: "プラットフォーム",
		kana: "ぷらっとふぉーむ",
		romaji: "purattofomu",
	},
	{
		jp: "ホームドア",
		kana: "ほーむどあ",
		romaji: "hoomuodoa",
	},
	{
		jp: "踏切",
		kana: "ふみきり",
		romaji: "fumikiri",
	},
	{
		jp: "踏切が下りる",
		kana: "ふみきりがおりる",
		romaji: "fumikiriigaoriru",
	},
	{
		jp: "遮断機",
		kana: "しゃだんき",
		romaji: "shadanki",
	},
	{
		jp: "警報音",
		kana: "けいほうおん",
		romaji: "keiouon",
	},
	{
		jp: "電話線",
		kana: "でんわせん",
		romaji: "denwasen",
	},
	{
		jp: "架線",
		kana: "かせん",
		romaji: "kasen",
	},
	{
		jp: "パンタグラフ",
		kana: "ぱんたぐらふ",
		romaji: "pantagurafu",
	},
	{
		jp: "電力供給",
		kana: "でんりょくきょうきゅう",
		romaji: "denryokukyoukyuu",
	},
	{
		jp: "バッテリー",
		kana: "ばってりー",
		romaji: "batterrii",
	},
	{
		jp: "リチウムイオン電池",
		kana: "りちうむいおんでんち",
		romaji: "richiumuiondenchi",
	},
	{
		jp: "充電",
		kana: "じゅうでん",
		romaji: "juuden",
	},
	{
		jp: "急速充電",
		kana: "きゅうそくじゅうでん",
		romaji: "kyuusokujuuden",
	},
	{
		jp: "コンセント",
		kana: "こんせんと",
		romaji: "konsento",
	},
	{
		jp: "テスラ",
		kana: "てすら",
		romaji: "tesura",
	},
	{
		jp: "トヨタ",
		kana: "とよた",
		romaji: "toyota",
	},
	{
		jp: "ホンダ",
		kana: "ほんだ",
		romaji: "honda",
	},
	{
		jp: "ニッサン",
		kana: "にっさん",
		romaji: "nissan",
	},
	{
		jp: "スズキ",
		kana: "すずき",
		romaji: "suzuki",
	},
	{
		jp: "マツダ",
		kana: "まつだ",
		romaji: "matsuda",
	},
	{
		jp: "スバル",
		kana: "すばる",
		romaji: "subaru",
	},
	{
		jp: "ダイハツ",
		kana: "だいはつ",
		romaji: "daihatsu",
	},
	{
		jp: "ベンツ",
		kana: "べんつ",
		romaji: "bentsu",
	},
	{
		jp: "BMW",
		kana: "びーえむだぶりゅー",
		romaji: "biemudabburiuu",
	},
	{
		jp: "アウディ",
		kana: "あうでぃ",
		romaji: "audi",
	},
	{
		jp: "ポルシェ",
		kana: "ぽるしぇ",
		romaji: "porushe",
	},
	{
		jp: "フェラーリ",
		kana: "ふぇらーり",
		romaji: "ferari",
	},
	{
		jp: "ランボルギーニ",
		kana: "らんぼるぎーに",
		romaji: "ranborigini",
	},
	{
		jp: "ロールスロイス",
		kana: "ろーるすろいす",
		romaji: "roorusuloisu",
	},
	{
		jp: "車の値段",
		kana: "くるまのねだん",
		romaji: "kurumanonneddan",
	},
	{
		jp: "リース",
		kana: "りーす",
		romaji: "rius",
	},
	{
		jp: "レンタカー",
		kana: "れんたかー",
		romaji: "rentakaa",
	},
	{
		jp: "カーシェアリング",
		kana: "かーしぇありんぐ",
		romaji: "kasheaaringu",
	},
	{
		jp: "タイムズカー",
		kana: "たいむずかー",
		romaji: "taimusukaa",
	},
	{
		jp: "アメ車",
		kana: "あめしゃ",
		romaji: "amesha",
	},
	{
		jp: "ドイツ車",
		kana: "どいつしゃ",
		romaji: "doitsushya",
	},
	{
		jp: "日本車",
		kana: "にほんしゃ",
		romaji: "nihonsha",
	},
	{
		jp: "韓国車",
		kana: "かんこくしゃ",
		romaji: "kankokushya",
	},
	{
		jp: "輸入車",
		kana: "ゆにゅうしゃ",
		romaji: "yunyuusha",
	},
	{
		jp: "国産車",
		kana: "こくさんしゃ",
		romaji: "koksanshya",
	},
	{
		jp: "中古車",
		kana: "ちゅうこしゃ",
		romaji: "chuukusha",
	},
	{
		jp: "カーディーラー",
		kana: "かーでぃーらー",
		romaji: "kaadiraa",
	},
	{
		jp: "試乗",
		kana: "しじょう",
		romaji: "shijou",
	},
	{
		jp: "自動車修理工場",
		kana: "じどうしゃしゅうりこうじょう",
		romaji: "jidoushashuurikoujou",
	},
	{
		jp: "ガレージ",
		kana: "がれーじ",
		romaji: "gareeji",
	},
	{
		jp: "バイク乗り",
		kana: "ばいくのり",
		romaji: "baikunori",
	},
	{
		jp: "オートバイ",
		kana: "おーとばい",
		romaji: "ootobai",
	},
	{
		jp: "スクーター",
		kana: "すくーたー",
		romaji: "skuutaa",
	},
	{
		jp: "排気量",
		kana: "はいきりょう",
		romaji: "haikiriou",
	},
	{
		jp: "チェーン",
		kana: "ちぇーん",
		romaji: "cheen",
	},
	{
		jp: "スプロケット",
		kana: "すぷろけっと",
		romaji: "supuroketto",
	},
	{
		jp: "ヘルメット",
		kana: "へるめっと",
		romaji: "herumetto",
	},
	{
		jp: "ライダースジャケット",
		kana: "らいだーすじゃけっと",
		romaji: "raidaasujaketto",
	},
	{
		jp: "グローブ",
		kana: "ぐろーぶ",
		romaji: "guroobu",
	},
	{
		jp: "バイク乗りのマナー",
		kana: "ばいくのりのまなー",
		romaji: "baikunorinonomanaa",
	},
	{
		jp: "ツーリングスポット",
		kana: "つーりんぐすぽっと",
		romaji: "tuuringusupotto",
	},
	{
		jp: "林道",
		kana: "りんどう",
		romaji: "rindou",
	},
	{
		jp: "山道",
		kana: "やまみち",
		romaji: "yamamichi",
	},
	{
		jp: "海沿い",
		kana: "うみぞい",
		romaji: "umizoi",
	},
	{
		jp: "サーフィン旅行",
		kana: "さーふぃんりょこう",
		romaji: "saffinryokou",
	},
	{
		jp: "スキー場への移動",
		kana: "すきーじょうへのいどう",
		romaji: "sukijouheinoido",
	},
	{
		jp: "ガイドラインに従う",
		kana: "がいどらいんにしたがう",
		romaji: "gaidorainnnishitagau",
	},
	{
		jp: "トラフィック",
		kana: "とらふぃっく",
		romaji: "torafik",
	},
	{
		jp: "道路標識を読む",
		kana: "どうろひょうしきをよむ",
		romaji: "douorohyoushikiwoyomu",
	},
	{
		jp: "安全運転",
		kana: "あんぜんうんてん",
		romaji: "anzenunutenn",
	},
	{
		jp: "危険な運転",
		kana: "きけんなうんてん",
		romaji: "kigennnaunten",
	},
	{
		jp: "エコドライブ",
		kana: "えこどらいぶ",
		romaji: "ekodoraibuu",
	},
	{
		jp: "燃料節約",
		kana: "ねんりょうせつやく",
		romaji: "nenryousetuak",
	},
	{
		jp: "ガソリン価格",
		kana: "がそりんかかく",
		romaji: "gasorinkakaku",
	},
	{
		jp: "軽自動車",
		kana: "かるじどうしゃ",
		romaji: "karujidousha",
	},
	{
		jp: "コンパクトカー",
		kana: "こんぱくとかー",
		romaji: "konpakutokaa",
	},
	{
		jp: "ステーションワゴン",
		kana: "すてーしょんわごん",
		romaji: "suteeshonwagon",
	},
	{
		jp: "クロスオーバーSUV",
		kana: "くろすおーばーえすゆーぶい",
		romaji: "kurosuobaaesuuu",
	},
	{
		jp: "交通事故",
		kana: "こうつうじこ",
		romaji: "kotuujiko",
	},
	{
		jp: "バス停留所",
		kana: "ばすていりゅうじょ",
		romaji: "busteiryuujo",
	},
	{
		jp: "電停",
		kana: "でんてい",
		romaji: "dentei",
	},
	{
		jp: "駅舎",
		kana: "えきしゃ",
		romaji: "ekisha",
	},
	{
		jp: "改札口",
		kana: "かいさつぐち",
		romaji: "kaisatsuguchiぐち",
	},
	{
		jp: "SL列車",
		kana: "えすえるれっしゃ",
		romaji: "esueresha",
	},
	{
		jp: "ロープウェイ",
		kana: "ろーぷうぇい",
		romaji: "roopuwei",
	},
	{
		jp: "リフト乗車",
		kana: "りふとじょうしゃ",
		romaji: "rifutojousha",
	},
	{
		jp: "フェリー乗船",
		kana: "ふぇりーじょうせん",
		romaji: "ferrijousen",
	},
	{
		jp: "船舶",
		kana: "せんぱく",
		romaji: "senpaku",
	},
	{
		jp: "ジェットスキー",
		kana: "じぇっとすきー",
		romaji: "jettosukkii",
	},
	{
		jp: "クルーズ旅行",
		kana: "くるーずりょこう",
		romaji: "kuruuzuryokou",
	},
	{
		jp: "ホテルの予約をしたいです",
		kana: "ほてるのよやくをしたいです",
		romaji: "hoteru no yoyaku wo shitai desu",
	},
	{
		jp: "チェックインの時間は何時ですか",
		kana: "ちぇっくいんのじかんはなんじですか",
		romaji: "chekku in no jikan wa nanji desu ka",
	},
	{
		jp: "シングルルームをください",
		kana: "しんぐるるーむをください",
		romaji: "shinguru rūmu wo kudasai",
	},
	{
		jp: "朝食は何時からですか",
		kana: "ちょうしょくはなんじからですか",
		romaji: "chōshoku wa nanji kara desu ka",
	},
	{
		jp: "部屋に冷蔵庫がありますか",
		kana: "へやにれいぞうこがありますか",
		romaji: "heya ni reizōko ga arimasu ka",
	},
	{
		jp: "WiFiのパスワードを教えてください",
		kana: "わいふぁいのぱすわーどをおしえてください",
		romaji: "waifai no pasuwādo wo oshiete kudasai",
	},
	{
		jp: "荷物を預けられますか",
		kana: "にもつをあずけられますか",
		romaji: "nimotsu wo azukerareru ka",
	},
	{
		jp: "チェックアウトは午前中にお願いします",
		kana: "ちぇっくあうとはごぜんちゅうにおねがいします",
		romaji: "chekku auto wa gozen chū ni onegai shimasu",
	},
	{
		jp: "タオルを持ってきてもらえますか",
		kana: "たおるをもってきてもらえますか",
		romaji: "taoru wo motte kite moraeru ka",
	},
	{
		jp: "エアコンが壊れています",
		kana: "えあこんがこわれています",
		romaji: "eakon ga kowarete imasu",
	},
	{
		jp: "空港へはどう行きますか",
		kana: "くうこうへはどういきますか",
		romaji: "kūkō e wa dō iki masu ka",
	},
	{
		jp: "新幹線のチケットを買いたいです",
		kana: "しんかんせんのちけっとをかいたいです",
		romaji: "shinkansen no chiketto wo kaitai desu",
	},
	{
		jp: "このバスは渋谷に行きますか",
		kana: "このばすはしぶやにいきますか",
		romaji: "kono basu wa shibuya ni iki masu ka",
	},
	{
		jp: "タクシーを呼んでください",
		kana: "たくしーをよんでください",
		romaji: "takushī wo yonde kudasai",
	},
	{
		jp: "乗車券をください",
		kana: "じょうしゃけんをください",
		romaji: "jōshakin wo kudasai",
	},
	{
		jp: "次の駅は何ですか",
		kana: "つぎのえきはなんですか",
		romaji: "tsugi no eki wa nan desu ka",
	},
	{
		jp: "レンタカーを借りたいです",
		kana: "れんたかーをかりたいです",
		romaji: "rentakā wo karitai desu",
	},
	{
		jp: "運転免許証を持っています",
		kana: "うんてんめんきょしょうをもっています",
		romaji: "unten menkyoshō wo motte imasu",
	},
	{
		jp: "ガソリンスタンドはどこですか",
		kana: "がそりんすたんどはどこですか",
		romaji: "gasorin sutando wa doko desu ka",
	},
	{
		jp: "この町で有名な観光地は何ですか",
		kana: "このまちでゆうめいなかんこうちはなんですか",
		romaji: "kono machi de yūmei na kankōchi wa nan desu ka",
	},
	{
		jp: "寺院を見学したいです",
		kana: "じいんをけんがくしたいです",
		romaji: "jiin wo kengaku shitai desu",
	},
	{
		jp: "美術館の営業時間を教えてください",
		kana: "びじゅつかんのえいぎょうじかんをおしえてください",
		romaji: "bijutsukan no eigyō jikan wo oshiete kudasai",
	},
	{
		jp: "京都への日帰り旅行はできますか",
		kana: "きょうとへのひがえりりょこうはできますか",
		romaji: "kyōto e no higaeri ryokō wa deki masu ka",
	},
	{
		jp: "富士山の頂上に登りたいです",
		kana: "ふじさんのちょうじょうにのぼりたいです",
		romaji: "fujisan no chōjō ni noboritai desu",
	},
	{
		jp: "この写真はどこで撮りましたか",
		kana: "このしゃしんはどこでとりましたか",
		romaji: "kono shashin wa doko de tori mashita ka",
	},
	{
		jp: "カメラで撮ってもいいですか",
		kana: "かめらでとってもいいですか",
		romaji: "kamera de totte mo ii desu ka",
	},
	{
		jp: "景色がきれいですね",
		kana: "けしきがきれいですね",
		romaji: "keshiki ga kirei desu ne",
	},
	{
		jp: "ハイキングコースはどれですか",
		kana: "はいきんぐこーすはどれですか",
		romaji: "haikingu kōsu wa dore desu ka",
	},
	{
		jp: "地図を持っていますか",
		kana: "ちずをもっていますか",
		romaji: "chizu wo motte imasu ka",
	},
	{
		jp: "おすすめのレストランはどこですか",
		kana: "おすすめのれすとらんはどこですか",
		romaji: "osusume no resutoran wa doko desu ka",
	},
	{
		jp: "このシェフは有名ですか",
		kana: "このしぇふはゆうめいですか",
		romaji: "kono shefu wa yūmei desu ka",
	},
	{
		jp: "このメニューは何ですか",
		kana: "このめにゅーはなんですか",
		romaji: "kono menyū wa nan desu ka",
	},
	{
		jp: "宮城県の郷土料理を食べたいです",
		kana: "みやぎけんのきょうどりょうりをたべたいです",
		romaji: "miyagi ken no kyōdo ryōri wo tabetai desu",
	},
	{
		jp: "オーガニック野菜を使っていますか",
		kana: "おーがにっくやさいをつかっていますか",
		romaji: "ōganikku yasai wo tsukatte imasu ka",
	},
	{
		jp: "ベジタリアン向けメニューはありますか",
		kana: "べじたりあんむけめにゅーはありますか",
		romaji: "bejitarian muke menyū wa arimasu ka",
	},
	{
		jp: "このワインはどこの産地ですか",
		kana: "このわいんはどこのさんちですか",
		romaji: "kono wain wa doko no sanchi desu ka",
	},
	{
		jp: "お水をもう一杯ください",
		kana: "おみずをもういっぱいください",
		romaji: "omizu wo mō ippai kudasai",
	},
	{
		jp: "海の幸がおいしいですね",
		kana: "うみのさちがおいしいですね",
		romaji: "umi no sachi ga oishii desu ne",
	},
	{
		jp: "これはどうやって食べるんですか",
		kana: "これはどうやってたべるんですか",
		romaji: "kore wa dō yatte taberu n desu ka",
	},
	{
		jp: "市場はどこですか",
		kana: "いちばはどこですか",
		romaji: "ichiba wa doko desu ka",
	},
	{
		jp: "このお土産はいくらですか",
		kana: "このおみやげはいくらですか",
		romaji: "kono omiyage wa ikura desu ka",
	},
	{
		jp: "値引きはできますか",
		kana: "ねびきはできますか",
		romaji: "nebiki wa deki masu ka",
	},
	{
		jp: "この商品は日本製ですか",
		kana: "このしょうひんはにほんせいですか",
		romaji: "kono shōhin wa nihonsei desu ka",
	},
	{
		jp: "別の色はありますか",
		kana: "べつのいろはありますか",
		romaji: "betsu no iro wa arimasu ka",
	},
	{
		jp: "この絵画は本物ですか",
		kana: "このかいがはほんものですか",
		romaji: "kono kaiga wa honmono desu ka",
	},
	{
		jp: "配送はできますか",
		kana: "はいそうはできますか",
		romaji: "haisō wa deki masu ka",
	},
	{
		jp: "茶道の体験をしてみたいです",
		kana: "さどうのたいけんをしてみたいです",
		romaji: "sadō no taiken wo shite mitai desu",
	},
	{
		jp: "華道教室は毎週何曜日ですか",
		kana: "かどうきょうしつはまいしゅうなんようびですか",
		romaji: "kadō kyōshitsu wa maishū nan yōbi desu ka",
	},
	{
		jp: "着物をレンタルできますか",
		kana: "きものをれんたるできますか",
		romaji: "kimono wo rentaru deki masu ka",
	},
	{
		jp: "祭りはいつ開催されますか",
		kana: "まつりはいつかいさいされますか",
		romaji: "matsuri wa itsu kaisai sareru ka",
	},
	{
		jp: "歌舞伎の公演はありますか",
		kana: "かぶきのこうえんはありますか",
		romaji: "kabuki no kōen wa arimasu ka",
	},
	{
		jp: "能の舞台を見に行きたいです",
		kana: "のうのぶたいをみにいきたいです",
		romaji: "nō no butai wo mi ni ikitai desu",
	},
	{
		jp: "陶芸教室に参加したいです",
		kana: "とうげいきょうしつにさんかしたいです",
		romaji: "tōgei kyōshitsu ni sanka shitai desu",
	},
	{
		jp: "書道の体験はできますか",
		kana: "しょどうのたいけんはできますか",
		romaji: "shodō no taiken wa deki masu ka",
	},
	{
		jp: "三味線を習ってみたいです",
		kana: "しゃみせんをならってみたいです",
		romaji: "shamisen wo naratte mitai desu",
	},
	{
		jp: "花見に行きませんか",
		kana: "はなみにいきませんか",
		romaji: "hanami ni iki masen ka",
	},
	{
		jp: "海水浴場はどこですか",
		kana: "かいすいよくじょうはどこですか",
		romaji: "kaisuiyoku jō wa doko desu ka",
	},
	{
		jp: "泳ぐのは安全ですか",
		kana: "およぐのはあんぜんですか",
		romaji: "oyogu no wa anzen desu ka",
	},
	{
		jp: "サーフボードを貸してくれますか",
		kana: "さーふぼーどをかしてくれますか",
		romaji: "sāfu bōdo wo kashite kureru ka",
	},
	{
		jp: "干潮は何時ですか",
		kana: "かんちょうはなんじですか",
		romaji: "kanchō wa nanji desu ka",
	},
	{
		jp: "この海岸はきれいですね",
		kana: "このかいがんはきれいですね",
		romaji: "kono kaigan wa kirei desu ne",
	},
	{
		jp: "温泉に入りたいです",
		kana: "おんせんにはいりたいです",
		romaji: "onsen ni hairitai desu",
	},
	{
		jp: "露天風呂はありますか",
		kana: "ろてんぶろはありますか",
		romaji: "rotenbu ro wa arimasu ka",
	},
	{
		jp: "標高はどのくらいですか",
		kana: "ひょうこうはどのくらいですか",
		romaji: "hyōkō wa dono kurai desu ka",
	},
	{
		jp: "野鳥の宝庫として知られています",
		kana: "やちょうのほうこくとしてしられています",
		romaji: "yachō no hōkoku to shite shirarete imasu",
	},
	{
		jp: "星がきれいに見えますね",
		kana: "ほしがきれいにみえますね",
		romaji: "hoshi ga kirei ni mieru ne",
	},
	{
		jp: "両替所はどこですか",
		kana: "りょうがえじょはどこですか",
		romaji: "ryōgae jo wa doko desu ka",
	},
	{
		jp: "ATMはありますか",
		kana: "えーてぃーえむはありますか",
		romaji: "ē tī emu wa arimasu ka",
	},
	{
		jp: "医者の診察を受けたいです",
		kana: "いしゃのしんさつをうけたいです",
		romaji: "isha no shinsatsu wo uketai desu",
	},
	{
		jp: "薬局はどこですか",
		kana: "やっきょくはどこですか",
		romaji: "yakkyoku wa doko desu ka",
	},
	{
		jp: "警察署はどこですか",
		kana: "けいさつしょはどこですか",
		romaji: "keisatsu sho wa doko desu ka",
	},
	{
		jp: "パスポートをなくしてしまいました",
		kana: "ぱすぽーとをなくしてしまいました",
		romaji: "pasupōto wo nakushite shimaimashita",
	},
	{
		jp: "次の便はいつですか",
		kana: "つぎのびんはいつですか",
		romaji: "tsugi no bin wa itsu desu ka",
	},
	{
		jp: "荷物保険に入りたいです",
		kana: "にもつほけんにはいりたいです",
		romaji: "nimotsu hoken ni hairitai desu",
	},
	{
		jp: "旅行中の急な病気に対応します",
		kana: "りょこうちゅうのきゅうなびょうきにたいおうします",
		romaji: "ryokō chū no kyū na byōki ni taiō shimasu",
	},
	{
		jp: "雨が降ると思いますか",
		kana: "あめがふるとおもいますか",
		romaji: "ame ga furu to omoi masu ka",
	},
	{
		jp: "このお城は何年にたてられましたか",
		kana: "このおしろはなんねんにたてられましたか",
		romaji: "kono oshiro wa nannen ni taterareru mashita ka",
	},
	{
		jp: "古墳の説明を聞きたいです",
		kana: "こふんのせつめいをききたいです",
		romaji: "kofun no setsumeiso wo kikitai desu",
	},
	{
		jp: "戦争の歴史を学びたいです",
		kana: "せんそうのれきしをまなびたいです",
		romaji: "sensō no rekishi wo manabi tai desu",
	},
	{
		jp: "この彫刻は誰が作りましたか",
		kana: "このちょうこくはだれがつくりましたか",
		romaji: "kono chōkoku wa dare ga tsukuri mashita ka",
	},
	{
		jp: "展示はいつまでですか",
		kana: "てんじはいつまでですか",
		romaji: "tenji wa itsu made desu ka",
	},
	{
		jp: "写真撮影は許可されていますか",
		kana: "しゃしんさつえいはきょかされていますか",
		romaji: "shashin satsuei wa kyoka sarete imasu ka",
	},
	{
		jp: "昔の道具を見てみたいです",
		kana: "むかしのどうぐをみてみたいです",
		romaji: "mukashi no dōgu wo mite mitai desu",
	},
	{
		jp: "このコレクションはどこから来ましたか",
		kana: "このこれくしょんはどこからきましたか",
		romaji: "kono korekushon wa doko kara ki mashita ka",
	},
	{
		jp: "学芸員の解説がありますか",
		kana: "がくげいいんのかいせつがありますか",
		romaji: "gakugei in no kaisetsu ga arimasu ka",
	},
	{
		jp: "レストランはお城の中にありますか",
		kana: "れすとらんはおしろのなかにありますか",
		romaji: "resutoran wa oshiro no naka ni arimasu ka",
	},
	{
		jp: "スキー場はどこですか",
		kana: "すきーじょうはどこですか",
		romaji: "sukī jō wa doko desu ka",
	},
	{
		jp: "スノーボードをレンタルできますか",
		kana: "すのーぼーどをれんたるできますか",
		romaji: "sunō bōdo wo rentaru deki masu ka",
	},
	{
		jp: "初心者向けのコースはありますか",
		kana: "しょしんしゃむけのこーすはありますか",
		romaji: "shoshinsha muke no kōsu wa arimasu ka",
	},
	{
		jp: "ゴルフコースの予約がしたいです",
		kana: "ごるふこーすのよやくがしたいです",
		romaji: "gorufu kōsu no yoyaku ga shitai desu",
	},
	{
		jp: "野球の試合を見に行きたいです",
		kana: "やきゅうのしあいをみにいきたいです",
		romaji: "yakyū no shiai wo mi ni ikitai desu",
	},
	{
		jp: "サッカーのチケットをください",
		kana: "さっかーのちけっとをください",
		romaji: "sakkā no chiketto wo kudasai",
	},
	{
		jp: "テニスコートを借りたいです",
		kana: "てにすこーとをかりたいです",
		romaji: "tenisu kōto wo karitai desu",
	},
	{
		jp: "登山に必要な装備は何ですか",
		kana: "とざんにひつようなそうびはなんですか",
		romaji: "tozan ni hitsuyō na sōbi wa nan desu ka",
	},
	{
		jp: "バンジージャンプはできますか",
		kana: "ばんじーじゃんぷはできますか",
		romaji: "banjī janpu wa deki masu ka",
	},
	{
		jp: "パラグライダー体験はありますか",
		kana: "ぱらぐらいだーたいけんはありますか",
		romaji: "paraglaidā taiken wa arimasu ka",
	},
	{
		jp: "靴を脱がなければいけませんか",
		kana: "くつをぬがなければいけませんか",
		romaji: "kutsu wo nuganakereja ike masen ka",
	},
	{
		jp: "このエリアで禁止されていることはありますか",
		kana: "このえりあできんしされていることはありますか",
		romaji: "kono eria de kinshi sarete iru koto wa arimasu ka",
	},
	{
		jp: "敬語で話さなければいけませんか",
		kana: "けいごではなさなければいけませんか",
		romaji: "keigo de hanasa nakereba ike masen ka",
	},
	{
		jp: "写真を撮ってもいいですか",
		kana: "しゃしんをとってもいいですか",
		romaji: "shashin wo totte mo ii desu ka",
	},
	{
		jp: "宗教的な儀式を見学できますか",
		kana: "しゅうきょうてきなぎしきをけんがくできますか",
		romaji: "shūkyōteki na gishiki wo kengaku deki masu ka",
	},
	{
		jp: "この祭りの意味は何ですか",
		kana: "このまつりのいみはなんですか",
		romaji: "kono matsuri no imi wa nan desu ka",
	},
	{
		jp: "チップは必要ですか",
		kana: "ちっぷはひつようですか",
		romaji: "chippu wa hitsuyō desu ka",
	},
	{
		jp: "時間厳守の文化ですか",
		kana: "じかんげんしゅのぶんかですか",
		romaji: "jikan genshu no bunka desu ka",
	},
	{
		jp: "握手はします",
		kana: "あくしゅはします",
		romaji: "akushu wa shimasu",
	},
	{
		jp: "目を見て話すのが失礼ですか",
		kana: "めをみてはなすのがしつれいですか",
		romaji: "me wo mite hanasu no ga shitsurei desu ka",
	},
	{
		jp: "日本の工芸品を買いたいです",
		kana: "にほんのこうげいひんをかいたいです",
		romaji: "nihon no kōgeihin wo kaitai desu",
	},
	{
		jp: "京都の伝統工芸品はどこで買えますか",
		kana: "きょうとのでんとうこうげいひんはどこでかえますか",
		romaji: "kyōto no dentō kōgeihin wa doko de kaeru ka",
	},
	{
		jp: "九谷焼はいくらですか",
		kana: "くたにやきはいくらですか",
		romaji: "kutani yaki wa ikura desu ka",
	},
	{
		jp: "有田焼の食器をください",
		kana: "ありたやきのしょっきをください",
		romaji: "arita yaki no shokki wo kudasai",
	},
	{
		jp: "越前漆器はどこで売っていますか",
		kana: "えちぜんしっきはどこでうっていますか",
		romaji: "echizen shikki wa doko de utte imasu ka",
	},
	{
		jp: "竹工芸品を見てみたいです",
		kana: "たけこうげいひんをみてみたいです",
		romaji: "take kōgeihin wo mite mitai desu",
	},
	{
		jp: "正絹の帯はありますか",
		kana: "しょうけんのおびはありますか",
		romaji: "shōken no obi wa arimasu ka",
	},
	{
		jp: "友人へのお土産は何がいいですか",
		kana: "ゆうじんへのおみやげはなんがいいですか",
		romaji: "yūjin e no omiyage wa nan ga ii desu ka",
	},
	{
		jp: "ラッピングをしていただけますか",
		kana: "らっぴんぐをしていただけますか",
		romaji: "rappingu wo shite itadaku masu ka",
	},
	{
		jp: "郵送でお送りすることはできますか",
		kana: "ゆうそうでおおくりすることはできますか",
		romaji: "yūsō de okuri suru koto wa deki masu ka",
	},
	{
		jp: "春はどこが見ごろですか",
		kana: "はるはどこがみごろですか",
		romaji: "haru wa doko ga migoro desu ka",
	},
	{
		jp: "紅葉の季節はいつですか",
		kana: "こうようのきせつはいつですか",
		romaji: "kōyō no kisetsu wa itsu desu ka",
	},
	{
		jp: "秋は涼しいですか",
		kana: "あきはすずしいですか",
		romaji: "aki wa suzushii desu ka",
	},
	{
		jp: "冬はどのくらい寒いですか",
		kana: "ふゆはどのくらいさむいですか",
		romaji: "fuyu wa dono kurai samui desu ka",
	},
	{
		jp: "夏の日本は蒸し蒸しですね",
		kana: "なつのにほんはむしむしですね",
		romaji: "natsu no nihon wa mushimushi desu ne",
	},
	{
		jp: "梅雨の時期は何月ですか",
		kana: "つゆのときはなんがつですか",
		romaji: "tsuyu no toki wa nangatsu desu ka",
	},
	{
		jp: "台風が来ることがありますか",
		kana: "たいふうがくることがありますか",
		romaji: "taifū ga kuru koto ga arimasu ka",
	},
	{
		jp: "雪が降りますか",
		kana: "ゆきがふりますか",
		romaji: "yuki ga furimasu ka",
	},
	{
		jp: "この季節の服装は何がいいですか",
		kana: "このきせつのふくそうはなんがいいですか",
		romaji: "kono kisetsu no fukusō wa nan ga ii desu ka",
	},
	{
		jp: "この時期は観光客が多いですか",
		kana: "このじきはかんこうきゃくがおおいですか",
		romaji: "kono jiki wa kankōkyaku ga ōi desu ka",
	},
	{
		jp: "地下鉄の乗り方を教えてください",
		kana: "ちかてつのりかたをおしえてください",
		romaji: "chikatetsu no rikata wo oshiete kudasai",
	},
	{
		jp: "定期券はどこで買えますか",
		kana: "ていきけんはどこでかえますか",
		romaji: "teiki ken wa doko de kaeru ka",
	},
	{
		jp: "電車のマナーについて教えてください",
		kana: "でんしゃのまなーについておしえてください",
		romaji: "densha no manā ni tsuite oshiete kudasai",
	},
	{
		jp: "スイカカードはどこで買いますか",
		kana: "すいかかーどはどこでかいますか",
		romaji: "suika kādo wa doko de kai masu ka",
	},
	{
		jp: "この路線は夜遅くまで運行していますか",
		kana: "このろせんはよるおそくまでうんこうしていますか",
		romaji: "kono rosen wa yoru osoku made unkō shite imasu ka",
	},
	{
		jp: "終電は何時ですか",
		kana: "しゅうでんはなんじですか",
		romaji: "shūden wa nanji desu ka",
	},
	{
		jp: "渋谷駅から新宿駅までは何分ですか",
		kana: "しぶやえきからしんじゅくえきまではなんぷんですか",
		romaji: "shibuya eki kara shinjuku eki made wa nanpun desu ka",
	},
	{
		jp: "乗り換えはどこでしますか",
		kana: "のりかえはどこでしますか",
		romaji: "norikaeri wa doko de shimasu ka",
	},
	{
		jp: "駅前に両替所がありますか",
		kana: "えきまえにりょうがえじょがありますか",
		romaji: "ekimae ni ryōgae jo ga arimasu ka",
	},
	{
		jp: "駅ビルで買い物ができますか",
		kana: "えきびるでかいものができますか",
		romaji: "ekibiru de kaimono ga deki masu ka",
	},
	{
		jp: "ガイド付きツアーに参加したいです",
		kana: "がいどつきつあーにさんかしたいです",
		romaji: "gaido tsuki tsuā ni sanka shitai desu",
	},
	{
		jp: "ツアーのスケジュールを教えてください",
		kana: "つあーのすけじゅーるをおしえてください",
		romaji: "tsuā no sukejūru wo oshiete kudasai",
	},
	{
		jp: "グループ割引はありますか",
		kana: "ぐるーぷわりびきはありますか",
		romaji: "gurūpu waribiki wa arimasu ka",
	},
	{
		jp: "子供の料金は安いですか",
		kana: "こどものりょうきんはやすいですか",
		romaji: "kodomo no ryōkin wa yasui desu ka",
	},
	{
		jp: "昼食は含まれていますか",
		kana: "ちゅうしょくはふくまれていますか",
		romaji: "chūshoku wa fukumarete imasu ka",
	},
	{
		jp: "写真を撮る時間はありますか",
		kana: "しゃしんをとるじかんはありますか",
		romaji: "shashin wo toru jikan wa arimasu ka",
	},
	{
		jp: "何時に出発ですか",
		kana: "なんじにしゅっぱつですか",
		romaji: "nanji ni shuppatsu desu ka",
	},
	{
		jp: "戻ってくる時間は何時ですか",
		kana: "もどってくるじかんはなんじですか",
		romaji: "modotte kuru jikan wa nanji desu ka",
	},
	{
		jp: "天候が悪い場合はどうなりますか",
		kana: "てんこうがわるいばあいはどうなりますか",
		romaji: "tenkō ga warui baai wa dō nari masu ka",
	},
	{
		jp: "料金の払い方はどうですか",
		kana: "りょうきんのはらいかたはどうですか",
		romaji: "ryōkin no haraikata wa dō desu ka",
	},
	{
		jp: "日本語で何と言いますか",
		kana: "にほんごでなんといいますか",
		romaji: "nihongo de nan to ii masu ka",
	},
	{
		jp: "これを日本語でどう言いますか",
		kana: "これをにほんごでどういいますか",
		romaji: "kore wo nihongo de dō ii masu ka",
	},
	{
		jp: "ゆっくり話していただけますか",
		kana: "ゆっくりはなしていただけますか",
		romaji: "yukkuri hanashite itadaku masu ka",
	},
	{
		jp: "書いていただけますか",
		kana: "かいていただけますか",
		romaji: "kaite itadaku masu ka",
	},
	{
		jp: "イギリス人です",
		kana: "いぎりすじんです",
		romaji: "igirisu jin desu",
	},
	{
		jp: "オーストラリアから来ました",
		kana: "おーすとらりあからきました",
		romaji: "ōsutorariakarakimashita",
	},
	{
		jp: "二週間日本に滞在する予定です",
		kana: "にしゅうかんにほんにたいざいするよていです",
		romaji: "nishūkan nihon ni taizai suru yotei desu",
	},
	{
		jp: "日本の文化が好きです",
		kana: "にほんのぶんかがすきです",
		romaji: "nihon no bunka ga suki desu",
	},
	{
		jp: "また来年来たいです",
		kana: "またらいねんきたいです",
		romaji: "mata rainen kitai desu",
	},
	{
		jp: "素晴らしい経験をありがとうございました",
		kana: "すばらしいけいけんをありがとうございました",
		romaji: "subarashii keiken wo arigatō gozaimashita",
	},
	{
		jp: "家族向けのお部屋はありますか",
		kana: "かぞくむけのおへやはありますか",
		romaji: "kazoku muke no oheya wa arimasu ka",
	},
	{
		jp: "キッチン付きのアパートを探しています",
		kana: "きっちんつきのあぱーとをさがしています",
		romaji: "kitchin tsuki no apāto wo sagashite imasu",
	},
	{
		jp: "ペットを連れていいですか",
		kana: "ぺっとをつれていいですか",
		romaji: "petto wo tsure te ii desu ka",
	},
	{
		jp: "地元の特産品を食べたいです",
		kana: "じもとのとくさんひんをたべたいです",
		romaji: "jimoto no tokusan hin wo tabetai desu",
	},
	{
		jp: "アレルギーがあるので知らせます",
		kana: "あれるぎーがあるのでしらせます",
		romaji: "arerugī ga aru node shirase masu",
	},
	{
		jp: "この地域の名物は何ですか",
		kana: "このちいきのめいぶつはなんですか",
		romaji: "kono chiiki no meibustsu wa nan desu ka",
	},
	{
		jp: "電車とバスはどちらが安いですか",
		kana: "でんしゃとばすはどちらがやすいですか",
		romaji: "densha to basu wa dochira ga yasui desu ka",
	},
	{
		jp: "フェリーで島に行けますか",
		kana: "ふぇりーでしまにいけますか",
		romaji: "ferī de shima ni ikeru ka",
	},
	{
		jp: "ケーブルカーの運行時間は何時までですか",
		kana: "けーぶるかーのうんこうじかんはなんじまでですか",
		romaji: "kēburu kā no unkō jikan wa nanji made desu ka",
	},
	{
		jp: "ロープウェイから景色が見えますか",
		kana: "ろーぷうぇいからけしきがみえますか",
		romaji: "rōpu uei kara keshiki ga mieru ka",
	},
	{
		jp: "夜間ライトアップはありますか",
		kana: "やかんらいとあっぷはありますか",
		romaji: "yakan raito appu wa arimasu ka",
	},
	{
		jp: "この道は初心者向けですか",
		kana: "このみちはしょしんしゃむけですか",
		romaji: "kono michi wa shoshinsha muke desu ka",
	},
	{
		jp: "武道の体験はできますか",
		kana: "ぶどうのたいけんはできますか",
		romaji: "budō no taiken wa deki masu ka",
	},
	{
		jp: "お琴の音色がいいですね",
		kana: "おことのおといろがいいですね",
		romaji: "okoto no otoiro ga ii desu ne",
	},
	{
		jp: "伝統的な遊びを教えてください",
		kana: "でんとうてきなあそびをおしえてください",
		romaji: "dentōteki na asobi wo oshiete kudasai",
	},
	{
		jp: "量り売りをしていますか",
		kana: "はかりうりをしていますか",
		romaji: "hakari uri wo shite imasu ka",
	},
	{
		jp: "返品はできますか",
		kana: "へんぴんはできますか",
		romaji: "henpin wa deki masu ka",
	},
	{
		jp: "滝が見える場所はどこですか",
		kana: "たきがみえるばしょはどこですか",
		romaji: "taki ga mieru basho wa doko desu ka",
	},
	{
		jp: "川の深さは大丈夫ですか",
		kana: "かわのふかさはだいじょうぶですか",
		romaji: "kawa no fukasa wa daijōbu desu ka",
	},
	{
		jp: "森林浴がしたいです",
		kana: "しんりんよくがしたいです",
		romaji: "shinrin yoku ga shitai desu",
	},
	{
		jp: "通訳が必要ですか",
		kana: "つうやくがひつようですか",
		romaji: "tsūyaku ga hitsuyō desu ka",
	},
	{
		jp: "予防接種の証明を見せてください",
		kana: "よぼうせっしゅのしょうめいをみせてください",
		romaji: "yobō sesshio no shōmei wo misete kudasai",
	},
	{
		jp: "この水は飲んでも大丈夫ですか",
		kana: "このみずはのんでもだいじょうぶですか",
		romaji: "kono mizu wa nonde mo daijōbu desu ka",
	},
	{
		jp: "桜の開花予想はいつですか",
		kana: "さくらのかいかよそうはいつですか",
		romaji: "sakura no kaika yosō wa itsu desu ka",
	},
	{
		jp: "花火大会はいつありますか",
		kana: "はなびたいかいはいつありますか",
		romaji: "hanabi taikai wa itsu arimasu ka",
	},
	{
		jp: "ゲリラ豪雨に注意が必要ですか",
		kana: "げりらごうういにちゅういがひつようですか",
		romaji: "gerira gōui ni chūi ga hitsuyō desu ka",
	},
	{
		jp: "このエリアは治安がいいですか",
		kana: "このえりあはちあんがいいですか",
		romaji: "kono eria wa chian ga ii desu ka",
	},
	{
		jp: "夜道は暗いですか",
		kana: "よみちはくらいですか",
		romaji: "yomichi wa kurai desu ka",
	},
	{
		jp: "コンビニエンスストアはありますか",
		kana: "こんびにえんすすとあはありますか",
		romaji: "konbiniensu suto wa arimasu ka",
	},
	{
		jp: "農業体験ができますか",
		kana: "のうぎょうたいけんができますか",
		romaji: "nōgyō taiken ga deki masu ka",
	},
	{
		jp: "漁村の生活を体験したいです",
		kana: "ぎょそんのせいかつをたいけんしたいです",
		romaji: "gyoson no seikatsu wo taiken shitai desu",
	},
	{
		jp: "職人技を見学できますか",
		kana: "しょくにんぎをけんがくできますか",
		romaji: "shokuningi wo kengaku deki masu ka",
	},
	{
		jp: "この町の見どころを教えてください",
		kana: "このまちのみどころをおしえてください",
		romaji: "kono machi no midokoro wo oshiete kudasai",
	},
	{
		jp: "今夜のイベントはありますか",
		kana: "こんやのいべんとはありますか",
		romaji: "kon'ya no ibento wa arimasu ka",
	},
	{
		jp: "最後の仕上げをお願いします",
		kana: "さいごのしあげをおねがいします",
		romaji: "saigo no shiage wo onegai shimasu",
	},
	{
		jp: "この地図はどこで手に入りますか",
		kana: "このちずはどこでてにいりますか",
		romaji: "kono chizu wa doko de te ni irimasu ka",
	},
	{
		jp: "有名なフォトスポットはどこですか",
		kana: "ゆうめいなふぉとすぽっとはどこですか",
		romaji: "yūmei na foto supotto wa doko desu ka",
	},
	{
		jp: "地元の人しか知らない穴場があります",
		kana: "じもとのひとしかしらないあなばがあります",
		romaji: "jimoto no hito shika shiranai anaba ga arimasu",
	},
	{
		jp: "次の駅で下りてください",
		kana: "つぎのえきでおりてください",
		romaji: "tsugi no eki de orite kudasai",
	},
	{
		jp: "雪が降ります",
		kana: "ゆきがふります",
		romaji: "yukigafurimasu",
	},
	{
		jp: "曇っています",
		kana: "くもっています",
		romaji: "kumotteimasu",
	},
	{
		jp: "晴れました",
		kana: "はれました",
		romaji: "haremashita",
	},
	{
		jp: "霧が出ています",
		kana: "きりがでています",
		romaji: "kirigadeiteimasu",
	},
	{
		jp: "雹が降ります",
		kana: "ひょうがふります",
		romaji: "hyougafurimasu",
	},
	{
		jp: "稲妻が光ります",
		kana: "いなずまがひかります",
		romaji: "inazumagahikarimasu",
	},
	{
		jp: "雷が鳴ります",
		kana: "かみなりがなります",
		romaji: "kaminariganrimasu",
	},
	{
		jp: "虹が見えます",
		kana: "にじがみえます",
		romaji: "nijigamieemasu",
	},
	{
		jp: "寒いです",
		kana: "さむいです",
		romaji: "samuidesu",
	},
	{
		jp: "温かいです",
		kana: "あたたかいです",
		romaji: "atatakaiidesu",
	},
	{
		jp: "涼しいです",
		kana: "すずしいです",
		romaji: "suzushiiidesu",
	},
	{
		jp: "気温が上がります",
		kana: "きおんがあがります",
		romaji: "kiongaagrimasu",
	},
	{
		jp: "気温が下がります",
		kana: "きおんがさがります",
		romaji: "kiongasagrimasu",
	},
	{
		jp: "氷点下です",
		kana: "ひょうてんかです",
		romaji: "hyoutenkadesu",
	},
	{
		jp: "三十度を超えます",
		kana: "さんじゅっどをこえます",
		romaji: "sanjuttodowokoemasu",
	},
	{
		jp: "気温が低いです",
		kana: "きおんがひくいです",
		romaji: "kiongahikuidesu",
	},
	{
		jp: "気温が高いです",
		kana: "きおんがたかいです",
		romaji: "kiongatakaidesu",
	},
	{
		jp: "夏はとても暑いです",
		kana: "なつはとてもあついです",
		romaji: "natsuhayotemoatsuidesu",
	},
	{
		jp: "秋が深まります",
		kana: "あきがふかまります",
		romaji: "akigafukmarimasu",
	},
	{
		jp: "冬が近づきます",
		kana: "ふゆがちかづきます",
		romaji: "fuyugachikadukimasu",
	},
	{
		jp: "季節が変わります",
		kana: "きせつがかわります",
		romaji: "kisetusgakwarimasu",
	},
	{
		jp: "春分の日です",
		kana: "しゅんぶんのひです",
		romaji: "shunbunnohidesu",
	},
	{
		jp: "秋分の日です",
		kana: "しゅうぶんのひです",
		romaji: "shuubunnohidesu",
	},
	{
		jp: "梅雨の季節です",
		kana: "つゆのきせつです",
		romaji: "tsuyunokisetsudesu",
	},
	{
		jp: "初夏が来ます",
		kana: "しょかがきます",
		romaji: "shokagakimasu",
	},
	{
		jp: "初秋です",
		kana: "しょしゅうです",
		romaji: "shoshuudesu",
	},
	{
		jp: "湿度が低いです",
		kana: "しっどがひくいです",
		romaji: "shittogahikuidesu",
	},
	{
		jp: "蒸し蒸しています",
		kana: "むしむししています",
		romaji: "mushimushishiteimasu",
	},
	{
		jp: "しっとりしています",
		kana: "しっとりしています",
		romaji: "shittorrishiteimasu",
	},
	{
		jp: "乾燥しています",
		kana: "かんそうしています",
		romaji: "kansoushiteimasu",
	},
	{
		jp: "空気が乾いています",
		kana: "くうきがかわいています",
		romaji: "kuukigakawaiteiimasu",
	},
	{
		jp: "湿気がありません",
		kana: "しっけがありません",
		romaji: "shikkegaariimasen",
	},
	{
		jp: "じめじめしています",
		kana: "じめじめしています",
		romaji: "jimejimeshiteimasu",
	},
	{
		jp: "風が吹いています",
		kana: "かぜがふいています",
		romaji: "kazeagafuiteimasu",
	},
	{
		jp: "強い風です",
		kana: "つよいかぜです",
		romaji: "tsuyoikazedesu",
	},
	{
		jp: "弱い風です",
		kana: "よわいかぜです",
		romaji: "yowaikazedesu",
	},
	{
		jp: "そよ風が吹きます",
		kana: "そよかぜがふきます",
		romaji: "soyokazeagafukimasu",
	},
	{
		jp: "台風が来ます",
		kana: "たいふうがきます",
		romaji: "taifuugakimasu",
	},
	{
		jp: "嵐です",
		kana: "あらしです",
		romaji: "arashidesu",
	},
	{
		jp: "暴風警報です",
		kana: "ぼうふうけいほうです",
		romaji: "boufuukeihousedesu",
	},
	{
		jp: "北風が吹きます",
		kana: "きたかぜがふきます",
		romaji: "kitakazeagafukimasu",
	},
	{
		jp: "南風です",
		kana: "みなみかぜです",
		romaji: "minamikazedesu",
	},
	{
		jp: "風向きが変わります",
		kana: "かぜむきがかわります",
		romaji: "kazumukigakwarimasu",
	},
	{
		jp: "日差しが強いです",
		kana: "ひざしがつよいです",
		romaji: "hizashigatuyoidesu",
	},
	{
		jp: "太陽が出ています",
		kana: "たいようがでています",
		romaji: "taiyougadeiteimasu",
	},
	{
		jp: "日が暮れます",
		kana: "ひがくれます",
		romaji: "higakuremasu",
	},
	{
		jp: "日の出です",
		kana: "ひので",
		romaji: "hinode",
	},
	{
		jp: "日の入りです",
		kana: "ひのいりです",
		romaji: "hinoiridesu",
	},
	{
		jp: "朝焼けです",
		kana: "あさやけです",
		romaji: "asayakdesu",
	},
	{
		jp: "夕焼けです",
		kana: "ゆうやけです",
		romaji: "yuuyakdesu",
	},
	{
		jp: "影が長くなります",
		kana: "かげながくなります",
		romaji: "kagenagakunarimasu",
	},
	{
		jp: "紫外線が強いです",
		kana: "しがいせんがつよいです",
		romaji: "shigaisengatuyoidesu",
	},
	{
		jp: "日焼けします",
		kana: "ひやけします",
		romaji: "hiyakeshimasu",
	},
	{
		jp: "雲が多いです",
		kana: "くもがおおいです",
		romaji: "kumogaoidesu",
	},
	{
		jp: "雲が少ないです",
		kana: "くもがすくないです",
		romaji: "kumogasukunaidesu",
	},
	{
		jp: "積雲が見えます",
		kana: "せきうんがみえます",
		romaji: "sekiungamieemasu",
	},
	{
		jp: "巻雲です",
		kana: "けんうんです",
		romaji: "kenuundesu",
	},
	{
		jp: "層雲です",
		kana: "そうunです",
		romaji: "souundesu",
	},
	{
		jp: "乱層雲です",
		kana: "らんそうunです",
		romaji: "ransouundesu",
	},
	{
		jp: "入道雲が出ています",
		kana: "にゅうどうくもがでています",
		romaji: "nyuudoukumogadeiteimasu",
	},
	{
		jp: "雲が動きます",
		kana: "くもがうごきます",
		romaji: "kumogaugokimasu",
	},
	{
		jp: "雲が湧いています",
		kana: "くもがわいています",
		romaji: "kumogawaiteimasu",
	},
	{
		jp: "小雨が降ります",
		kana: "こさめがふります",
		romaji: "kosamegafurimasu",
	},
	{
		jp: "大雨です",
		kana: "おおあめです",
		romaji: "oosamedesu",
	},
	{
		jp: "豪雨です",
		kana: "ごううです",
		romaji: "gouudesu",
	},
	{
		jp: "雨が強くなります",
		kana: "あめがつよくなります",
		romaji: "amegatuyokunarimasu",
	},
	{
		jp: "雨が弱まります",
		kana: "あめがよわまります",
		romaji: "ameagayowamarimasu",
	},
	{
		jp: "雨の音です",
		kana: "あめのおとです",
		romaji: "amenoototodesu",
	},
	{
		jp: "雨が上がります",
		kana: "あめがあがります",
		romaji: "ameagagrimasu",
	},
	{
		jp: "霙が降ります",
		kana: "みぞれがふります",
		romaji: "mizoregafurimasu",
	},
	{
		jp: "圧雪です",
		kana: "あっせつです",
		romaji: "assetsudesu",
	},
	{
		jp: "新雪です",
		kana: "しんせつです",
		romaji: "shinsetsudesu",
	},
	{
		jp: "露が降ります",
		kana: "つゆがおります",
		romaji: "tsuyugaoririmasu",
	},
	{
		jp: "霜が降ります",
		kana: "しもがおります",
		romaji: "shimogaoririmasu",
	},
	{
		jp: "霜柱が立ちます",
		kana: "しもばしらがたちます",
		romaji: "shimobashiragatachiimasu",
	},
	{
		jp: "結露します",
		kana: "けつろします",
		romaji: "ketsuroshimasu",
	},
	{
		jp: "雨上がりです",
		kana: "あめあがりです",
		romaji: "ameagariidesu",
	},
	{
		jp: "水たまりがあります",
		kana: "みずたまりがあります",
		romaji: "mizutamarigaariiimasu",
	},
	{
		jp: "地面が湿っています",
		kana: "じめんがしめっています",
		romaji: "jimensagashimteteiimasu",
	},
	{
		jp: "気圧が下がります",
		kana: "きあつがさがります",
		romaji: "kiatsusagagrimasu",
	},
	{
		jp: "気圧が上がります",
		kana: "きあつがあがります",
		romaji: "kiatsugaagrimasu",
	},
	{
		jp: "低気圧です",
		kana: "ていきあつです",
		romaji: "teiikiatsdesu",
	},
	{
		jp: "高気圧です",
		kana: "こうきあつです",
		romaji: "koukiatsdesu",
	},
	{
		jp: "前線が近づきます",
		kana: "ぜんせんがちかづきます",
		romaji: "zensengachikadukimasu",
	},
	{
		jp: "大雨警報です",
		kana: "おおあめけいほうです",
		romaji: "oosameekeihoudesu",
	},
	{
		jp: "大雪警報です",
		kana: "おおゆきけいほうです",
		romaji: "ooyukikeihousedesu",
	},
	{
		jp: "暴風警報が出ました",
		kana: "ぼうふうけいほうがでました",
		romaji: "boufuukeihouseagadedemashita",
	},
	{
		jp: "波浪警報です",
		kana: "はろうけいほうです",
		romaji: "haroukeihousedesu",
	},
	{
		jp: "雷注意報です",
		kana: "かみなりちゅういほうです",
		romaji: "kaminarichiuuihousedesu",
	},
	{
		jp: "亜熱帯気候です",
		kana: "あねったいきこうです",
		romaji: "anettaikikoudesu",
	},
	{
		jp: "温帯気候です",
		kana: "おんたいきこうです",
		romaji: "ontaikikoudesu",
	},
	{
		jp: "寒帯気候です",
		kana: "かんたいきこうです",
		romaji: "kantaikikoudesu",
	},
	{
		jp: "熱帯気候です",
		kana: "ねったいきこうです",
		romaji: "nettaikikoudesu",
	},
	{
		jp: "今日はいい天気です",
		kana: "きょうはいいてんきです",
		romaji: "kyouhaiiteenkidesu",
	},
	{
		jp: "天気がいいです",
		kana: "てんきがいいです",
		romaji: "teenkigaiidesu",
	},
	{
		jp: "天気が悪いです",
		kana: "てんきがわるいです",
		romaji: "teenkigawaruidesu",
	},
	{
		jp: "雨の日です",
		kana: "あめのひです",
		romaji: "amenohidesu",
	},
	{
		jp: "晴れの日です",
		kana: "はれのひです",
		romaji: "harenohidesu",
	},
	{
		jp: "曇りの日です",
		kana: "くもりのひです",
		romaji: "kumorinohidesu",
	},
	{
		jp: "ぐずついた天気です",
		kana: "ぐずついたてんきです",
		romaji: "guzutsuittatenきdesu",
	},
	{
		jp: "スッキリした天気です",
		kana: "すっきりしたてんきです",
		romaji: "sukkkirishatatenきdesu",
	},
	{
		jp: "大気が澄んでいます",
		kana: "たいきがすんでいます",
		romaji: "taikigasundeiteimasu",
	},
	{
		jp: "空気が清々しいです",
		kana: "くうきがすがすがしいです",
		romaji: "kuukigasugasugashiiidesu",
	},
	{
		jp: "空気が淀んでいます",
		kana: "くうきがよどんでいます",
		romaji: "kuukigayodondeiteimasu",
	},
	{
		jp: "硫黄の匂いです",
		kana: "いおうのにおいです",
		romaji: "iounonioidesu",
	},
	{
		jp: "空気が冷えています",
		kana: "くうきがさめています",
		romaji: "kuukigasameteiimasu",
	},
	{
		jp: "雪が積もります",
		kana: "ゆきがつもります",
		romaji: "yukigatumomimasu",
	},
	{
		jp: "雪が解けます",
		kana: "ゆきがとけます",
		romaji: "yukigatokemasu",
	},
	{
		jp: "雪道です",
		kana: "ゆきみちです",
		romaji: "yukimichidesu",
	},
	{
		jp: "路面が凍っています",
		kana: "ろめんがこおっています",
		romaji: "romenngakootteimasu",
	},
	{
		jp: "つらら下がっています",
		kana: "つららさがっています",
		romaji: "tsurarlasagateimasu",
	},
	{
		jp: "粉雪です",
		kana: "こなゆきです",
		romaji: "konayukidesu",
	},
	{
		jp: "べたべた雪です",
		kana: "べたべたゆきです",
		romaji: "betabetayukidesu",
	},
	{
		jp: "朝露があります",
		kana: "あさつゆがあります",
		romaji: "asatsuygaariiimasu",
	},
	{
		jp: "霜が降りています",
		kana: "しもがおりています",
		romaji: "shimogaoriiteimasu",
	},
	{
		jp: "霜焼けします",
		kana: "しもやけします",
		romaji: "shimoyakeshimasu",
	},
	{
		jp: "虹が二重です",
		kana: "にじがにじゅうです",
		romaji: "nijiganjuudesu",
	},
	{
		jp: "月の周りに光冠があります",
		kana: "つきのまわりにひかりかんむりがあります",
		romaji: "tsukinomawarinikarikaanmurigaariiimasu",
	},
	{
		jp: "太陽の周りに暈があります",
		kana: "たいようのまわりにかさがあります",
		romaji: "taiyoumawarinokasagaariiimasu",
	},
	{
		jp: "明け方です",
		kana: "あけがたです",
		romaji: "akegatatdesu",
	},
	{
		jp: "昼間です",
		kana: "ひるまです",
		romaji: "hirumadesu",
	},
	{
		jp: "午後は曇りです",
		kana: "ごごはくもりです",
		romaji: "gogohakumoidesu",
	},
	{
		jp: "夜明けです",
		kana: "よあけです",
		romaji: "yoakdesu",
	},
	{
		jp: "夜中です",
		kana: "よなかです",
		romaji: "yonakadesu",
	},
	{
		jp: "未明です",
		kana: "みめいです",
		romaji: "mimeidesu",
	},
	{
		jp: "明日は雨です",
		kana: "あしたはあめです",
		romaji: "ashitahaamedesu",
	},
	{
		jp: "明後日は晴れます",
		kana: "あさってははれます",
		romaji: "asattehaharemasu",
	},
	{
		jp: "週末は雪の予報です",
		kana: "しゅうまつはゆきのよほうです",
		romaji: "shuumatsuahayukinoyohousedesu",
	},
	{
		jp: "降水確率が高いです",
		kana: "こうすいかくりつがたかいです",
		romaji: "kousaikakuritsugatakaidesu",
	},
	{
		jp: "気象情報です",
		kana: "きしょうじょうほうです",
		romaji: "kishioujouhousedesu",
	},
	{
		jp: "天気予報です",
		kana: "てんきよほうです",
		romaji: "teenkiyohousedesu",
	},
	{
		jp: "フェーン現象です",
		kana: "ふぇーんげんしょうです",
		romaji: "feengenshousedesu",
	},
	{
		jp: "からっ風です",
		kana: "からっかぜです",
		romaji: "karakkazedesu",
	},
	{
		jp: "モンスーンです",
		kana: "もんすーんです",
		romaji: "monsuu-ndesu",
	},
	{
		jp: "スコールです",
		kana: "すこーるです",
		romaji: "suko-rudesu",
	},
	{
		jp: "ハリケーンです",
		kana: "はりけーんです",
		romaji: "harike-ndesu",
	},
	{
		jp: "竜巻です",
		kana: "たつまきです",
		romaji: "tsutumakidesu",
	},
	{
		jp: "空がどんよりしています",
		kana: "そらがどんよりしています",
		romaji: "soragadonyrrishiteiimasu",
	},
	{
		jp: "空が赤いです",
		kana: "そらがあかいです",
		romaji: "saragaakaiidesu",
	},
	{
		jp: "空が暗いです",
		kana: "そらがくらいです",
		romaji: "saragakuraidesu",
	},
	{
		jp: "空が明るいです",
		kana: "そらがあかるいです",
		romaji: "saragaakaruidesu",
	},
	{
		jp: "今朝は寒いです",
		kana: "けさはさむいです",
		romaji: "kesahasamuidesu",
	},
	{
		jp: "昨日は暑かったです",
		kana: "きのうはあつかったです",
		romaji: "kinouhaatsukattadesu",
	},
	{
		jp: "一日中雨でした",
		kana: "いちにちじゅうあめでした",
		romaji: "ichinichjuuamedeshita",
	},
	{
		jp: "最近は涼しいです",
		kana: "さいきんはすずしいです",
		romaji: "saikinhhasuzushiiidesu",
	},
	{
		jp: "気温の変化が激しいです",
		kana: "きおんのへんかがはげしいです",
		romaji: "kionnohenkagahagehshiiidesu",
	},
	{
		jp: "湿度が気になります",
		kana: "しっどがきになります",
		romaji: "shittogakininarimasu",
	},
	{
		jp: "蒸し蒸しした一日です",
		kana: "むしむししたいちにちです",
		romaji: "mushimushishitaichinichidesu",
	},
	{
		jp: "さっぱりした天気です",
		kana: "さっぱりしたてんきです",
		romaji: "sapprishitatenきdesu",
	},
	{
		jp: "しとしと雨です",
		kana: "しとしとあめです",
		romaji: "shitoshitoamedesu",
	},
	{
		jp: "ざあざあ降ります",
		kana: "ざあざあふります",
		romaji: "zaazaafurimasu",
	},
	{
		jp: "砂嵐です",
		kana: "すなあらしです",
		romaji: "sunaarashidesu",
	},
	{
		jp: "ダストストームです",
		kana: "だすときょうもです",
		romaji: "dasutokkyoumodesu",
	},
	{
		jp: "火山灰が降ります",
		kana: "かざんはいがふります",
		romaji: "kazanhaigafurimasu",
	},
	{
		jp: "スモッグです",
		kana: "すもっぐです",
		romaji: "sumoggdesu",
	},
	{
		jp: "黄砂です",
		kana: "こうさです",
		romaji: "kousadesu",
	},
	{
		jp: "光化学スモッグです",
		kana: "こうかがくすもっぐです",
		romaji: "koukagakusumoggdesu",
	},
	{
		jp: "過ごしやすいです",
		kana: "すごしやすいです",
		romaji: "sugoshiyasuitdesu",
	},
	{
		jp: "過ごしにくいです",
		kana: "すごしにくいです",
		romaji: "sugoshnnikuidesu",
	},
	{
		jp: "快適です",
		kana: "かいてきです",
		romaji: "kaitektdesu",
	},
	{
		jp: "不快です",
		kana: "ふかいです",
		romaji: "fukaidesu",
	},
	{
		jp: "リラックスできます",
		kana: "りらっくすできます",
		romaji: "riraksudekimasu",
	},
	{
		jp: "ストレスを感じます",
		kana: "すとれすをかんじます",
		romaji: "sutoresuwokanjimasu",
	},
	{
		jp: "平年並みです",
		kana: "へいねんなみです",
		romaji: "heinnennnamiidesu",
	},
	{
		jp: "平年より暖かいです",
		kana: "へいねんよりあたたかいです",
		romaji: "heinnenyoriatatakaidesu",
	},
	{
		jp: "平年より冷え込みます",
		kana: "へいねんよりひえこみます",
		romaji: "heinnenyorhiiekomiimasu",
	},
	{
		jp: "異常気象です",
		kana: "いじょうきしょうです",
		romaji: "ijouukishoudesu",
	},
	{
		jp: "記録的です",
		kana: "きろくてきです",
		romaji: "kirokutektdesu",
	},
	{
		jp: "観測史上です",
		kana: "かんそくしじょうです",
		romaji: "kansokushijoudesu",
	},
	{
		jp: "明け方に雨です",
		kana: "あけがたにあめです",
		romaji: "akegataninamedesu",
	},
	{
		jp: "一時的に雨です",
		kana: "いちじてきにあめです",
		romaji: "ichitektninamedesu",
	},
	{
		jp: "所により雨です",
		kana: "ところにより雨です",
		romaji: "tokoroniyoriamedesu",
	},
	{
		jp: "お昼過ぎに雨です",
		kana: "おひるすぎにあめです",
		romaji: "ohirusuginninamedesu",
	},
	{
		jp: "夜中に雪に変わります",
		kana: "よなかにゆきにかわります",
		romaji: "yonakayukinnikawariimasu",
	},
	{
		jp: "早朝は気温が低いです",
		kana: "そうちょうはきおんがひくいです",
		romaji: "souchohakiongahikuidesu",
	},
	{
		jp: "蜃気楼が見えます",
		kana: "しんきろうがみえます",
		romaji: "shinkirougamieemasu",
	},
	{
		jp: "落雷があります",
		kana: "らくらいがあります",
		romaji: "rakuraigariiimasu",
	},
	{
		jp: "激しい突風です",
		kana: "はげしいとっぷうです",
		romaji: "hageshiitoppuudesu",
	},
	{
		jp: "豊かな降水です",
		kana: "ゆたかなこうすいです",
		romaji: "yutakanakousuidesu",
	},
	{
		jp: "気象庁の情報です",
		kana: "きしょうちょうのじょうほうです",
		romaji: "kishoucho-nojouhousedesu",
	},
	{
		jp: "警報が発令されました",
		kana: "けいほうがはつれいされました",
		romaji: "keihouagahatsureisaremashita",
	},
	{
		jp: "注意報が出ています",
		kana: "ちゅういほうがでています",
		romaji: "chuuihougadeiteimasu",
	},
	{
		jp: "真夏日です",
		kana: "ままなつびです",
		romaji: "mamatsuviidesu",
	},
	{
		jp: "猛暑日です",
		kana: "もうしょびです",
		romaji: "moushoviidesu",
	},
	{
		jp: "熱帯夜です",
		kana: "ねったいやです",
		romaji: "nettaiyadesu",
	},
	{
		jp: "冬日です",
		kana: "ふゆびです",
		romaji: "fuyubiidesu",
	},
	{
		jp: "真冬日です",
		kana: "ままふゆびです",
		romaji: "mafuyubiidesu",
	},
	{
		jp: "十勝晴れです",
		kana: "とかちばれです",
		romaji: "tokachibaredesu",
	},
	{
		jp: "チヌークです",
		kana: "ちぬーくです",
		romaji: "chinu-kudesu",
	},
	{
		jp: "シロッコです",
		kana: "しろっこです",
		romaji: "shirokodesu",
	},
	{
		jp: "等温線が密集しています",
		kana: "とうおんせんがみっしゅうしています",
		romaji: "touonsengamissushushiteimasu",
	},
	{
		jp: "気象衛星です",
		kana: "きしょうえいせいです",
		romaji: "kishoueiseiidesu",
	},
	{
		jp: "レーダーが感知します",
		kana: "れーだーがかんちします",
		romaji: "re-da-agakanchishimasu",
	},
	{
		jp: "計測雨量です",
		kana: "けいそくうりょうです",
		romaji: "keisokuuryousedesu",
	},
	{
		jp: "仕事が忙しい",
		kana: "しごとがいそがしい",
		romaji: "shigotogaisogashii",
	},
	{
		jp: "毎日働く",
		kana: "まいにちはたらく",
		romaji: "mainichihatarakу",
	},
	{
		jp: "仕事をやめたい",
		kana: "しごとをやめたい",
		romaji: "shigotowoyametai",
	},
	{
		jp: "仕事は大変です",
		kana: "しごとはたいへんです",
		romaji: "shigotohataihendesu",
	},
	{
		jp: "朝早く起きる",
		kana: "あさはやくおきる",
		romaji: "asahayakuokiru",
	},
	{
		jp: "昼食を食べる",
		kana: "ちゅうしょくをたべる",
		romaji: "chuushokuwotaberu",
	},
	{
		jp: "夜遅く帰宅する",
		kana: "よるおそくきたくする",
		romaji: "yuruosoкukitakusuru",
	},
	{
		jp: "残業が多い",
		kana: "ざんぎょうがおおい",
		romaji: "zangyougaooi",
	},
	{
		jp: "休暇を取る",
		kana: "きゅうかをとる",
		romaji: "kyuukawotoru",
	},
	{
		jp: "仕事を終わる",
		kana: "しごとをおわる",
		romaji: "shigotowoowarу",
	},
	{
		jp: "会社に行く",
		kana: "かいしゃにいく",
		romaji: "kaishaниiку",
	},
	{
		jp: "オフィスは静か",
		kana: "おふぃすはしずか",
		romaji: "ofisuhashizuka",
	},
	{
		jp: "デスクで作業する",
		kana: "ですくでさぎょうする",
		romaji: "desukudesagyousuru",
	},
	{
		jp: "会議室に入る",
		kana: "かいぎしつにはいる",
		romaji: "kaigiштsunihairu",
	},
	{
		jp: "電話に出る",
		kana: "でんわにでる",
		romaji: "denwanideru",
	},
	{
		jp: "メールを送る",
		kana: "めーるをおくる",
		romaji: "meeruwoокuru",
	},
	{
		jp: "資料を作成する",
		kana: "しりょうをさくせいする",
		romaji: "shiryouwsakuseisuru",
	},
	{
		jp: "書類をまとめる",
		kana: "しょるいをまとめる",
		romaji: "shoruiwomatomeru",
	},
	{
		jp: "印鑑を押す",
		kana: "いんかんをおす",
		romaji: "inkanuwoоsu",
	},
	{
		jp: "パソコンで作業",
		kana: "ぱそこんでさぎょう",
		romaji: "pasokondesagyou",
	},
	{
		jp: "上司と話す",
		kana: "じょうしとはなす",
		romaji: "joushiptohanasи",
	},
	{
		jp: "同僚が手伝う",
		kana: "どうりょうがてつだう",
		romaji: "douryougateъudau",
	},
	{
		jp: "新人を教える",
		kana: "しんじんをおしえる",
		romaji: "shinjinwοoshieru",
	},
	{
		jp: "会社の人と食事",
		kana: "かいしゃのひととしょくじ",
		romaji: "kaishanonhitotoshokuji",
	},
	{
		jp: "同期入社の友達",
		kana: "どうきにゅうしゃのともだち",
		romaji: "doukinyyoushanotоmodachi",
	},
	{
		jp: "部長に報告する",
		kana: "ぶちょうにほうこくする",
		romaji: "buchounhokokuسuru",
	},
	{
		jp: "チームで協力",
		kana: "ちーむできょうりょく",
		romaji: "chiimudekyouryoku",
	},
	{
		jp: "職場の環境がいい",
		kana: "しょくばのかんきょうがいい",
		romaji: "shokubanokankyougaii",
	},
	{
		jp: "人間関係が大事",
		kana: "にんげんかんけいがたいじ",
		romaji: "ningenkankeigataiji",
	},
	{
		jp: "上司の指示を聞く",
		kana: "じょうしのしじをきく",
		romaji: "joushinoshijiwokiku",
	},
	{
		jp: "給料が安い",
		kana: "きゅうりょうがやすい",
		romaji: "kyuuryougayasui",
	},
	{
		jp: "ボーナスをもらう",
		kana: "ぼーなすをもらう",
		romaji: "boonasuwomorau",
	},
	{
		jp: "昇進する",
		kana: "しょうしんする",
		romaji: "shoushinsuruします",
	},
	{
		jp: "退職金を受け取る",
		kana: "たいしょくきんをうけとる",
		romaji: "taishokukinwouketoru",
	},
	{
		jp: "有給休暇がある",
		kana: "ゆうきゅうきゅうかがある",
		romaji: "yuukyuukyuukagaaru",
	},
	{
		jp: "健康保険に入る",
		kana: "けんこうほけんにはいる",
		romaji: "kenkouhokenниhairu",
	},
	{
		jp: "福利厚生がいい",
		kana: "ふくりこうせいがいい",
		romaji: "fukurikouseigaii",
	},
	{
		jp: "給与明細を確認",
		kana: "きゅうよめいさいをかくにん",
		romaji: "kyuuyomeisaiwокakυnin",
	},
	{
		jp: "年収を上げたい",
		kana: "ねんしゅうをあげたい",
		romaji: "nenshуuwoagetai",
	},
	{
		jp: "退職を考える",
		kana: "たいしょくをかんがえる",
		romaji: "taishokuwokangaeru",
	},
	{
		jp: "朝礼に参加する",
		kana: "ちょうれいにさんかする",
		romaji: "choureinisankasuru",
	},
	{
		jp: "終礼で報告",
		kana: "しゅうれいでほうこく",
		romaji: "shuureidehokoku",
	},
	{
		jp: "日報を書く",
		kana: "にっぽうをかく",
		romaji: "nippouwokaku",
	},
	{
		jp: "進捗を報告する",
		kana: "しんちょくをほうこくする",
		romaji: "shinchokuwohokukusuru",
	},
	{
		jp: "プロジェクトを管理",
		kana: "ぷろじぇくとをかんり",
		romaji: "purojekutowokamri",
	},
	{
		jp: "締め切りに間に合わせる",
		kana: "しめきりにまにあわせる",
		romaji: "shimekirinimamiawaseru",
	},
	{
		jp: "顧客と打ち合わせ",
		kana: "こきゃくとうちあわせ",
		romaji: "kokyakutouchiawase",
	},
	{
		jp: "見積もりを出す",
		kana: "みつもりをだす",
		romaji: "mitsumoriwodasu",
	},
	{
		jp: "請求書を作成",
		kana: "せいきゅうしょをさくせい",
		romaji: "seikyuushowsakusei",
	},
	{
		jp: "納期を守る",
		kana: "のうきをまもる",
		romaji: "noukiwomamoru",
	},
	{
		jp: "仕事でストレス",
		kana: "しごとですとれす",
		romaji: "shigotodestoresu",
	},
	{
		jp: "やる気がない",
		kana: "やるきがない",
		romaji: "yarukiganai",
	},
	{
		jp: "仕事がつまらない",
		kana: "しごとがつまらない",
		romaji: "shigotogatsumaeranai",
	},
	{
		jp: "人間関係が難しい",
		kana: "にんげんかんけいがむずかしい",
		romaji: "ningenkankeigamuzkashii",
	},
	{
		jp: "失敗した",
		kana: "しっぱいした",
		romaji: "shippaisita",
	},
	{
		jp: "ミスを犯した",
		kana: "みすをおかした",
		romaji: "misuwookasita",
	},
	{
		jp: "怒られた",
		kana: "おこられた",
		romaji: "okorareta",
	},
	{
		jp: "評価が低い",
		kana: "ひょうかがひくい",
		romaji: "hyoukagahikui",
	},
	{
		jp: "仕事と生活のバランス",
		kana: "しごととせいかつのばらんす",
		romaji: "shigototoseikatsunvobaransu",
	},
	{
		jp: "営業成績を上げる",
		kana: "えいぎょうせいせきをあげる",
		romaji: "eigyouseisakiwoageru",
	},
	{
		jp: "企画を提案する",
		kana: "きかくをていあんする",
		romaji: "kikakuwoテiainsuru",
	},
	{
		jp: "制度を改善する",
		kana: "せいどをかいぜんする",
		romaji: "seidowokaizensuru",
	},
	{
		jp: "マーケティング戦略",
		kana: "まーけてぃんぐせんりゃく",
		romaji: "maaketinggusenryaku",
	},
	{
		jp: "予算を管理する",
		kana: "よさんをかんりする",
		romaji: "yosanwokamrisuru",
	},
	{
		jp: "経理を処理する",
		kana: "けいりをしょりする",
		romaji: "keiriwosorisuru",
	},
	{
		jp: "人事異動がある",
		kana: "じんじいどうがある",
		romaji: "jinjidougaaru",
	},
	{
		jp: "採用試験を受ける",
		kana: "さいようしけんをうける",
		romaji: "saiyoushikenwoukeru",
	},
	{
		jp: "研修に参加",
		kana: "けんしゅうにさんか",
		romaji: "kenshuunisanka",
	},
	{
		jp: "資格を取得する",
		kana: "しかくをしゅとくする",
		romaji: "shakakuwoshutokusuru",
	},
	{
		jp: "オフィスが広い",
		kana: "おふぃすがひろい",
		romaji: "ofisugahiroi",
	},
	{
		jp: "机が狭い",
		kana: "つくえがせまい",
		romaji: "tsukuegasemai",
	},
	{
		jp: "椅子が不快",
		kana: "いすがふかい",
		romaji: "isugafukai",
	},
	{
		jp: "ネット環境がいい",
		kana: "ねっとかんきょうがいい",
		romaji: "nettokankyougaii",
	},
	{
		jp: "エアコンが効く",
		kana: "えあこんがきく",
		romaji: "eakonngakiku",
	},
	{
		jp: "照明が暗い",
		kana: "しょうめいがくらい",
		romaji: "shoumeiigakurai",
	},
	{
		jp: "騒音が多い",
		kana: "そうおんがおおい",
		romaji: "souongaooi",
	},
	{
		jp: "カフェがある",
		kana: "かふぇがある",
		romaji: "kafegaaru",
	},
	{
		jp: "トイレがきれい",
		kana: "といれがきれい",
		romaji: "toiregakirei",
	},
	{
		jp: "駐車場がない",
		kana: "ちゅうしゃじょうがない",
		romaji: "chuushajougaнai",
	},
	{
		jp: "通勤に時間がかかる",
		kana: "つうきんにじかんがかかる",
		romaji: "tsuukinnjikanngakakaru",
	},
	{
		jp: "電車で通う",
		kana: "でんしゃでかよう",
		romaji: "denshadeкayou",
	},
	{
		jp: "車で出勤",
		kana: "くるまでしゅっきん",
		romaji: "kurumadeshukkinn",
	},
	{
		jp: "自転車で移動",
		kana: "じてんしゃでいどう",
		romaji: "jitenshadeидou",
	},
	{
		jp: "渋滞に引っかかる",
		kana: "じゅうたいにひっかかる",
		romaji: "juutainihukkakaru",
	},
	{
		jp: "駅から歩く",
		kana: "えきからあるく",
		romaji: "ekikaraaruku",
	},
	{
		jp: "朝の時間がない",
		kana: "あさのじかんがない",
		romaji: "asanonojikannganai",
	},
	{
		jp: "帰宅が遅い",
		kana: "きたくがおそい",
		romaji: "kitakugaosoi",
	},
	{
		jp: "通勤ラッシュ",
		kana: "つうきんらっしゅ",
		romaji: "tsuukinrashu",
	},
	{
		jp: "交通費を払う",
		kana: "こうつうひをはらう",
		romaji: "koutouhiwoharau",
	},
	{
		jp: "仕事にやりがいがある",
		kana: "しごとにやりがいがある",
		romaji: "shigotonivarugaigaaru",
	},
	{
		jp: "やりたい仕事をしている",
		kana: "やりたいしごとをしている",
		romaji: "yaritaishigotowoshiteru",
	},
	{
		jp: "成長できている",
		kana: "せいちょうできている",
		romaji: "seichangdekiteru",
	},
	{
		jp: "仕事が充実している",
		kana: "しごとがじゅうじつしている",
		romaji: "shigotogajuujutsushiteru",
	},
	{
		jp: "給料に満足",
		kana: "きゅうりょうにまんぞく",
		romaji: "kyuuryounimanзoku",
	},
	{
		jp: "ポジティブに働く",
		kana: "ぽじてぃぶにはたらく",
		romaji: "pojitibunihatarakи",
	},
	{
		jp: "やりがいを感じる",
		kana: "やりがいをかんじる",
		romaji: "yarugaiwokanjiru",
	},
	{
		jp: "目標を達成した",
		kana: "もくひょうをたっせいした",
		romaji: "mokuhyouwatasseisita",
	},
	{
		jp: "昇進した",
		kana: "しょうしんした",
		romaji: "shoushinsita",
	},
	{
		jp: "信頼を得ている",
		kana: "しんらいをえている",
		romaji: "sinraiwоeteru",
	},
	{
		jp: "会議は長い",
		kana: "かいぎはながい",
		romaji: "kaigihanakai",
	},
	{
		jp: "オンライン会議",
		kana: "おんらいんかいぎ",
		romaji: "onrainкaigi",
	},
	{
		jp: "資料を配布する",
		kana: "しりょうをはいふする",
		romaji: "shiryouwahaifusuru",
	},
	{
		jp: "意見を述べる",
		kana: "いけんをのべる",
		romaji: "ikenwonoвeru",
	},
	{
		jp: "決定を待つ",
		kana: "けっていをまつ",
		romaji: "ketteiwoмatsu",
	},
	{
		jp: "議論が活発",
		kana: "ぎろんがかっぱつ",
		romaji: "girongakappatu",
	},
	{
		jp: "議題を決める",
		kana: "ぎだいをきめる",
		romaji: "gidaiwoкimeru",
	},
	{
		jp: "会議の出席が多い",
		kana: "かいぎのしゅっせきがおおい",
		romaji: "kaigino shuшseкigaooi",
	},
	{
		jp: "打ち合わせが増えた",
		kana: "うちあわせがふえた",
		romaji: "uchiawasegafueta",
	},
	{
		jp: "会議を短縮したい",
		kana: "かいぎをたんしゅくしたい",
		romaji: "kaigiwoтanshukushitai",
	},
	{
		jp: "新しいスキルを学ぶ",
		kana: "あたらしいすきるをまなぶ",
		romaji: "atarasiisukiruwomanabи",
	},
	{
		jp: "プログラミングを勉強",
		kana: "ぷろぐらみんぐをべんきょう",
		romaji: "purogurамinnguwobenkyo",
	},
	{
		jp: "語学を上達させる",
		kana: "ごがくをじょうたつさせる",
		romaji: "gogakuwojoutatsusaseru",
	},
	{
		jp: "経験を積む",
		kana: "けいけんをつむ",
		romaji: "keikenwotsuму",
	},
	{
		jp: "知識を深める",
		kana: "ちしきをふかめる",
		romaji: "chisikiwoфукамеru",
	},
	{
		jp: "セミナーに出席",
		kana: "せみなーにしゅっせき",
		romaji: "seminaaninshusseki",
	},
	{
		jp: "資格試験を受ける",
		kana: "しかくしけんをうける",
		romaji: "sakakushikenwoukeru",
	},
	{
		jp: "指導を受ける",
		kana: "しどうをうける",
		romaji: "sidowoukeru",
	},
	{
		jp: "先輩から学ぶ",
		kana: "せんぱいからまなぶ",
		romaji: "senpaiekараmanabι",
	},
	{
		jp: "実践で磨く",
		kana: "じっせんでみがく",
		romaji: "jissendemiгakи",
	},
	{
		jp: "営業職で働く",
		kana: "えいぎょうしょくではたらく",
		romaji: "eigyoushokudehatarakи",
	},
	{
		jp: "事務職です",
		kana: "じむしょくです",
		romaji: "jimushokudesu",
	},
	{
		jp: "企画部門にいる",
		kana: "きかくぶもんにいる",
		romaji: "kikakubumonnniiru",
	},
	{
		jp: "管理職になった",
		kana: "かんりしょくになった",
		romaji: "kanrishokuninatta",
	},
	{
		jp: "技術職を目指す",
		kana: "ぎじゅつしょくをめざす",
		romaji: "gijutsushokuwoмezasu",
	},
	{
		jp: "営業成績がいい",
		kana: "えいぎょうせいせきがいい",
		romaji: "eigyouseisekigaii",
	},
	{
		jp: "専門性を持つ",
		kana: "せんもんせいをもつ",
		romaji: "senmonseiwomtsu",
	},
	{
		jp: "キャリアパス",
		kana: "きゃりあぱす",
		romaji: "kyariapasu",
	},
	{
		jp: "異業種に転職",
		kana: "いぎょうしゅにてんしょく",
		romaji: "igyoushutennshoкu",
	},
	{
		jp: "職種を変える",
		kana: "しょくしゅをかえる",
		romaji: "shokushuwokaeiru",
	},
	{
		jp: "リモートワーク",
		kana: "りもーとわーく",
		romaji: "rimootowaku",
	},
	{
		jp: "テレワークが増える",
		kana: "てれわーくがふえる",
		romaji: "telewakugafueru",
	},
	{
		jp: "デジタル化が進む",
		kana: "でじたるかがすすむ",
		romaji: "deijitarukagasusumu",
	},
	{
		jp: "業務効率化",
		kana: "ぎょうむこうりつか",
		romaji: "gyoumukourituka",
	},
	{
		jp: "自動化が進展",
		kana: "じどうかがしんてん",
		romaji: "jidoukagashinten",
	},
	{
		jp: "働き方改革",
		kana: "はたらきかたかいかく",
		romaji: "hatarakikatakaikaku",
	},
	{
		jp: "柔軟な勤務形態",
		kana: "じゅうなんなきんむけいたい",
		romaji: "juunannakinmukeitai",
	},
	{
		jp: "在宅勤務が増える",
		kana: "ざいたくきんむがふえる",
		romaji: "zaitakukinmugafueru",
	},
	{
		jp: "フレックス制度",
		kana: "ふれっくすせいど",
		romaji: "furekususeido",
	},
	{
		jp: "多様な働き方",
		kana: "たようなはたらきかた",
		romaji: "tayounahatarakikata",
	},
	{
		jp: "プレゼンテーションをする",
		kana: "ぷれぜんてーしょんをする",
		romaji: "purezentesyonwosuru",
	},
	{
		jp: "ドキュメントを作成",
		kana: "どきゅめんとをさくせい",
		romaji: "dokyumenutowakusei",
	},
	{
		jp: "データベースにアクセス",
		kana: "でーたべーすにあくせす",
		romaji: "deetabeesunиakusesu",
	},
	{
		jp: "クラウドで管理",
		kana: "くらうどでかんり",
		romaji: "kuraудodekanri",
	},
	{
		jp: "バックアップを取る",
		kana: "ばっくあっぷをとる",
		romaji: "bakkuappuwotoru",
	},
	{
		jp: "システムが落ちた",
		kana: "しすてむがおちた",
		romaji: "системugaochita",
	},
	{
		jp: "サーバーエラー",
		kana: "さーばーえらー",
		romaji: "saabaaeraa",
	},
	{
		jp: "セキュリティを強化",
		kana: "せきゅりてぃをきょうか",
		romaji: "sekyuriteiwokyo^ka",
	},
	{
		jp: "パスワードを変更",
		kana: "ぱすわーどをへんこう",
		romaji: "pasuwaadowohenкou",
	},
	{
		jp: "ログインできない",
		kana: "ろぐいんできない",
		romaji: "ログインdekinai",
	},
	{
		jp: "契約書にサイン",
		kana: "けいやくしょにさいん",
		romaji: "keiyakushoniisain",
	},
	{
		jp: "条件を交渉",
		kana: "じょうけんをこうしょう",
		romaji: "joukenwokoushou",
	},
	{
		jp: "違約金が発生",
		kana: "いやくきんがはっせい",
		romaji: "iyakukinngahassei",
	},
	{
		jp: "著作権を保護",
		kana: "ちょさくけんをほご",
		romaji: "chossakukenwohogo",
	},
	{
		jp: "非公開契約",
		kana: "ひこうかいけいやく",
		romaji: "hikoukaikeiyaku",
	},
	{
		jp: "コンプライアンス",
		kana: "こんぷらいあんす",
		romaji: "konpuraiansu",
	},
	{
		jp: "法令遵守",
		kana: "ほうれいじゅんしゅ",
		romaji: "houreiijunshuu",
	},
	{
		jp: "規約を確認",
		kana: "きやくをかくにん",
		romaji: "kiyakuwokakυnin",
	},
	{
		jp: "契約更新",
		kana: "けいやくこうしん",
		romaji: "keiyakukoushin",
	},
	{
		jp: "解約手続き",
		kana: "かいやくてつづき",
		romaji: "kaiyakutetsuduki",
	},
	{
		jp: "仕入先と連絡",
		kana: "しいれさきとれんらく",
		romaji: "shiiresekitorenraku",
	},
	{
		jp: "発注をする",
		kana: "はっちゅうをする",
		romaji: "hatchuuwosuru",
	},
	{
		jp: "納期が遅れた",
		kana: "のうきがおくれた",
		romaji: "nouкigaokureta",
	},
	{
		jp: "品質管理をする",
		kana: "ひんしつかんりをする",
		romaji: "hinsitsukanriwosuru",
	},
	{
		jp: "在庫確認",
		kana: "ざいこかくにん",
		romaji: "zaikokakυnin",
	},
	{
		jp: "在庫が不足",
		kana: "ざいこがぶそく",
		romaji: "zaicogabusoku",
	},
	{
		jp: "配送手配",
		kana: "はいそうてはい",
		romaji: "haisouteasen",
	},
	{
		jp: "ロジスティクス",
		kana: "ろじすてぃくす",
		romaji: "rojisutikasu",
	},
	{
		jp: "コスト削減",
		kana: "こすとさくげん",
		romaji: "kosutοsakugen",
	},
	{
		jp: "顧客対応",
		kana: "こきゃくたいおう",
		romaji: "kokyakutaiou",
	},
	{
		jp: "営業トークをする",
		kana: "えいぎょうとーくをする",
		romaji: "eigyoutookuwosuru",
	},
	{
		jp: "営業資料を準備",
		kana: "えいぎょうしりょうをじゅんび",
		romaji: "eigyoussiryouwajunbi",
	},
	{
		jp: "見込み客に連絡",
		kana: "みこみきゃくにれんらく",
		romaji: "mikomiky akunirenraku",
	},
	{
		jp: "商品説明をする",
		kana: "しょうひんせつめいをする",
		romaji: "shouhinsetsumeiwoسuru",
	},
	{
		jp: "広告をだす",
		kana: "こうこくをだす",
		romaji: "koukokuwodasu",
	},
	{
		jp: "SNS発信",
		kana: "えすえぬえすはっしん",
		romaji: "esunuesuhassin",
	},
	{
		jp: "ブランドイメージ",
		kana: "ぶらんどいめーじ",
		romaji: "burandoimeji",
	},
	{
		jp: "ターゲット層を分析",
		kana: "たーげっとそうをぶんせき",
		romaji: "taagettosoウwobunсeki",
	},
	{
		jp: "売上目標を達成",
		kana: "うりあげもくひょうをたっせい",
		romaji: "uriagемokuhyoutassei",
	},
	{
		jp: "市場調査をする",
		kana: "しじょうちょうさをする",
		romaji: "shijoucyousawosuru",
	},
	{
		jp: "損益計算書",
		kana: "そんえきけいさんしょ",
		romaji: "soнeкikeisansho",
	},
	{
		jp: "貸借対照表",
		kana: "たいしゃくたいしょうひょう",
		romaji: "taishakutaishouhyou",
	},
	{
		jp: "経費を計算",
		kana: "けいひをけいさん",
		romaji: "keihiwokeiсan",
	},
	{
		jp: "税務申告",
		kana: "ぜいむしんこく",
		romaji: "zeımushinкoku",
	},
	{
		jp: "領収書を発行",
		kana: "りょうしゅうしょをはっこう",
		romaji: "ryoushyuushоwohakkо^u",
	},
	{
		jp: "予算配分",
		kana: "よさんはいぶん",
		romaji: "yosanhaibun",
	},
	{
		jp: "決算時期がくる",
		kana: "けっさんじきがくる",
		romaji: "kessanjikigakuru",
	},
	{
		jp: "監査を受ける",
		kana: "かんさをうける",
		romaji: "kansawoukeru",
	},
	{
		jp: "原価を低減",
		kana: "げんかをていげん",
		romaji: "gencawoтeigen",
	},
	{
		jp: "利益率を改善",
		kana: "りえきりつをかいぜん",
		romaji: "riеkiritsuwoкaizen",
	},
	{
		jp: "雑談をする",
		kana: "ざつだんをする",
		romaji: "zatsudanwosuru",
	},
	{
		jp: "世間話をしゃべる",
		kana: "せけんばなしをしゃべる",
		romaji: "sekenbаnasiwosyaberuуめる",
	},
	{
		jp: "コミュニケーション",
		kana: "こみゅにけーしょん",
		romaji: "komyunike syon",
	},
	{
		jp: "ネットワーキング",
		kana: "ねっとわーきんぐ",
		romaji: "nettowaakingu",
	},
	{
		jp: "飲み会に参加",
		kana: "のみかいにさんか",
		romaji: "nomikaninisanka",
	},
	{
		jp: "同僚と仲がいい",
		kana: "どうりょうとなかがいい",
		romaji: "douryoutοnakagaii",
	},
	{
		jp: "人間関係を築く",
		kana: "にんげんかんけいをきずく",
		romaji: "nigenkanкeiwοkizuku",
	},
	{
		jp: "信頼関係が大切",
		kana: "しんらいかんけいがたいせつ",
		romaji: "sinraiкankeigataisecu",
	},
	{
		jp: "チームワーク",
		kana: "ちーむわーく",
		romaji: "chiimuwaku",
	},
	{
		jp: "協力して進める",
		kana: "きょうりょくしてすすめる",
		romaji: "kyouryoкushiteسusumeru",
	},
];

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
	romaji: r.romaji,
}));

export function getSentenceQueue(count = 10): Sentence[] {
	const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
	const result: Sentence[] = [];
	while (result.length < count) {
		for (const s of shuffled) {
			if (result.length >= count) break;
			result.push(s);
		}
	}
	return result;
}
