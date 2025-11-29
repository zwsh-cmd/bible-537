// === 終極版：完全不依賴外部圖示庫，直接定義 Icon SVG ===
const { useState, useEffect, useCallback } = React;
const { createRoot } = ReactDOM;

// 手動定義圖示組件 (SVG) - 避免 CDN 載入失敗導致白屏
const IconBase = ({ d, className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
    </svg>
);

const Heart = (props) => <IconBase d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" {...props} />;
const Share2 = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const Copy = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const BookOpen = (props) => <IconBase d={["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]} {...props} />;
const X = (props) => <IconBase d={["M18 6 6 18", "M6 6 18 18"]} {...props} />;
const Trash2 = (props) => <IconBase d={["M3 6h18", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", "M10 11v6", "M14 11v6"]} {...props} />;
const History = (props) => <IconBase d={["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12", "M3 3v9h9", "M12 7v5l4 2"]} {...props} />;
const Clock = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Calendar = (props) => <IconBase d={["M8 2v4", "M16 2v4", "M3 10h18", "M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"]} {...props} />;
const PenLine = (props) => <IconBase d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} {...props} />;
const Save = (props) => <IconBase d={["M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", "M17 21v-8H7v8", "M7 3v5h8"]} {...props} />;
const MinusCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const RefreshCw = (props) => <IconBase d={["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 16H3v5"]} {...props} />;
const Edit = (props) => <IconBase d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} {...props} />;

// === 1. 錯誤邊界組件 (防止 App 崩潰導致白屏) ===
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught Error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-red-50 text-red-800 rounded-xl m-4 border-2 border-red-300 shadow-xl">
          <h1 className="text-2xl font-bold mb-2">發生錯誤</h1>
          <p className="mb-4">請嘗試重新整理頁面。</p>
          <pre className="text-xs bg-red-100 p-2 rounded text-left overflow-auto max-w-full w-full">
            {this.state.error && this.state.error.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

// 經文資料庫 (擴充至365條)
const SCRIPTURES = [
    { text: "你不要害怕，因為我與你同在；不要驚惶，因為我是你的神。我必堅固你，我必幫助你，我必用我公義的右手扶持你。", textEn: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", reference: "以賽亞書 41:10", referenceEn: "Isaiah 41:10" },
    { text: "耶和華說：我知道我向你們所懷的意念是賜平安的意念，不是降災禍的意念，要叫你們末後有指望。", textEn: "'For I know the plans I have for you,' declares the LORD, 'plans to prosper you and not to harm you, plans to give you hope and a future.'", reference: "耶利米書 29:11", referenceEn: "Jeremiah 29:11" },
    { text: "凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。", textEn: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "馬太福音 11:28", referenceEn: "Matthew 11:28" },
    { text: "應當一無掛慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。", textEn: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "腓立比書 4:6", referenceEn: "Philippians 4:6" },
    { text: "神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。", textEn: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", reference: "腓立比書 4:7", referenceEn: "Philippians 4:7" },
    { text: "我的恩典夠你用的，因為我的能力是在人的軟弱上顯得完全。", textEn: "My grace is sufficient for you, for my power is made perfect in weakness.", reference: "哥林多後書 12:9", referenceEn: "2 Corinthians 12:9" },
    { text: "你從水中經過，我必與你同在；你趟過江河，水必不漫過你。", textEn: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.", reference: "以賽亞書 43:2", referenceEn: "Isaiah 43:2" },
    { text: "耶和華是我的牧者，我必不致缺乏。", textEn: "The LORD is my shepherd, I lack nothing.", reference: "詩篇 23:1", referenceEn: "Psalm 23:1" },
    { text: "神為愛他的人所預備的，是眼睛未曾看見，耳朵未曾聽見，人心也未曾想到的。", textEn: "What no eye has seen, what no ear has heard, and what no human mind has conceived — the things God has prepared for those who love him.", reference: "哥林多前書 2:9", referenceEn: "1 Corinthians 2:9" },
    { text: "在世上你們有苦難，但你們可以放心，我已經勝了世界。", textEn: "In this world you will have trouble. But take heart! I have overcome the world.", reference: "約翰福音 16:33", referenceEn: "John 16:33" },
    { text: "耶和華必在你前面行，他必與你同在，必不撇下你，也不丟棄你。", textEn: "The LORD himself goes before you and will be with you; he will never leave you nor forsake you.", reference: "申命記 31:8", referenceEn: "Deuteronomy 31:8" },
    { text: "你們祈求，就給你們；尋找，就尋見；叩門，就給你們開門。", textEn: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", reference: "馬太福音 7:7", referenceEn: "Matthew 7:7" },
    { text: "看哪，我站在門外叩門，若有聽見我聲音就開門的，我要進到他那裡去。", textEn: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in.", reference: "啟示錄 3:20", referenceEn: "Revelation 3:20" },
    { text: "喜樂的心乃是良藥，憂傷的靈使骨枯乾。", textEn: "A cheerful heart is good medicine, but a crushed spirit dries up the bones.", reference: "箴言 17:22", referenceEn: "Proverbs 17:22" },
    { text: "靠著那加給我力量的，凡事都能做。", textEn: "I can do all this through him who gives me strength.", reference: "腓立比書 4:13", referenceEn: "Philippians 4:13" },
    { text: "不是倚靠勢力，不是倚靠才能，乃是倚靠我的靈方能成事。", textEn: "Not by might nor by power, but by my Spirit,' says the LORD Almighty.", reference: "撒迦利亞書 4:6", referenceEn: "Zechariah 4:6" },
    { text: "我們曉得萬事都互相效力，叫愛神的人得益處。", textEn: "And we know that in all things God works for the good of those who love him.", reference: "羅馬書 8:28", referenceEn: "Romans 8:28" },
    { text: "你的日子如何，你的力量也必如何。", textEn: "As your days, so shall your strength be.", reference: "申命記 33:25", referenceEn: "Deuteronomy 33:25" },
    { text: "因為神賜給我們，不是膽怯的心，乃是剛強、仁愛、謹守的心。", textEn: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", reference: "提摩太後書 1:7", referenceEn: "2 Timothy 1:7" },
    { text: "耶和華必成全關乎我的事。", textEn: "The LORD will vindicate me.", reference: "詩篇 138:8", referenceEn: "Psalm 138:8" },
    { text: "壓傷的蘆葦，他不折斷；將殘的燈火，他不吹滅。", textEn: "A bruised reed he will not break, and a smoldering wick he will not snuff out.", reference: "以賽亞書 42:3", referenceEn: "Isaiah 42:3" },
    { text: "你們要將一切的憂慮卸給神，因為他顧念你們。", textEn: "Cast all your anxiety on him because he cares for you.", reference: "彼得前書 5:7", referenceEn: "1 Peter 5:7" },
    { text: "耶和華的名是堅固臺，義人奔入便得安穩。", textEn: "The name of the LORD is a fortified tower; the righteous run to it and are safe.", reference: "箴言 18:10", referenceEn: "Proverbs 18:10" },
    { text: "洪水氾濫之時，耶和華坐著為王；耶和華坐著為王，直到永遠。", textEn: "The LORD sits enthroned over the flood; the LORD is enthroned as King forever.", reference: "詩篇 29:10", referenceEn: "Psalm 29:10" },
    { text: "耶和華必賜力量給他的百姓，耶和華必賜平安的福給他的百姓。", textEn: "The LORD gives strength to his people; the LORD blesses his people with peace.", reference: "詩篇 29:11", referenceEn: "Psalm 29:11" },
    { text: "我的心哪，你為何憂悶？為何在我裡面煩躁？應當仰望神。", textEn: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God.", reference: "詩篇 42:5", referenceEn: "Psalm 42:5" },
    { text: "等候耶和華的必從新得力。他們必如鷹展翅上騰。", textEn: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles.", reference: "以賽亞書 40:31", referenceEn: "Isaiah 40:31" },
    { text: "雖然無花果樹不發旺，葡萄樹不結果...然而，我要因耶和華歡欣，因救我的神喜樂。", textEn: "Though the fig tree does not bud and there are no grapes on the vines... yet I will rejoice in the LORD, I will be joyful in God my Savior.", reference: "哈巴谷書 3:17-18", referenceEn: "Habakkuk 3:17-18" },
    { text: "若是神幫助我們，誰能敵擋我們呢？", textEn: "If God is for us, who can be against us?", reference: "羅馬書 8:31", referenceEn: "Romans 8:31" },
    { text: "誰能使我們與基督的愛隔絕呢？難道是患難嗎？是困苦嗎？是逼迫嗎？", textEn: "Who shall separate us from the love of Christ? Shall trouble or hardship or persecution?", reference: "羅馬書 8:35", referenceEn: "Romans 8:35" },
    { text: "然而，靠著愛我們的主，在這一切的事上已經得勝有餘了。", textEn: "No, in all these things we are more than conquerors through him who loved us.", reference: "羅馬書 8:37", referenceEn: "Romans 8:37" },
    { text: "你們要休息，要知道我是神。", textEn: "Be still, and know that I am God.", reference: "詩篇 46:10", referenceEn: "Psalm 46:10" },
    { text: "人心籌算自己的道路，惟耶和華指引他的腳步。", textEn: "In their hearts humans plan their course, but the LORD establishes their steps.", reference: "箴言 16:9", referenceEn: "Proverbs 16:9" },
    { text: "你要專心仰賴耶和華，不可倚靠自己的聰明。", textEn: "Trust in the LORD with all your heart and lean not on your own understanding.", reference: "箴言 3:5", referenceEn: "Proverbs 3:5" },
    { text: "在你一切所行的事上都要認定他，他必指引你的路。", textEn: "In all your ways submit to him, and he will make your paths straight.", reference: "箴言 3:6", referenceEn: "Proverbs 3:6" },
    { text: "白晝，耶和華必向我施慈愛；黑夜，我要歌頌禱告那賜我生命的神。", textEn: "By day the LORD directs his love, at night his song is with me— a prayer to the God of my life.", reference: "詩篇 42:8", referenceEn: "Psalm 42:8" },
    { text: "耶和華靠近傷心的人，拯救靈性痛悔的人。", textEn: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.", reference: "詩篇 34:18", referenceEn: "Psalm 34:18" },
    { text: "義人多有苦難，但耶和華救他脫離這一切。", textEn: "The righteous person may have many troubles, but the LORD delivers him from them all.", reference: "詩篇 34:19", referenceEn: "Psalm 34:19" },
    { text: "神是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。", textEn: "God is our refuge and strength, an ever-present help in trouble.", reference: "詩篇 46:1", referenceEn: "Psalm 46:1" },
    { text: "大山可以挪開，小山可以遷移，但我的慈愛必不離開你。", textEn: "Though the mountains be shaken and the hills be removed, yet my unfailing love for you will not be shaken.", reference: "以賽亞書 54:10", referenceEn: "Isaiah 54:10" },
    { text: "我們不致消滅，是出於耶和華諸般的慈愛，是因他的憐憫不致斷絕。", textEn: "Because of the LORD’s great love we are not consumed, for his compassions never fail.", reference: "耶利米哀歌 3:22", referenceEn: "Lamentations 3:22" },
    { text: "每早晨這都是新的；你的誠實極其廣大。", textEn: "They are new every morning; great is your faithfulness.", reference: "耶利米哀歌 3:23", referenceEn: "Lamentations 3:23" },
    { text: "我要向山舉目；我的幫助從何而來？我的幫助從造天地的耶和華而來。", textEn: "I lift up my eyes to the mountains— where does my help come from? My help comes from the LORD, the Maker of heaven and earth.", reference: "詩篇 121:1-2", referenceEn: "Psalm 121:1-2" },
    { text: "保護你的是耶和華，耶和華在你右邊蔭庇你。", textEn: "The LORD watches over you— the LORD is your shade at your right hand.", reference: "詩篇 121:5", referenceEn: "Psalm 121:5" },
    { text: "你出你入，耶和華要保護你，從今時直到永遠。", textEn: "The LORD will keep your going out and your coming in from this time forth and forevermore.", reference: "詩篇 121:8", referenceEn: "Psalm 121:8" },
    { text: "因此，我的心歡喜，我的靈快樂，我的肉身也要安然居住。", textEn: "Therefore my heart is glad and my tongue rejoices; my body also will rest secure.", reference: "詩篇 16:9", referenceEn: "Psalm 16:9" },
    { text: "你必將生命的道路指示我，在你面前有滿足的喜樂。", textEn: "You make known to me the path of life; you will fill me with joy in your presence.", reference: "詩篇 16:11", referenceEn: "Psalm 16:11" },
    { text: "看哪，神是我的拯救，我要倚靠他，並不懼怕。", textEn: "Surely God is my salvation; I will trust and not be afraid.", reference: "以賽亞書 12:2", referenceEn: "Isaiah 12:2" },
    { text: "凡事都有定期，天下萬務都有定時。", textEn: "There is a time for everything, and a season for every activity under the heavens.", reference: "傳道書 3:1", referenceEn: "Ecclesiastes 3:1" },
    { text: "神造萬物，各按其時成為美好。", textEn: "He has made everything beautiful in its time.", reference: "傳道書 3:11", referenceEn: "Ecclesiastes 3:11" },
    { text: "我豈沒有吩咐你嗎？你當剛強壯膽！不要懼怕，也不要驚惶，因為你無論往哪裡去，耶和華你的神必與你同在。", textEn: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", reference: "約書亞記 1:9", referenceEn: "Joshua 1:9" },
    { text: "耶和華是我的亮光，是我的拯救，我還怕誰呢？耶和華是我性命的保障，我還懼誰呢？", textEn: "The LORD is my light and my salvation— whom shall I fear? The LORD is the stronghold of my life— of whom shall I be afraid?", reference: "詩篇 27:1", referenceEn: "Psalm 27:1" },
    { text: "我留下平安給你們，我將我的平安賜給你們。我所賜的，不像世人所賜的。你們心裡不要憂愁，也不要膽怯。", textEn: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", reference: "約翰福音 14:27", referenceEn: "John 14:27" },
    { text: "神能照著運行在我們心裡的大力，充充足足的成就一切，超過我們所求所想的。", textEn: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.", reference: "以弗所書 3:20", referenceEn: "Ephesians 3:20" },
    { text: "但願使人有盼望的神，因信將諸般的喜樂、平安充滿你們的心，使你們藉著聖靈的能力大有盼望。", textEn: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", reference: "羅馬書 15:13", referenceEn: "Romans 15:13" },
    { text: "我們愛，因為神先愛我們。", textEn: "We love because he first loved us.", reference: "約翰一書 4:19", referenceEn: "1 John 4:19" },
    { text: "愛是恆久忍耐，又有恩慈...愛是永不止息。", textEn: "Love is patient, love is kind... Love never fails.", reference: "哥林多前書 13:4,8", referenceEn: "1 Corinthians 13:4,8" },
    { text: "他必必救你脫離捕鳥人的網羅和毒害的瘟疫。", textEn: "Surely he will save you from the fowler’s snare and from the deadly pestilence.", reference: "詩篇 91:3", referenceEn: "Psalm 91:3" },
    { text: "他必用自己的翎毛遮蔽你，你要投靠在他的翅膀底下。", textEn: "He will cover you with his feathers, and under his wings you will find refuge.", reference: "詩篇 91:4", referenceEn: "Psalm 91:4" },
    { text: "因他要為你吩咐他的使者，在你行的一切道路上保護你。", textEn: "For he will command his angels concerning you to guard you in all your ways.", reference: "詩篇 91:11", referenceEn: "Psalm 91:11" },
    { text: "盜賊來，無非要偷竊、殺害、毀壞；我來了，是要叫羊得生命，並且得的更豐盛。", textEn: "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.", reference: "約翰福音 10:10", referenceEn: "John 10:10" },
    { text: "我是葡萄樹，你們是枝子。常在我裡面的，我也常在他裡面，這人就多結果子；因為離了我，你們就不能做什麼。", textEn: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.", reference: "約翰福音 15:5", referenceEn: "John 15:5" },
    { text: "你們親近神，神就必親近你們。", textEn: "Come near to God and he will come near to you.", reference: "雅各書 4:8", referenceEn: "James 4:8" },
    { text: "各樣美善的恩賜和各樣全備的賞賜都是從上頭來的，從眾光之父那裡降下來的。", textEn: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights.", reference: "雅各書 1:17", referenceEn: "James 1:17" },
    { text: "惟有你們是被揀選的族類，是有君尊的祭司，是聖潔的國度，是屬神的子民。", textEn: "But you are a chosen people, a royal priesthood, a holy nation, God’s special possession.", reference: "彼得前書 2:9", referenceEn: "1 Peter 2:9" },
    { text: "那賜諸般恩典的神...等你們暫受苦難之後，必要親自成全你們，堅固你們，賜力量給你們。", textEn: "And the God of all grace... after you have suffered a little while, will himself restore you and make you strong, firm and steadfast.", reference: "彼得前書 5:10", referenceEn: "1 Peter 5:10" },
    { text: "我們若認自己的罪，神是信實的，是公義的，必要赦免我們的罪，洗淨我們一切的不義。", textEn: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.", reference: "約翰一書 1:9", referenceEn: "1 John 1:9" },
    { text: "愛裡沒有懼怕；愛既完全，就把懼怕除去。", textEn: "There is no fear in love. But perfect love drives out fear.", reference: "約翰一書 4:18", referenceEn: "1 John 4:18" },
    { text: "因為凡從神生的，就勝過世界；使我們勝了世界的，就是我們的信心。", textEn: "for everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.", reference: "約翰一書 5:4", referenceEn: "1 John 5:4" },
    { text: "神要擦去他們一切的眼淚，不再有死亡，也不再有悲哀、哭號、疼痛，因為以前的事都過去了。", textEn: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.", reference: "啟示錄 21:4", referenceEn: "Revelation 21:4" },
    { text: "我是阿拉法，我是俄梅戛；我是首先的，我是末後的；我是初，我是終。", textEn: "I am the Alpha and the Omega, the First and the Last, the Beginning and the End.", reference: "啟示錄 22:13", referenceEn: "Revelation 22:13" },
    { text: "不要效法這個世界，只要心意更新而變化，叫你們察驗何為神的善良、純全、可喜悅的旨意。", textEn: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is.", reference: "羅馬書 12:2", referenceEn: "Romans 12:2" },
    { text: "在指望中要喜樂，在患難中要忍耐，禱告要恆切。", textEn: "Be joyful in hope, patient in affliction, faithful in prayer.", reference: "羅馬書 12:12", referenceEn: "Romans 12:12" },
    { text: "耶和華的眼目看顧義人，他的耳朵聽他們的呼求。", textEn: "The eyes of the LORD are on the righteous, and his ears are attentive to their cry.", reference: "詩篇 34:15", referenceEn: "Psalm 34:15" },
    { text: "嘗嘗主恩的滋味，便知道他是美善；投靠他的人有福了！", textEn: "Taste and see that the LORD is good; blessed is the one who takes refuge in him.", reference: "詩篇 34:8", referenceEn: "Psalm 34:8" },
    { text: "你要以耶和華為樂，他就將你心裡所求的賜給你。", textEn: "Take delight in the LORD, and he will give you the desires of your heart.", reference: "詩篇 37:4", referenceEn: "Psalm 37:4" },
    { text: "當將你的事交託耶和華，並倚靠他，他就必成全。", textEn: "Commit your way to the LORD; trust in him and he will do this.", reference: "詩篇 37:5", referenceEn: "Psalm 37:5" },
    { text: "我的心哪，你當默默無聲，專等候神，因為我的盼望是從他而來。", textEn: "Yes, my soul, find rest in God; my hope comes from him.", reference: "詩篇 62:5", referenceEn: "Psalm 62:5" },
    { text: "流淚撒種的，必歡呼收割。", textEn: "Those who sow with tears will reap with songs of joy.", reference: "詩篇 126:5", referenceEn: "Psalm 126:5" },
    { text: "若不是耶和華建造房屋，建造的人就枉然勞力；若不是耶和華看守城池，看守的人就枉然警醒。", textEn: "Unless the LORD builds the house, the builders labor in vain. Unless the LORD watches over the city, the guards stand watch in vain.", reference: "詩篇 127:1", referenceEn: "Psalm 127:1" },
    { text: "你的話是我腳前的燈，是我路上的光。", textEn: "Your word is a lamp for my feet, a light on my path.", reference: "詩篇 119:105", referenceEn: "Psalm 119:105" },
    { text: "我將你的話藏在心裡，免得我得罪你。", textEn: "I have hidden your word in my heart that I might not sin against you.", reference: "詩篇 119:11", referenceEn: "Psalm 119:11" },
    { text: "敬畏耶和華是智慧的開端，認識至聖者便是聰明。", textEn: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.", reference: "箴言 9:10", referenceEn: "Proverbs 9:10" },
    { text: "你要保守你心，勝過保守一切，因為一生的果效是由心發出。", textEn: "Above all else, guard your heart, for everything you do flows from it.", reference: "箴言 4:23", referenceEn: "Proverbs 4:23" },
    { text: "良言如同蜂房，使心覺甘甜，使骨得醫治。", textEn: "Gracious words are a honeycomb, sweet to the soul and healing to the bones.", reference: "箴言 16:24", referenceEn: "Proverbs 16:24" },
    { text: "草必枯乾，花必凋殘，惟有我們神的話必永遠立定。", textEn: "The grass withers and the flowers fall, but the word of our God endures forever.", reference: "以賽亞書 40:8", referenceEn: "Isaiah 40:8" },
    { text: "堅心倚賴你的，你必保守他十分平安，因為他倚靠你。", textEn: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.", reference: "以賽亞書 26:3", referenceEn: "Isaiah 26:3" },
    { text: "你們得救在乎歸回安息，你們得力在乎平靜安穩。", textEn: "In repentance and rest is your salvation, in quietness and trust is your strength.", reference: "以賽亞書 30:15", referenceEn: "Isaiah 30:15" },
    { text: "看哪，我已將你銘刻在我掌上；你的牆垣常在我眼前。", textEn: "See, I have engraved you on the palms of my hands; your walls are ever before me.", reference: "以賽亞書 49:16", referenceEn: "Isaiah 49:16" },
    { text: "天怎樣高過地，照樣，我的道路高過你們的道路，我的意念高過你們的意念。", textEn: "As the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts.", reference: "以賽亞書 55:9", referenceEn: "Isaiah 55:9" },
    { text: "世人哪，耶和華已指示你何為善。他向你所要的是什麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。", textEn: "He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.", reference: "彌迦書 6:8", referenceEn: "Micah 6:8" },
    { text: "耶和華你的神是施行拯救、大有能力的主。他在你中間必因你歡欣喜樂，默然愛你，且因你喜樂而歡呼。", textEn: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.", reference: "西番雅書 3:17", referenceEn: "Zephaniah 3:17" },
    { text: "你們是世上的光。城造在山上，是不能隱藏的。", textEn: "You are the light of the world. A town built on a hill cannot be hidden.", reference: "馬太福音 5:14", referenceEn: "Matthew 5:14" },
    { text: "你們要先求他的國和他的義，這些東西都要加給你們了。", textEn: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "馬太福音 6:33", referenceEn: "Matthew 6:33" },
    { text: "所以，不要為明天憂慮，因為明天自有明天的憂慮；一天的難處一天當就夠了。", textEn: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.", reference: "馬太福音 6:34", referenceEn: "Matthew 6:34" },
    { text: "耶穌看著他們，說：「在人這是不能的，在神凡事都能。」", textEn: "Jesus looked at them and said, 'With man this is impossible, but with God all things are possible.'", reference: "馬太福音 19:26", referenceEn: "Matthew 19:26" },
    { text: "凡我所吩咐你們的，都教訓他們遵守，我就常與你們同在，直到世界的末了。", textEn: "And surely I am with you always, to the very end of the age.", reference: "馬太福音 28:20", referenceEn: "Matthew 28:20" },
    { text: "耶穌說：「你若能信，在信的人，凡事都能。」", textEn: "'If you can'?' said Jesus. 'Everything is possible for one who believes.'", reference: "馬可福音 9:23", referenceEn: "Mark 9:23" },
    { text: "因為，出於神的話，沒有一句不帶能力的。", textEn: "For no word from God will ever fail.", reference: "路加福音 1:37", referenceEn: "Luke 1:37" },
    { text: "神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。", textEn: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "約翰福音 3:16", referenceEn: "John 3:16" },
    { text: "我是世界的光。跟從我的，就不在黑暗裡走，必要得著生命的光。", textEn: "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.", reference: "約翰福音 8:12", referenceEn: "John 8:12" },
    { text: "你們心裡不要憂愁；你們信神，也當信我。", textEn: "Do not let your hearts be troubled. You believe in God; believe also in me.", reference: "約翰福音 14:1", referenceEn: "John 14:1" },
    { text: "人為朋友捨命，人的愛心沒有比這個大的。", textEn: "Greater love has no one than this: to lay down one’s life for one’s friends.", reference: "約翰福音 15:13", referenceEn: "John 15:13" },
    { text: "聖靈所結的果子，就是仁愛、喜樂、和平、忍耐、恩慈、良善、信實、溫柔、節制。", textEn: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", reference: "加拉太書 5:22-23", referenceEn: "Galatians 5:22-23" },
    { text: "我們行善，不可喪志；若不灰心，到了時候就要收成。", textEn: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", reference: "加拉太書 6:9", referenceEn: "Galatians 6:9" },
    { text: "你們得救是本乎恩，也因著信；這並不是出於自己，乃是神所賜的。", textEn: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.", reference: "以弗所書 2:8", referenceEn: "Ephesians 2:8" },
    { text: "我們原是他的工作，在基督耶穌裡造成的，為要叫我們行善，就是神所預備叫我們行的。", textEn: "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.", reference: "以弗所書 2:10", referenceEn: "Ephesians 2:10" },
    { text: "要穿戴神所賜的全副軍裝，就能抵擋魔鬼的詭計。", textEn: "Put on the full armor of God, so that you can take your stand against the devil’s schemes.", reference: "以弗所書 6:11", referenceEn: "Ephesians 6:11" },
    { text: "我深信那在你們心裡動了善工的，必成全這工，直到耶穌基督的日子。", textEn: "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.", reference: "腓立比書 1:6", referenceEn: "Philippians 1:6" },
    { text: "你們要靠主常常喜樂。我再說，你們要喜樂！", textEn: "Rejoice in the Lord always. I will say it again: Rejoice!", reference: "腓立比書 4:4", referenceEn: "Philippians 4:4" },
    { text: "我的神必照他榮耀的豐富，在基督耶穌裡，使你們一切所需用的都充足。", textEn: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", reference: "腓立比書 4:19", referenceEn: "Philippians 4:19" },
    { text: "你們要思念上面的事，不要思念地上的事。", textEn: "Set your minds on things above, not on earthly things.", reference: "歌羅西書 3:2", referenceEn: "Colossians 3:2" },
    { text: "無論做什麼，都要從心裡做，像是給主做的，不是給人做的。", textEn: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", reference: "歌羅西書 3:23", referenceEn: "Colossians 3:23" },
    { text: "要常常喜樂，不住的禱告，凡事謝恩；因為這是神在基督耶穌裡向你們所定的旨意。", textEn: "Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.", reference: "帖撒羅尼迦前書 5:16-18", referenceEn: "1 Thessalonians 5:16-18" },
    { text: "神的道是活潑的，是有功效的，比一切兩刃的劍更快。", textEn: "For the word of God is alive and active. Sharper than any double-edged sword.", reference: "希伯來書 4:12", referenceEn: "Hebrews 4:12" },
    { text: "所以，我們只管坦然無懼的來到施恩的寶座前，為要得憐恤，蒙恩惠，作隨時的幫助。", textEn: "Let us then approach God’s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.", reference: "希伯來書 4:16", referenceEn: "Hebrews 4:16" },
    { text: "信就是所望之事的實底，是未見之事的確據。", textEn: "Now faith is confidence in what we hope for and assurance about what we do not see.", reference: "希伯來書 11:1", referenceEn: "Hebrews 11:1" },
    { text: "我們既有這許多的見證人，如同雲彩圍著我們，就當放下各樣的重擔...存心忍耐，奔那擺在我們前頭的路程。", textEn: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders... and let us run with perseverance the race marked out for us.", reference: "希伯來書 12:1", referenceEn: "Hebrews 12:1" },
    { text: "仰望為我們信心創始成終的耶穌。", textEn: "Fixing our eyes on Jesus, the pioneer and perfecter of faith.", reference: "希伯來書 12:2", referenceEn: "Hebrews 12:2" },
    { text: "主曾說：「我總不撇下你，也不丟棄你。」", textEn: "God has said, 'Never will I leave you; never will I forsake you.'", reference: "希伯來書 13:5", referenceEn: "Hebrews 13:5" },
    { text: "耶穌基督昨日、今日、一直到永遠，是一樣的。", textEn: "Jesus Christ is the same yesterday and today and forever.", reference: "希伯來書 13:8", referenceEn: "Hebrews 13:8" },
    { text: "你們中間若有缺少智慧的，應當求那厚賜與眾人、也不斥責人的神，主就必賜給他。", textEn: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", reference: "雅各書 1:5", referenceEn: "James 1:5" },
    { text: "若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。", textEn: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", reference: "哥林多後書 5:17", referenceEn: "2 Corinthians 5:17" },
    { text: "我們行事為人是憑著信心，不是憑著眼見。", textEn: "For we live by faith, not by sight.", reference: "哥林多後書 5:7", referenceEn: "2 Corinthians 5:7" },
    { text: "外體雖然毀壞，內心卻一天新似一天。", textEn: "Though outwardly we are wasting away, yet inwardly we are being renewed day by day.", reference: "哥林多後書 4:16", referenceEn: "2 Corinthians 4:16" },
    { text: "我們這至暫至輕的苦楚，要為我們成就極重無比、永遠的榮耀。", textEn: "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all.", reference: "哥林多後書 4:17", referenceEn: "2 Corinthians 4:17" },
    { text: "我也與你同在。你無論往哪裡去，我必保佑你，領你歸回這地，總不離棄你，直到我成全了向你所應許的。", textEn: "I am with you and will watch over you wherever you go, and I will bring you back to this land. I will not leave you until I have done what I have promised you.", reference: "創世記 28:15", referenceEn: "Genesis 28:15" },
    { text: "耶和華必為你們爭戰，你們只管靜默，不要作聲。", textEn: "The LORD will fight for you; you need only to be still.", reference: "出埃及記 14:14", referenceEn: "Exodus 14:14" },
    { text: "我必親自和你同去，使你得安息。", textEn: "My Presence will go with you, and I will give you rest.", reference: "出埃及記 33:14", referenceEn: "Exodus 33:14" },
    { text: "至於我和我家，我們必定事奉耶和華。", textEn: "But as for me and my household, we will serve the LORD.", reference: "約書亞記 24:15", referenceEn: "Joshua 24:15" },
    { text: "耶和華不像人看人：人是看外貌；耶和華是看內心。", textEn: "The LORD does not look at the things people look at. People look at the outward appearance, but the LORD looks at the heart.", reference: "撒母耳記上 16:7", referenceEn: "1 Samuel 16:7" },
    { text: "靠耶和華而得的喜樂是你們的力量。", textEn: "The joy of the LORD is your strength.", reference: "尼希米記 8:10", referenceEn: "Nehemiah 8:10" },
    { text: "他知道我所行的路；他試煉我之後，我必如精金。", textEn: "But he knows the way that I take; when he has tested me, I will come forth as gold.", reference: "約伯記 23:10", referenceEn: "Job 23:10" },
    { text: "他要像一棵樹栽在溪水旁，按時候結果子，葉子也不枯乾。凡他所做的盡都順利。", textEn: "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.", reference: "詩篇 1:3", referenceEn: "Psalm 1:3" },
    { text: "我必安然躺下睡覺，因為獨有你耶和華使我安然居住。", textEn: "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.", reference: "詩篇 4:8", referenceEn: "Psalm 4:8" },
    { text: "耶和華是我的巖石，我的山寨，我的救主，我的神，我的磐石，我所投靠的。", textEn: "The LORD is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.", reference: "詩篇 18:2", referenceEn: "Psalm 18:2" },
    { text: "耶和華我的磐石，我的救贖主啊，願我口中的言語、心裡的意念在你面前蒙悅納。", textEn: "May these words of my mouth and this meditation of my heart be pleasing in your sight, LORD, my Rock and my Redeemer.", reference: "詩篇 19:14", referenceEn: "Psalm 19:14" },
    { text: "有一件事，我曾求耶和華，我仍要尋求：就是一生一世住在耶和華的殿中，瞻仰他的榮美。", textEn: "One thing I ask from the LORD, this only do I seek: that I may dwell in the house of the LORD all the days of my life, to gaze on the beauty of the LORD.", reference: "詩篇 27:4", referenceEn: "Psalm 27:4" },
    { text: "一宿雖然有哭泣，早晨便必歡呼。", textEn: "Weeping may stay for the night, but rejoicing comes in the morning.", reference: "詩篇 30:5", referenceEn: "Psalm 30:5" },
    { text: "你是我藏身之處；你必保佑我脫離苦難，以得救的樂歌四面環繞我。", textEn: "You are my hiding place; you will protect me from trouble and surround me with songs of deliverance.", reference: "詩篇 32:7", referenceEn: "Psalm 32:7" },
    { text: "義人的腳步被耶和華立定；他的道路，耶和華也喜愛。", textEn: "The LORD makes firm the steps of the one who delights in him.", reference: "詩篇 37:23", referenceEn: "Psalm 37:23" },
    { text: "神啊，求你為我造清潔的心，使我裡面重新有正直的靈。", textEn: "Create in me a pure heart, O God, and renew a steadfast spirit within me.", reference: "詩篇 51:10", referenceEn: "Psalm 51:10" },
    { text: "你要把你的重擔卸給耶和華，他必撫養你。", textEn: "Cast your cares on the LORD and he will sustain you.", reference: "詩篇 55:22", referenceEn: "Psalm 55:22" },
    { text: "我懼怕的時候要倚靠你。", textEn: "When I am afraid, I put my trust in you.", reference: "詩篇 56:3", referenceEn: "Psalm 56:3" },
    { text: "我的肉體和我的心腸衰殘；但神是我心裡的力量，又是我的福分，直到永遠。", textEn: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.", reference: "詩篇 73:26", referenceEn: "Psalm 73:26" },
    { text: "因為耶和華神是日頭，是盾牌，要賜下恩惠和榮耀。", textEn: "For the LORD God is a sun and shield; the LORD bestows favor and honor.", reference: "詩篇 84:11", referenceEn: "Psalm 84:11" },
    { text: "求你指教我們怎樣數算自己的日子，好叫我們得著智慧的心。", textEn: "Teach us to number our days, that we may gain a heart of wisdom.", reference: "詩篇 90:12", referenceEn: "Psalm 90:12" },
    { text: "住在至高者隱密處的，必住在全能者的蔭下。", textEn: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.", reference: "詩篇 91:1", referenceEn: "Psalm 91:1" },
    { text: "我的心哪，你要稱頌耶和華！不可忘記他的一切恩惠！", textEn: "Praise the LORD, my soul, and forget not all his benefits.", reference: "詩篇 103:2", referenceEn: "Psalm 103:2" },
    { text: "耶和華有憐憫，有恩典，不輕易發怒，且有豐盛的慈愛。", textEn: "The LORD is compassionate and gracious, slow to anger, abounding in love.", reference: "詩篇 103:8", referenceEn: "Psalm 103:8" },
    { text: "東離西有多遠，他叫我們的過犯離我們也有多遠。", textEn: "As far as the east is from the west, so far has he removed our transgressions from us.", reference: "詩篇 103:12", referenceEn: "Psalm 103:12" },
    { text: "這是耶和華所定的日子，我們在其中要高興歡喜。", textEn: "This is the day the LORD has made; let us rejoice and be glad in it.", reference: "詩篇 118:24", referenceEn: "Psalm 118:24" },
    { text: "你是我藏身之處，又是我的盾牌；我盼望你的話語。", textEn: "You are my refuge and my shield; I have put my hope in your word.", reference: "詩篇 119:114", referenceEn: "Psalm 119:114" },
    { text: "我要稱謝你，因我受造，奇妙可畏。", textEn: "I praise you because I am fearfully and wonderfully made.", reference: "詩篇 139:14", referenceEn: "Psalm 139:14" },
    { text: "凡求告耶和華的，就是誠心求告他的，耶和華便與他們相近。", textEn: "The LORD is near to all who call on him, to all who call on him in truth.", reference: "詩篇 145:18", referenceEn: "Psalm 145:18" },
    { text: "他醫好傷心的人，裹好他們的傷處。", textEn: "He heals the brokenhearted and binds up their wounds.", reference: "詩篇 147:3", referenceEn: "Psalm 147:3" },
    { text: "不可使慈愛、誠實離開你，要繫在你頸項上，刻在你心版上。", textEn: "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.", reference: "箴言 3:3", referenceEn: "Proverbs 3:3" },
    { text: "回答柔和，使怒消退；言語暴戾，觸動怒氣。", textEn: "A gentle answer turns away wrath, but a harsh word stirs up anger.", reference: "箴言 15:1", referenceEn: "Proverbs 15:1" },
    { text: "你所做的，要交託耶和華，你所謀的，就必成立。", textEn: "Commit to the LORD whatever you do, and he will establish your plans.", reference: "箴言 16:3", referenceEn: "Proverbs 16:3" },
    { text: "濫交朋友的，自取敗壞；但有一朋友比弟兄更親密。", textEn: "One who has unreliable friends soon comes to ruin, but there is a friend who sticks closer than a brother.", reference: "箴言 18:24", referenceEn: "Proverbs 18:24" },
    { text: "鐵磨鐵，磨出刃來；朋友相感也是如此。", textEn: "As iron sharpens iron, so one person sharpens another.", reference: "箴言 27:17", referenceEn: "Proverbs 27:17" },
    { text: "兩個人總比一個人好，因為二人勞碌同得美好的果效。", textEn: "Two are better than one, because they have a good return for their labor.", reference: "傳道書 4:9", referenceEn: "Ecclesiastes 4:9" },
    { text: "你們當倚靠耶和華直到永遠，因為耶和華是永久的磐石。", textEn: "Trust in the LORD forever, for the LORD, the LORD himself, is the Rock eternal.", reference: "以賽亞書 26:4", referenceEn: "Isaiah 26:4" },
    { text: "耶和華必然等候，要施恩給你們...凡等候他的都是有福的！", textEn: "Yet the LORD longs to be gracious to you... Blessed are all who wait for him!", reference: "以賽亞書 30:18", referenceEn: "Isaiah 30:18" },
    { text: "你或向左或向右，你必聽見後邊有聲音說：「這是正路，要行在其間。」", textEn: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'", reference: "以賽亞書 30:21", referenceEn: "Isaiah 30:21" },
    { text: "公義的果效必是平安；公義的效驗必是平穩，直到永遠。", textEn: "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.", reference: "以賽亞書 32:17", referenceEn: "Isaiah 32:17" },
    { text: "他必像牧人牧養自己的羊群，用膀臂聚集羊羔抱在懷中。", textEn: "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.", reference: "以賽亞書 40:11", referenceEn: "Isaiah 40:11" },
    { text: "疲乏的，他賜能力；軟弱的，他加力量。", textEn: "He gives strength to the weary and increases the power of the weak.", reference: "以賽亞書 40:29", referenceEn: "Isaiah 40:29" },
    { text: "因為我耶和華你的神必攙扶你的右手，對你說：不要害怕！我必幫助你。", textEn: "For I am the LORD your God who takes hold of your right hand and says to you, Do not fear; I will help you.", reference: "以賽亞書 41:13", referenceEn: "Isaiah 41:13" },
    { text: "不要記念從前的事，也不要思想古時的事。看哪，我要做一件新事！", textEn: "Forget the former things; do not dwell on the past. See, I am doing a new thing!", reference: "以賽亞書 43:18-19", referenceEn: "Isaiah 43:18-19" },
    { text: "婦人焉能忘記她吃奶的嬰孩...即或有忘記的，我卻不忘記你。", textEn: "Can a mother forget the baby at her breast... Though she may forget, I will not forget you!", reference: "以賽亞書 49:15", referenceEn: "Isaiah 49:15" },
    { text: "當趁耶和華可尋找的時候尋找他，相近的時候求告他。", textEn: "Seek the LORD while he may be found; call on him while he is near.", reference: "以賽亞書 55:6", referenceEn: "Isaiah 55:6" },
    { text: "興起，發光！因為你的光已經來到！耶和華的榮耀發現照耀你。", textEn: "Arise, shine, for your light has come, and the glory of the LORD rises upon you.", reference: "以賽亞書 60:1", referenceEn: "Isaiah 60:1" },
    { text: "倚靠耶和華、以耶和華為可靠的，那人有福了！", textEn: "But blessed is the one who trusts in the LORD, whose confidence is in him.", reference: "耶利米書 17:7", referenceEn: "Jeremiah 17:7" },
    { text: "我以永遠的愛愛你，因此我以慈愛吸引你。", textEn: "I have loved you with an everlasting love; I have drawn you with unfailing kindness.", reference: "耶利米書 31:3", referenceEn: "Jeremiah 31:3" },
    { text: "你求告我，我就應允你，並將你所不知道、又大又難的事指示你。", textEn: "Call to me and I will answer you and tell you great and unsearchable things you do not know.", reference: "耶利米書 33:3", referenceEn: "Jeremiah 33:3" },
    { text: "使人和睦的人有福了！因為他們必稱為神的兒子。", textEn: "Blessed are the peacemakers, for they will be called children of God.", reference: "馬太福音 5:9", referenceEn: "Matthew 5:9" },
    { text: "你們的光也當這樣照在人前，叫他們看見你們的好行為，便將榮耀歸給你們在天上的父。", textEn: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", reference: "馬太福音 5:16", referenceEn: "Matthew 5:16" },
    { text: "因為你的財寶在哪裡，你的心也在那裡。", textEn: "For where your treasure is, there your heart will be also.", reference: "馬太福音 6:21", referenceEn: "Matthew 6:21" },
    { text: "我心裡柔和謙卑，你們當負我的軛，學我的樣式；這樣，你們心裡就必得享安息。", textEn: "Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.", reference: "馬太福音 11:29", referenceEn: "Matthew 11:29" },
    { text: "因為無論在哪裡，有兩三個人奉我的名聚會，那裡就有我在他們中間。", textEn: "For where two or three gather in my name, there am I with them.", reference: "馬太福音 18:20", referenceEn: "Matthew 18:20" },
    { text: "所以我告訴你們，凡你們禱告祈求的，無論是什麼，只要信是得著的，就必得著。", textEn: "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.", reference: "馬可福音 11:24", referenceEn: "Mark 11:24" },
    { text: "你們這小群，不要懼怕，因為你們的父樂意把國賜給你們。", textEn: "Do not be afraid, little flock, for your Father has been pleased to give you the kingdom.", reference: "路加福音 12:32", referenceEn: "Luke 12:32" },
    { text: "我就是生命的糧。到我這裡來的，必定不餓；信我的，永遠不渴。", textEn: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'", reference: "約翰福音 6:35", referenceEn: "John 6:35" },
    { text: "我來了，是要叫羊得生命，並且得的更豐盛。", textEn: "I have come that they may have life, and have it to the full.", reference: "約翰福音 10:10", referenceEn: "John 10:10" },
    { text: "我是好牧人；好牧人為羊捨命。", textEn: "I am the good shepherd. The good shepherd lays down his life for the sheep.", reference: "約翰福音 10:11", referenceEn: "John 10:11" },
    { text: "我賜給你們一條新命令，乃是叫你們彼此相愛；我怎樣愛你們，你們也要怎樣相愛。", textEn: "A new command I give you: Love one another. As I have loved you, so you must love one another.", reference: "約翰福音 13:34", referenceEn: "John 13:34" },
    { text: "耶穌說：我就是道路、真理、生命；若不藉著我，沒有人能到父那裡去。", textEn: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'", reference: "約翰福音 14:6", referenceEn: "John 14:6" },
    { text: "向來你們沒有奉我的名求什麼，如今你們求，就必得著，叫你們的喜樂可以滿足。", textEn: "Until now you have not asked for anything in my name. Ask and you will receive, and your joy will be complete.", reference: "約翰福音 16:24", referenceEn: "John 16:24" },
    { text: "盼望不至於羞恥，因為所賜給我們的聖靈將神的愛澆灌在我們心裡。", textEn: "And hope does not put us to shame, because God’s love has been poured out into our hearts through the Holy Spirit who has been given to us.", reference: "羅馬書 5:5", referenceEn: "Romans 5:5" },
    { text: "惟有基督在我們還作罪人的時候為我們死，神的愛就在此向我們顯明了。", textEn: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", reference: "羅馬書 5:8", referenceEn: "Romans 5:8" },
    { text: "如今，那些在基督耶穌裡的就不定罪了。", textEn: "Therefore, there is now no condemnation for those who are in Christ Jesus.", reference: "羅馬書 8:1", referenceEn: "Romans 8:1" },
    { text: "我想，現在的苦楚若比起將來要顯於我們的榮耀就不足介意了。", textEn: "I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.", reference: "羅馬書 8:18", referenceEn: "Romans 8:18" },
    { text: "你不可為惡所勝，反要以善勝惡。", textEn: "Do not be overcome by evil, but overcome evil with good.", reference: "羅馬書 12:21", referenceEn: "Romans 12:21" },
    { text: "你們所遇見的試探，無非是人所能受的。神是信實的，必不叫你們受試探過於所能受的。", textEn: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.", reference: "哥林多前書 10:13", referenceEn: "1 Corinthians 10:13" },
    { text: "如今常存的有信，有望，有愛這三樣，其中最大的是愛。", textEn: "And now these three remain: faith, hope and love. But the greatest of these is love.", reference: "哥林多前書 13:13", referenceEn: "1 Corinthians 13:13" },
    { text: "所以，我親愛的弟兄們，你們務要堅固，不可搖動，常常竭力多做主工。", textEn: "Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord.", reference: "哥林多前書 15:58", referenceEn: "1 Corinthians 15:58" },
    { text: "凡你們所做的都要憑愛心而做。", textEn: "Do everything in love.", reference: "哥林多前書 16:14", referenceEn: "1 Corinthians 16:14" },
    { text: "我們在一切患難中，他就安慰我們，叫我們能用神所賜的安慰去安慰那遭各樣患難的人。", textEn: "Who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.", reference: "哥林多後書 1:4", referenceEn: "2 Corinthians 1:4" },
    { text: "主就是那靈；主的靈在哪裡，那裡就得以自由。", textEn: "Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom.", reference: "哥林多後書 3:17", referenceEn: "2 Corinthians 3:17" },
    { text: "我已經與基督同釘十字架，現在活著的不再是我，乃是基督在我裡面活著。", textEn: "I have been crucified with Christ and I no longer live, but Christ lives in me.", reference: "加拉太書 2:20", referenceEn: "Galatians 2:20" },
    { text: "基督釋放了我們，叫我們得以自由。", textEn: "It is for freedom that Christ has set us free.", reference: "加拉太書 5:1", referenceEn: "Galatians 5:1" },
    { text: "凡事謙虛、溫柔、忍耐，用愛心互相寬容。", textEn: "Be completely humble and gentle; be patient, bearing with one another in love.", reference: "以弗所書 4:2", referenceEn: "Ephesians 4:2" },
    { text: "並要以恩慈相待，存憐憫的心，彼此饒恕，正如神在基督裡饒恕了你們一樣。", textEn: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", reference: "以弗所書 4:32", referenceEn: "Ephesians 4:32" },
    { text: "也要憑愛心行事，正如基督愛我們，為我們捨了自己。", textEn: "And walk in the way of love, just as Christ loved us and gave himself up for us.", reference: "以弗所書 5:2", referenceEn: "Ephesians 5:2" },
    { text: "各人看別人比自己強。", textEn: "In humility value others above yourselves.", reference: "腓立比書 2:3", referenceEn: "Philippians 2:3" },
    { text: "忘記背後，努力面前的，向著標竿直跑。", textEn: "Forgetting what is behind and straining toward what is ahead, I press on toward the goal.", reference: "腓立比書 3:13-14", referenceEn: "Philippians 3:13-14" },
    { text: "凡是真實的、可敬的、公義的、清潔的、可愛的、有美名的...這些事你們都要思念。", textEn: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure... think about such things.", reference: "腓立比書 4:8", referenceEn: "Philippians 4:8" },
    { text: "主怎樣饒恕了你們，你們也要怎樣饒恕人。", textEn: "Forgive as the Lord forgave you.", reference: "歌羅西書 3:13", referenceEn: "Colossians 3:13" },
    { text: "在這一切之外，要存著愛心，愛心就是聯絡全德的。", textEn: "And over all these virtues put on love, which binds them all together in perfect unity.", reference: "歌羅西書 3:14", referenceEn: "Colossians 3:14" },
    { text: "所以，你們該彼此勸慰，互相建立，正如你們素常所行的。", textEn: "Therefore encourage one another and build each other up, just as in fact you are doing.", reference: "帖撒羅尼迦前書 5:11", referenceEn: "1 Thessalonians 5:11" },
    { text: "但主是信實的，要堅固你們，保護你們脫離那惡者。", textEn: "But the Lord is faithful, and he will strengthen you and protect you from the evil one.", reference: "帖撒羅尼迦後書 3:3", referenceEn: "2 Thessalonians 3:3" },
    { text: "不可叫人小看你年輕，總要在言語、行為、愛心、信心、清潔上，都作信徒的榜樣。", textEn: "Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.", reference: "提摩太前書 4:12", referenceEn: "1 Timothy 4:12" },
    { text: "然而，敬虔加上知足的心便是大利了。", textEn: "But godliness with contentment is great gain.", reference: "提摩太前書 6:6", referenceEn: "1 Timothy 6:6" },
    { text: "也要堅守我們所承認的指望，不至搖動，因為那應許我們的是信實的。", textEn: "Let us hold unswervingly to the hope we profess, for he who promised is faithful.", reference: "希伯來書 10:23", referenceEn: "Hebrews 10:23" },
    { text: "又要彼此相顧，激發愛心，勉勵行善。", textEn: "And let us consider how we may spur one another on toward love and good deeds.", reference: "希伯來書 10:24", referenceEn: "Hebrews 10:24" },
    { text: "所以我們可以放膽說：「主是幫助我的，我必不懼怕；人能把我怎麼樣呢？」", textEn: "So we say with confidence, 'The Lord is my helper; I will not be afraid. What can mere mortals do to me?'", reference: "希伯來書 13:6", referenceEn: "Hebrews 13:6" },
    { text: "只是你們要行道，不要單單聽道，自己欺哄自己。", textEn: "Do not merely listen to the word, and so deceive yourselves. Do what it says.", reference: "雅各書 1:22", referenceEn: "James 1:22" },
    { text: "最要緊的是彼此切實相愛，因為愛能遮掩許多的罪。", textEn: "Above all, love each other deeply, because love covers over a multitude of sins.", reference: "彼得前書 4:8", referenceEn: "1 Peter 4:8" },
    { text: "所以你們要自卑，服在神大能的手下，到了時候他必叫你們升高。", textEn: "Humble yourselves, therefore, under God’s mighty hand, that he may lift you up in due time.", reference: "彼得前書 5:6", referenceEn: "1 Peter 5:6" },
    { text: "你看父賜給我們是何等的慈愛，使我們得稱為神的兒女！", textEn: "See what great love the Father has lavished on us, that we should be called children of God!", reference: "約翰一書 3:1", referenceEn: "1 John 3:1" },
    { text: "親愛的弟兄啊，我們應當彼此相愛，因為愛是從神來的。", textEn: "Dear friends, let us love one another, for love comes from God.", reference: "約翰一書 4:7", referenceEn: "1 John 4:7" },
    { text: "神就是愛；住在愛裡面的，就是住在神裡面，神也住在他裡面。", textEn: "God is love. Whoever lives in love lives in God, and God in them.", reference: "約翰一書 4:16", referenceEn: "1 John 4:16" },
    // === 以下為新增經文，補足至365條 ===
    { text: "起初，神創造天地。", textEn: "In the beginning God created the heavens and the earth.", reference: "創世記 1:1", referenceEn: "Genesis 1:1" },
    { text: "神就照著自己的形像造人，乃是照著他的形像造男造女。", textEn: "So God created mankind in his own image, in the image of God he created them; male and female he created them.", reference: "創世記 1:27", referenceEn: "Genesis 1:27" },
    { text: "我把虹放在雲彩中，這就可作我與地立約的記號了。", textEn: "I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth.", reference: "創世記 9:13", referenceEn: "Genesis 9:13" },
    { text: "耶和華是我的力量，我的詩歌，也成了我的拯救。", textEn: "The LORD is my strength and my defense; he has become my salvation.", reference: "出埃及記 15:2", referenceEn: "Exodus 15:2" },
    { text: "當孝敬父母，使你的日子在耶和華你神所賜你的地上得以長久。", textEn: "Honor your father and your mother, so that you may live long in the land the LORD your God is giving you.", reference: "出埃及記 20:12", referenceEn: "Exodus 20:12" },
    { text: "要愛人如己。我是耶和華。", textEn: "Love your neighbor as yourself. I am the LORD.", reference: "利未記 19:18", referenceEn: "Leviticus 19:18" },
    { text: "願耶和華賜福給你，保護你。願耶和華使他的臉光照你，賜恩給你。", textEn: "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you.", reference: "民數記 6:24-25", referenceEn: "Numbers 6:24-25" },
    { text: "願耶和華向你仰臉，賜你平安。", textEn: "The LORD turn his face toward you and give you peace.", reference: "民數記 6:26", referenceEn: "Numbers 6:26" },
    { text: "你要盡心、盡性、盡力愛耶和華你的神。", textEn: "Love the LORD your God with all your heart and with all your soul and with all your strength.", reference: "申命記 6:5", referenceEn: "Deuteronomy 6:5" },
    { text: "這律法書不可離開你的口，總要晝夜思想，好使你謹守遵行這書上所寫的一切話。", textEn: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it.", reference: "約書亞記 1:8", referenceEn: "Joshua 1:8" },
    { text: "至於神，他的道是完全的；耶和華的話是煉淨的。凡投靠他的，他便作他們的盾牌。", textEn: "As for God, his way is perfect: The LORD’s word is flawless; he shields all who take refuge in him.", reference: "撒母耳記下 22:31", referenceEn: "2 Samuel 22:31" },
    { text: "要尋求耶和華與他的能力，時常尋求他的面。", textEn: "Look to the LORD and his strength; seek his face always.", reference: "歷代志上 16:11", referenceEn: "1 Chronicles 16:11" },
    { text: "耶和華的眼目遍察全地，要顯大能幫助向他心存誠實的人。", textEn: "For the eyes of the LORD range throughout the earth to strengthen those whose hearts are fully committed to him.", reference: "歷代志下 16:9", referenceEn: "2 Chronicles 16:9" },
    { text: "不要恐懼，也不要驚惶，因為勝敗不在乎你們，乃在乎神。", textEn: "Do not be afraid or discouraged because of this vast army. For the battle is not yours, but God’s.", reference: "歷代志下 20:15", referenceEn: "2 Chronicles 20:15" },
    { text: "我知道我的救贖主活著，末了必站立在地上。", textEn: "I know that my redeemer lives, and that in the end he will stand on the earth.", reference: "約伯記 19:25", referenceEn: "Job 19:25" },
    { text: "耶和華阿，早晨你必聽我的聲音；早晨我必向你陳明我的心意，並要警醒。", textEn: "In the morning, LORD, you hear my voice; in the morning I lay my requests before you and wait expectantly.", reference: "詩篇 5:3", referenceEn: "Psalm 5:3" },
    { text: "耶和華我們的主啊，你的名在全地何其美！", textEn: "LORD, our Lord, how majestic is your name in all the earth!", reference: "詩篇 8:1", referenceEn: "Psalm 8:1" },
    { text: "耶和華又要給受欺壓的人作高臺，在患難的時候作高臺。", textEn: "The LORD is a refuge for the oppressed, a stronghold in times of trouble.", reference: "詩篇 9:9", referenceEn: "Psalm 9:9" },
    { text: "神啊，求你保佑我，因為我投靠你。", textEn: "Keep me safe, my God, for in you I take refuge.", reference: "詩篇 16:1", referenceEn: "Psalm 16:1" },
    { text: "我將耶和華常擺在我面前，因他在我右邊，我便不致搖動。", textEn: "I keep my eyes always on the LORD. With him at my right hand, I will not be shaken.", reference: "詩篇 16:8", referenceEn: "Psalm 16:8" },
    { text: "至於神，他的道是完全的；耶和華的話是煉淨的。", textEn: "As for God, his way is perfect: The LORD’s word is flawless.", reference: "詩篇 18:30", referenceEn: "Psalm 18:30" },
    { text: "諸天述說神的榮耀，穹蒼傳揚他的手段。", textEn: "The heavens declare the glory of God; the skies proclaim the work of his hands.", reference: "詩篇 19:1", referenceEn: "Psalm 19:1" },
    { text: "他使我躺臥在青草地上，領我在可安歇的水邊。", textEn: "He makes me lie down in green pastures, he leads me beside quiet waters.", reference: "詩篇 23:2", referenceEn: "Psalm 23:2" },
    { text: "他使我的靈魂甦醒，為自己的名引導我走義路。", textEn: "He refreshes my soul. He guides me along the right paths for his name’s sake.", reference: "詩篇 23:3", referenceEn: "Psalm 23:3" },
    { text: "我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在。", textEn: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", reference: "詩篇 23:4", referenceEn: "Psalm 23:4" },
    { text: "我一生一世必有恩惠慈愛隨著我，我且要住在耶和華的殿中，直到永遠。", textEn: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.", reference: "詩篇 23:6", referenceEn: "Psalm 23:6" },
    { text: "耶和華啊，求你將你的道指示我，將你的路教訓我。", textEn: "Show me your ways, LORD, teach me your paths.", reference: "詩篇 25:4", referenceEn: "Psalm 25:4" },
    { text: "要等候耶和華！當壯膽，堅固你的心！", textEn: "Wait for the LORD; be strong and take heart and wait for the LORD.", reference: "詩篇 27:14", referenceEn: "Psalm 27:14" },
    { text: "耶和華是我的力量，是我的盾牌；我心裡倚靠他就得幫助。", textEn: "The LORD is my strength and my shield; my heart trusts in him, and he helps me.", reference: "詩篇 28:7", referenceEn: "Psalm 28:7" },
    { text: "你已將我的哀哭變為跳舞，將我的麻衣脫去，給我披上喜樂。", textEn: "You turned my wailing into dancing; you removed my sackcloth and clothed me with joy.", reference: "詩篇 30:11", referenceEn: "Psalm 30:11" },
    { text: "凡仰望耶和華的人，你們都要壯膽，堅固你們的心！", textEn: "Be strong and take heart, all you who hope in the LORD.", reference: "詩篇 31:24", referenceEn: "Psalm 31:24" },
    { text: "耶和華的籌算永遠立定，他心中的思念萬代常存。", textEn: "But the plans of the LORD stand firm forever, the purposes of his heart through all generations.", reference: "詩篇 33:11", referenceEn: "Psalm 33:11" },
    { text: "我們的靈性等候耶和華；他是我們的幫助，我們的盾牌。", textEn: "We wait in hope for the LORD; he is our help and our shield.", reference: "詩篇 33:20", referenceEn: "Psalm 33:20" },
    { text: "我要時時稱頌耶和華；讚美他的話必常在我口中。", textEn: "I will extol the LORD at all times; his praise will always be on my lips.", reference: "詩篇 34:1", referenceEn: "Psalm 34:1" },
    { text: "我曾尋求耶和華，他就應允我，救我脫離了一切的恐懼。", textEn: "I sought the LORD, and he answered me; he delivered me from all my fears.", reference: "詩篇 34:4", referenceEn: "Psalm 34:4" },
    { text: "少壯獅子還缺食忍餓，但尋求耶和華的什麼好處都不缺。", textEn: "The lions may grow weak and hungry, but those who seek the LORD lack no good thing.", reference: "詩篇 34:10", referenceEn: "Psalm 34:10" },
    { text: "耶和華啊，你的慈愛上及諸天，你的信實達到穹蒼。", textEn: "Your love, LORD, reaches to the heavens, your faithfulness to the skies.", reference: "詩篇 36:5", referenceEn: "Psalm 36:5" },
    { text: "神啊，你的慈愛何其寶貴！世人投靠在你翅膀的蔭下。", textEn: "How priceless is your unfailing love, O God! People take refuge in the shadow of your wings.", reference: "詩篇 36:7", referenceEn: "Psalm 36:7" },
    { text: "你當倚靠耶和華而行善，住在地上，以他的信實為糧。", textEn: "Trust in the LORD and do good; dwell in the land and enjoy safe pasture.", reference: "詩篇 37:3", referenceEn: "Psalm 37:3" },
    { text: "你當默然倚靠耶和華，耐性等候他。", textEn: "Be still before the LORD and wait patiently for him.", reference: "詩篇 37:7", referenceEn: "Psalm 37:7" },
    { text: "他雖失腳也不致全身仆倒，因為耶和華用手攙扶他。", textEn: "Though he may stumble, he will not fall, for the LORD upholds him with his hand.", reference: "詩篇 37:24", referenceEn: "Psalm 37:24" },
    { text: "神啊，我的心切慕你，如鹿切慕溪水。", textEn: "As the deer pants for streams of water, so my soul pants for you, my God.", reference: "詩篇 42:1", referenceEn: "Psalm 42:1" },
    { text: "神所要的祭就是憂傷的靈；神啊，憂傷痛悔的心，你必不輕看。", textEn: "My sacrifice, O God, is a broken spirit; a broken and contrite heart you, God, will not despise.", reference: "詩篇 51:17", referenceEn: "Psalm 51:17" },
    { text: "我倚靠神，必不懼怕。人能把我怎麼樣呢？", textEn: "In God I trust and am not afraid. What can man do to me?", reference: "詩篇 56:11", referenceEn: "Psalm 56:11" },
    { text: "我心裡發昏的時候，我要從地極求告你。求你領我到那比我更高的磐石。", textEn: "From the ends of the earth I call to you, I call as my heart grows faint; lead me to the rock that is higher than I.", reference: "詩篇 61:2", referenceEn: "Psalm 61:2" },
    { text: "我的心默默無聲，專等候神；我的救恩是從他而來。", textEn: "Truly my soul finds rest in God; my salvation comes from him.", reference: "詩篇 62:1", referenceEn: "Psalm 62:1" },
    { text: "惟獨他是我的磐石，我的拯救；他是我的高臺，我必不很動搖。", textEn: "Truly he is my rock and my salvation; he is my fortress, I will never be shaken.", reference: "詩篇 62:2", referenceEn: "Psalm 62:2" },
    { text: "神啊，你是我的神，我要切切的尋求你。", textEn: "You, God, are my God, earnestly I seek you.", reference: "詩篇 63:1", referenceEn: "Psalm 63:1" },
    { text: "因你的慈愛比生命更好，我的嘴唇要頌讚你。", textEn: "Because your love is better than life, my lips will glorify you.", reference: "詩篇 63:3", referenceEn: "Psalm 63:3" },
    { text: "主耶和華啊，你是我所盼望的；從我年幼，你是我所倚靠的。", textEn: "For you have been my hope, Sovereign LORD, my confidence since my youth.", reference: "詩篇 71:5", referenceEn: "Psalm 71:5" },
    { text: "你要以你的訓言引導我，以後必接我到榮耀裡。", textEn: "You guide me with your counsel, and afterward you will take me into glory.", reference: "詩篇 73:24", referenceEn: "Psalm 73:24" },
    { text: "在你的院宇住一日，勝似在別處住千日。", textEn: "Better is one day in your courts than a thousand elsewhere.", reference: "詩篇 84:10", referenceEn: "Psalm 84:10" },
    { text: "慈愛和誠實彼此相遇；公義和平安彼此相親。", textEn: "Love and faithfulness meet together; righteousness and peace kiss each other.", reference: "詩篇 85:10", referenceEn: "Psalm 85:10" },
    { text: "主啊，你本為良善，樂意饒恕人，有豐盛的慈愛賜給凡求告你的人。", textEn: "You, Lord, are forgiving and good, abounding in love to all who call to you.", reference: "詩篇 86:5", referenceEn: "Psalm 86:5" },
    { text: "我要歌唱耶和華的慈愛，直到永遠。", textEn: "I will sing of the LORD’s great love forever.", reference: "詩篇 89:1", referenceEn: "Psalm 89:1" },
    { text: "求你使我們早早飽得你的慈愛，好叫我們一生一世歡呼喜樂。", textEn: "Satisfy us in the morning with your unfailing love, that we may sing for joy and be glad all our days.", reference: "詩篇 90:14", referenceEn: "Psalm 90:14" },
    { text: "我要論到耶和華說：他是我的避難所，是我的山寨，是我的神，是我所倚靠的。", textEn: "I will say of the LORD, 'He is my refuge and my fortress, my God, in whom I trust.'", reference: "詩篇 91:2", referenceEn: "Psalm 91:2" },
    { text: "神說：因為他專心愛我，我就要搭救他；因為他知道我的名，我要把他安置在高處。", textEn: "'Because he loves me,' says the LORD, 'I will rescue him; I will protect him, for he acknowledges my name.'", reference: "詩篇 91:14", referenceEn: "Psalm 91:14" },
    { text: "稱謝耶和華...本為美好。", textEn: "It is good to praise the LORD...", reference: "詩篇 92:1", referenceEn: "Psalm 92:1" },
    { text: "我心裡多憂多疑，你安慰我，就使我歡樂。", textEn: "When anxiety was great within me, your consolation brought me joy.", reference: "詩篇 94:19", referenceEn: "Psalm 94:19" },
    { text: "來啊，我們要向耶和華歌唱，向拯救我們的磐石歡呼！", textEn: "Come, let us sing for joy to the LORD; let us shout aloud to the Rock of our salvation.", reference: "詩篇 95:1", referenceEn: "Psalm 95:1" },
    { text: "你們當曉得耶和華是神！我們是他造的，也是屬他的。", textEn: "Know that the LORD is God. It is he who made us, and we are his.", reference: "詩篇 100:3", referenceEn: "Psalm 100:3" },
    { text: "當稱謝進入他的門；當讚美進入他的院。", textEn: "Enter his gates with thanksgiving and his courts with praise.", reference: "詩篇 100:4", referenceEn: "Psalm 100:4" },
    { text: "因為耶和華本為善。他的慈愛存到永遠；他的信實直到萬代。", textEn: "For the LORD is good and his love endures forever; his faithfulness continues through all generations.", reference: "詩篇 100:5", referenceEn: "Psalm 100:5" },
    { text: "我的心哪，你要稱頌耶和華！凡在我裡面的，也要稱頌他的聖名！", textEn: "Praise the LORD, my soul; all my inmost being, praise his holy name.", reference: "詩篇 103:1", referenceEn: "Psalm 103:1" },
    { text: "天離地何等的高，他的慈愛向敬畏他的人也是何等的大！", textEn: "For as high as the heavens are above the earth, so great is his love for those who fear him.", reference: "詩篇 103:11", referenceEn: "Psalm 103:11" },
    { text: "父親怎樣憐恤他的兒女，耶和華也怎樣憐恤敬畏他的人。", textEn: "As a father has compassion on his children, so the LORD has compassion on those who fear him.", reference: "詩篇 103:13", referenceEn: "Psalm 103:13" },
    { text: "要尋求耶和華與他的能力，時常尋求他的面。", textEn: "Look to the LORD and his strength; seek his face always.", reference: "詩篇 105:4", referenceEn: "Psalm 105:4" },
    { text: "你們要稱謝耶和華，因他本為善；他的慈愛永遠長存！", textEn: "Give thanks to the LORD, for he is good; his love endures forever.", reference: "詩篇 107:1", referenceEn: "Psalm 107:1" },
    { text: "耶和華的智慧是智慧的開端。", textEn: "The fear of the LORD is the beginning of wisdom.", reference: "詩篇 111:10", referenceEn: "Psalm 111:10" },
    { text: "他必不怕兇惡的信息；他心堅定，倚靠耶和華。", textEn: "They will have no fear of bad news; their hearts are steadfast, trusting in the LORD.", reference: "詩篇 112:7", referenceEn: "Psalm 112:7" },
    { text: "從日出之地到日落之處，耶和華的名是應當讚美的！", textEn: "From the rising of the sun to the place where it sets, the name of the LORD is to be praised.", reference: "詩篇 113:3", referenceEn: "Psalm 113:3" },
    { text: "你們敬畏耶和華的，要倚靠耶和華！他是你們的幫助和你們的盾牌。", textEn: "You who fear him, trust in the LORD— he is their help and shield.", reference: "詩篇 115:11", referenceEn: "Psalm 115:11" },
    { text: "我愛耶和華，因為他聽了我的聲音和我的懇求。", textEn: "I love the LORD, for he heard my voice; he heard my cry for mercy.", reference: "詩篇 116:1", referenceEn: "Psalm 116:1" },
    { text: "你們要稱謝耶和華，因他本為善；他的慈愛永遠長存！", textEn: "Give thanks to the LORD, for he is good; his love endures forever.", reference: "詩篇 118:1", referenceEn: "Psalm 118:1" },
    { text: "有耶和華幫助我，我必不懼怕，人能把我怎麼樣呢？", textEn: "The LORD is with me; I will not be afraid. What can mere mortals do to me?", reference: "詩篇 118:6", referenceEn: "Psalm 118:6" },
    { text: "耶和華是我的力量，是我的詩歌；他也成了我的拯救。", textEn: "The LORD is my strength and my defense; he has become my salvation.", reference: "詩篇 118:14", referenceEn: "Psalm 118:14" },
    { text: "少年人用什麼潔淨他的行為呢？是要遵行你的話！", textEn: "How can a young person stay on the path of purity? By living according to your word.", reference: "詩篇 119:9", referenceEn: "Psalm 119:9" },
    { text: "求你開我的眼睛，使我看出你律法中的奇妙。", textEn: "Open my eyes that I may see wonderful things in your law.", reference: "詩篇 119:18", referenceEn: "Psalm 119:18" },
    { text: "這話將我救活了；我在患難中，因此得安慰。", textEn: "My comfort in my suffering is this: Your promise preserves my life.", reference: "詩篇 119:50", referenceEn: "Psalm 119:50" },
    { text: "我受苦是與我有益，為要使我學習你的律例。", textEn: "It was good for me to be afflicted so that I might learn your decrees.", reference: "詩篇 119:71", referenceEn: "Psalm 119:71" },
    { text: "耶和華啊，你的話安定在天，直到永遠。", textEn: "Your word, LORD, is eternal; it stands firm in the heavens.", reference: "詩篇 119:89", referenceEn: "Psalm 119:89" },
    { text: "你的言語一解開就發出亮光，使愚人通達。", textEn: "The unfolding of your words gives light; it gives understanding to the simple.", reference: "詩篇 119:130", referenceEn: "Psalm 119:130" },
    { text: "愛你律法的人大有平安，什麼都不能使他們絆腳。", textEn: "Great peace have those who love your law, and nothing can make them stumble.", reference: "詩篇 119:165", referenceEn: "Psalm 119:165" },
    { text: "保護你的是耶和華；耶和華在你右邊蔭庇你。", textEn: "The LORD watches over you— the LORD is your shade at your right hand.", reference: "詩篇 121:5", referenceEn: "Psalm 121:5" },
    { text: "耶和華要保護你，免受一切的災害；他要保護你的性命。", textEn: "The LORD will keep you from all harm— he will watch over your life.", reference: "詩篇 121:7", referenceEn: "Psalm 121:7" },
    { text: "耶和華果然為我們行了大事，我們就歡喜。", textEn: "The LORD has done great things for us, and we are filled with joy.", reference: "詩篇 126:3", referenceEn: "Psalm 126:3" },
    { text: "我等候耶和華，我的心等候；我也仰望他的話。", textEn: "I wait for the LORD, my whole being waits, and in his word I put my hope.", reference: "詩篇 130:5", referenceEn: "Psalm 130:5" },
    { text: "看哪，弟兄和睦同居是何等的善，何等的美！", textEn: "How good and pleasant it is when God’s people live together in unity!", reference: "詩篇 133:1", referenceEn: "Psalm 133:1" },
    { text: "你們要稱謝耶和華，因他本為善；他的慈愛永遠長存。", textEn: "Give thanks to the LORD, for he is good. His love endures forever.", reference: "詩篇 136:1", referenceEn: "Psalm 136:1" },
    { text: "耶和華啊，你已經鑒察我，認識我。", textEn: "You have searched me, LORD, and you know me.", reference: "詩篇 139:1", referenceEn: "Psalm 139:1" },
    { text: "就是在那里，你的手必引導我；你的右手也必扶持我。", textEn: "Even there your hand will guide me, your right hand will hold me fast.", reference: "詩篇 139:10", referenceEn: "Psalm 139:10" },
    { text: "神啊，求你鑒察我，知道我的心思，試煉我，知道我的意念。", textEn: "Search me, God, and know my heart; test me and know my anxious thoughts.", reference: "詩篇 139:23", referenceEn: "Psalm 139:23" },
    { text: "求你使我清晨得聽你慈愛之言，因我倚靠你。", textEn: "Let the morning bring me word of your unfailing love, for I have put my trust in you.", reference: "詩篇 143:8", referenceEn: "Psalm 143:8" },
    { text: "求你指教我遵行你的旨意，因你是我的神。", textEn: "Teach me to do your will, for you are my God.", reference: "詩篇 143:10", referenceEn: "Psalm 143:10" },
    { text: "耶和華有恩惠，有憐憫，不輕易發怒，大有慈愛。", textEn: "The LORD is gracious and compassionate, slow to anger and rich in love.", reference: "詩篇 145:8", referenceEn: "Psalm 145:8" },
    { text: "耶和華善待萬民；他的慈悲覆庇他一切所造的。", textEn: "The LORD is good to all; he has compassion on all he has made.", reference: "詩篇 145:9", referenceEn: "Psalm 145:9" },
    { text: "他數點星宿的數目，一一稱它的名。", textEn: "He determines the number of the stars and calls them each by name.", reference: "詩篇 147:4", referenceEn: "Psalm 147:4" },
    { text: "凡有氣息的都要讚美耶和華！", textEn: "Let everything that has breath praise the LORD.", reference: "詩篇 150:6", referenceEn: "Psalm 150:6" },
    { text: "敬畏耶和華是知識的開端。", textEn: "The fear of the LORD is the beginning of knowledge.", reference: "箴言 1:7", referenceEn: "Proverbs 1:7" },
    { text: "因為，耶和華賜人智慧；知識和聰明都由他口而出。", textEn: "For the LORD gives wisdom; from his mouth come knowledge and understanding.", reference: "箴言 2:6", referenceEn: "Proverbs 2:6" },
    { text: "不要自以為有智慧；要敬畏耶和華，遠離惡事。", textEn: "Do not be wise in your own eyes; fear the LORD and shun evil.", reference: "箴言 3:7", referenceEn: "Proverbs 3:7" },
    { text: "因為耶和華所愛的，他必責備。", textEn: "Because the LORD disciplines those he loves.", reference: "箴言 3:12", referenceEn: "Proverbs 3:12" },
    { text: "因為耶和華是你所倚靠的；他必保守你的腳不陷入網羅。", textEn: "For the LORD will be at your side and will keep your foot from being snared.", reference: "箴言 3:26", referenceEn: "Proverbs 3:26" },
    { text: "但義人的路好像黎明的光，越照越明，直到日午。", textEn: "The path of the righteous is like the morning sun, shining ever brighter till the full light of day.", reference: "箴言 4:18", referenceEn: "Proverbs 4:18" },
    { text: "愛我的，我也愛他；懇切尋求我的，必尋得見。", textEn: "I love those who love me, and those who seek me find me.", reference: "箴言 8:17", referenceEn: "Proverbs 8:17" },
    { text: "恨能挑啟爭端；愛能遮掩一切過錯。", textEn: "Hatred stirs up conflict, but love covers over all wrongs.", reference: "箴言 10:12", referenceEn: "Proverbs 10:12" },
    { text: "耶和華所賜的福使人富足，並不加上憂慮。", textEn: "The blessing of the LORD brings wealth, without painful toil for it.", reference: "箴言 10:22", referenceEn: "Proverbs 10:22" },
    { text: "好施捨的，必得豐裕；滋潤人的，必得滋潤。", textEn: "A generous person will prosper; whoever refreshes others will be refreshed.", reference: "箴言 11:25", referenceEn: "Proverbs 11:25" },
    { text: "人心憂慮，屈而不伸；一句良言，使心歡樂。", textEn: "Anxiety weighs down the heart, but a kind word cheers it up.", reference: "箴言 12:25", referenceEn: "Proverbs 12:25" },
    { text: "與智慧人同行的，必得智慧。", textEn: "Walk with the wise and become wise.", reference: "箴言 13:20", referenceEn: "Proverbs 13:20" },
    { text: "敬畏耶和華的，大有倚靠；他的兒女也有避難所。", textEn: "Whoever fears the LORD has a secure fortress, and for their children it will be a refuge.", reference: "箴言 14:26", referenceEn: "Proverbs 14:26" },
    { text: "心中喜樂，面帶笑容；心裡憂愁，靈被損傷。", textEn: "A happy heart makes the face cheerful, but heartache crushes the spirit.", reference: "箴言 15:13", referenceEn: "Proverbs 15:13" },
    { text: "口善應對，自覺喜樂；話合其時，何等美好。", textEn: "A person finds joy in giving an apt reply— and how good is a timely word!", reference: "箴言 15:23", referenceEn: "Proverbs 15:23" },
    { text: "驕傲在敗壞以先；狂心在跌倒之前。", textEn: "Pride goes before destruction, a haughty spirit before a fall.", reference: "箴言 16:18", referenceEn: "Proverbs 16:18" },
    { text: "朋友乃時常親愛，弟兄為患難而生。", textEn: "A friend loves at all times, and a brother is born for a time of adversity.", reference: "箴言 17:17", referenceEn: "Proverbs 17:17" },
    { text: "聰明人的心得知識；智慧人的耳求知識。", textEn: "The heart of the discerning acquires knowledge, for the ears of the wise seek it out.", reference: "箴言 18:15", referenceEn: "Proverbs 18:15" },
    { text: "人有見識就不輕易發怒；寬恕人的過失便是自己的榮耀。", textEn: "A person’s wisdom yields patience; it is to one’s glory to overlook an offense.", reference: "箴言 19:11", referenceEn: "Proverbs 19:11" },
    { text: "你要聽勸教，受訓誨，使你終久有智慧。", textEn: "Listen to advice and accept discipline, and at the end you will be counted among the wise.", reference: "箴言 19:20", referenceEn: "Proverbs 19:20" },
    { text: "人心多有計謀；惟有耶和華的籌算才能立定。", textEn: "Many are the plans in a person’s heart, but it is the LORD’s purpose that prevails.", reference: "箴言 19:21", referenceEn: "Proverbs 19:21" },
    { text: "你不要說，我要以惡報惡；要等候耶和華，他必拯救你。", textEn: "Do not say, 'I'll pay you back for this wrong!' Wait for the LORD, and he will avenge you.", reference: "箴言 20:22", referenceEn: "Proverbs 20:22" },
    { text: "人所行的，若蒙耶和華喜悅，耶和華也使他的仇敵與他和好。", textEn: "When the LORD takes pleasure in anyone’s way, he causes their enemies to make peace with them.", reference: "箴言 16:7", referenceEn: "Proverbs 16:7" },
    { text: "追求公義仁慈的，就尋得生命、公義，和尊榮。", textEn: "Whoever pursues righteousness and love finds life, prosperity and honor.", reference: "箴言 21:21", referenceEn: "Proverbs 21:21" },
    { text: "敬畏耶和華心存謙卑，就得富有、尊榮、生命為賞賜。", textEn: "Humility is the fear of the LORD; its wages are riches and honor and life.", reference: "箴言 22:4", referenceEn: "Proverbs 22:4" },
    { text: "教養孩童，使他走當行的道，就是到老他也不偏離。", textEn: "Start children off on the way they should go, and even when they are old they will not turn from it.", reference: "箴言 22:6", referenceEn: "Proverbs 22:6" },
    { text: "因為義人雖七次跌倒，仍必興起。", textEn: "For though the righteous fall seven times, they rise again.", reference: "箴言 24:16", referenceEn: "Proverbs 24:16" },
    { text: "水中照臉，彼此相符；人與人，心也相對。", textEn: "As water reflects the face, so one’s life reflects the heart.", reference: "箴言 27:19", referenceEn: "Proverbs 27:19" },
    { text: "遮掩自己罪過的，必不亨通；承認離棄罪過的，必蒙憐恤。", textEn: "Whoever conceals their sins does not prosper, but the one who confesses and renounces them finds mercy.", reference: "箴言 28:13", referenceEn: "Proverbs 28:13" },
    { text: "懼怕人的，陷入網羅；惟有倚靠耶和華的，必得安穩。", textEn: "Fear of man will prove to be a snare, but whoever trusts in the LORD is kept safe.", reference: "箴言 29:25", referenceEn: "Proverbs 29:25" },
    { text: "你心裡不要急躁惱怒，因為惱怒存在愚昧人的懷中。", textEn: "Do not be quickly provoked in your spirit, for anger resides in the lap of fools.", reference: "傳道書 7:9", referenceEn: "Ecclesiastes 7:9" },
    { text: "凡你手所當做的事，要盡力去做。", textEn: "Whatever your hand finds to do, do it with all your might.", reference: "傳道書 9:10", referenceEn: "Ecclesiastes 9:10" },
    { text: "當將你的糧食撒在水面，因為日久必能得著。", textEn: "Cast your bread upon the waters, for you will find it after many days.", reference: "傳道書 11:1", referenceEn: "Ecclesiastes 11:1" },
    { text: "總意就是：敬畏神，謹守他的誡命，這是人所當盡的本分。", textEn: "Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments.", reference: "傳道書 12:13", referenceEn: "Ecclesiastes 12:13" },
    { text: "他帶我入筵宴所，以愛為旗在我以上。", textEn: "Let him lead me to the banquet hall, and let his banner over me be love.", reference: "雅歌 2:4", referenceEn: "Song of Songs 2:4" },
    { text: "愛情，眾水不能熄滅，大水也不能淹沒。", textEn: "Many waters cannot quench love; rivers cannot sweep it away.", reference: "雅歌 8:7", referenceEn: "Song of Songs 8:7" },
    { text: "耶和華說：你們來，我們彼此辯論。你們的罪雖像硃紅，必變成雪白。", textEn: "'Come now, let us settle the matter,' says the LORD. 'Though your sins are like scarlet, they shall be as white as snow.'", reference: "以賽亞書 1:18", referenceEn: "Isaiah 1:18" },
    { text: "我又聽見主的聲音說：「我可以差遣誰呢？誰肯為我們去呢？」我說：「我在這裡，請差遣我！」", textEn: "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I. Send me!'", reference: "以賽亞書 6:8", referenceEn: "Isaiah 6:8" },
    { text: "你們若是不信，定然不得立穩。", textEn: "If you do not stand firm in your faith, you will not stand at all.", reference: "以賽亞書 7:9", referenceEn: "Isaiah 7:9" },
    { text: "因有一嬰孩為我們而生；有一子賜給我們。政權必擔在他的肩頭上。", textEn: "For to us a child is born, to us a son is given, and the government will be on his shoulders.", reference: "以賽亞書 9:6", referenceEn: "Isaiah 9:6" },
    { text: "夜間，我心中羨慕你；我裡面的靈切切尋求你。", textEn: "My soul yearns for you in the night; in the morning my spirit longs for you.", reference: "以賽亞書 26:9", referenceEn: "Isaiah 26:9" },
    { text: "耶和華是我們的審判者，耶和華是我們的立法者，耶和華是我們的王；他必拯救我們。", textEn: "For the LORD is our judge, the LORD is our lawgiver, the LORD is our king; it is he who will save us.", reference: "以賽亞書 33:22", referenceEn: "Isaiah 33:22" },
    { text: "耶和華救贖的民必歸回，歌唱來到錫安；永樂必歸到他們的頭上。", textEn: "and those the LORD has rescued will return. They will enter Zion with singing; everlasting joy will crown their heads.", reference: "以賽亞書 35:10", referenceEn: "Isaiah 35:10" },
    { text: "你豈不曾知道嗎？你豈不曾聽見嗎？永在的神耶和華，創造地極的主，並不疲乏，也不困倦。", textEn: "Do you not know? Have you not heard? The LORD is the everlasting God, the Creator of the ends of the earth. He will not grow tired or weary.", reference: "以賽亞書 40:28", referenceEn: "Isaiah 40:28" },
    { text: "你不要害怕！因為我救贖了你。我曾提你的名召你，你是屬我的。", textEn: "Do not fear, for I have redeemed you; I have summoned you by name; you are mine.", reference: "以賽亞書 43:1", referenceEn: "Isaiah 43:1" },
    { text: "因我看你為寶為尊；又因我愛你。", textEn: "Since you are precious and honored in my sight, and because I love you.", reference: "以賽亞書 43:4", referenceEn: "Isaiah 43:4" },
    { text: "惟有我為自己的緣故塗抹你的過犯；我也不記念你的罪惡。", textEn: "I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.", reference: "以賽亞書 43:25", referenceEn: "Isaiah 43:25" },
    { text: "我要將水澆灌口渴的人，將河澆灌乾旱之地。", textEn: "For I will pour water on the thirsty land, and streams on the dry ground.", reference: "以賽亞書 44:3", referenceEn: "Isaiah 44:3" },
    { text: "我是耶和華，在我以外並沒有別神。", textEn: "I am the LORD, and there is no other; apart from me there is no God.", reference: "以賽亞書 45:5", referenceEn: "Isaiah 45:5" },
    { text: "直到你們年老，我仍是這樣；直到你們髮白，我仍懷搋。", textEn: "Even to your old age and gray hairs I am he, I am he who will sustain you.", reference: "以賽亞書 46:4", referenceEn: "Isaiah 46:4" },
    { text: "我是耶和華你的神，教訓你，使你得益處，引導你所當行的路。", textEn: "I am the LORD your God, who teaches you what is best for you, who directs you in the way you should go.", reference: "以賽亞書 48:17", referenceEn: "Isaiah 48:17" },
    { text: "那報佳音，傳平安，報好信，傳救恩的...這人的腳登山何等佳美！", textEn: "How beautiful on the mountains are the feet of those who bring good news, who proclaim peace.", reference: "以賽亞書 52:7", referenceEn: "Isaiah 52:7" },
    { text: "哪知他為我們的過犯受害，為我們的罪孽壓傷。因他受的刑罰我們得平安，因他受的鞭傷我們得醫治。", textEn: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.", reference: "以賽亞書 53:5", referenceEn: "Isaiah 53:5" },
    { text: "凡為攻擊你造成的器械必不利用。", textEn: "No weapon forged against you will prevail.", reference: "以賽亞書 54:17", referenceEn: "Isaiah 54:17" },
    { text: "你們一切乾渴的都當就近水來；沒有銀錢的也可以來。", textEn: "Come, all you who are thirsty, come to the waters; and you who have no money, come.", reference: "以賽亞書 55:1", referenceEn: "Isaiah 55:1" },
    { text: "耶和華也必時常引導你，在乾旱之地使你心滿意足，骨頭強壯。", textEn: "The LORD will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame.", reference: "以賽亞書 58:11", referenceEn: "Isaiah 58:11" },
    { text: "日頭不再作你白晝的光，月亮也不再發光照耀你。耶和華卻要作你永遠的光！", textEn: "The sun will no more be your light by day, nor will the brightness of the moon shine on you, for the LORD will be your everlasting light.", reference: "以賽亞書 60:19", referenceEn: "Isaiah 60:19" },
    { text: "主耶和華的靈在我身上；因為耶和華用膏膏我，叫我傳好信息給謙卑的人。", textEn: "The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor.", reference: "以賽亞書 61:1", referenceEn: "Isaiah 61:1" },
    { text: "賜華冠與錫安悲哀的人，代替灰塵；喜樂油代替悲哀；讚美衣代替憂傷之靈。", textEn: "to bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair.", reference: "以賽亞書 61:3", referenceEn: "Isaiah 61:3" },
    { text: "耶和華啊，現在你仍是我們的父！我們是泥，你是窯匠；我們都是你手的工作。", textEn: "Yet you, LORD, are our Father. We are the clay, you are the potter; we are all the work of your hand.", reference: "以賽亞書 64:8", referenceEn: "Isaiah 64:8" },
    { text: "母親怎樣安慰兒子，我就照樣安慰你們。", textEn: "As a mother comforts her child, so will I comfort you.", reference: "以賽亞書 66:13", referenceEn: "Isaiah 66:13" },
    { text: "我未將你造在腹中，我已曉得你；你未出母胎，我已分別你為聖。", textEn: "Before I formed you in the womb I knew you, before you were born I set you apart.", reference: "耶利米書 1:5", referenceEn: "Jeremiah 1:5" },
    { text: "耶和華啊，求你醫治我，我便痊癒；拯救我，我便得救；因你是我所讚美的。", textEn: "Heal me, LORD, and I will be healed; save me and I will be saved, for you are the one I praise.", reference: "耶利米書 17:14", referenceEn: "Jeremiah 17:14" },
    { text: "你們要呼求我，禱告我，我就應允你們。", textEn: "Then you will call on me and come and pray to me, and I will listen to you.", reference: "耶利米書 29:12", referenceEn: "Jeremiah 29:12" },
    { text: "你們尋求我，若專心尋求我，就必尋見。", textEn: "You will seek me and find me when you seek me with all your heart.", reference: "耶利米書 29:13", referenceEn: "Jeremiah 29:13" },
    { text: "主耶和華啊，你曾用大能和伸出來的膀臂創造天地，在你沒有難成的事。", textEn: "Ah, Sovereign LORD, you have made the heavens and the earth by your great power and outstretched arm. Nothing is too hard for you.", reference: "耶利米書 32:17", referenceEn: "Jeremiah 32:17" },
    { text: "我是耶和華，是凡有血氣者的神，豈有我難成的事嗎？", textEn: "I am the LORD, the God of all mankind. Is anything too hard for me?", reference: "耶利米書 32:27", referenceEn: "Jeremiah 32:27" },
    { text: "我心裡說：耶和華是我的分，因此，我要仰望他。", textEn: "I say to myself, 'The LORD is my portion; therefore I will wait for him.'", reference: "耶利米哀歌 3:24", referenceEn: "Lamentations 3:24" },
    { text: "凡等候耶和華，心裡尋求他的，耶和華必施恩給他。", textEn: "The LORD is good to those whose hope is in him, to the one who seeks him.", reference: "耶利米哀歌 3:25", referenceEn: "Lamentations 3:25" },
    { text: "人仰望耶和華，靜默等候他的救恩，這原是好的。", textEn: "It is good to wait quietly for the salvation of the LORD.", reference: "耶利米哀歌 3:26", referenceEn: "Lamentations 3:26" },
    { text: "因為主必不永遠丟棄人。", textEn: "For no one is cast off by the Lord forever.", reference: "耶利米哀歌 3:31", referenceEn: "Lamentations 3:31" },
    { text: "我們當深深考察自己的行為，再歸向耶和華。", textEn: "Let us examine our ways and test them, and let us return to the LORD.", reference: "耶利米哀歌 3:40", referenceEn: "Lamentations 3:40" },
    { text: "我求告你的日子，你臨近我，說：不要懼怕！", textEn: "You came near when I called you, and you said, 'Do not fear.'", reference: "耶利米哀歌 3:57", referenceEn: "Lamentations 3:57" },
    { text: "耶和華啊，你存到永遠；你的寶座存到萬代。", textEn: "You, LORD, reign forever; your throne endures from generation to generation.", reference: "耶利米哀歌 5:19", referenceEn: "Lamentations 5:19" },
    { text: "我要使他們有合一的心，合一的道，好叫他們永遠敬畏我。", textEn: "I will give them singleness of heart and action, so that they will always fear me.", reference: "耶利米書 32:39", referenceEn: "Jeremiah 32:39" },
    { text: "我也要賜給你們一個新心，將新靈放在你們裡面。", textEn: "I will give you a new heart and put a new spirit in you.", reference: "以西結書 36:26", referenceEn: "Ezekiel 36:26" },
    { text: "神的名是應當稱頌的！從亙古直到永遠，因為智慧能力都屬乎他。", textEn: "Praise be to the name of God for ever and ever; wisdom and power are his.", reference: "但以理書 2:20", referenceEn: "Daniel 2:20" },
    { text: "智慧人必發光，如同天上的光；那使多人歸義的，必發光如星，直到永永遠遠。", textEn: "Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever.", reference: "但以理書 12:3", referenceEn: "Daniel 12:3" },
    { text: "我們務要認識耶和華，竭力追求認識他。", textEn: "Let us acknowledge the LORD; let us press on to acknowledge him.", reference: "何西阿書 6:3", referenceEn: "Hosea 6:3" },
    { text: "我喜愛良善，不喜愛祭祀；喜愛認識神，勝於燔祭。", textEn: "For I desire mercy, not sacrifice, and acknowledgment of God rather than burnt offerings.", reference: "何西阿書 6:6", referenceEn: "Hosea 6:6" },
    { text: "你們要撕裂心腸，不撕裂衣服。歸向耶和華你們的神。", textEn: "Rend your heart and not your garments. Return to the LORD your God.", reference: "約珥書 2:13", referenceEn: "Joel 2:13" },
    { text: "要尋求善，不尋求惡，就必存活。", textEn: "Seek good, not evil, that you may live.", reference: "阿摩司書 5:14", referenceEn: "Amos 5:14" },
    { text: "至於我，我要仰望耶和華，要等候那救我的神；我的神必應允我。", textEn: "But as for me, I watch in hope for the LORD, I wait for God my Savior; my God will hear me.", reference: "彌迦書 7:7", referenceEn: "Micah 7:7" },
    { text: "我的仇敵啊，不要向我誇耀。我雖跌倒，卻要起來；我雖坐在黑暗裡，耶和華卻作我的光。", textEn: "Do not gloat over me, my enemy! Though I have fallen, I will rise. Though I sit in darkness, the LORD will be my light.", reference: "彌迦書 7:8", referenceEn: "Micah 7:8" },
    { text: "神啊，有何神像你，赦免罪孽...不永遠懷怒，喜愛施恩？", textEn: "Who is a God like you, who pardons sin... You do not stay angry forever but delight to show mercy.", reference: "彌迦書 7:18", referenceEn: "Micah 7:18" },
    { text: "耶和華本為善，在患難的日子為人的保障，並且認得那些投靠他的人。", textEn: "The LORD is good, a refuge in times of trouble. He cares for those who trust in him.", reference: "那鴻書 1:7", referenceEn: "Nahum 1:7" },
    { text: "惟義人因信得生。", textEn: "but the righteous person will live by his faithfulness.", reference: "哈巴谷書 2:4", referenceEn: "Habakkuk 2:4" },
    { text: "主耶和華是我的力量；他使我的腳快如母鹿的蹄，又使我穩行在高處。", textEn: "The Sovereign LORD is my strength; he makes my feet like the feet of a deer, he enables me to tread on the heights.", reference: "哈巴谷書 3:19", referenceEn: "Habakkuk 3:19" },
    { text: "這殿後來的榮耀必大過先前的榮耀...在這地方我必賜平安。", textEn: "'The glory of this present house will be greater than the glory of the former house,' says the LORD Almighty. 'And in this place I will grant peace.'", reference: "哈該書 2:9", referenceEn: "Haggai 2:9" },
    { text: "看哪，你的王來到你這裡！他是公義的，並且施行拯救。", textEn: "See, your king comes to you, righteous and victorious.", reference: "撒迦利亞書 9:9", referenceEn: "Zechariah 9:9" },
    { text: "你們要將當納的十分之一全然送入倉庫...以此試試我，是否為你們敞開天上的窗戶，傾福與你們。", textEn: "Bring the whole tithe into the storehouse... Test me in this... and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.", reference: "瑪拉基書 3:10", referenceEn: "Malachi 3:10" },
    { text: "人活著，不是單靠食物，乃是靠神口裡所出的一切話。", textEn: "Man shall not live on bread alone, but on every word that comes from the mouth of God.", reference: "馬太福音 4:4", referenceEn: "Matthew 4:4" },
    { text: "虛心的人有福了！因為天國是他們的。", textEn: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.", reference: "馬太福音 5:3", referenceEn: "Matthew 5:3" },
    { text: "哀慟的人有福了！因為他們必得安慰。", textEn: "Blessed are those who mourn, for they will be comforted.", reference: "馬太福音 5:4", referenceEn: "Matthew 5:4" },
    { text: "溫柔的人有福了！因為他們必承受地土。", textEn: "Blessed are the meek, for they will inherit the earth.", reference: "馬太福音 5:5", referenceEn: "Matthew 5:5" },
    { text: "飢渴慕義的人有福了！因為他們必得飽足。", textEn: "Blessed are those who hunger and thirst for righteousness, for they will be filled.", reference: "馬太福音 5:6", referenceEn: "Matthew 5:6" },
    { text: "憐恤人的人有福了！因為他們必蒙憐恤。", textEn: "Blessed are the merciful, for they will be shown mercy.", reference: "馬太福音 5:7", referenceEn: "Matthew 5:7" },
    { text: "清心的人有福了！因為他們必得見神。", textEn: "Blessed are the pure in heart, for they will see God.", reference: "馬太福音 5:8", referenceEn: "Matthew 5:8" },
    { text: "要愛你們的仇敵，為那逼迫你們的禱告。", textEn: "Love your enemies and pray for those who persecute you.", reference: "馬太福音 5:44", referenceEn: "Matthew 5:44" },
    { text: "你禱告的時候，要進你的內屋，關上門，禱告你在暗中的父。", textEn: "But when you pray, go into your room, close the door and pray to your Father, who is unseen.", reference: "馬太福音 6:6", referenceEn: "Matthew 6:6" },
    { text: "你們饒恕人的過犯，你們的天父也必饒恕你們的過犯。", textEn: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.", reference: "馬太福音 6:14", referenceEn: "Matthew 6:14" },
    { text: "只要積攢財寶在天上；天上沒有蟲子咬，不能鏽壞，也沒有賊挖窟窿來偷。", textEn: "But store up for yourselves treasures in heaven, where moths and vermin do not destroy, and where thieves do not break in and steal.", reference: "馬太福音 6:20", referenceEn: "Matthew 6:20" },
    { text: "你們看那天空的飛鳥，也不種，也不收...你們的天父尚且養活牠。你們不比飛鳥貴重得多嗎？", textEn: "Look at the birds of the air; they do not sow or reap... and yet your heavenly Father feeds them. Are you not much more valuable than they?", reference: "馬太福音 6:26", referenceEn: "Matthew 6:26" },
    { text: "你們不要論斷人，免得你們被論斷。", textEn: "Do not judge, or you too will be judged.", reference: "馬太福音 7:1", referenceEn: "Matthew 7:1" },
    { text: "無論何事，你們願意人怎樣待你們，你們也要怎樣待人。", textEn: "So in everything, do to others what you would have them do to you.", reference: "馬太福音 7:12", referenceEn: "Matthew 7:12" },
    { text: "他看見許多的人，就憐憫他們；因為他們困苦流離，如同羊沒有牧人一般。", textEn: "When he saw the crowds, he had compassion on them, because they were harassed and helpless, like sheep without a shepherd.", reference: "馬太福音 9:36", referenceEn: "Matthew 9:36" },
    { text: "你們的頭髮也都被數過了。所以，不要懼怕，你們比許多麻雀還貴重！", textEn: "And even the very hairs of your head are all numbered. So don’t be afraid; you are worth more than many sparrows.", reference: "馬太福音 10:30-31", referenceEn: "Matthew 10:30-31" },
    { text: "我的軛是容易的，我的擔子是輕省的。", textEn: "For my yoke is easy and my burden is light.", reference: "馬太福音 11:30", referenceEn: "Matthew 11:30" },
    { text: "讓小孩子到我這裡來，不要禁止他們；因為在天國的，正是這樣的人。", textEn: "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.", reference: "馬太福音 19:14", referenceEn: "Matthew 19:14" },
    { text: "你們禱告，無論求什麼，只要信，就必得著。", textEn: "If you believe, you will receive whatever you ask for in prayer.", reference: "馬太福音 21:22", referenceEn: "Matthew 21:22" },
    { text: "你要盡心、盡性、盡意愛主你的神。這是誡命中的第一，且是最大的。", textEn: "Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment.", reference: "馬太福音 22:37-38", referenceEn: "Matthew 22:37-38" },
    { text: "其次也相仿，就是要愛人如己。", textEn: "And the second is like it: 'Love your neighbor as yourself.'", reference: "馬太福音 22:39", referenceEn: "Matthew 22:39" },
    { text: "天地要廢去，我的話卻不能廢去。", textEn: "Heaven and earth will pass away, but my words will never pass away.", reference: "馬太福音 24:35", referenceEn: "Matthew 24:35" },
    { text: "這些事你們既做在我這弟兄中一個最小的身上，就是做在我身上了。", textEn: "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.", reference: "馬太福音 25:40", referenceEn: "Matthew 25:40" },
    { text: "在人是不能，在神卻不然，因為神凡事都能。", textEn: "With man this is impossible, but not with God; all things are possible with God.", reference: "馬可福音 10:27", referenceEn: "Mark 10:27" },
    { text: "你要盡心、盡性、盡意、盡力愛主你的神。", textEn: "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.", reference: "馬可福音 12:30", referenceEn: "Mark 12:30" },
    { text: "那相信的女子是有福的！因為主對她所說的話都要應驗。", textEn: "Blessed is she who has believed that the Lord would fulfill his promises to her!", reference: "路加福音 1:45", referenceEn: "Luke 1:45" },
    { text: "不要懼怕！我報給你們大喜的信息，是關乎萬民的。", textEn: "Do not be afraid. I bring you good news that will cause great joy for all the people.", reference: "路加福音 2:10", referenceEn: "Luke 2:10" },
    { text: "你們願意人怎樣待你們，你們也要怎樣待人。", textEn: "Do to others as you would have them do to you.", reference: "路加福音 6:31", referenceEn: "Luke 6:31" },
    { text: "你們要慈悲，像你們的父慈悲一樣。", textEn: "Be merciful, just as your Father is merciful.", reference: "路加福音 6:36", referenceEn: "Luke 6:36" },
    { text: "你們要給人，就必有給你們的。", textEn: "Give, and it will be given to you.", reference: "路加福音 6:38", referenceEn: "Luke 6:38" },
    { text: "你們祈求，就給你們；尋找，就尋見；叩門，就給你們開門。", textEn: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", reference: "路加福音 11:9", referenceEn: "Luke 11:9" },
    { text: "就是你們的頭髮，也都被數過了。不要懼怕，你們比許多麻雀還貴重！", textEn: "Indeed, the very hairs of your head are all numbered. Don’t be afraid; you are worth more than many sparrows.", reference: "路加福音 12:7", referenceEn: "Luke 12:7" },
    { text: "因為，你們的財寶在哪裡，你們的心也在那裡。", textEn: "For where your treasure is, there your heart will be also.", reference: "路加福音 12:34", referenceEn: "Luke 12:34" },
    { text: "太初有道，道與神同在，道就是神。", textEn: "In the beginning was the Word, and the Word was with God, and the Word was God.", reference: "約翰福音 1:1", referenceEn: "John 1:1" },
    { text: "生命在他裡頭，這生命就是人的光。", textEn: "In him was life, and that life was the light of all mankind.", reference: "約翰福音 1:4", referenceEn: "John 1:4" },
    { text: "凡接待他的，就是信他名的人，他就賜他們權柄作神的兒女。", textEn: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.", reference: "約翰福音 1:12", referenceEn: "John 1:12" },
    { text: "道成了肉身，住在我們中間，充充滿滿的有恩典有真理。", textEn: "The Word became flesh and made his dwelling among us. We have seen his glory... full of grace and truth.", reference: "約翰福音 1:14", referenceEn: "John 1:14" },
    { text: "因為神差他的兒子降世，不是要定世人的罪，乃是要叫世人因他得救。", textEn: "For God did not send his Son into the world to condemn the world, but to save the world through him.", reference: "約翰福音 3:17", referenceEn: "John 3:17" },
    { text: "人若喝我所賜的水就永遠不渴。", textEn: "but whoever drinks the water I give them will never thirst.", reference: "約翰福音 4:14", referenceEn: "John 4:14" },
    { text: "神是個靈，所以拜他的必須用心靈和誠實拜他。", textEn: "God is spirit, and his worshipers must worship in the Spirit and in truth.", reference: "約翰福音 4:24", referenceEn: "John 4:24" },
    { text: "那聽我話、又信差我來者的，就有永生，不至於定罪，是已經出死入生了。", textEn: "Very truly I tell you, whoever hears my word and believes him who sent me has eternal life and will not be judged but has crossed over from death to life.", reference: "約翰福音 5:24", referenceEn: "John 5:24" },
    { text: "信神所差來的，這就是做神的工。", textEn: "The work of God is this: to believe in the one he has sent.", reference: "約翰福音 6:29", referenceEn: "John 6:29" },
    { text: "你們必曉得真理，真理必叫你們得以自由。", textEn: "Then you will know the truth, and the truth will set you free.", reference: "約翰福音 8:32", referenceEn: "John 8:32" },
    { text: "我就是門；凡從我進來的，必然得救，並且出入得草吃。", textEn: "I am the gate; whoever enters through me will be saved. They will come in and go out, and find pasture.", reference: "約翰福音 10:9", referenceEn: "John 10:9" },
    { text: "我的羊聽我的聲音，我也認識他們，他們也跟著我。", textEn: "My sheep listen to my voice; I know them, and they follow me.", reference: "約翰福音 10:27", referenceEn: "John 10:27" },
    { text: "復活在我，生命也在我。信我的人雖然死了，也必復活。", textEn: "I am the resurrection and the life. The one who believes in me will live, even though they die.", reference: "約翰福音 11:25", referenceEn: "John 11:25" },
    { text: "你們若有彼此相愛的心，眾人因此就認出你們是我的門徒了。", textEn: "By this everyone will know that you are my disciples, if you love one another.", reference: "約翰福音 13:35", referenceEn: "John 13:35" },
    { text: "我去原是為你們預備地方去。", textEn: "I go to prepare a place for you.", reference: "約翰福音 14:2", referenceEn: "John 14:2" },
    { text: "你們若愛我，就必遵守我的命令。", textEn: "If you love me, keep my commands.", reference: "約翰福音 14:15", referenceEn: "John 14:15" },
    { text: "我不撇下你們為孤兒，我必到你們這裡來。", textEn: "I will not leave you as orphans; I will come to you.", reference: "約翰福音 14:18", referenceEn: "John 14:18" },
    { text: "人若愛我，就必遵守我的道；我父也必愛他，並且我們要到他那裡去，與他同住。", textEn: "Anyone who loves me will obey my teaching. My Father will love them, and we will come to them and make our home with them.", reference: "約翰福音 14:23", referenceEn: "John 14:23" },
    { text: "你們若常在我裡面，我的話也常在你們裡面，凡你們所願意的，祈求，就給你們成就。", textEn: "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you.", reference: "約翰福音 15:7", referenceEn: "John 15:7" },
    { text: "我愛你們，正如父愛我一樣；你們要常在我的愛裡。", textEn: "As the Father has loved me, so have I loved you. Now remain in my love.", reference: "約翰福音 15:9", referenceEn: "John 15:9" },
    { text: "你們要彼此相愛，像我愛你們一樣；這就是我的命令。", textEn: "My command is this: Love each other as I have loved you.", reference: "約翰福音 15:12", referenceEn: "John 15:12" },
    { text: "不是你們揀選了我，是我揀選了你們，並且分派你們去結果子。", textEn: "You did not choose me, but I chose you and appointed you so that you might go and bear fruit.", reference: "約翰福音 15:16", referenceEn: "John 15:16" },
    { text: "求你用真理使他們成聖；你的道就是真理。", textEn: "Sanctify them by the truth; your word is truth.", reference: "約翰福音 17:17", referenceEn: "John 17:17" },
    { text: "那沒有看見就信的有福了。", textEn: "Blessed are those who have not seen and yet have believed.", reference: "約翰福音 20:29", referenceEn: "John 20:29" },
    { text: "但聖靈降臨在你們身上，你們就必得著能力...作我的見證。", textEn: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses.", reference: "使徒行傳 1:8", referenceEn: "Acts 1:8" },
    { text: "除他以外，別無拯救；因為在天下人間，沒有賜下別的名，我們可以靠著得救。", textEn: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.", reference: "使徒行傳 4:12", referenceEn: "Acts 4:12" },
    { text: "當信主耶穌，你和你一家都必得救。", textEn: "Believe in the Lord Jesus, and you will be saved—you and your household.", reference: "使徒行傳 16:31", referenceEn: "Acts 16:31" },
    { text: "施比受更為有福。", textEn: "It is more blessed to give than to receive.", reference: "使徒行傳 20:35", referenceEn: "Acts 20:35" },
    { text: "我不以福音為恥；這福音本是神的大能，要救一切相信的。", textEn: "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.", reference: "羅馬書 1:16", referenceEn: "Romans 1:16" },
    { text: "因為世人都犯了罪，虧缺了神的榮耀。", textEn: "for all have sinned and fall short of the glory of God.", reference: "羅馬書 3:23", referenceEn: "Romans 3:23" },
    { text: "我們既因信稱義，就藉著我們的主耶穌基督得與神相和。", textEn: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ.", reference: "羅馬書 5:1", referenceEn: "Romans 5:1" },
    { text: "因為罪的工價乃是死；惟有神的恩賜，在我們的主基督耶穌裡，乃是永生。", textEn: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.", reference: "羅馬書 6:23", referenceEn: "Romans 6:23" },
    { text: "體貼肉體的，就是死；體貼聖靈的，乃是生命、平安。", textEn: "The mind governed by the flesh is death, but the mind governed by the Spirit is life and peace.", reference: "羅馬書 8:6", referenceEn: "Romans 8:6" },
    { text: "況且我們的軟弱有聖靈幫助...聖靈親自用說不出來的嘆息替我們禱告。", textEn: "In the same way, the Spirit helps us in our weakness... the Spirit himself intercedes for us through wordless groans.", reference: "羅馬書 8:26", referenceEn: "Romans 8:26" },
    { text: "因為我深信無論是死，是生...都不能叫我們與神的愛隔絕。", textEn: "For I am convinced that neither death nor life... will be able to separate us from the love of God.", reference: "羅馬書 8:38-39", referenceEn: "Romans 8:38-39" },
    { text: "可見信道是從聽道來的，聽道是從基督的話來的。", textEn: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.", reference: "羅馬書 10:17", referenceEn: "Romans 10:17" },
    { text: "深哉，神豐富的智慧和知識！他的判斷何其難測！他的蹤跡何其難尋！", textEn: "Oh, the depth of the riches of the wisdom and knowledge of God! How unsearchable his judgments, and his paths beyond tracing out!", reference: "羅馬書 11:33", referenceEn: "Romans 11:33" },
    { text: "因為萬有都是本於他，倚靠他，歸於他。願榮耀歸給他，直到永遠。", textEn: "For from him and through him and for him are all things. To him be the glory forever!", reference: "羅馬書 11:36", referenceEn: "Romans 11:36" },
    { text: "將身體獻上，當作活祭，是聖潔的，是神所喜悅的。", textEn: "Offer your bodies as a living sacrifice, holy and pleasing to God.", reference: "羅馬書 12:1", referenceEn: "Romans 12:1" },
    { text: "愛人不可虛假；惡要厭惡，善要親近。", textEn: "Love must be sincere. Hate what is evil; cling to what is good.", reference: "羅馬書 12:9", referenceEn: "Romans 12:9" },
    { text: "愛弟兄，要彼此親熱；恭敬人，要彼此推讓。", textEn: "Be devoted to one another in love. Honor one another above yourselves.", reference: "羅馬書 12:10", referenceEn: "Romans 12:10" },
    { text: "與喜樂的人要同樂；與哀哭的人要同哭。", textEn: "Rejoice with those who rejoice; mourn with those who mourn.", reference: "羅馬書 12:15", referenceEn: "Romans 12:15" },
    { text: "若是能行，總要盡力與眾人和睦。", textEn: "If it is possible, as far as it depends on you, live at peace with everyone.", reference: "羅馬書 12:18", referenceEn: "Romans 12:18" },
    { text: "凡事都不可虧欠人，惟有彼此相愛要常以為虧欠。", textEn: "Let no debt remain outstanding, except the continuing debt to love one another.", reference: "羅馬書 13:8", referenceEn: "Romans 13:8" },
    { text: "愛是不加害與人的，所以愛就完全了律法。", textEn: "Love does no harm to a neighbor. Therefore love is the fulfillment of the law.", reference: "羅馬書 13:10", referenceEn: "Romans 13:10" },
    { text: "因為神的國不在乎吃喝，只在乎公義、和平，並聖靈中的喜樂。", textEn: "For the kingdom of God is not a matter of eating and drinking, but of righteousness, peace and joy in the Holy Spirit.", reference: "羅馬書 14:17", referenceEn: "Romans 14:17" },
    { text: "所以，我們務要追求和睦的事與彼此建立德行的事。", textEn: "Let us therefore make every effort to do what leads to peace and to mutual edification.", reference: "羅馬書 14:19", referenceEn: "Romans 14:19" },
    { text: "神是信實的，你們原是被他所召，好與他兒子...一同得分。", textEn: "God is faithful, who has called you into fellowship with his Son.", reference: "哥林多前書 1:9", referenceEn: "1 Corinthians 1:9" },
    { text: "因為十字架的道理，在那滅亡的人為愚拙；在我們得救的人，卻為神的大能。", textEn: "For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.", reference: "哥林多前書 1:18", referenceEn: "1 Corinthians 1:18" },
    { text: "豈不知你們是神的殿，神的靈住在你們裡頭嗎？", textEn: "Don’t you know that you yourselves are God’s temple and that God’s Spirit dwells in your midst?", reference: "哥林多前書 3:16", referenceEn: "1 Corinthians 3:16" },
    { text: "所以，你們或吃或喝，無論做什麼，都要為榮耀神而行。", textEn: "So whether you eat or drink or whatever you do, do it all for the glory of God.", reference: "哥林多前書 10:31", referenceEn: "1 Corinthians 10:31" },
    { text: "我若能說萬人的方言，並天使的話語，卻沒有愛，我就成了鳴的鑼，響的鈸一般。", textEn: "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal.", reference: "哥林多前書 13:1", referenceEn: "1 Corinthians 13:1" },
    { text: "感謝神，使我們藉著我們的主耶穌基督得勝。", textEn: "But thanks be to God! He gives us the victory through our Lord Jesus Christ.", reference: "哥林多前書 15:57", referenceEn: "1 Corinthians 15:57" },
    { text: "你們務要警醒，在真道上站立得穩，要作大丈夫，要剛強。", textEn: "Be on your guard; stand firm in the faith; be courageous; be strong.", reference: "哥林多前書 16:13", referenceEn: "1 Corinthians 16:13" },
    { text: "願頌讚歸與我們的主耶穌基督的父神，就是發慈悲的父，賜各樣安慰的神。", textEn: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort.", reference: "哥林多後書 1:3", referenceEn: "2 Corinthians 1:3" },
    { text: "我們有這寶貝放在瓦器裡，要顯明這莫大的能力是出於神，不是出於我們。", textEn: "But we have this treasure in jars of clay to show that this all-surpassing power is from God and not from us.", reference: "哥林多後書 4:7", referenceEn: "2 Corinthians 4:7" },
    { text: "原來我們不是顧念所見的，乃是顧念所不見的；因為所見的是暫時的，所不見的是永遠的。", textEn: "So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.", reference: "哥林多後書 4:18", referenceEn: "2 Corinthians 4:18" },
    { text: "原來基督的愛激勵我們。", textEn: "For Christ’s love compels us.", reference: "哥林多後書 5:14", referenceEn: "2 Corinthians 5:14" },
    { text: "捐得樂意的人是神所喜愛的。", textEn: "God loves a cheerful giver.", reference: "哥林多後書 9:7", referenceEn: "2 Corinthians 9:7" },
    { text: "神能將各樣的恩惠多多加給你們，使你們凡事常常充足，能多行各樣善事。", textEn: "And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.", reference: "哥林多後書 9:8", referenceEn: "2 Corinthians 9:8" },
    { text: "願主耶穌基督的恩惠、神的慈愛、聖靈的感動，常與你們眾人同在！", textEn: "May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all.", reference: "哥林多後書 13:14", referenceEn: "2 Corinthians 13:14" },
    { text: "弟兄們，你們蒙召是要得自由，只是不可將你們的自由當作放縱情慾的機會。", textEn: "You, my brothers and sisters, were called to be free. But do not use your freedom to indulge the flesh.", reference: "加拉太書 5:13", referenceEn: "Galatians 5:13" },
    { text: "因為全律法都包在「愛人如己」這一句話之內了。", textEn: "For the entire law is fulfilled in keeping this one command: 'Love your neighbor as yourself.'", reference: "加拉太書 5:14", referenceEn: "Galatians 5:14" },
    { text: "我們若是靠聖靈得生，就當靠聖靈行事。", textEn: "Since we live by the Spirit, let us keep in step with the Spirit.", reference: "加拉太書 5:25", referenceEn: "Galatians 5:25" },
    { text: "你們各人的重擔要互相擔當，如此，就完全了基督的律法。", textEn: "Carry each other’s burdens, and in this way you will fulfill the law of Christ.", reference: "加拉太書 6:2", referenceEn: "Galatians 6:2" },
    { text: "不要自欺，神是輕慢不得的。人種的是什麼，收的也是什麼。", textEn: "Do not be deceived: God cannot be mocked. A man reaps what he sows.", reference: "加拉太書 6:7", referenceEn: "Galatians 6:7" },
    { text: "願頌讚歸與我們主耶穌基督的父神！他在基督裡曾賜給我們天上各樣屬靈的福氣。", textEn: "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.", reference: "以弗所書 1:3", referenceEn: "Ephesians 1:3" },
    { text: "求他按著他豐盛的榮耀，藉著他的靈，叫你們心裡的力量剛強起來。", textEn: "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.", reference: "以弗所書 3:16", referenceEn: "Ephesians 3:16" },
    { text: "使基督因你們的信，住在你們心裡，叫你們的愛心有根有基。", textEn: "so that Christ may dwell in your hearts through faith. And I pray that you, being rooted and established in love.", reference: "以弗所書 3:17", referenceEn: "Ephesians 3:17" },
    { text: "惟用愛心說誠實話，凡事長進，連於元首基督。", textEn: "Instead, speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.", reference: "以弗所書 4:15", referenceEn: "Ephesians 4:15" },
    { text: "生氣卻不要犯罪；不可含怒到日落。", textEn: "In your anger do not sin: Do not let the sun go down while you are still angry.", reference: "以弗所書 4:26", referenceEn: "Ephesians 4:26" },
    { text: "汙穢的言語一句不可出口，只要隨事說造就人的好話，叫聽見的人得益處。", textEn: "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs.", reference: "以弗所書 4:29", referenceEn: "Ephesians 4:29" },
    { text: "從前你們是暗昧的，但如今在主裡面是光明的，行事為人就當像光明的子女。", textEn: "For you were once darkness, but now you are light in the Lord. Live as children of light.", reference: "以弗所書 5:8", referenceEn: "Ephesians 5:8" },
    { text: "凡事要奉我們主耶穌基督的名常常感謝父神。", textEn: "always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.", reference: "以弗所書 5:20", referenceEn: "Ephesians 5:20" },
    { text: "你們作兒女的，要在主裡聽從父母，這是理所當然的。", textEn: "Children, obey your parents in the Lord, for this is right.", reference: "以弗所書 6:1", referenceEn: "Ephesians 6:1" },
    { text: "我活著就是基督，我死了就有益處。", textEn: "For to me, to live is Christ and to die is gain.", reference: "腓立比書 1:21", referenceEn: "Philippians 1:21" },
    { text: "各人不要單顧自己的事，也要顧別人的事。", textEn: "not looking to your own interests but each of you to the interests of the others.", reference: "腓立比書 2:4", referenceEn: "Philippians 2:4" },
    { text: "因為你們立志行事都是神在你們心裡運行，為要成就他的美意。", textEn: "for it is God who works in you to will and to act in order to fulfill his good purpose.", reference: "腓立比書 2:13", referenceEn: "Philippians 2:13" },
    { text: "凡所行的，都不要發怨言，起爭論。", textEn: "Do everything without grumbling or arguing.", reference: "腓立比書 2:14", referenceEn: "Philippians 2:14" },
    { text: "我們卻是天上的國民，並且等候救主，就是主耶穌基督從天上降臨。", textEn: "But our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ.", reference: "腓立比書 3:20", referenceEn: "Philippians 3:20" },
    { text: "我無論在什麼景況都可以知足，這是我已經學會了。", textEn: "I have learned to be content whatever the circumstances.", reference: "腓立比書 4:11", referenceEn: "Philippians 4:11" },
    { text: "他救了我們脫離黑暗的權勢，把我們遷到他愛子的國裡。", textEn: "For he has rescued us from the dominion of darkness and brought us into the kingdom of the Son he loves.", reference: "歌羅西書 1:13", referenceEn: "Colossians 1:13" },
    { text: "你們既然接受了主基督耶穌，就當遵他而行。", textEn: "So then, just as you received Christ Jesus as Lord, continue to live your lives in him.", reference: "歌羅西書 2:6", referenceEn: "Colossians 2:6" },
    { text: "你們若真與基督一同復活，就當求在上面的事。", textEn: "Since, then, you have been raised with Christ, set your hearts on things above.", reference: "歌羅西書 3:1", referenceEn: "Colossians 3:1" },
    { text: "所以，你們既是神的選民，聖潔蒙愛的人，就要存憐憫、恩慈、謙虛、溫柔、忍耐的心。", textEn: "Therefore, as God’s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.", reference: "歌羅西書 3:12", referenceEn: "Colossians 3:12" },
    { text: "又要叫基督的平安在你們心裡作主。", textEn: "Let the peace of Christ rule in your hearts.", reference: "歌羅西書 3:15", referenceEn: "Colossians 3:15" },
    { text: "當用各樣的智慧，把基督的道理豐豐富富的存在心裡。", textEn: "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom.", reference: "歌羅西書 3:16", referenceEn: "Colossians 3:16" },
    { text: "無論做什麼，或說話或行事，都要奉主耶穌的名，藉著他感謝父神。", textEn: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.", reference: "歌羅西書 3:17", referenceEn: "Colossians 3:17" },
    { text: "你們的言語要常常帶著和氣，好像用鹽調和。", textEn: "Let your conversation be always full of grace, seasoned with salt.", reference: "歌羅西書 4:6", referenceEn: "Colossians 4:6" },
    { text: "又願主叫你們彼此相愛的心，並愛眾人的心都能增長，充足。", textEn: "May the Lord make your love increase and overflow for each other and for everyone else.", reference: "帖撒羅尼迦前書 3:12", referenceEn: "1 Thessalonians 3:12" },
    { text: "要立志作安靜人，辦自己的事，親手做工。", textEn: "and to make it your ambition to lead a quiet life: You should mind your own business and work with your hands.", reference: "帖撒羅尼迦前書 4:11", referenceEn: "1 Thessalonians 4:11" }
];

// 最大日記字數限制 
const MAX_JOURNAL_LENGTH = 500;

// === 2. 實用函數 (保持原樣，僅省略部分細節) ===
const formatDateTime = (dateInput) => {
    if (!dateInput) return "";
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return "";
        return new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
        }).format(date);
    } catch (e) { return ""; }
};

// 文字排版優化 V10：詞組強力膠 (防止關鍵詞被切斷)
// 排版優化 V11：海量詞庫 + 標點黏著 + 智慧斷行
const formatTextNoOrphan = (text) => {
    if (!text || typeof text !== 'string') return text;

    // 1. 定義不想被切斷的詞彙 (包含您提到的和更多常用語)
    const keepTogetherWords = [
        // 神學/名詞
        "耶和華", "耶穌", "基督", "聖靈", "上帝", "主耶穌", "父神",
        "十字架", "救世主", "彌賽亞", "創造主", "全能者", "至高者",
        "以色列", "耶路撒冷", "法利賽人", "撒都該人", "外邦人", "門徒", "使徒",
        "先知", "祭司", "君王", "弟兄", "姊妹", "兒女", "百姓", "子民",
        "星宿", "數目", "名字", "眼淚", "死亡", "悲哀", "哭號", "疼痛",
        "自由", "真理", "生命", "道路", "恩典", "慈愛", "憐憫", "榮耀",
        "智慧", "知識", "聰明", "能力", "權柄", "國度", "旨意", "試探",
        "患難", "困苦", "逼迫", "危險", "刀劍", "網羅", "陷阱", "盾牌",
        "山寨", "避難所", "磐石", "高臺", "活水", "靈糧", "聖殿", "教會",
        // 動詞/形容詞/副詞
        "單單", "僅僅", "惟獨", "常常", "永遠", "世世", "從前", "如今", "將來",
        "盡心", "盡性", "盡意", "盡力", "專心", "誠實", "謙卑", "溫柔",
        "喜樂", "平安", "忍耐", "良善", "信實", "節制", "聖潔", "公義",
        "剛強", "壯膽", "懼怕", "驚惶", "憂慮", "膽怯", "軟弱", "疲乏",
        "稱頌", "敬畏", "仰望", "等候", "尋求", "倚靠", "感謝", "讚美",
        "事奉", "跟隨", "順服", "聽從", "遵守", "相信", "信靠", "交託",
        "拯救", "保護", "引導", "扶持", "堅固", "遮蔽", "醫治", "赦免",
        "洗淨", "充滿", "澆灌", "運行", "感動", "啟示", "光照", "鑒察",
        "行道", "聽道", "欺哄", "論斷", "饒恕", "相愛", "和睦", "同心",
        "數點", "稱呼", "擦去", "過去", "留下", "賜給", "所賜", "不像",
        "不要", "不可", "不能", "不會", "不敢", "不致", "不至", "必定",
        // 代名詞/虛詞 (建議黏著)
        "你們", "我們", "他們", "自己", "一切", "所有", "各樣", "諸般",
        "因為", "所以", "雖然", "但是", "只是", "如果", "若是", "無論",
        "甚至", "並且", "而且", "以及", "還是", "或者"
    ];

    // 2. 標點符號黏著處理 (讓標點永遠黏在前一個字後面)
    // 我們先用一個特殊的佔位符來保護標點
    let processedText = text;
    const punctuations = "，。、？！：；」』”’…,.";
    
    // 3. 製作正則表達式來尋找詞彙
    // 為了效能，我們把詞彙依長度排序 (長的優先匹配)
    keepTogetherWords.sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${keepTogetherWords.join("|")})`, "g");

    // 4. 切割並重組
    const parts = processedText.split(regex);

    return (
        <>
            {parts.map((part, index) => {
                // 檢查是否為標點符號 (如果這個片段開頭就是標點，把它黏到上一個片段去)
                // 但 React 的 map 很難直接操作上一個元素，所以我們改用 CSS
                
                // 如果是關鍵詞，強制不換行
                if (keepTogetherWords.includes(part)) {
                    return <span key={index} className="whitespace-nowrap inline-block">{part}</span>;
                }
                
                // 處理普通文字中的標點符號防切斷
                // 我們把每個字拆開，但如果遇到標點，就把它跟前一個字包在一起
                const chars = part.split('');
                const result = [];
                for (let i = 0; i < chars.length; i++) {
                    const char = chars[i];
                    const nextChar = chars[i+1];
                    
                    // 如果下一個是標點，把這個字跟標點包在一起 (No Break)
                    if (punctuations.includes(nextChar)) {
                        result.push(<span key={`${index}-${i}`} className="whitespace-nowrap">{char}{nextChar}</span>);
                        i++; // 跳過下一個 (因為已經處理了)
                    } else if (punctuations.includes(char)) {
                        // 如果當前就是標點 (且沒被上面抓走，這通常不應該發生，除非標點在開頭)
                        result.push(<span key={`${index}-${i}`}>{char}</span>);
                    } else {
                        // 普通字
                        result.push(char);
                    }
                }
                return result;
            })}
        </>
    );
};

const formatEnglishTextNoOrphan = (text) => {
    if (!text || typeof text !== 'string') return text;
    const words = text.split(' ');
    const minWords = 3;
    if (words.length <= minWords) return text;
    const breakPoint = words.length - minWords;
    const head = words.slice(0, breakPoint).join(' ');
    const tail = words.slice(breakPoint).join(' ');
    return <>{head} <span className="whitespace-nowrap">{tail}</span></>;
};

// 排版邏輯 V8 (最終修復版)：神名不換行 + 標點避頭 + 智慧平衡 + 英文修復
const getLines = (ctx, text, maxWidth) => {
    // 0. 全局判斷語言
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    const isEnglish = !hasChinese;

    // 1. 核心切分邏輯
    const computeLines = (limitWidth) => {
        // === 中文邏輯 (特殊處理：神名不換行) ===
        if (!isEnglish) {
            // 定義「不可拆散」的關鍵詞清單
            const keepTogetherWords = [
                "耶和華", "耶穌", "基督", "聖靈", "上帝", "主耶穌", "父神",
                "亞伯拉罕", "以撒", "雅各", "摩西", "大衛", "所羅門", 
                "保羅", "彼得", "約翰", "馬利亞",
                "耶路撒冷", "以色列", "法利賽人", "撒都該人"
            ];

            const regex = new RegExp(`(${keepTogetherWords.join("|")})`, "g");
            let segments = text.split(regex).filter(s => s !== "");
            
            let finalTokens = [];
            segments.forEach(seg => {
                if (keepTogetherWords.includes(seg)) {
                    finalTokens.push(seg); 
                } else {
                    finalTokens.push(...seg.split('')); 
                }
            });

            let lines = [];
            let currentLine = finalTokens[0];
            const avoidLineStart = "，。、？！：；」』”’）)]}…,.";

            for (let i = 1; i < finalTokens.length; i++) {
                const token = finalTokens[i]; 
                const width = ctx.measureText(currentLine + token).width;

                if (width < limitWidth) {
                    currentLine += token;
                } else {
                    if (avoidLineStart.includes(token)) {
                        currentLine += token;
                    } else {
                        lines.push(currentLine);
                        currentLine = token;
                    }
                }
            }
            lines.push(currentLine);
            return lines;
        }

        // === 英文邏輯 ===
        const words = text.split(' ');
        let lines = [];
        let currentLine = ""; 
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            const wordWidth = ctx.measureText(word).width;
            
            if (wordWidth > limitWidth) {
                if (currentLine !== "") { lines.push(currentLine); currentLine = ""; }
                let remainingWord = word;
                while (ctx.measureText(remainingWord).width > limitWidth) {
                    let splitIndex = 0; let tempStr = "";
                    while (splitIndex < remainingWord.length) {
                        let char = remainingWord[splitIndex];
                        if (ctx.measureText(tempStr + char + "-").width < limitWidth) {
                            tempStr += char; splitIndex++;
                        } else { break; }
                    }
                    lines.push(tempStr + "-");
                    remainingWord = remainingWord.substring(splitIndex);
                }
                currentLine = remainingWord;
            } else {
                const space = currentLine === "" ? "" : " ";
                if (ctx.measureText(currentLine + space + word).width < limitWidth) {
                    currentLine += space + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
        }
        if (currentLine !== "") lines.push(currentLine);
        return lines;
    };

    // 2. 智慧平衡與決策層
    const naturalLines = computeLines(maxWidth);

    if (naturalLines.length < 2 || naturalLines.length > 4) {
        return naturalLines;
    }

    if (!isEnglish) {
        const firstLine = naturalLines[0];
        const lastChar = firstLine.slice(-1);
        const punctuation = "，。、？！：；」』”’…,.";
        if (punctuation.includes(lastChar)) {
            return naturalLines;
        }
    }

    const totalWidth = ctx.measureText(text).width;
    const averageWidth = totalWidth / naturalLines.length;
    const tryWidth = averageWidth * 1.1; 
    
    const balancedLines = computeLines(tryWidth);

    if (balancedLines.length === naturalLines.length) {
        const lastLine = balancedLines[balancedLines.length - 1];
        if (!isEnglish && lastLine.length < 2) {
             return naturalLines; 
        }
        return balancedLines; 
    }

    return naturalLines; 
};

// 圖片生成邏輯 (支援動態高度與日記)
const generateCardImage = async (verse) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const cardW = width - 160; // 80px padding left/right

    // 字體設定需與繪製時一致
    const titleFont = 'bold 48px sans-serif';
    const zhFont = 'bold 56px sans-serif';
    const enFont = 'italic 36px serif';
    const refFont = 'bold 32px sans-serif';
    const refEnFont = 'italic 28px serif';
    const journalLabelFont = 'bold 36px sans-serif';
    const journalTextFont = '36px sans-serif';

    // 1. 計算高度 (Preview Pass)
    let contentHeight = 140; // Top Padding + Title space
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // 經文高度
    tempCtx.font = zhFont;
    const zhLines = getLines(tempCtx, verse.text, cardW - 120);
    contentHeight += zhLines.length * 80;
    contentHeight += 40; // Gap

    tempCtx.font = enFont;
    const enLines = getLines(tempCtx, verse.textEn, cardW - 120);
    contentHeight += enLines.length * 55;
    contentHeight += 60; // Gap

    // 出處高度
    contentHeight += 80; 

    // 日記
    const journalLines = [];
    if (verse.journalEntry && verse.journalEntry.trim()) {
        contentHeight += 80; // 分隔線空間
        contentHeight += 50; // 標題高度
        contentHeight += 30; // 間距
        
        tempCtx.font = journalTextFont;
        const paragraphs = verse.journalEntry.split('\n');
        paragraphs.forEach(para => {
            if (para.trim() === '') {
                 contentHeight += 20; // 空行高度
            } else {
                 const paraLines = getLines(tempCtx, para, cardW - 120);
                 journalLines.push({ lines: paraLines, type: 'text' });
                 contentHeight += paraLines.length * 55;
            }
        });
        contentHeight += 40;
    }

    contentHeight += 160; // Bottom Padding + Footer

    // 決定最終高度 (至少 1080)
    const finalHeight = Math.max(1080, contentHeight + 160); 
    
    // --- 第二步：開始繪製 ---
    canvas.width = width;
    canvas.height = finalHeight;

    // 背景
    ctx.fillStyle = '#F5F5F4';
    ctx.fillRect(0, 0, width, finalHeight);

    const cardX = 80;
    const cardY = 140;
    const cardH = finalHeight - 240;
    
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    const r = 40;
    ctx.moveTo(cardX + r, cardY); ctx.lineTo(cardX + cardW - r, cardY); ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + r);
    ctx.lineTo(cardX + cardW, cardY + cardH - r); ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - r, cardY + cardH);
    ctx.lineTo(cardX + r, cardY + cardH); ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - r);
    ctx.lineTo(cardX, cardY + r); ctx.quadraticCurveTo(cardX, cardY, cardX + r, cardY);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    const centerX = width / 2;
    let currentY = cardY + 100;

    // Title
    ctx.font = titleFont;
    ctx.fillStyle = '#78716C';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("神對我吹氣", centerX, 80);

    // 中文經文 (置中)
    ctx.font = zhFont;
    ctx.fillStyle = '#292524';
    ctx.textAlign = 'center';
    zhLines.forEach(line => {
        ctx.fillText(line, centerX, currentY);
        currentY += 80;
    });
    currentY += 30;

    // 英文經文 (置中)
    ctx.font = enFont;
    ctx.fillStyle = '#78716C';
    enLines.forEach(line => {
        ctx.fillText(line, centerX, currentY);
        currentY += 55;
    });
    currentY += 50;

    // 出處 (置中)
    ctx.font = refFont;
    ctx.fillStyle = '#57534E';
    ctx.fillText(`— ${verse.reference} —`, centerX, currentY);
    currentY += 40;
    ctx.font = refEnFont;
    ctx.fillStyle = '#A8A29E';
    ctx.fillText(verse.referenceEn, centerX, currentY);
    currentY += 60;

    // 日記區域 (分隔線 + 標題 + 靠左內容)
    if (verse.journalEntry && verse.journalEntry.trim()) {
        // 分隔線
        ctx.beginPath();
        ctx.strokeStyle = '#E7E5E4';
        ctx.lineWidth = 2;
        ctx.moveTo(centerX - 200, currentY);
        ctx.lineTo(centerX + 200, currentY);
        ctx.stroke();
        currentY += 60;

        // 標題
        ctx.textAlign = 'center';
        ctx.font = journalLabelFont;
        ctx.fillStyle = '#57534E';
        ctx.fillText("我的回應", centerX, currentY);
        currentY += 60;

        // 內容 (靠左對齊)
        ctx.textAlign = 'left'; 
        const textLeftX = cardX + 60; 
        
        ctx.font = journalTextFont;
        ctx.fillStyle = '#44403C';
        
        const paragraphs = verse.journalEntry.split('\n');
        paragraphs.forEach(para => {
            if (para.trim() === '') {
                currentY += 20;
            } else {
                 const paraLines = getLines(ctx, para, cardW - 120);
                 paraLines.forEach(line => {
                     ctx.fillText(line, textLeftX, currentY); 
                     currentY += 55;
                 });
            }
        });
    }

    // Footer
    const footerY = finalHeight - 50;
    ctx.textAlign = 'center';
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#A8A29E';
    ctx.fillText("內容來自和合本(CUV)及NIV", centerX, footerY);

    return new Promise(resolve => {
        canvas.toBlob(blob => {
            resolve(blob);
        }, 'image/png');
    });
};

// 獨立的 Tooltip 按鈕組件
const TooltipButton = ({ onClick, icon: Icon, label }) => (
    <button 
        onClick={onClick}
        className="relative group p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-800 border border-transparent hover:border-gray-200"
        aria-label={label}
    >
        <Icon className="w-5 h-5" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-stone-600 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-sm">
            {label}
        </span>
    </button>
);

// 編輯視窗元件
const EditJournalView = ({ editingVerse, setEditingVerse, onUpdate, maxLength }) => (
    <div 
      className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 transition-opacity duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) setEditingVerse(null); }}
    >
        <div className="bg-white w-full max-w-lg h-[85%] sm:h-auto sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 sm:animate-in sm:zoom-in-95 duration-300">
            <nav className="flex justify-between items-center p-4 border-b border-gray-200 bg-white rounded-t-2xl">
                <button onClick={() => setEditingVerse(null)} className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md">取消</button>
                <h2 className="text-lg font-bold text-gray-800">編輯回應</h2>
                <button onClick={onUpdate} className="text-white bg-stone-600 hover:bg-stone-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-md">完成</button>
            </nav>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-800 font-medium mb-2">{editingVerse.text}</p>
                    <p className="text-gray-500 text-sm italic">{editingVerse.textEn}</p>
                    <p className="text-xs text-gray-400 mt-2 text-right">{editingVerse.reference}</p>
                </div>
                <div className="flex flex-col h-full">
                    <label className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2"><PenLine className="w-4 h-4" />回應神的話</label>
                    <textarea value={editingVerse.tempJournalEntry} onChange={(e) => { if (e.target.value.length <= maxLength) setEditingVerse(prev => ({ ...prev, tempJournalEntry: e.target.value })); }} placeholder="在這裡寫下您的感動..." className="w-full flex-1 bg-gray-50 border border-gray-300 rounded-xl p-4 text-gray-700 text-base leading-relaxed focus:ring-2 focus:ring-stone-300 focus:border-stone-400 focus:bg-white outline-none resize-none min-h-[200px]" />
                    <div className="text-right text-xs text-gray-400 mt-2 mb-10">{editingVerse.tempJournalEntry.length} / {maxLength}</div>
                </div>
            </div>
        </div>
    </div>
);

function GodIsWithYouApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [activeTab, setActiveTab] = useState('favorites');
  const [notification, setNotification] = useState(null);
  const [journalInput, setJournalInput] = useState("");
  const [editingVerse, setEditingVerse] = useState(null);
  // 新增：防重複清單 (會被儲存起來)
  const [recentIndices, setRecentIndices] = useState([]); 
  
  const isScripturesEmpty = SCRIPTURES.length === 0;

  const addToHistory = useCallback((verse) => {
    const newEntry = { ...verse, id: Date.now(), timestamp: new Date().toISOString() };
    setHistory(prev => [newEntry, ...prev].slice(0, 20));
  }, []);

  // 1. 初始化：讀取手機裡的記憶 (包含上次看過的 100 句)
  useEffect(() => {
    let initialIndex = 0;

    try {
        const savedFavs = localStorage.getItem('godsPromisesFavorites');
        const savedHistory = localStorage.getItem('godsPromisesHistory');
        const savedRecents = localStorage.getItem('godsPromisesRecents'); // 讀取防重複名單
        
        if (savedFavs) setFavorites(JSON.parse(savedFavs) || []);
        if (savedHistory) setHistory(JSON.parse(savedHistory) || []);
        
        // 恢復上次的記憶
        const loadedRecents = savedRecents ? JSON.parse(savedRecents) : [];
        setRecentIndices(loadedRecents);

    } catch (e) {
        console.error("Failed to load data from localStorage:", e);
    }

    if (!isScripturesEmpty) {
        // 隨機選一個初始經文
        initialIndex = Math.floor(Math.random() * SCRIPTURES.length);
        setCurrentIndex(initialIndex);
        
        // 將這句初始經文加入記憶 (並確保不蓋掉舊記憶)
        setRecentIndices(prev => {
            // 從硬碟再讀一次確保同步
            const currentRecents = JSON.parse(localStorage.getItem('godsPromisesRecents') || '[]');
            const newRecents = [initialIndex, ...currentRecents];
            // 限制 100 句
            if (newRecents.length > 100) newRecents.pop();
            return newRecents;
        });
        
        const initialVerse = SCRIPTURES[initialIndex];
        addToHistory(initialVerse); 

        setTimeout(() => {
            try {
                 const savedFavs = JSON.parse(localStorage.getItem('godsPromisesFavorites') || '[]');
                 const foundFav = savedFavs.find(f => f.text === initialVerse.text);
                 if (foundFav) {
                    setJournalInput(foundFav.journalEntry || "");
                 }
            } catch (e) {}
        }, 0);
    }
  }, []);

  // 2. 自動存檔：收藏
  useEffect(() => {
    try {
        localStorage.setItem('godsPromisesFavorites', JSON.stringify(favorites));
    } catch (e) { console.error(e); }
  }, [favorites]);

  // 3. 自動存檔：歷史
  useEffect(() => {
    try {
        localStorage.setItem('godsPromisesHistory', JSON.stringify(history));
    } catch (e) { console.error(e); }
  }, [history]);

  // 4. 自動存檔：防重複名單 (這就是讓它重開機還記得的關鍵)
  useEffect(() => {
    try {
        localStorage.setItem('godsPromisesRecents', JSON.stringify(recentIndices));
    } catch (e) { console.error(e); }
  }, [recentIndices]);
  
  if (isScripturesEmpty) {
      return <div className="text-center p-10 text-xl text-red-500">錯誤：經文資料庫為空。</div>;
  }
  
  const currentVerse = SCRIPTURES[currentIndex];
  const currentSavedFav = favorites.find(f => f.text === (currentVerse ? currentVerse.text : null));
  const isCurrentFavorite = !!currentSavedFav;
  const savedJournal = currentSavedFav?.journalEntry.trim() || '';
  const isJournalUnchanged = journalInput.trim() === savedJournal;

  const handleNextVerse = () => {
    if (isCurrentFavorite && !isJournalUnchanged) {
        console.warn("注意：日記有未保存的變更。");
    }
    
    setIsAnimating(true);
    setJournalInput(""); 

    setTimeout(() => {
      let newIndex;
      let attempts = 0;
      const maxAttempts = 500; // 提高嘗試次數，因為要避開 100 句
      
      do {
        newIndex = Math.floor(Math.random() * SCRIPTURES.length);
        attempts++;
      } while (
        (newIndex === currentIndex || recentIndices.includes(newIndex)) && 
        attempts < maxAttempts
      );
      
      // 更新記憶：把新的加進去，確保總數不超過 100
      setRecentIndices(prev => {
          const newRecent = [newIndex, ...prev];
          if (newRecent.length > 100) { // <--- 關鍵設定：改為 100 句
              newRecent.pop();
          }
          return newRecent;
      });
      
      setCurrentIndex(newIndex);
      
      const newVerse = SCRIPTURES[newIndex];
      const foundFav = favorites.find(f => f.text === newVerse.text);
      if (foundFav) {
          setJournalInput(foundFav.journalEntry || "");
      }
      
      addToHistory(newVerse); 
      
      setIsAnimating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleSaveFavorite = () => {
    if (!currentVerse) {
        showNotification("經文資料遺失，無法保存");
        return;
    }
    
    const newFavorite = { 
      ...currentVerse, 
      timestamp: new Date().toISOString(),
      journalEntry: journalInput.trim() 
    };
    
    setFavorites(prev => {
      const existingIndex = prev.findIndex(f => f.text === currentVerse.text);

      if (existingIndex > -1) {
        const updatedList = prev.filter((_, index) => index !== existingIndex);
        return [newFavorite, ...updatedList];
      } else {
        return [newFavorite, ...prev];
      }
    });

    let message = "已加入收藏";
    if (isCurrentFavorite && !isJournalUnchanged) {
        message = "日記已更新並保存收藏";
    } else if (isCurrentFavorite && isJournalUnchanged) {
        message = "經文已在收藏中 (日記無變更)";
    }
    
    showNotification(message);
  };

  const handleRemoveFavorite = (textToRemove) => {
     setFavorites(favorites.filter(f => f.text !== textToRemove));
     if (currentVerse && currentVerse.text === textToRemove) {
         setJournalInput("");
     }
     showNotification("已從收藏移除");
  };
  
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000); 
  };

  const handleCopy = (text, textEn, ref, refEn) => {
    const textToCopy = `${text}\n\n${textEn}\n\n— 經文出處 —\n${ref} (${refEn})\n\n[來自 神對我吹氣 App]`;
    const performFallbackCopy = () => {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed"; textArea.style.left = "0"; textArea.style.top = "0"; textArea.style.opacity = "0";
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        if (navigator.userAgent.match(/ipad|iphone/i)) {
            const range = document.createRange(); range.selectNodeContents(textArea); 
            const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else { textArea.select(); }
        try {
            const successful = document.execCommand('copy');
            if (successful) showNotification("已複製經文文字"); else showNotification("複製失敗");
        } catch (err) { showNotification("複製功能暫時無法使用"); } 
        finally { document.body.removeChild(textArea); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => showNotification("已複製經文文字")).catch(() => performFallbackCopy());
    } else { performFallbackCopy(); }
  };

  const handleShareImage = async () => {
    if (!currentVerse) return;
    showNotification("正在產生經文卡...");
    try {
        const imageBlob = await generateCardImage(currentVerse);
        const file = new File([imageBlob], "scripture-card.png", { type: "image/png" });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
             await navigator.share({ title: '神對我吹氣', text: '願這段經文祝福你！', files: [file] });
        } else {
            const url = URL.createObjectURL(imageBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `scripture-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showNotification("圖片已下載 (請手動傳送)");
        }
    } catch (error) {
        console.error("Image generation failed:", error);
        showNotification("圖片產生失敗，已複製文字");
        handleCopy(currentVerse.text, currentVerse.textEn, currentVerse.reference, currentVerse.referenceEn);
    }
  };

  const handleShareCollected = async (verse) => {
     showNotification("正在產生分享卡片...");
     try {
        const imageBlob = await generateCardImage(verse); 
        const file = new File([imageBlob], "scripture-journal-card.png", { type: "image/png" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
             await navigator.share({ title: '神對我吹氣 - 我的領受', text: '我的領受與回應', files: [file] });
        } else {
            const url = URL.createObjectURL(imageBlob);
            const a = document.createElement('a'); a.href = url; a.download = `journal-${Date.now()}.png`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
            showNotification("圖片已下載 (請手動傳送)");
        }
     } catch (e) {
        const journalText = verse.journalEntry ? `\n\n【我的回應】\n${verse.journalEntry}` : "";
        const textToShare = `${verse.text}\n\n${verse.textEn}\n\n— 經文出處 —\n${verse.reference} (${verse.referenceEn})${journalText}\n\n[來自 神對我吹氣 App]`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
             navigator.clipboard.writeText(textToShare).then(() => showNotification("圖片生成失敗，已複製文字"));
        }
     }
  };

  const handleEditClick = (verse) => { setEditingVerse({ ...verse, tempJournalEntry: verse.journalEntry || "" }); };
  const handleUpdateJournal = () => {
    if (!editingVerse) return;
    const updatedText = editingVerse.tempJournalEntry.trim();
    setFavorites(prev => prev.map(f => f.text === editingVerse.text ? { ...f, journalEntry: updatedText, timestamp: new Date().toISOString() } : f));
    if (currentVerse && currentVerse.text === editingVerse.text) setJournalInput(updatedText);
    setEditingVerse(null); 
    showNotification("日記已更新");
  };

  const VerseListItem = ({ verse, isFavorite, onRemove, onShare, onEdit }) => (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 leading-relaxed truncate-3-lines">{verse.text}</p>
          <p className="text-xs text-gray-500 mt-1 italic leading-relaxed truncate-3-lines">{verse.textEn}</p>
          <p className="text-xs text-gray-500 mt-2 font-medium">{verse.reference} <span className="text-gray-400 font-serif italic ml-1">({verse.referenceEn})</span></p>
          <div className="flex items-center text-xs text-gray-400 mt-2"><Calendar className="w-3 h-3 mr-1" /><span className="font-mono">{formatDateTime(verse.timestamp)}</span></div>
        </div>
        <div className="flex flex-col gap-2 ml-4">
             <div className="flex flex-col gap-2">
                <TooltipButton onClick={() => onEdit(verse)} icon={Edit} label="編輯回應" />
                <TooltipButton onClick={() => onShare(verse)} icon={Share2} label="分享經文與日記" />
                {isFavorite && (<TooltipButton onClick={() => onRemove(verse.text)} icon={Trash2} label="移除收藏" />)}
            </div>
        </div>
      </div>
      {verse.journalEntry && verse.journalEntry.trim() && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-600 mb-1 flex items-center gap-1"><PenLine className="w-3 h-3" /> 我的回應</p>
          <p className="text-sm text-gray-700 italic bg-gray-50 p-2 rounded-lg border border-gray-100" style={{ wordBreak: 'break-word', hyphens: 'auto' }} lang="en">{verse.journalEntry}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 font-sans relative selection:bg-gray-200">
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .truncate-3-lines { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; } .journal-textarea { min-height: 80px; max-height: 300px; } .whitespace-nowrap { white-space: nowrap; }`}</style>
      {editingVerse && <EditJournalView editingVerse={editingVerse} setEditingVerse={setEditingVerse} onUpdate={handleUpdateJournal} maxLength={MAX_JOURNAL_LENGTH} />}

      <nav className="flex justify-between items-center p-4 sm:p-6 bg-white/70 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200/50">
        <div className="flex items-center gap-3"><BookOpen className="w-6 h-6 text-gray-600" /><h1 className="text-xl font-bold text-gray-800 tracking-wide">神對我吹氣</h1></div>
        <div className='flex gap-2'>
            <button onClick={handleNextVerse} disabled={isAnimating} className="text-sm font-bold tracking-widest text-white bg-stone-600/90 hover:bg-stone-700 shadow-lg shadow-stone-300/50 px-5 py-2 rounded-full transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"><RefreshCw className={`w-4 h-4 mr-2 inline ${isAnimating ? 'animate-spin' : ''}`} /> 領受</button>
            <button onClick={() => { setShowModal(true); setActiveTab('favorites'); }} className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium bg-stone-300/60 text-gray-700 hover:bg-stone-400/70 transition-all active:scale-95 shadow-md shadow-stone-200/50"><Heart className="w-5 h-5 fill-gray-500 text-gray-500" /><span className="hidden sm:inline">收藏記錄 ({favorites.length})</span></button>
        </div>
      </nav>

      <main className="flex flex-col items-center px-4 sm:px-6 py-8 max-w-lg mx-auto w-full">
        <div className="w-full relative mb-6">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200 min-h-[200px] flex items-center justify-center">
            {currentVerse ? (
              <div className={`w-full transition-all duration-500 ease-out transform ${isAnimating ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
                <div className="mb-6">
                  <p className="text-2xl sm:text-3xl leading-relaxed text-gray-800 text-center tracking-wide text-balance mb-4 font-medium">{formatTextNoOrphan(currentVerse.text)}</p>
                  <p className="text-base sm:text-lg leading-relaxed text-gray-500 text-center font-serif italic">{formatEnglishTextNoOrphan(currentVerse.textEn)}</p>
                </div>
                <div className="flex flex-col items-center justify-center border-t border-gray-200 pt-3 text-gray-500">
                  <p className="text-sm font-medium tracking-widest uppercase">— {currentVerse.reference} —</p>
                  <p className="text-xs font-serif italic mt-1 text-gray-400">{currentVerse.referenceEn}</p>
                </div>
                <div className="flex justify-center items-center mt-4 pt-3 border-t border-gray-100 gap-4">
                   <div className="flex gap-4">
                    <TooltipButton onClick={() => handleCopy(currentVerse.text, currentVerse.textEn, currentVerse.reference, currentVerse.referenceEn)} icon={Copy} label="複製經文" />
                    <TooltipButton onClick={handleShareImage} icon={Share2} label="分享經文卡圖片" />
                   </div>
                </div>
              </div>
            ) : (<div className="text-center text-gray-400"><Clock className='w-6 h-6 mx-auto mb-2 animate-pulse' /><p>正在等候...</p></div>)}
          </div>
        </div>
        <div className="w-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 p-4 focus-within:bg-white focus-within:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2 text-gray-500"><PenLine className="w-4 h-4" /><span className="text-xs font-medium tracking-wider">回應神的話 (限 {MAX_JOURNAL_LENGTH} 字)</span></div>
                <textarea value={journalInput} onChange={(e) => { if (e.target.value.length <= MAX_JOURNAL_LENGTH) setJournalInput(e.target.value); }} placeholder="在這裡寫下您的感動、禱告或回應..." maxLength={MAX_JOURNAL_LENGTH} className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-700 placeholder-gray-400 text-base leading-relaxed resize-none overflow-y-auto custom-scrollbar journal-textarea" />
                <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400">{journalInput.length} / {MAX_JOURNAL_LENGTH}</span>
                    <div className="flex gap-2">
                        {isCurrentFavorite && (<button onClick={() => handleRemoveFavorite(currentVerse.text)} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium bg-rose-100/60 text-rose-600 hover:bg-rose-200/80 transition-all active:scale-95"><MinusCircle className="w-4 h-4" /> 移除</button>)}
                        <button onClick={handleSaveFavorite} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${isCurrentFavorite && isJournalUnchanged ? 'bg-stone-200 text-stone-500 cursor-default' : 'bg-stone-600 text-white hover:bg-stone-700 shadow-lg shadow-stone-300/40'}`} disabled={isCurrentFavorite && isJournalUnchanged || !currentVerse}>{isCurrentFavorite ? <><Heart className={`w-4 h-4 ${isJournalUnchanged ? 'fill-stone-500' : ''}`} /> {isJournalUnchanged ? "已收藏" : "更新收藏"}</> : <><Save className="w-4 h-4" /> 保存收藏</>}</button>
                    </div>
                </div>
            </div>
        </div>
      </main>
      
      {notification && (<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-2"><div className="bg-stone-200/90 backdrop-blur-sm border border-stone-300 text-stone-600 text-sm font-bold py-3 px-6 rounded-full shadow-xl">{notification}</div></div>)}
      {showModal && (<div className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}><div className="bg-gray-50 w-full max-w-lg h-[90%] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col"><header className="flex justify-between items-center p-5 border-b border-gray-200 bg-white rounded-t-2xl sticky top-0"><h2 className="text-xl font-bold text-gray-800">{activeTab === 'favorites' ? '我的收藏經文' : '瀏覽歷史'}</h2><button onClick={() => setShowModal(false)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"><X className="w-6 h-6" /></button></header><div className="flex justify-center p-4 bg-white sticky top-[69px] border-b border-gray-100 z-10"><button onClick={() => setActiveTab('favorites')} className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === 'favorites' ? 'bg-stone-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><Heart className="w-4 h-4 mr-1 inline fill-current" /> 收藏 ({favorites.length})</button><button onClick={() => setActiveTab('history')} className={`px-4 py-2 text-sm font-medium rounded-full ml-2 ${activeTab === 'history' ? 'bg-stone-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><History className="w-4 h-4 mr-1 inline" /> 歷史 ({history.length})</button></div><div className="flex-1 p-4 overflow-y-auto custom-scrollbar">{activeTab === 'favorites' && (favorites.length > 0 ? favorites.map((fav) => (<VerseListItem key={fav.text} verse={fav} isFavorite={true} onRemove={handleRemoveFavorite} onShare={handleShareCollected} onEdit={handleEditClick} />)) : <div className="text-center py-10 text-gray-500"><Heart className="w-8 h-8 mx-auto mb-2 text-gray-400" /><p>您尚未收藏任何經文。</p></div>)}{activeTab === 'history' && (history.length > 0 ? history.map((hist) => (<div key={hist.id} className="flex flex-col p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-3"><p className="text-sm font-medium text-gray-800">{hist.text}</p><p className="text-xs text-gray-500 mt-1 italic">{hist.textEn}</p><p className="text-xs text-gray-500 mt-2 font-medium">{hist.reference} <span className="text-gray-400 italic">({hist.referenceEn})</span></p><div className="flex items-center text-xs text-gray-400 mt-2"><Clock className="w-3 h-3 mr-1" /><span className="font-mono">{formatDateTime(hist.timestamp)}</span></div></div>)) : <div className="text-center py-10 text-gray-500"><History className="w-8 h-8 mx-auto mb-2 text-gray-400" /><p>尚未有瀏覽歷史記錄。</p></div>)}</div><footer className="p-3 border-t border-gray-200 text-center text-xs text-gray-400 bg-white rounded-b-2xl"><p>內容來自和合本(CUV)及NIV</p></footer></div></div>)}
    </div>
  );
}

// 渲染應用程式
const root = createRoot(document.getElementById('root'));

root.render(<ErrorBoundary><GodIsWithYouApp /></ErrorBoundary>);











