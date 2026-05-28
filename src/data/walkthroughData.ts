/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WalkthroughStep {
  title: { en: string; fa: string };
  desc: { en: string; fa: string };
  protocol: string;
  reason: { en: string; fa: string };
  payload: string; // JSON string representing target packet
  challenge: { en: string; fa: string };
  systemLogs: string[];
  activeNodes: string[]; // nodes to highlight: e.g. ['client', 'gateway']
}

export interface BlueprintWalkthrough {
  projectName: { en: string; fa: string };
  steps: WalkthroughStep[];
}

export const walkthroughData: Record<string, BlueprintWalkthrough> = {
  calkilo: {
    projectName: { en: "Calkilo AI (Nutrition Cam)", fa: "کالکیلو (هوش مصنوعی تغذیه)" },
    steps: [
      {
        title: { en: "1. CLIENT: Compress & Upload Image", fa: "۱. کلاینت: فشرده‌سازی و ارسال تصویر" },
        desc: {
          en: "The Flutter mobile app captures a meal photo. High-resolution images are too slow to transmit over active cellular networks, so the on-device engine compresses it into an optimized buffer.",
          fa: "رابط فلاتر عکسی از غذا تهیه می‌کند. از آنجایی که آپلود عکس اصلی روی دیتای موبایل کند است، موتور محلی فلاتر عکس را در پس‌زمینه فشرده کرده و به بایت ارسال می‌کند."
        },
        protocol: "HTTP/2 (Multipart Form-Data over TLS 1.3)",
        reason: {
          en: "HTTP/2 multiplexes streams over a single TCP connection, reducing head-of-line blocking and accelerating image payload delivery.",
          fa: "پروتکل HTTP/2 رشته‌های ورودی را روی یک اتصال یکپارچه انتقال می‌دهد تا از معطل ماندن رندر فلاتر برای اتمام آپلود تصویر جلوگیری شود."
        },
        payload: JSON.stringify({
          userId: "usr_calkilo_891",
          sessionToken: "jwt_calkilo_token_94e3ab...",
          imageMeta: { format: "jpeg", width: 640, height: 640 },
          payloadSize: "124 KB",
          timestamp: 1779713800200
        }, null, 2),
        challenge: {
          en: "Flutter handles camera stream frames dynamically inside a Dart Isolate thread. This prevents CPU stuttering, ensuring the UI stays butter-smooth at a locked 120Hz while the compression and network buffers run concurrently.",
          fa: "موتور محلی فلاتر فرآیند فشرده‌سازی عکس دوربین را درون نخ‌های غیرهمزمان (Dart Isolate) اجرا می‌کند. این امر داغ شدن پردازنده را متوقف کرده و نرخ نوسازی گرافیک کلاینت را زنده روی ۱۲۰ هرتز ثابت نگه می‌دارد."
        },
        systemLogs: [
          "[CLIENT] Flutter Core camera preview captured 640x640 JPEG",
          "[CLIENT] Handed over task payload to background Dart Isolate thread",
          "[CLIENT] Slashed raw frame from 4.2MB down to 124KB (JPEG, 85% quality)",
          "[NET] Resolving host target calkilo-prod-ingress.co",
          "[NET] Client initiates TLS 1.3 handshake on TCP Port 443"
        ],
        activeNodes: ["client", "gateway"]
      },
      {
        title: { en: "2. GATEWAY: Rate Limiting & Auth Validation", fa: "۲. دروازه: تایید اعتبار و کنترل ترافیک" },
        desc: {
          en: "The Kong API Gateway receives the secure stream, evaluates the user's JWT cryptographic signature, and checks IP-based rate limiting metrics to ensure security constraints are fully met.",
          fa: "دروازه مدیریت Kong درخواست ورودی را دریافت کرده، امضای دیجیتالی توکن JWT کاربر را در کسر صدم ثانیه ارزیابی می‌کند و با پایش سقف درخواست، مانع وقوع بات‌ها یا حملات تخریبی می‌شود."
        },
        protocol: "HTTPS (TLS 1.3 End-to-End Encryption)",
        reason: {
          en: "Ensures complete data integrity and prevents sniffing of sensitive personal nutrition and health data on public networks.",
          fa: "جلوگیری از هرگونه شنود اطلاعات یا تغییر بسته‌های تغذیه کاربر در طول بستر ارتباطی ناامن سراسری."
        },
        payload: JSON.stringify({
          clientIp: "85.185.12.104",
          httpHeader: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)"
          },
          corsMatch: "ALLOWED_ORIGIN_CLIENT",
          rateLimit: { remaining: 998, reset_seconds: 42 }
        }, null, 2),
        challenge: {
          en: "Rather than hitting the core relational database to validate every incoming request's access level, the gateway checks an in-memory Redis token whitelist, dodging a massive SQL queries bottleneck on high traffic scales.",
          fa: "دروازه به جای کوئری زدن مداوم به پایگاه‌داده اصلی برای سنجش توکن‌ها، وضعیت معتبر بودن توکن را در کَش سریع ردیس پایش می‌کند؛ این کار مانع از قفل رفتاری و تنبلی دیتابیس در ترافیک‌های ورودی بالا می‌شود."
        },
        systemLogs: [
          "[GATEWAY] Received POST request to /api/v1/analyze-meal via TLS 1.3",
          "[AUTH] Cryptographic JWT signature decoded successfully: user id (891) premium status validated",
          "[GATEWAY] CORS origin match confirmed for bundle calkilo.app",
          "[NET] Forwarding sanitised HTTP/2 payload to internal cloud networks"
        ],
        activeNodes: ["gateway", "broker"]
      },
      {
        title: { en: "3. BROKER: Asynchronous Event Queueing", fa: "۳. واسطه: صف‌بندی ناهمگام وظایف پردازشی" },
        desc: {
          en: "Because computer vision inference on GPU farms can take several hundred milliseconds, holding the client's HTTP connection open creates thread starvation on web servers. We queue the analysis job in a high-speed Redis Stream and immediately return a positive receipt status code.",
          fa: "از آنجا که پردازش تصویر توسط هوش مصنوعی و کارت‌های گرافیک تا ۱۸۰ میلی‌ثانیه زمان می‌برد، معطل گذاشتن کلاینت منجر به اتمام پورت‌های سرور می‌شود. ما بلافاصله کار ارسالی را در صف سریع ردیس به امانت می‌گذاریم و کد تایید موقت صادر می‌کنیم."
        },
        protocol: "RESP (Redis Serialization Protocol over TCP)",
        reason: {
          en: "Extremely low-overhead, in-memory protocol designed for throughputs exceeding 100,000 commands/sec.",
          fa: "پروتکلی فوق‌العاده سبک برای انتقال اطلاعات در حافظه موقت با توانایی ثبت بیش از ۱۰۰٬۰۰۰ دستور در ثانیه."
        },
        payload: JSON.stringify({
          redisStream: "stream:meal_analysis",
          jobId: "job_94218_calkilo",
          priorityScore: 10,
          payloadMeta: { imageUri: "s3://calkilo-ingest/raw/891_94218.jpg" },
          ingressReturnCode: "202_ACCEPTED"
        }, null, 2),
        challenge: {
          en: "We implement an Event-Driven architecture here. By returning an instant '202 Accepted' status code, the Flutter client can unlock its busy states. Flutter then opens a lightweight WebSocket connection to await notification of the model's output in real-time.",
          fa: "با اتخاذ رویکرد رویدادمحور و صدور پاسخ آنی تایید موقت، فلاتر از حالت انتظار خارج شده و از لک زدن نرم‌افزار جلوگیری می‌شود؛ همزمان ارتباط وب‌سوکت برای دریافت نتیجه نهایی باز نگه داشته می‌شود."
        },
        systemLogs: [
          "[QUEUE] Uploaded photo buffer successfully written to AWS S3 Object Storage bucket",
          "[QUEUE] Added job task item 'job_94218_calkilo' to Redis Stream 'stream:meal_analysis'",
          "[NET] Inbound gateway returns status 'HTTP/2 220 Accepted' (Connection Released)",
          "[CLIENT] Received 202 Accepted; UI transitions scanner overlay to async analyzer state spinner"
        ],
        activeNodes: ["broker", "worker"]
      },
      {
        title: { en: "4. WORKER: Model Inference Execution", fa: "۴. پردازشگر: استنتاج از مدل هوش مصنوعی" },
        desc: {
          en: "A concurrent Python worker cluster retrieves the job from the Redis Stream, downloads the compressed image via local internal pipelines, and feeds the normalized pixel tensor to a custom YOLOv8 model optimized using the C++ ONNX runtime.",
          fa: "خوشه موثر از پردازنده‌های مستقل، تسک را از ردیس دریافت کرده، تصویر را در زیرشبکه سریع داخلی لود می‌کنند و پس از تبدیل پیکسل‌ها به ماتریس‌های تانسور، مدل بینایی ماشین YOLOv8 را با کمک هسته بسیار سریع C++ ONNX فراخوانی می‌کنند."
        },
        protocol: "gRPC over HTTP/2 (Protobuf Binary Serialisation)",
        reason: {
          en: "gRPC uses binary protocol buffers instead of text-based JSON, cutting data serialisation overhead by up to 90% and speeding up GPU clusters communications.",
          fa: "کاهش ۹۰ درصدی حجم ارتباط و پهنای باند گره‌ها به واسطه قالب باینری پروتباف (Protobuf) به جای متون JSON در ارتباط داخلی خوشه هوش مصنوعی."
        },
        payload: JSON.stringify({
          onnxTargetModel: "YOLOv8x_Nutrition_FP16.onnx",
          executionProvider: "CUDA_GPU_ACCELERATED",
          detectedBoundingBoxes: [
            { label: "pizza_slice", conf: 0.946, coords: [120, 40, 320, 280] },
            { label: "tomato", conf: 0.88, coords: [200, 180, 240, 220] }
          ],
          computeLatencySeconds: 0.114
        }, null, 2),
        challenge: {
          en: "To maximize GPU hardware efficiency, workers utilize an elastic memory pool that stacks frames into dynamic mini-batches. This prevents memory leaks on the C++ layer and increases the system's inference capacity by 350% during peak lunch hour usage.",
          fa: "جهت دستیابی به حداکثر توان پردازشی، فریم‌ها به صورت دسته‌ای بارگذاری می‌شوند. این موضوع مانع تداخل حافظه شده و توان پردازشی استنتاج را در ساعت پیک ناهار کاربران تا ۳۵۰ درصد ارتقا می‌دهد."
        },
        systemLogs: [
          "[WORKER-8] Claimed task item 'job_94218_calkilo' from Redis Stream using consumer groups API",
          "[WORKER-8] Image retrieved from local bucket cache: 124KB validated",
          "[WORKER-8] Running ONNX Runtime inference using CUDA v12.2 GPU cores",
          "[MODEL-YOLO] Output tensor results resolved: pizza_slice (94.6%), tomato (88.0%)",
          "[LOGIC] Computed total nutrient index specs: 540 calories, 12g protein"
        ],
        activeNodes: ["worker", "database"]
      },
      {
        title: { en: "5. DATABASE: pg_vector Embedding Storage", fa: "۵. بانک داده: ذخیره‌سازی بردارهای معنایی و بهینه‌سازی" },
        desc: {
          en: "The classification metrics, nutritional totals, and raw tensor coordinate arrays are mapped to a Postgres SQL transaction. Concurrently, the meal attributes are converted into a mathematical embedding vector and stored in pg_vector sharded indices.",
          fa: "داده‌های تغذیه محاسبه شده به همراه ویژگی‌های تصویری به صورت یک تراکنش امن به دیتابیس پستگرس ارسال می‌شوند. مشخصه‌های معنایی تصویر نیز به شکل بردارهای اعشاری در سیستم مدرن pg_vector ذخیره می‌گردند."
        },
        protocol: "PostgreSQL Native TCP Pool Protocol",
        reason: {
          en: "Provides atomic database operations (ACID) to ensure nutrition history logs are never corrupted, partially written, or mismatched with the user profile indices.",
          fa: "تضمین یکپارچگی اتمیک (ACID) داده‌ها به گونه‌ای که ثبت ریزمغذی‌ها در تاریخچه به صورت ناقص یا موازی مخدوش نشود."
        },
        payload: JSON.stringify({
          writeTransactionId: "tx_calkilo_902418",
          insertTable: "user_nutrition_history",
          vectorDimension: 1536,
          vectorHead: [0.1425, -0.0911, 0.8841, -0.0152],
          searchIndexUsed: "ivfflat_cosine_index_calkilo",
          commitStatus: "TX_COMMITTED"
        }, null, 2),
        challenge: {
          en: "By storing meal characteristics as vectors, subsequent users who upload similar food photos bypass the expensive GPU inference step completely! The system executes an cosine-similarity search in pg_vector under 5ms, fetching cached nutrient records instantly.",
          fa: "با ذخیره بردارهای تصویر، اگر در ثانیه بعدی کاربر دیگری عکسی مشابه ارسال کند، بدون درگیر کردن پردازشگر گران قیمت کارت گرافیک، با جستجوی برداری دیتابیس پاسخ را در ۵ میلی‌ثانیه فورا صادر می‌کند."
        },
        systemLogs: [
          "[DB] Acquiring Postgres SQL connection from active pg_bouncer cluster proxy pool",
          "[DB] Executing transaction write block: INSERT INTO user_nutrition_history",
          "[DB] Calculating cosine distance inside pg_vector matrix search index",
          "[WS-BROADCASTER] Resolving client WebSocket ws_client_3921",
          "[WS-BROADCASTER] Dispatched payload analysis results data frame to mobile app",
          "[CLIENT] UI receives meal details payload: hides spinner and renders calorie cards"
        ],
        activeNodes: ["database", "client"]
      }
    ]
  },
  couchini: {
    projectName: { en: "Couchini Music (Sync Audio)", fa: "کوچینی موزیک (پخش همگام)" },
    steps: [
      {
        title: { en: "1. CLIENT: Dispatch Audio Sync Frame", fa: "۱. کلاینت: ارسال سیگنال تراز لحظه‌ای آهنگ" },
        desc: {
          en: "When the host audio owner pauses, seeks, or navigates in a music room, the Flutter terminal client emits an ultra-lightweight sync event specifying the exact playback seek microsecond and the room parameters.",
          fa: "وقتی کاربر میزبان در اتاق اشتراکی، آهنگ را متوقف می‌کند یا زمان پخش را جلو و عقب می‌برد، رابط کاربری فلاتر بلافاصله پکت فوق‌العاده سبکی را به وب‌سوکت پرتاب می‌کند."
        },
        protocol: "WSS (Secure WebSockets over HTTP/2 TLS 1.3)",
        reason: {
          en: "WebSockets eliminate standard HTTP handshake latency by holding a persistent, bidirectionally open, low-latency TCP communication queue.",
          fa: "حذف کامل زمان سنگین توافق دست‌دهی در پروتکل مرسوم HTTP و برقراری ارتباط مداوم و دوطرفه وب‌سوکت کلاینت با لایه مرکزی."
        },
        payload: JSON.stringify({
          action: "ROOM_TRACK_SEEK",
          roomCode: "couchini_room_942",
          hostSeekTimestampMs: 142400,
          songId: "track_couch_blues204",
          epochTimestamp: 1779713801200
        }, null, 2),
        challenge: {
          en: "Interactive music party rooms require absolute zero-jitter UI responsiveness. Flutter manages the state tree reactivity globally with Riverpod and performs frame-synced audio rendering loop callbacks without skipping on-device graphics.",
          fa: "کنترل تالارهای صوتی اشتراکی نیازمند کمترین اختلال نوسانی (جیتر) اینترنت است؛ ماژول مدیریت فلاتر با کمک Riverpod متغیر حالت را تغییر داده و از ریزش‌های رندر کارت گرافیک پیشگیری می‌کند."
        },
        systemLogs: [
          "[CLIENT] Host user initiated touch slider 'Seek Slider' to offset mark 142400ms",
          "[CLIENT] Riverpod state triggers sync event queue task",
          "[CLIENT] Assembling payload frame: size 112 bytes",
          "[WS] Pushing packet frame to wss://couchini.co/realtime/sync-room-socket"
        ],
        activeNodes: ["client", "gateway"]
      },
      {
        title: { en: "2. GATEWAY: WebSocket Connection Multi-plexing", fa: "۲. دروازه: توزیع اتصالات وب‌سوکت با کانسپت معکوس" },
        desc: {
          en: "An optimized Nginx Reverse Proxy handles hundreds of thousands of concurrent WebSocket connections, performing SSL/TLS decryption on the ingress edge before piping raw frames locally to internal socket aggregates.",
          fa: "دروازه Nginx به عنوان یک سرویس‌دهنده معکوس، هزاران کاربر همزمان وب‌سوکت را مدیریت کرده، رمزگشایی کدهای امن را در لبه لود بالانسر حل نموده و بسته‌ها را به کانتینرهای سوکت متصل می‌کند."
        },
        protocol: "H2 WS Proxying (End-to-End TLS Termination)",
        reason: {
          en: "Proxying WebSockets over HTTP/2 handles millions of connections cleanly with a minimal port overhead on active cloud endpoints.",
          fa: "هدایت اتصالات وب‌سوکت بر پهنای اینترنت HTTP/2 که هدررفت پورت و حافظه را در زمان اتصالات همزمان میلیونی خنثی می‌سازد."
        },
        payload: JSON.stringify({
          ingressSocketCount: 142000,
          webSocketFlags: { FIN: 1, OPCODE: 1, MASK: 1 },
          sslSessionId: "ssl_session_couch_3a4e9b...",
          routeTarget: "couchini-ws-workers-pool"
        }, null, 2),
        challenge: {
          en: "Holding active WebSocket connections eats memory. We optimize Linux kernel TCP buffer properties, lowering read/write memory allocations from 16KB to 4KB per socket. This allows us to serve 3x more concurrent users on identical container builds.",
          fa: "نگهداری اتصالات مستمر وب‌سوکت رم سرور را تصرف می‌کند؛ ما با بازنویسی کرنل لینوکس، بافر سوکت‌های تخصیص‌یافته را از ۱۶ کیلوبایت به ۴ کیلوبایت کاهش دادیم تا با همان منابع سخت‌افزاری، ظرفیت اتصال را ۳ برابر کنیم."
        },
        systemLogs: [
          "[GATEWAY] Received WebSocket data frame from client IP 192.168.12.54",
          "[GATEWAY] Validated SSL session token matching active premium channel",
          "[GATEWAY] Multi-plexed WebSocket stream routed immediately to cluster container instance 14"
        ],
        activeNodes: ["gateway", "broker"]
      },
      {
        title: { en: "3. BROKER: Redis Pub-Sub Global Event Distribution", fa: "۳. واسطه: هماهنگ‌سازی خوشه‌ها در ردیس Pub-Sub" },
        desc: {
          en: "When an audio action hits WebSocket instance 'A', users in that same room connected to other servers in the cluster must receive it instantly. Redis Pub/Sub acts as a microsecond broadcaster, syncing room events globally across the cluster.",
          fa: "وقتی رخداد موسیقی به وب‌سوکت شعبه ۱ می‌رسد، سایر اعضای پیوسته به روم در سرورهای دیگر باید فوراً باخبر شوند. شبکه ردیس Pub-Sub در میکروثانیه سیگنال را بین تمام خوشه‌های زنده تکثیر می‌کند."
        },
        protocol: "RESP (Redis PUBLISH Command)",
        reason: {
          en: "Redis Pub/Sub has sub-millisecond propagation latency because it bypasses slow local memory allocation bounds and does not store the messages.",
          fa: "پیام Pub-Sub ردیس نیازی به ثبت طولانی فوت و فن‌های دیسک ندارد و مستقیما در داخل رم خوشه‌ها را از وقوع رویداد همگام باخبر می‌کند."
        },
        payload: JSON.stringify({
          redisChannel: "pubsub:room:couchini_room_942",
          messageType: "SYNC_PLAYBACK_OFFSET",
          activeSubscribersCount: 4,
          hostOriginServer: "ws-instance-04",
          lockTTL: "2000ms"
        }, null, 2),
        challenge: {
          en: "Simultaneous stream commands can cause race conditions. We implement lightweight, distributed locks in Redis with a strict 2-second timeout (TTL). This forces the room to coordinate state changes sequentially, eliminating client synchronization loops.",
          fa: "دستورات همزمان ممکن است دیتای اتاق را خراب سازند؛ با استقرار مکانیسم قفل‌های توزیع‌شده با طول عمر کوتاه ۲ ثانیه‌ای در ردیس، کلاینت‌ها را وادار می‌سازیم به ترتیب زمانی عمل کنند تا لوپ نامتناهی رخ ندهد."
        },
        systemLogs: [
          "[BROKER] Received room event from container instance 14",
          "[REDIS] Lock acquired successfully for key 'lock:room:942' (TTL = 2000ms)",
          "[REDIS] PUBLISH event 'ROOM_TRACK_SEEK' to channel 'pubsub:room:couchini_room_942' with 4 receivers"
        ],
        activeNodes: ["broker", "worker"]
      },
      {
        title: { en: "4. WORKER: Audio Slice Encryption & S3 Pool Delivery", fa: "۴. پردازشگر: توزیع ایمن و رمزگذاری قطعه‌های موسیقی" },
        desc: {
          en: "The WebSocket workers receive the broadcast and pull the music details. To prevent audio theft or illegal downloads, track chunks are cryptographically signed, sliced into 128KB portions, and delivered on-demand from secure cloud buckets.",
          fa: "پردازنده‌های وب‌سوکت فرمان پخش تفصیلی را دریافت می‌کنند. برای صیانت از حقوق امضای اثر موزیک‌ها، فایل صوتی به قطعات ۱۲۸ کیلوبایتی با استانداردهای رمزنگاری ایمن تقسیم و از سطل‌های ابری فراخوانی می‌شود."
        },
        protocol: "HTTPS (SECURE AES-256 Symmetric Stream Encryption)",
        reason: {
          en: "Protects audio streams from external interception or piracy by enforcing robust encryption directly on the cloud storage path.",
          fa: "محافظت حداکثری از دیتای صوتی در مقابل هرگونه دانلود غیرمجاز با اعمال رمزنگاری متقارن AES-256 در حین بارگذاری سریع."
        },
        payload: JSON.stringify({
          trackId: "track_couch_blues204",
          requestedChunkIndex: 24,
          chunkKeyHash: "sha256_b3a4c5e...",
          cipherBlockChaining: "AES-256-CTR",
          decryptionKeyId: "key_couchini_051283"
        }, null, 2),
        challenge: {
          en: "Fetching large audio files repeatedly creates huge cloud network bills. We designed a 'Write-Through' cache pattern. Common songs and current hot-list audio segments are pre-heated directly in memory storage pools, cutting bucket fetch operations costs by 82%.",
          fa: "فراخوانی پیاپی فایل‌های صوتی سنگین، هزینه گزاف زیرساخت ابری تولید می‌کند. با ابداع الگوی پیش‌گرمایش کش، آهنگ‌های پرطرفدار را در بافر اشتراکی رم نگه می‌داریم تا هزینه‌های دیسک کلاود را ۸۲٪ کاهش دهیم."
        },
        systemLogs: [
          "[WORKER-WS] Received Redis Pub-Sub channel broadcast event data",
          "[CACHE] Cache hit on memory segment buffer for track_couch_blues204_chunk_24",
          "[WORKER] Sign cryptographic AES decryption packet frames key",
          "[NET] Multi-cast dispatching synchronized seek status frame to 4 socket recipients"
        ],
        activeNodes: ["worker", "client"]
      },
      {
        title: { en: "5. CLIENT: Jitter-Compensated Sound Render", fa: "۵. کلاینت: رفع نوسان پخش و رندر سخت‌افزاری" },
        desc: {
          en: "The listening clients receive the sync frames along with the encrypted 128KB media chunks. Flutter uses localized native media streams to perform on-the-fly hardware decryption, and applies a dynamic delay drift compensation algorithm to match the host.",
          fa: "کاربران دریافت‌کننده، پکت هماهنگ را به عنوان بایت رمز دریافت می‌نمایند. در پس زمینه فلاتر، رمزگشای سخت‌افزاری بومی به کار افتاده و با سنجش تاخیر پینگ فرد، سرعت آهنگ را نیم‌ثانیه کوک می‌کند تا صدای همگان دقیقاً در یک صدم ثانیه بپیچد."
        },
        protocol: "Local Hardware Decoding Buffer (Exposured Native isolate)",
        reason: {
          en: "Decrypting and decoding high-fidelity audio streams in native C++ libraries prevents high Garbage Collector workload peaks inside Flutter's main rendering frames.",
          fa: "اجرای فرآیند رمزگشایی و فرکانس صوتی در کتابخانه‌های سریع سیستم‌عامل برای ممانعت از ایجاد فشار محاسباتی بر موتور گرافیک رابط کاربری."
        },
        payload: JSON.stringify({
          networkJitterMs: 14.2,
          clientDriftOffsetSeconds: 0.004,
          jitterAdjustmentAction: "PITCH_STRETCH_0.01%",
          hardwareDecoderStatus: "ACTIVE_METAL_DECODE_OPENSL"
        }, null, 2),
        challenge: {
          en: "If a user has an unstable 3G connection with alternating latency (jitter), normal players would stutter or freeze. Couchini resolves this by adjusting the audio sampling frequency dynamically by less than 0.1%. Users sync perfectly with the room without sound interruption.",
          fa: "در صورت وجود اینترنت متزلزل، پخش معمولی آهنگ متوقف می‌شود؛ کوچینی با تغییر فرکانس پخش صوتی کلاینت به میزان ناچیز کمتر از ۰.۱ درصد، بدون افت کیفیت، آهنگ را دوباره با هاست هماهنگ می‌کند."
        },
        systemLogs: [
          "[CLIENT] Received WS room seek action frame from gateway channel source-14",
          "[CLIENT-HEARTBEAT] Net delay measured: 14.2ms, sound drift calculated: 4ms",
          "[CLIENT] Core decoders loaded cryptographically AES-256 binary segment",
          "[CLIENT] Executed micro-pitch audio stretch algorithm target matching complete",
          "[CLIENT] High-fidelity playback matched room state and running synced successfully"
        ],
        activeNodes: ["client", "client"]
      }
    ]
  },
  tipax: {
    projectName: { en: "Tipax Logistics (UDP GIS Tracker)", fa: "تیپاکس (تل‌متری موقعیت رانندگان)" },
    steps: [
      {
        title: { en: "1. CLIENT: Send Binary GPS Coordination UDP Ping", fa: "۱. کلاینت: مخابره باینری موقعیت مرسوله با UDP" },
        desc: {
          en: "Mobile driver devices send spatial geofencing tracking updates every 2 seconds. Because standard HTTP request payloads can consume massive data bandwidth and cellular power consumption, we design a lightweight 32-byte binary UDP format on-device.",
          fa: "تلفن‌های همراه رانندگان فواصل موقعیت یابی را هر ۲ ثانیه آپلود می‌نمایند. از آنجا که پکت‌های حجیم HTTP شارژ باتری و پهنای باند گران‌قیمتی مصرف می‌کنند، یک فرمت ۳۲ بایتی فشرده بی باینری روی UDP ایجاد گردید."
        },
        protocol: "UDP (User Datagram Protocol over raw socket)",
        reason: {
          en: "UDP removes connection state overhead and TLS-auth handshakes, keeping driver telemetry updates extremely compact and instantaneous.",
          fa: "پروتکلی یکطرفه و بدون نیاز به تایید پینگ یا هدرهای دست‌وپاگیر مرورگر، با کاهش مصرف دیتای رانندگان تا ۷۸ درصد."
        },
        payload: JSON.stringify({
          raw_hex_packet: "0x0B2D2F1FA532BE02C...",
          decoded_mapping: {
            driver_token_id: 12049,
            lat: 35.72412,
            lng: 51.33421,
            speed_kmh: 42.5,
            direction_degrees: 182
          }
        }, null, 2),
        challenge: {
          en: "A critical challenge under erratic internet connections is driver coordinates jumping or lagging. In the Flutter system backend coordinates calculations, the app integrates spatial Kalman filter algorithms directly on-device to filter noise on GPS chips.",
          fa: "یکی از چالش‌های بزرگ لجستیک انحراف مختصات به دلیل پرش آنتن است؛ ما الگوریتم‌های فیلتر کالمن را روی دستگاه جاسازی کرده‌ایم تا لرزش جی‌پی‌اس موبایل رانندگان را پیش از پرتاب به سرورها اصلاح و فیلتر کند."
        },
        systemLogs: [
          "[CLIENT-MOBILE] GPS coordinates computed from cellular tower index: 35.72412, 51.33421",
          "[CLIENT] Initializing Kalman filter to smooth coordinate vector",
          "[CLIENT] Encoded geography values into 32-byte packed binary format",
          "[NET] Emitted compact raw UDP socket package to logistics target gateway endpoint"
        ],
        activeNodes: ["client", "gateway"]
      },
      {
        title: { en: "2. GATEWAY: Direct Kernel UDP Port Buffering Ingress", fa: "۲. دروازه: دریافت کم‌مصرف پکت مکانی در سوکت لینوکس" },
        desc: {
          en: "A robust custom UDP Gateway listens directly to incoming UDP traffic, utilizing Linux kernel's high-performance native 'epoll' event loop triggers to avoid connection state management bottleneck queues.",
          fa: "یک دروازه سفارشی و پرسرعت UDP مستقیماً ترافیک ورودی را دریافت می‌کند. این برنامه با استفاده از مفسر هسته لینوکس (epoll) از گیرگاه صف و مدیریت دست در دست اتصالات غافل می‌شود."
        },
        protocol: "UDP Port Ingress (Direct Socket Epoll bindings)",
        reason: {
          en: "Enables thousands of incoming telemetry packets to compile and resolve in parallel with under 1ms network queue delays.",
          fa: "امکانی پرقدرت که اجازه می‌دهد تا هزاران پکت در ثانیه به موازات هم بدون تلف کردن وقت برای مدیریت راننده ثبت شوند."
        },
        payload: JSON.stringify({
          activeInboundUDPListeners: 12000,
          portBound: 8888,
          received_packet_bytes: 32,
          gateway_receiver_instance: "geo_gate_worker_01",
          checksum_verification: "VALID_MATCH_0x5C9B3A"
        }, null, 2),
        challenge: {
          en: "Unlike TCP, UDP packets can get dropped or land out of sequence. Our UDP gateway appends a sequence index and checksum to each frame, cross-referencing values at the ingress layer to reconstruct route coordinate lines securely.",
          fa: "پکت‌های UDP ممکن است به ترتیب نرسند؛ دروازه با بررسی پکسل‌های شماره‌گذاری شده در هر ورودی، اصالت بسته را اعتبار‌سنجی کرده و پس از مرتب‌سازی، آن‌ها را به سمت خط لوله هدایت می‌نماید."
        },
        systemLogs: [
          "[GATEWAY] Incoming UDP bundle size 32 bytes from IP 185.12.5.3",
          "[GATEWAY] Binary decoding validated checksum status = matched",
          "[GATEWAY] Resolved driver tracker record id = 12049",
          "[GATEWAY] Streaming raw geographic event node details to event broker dispatcher queue"
        ],
        activeNodes: ["gateway", "broker"]
      },
      {
        title: { en: "3. BROKER: Resilient AMQP RabbitMQ Pipelines Queueing", fa: "۳. واسطه: مدیریت صف پیام‌های جغرافیایی با RabbitMQ" },
        desc: {
          en: "For enterprise logistics pipelines, losing location pings means lost tracking accuracy. The gateway pipes the coordinates payload instantly to RabbitMQ, dividing the streams safely into parallel execution buckets.",
          fa: "در صنعت لجستیک، مفقود شدن حتی یک لوکیشن به معنای اخلال در تخمین زمان بارکد کالا است. دروازه فورا موارد دریافتی را به بازوهای موازی RabbitMQ ارسال می‌کند تا کارهای در صف به دقت نگهداشته شوند."
        },
        protocol: "AMQP (Advanced Message Queuing Protocol over TCP)",
        reason: {
          en: "AMQP guarantees complete transactional messaging state persistence, preventing telemetry gaps even if core servers go down under heavy traffic load.",
          fa: "سیستم صف‌بندی AMQP متضمن ذخیره‌سازی و پایداری تسک است به طوری که حتی اگر کانتینر در ترافیک سنگین متوقف شود، رکوردهای لجستیک حفظ خواهند شد."
        },
        payload: JSON.stringify({
          brokerEngine: "RabbitMQ Cluster v3.12",
          virtualHost: "logistics_tipax",
          routingKey: "geo.driver.location",
          targetQueuedMessages: 1420,
          channelPrefetchLimit: 500
        }, null, 2),
        challenge: {
          en: "Under high peak hours, database operations are heavily bottlenecked by simultaneous writes. Using RabbitMQ, we decouple active writes! The database updates are computed downstream at a throttled, linear rate, preserving SQL performance.",
          fa: "به کارگیری سیستم صف RabbitMQ سبب می‌شود به جای هجوم همزمان هزاران راننده برای انجام عملیات نوشتن دیتابیس، این تسک‌ها با آرامش و به صورت منظم در صف لود شده و ثبت شوند تا دیتابیس خاموش نشود."
        },
        systemLogs: [
          "[BROKER] Routing key matches queue target 'driver_location_processing_pool'",
          "[BROKER] Pushed coordinate packet task item to resilient RabbitMQ cluster replica node",
          "[BROKER] Verified queue acknowledgement index ID = 880241"
        ],
        activeNodes: ["broker", "worker"]
      },
      {
        title: { en: "4. WORKER: Fast Geofence & Traveling Salesman Resolution", fa: "۴. پردازشگر: روتینگ بهینه با هوش مصنوعی و حل الگوی TSP" },
        desc: {
          en: "The python worker swarm consumes tracking messages. It calculates boundary metrics to trigger geofence alerts, and calculates the optimal next-visit customer chain via Traveling Salesman Problem (TSP) solvers.",
          fa: "خوشه عظیمی از پردازنده‌های FastAPI کار را از صف گرفته، وضعیت تلاقی جغرافیایی راننده (ژئوفنس) را برآورد ساخته و به کمک الگوریتم‌های ریاضی TSP، کوتاهترین مسیر ملاقات با مشتریان بعدی را مجاب می‌سازند."
        },
        protocol: "gRPC over HTTP/2 (Parallel Microservice Dispatch)",
        reason: {
          en: "Minimizes inner cluster communications delay, enabling workers to trigger geofence push notifications under 20ms.",
          fa: "بهینه‌سازی حداکثری ارتباط داخلی شبکه به طوری که وضعیت ورود راننده به محدوده ممنوعه یا انبار مقصد در کوتاه‌تر از ۲۰ میلی‌ثانیه مشخص گردد."
        },
        payload: JSON.stringify({
          activeWorkers: 18,
          solverAlgorithm: "Heuristic_TSP_OrTools_C++",
          geofenceZonesEvaluated: ["Tehran_Zone_Central", "Restricted_District_03"],
          tspOutputRouteIndex: [104, 204, 302, 108],
          distanceSavedMeters: 8420
        }, null, 2),
        challenge: {
          en: "Finding optimal routing priorities under changing city-wide traffic parameters is CPU-hungry. Our workers offload calculations to robust C++ libraries and use multi-threading models, allowing us to compute 500 delivery routes per second without system lag.",
          fa: "محاسبه مسیر بهینه در لجستیک پردازش بالایی مصرف می‌کند؛ با ارجاع فرآیند به کدهای C++ و توسعه چندرشته‌ای موازی، توانسته‌ایم تا ۵۰۰ مسیر پویا را در ثانیه بدون معطلی به رانندگان تحویل دهیم."
        },
        systemLogs: [
          "[WORKER-12] Claimed coordinate package payload from RabbitMQ consumer channel",
          "[WORKER-12] Triggering zone checker logic target Milad Tower sector",
          "[WORKER-12] Alarm fired: Driver 12049 entered Zone_Central geofenced quadrant",
          "[SOLVER-TSP] Evaluated C++ routing solver constraints in 4.2ms: optimized chain computed"
        ],
        activeNodes: ["worker", "database"]
      },
      {
        title: { en: "5. DATABASE: PostGIS Spatial Shards Persistence", fa: "۵. بانک داده: ذخیره‌سازی موقعیت مکانی با جغرافیای PostGIS" },
        desc: {
          en: "The calculated telemetry vectors, route logs, and zone compliance indicators are committed to PostgreSQL. Because standard relational tables cannot coordinate radial geographic queries efficiently, PostgreSQL combines the spatial extensions of PostGIS.",
          fa: "داده‌های جغرافیایی، تاریخچه حرکت و هشدارهای ژئوفنس به شکل یک تراکنش به دیتابیس هدایت می‌شوند. دیتابیس پستگرس با افزونه‌های قدرتمند مکانی PostGIS راندمان کار را چندین برابر می‌سازد."
        },
        protocol: "PostgreSQL Native Transaction Pool Protocol",
        reason: {
          en: "Provides spatial GIST indexing on geography coordinates, allowing sub-10ms boundary intersections queries across millions of rows.",
          fa: "استفاده از سیستم مدرن شاخص‌های GIST جغرافیایی که زمان پردازش تلاقی مختصات راننده با دایره‌های آدرس مشتریان را به زیر ۱۰ میلی‌ثانیه می‌رساند."
        },
        payload: JSON.stringify({
          databaseSchema: "postgres_postgis_geodb",
          upsertQuery: "UPDATE driver_status SET current_location = ST_GeomFromText('POINT(35.72412 51.33421)', 4326)",
          spatialIndexActive: "idx_driver_gist_geom_location",
          queryLatencySeconds: 0.0012
        }, null, 2),
        challenge: {
          en: "To protect the database master repository from read-heavy geofence tracking queries, we structure a Master-Replica cluster database layout. Coordinates status queries read from multiple replicas, keeping Master free to handle transaction locks.",
          fa: "برای محافظت از بانک‌داده اصلی در مقابل کوئری‌های نقشه‌ای انبوه، از معماری Master-Replica استفاده گردید؛ کوئری مشتریان روی سرور‌های فرعی (Replica) پاسخ داده می‌شود تا هسته اصلی فقط پذیرای نوشتن باشد."
        },
        systemLogs: [
          "[DB] Acquiring PostgreSQL Connection via active pg_bouncer thread gateway pool",
          "[DB] Executing geographic upsert query update current coordinates for 'driver_12049'",
          "[DB] PostGIS GIST spatial index hit: 3 polygons intersections evaluated dynamically",
          "[DB] Syncing write transaction coordinates logs to replicate nodes in 5 micro-seconds",
          "[NET] Dispatching updated tracking markers and progress stats payload to corporate supervisor panels"
        ],
        activeNodes: ["database", "client"]
      }
    ]
  },
  hyperstar: {
    projectName: { en: "Hyperstar Hub (ACID Inventory Ledger)", fa: "هایپر استار (دفتر انبارداری تراکنشی)" },
    steps: [
      {
        title: { en: "1. CLIENT: POS Barcode Scan Register", fa: "۱. کلاینت: اسکن قلم کالا در پوز فروشگاهی" },
        desc: {
          en: "When a cashier processes an item purchase, the system terminal streams bulk SKU levels. To avoid data loss and concurrent item balance drift, the client initiates a secure transactions payload to ledger nodes.",
          fa: "هنگام اسکن بارکد در گیشه فروشگاه با سقف بالا، ترمینال گیشه سفارشات انبوهی صادر می‌کند. برای پیشگیری از ناهماهنگی در تعداد کالا، تراکنش مالی مستقیما به گره‌های پردازش ایمن پرتاب می‌گردد."
        },
        protocol: "REST API (HTTP/1.1 over HTTPS TLS 1.3)",
        reason: {
          en: "Ensures maximum compatibility with legacy enterprise cash register hardware and validates secure credentials directly.",
          fa: "بالاترین سازگاری با سیستم‌های قدیمی‌تر پوز به همراه رمزنگاری دقیق گواهی ایمنی شعبه."
        },
        payload: JSON.stringify({
          branchId: "branch_west_tehran",
          registerTerminalId: "pos_terminal_041",
          inboundItemSku: "prod_butter_brand_81024",
          itemQuantity: 2,
          epochTime: 1779713803200
        }, null, 2),
        challenge: {
          en: "In huge hypermarkets with thousands of cashiers, single item transactions can easily block inventory rows. By engineering a non-blocking queueing gateway, cash registers stream payments seamlessly and retrieve real-time data under 50ms.",
          fa: "در فروشگاه‌های بزرگ، فروش همزمان کالاهای محدود می‌تواند دیتابیس را قفل کند؛ ما با ایجاد بافر‌های ذخیره‌سازی، به گیشه‌ها اجازه می‌دهیم بدون لحظه‌ای معطلی تا تایید نهایی، به کار خود با سرعت ۵۰ میلی‌ثانیه ادامه دهند."
        },
        systemLogs: [
          "[CLIENT] POS cash drawer terminal detected scanner barcode read = 'prod_butter_brand_81024'",
          "[CLIENT] Validating session key for active cashier user 'reg_operator_18'",
          "[CLIENT] Assembled POST transaction payload: total bytes 142",
          "[NET] Sent invoice item record packet to hyperstar web gateway"
        ],
        activeNodes: ["client", "gateway"]
      },
      {
        title: { en: "2. GATEWAY: Scalable Ingress Load Balancing", fa: "۲. دروازه: توزیع ترافیک در انبار پهناور ابری" },
        desc: {
          en: "The Application Load Balancer (ALB) inspects checkout traffic levels, terminating public SSL/TLS bounds globally and routing transactions across optimal server instances in different zones to eliminate outages.",
          fa: "لود بالانسر ابری بار بالای تراکنش‌های کل شعب کشور را دریافت کرده، گواهی امنیتی پروتکل را واکاوی نموده و تسک‌ها را بین سرورها توزیع می‌کند تا اخلالی در خرید حضوری پیش نیاید."
        },
        protocol: "HTTP/1.1 HTTPS TLS1.3 (AWS Application Load Balancer)",
        reason: {
          en: "ALB performs high-speed layer-7 content routing, verifying JWT payloads and routing paths to safeguard target backend components.",
          fa: "مسیریابی کدهای هِدر در لایه هفت شبکه که بازوهای مناسب برای کنترل هر تراکنش شعبه را بدون فوت وقت شناسایی می‌نماید."
        },
        payload: JSON.stringify({
          activeConnections: 45000,
          sslSessionHash: "0xFC9A38BE",
          targetContainerGroup: "tg-fastapi-ledger-nodes",
          ingressLatencyMs: 2.1
        }, null, 2),
        challenge: {
          en: "If one cloud server region acts sluggish, checkouts would freeze. The gateway monitors active server health metrics, immediately detaching slow nodes and routing inventory writes to active containers, achieving 99.99% availability.",
          fa: "کاهش راندمان حتی یک سرور می‌تواند صف صندوق‌ها را طویل سازد؛ دروازه به طور مداوم سلامت گره‌ها را با پایش پینگ چک می‌کند و در صورت کندی هر گره، ترافیک را فوراً به کانتینرهای سالم منتقل می‌کند."
        },
        systemLogs: [
          "[GATEWAY] Received SSL/TLS encrypted payload on Port 443",
          "[GATEWAY] Completed TLS termination on cloud edge in 2.1ms",
          "[GATEWAY] Routing verified branch traffic block to internal scale group container 'fastapi-node-04'"
        ],
        activeNodes: ["gateway", "broker"]
      },
      {
        title: { en: "3. BROKER: Redis Memory Caching & Check De-duplication", fa: "۳. واسطه: بافر کش ردیس برای مهار تصادم تراکشن‌ها" },
        desc: {
          en: "Under maximum checkouts pressure, duplicate network packets can double-charge clients or decrement stock inaccurately. The backend server leverages an-memory Redis cache to perform sub-millisecond transaction de-duplication checks.",
          fa: "در زمان ترافیک انبوه، کلیک دوبار یا کدهای ارسالی کثیف ممکن است کالا را مجدداً از انبار کسر کنند؛ سرور با تکیه بر سرعت کم‌نظیر کش ردیس، از تکراری نبودن تراکنش در ثانیه مطمئن می‌شود."
        },
        protocol: "RESP (Redis in-memory cache operations)",
        reason: {
          en: "Fast memory caching is essential. Reading inventory figures or holding transactional mutexes on disk-based storage would lock columns and freeze checkout portals.",
          fa: "درون‌حافظه‌ا‌ی بودن ردیس مانع تاخیر خواندن دیسک است؛ چرا که قفل موقت رکوردها روی دیسک معمولی منجر به ایست کامل گیشه‌های فروشگاه می‌شود."
        },
        payload: JSON.stringify({
          cacheLookupKey: "tx_lock:invoice_tx_2a4d9e0f3",
          existingCacheStatus: "DEDUPLICATED_NOT_EXISTS",
          setMutexStatus: "ACQUIRED_LOCK_500ms",
          cachedProductStockSKU: 1284
        }, null, 2),
        challenge: {
          en: "Double-allocation or stock race conditions occur when two cashiers update the same item SKU in the same millisecond. We establish memory-level mutex locks in Redis (TTL = 1 second) to ensure transactions parse sequentially with zero math errors.",
          fa: "وقوع فروشهای همزمان میلی‌ثانیه‌ای کاندیدای اخلال تراز مالی کالاها است؛ ما قفل‌های انحصاری موقت (Mutex) یک ثانیه‌ای در ردیس را فعال کردیم تا موازنه موجودی انبارها عاری از هرگونه خطای ریاضی ثبت شوند."
        },
        systemLogs: [
          "[BROKER] Querying Redis for unique request transaction lock: 'tx_lock:invoice_tx_2a4d9e0f3'",
          "[REDIS] Lock acquisition status = OK (No previous identical transaction seen in last 1 hour, packet deduplication successful)",
          "[REDIS] Fetching current memory cached inventory volume for SKU 81024: value is 1284"
        ],
        activeNodes: ["broker", "worker"]
      },
      {
        title: { en: "4. WORKER: FastAPI ACID Ledger State Balancing", fa: "۴. پردازشگر: هدایت تراکنش انبارداری با FastAPI" },
        desc: {
          en: "The FastAPI backend core executes the business rules. It decodes the transaction parameters, validates structural branch inventories, and issues replenishment triggers if the stocking is running low.",
          fa: "هسته سریع پردازشی با کمک FastAPI اصالت خرید شعبه را ارزیابی کرده، تعداد فروخته شده کالا را کسر می‌سازد و در صورت لزوم، اخطار تامین مجدد کالا را برای انبار مرکزی ثبت می‌کند."
        },
        protocol: "HTTP/1.1 (Internal Cluster Async Swarm Pipelines)",
        reason: {
          en: "FastAPI utilises async uvloop components, providing the execution capabilities of Node.js combined with strict Python object typing.",
          fa: "فریم‌ورک ناهمگام FastAPI از بسترهای پرسرعت سوکت لینوکس (uvloop) استفاده می‌نماید تا بالاترین بازدهی را موازات مدیریت منابع تضمین کند."
        },
        payload: JSON.stringify({
          activeComputeNodesCount: 12,
          currentInventoryStatus: "REDUCING_STOCK_VOLUME",
          warehouseDispatchId: "wh_central_karaj",
          minimumStockThresholdLimit: 100,
          currentStockRemaining: 1282,
          triggerAutosupplyAlarm: false
        }, null, 2),
        challenge: {
          en: "Performing inventory reductions during seasonal sales hours triggers lock waits. Our worker structures queueing pipelines using Celery in background threads, so database tables are spared from instant spikes, minimizing bottlenecks.",
          fa: "فروش پرحجم کالاها در حراج فصلی، تراکنش‌های طولانی ایجاد می‌کند؛ پردازنده‌ها با استفاده از صف تسک‌ها به روش Celery، فشار ذخیره‌سازی را در پس‌زمینه هموار ساخته و کارهای سنگین را متعادل می‌نمایند."
        },
        systemLogs: [
          "[WORKER] Claimed transaction job from gateway bundle channel",
          "[WORKER] Deducting SKU product 81024 quantity balance: 1284 -> 1282",
          "[WORKER-LOGGER] Target branch inventory level limits validated within safety index threshold"
        ],
        activeNodes: ["worker", "database"]
      },
      {
        title: { en: "5. DATABASE: Postgres Exclusive Ledger Lock Commits", fa: "۵. بانک داده: تراکنش اتمیک و لایه بندی Postgres" },
        desc: {
          en: "The inventory ledger reduction is committed inside PostgreSQL. Standard database queries would risk inconsistencies during heavy parallel checkouts, but PostgreSQL leverages deep ACID table locks to safeguard integrity.",
          fa: "تغییر ماندگار موجودی کالا در دیتابیس پستگرس ذخیره می‌گردد؛ با اتخاذ معماری چندلایه‌ای دیتابیس، موازنه انبار از هرگونه تداخل موازی در امان است."
        },
        protocol: "PostgreSQL Production Connection Pool",
        reason: {
          en: "Guarantees strict row locks (SELECT FOR UPDATE) to ensure database writes execute atomically on the master node without catalog drift.",
          fa: "اعمال قفل‌های انحصاری روی ردیف کالای هدف تا دیتابیس تراکنش را به شیوه اتمیک ثبت کرده و از تغییر ناآگاهانه موجودی ممانعت کند."
        },
        payload: JSON.stringify({
          databaseWriteStatus: "WRITE_SUCCESS_COMMITTED_ACID",
          lockingStrategy: "MUTEX_EXCLUSIVE_ROW_LOCK",
          updatedProductSKU: 81024,
          replicationLatencyMs: 0.005,
          activeSQLConnectionBypass: "pg_bouncer_active_client"
        }, null, 2),
        challenge: {
          en: "To maintain sub-12ms query latencies under millions of daily sales, we set up PostgreSQL Master-Replica clusters and connection pool multiplexing via pg_bouncer. This keeps transactional master nodes free of read latency overhead.",
          fa: "جهت مهار تراکم میلیونی و ثبت رکوردها زیر ۱۲ میلی‌ثانیه، خوشه پستگرس را به شکل تفکیک‌شده Master-Replica تنظیم کردیم. ترافیک‌های سنگین کزارشی به شعبه‌های فرعی هدایت شده تا سرور اصلی تحت فشار کوری خسته نشود."
        },
        systemLogs: [
          "[DB] Executing transaction write: UPDATE inventory_ledger SET quantity = 1282 WHERE sku = 81024",
          "[DB] PostgreSQL exclusive row locks verified 'idx_sku_ledger_81024'",
          "[DB] Transaction safely committed matching ACID standards",
          "[DB] Replicating updated invoice data status values to read replicas in 5 micro-seconds",
          "[CLIENT] Received 200 OK update: POS checkout screen registers success"
        ],
        activeNodes: ["database", "client"]
      }
    ]
  }
};
