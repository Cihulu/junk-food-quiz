// 四个维度：激活条件 / 社交接受度 / 反差方向 / 能量类型
// 激活条件：0=需要对的时机/人, 2=自带能量
// 社交接受度：0=游离评价体系, 2=大众讨喜/在乎认可
// 反差方向：0=表里如一, 2=表里不一（有反差）
// 能量类型：0=情绪/仪式感/时间成长, 2=本能冲动

export type FoodVector = [number, number, number, number];

export interface Food {
  id: string;
  name: string;
  emoji: string;
  vector: FoodVector;
  description: string;
  portion: string;
  kcal: number;
  calorieCompare: string;
}

export const FOODS: Food[] = [
  {
    id: "taoso", name: "桃酥", emoji: "🥮", vector: [0, 0, 0, 0],
    description: "不是所有人都懂你的好，而你也不需要所有人懂。你就这样酥酥脆脆地保持自我，等着某一天某一个人突然长大了悟到了你的美味。你是被时间筛选过的垃圾食品，虽然吃完一地碎屑也不好清理。\n\n桃酥最好是配茶？配咖啡？还是什么都不用配 做自己最好了。\n\n依稀记得某溪河还是某记桃酥有创新口味来着？但只有原味纯粹的你最有记忆点。",
    portion: "3块 ≈ 150g", kcal: 721, calorieCompare: "≈ 45根黄瓜（全部吃完要4小时）",
  },
  {
    id: "crayfish", name: "小龙虾", emoji: "🦞", vector: [0, 0, 0, 2],
    description: "你是夏天限定版的美味。你的出现就是传说，人类念起你的名字就会自动分泌唾液。不当季的时候也会时常被记挂，只要到了那个季节，那个夜晚，那群人，根本停不下来。壳厚肉甜，费劲但值得。你的信徒知道为什么。\n\n最近好像有啥新东西一直在蹭你的热度，呃是啥来着？不重要，你自有你的鲜香麻辣/蒜香油润。",
    portion: "一份带壳 ≈ 500g，净肉约200g", kcal: 230, calorieCompare: "≈ 3个水煮蛋（剥壳消耗的热量已经快抵消了）",
  },
  {
    id: "salad", name: "多酱版鸡胸肉沙拉", emoji: "🥗", vector: [0, 0, 2, 0],
    description: `你是垃圾食品里的异类。表面健康自律，满满都是蛋白质和纤维素。但点击"多放沙拉酱"选项也是人之常情吧、、你从不会标榜自己是什么垃圾食品，但你从来没骗过任何人。只是有些真相，不说而已。\n\n号称身材管理的人将你视若珍宝，但你只默默地当带刺玫瑰。"有本事不加酱，小心得厌食症。"你如是说。`,
    portion: "一份加酱 ≈ 350g", kcal: 420, calorieCompare: "≈ 8个西红柿（但那勺沙拉酱独自贡献了150kcal）",
  },
  {
    id: "noodles", name: "泡面", emoji: "🍜", vector: [0, 0, 2, 2],
    description: `深夜十二点，开水倒进去，整个房间充斥着迷人危险气息。室友会忍不住问"能给我来一口吗"。其实你不耀眼，包装也没有什么说头，但那一刻谁都知道你是正确答案。其实也有很多人莫名其妙隔一段时间就想到你。\n\n毕竟不需要洗餐具。但人类请记得把吃剩的面汤倒厕所后再丢弃。`,
    portion: "一包含料包 ≈ 100g", kcal: 460, calorieCompare: "≈ 28根黄瓜（深夜的正确答案，黄瓜做不到）",
  },
  {
    id: "milktea", name: "奶茶", emoji: "🧋", vector: [0, 2, 0, 0],
    description: "你是情绪的换算单位。一杯奶茶等于「今天辛苦了」，等于「我们好久没见了」，等于某个秋天下午被需要的感觉。小料有好多好多种，但是如果某个小料今天卖完了，人也不会失望地转头就走，因为只要是你就可以。\n\n大家喜欢你，你也知道大家喜欢你。但是你的底线是：不背刺爱你的人。这一点，你的很多竞品都没有做到。",
    portion: "一杯全糖含珍珠 ≈ 500ml", kcal: 430, calorieCompare: "≈ 8个苹果（今天辛苦了 = 8个苹果的热量）",
  },
  {
    id: "fries", name: "薯条", emoji: "🍟", vector: [0, 2, 0, 2],
    description: "刚出锅的时候是绝对的神。闻到味道，腿就走过去了，脑子还没反应过来。人会花一小时争论哪家做的薯条最好吃，争论无果后逐一买来做测评。\n\n有人爱蘸番茄酱，有人不要酱，但是几乎没人不爱你吧。你以对的温度和咸味出现，然后所有人都说好吃好吃。凉了不行，这一点你坦诚告知。",
    portion: "中份 ≈ 120g", kcal: 374, calorieCompare: "≈ 23根黄瓜（腿走过去前，脑子没来得及数）",
  },
  {
    id: "paineapple", name: "菠萝油", emoji: "🍞", vector: [0, 2, 2, 0],
    description: "你不是稀有的，但完美状态的你很稀有。不是每家都做得好，做得好的那家，也不是每次去都刚好赶上出炉。热热的菠萝包，冷藏的黄油，缺一不可。冷遇见热的那一口，两个相悖的口感在嘴里融合升华。\n\n懂你的人会卡着时间去找你，吃完了觉得今天运气不错。不懂的人随便什么时候去，拿到一个凉透了的，觉得也没什么特别。你不怪他们。时机这件事，本来就不是所有人都有耐心等的。",
    portion: "一个 ≈ 130g", kcal: 455, calorieCompare: "≈ 6个水煮蛋（惊喜感是无价的，热量是有价的）",
  },
  {
    id: "icecream", name: "冰淇淋", emoji: "🍦", vector: [0, 2, 2, 2],
    description: "你存在于各种「不应该」里。肠胃不好不应该，生病不应该，减肥期间不应该，但你被需要的那一刻没有人真的在想这些。吃完心情好了，其他的事情以后再说。\n\n你甜甜的又有各种形态，其实会被路过的小孩眼巴巴扒着玻璃围观。什么gelato什么欧洲冻酸奶什么椰子灰，人总想买来尝尝这玩意啥味儿，想着怎么也不会出错吧，但最后应该都要控诉一块冰碴子凭啥卖这么贵，还是老冰棍最好吃。",
    portion: "一球/一支 ≈ 100g", kcal: 200, calorieCompare: "≈ 4个苹果（今天豁出去了 = 4个苹果）",
  },
  {
    id: "luosifen", name: "螺蛳粉", emoji: "🍝", vector: [2, 0, 0, 0],
    description: "你永远不需要为自己辩护。有人一经过门口就皱眉，有人专程坐一个小时地铁来找你。你对这两种人的态度是一样的——爱吃就吃，不吃拉倒。\n\n香气比你先到。这件事你知道，也不打算改。有人叫它臭，有人叫它香，反正都是你，反正都记住了。你不解释，也不挽留。喜欢你的人不需要理由，而且一旦喜欢，就很难回头。\n\n其实螺蛳粉里也可以没有螺蛳，但你的灵魂始终独树一帜。",
    portion: "一包煮好 ≈ 400g", kcal: 560, calorieCompare: "≈ 35根黄瓜（香气先到，黄瓜永远学不会）",
  },
  {
    id: "soda", name: "汽水", emoji: "🥤", vector: [2, 0, 0, 2],
    description: "啵——那声开罐声就是你的出场BGM。你根本不需要解释和宣传。第一口最冲，气最足，有点想咳嗽但忍住了。\n\n有人说喝无糖的比较健康。好吧，0糖0脂0卡版的你依然让人上瘾，似乎还有研究表明那些甜味剂更不健康来着（你只是道听途说）。你从没骗过任何人，你只是没主动说清楚。\n\n据说有腐蚀性。嗯，也许吧。谁在乎呢，你好喝。",
    portion: "一罐 ≈ 330ml", kcal: 140, calorieCompare: "≈ 9根黄瓜（啵一声，9根黄瓜的努力没了）",
  },
  {
    id: "sausage", name: "淀粉肠", emoji: "🌭", vector: [2, 0, 2, 0],
    description: "你的成分是一个谜，而且是那种查了也不想知道答案的谜。网上每隔一段时间就有人发帖考证你到底是什么做的，评论区吵成一片，然后大家该买还是买。\n\n三块钱一根，五块钱两根。路过就买，不需要理由，也不需要饿。咬下去，外面脆，里面烫，必定烫嘴，每次都烫，每次都没有吸取教训。\n\n你不宣传自己的内在。内在也确实神秘。但烤得金黄焦脆的外皮告诉所有人：来吃，其他的事情不重要。",
    portion: "一根烤好 ≈ 80g", kcal: 192, calorieCompare: "≈ 2.5个水煮蛋（成分是谜，热量是实）",
  },
  {
    id: "latiao", name: "辣条", emoji: "🌶️", vector: [2, 0, 2, 2],
    description: "包装看着凶，颜色看着辣，但吃进嘴里是甜的。你也不是故意讨好小学生。\n\n喜欢你的人有一种共同的记忆——校门口小卖部，五毛钱，伸手就有。撕开的那一瞬，手上沾了红油，随便往哪一蹭，开吃。\n\n有时候是在课堂上。本来打算悄悄吃，结果袋子一撕，全世界都知道了。老师还没说话，同桌已经伸手过来了。你就这样毫无预兆地成为全场焦点。",
    portion: "一包 ≈ 65g", kcal: 260, calorieCompare: "≈ 16根黄瓜（甜的，但账单很辣）",
  },
  {
    id: "chicken", name: "炸鸡", emoji: "🍗", vector: [2, 2, 0, 0],
    description: `韩剧里总有人在哭着吃炸鸡配啤酒。你不觉得夸张，反而觉得合理。有些情绪不需要被解决，只需要被喂饱。你不是那种需要找理由才能吃的食物，而是人类隔一段时间就会突然非你不可的存在。\n\n你总那么坦荡，不为高热量道歉。不过偶尔品控不稳定或者吃出异物的时候会被喷"热量这么高还敢出错"罢了。`,
    portion: "两块鸡腿/翅 ≈ 200g", kcal: 540, calorieCompare: "≈ 7个水煮蛋（坦荡，高热量，不道歉）",
  },
  {
    id: "chips", name: "薯片", emoji: "🥔", vector: [2, 2, 0, 2],
    description: "走进超市，零食区最引人注目的就是你。新口味出了很多。蟹黄味、松露味、xx明星联名款、xx城市限定。很热闹。\n\n但购物车里最后加的还是原味。\n\n油炸的，脆脆的，膨化食品，土豆片。一旦拆封就停不下来，你就是这样让人欲罢不能而已。",
    portion: "一袋 ≈ 75g", kcal: 413, calorieCompare: "≈ 26根黄瓜（拆开袋子，黄瓜已成过去式）",
  },
  {
    id: "burger", name: "汉堡", emoji: "🍔", vector: [2, 2, 2, 0],
    description: "面包、生菜、肉饼、番茄，拆开来看朴实无华，你却是名副其实的垃圾食品代表。不过你出现在哪里都不违和。十几二十块的快餐店有你，人均300的精品burger馆也有你。你在哪都可以是主角正餐，吃完可能再也容不下别的食物了。\n\n垃圾食品里最体面的，体面食物里最垃圾的。你对此毫无愧疚。",
    portion: "一个普通款 ≈ 200g", kcal: 520, calorieCompare: "≈ 10个苹果（放纵版本的自己，10个苹果的代价）",
  },
  {
    id: "cookie", name: "饼干", emoji: "🍪", vector: [2, 2, 2, 2],
    description: "所有人都觉得认识你，但没有人真的研究过你。童年回忆，春节必囤，国民零食，随便哪个词都能套上去。很少有人会专门发帖说你好吃。但也没有人说不喜欢你。茶几上，办公室零食篮里，酥酥脆脆，有甜有咸。手边总是有你，就顺嘴吃了很多。\n\n直到有一天翻开配料表——哦。酥酥脆脆，原来都是有代价的。原来你没欺骗过任何人。你只是从来不主动介绍自己。",
    portion: "半包夹心饼干 ≈ 80g", kcal: 390, calorieCompare: "≈ 5个水煮蛋（人畜无害，停不下来，嘿嘿）",
  },
];

// 维度索引
export const DIM = {
  ACTIVATION: 0,  // 激活条件
  SOCIAL: 1,      // 社交接受度
  CONTRAST: 2,    // 反差方向
  ENERGY: 3,      // 能量类型
} as const;

export interface QuestionOption {
  text: string;
  scores: Partial<Record<keyof typeof DIM, number>>;
}

export interface Question {
  id: number;
  dimension: keyof typeof DIM;
  text: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "ACTIVATION",
    text: "如果你是一种垃圾食品，你觉得自己什么时候最好吃？",
    options: [
      { text: "本品总是处于巅峰状态，请随意品鉴", scores: { ACTIVATION: 2 } },
      { text: "我在等待对的人、对的时间、对的状态……", scores: { ACTIVATION: 0 } },
      { text: "刚出锅/刚拆封的第一时间", scores: { ACTIVATION: 0.5 } },
      { text: "出现在人类脑海里并使人类开始分泌唾液的时候", scores: { ACTIVATION: 1.5 } },
    ],
  },
  {
    id: 8,
    dimension: "ENERGY",
    text: "作为食物本物，你的赋能感在于……",
    options: [
      { text: "人类寂寞时需要我的陪伴", scores: { ENERGY: 1 } },
      { text: "我总会在特定的场合/时间段出现", scores: { ENERGY: 0 } },
      { text: "被无条件的爱包围", scores: { ENERGY: 2 } },
      { text: "好吃，仅此而已", scores: { ENERGY: 2 } },
    ],
  },
  {
    id: 3,
    dimension: "SOCIAL",
    text: "货架畅销王是你旁边那位，大家都在关注ta，没几个人看你。你……",
    options: [
      { text: "哦呵呵…不是所有人类都配得上品鉴我", scores: { SOCIAL: 0.6 } },
      { text: "我早已不在乎恶评，自有人把我爱惨", scores: { SOCIAL: 1 } },
      { text: "不可能发生这种事，我的人气不管在哪里都毋庸置疑", scores: { SOCIAL: 2 } },
      { text: "我乐得清闲、、", scores: { SOCIAL: 0 } },
    ],
  },
  {
    id: 6,
    dimension: "CONTRAST",
    text: "第一次品鉴你的人，可能会想说？",
    options: [
      { text: "\"就是想象中的味道，感觉小时候抱过我\"", scores: { CONTRAST: 0 } },
      { text: "\"没想到吃起来超香\"", scores: { CONTRAST: 1.5 } },
      { text: "\"（研究一番卡路里后）额你竟然是这样的热量炸弹，终究是错付了\"", scores: { CONTRAST: 2 } },
      { text: "\"下次还吃，因为品控稳稳的热量高高的，很安心\"", scores: { CONTRAST: 0.5 } },
    ],
  },
  {
    id: 2,
    dimension: "ACTIVATION",
    text: "你被人类带到了一个完全不属于你的场合（比如高档餐厅的餐桌上（噢没有说你低档的意思！））。你感觉……",
    options: [
      { text: "格格不入，俺要回村", scores: { ACTIVATION: 0.5 } },
      { text: "无所谓，本品在哪都将惊艳全场", scores: { ACTIVATION: 2 } },
      { text: "我仅需等一个懂我的人类出现", scores: { ACTIVATION: 0 } },
      { text: "拜托！这种场合是其它食物蹭我的热度好吗", scores: { ACTIVATION: 2 } },
    ],
  },
  {
    id: 9,
    dimension: "ENERGY",
    text: "有人类说「我这辈子都不会吃xx」。你怎么看？",
    options: [
      { text: "ta应该不是人类啵 哦呵呵……^ ^", scores: { ENERGY: 2 } },
      { text: "其实呢，人类都会有需要我的时候，你不需要我只是因为你现在不需要，但是总有一天你会突然理解我的好", scores: { ENERGY: 1 } },
      { text: "也许ta还没到能欣赏我的年纪", scores: { ENERGY: 0.7 } },
      { text: "愚昧的人类", scores: { ENERGY: 0 } },
    ],
  },
  {
    id: 5,
    dimension: "SOCIAL",
    text: "如果你可以在外包装上印一句宣传语，你会印哪句？",
    options: [
      { text: "「姥天！究极美味！」", scores: { SOCIAL: 0.6 } },
      { text: "爱吃不吃 我无需宣传", scores: { SOCIAL: 0 } },
      { text: "「有品的自会懂」", scores: { SOCIAL: 1 } },
      { text: "「全年销量可绕地球xx圈」", scores: { SOCIAL: 2 } },
    ],
  },
  {
    id: 7,
    dimension: "CONTRAST",
    text: "如果你一夜之间莫名其妙上了热搜黑榜，你觉得最可能是因为……",
    options: [
      { text: "我太美妙，被对家看不顺眼买通稿了", scores: { CONTRAST: 2 } },
      { text: "卫生问题吧嘻嘻，但又怎样呢", scores: { CONTRAST: 0 } },
      { text: "控诉我不符合《中国居民膳食指南》推荐的饮食结构", scores: { CONTRAST: 0 } },
      { text: "恶评不看（其实是因为看了会创伤应激", scores: { CONTRAST: 1 } },
    ],
  },
  {
    id: 4,
    dimension: "SOCIAL",
    text: "有人类发了一条「这个xx真的难吃 恶心 避雷」，说的就是你。你第一反应是？",
    options: [
      { text: "我管你喜欢什么。。0人在乎你的评价吧", scores: { SOCIAL: 0 } },
      { text: '只一味打开收藏夹反复观看人类的各种"绝绝子""美味到跺jiojio"', scores: { SOCIAL: 1.5 } },
      { text: "此人品味太小众，爱我的人已排到巴黎", scores: { SOCIAL: 1 } },
      { text: '破防捶墙尖叫"这绝不可能！！！"', scores: { SOCIAL: 2 } },
    ],
  },
  {
    id: 10,
    dimension: "ENERGY",
    text: "你的食用场景？",
    options: [
      { text: "路边香气传过来，腿就走过去了", scores: { ENERGY: 2 } },
      { text: "总是有个理由，总是刚刚好那个时刻", scores: { ENERGY: 1 } },
      { text: "某年某月的某一天，我的美味终于被认可", scores: { ENERGY: 0 } },
      { text: "。。。。什么场景什么痛点什么颗粒度什么什么什么意思。。", scores: { ENERGY: 1 } },
    ],
  },
];
