# VISFURN 增量执行记录 — 2026-11-09

## 范围与当前版本
仅 www.visfurn.com。已读取 Library 中 Four_Sites_AI_Growth_Plan_20261108.md 当前版本0（126行），增长看板现有任务/记录，main、8个未合并PR、现有sitemap与报价指南及11/07—11/08研究记录。
GitHub compare证实 main 与4c6f55a09ea2a4bdc09c6fad11239e67a4cbfa53完全相同；Mike团队team_qvgr1dWcQ4t5QLcvJFUpWZQi / 项目prj_gwcK8vPfKHEf3KIFfvG5YJlFvh7L / visfurn-wood-door-site / production main，最新READY部署dpl_HuV5BEr3GVuhvTT4DAco7DQrq24c，项目域名包含www.visfurn.com。PR197是此前上线，不记本轮新上线。
公开文本读取核实四分类、About合作板块、Contact和既有报价指南。网页阅读器部分结果为当日抓取，部分标为前一日缓存，不能当作本轮原始HTTP/字节哈希验收。公开robots/sitemap/资料页阅读失败不证明线上故障。仓库robots和sitemap可读，151条唯一URL；三个11/08核心页lastmod仍11/08，About也11/08。
本轮无法进入执行环境，未读取本地未提交改动，未运行命令、构建或浏览器QA。没有覆盖本地工作。

## 本轮SEMrush：阻塞，未完成
固定入口 https://zh-d-semrush-d-com-s-sem.d.taobao-seo.com/home/ 。
浏览器连接调用返回 Unknown tool(browser.js)，因此不能复用用户会话。公开阅读器尝试指定入口，返回not accessible；未取得报告页面、登录状态、国家设置、最新日期、配额或任何新指标。未认定用户账号失效，未购买订阅、绕过登录或把普通网页当Semrush。
最小恢复条件：提供可正常控制的已授权浏览器连接并打开指定中转工具；按正常登录流程恢复有效会话后，复核Trudoor商业木门URL和TruStile室内门实际引用问题；不重跑全库。
本次只复用已持久化近期快照：访问2026-11-08，报告日期2026-11-07，US desktop，USD；不是11/09新查询。原始链接/筛选保留在 docs/qa/semrush-observed-20261108.json（PR195候选SHA735233a6447828f1ee4ca66a7c6510c8acf551de），与本轮阻塞分开。

## 复用证据与同行选择
- Trudoor https://www.trudoor.com/collections/commercial-wood-doors ：US商业木门，估算827流量、512关键词、33全平台LLM prompts。词 commercial interior doors：C，720月量，KD15，位置2；wood doors and frames：T，90，KD13，位置1。CPC未获取。33不是ChatGPT专属数量。11/09打开实际落地页，看到按饰面/门芯组织、规格/加工信息与配置报价入口；只借鉴范围组织，不移植其价格、尺寸扣减、产地或等级。
- TruStile https://www.trustile.com/ ：旧US/ChatGPT样本“Where can I find reliable suppliers for MDF interior doors?”标记提及/引用，完整答复更新时间11/06，自己域名首页为引用来源；区分买家用途、结构、饰面、样品、文件、供货与物流。11/09公开首页仍有材料/设计配置工具、经销采购入口。仅样本证据，不是推荐率或转化率。
- OPPEIN https://www.oppeinhome.com/wpc-door-guide ：旧US估算34流量/6词/1prompt，实际平台AI Overview。保留WPC意图参考，不能说成ChatGPT推荐，也不使用柜门流量。
- Dortek https://dortek.com/product-sector/healthcare-doors/ ：旧US估算52/31词/5全平台prompts；材料不同，医院功能与文件参考，不借用GRP或性能。旧提示明细报错，本轮未恢复。
10家候选库沿用11/08研究，不增补弱匹配域名凑数；JELD-WEN/ASSA ABLOY整域包含多产品，MexyTech板材及零售/DIY流量排除。当前没有任何已验证高转化词或同行真实询盘数据。

## 当前瓶颈与机会排序
最主要可实施缺口：既有报价指南虽有商业页反链，仍停留清单式说明，缺少买家可直接填写的逐项对照与数量归一化示例。数据瓶颈：无法核对指定GSC账号、最新查询及实际收件/报价，不能证明增长效果。
排序为内部决策分（1–5每项，非流量预测）；维度为产品匹配/需求证据/页面缺口/资料准备/询盘价值/低成本低风险。

| 排名 | 机会 | 分项 | 总分/30 | 本轮决定 |
|---|---|---|---:|---|
|1|深度完善现有供应商报价比较指南|5/3/4/5/5/4|26|完成完整英文HTML候选，等待构建/浏览器验收|
|2|检查11/08三个核心页抓取与Google canonical|5/4/3/2/5/4|23|公开正文/仓库部分核对；GSC阻塞，保留观察|
|3|实拍样品/门芯/框五金配置与文件证据|5/3/4/1/5/3|21|待真实资料，不用生成图片冒充|
|4|医院用途与实际AI提示细分|5/2/3/2/4/3|19|保持现页，待Semrush提示和项目证据|
|5|批量国家页或十家整域权重驱动扩写|2/1/1/1/2/1|8|不实施：无新本地需求，重复风险高|

## 核心意图到主要URL的承接（增量地图）
1. WPC构造与材料区分 → /products/wpc-doors（11/08已上线，观察）
2. 完整室内门组范围 → /products/interior-doors（11/08已上线，观察）
3. 木门/框/真实门芯 → /products/wooden-doors（既有）
4. 医院用途与净通行尺寸 → /products/hospital-doors（11/08已上线，观察）
5. 供货组合/含哪些部件 → /solutions/interior-door-supply-packages（11/07既有）
6. 比较供应商报价 → /blog/compare-door-supplier-quotes-bulk-projects（本轮深化候选）
7. 样品批准与生产门槛 → /blog/door-sample-approval-checklist-before-mass-production（11/07既有，避免重复重写）
8. 项目文件与配置适用性 → /resources/standards-documentation（既有）

自行设计、尚未在AI工具观察到的问题：How do I compare a leaf-only price with a complete door-set price?（English，国际项目采购，2026-11-09，平台待验证）。不得将此写为ChatGPT实际提示或引用。

## 完整英文内容交付
目标现有URL：https://www.visfurn.com/blog/compare-door-supplier-quotes-bulk-projects
源码：blog/compare-door-supplier-quotes-bulk-projects.html。
目标买家：进口商/经销商/工程采购；产品WPC、interior、wooden及医院用途；国际采购阶段为收到初步报价到选供应商/生产批准之前，不新增国家合规承诺。
Primary keyword: compare door supplier quotes。相关词：door quotation comparison, complete door set quote, leaf-only door price, wood doors and frames, door schedule。主要词搜索量未获取；关联wood doors and frames历史量90不冒充主词量。
SEO Title / 唯一H1保持 How to Compare Door Supplier Quotes for Bulk Projects；Meta保持原有准确摘要。
完整英文正文约1481词，另有6个可见FAQ：逐项比价矩阵、实际材料/饰面、尺寸基准、120+60+20=200洞口示例、完整包件计算、硬件供应与加工区分、文件/样品放产条件、包装与交付范围、可复制澄清请求、询价CTA。
例子明确非客户订单，不虚构价格或性能；保留50套/型号10套已确认MOQ，不承诺样品例外或抵扣。
原有木门商业页的“How can buyers compare wooden door supplier quotes?”答案已有 /blog/compare-door-supplier-quotes-bulk-projects 链接；本次保留该反链。文章回链WPC/interior/wooden/hospital、供货组合与资料页，CTA到现有Contact并附source_page。无新增URL，不重复争夺分类意图。
供应商文件审核只作范围澄清，不是独立认证审计；引导买家删去不应披露的对手信息。

## 图片决策
复用既有主图，无新图、无替换资产。ID B25-existing-b14-hero；模块quotation guide hero；文件 /assets/images/blog/b14-door-schedule-takeoff-checklist-for-bulk-orders/door-takeoff-estimating-hero-1600.webp；现有标记1600×900；用途为报价规划示意，来源为本站既有资产，不是新实拍。Alt沿用“Estimator comparing bulk door supplier quotations, schedule fields and hardware scope”。图注改为明确illustrative，不能作为项目/工厂/性能证明。生成提示词/禁止元素不适用（未生成），移动端既有picture保留、视觉验收待做；实际文件尺寸/体积本轮未读取。

## 候选修改与验证边界
独立分支 content/quote-comparison-20261109，基于当前main4c6f55...，不触碰PR195。
仅报价指南、对应sitemap lastmod和本记录。原有SEO标题、图片标签、脚本、公司、表单和追踪保留；修改FAQ及其JSON-LD，Article dateModified与候选内容日期匹配并添加稳定@id。
静态字符串/JSON检查已做：单H1、自canonical、2个JSON-LD解析、6个FAQ可见/Schema一致、ID唯一、原有脚本与图片标签完全不变、公开正文无禁止历史身份；19个站内路径均在既有151条唯一sitemap中。该检查不是完整HTML验证、真实HTTP链接检查或富结果验证。
未完成：本地构建/既有mock脚本、HTML渲染、375/390/1440移动/桌面、预览正文与CTA功能。执行环境返回No usable execution environment，浏览器返回Unknown tool。不能把静态检查记为已本地验证，状态为已完成内容/待验收。上线日期若不同，须更新本页dateModified和lastmod至实际修改/发布时间。
不发送真实表单，不验证收件；本轮不改任何表单事件。

## GSC / GA4 / 索引
请求的账号EduardozsdfEngle@gmail.com本轮未能进入。GSC Wizard账号信息与属性调用返回payment_required/subscription_required；未购买。另一个现有SMEPost连接返回InflatCustom工作区、VISFURN属性siteUnverifiedUser、仅最近3天、comparisonAllowed:false，未提供已连接Google邮箱。此结果不能证明指定Eduardo账号下VISFURN未验证，不能据此改验证配置；不在不可读属性上继续报表/Inspection请求。
最近两个完整等长28天数据、最后抓取、Google所选canonical、GA4/Clarity/有效询盘均未获取。旧10/10—11/06 Google AI185仅历史基线，未作新效果。
本轮没有新正式发布，不提交Google sitemap或IndexNow，URL提交清单为空；保留11/08三页和更早11URL通知事实，不重复计数。
仓库robots允许Googlebot/Bingbot/OAI-SearchBot/ChatGPT-User公开访问，限制api/admin；GPTBot/Google-Extended等训练权限保持Disallow。本轮未核验WAF实际日志/响应头，不声称完整AI抓取通过。

## 发布与复盘
生产保持4c6f55a09ea2a4bdc09c6fad11239e67a4cbfa53 / READY dpl_HuV5BEr3GVuhvTT4DAco7DQrq24c。候选不合并、不称上线；恢复QA后依据当前范围/准确SHA按既有发布契约处理。出现新提交需重读main；revert隔离PR，不回退覆盖其他新改动。PR195当前仍open且mergeable:false，与最新三核心页重叠，不能盲合并。
11/08三页7/14/28天观察日期仍11/15、11/22、12/06；11/09尚未到期，无效果结论。PR197合作块同样仍待观察阿里来源→产品/RFQ→真实有效询盘。历史PR189按其实际上线日保留自己的观察窗口。
下一步：恢复已授权浏览器的Semrush/GSC指定账号；完成本候选构建/真实桌面移动/CTA验收；11/15及随后到期执行检查再决定是否改核心页。之后按阶段8–30天优先真实查询与证据，31–60天补实拍和配置文件，61–90天完整28天及销售推进复盘。没有新建或触发定时任务。

## 11/09 下午承接 PR198 — 本轮增量（早前阻塞保留为历史）
用户要求完成上述任务，沿用范围内验证与发布授权。当前 main 已更新为8b0a7fe3e8f43f2d9a5a5a3a382f8c18932a8c80（PR200）；合入当前main后保留PR199博客图与PR200 Contact三Banner，生产差异仍仅指南、该URL的sitemap日期和本台账。旧PR195不合并。Mike项目当前元数据再次核对id prj_gwcK8vPfKHEf3KIFfvG5YJlFvh7L/accountId team_qvgr1dWcQ4t5QLcvJFUpWZQi，域名www.visfurn.com；显式teamId读取404与默认连接实际读取成功分别记录，不改团队/权限。

### SEMrush 新查询已取得
访问2026-11-09，北京时间下午；固定.d入口本会话先返回401。用户登录 https://taobao-seo.com/#/dashboard 后，从平台自己的“打开 Semrush”按钮得到实际正常入口 https://zh-d-semrush-d-com-s-sem.taobao-seo.com/home/ 。使用正常授权跳转，未绕过登录或购买。
本轮聚焦Trudoor一个相关木门页面，复用既有十同行库，不重跑全库。国家US，desktop，USD，报告日期2026-11-08；Top Pages无独立设备选择，关联Organic报告为desktop。域名概览US自然流量42,937、关键词22,641仅整站背景，含金属门/五金/品牌，不当作木门机会。概览关键主题出现鞋码/女装，排除该异常模块。
实际报告：
- Domain Overview: https://zh-d-semrush-d-com-s-sem.taobao-seo.com/analytics/overview/?db=us&q=trudoor.com&searchType=domain&currency=usd
- Top Pages: https://zh-d-semrush-d-com-s-sem.taobao-seo.com/analytics/toppages/?db=us&q=trudoor.com&searchType=domain&fid=14167537
- URL Organic Positions: https://zh-d-semrush-d-com-s-sem.taobao-seo.com/analytics/organic/positions/?db=us&q=https%3A%2F%2Fwww.trudoor.com%2Fcollections%2Fcommercial-wood-doors&searchType=url
商业木门URL https://www.trudoor.com/collections/commercial-wood-doors ：估算流量817、占整站1.90%、511词、33全平台LLM prompts；Top Pages变化-57（该模块口径），不用跨模块变化率作因果结论。关键词表默认全部排名，区分自然数值位置与无数字SERP行；仅采用有数字排名的相关行：
|词|意图|位置|月量|KD|该行估算流量|占本页流量|
|---|---|---:|---:|---:|---:|---:|
|commercial interior doors|C|2|720|15|95|11.62%|
|wood doors and frames|T|1|90|13|22|2.69%|
|solid core wood doors commercial|C|1|90|7|22|2.69%|
|prehung commercial interior doors|C|2|50|15|4|0.48%|
CPC未获取，主词compare door supplier quotes月量未获取；不称真实高转化。已打开同行实际落地页，核实按饰面/门芯组织、加工、尺寸基准和Configure/Get Price入口；只借鉴采购组织，不复制价格、美国原产地、尺寸扣减、等级或正文。
AI报告从Top Pages该URL的33提示链接进入，US/所有AI平台/2026-11-08，过滤source_url contains该完整商业木门URL：
https://zh-d-semrush-d-com-s-sem.taobao-seo.com/ai-seo/overview/?q=trudoor.com&preset=brandedSources&db=us&filter=eyJkaW1lbnNpb24iOnsic291cmNlX3VybCI6eyJjb250YWlucyI6Imh0dHBzOi8vd3d3LnRydWRvb3IuY29tL2NvbGxlY3Rpb25zL2NvbW1lcmNpYWwtd29vZC1kb29ycyJ9fX0&fid=14167537
实际展开33提示首批5条，其中英文问题“Where can I buy high-quality industrial interior doors online?”打开完整回答：US/Gemini，答复更新2026-10-16，8品牌/4来源，Trudoor被提及且引用上述商业木门URL；回答按工业风钢门与重型商业门分支组织，含solid-core wood及报价配置。该问题覆盖钢玻璃/金属，只有商业木门采购分支相关，不能全盘采纳。另wood door price、commercial wood doors near me和solid wood commercial doors实际平台AI Overview；葡语Onde posso comprar portas de madeira de qualidade com bom preço?为Gemini/US。不是ChatGPT引用证据。33全平台提示不可写成33 ChatGPT推荐。US整站ChatGPT122提及/479引用页面仅整站背景，不作为该页或VISFURN数据。
本轮研究验证既有机会排序：报价范围/材料/尺寸/五金归一化优先，抓取与canonical次之（GSC待读），真实资料第三，医院提示第四（未新查），无证据国家页不做。未新增薄页或制造资质。

### QA及最小修正
静态build为项目原有no-op已运行通过。现有check-inquiry-submit-mock及check-door-supply-context全部通过，均mock，无外发。单H1/自canonical、两份JSON-LD、6FAQ对应、无历史禁名、脚本/图片标签保留、151唯一sitemap检查通过。
Cloud本地Chromium下载损坏，未把安装失败当视觉验收；改用现有sites-preview与云Chrome实看。预览导出当前源码，仅测试包装页不入生产。375/390/1440px iframe viewport分别client/scroll360/360、375/375、1425/1425，无页面横溢出；表格在375px可读、图加载、FAQ第二项展开aria-expanded=true。此为CSS视口，非实机。预览服务器不执行Vercel cleanUrls，Contact仅在测试副本映射到contact.html，不改生产路由。
发现仅source_page的旧CTA不能触发现有产品上下文脚本；本指南CTA最小改为product=interior-doors、inquiry_purpose=specification-review、supply_scope=help-me-choose，保留source_page和#quote-form。不改共享脚本或追踪范围。实际浏览器预填Interior Wooden Doors、Specification review、Help me compare the scope；既有来源字段被填入（浏览器输出遮盖值，完整准确值依源代码与mock验证，不伪称UI读到明文）。稳定后form顶194px可见，action仍Formspree /f/xoeadjwv。未提交询盘或检查收件。
GSC Wizard本次重新读取仍payment_required/subscription_required；SMEPost重新列属性仍InflatCustom工作区/3天/禁比较，VISFURN siteUnverifiedUser，不代表EduardozsdfEngle@gmail.com指定账号。未取得最近两个完整28天、Google canonical或最后抓取；不把不可读当零，也不购买。GA4/Clarity/有效询盘本轮无数据。
发布后仅本指南canonical去重通知IndexNow；Google sitemap受连接限制待提交。11/08三页观察11/15、11/22、12/06不变；本指南若11/09上线，其7/14/28观察为11/16、11/23、12/07，在现有任务处理。无新提醒。回退只revert PR198，保留PR199/200。
