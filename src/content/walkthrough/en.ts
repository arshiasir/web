export default {
  "calkilo": {
    "projectName": "Calkilo AI (Nutrition Cam)",
    "steps": [
      {
        "title": "1. CLIENT: Compress & Upload Image",
        "desc": "The Flutter mobile app captures a meal photo. High-resolution images are too slow to transmit over active cellular networks, so the on-device engine compresses it into an optimized buffer.",
        "reason": "HTTP/2 multiplexes streams over a single TCP connection, reducing head-of-line blocking and accelerating image payload delivery.",
        "challenge": "Flutter handles camera stream frames dynamically inside a Dart Isolate thread. This prevents CPU stuttering, ensuring the UI stays butter-smooth at a locked 120Hz while the compression and network buffers run concurrently."
      },
      {
        "title": "2. GATEWAY: Rate Limiting & Auth Validation",
        "desc": "The Kong API Gateway receives the secure stream, evaluates the user's JWT cryptographic signature, and checks IP-based rate limiting metrics to ensure security constraints are fully met.",
        "reason": "Ensures complete data integrity and prevents sniffing of sensitive personal nutrition and health data on public networks.",
        "challenge": "Rather than hitting the core relational database to validate every incoming request's access level, the gateway checks an in-memory Redis token whitelist, dodging a massive SQL queries bottleneck on high traffic scales."
      },
      {
        "title": "3. BROKER: Asynchronous Event Queueing",
        "desc": "Because computer vision inference on GPU farms can take several hundred milliseconds, holding the client's HTTP connection open creates thread starvation on web servers. We queue the analysis job in a high-speed Redis Stream and immediately return a positive receipt status code.",
        "reason": "Extremely low-overhead, in-memory protocol designed for throughputs exceeding 100,000 commands/sec.",
        "challenge": "We implement an Event-Driven architecture here. By returning an instant '202 Accepted' status code, the Flutter client can unlock its busy states. Flutter then opens a lightweight WebSocket connection to await notification of the model's output in real-time."
      },
      {
        "title": "4. WORKER: Model Inference Execution",
        "desc": "A concurrent Python worker cluster retrieves the job from the Redis Stream, downloads the compressed image via local internal pipelines, and feeds the normalized pixel tensor to a custom YOLOv8 model optimized using the C++ ONNX runtime.",
        "reason": "gRPC uses binary protocol buffers instead of text-based JSON, cutting data serialisation overhead by up to 90% and speeding up GPU clusters communications.",
        "challenge": "To maximize GPU hardware efficiency, workers utilize an elastic memory pool that stacks frames into dynamic mini-batches. This prevents memory leaks on the C++ layer and increases the system's inference capacity by 350% during peak lunch hour usage."
      },
      {
        "title": "5. DATABASE: pg_vector Embedding Storage",
        "desc": "The classification metrics, nutritional totals, and raw tensor coordinate arrays are mapped to a Postgres SQL transaction. Concurrently, the meal attributes are converted into a mathematical embedding vector and stored in pg_vector sharded indices.",
        "reason": "Provides atomic database operations (ACID) to ensure nutrition history logs are never corrupted, partially written, or mismatched with the user profile indices.",
        "challenge": "By storing meal characteristics as vectors, subsequent users who upload similar food photos bypass the expensive GPU inference step completely! The system executes an cosine-similarity search in pg_vector under 5ms, fetching cached nutrient records instantly."
      }
    ]
  },
  "couchini": {
    "projectName": "Couchini Music (Sync Audio)",
    "steps": [
      {
        "title": "1. CLIENT: Dispatch Audio Sync Frame",
        "desc": "When the host audio owner pauses, seeks, or navigates in a music room, the Flutter terminal client emits an ultra-lightweight sync event specifying the exact playback seek microsecond and the room parameters.",
        "reason": "WebSockets eliminate standard HTTP handshake latency by holding a persistent, bidirectionally open, low-latency TCP communication queue.",
        "challenge": "Interactive music party rooms require absolute zero-jitter UI responsiveness. Flutter manages the state tree reactivity globally with Riverpod and performs frame-synced audio rendering loop callbacks without skipping on-device graphics."
      },
      {
        "title": "2. GATEWAY: WebSocket Connection Multi-plexing",
        "desc": "An optimized Nginx Reverse Proxy handles hundreds of thousands of concurrent WebSocket connections, performing SSL/TLS decryption on the ingress edge before piping raw frames locally to internal socket aggregates.",
        "reason": "Proxying WebSockets over HTTP/2 handles millions of connections cleanly with a minimal port overhead on active cloud endpoints.",
        "challenge": "Holding active WebSocket connections eats memory. We optimize Linux kernel TCP buffer properties, lowering read/write memory allocations from 16KB to 4KB per socket. This allows us to serve 3x more concurrent users on identical container builds."
      },
      {
        "title": "3. BROKER: Redis Pub-Sub Global Event Distribution",
        "desc": "When an audio action hits WebSocket instance 'A', users in that same room connected to other servers in the cluster must receive it instantly. Redis Pub/Sub acts as a microsecond broadcaster, syncing room events globally across the cluster.",
        "reason": "Redis Pub/Sub has sub-millisecond propagation latency because it bypasses slow local memory allocation bounds and does not store the messages.",
        "challenge": "Simultaneous stream commands can cause race conditions. We implement lightweight, distributed locks in Redis with a strict 2-second timeout (TTL). This forces the room to coordinate state changes sequentially, eliminating client synchronization loops."
      },
      {
        "title": "4. WORKER: Audio Slice Encryption & S3 Pool Delivery",
        "desc": "The WebSocket workers receive the broadcast and pull the music details. To prevent audio theft or illegal downloads, track chunks are cryptographically signed, sliced into 128KB portions, and delivered on-demand from secure cloud buckets.",
        "reason": "Protects audio streams from external interception or piracy by enforcing robust encryption directly on the cloud storage path.",
        "challenge": "Fetching large audio files repeatedly creates huge cloud network bills. We designed a 'Write-Through' cache pattern. Common songs and current hot-list audio segments are pre-heated directly in memory storage pools, cutting bucket fetch operations costs by 82%."
      },
      {
        "title": "5. CLIENT: Jitter-Compensated Sound Render",
        "desc": "The listening clients receive the sync frames along with the encrypted 128KB media chunks. Flutter uses localized native media streams to perform on-the-fly hardware decryption, and applies a dynamic delay drift compensation algorithm to match the host.",
        "reason": "Decrypting and decoding high-fidelity audio streams in native C++ libraries prevents high Garbage Collector workload peaks inside Flutter's main rendering frames.",
        "challenge": "If a user has an unstable 3G connection with alternating latency (jitter), normal players would stutter or freeze. Couchini resolves this by adjusting the audio sampling frequency dynamically by less than 0.1%. Users sync perfectly with the room without sound interruption."
      }
    ]
  },
  "tipax": {
    "projectName": "Tipax Logistics (UDP GIS Tracker)",
    "steps": [
      {
        "title": "1. CLIENT: Send Binary GPS Coordination UDP Ping",
        "desc": "Mobile driver devices send spatial geofencing tracking updates every 2 seconds. Because standard HTTP request payloads can consume massive data bandwidth and cellular power consumption, we design a lightweight 32-byte binary UDP format on-device.",
        "reason": "UDP removes connection state overhead and TLS-auth handshakes, keeping driver telemetry updates extremely compact and instantaneous.",
        "challenge": "A critical challenge under erratic internet connections is driver coordinates jumping or lagging. In the Flutter system backend coordinates calculations, the app integrates spatial Kalman filter algorithms directly on-device to filter noise on GPS chips."
      },
      {
        "title": "2. GATEWAY: Direct Kernel UDP Port Buffering Ingress",
        "desc": "A robust custom UDP Gateway listens directly to incoming UDP traffic, utilizing Linux kernel's high-performance native 'epoll' event loop triggers to avoid connection state management bottleneck queues.",
        "reason": "Enables thousands of incoming telemetry packets to compile and resolve in parallel with under 1ms network queue delays.",
        "challenge": "Unlike TCP, UDP packets can get dropped or land out of sequence. Our UDP gateway appends a sequence index and checksum to each frame, cross-referencing values at the ingress layer to reconstruct route coordinate lines securely."
      },
      {
        "title": "3. BROKER: Resilient AMQP RabbitMQ Pipelines Queueing",
        "desc": "For enterprise logistics pipelines, losing location pings means lost tracking accuracy. The gateway pipes the coordinates payload instantly to RabbitMQ, dividing the streams safely into parallel execution buckets.",
        "reason": "AMQP guarantees complete transactional messaging state persistence, preventing telemetry gaps even if core servers go down under heavy traffic load.",
        "challenge": "Under high peak hours, database operations are heavily bottlenecked by simultaneous writes. Using RabbitMQ, we decouple active writes! The database updates are computed downstream at a throttled, linear rate, preserving SQL performance."
      },
      {
        "title": "4. WORKER: Fast Geofence & Traveling Salesman Resolution",
        "desc": "The python worker swarm consumes tracking messages. It calculates boundary metrics to trigger geofence alerts, and calculates the optimal next-visit customer chain via Traveling Salesman Problem (TSP) solvers.",
        "reason": "Minimizes inner cluster communications delay, enabling workers to trigger geofence push notifications under 20ms.",
        "challenge": "Finding optimal routing priorities under changing city-wide traffic parameters is CPU-hungry. Our workers offload calculations to robust C++ libraries and use multi-threading models, allowing us to compute 500 delivery routes per second without system lag."
      },
      {
        "title": "5. DATABASE: PostGIS Spatial Shards Persistence",
        "desc": "The calculated telemetry vectors, route logs, and zone compliance indicators are committed to PostgreSQL. Because standard relational tables cannot coordinate radial geographic queries efficiently, PostgreSQL combines the spatial extensions of PostGIS.",
        "reason": "Provides spatial GIST indexing on geography coordinates, allowing sub-10ms boundary intersections queries across millions of rows.",
        "challenge": "To protect the database master repository from read-heavy geofence tracking queries, we structure a Master-Replica cluster database layout. Coordinates status queries read from multiple replicas, keeping Master free to handle transaction locks."
      }
    ]
  },
  "hyperstar": {
    "projectName": "Hyperstar Hub (ACID Inventory Ledger)",
    "steps": [
      {
        "title": "1. CLIENT: POS Barcode Scan Register",
        "desc": "When a cashier processes an item purchase, the system terminal streams bulk SKU levels. To avoid data loss and concurrent item balance drift, the client initiates a secure transactions payload to ledger nodes.",
        "reason": "Ensures maximum compatibility with legacy enterprise cash register hardware and validates secure credentials directly.",
        "challenge": "In huge hypermarkets with thousands of cashiers, single item transactions can easily block inventory rows. By engineering a non-blocking queueing gateway, cash registers stream payments seamlessly and retrieve real-time data under 50ms."
      },
      {
        "title": "2. GATEWAY: Scalable Ingress Load Balancing",
        "desc": "The Application Load Balancer (ALB) inspects checkout traffic levels, terminating public SSL/TLS bounds globally and routing transactions across optimal server instances in different zones to eliminate outages.",
        "reason": "ALB performs high-speed layer-7 content routing, verifying JWT payloads and routing paths to safeguard target backend components.",
        "challenge": "If one cloud server region acts sluggish, checkouts would freeze. The gateway monitors active server health metrics, immediately detaching slow nodes and routing inventory writes to active containers, achieving 99.99% availability."
      },
      {
        "title": "3. BROKER: Redis Memory Caching & Check De-duplication",
        "desc": "Under maximum checkouts pressure, duplicate network packets can double-charge clients or decrement stock inaccurately. The backend server leverages an-memory Redis cache to perform sub-millisecond transaction de-duplication checks.",
        "reason": "Fast memory caching is essential. Reading inventory figures or holding transactional mutexes on disk-based storage would lock columns and freeze checkout portals.",
        "challenge": "Double-allocation or stock race conditions occur when two cashiers update the same item SKU in the same millisecond. We establish memory-level mutex locks in Redis (TTL = 1 second) to ensure transactions parse sequentially with zero math errors."
      },
      {
        "title": "4. WORKER: FastAPI ACID Ledger State Balancing",
        "desc": "The FastAPI backend core executes the business rules. It decodes the transaction parameters, validates structural branch inventories, and issues replenishment triggers if the stocking is running low.",
        "reason": "FastAPI utilises async uvloop components, providing the execution capabilities of Node.js combined with strict Python object typing.",
        "challenge": "Performing inventory reductions during seasonal sales hours triggers lock waits. Our worker structures queueing pipelines using Celery in background threads, so database tables are spared from instant spikes, minimizing bottlenecks."
      },
      {
        "title": "5. DATABASE: Postgres Exclusive Ledger Lock Commits",
        "desc": "The inventory ledger reduction is committed inside PostgreSQL. Standard database queries would risk inconsistencies during heavy parallel checkouts, but PostgreSQL leverages deep ACID table locks to safeguard integrity.",
        "reason": "Guarantees strict row locks (SELECT FOR UPDATE) to ensure database writes execute atomically on the master node without catalog drift.",
        "challenge": "To maintain sub-12ms query latencies under millions of daily sales, we set up PostgreSQL Master-Replica clusters and connection pool multiplexing via pg_bouncer. This keeps transactional master nodes free of read latency overhead."
      }
    ]
  }
} as const;
