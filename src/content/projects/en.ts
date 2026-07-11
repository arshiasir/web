export default {
  "calkilo": {
    "title": "Calkilo AI",
    "category": "AI Health Platform",
    "desc": "Smart nutrient analysis and instant meal classification powered by custom computer vision AI algorithms.",
    "role": "FULLSTACK DEVELOPMENT",
    "scopeLabel": "Fullstack Systems",
    "tagline": "Know what you eat",
    "heroDescription": "Real-time food recognition and caloric analysis powered by custom computer vision AI. Snap a photo and get instant nutritional breakdown.",
    "screens": [
      { "id": "scan", "title": "Camera Scan", "description": "Point and shoot — AI recognizes your meal in under 200ms." },
      { "id": "results", "title": "Nutrition Results", "description": "Complete macro and micro nutrient breakdown." },
      { "id": "history", "title": "Meal History", "description": "Track your eating patterns over time." },
      { "id": "goals", "title": "Smart Goals", "description": "AI adapts recommendations based on your targets." },
      { "id": "profile", "title": "Profile", "description": "Personalized metrics and dietary preferences." },
      { "id": "dashboard", "title": "Dashboard", "description": "Weekly trends and nutritional insights." }
    ],
    "features": [
      { "title": "AI Recognition", "description": "Custom YOLOv8 models identify food items with 96.2% accuracy in real-time.", "icon": "Brain" },
      { "title": "Instant Analysis", "description": "Full nutritional breakdown including calories, protein, fats, and micronutrients.", "icon": "Zap" },
      { "title": "Meal History", "description": "Automatic logging with daily, weekly, and monthly trend visualization.", "icon": "Clock" },
      { "title": "Smart Goals", "description": "AI adjusts recommendations dynamically based on your progress and targets.", "icon": "Target" }
    ],
    "timeline": [
      { "phase": "Research", "description": "Studied nutrition science and computer vision approaches." },
      { "phase": "Data Collection", "description": "Curated and labeled 50k+ food images for model training." },
      { "phase": "Model Training", "description": "Trained custom YOLOv8 models exported to ONNX format." },
      { "phase": "App Development", "description": "Built Flutter UI with real-time camera preview overlay." },
      { "phase": "API Layer", "description": "FastAPI endpoints with horizontal scaling for inference." },
      { "phase": "Release", "description": "Deployed with CI/CD pipeline and monitoring." }
    ],
    "challenges": [
      { "problem": "Achieving sub-200ms inference on device with limited resources.", "solution": "Optimized YOLOv8 to ONNX format with hardware-accelerated shaders and frame locking at 120Hz." },
      { "problem": "Accurate caloric volume calculation from 2D images.", "solution": "Implemented depth estimation pipeline using multi-angle contour analysis and density parsing." },
      { "problem": "Scaling inference across concurrent users without latency spikes.", "solution": "Designed horizontal microservices scaling across GPU worker groups behind an API gateway." }
    ],
    "highlights": [
      "Real-time food recognition AI",
      "Automatic caloric volume calculation",
      "Dynamic personal nutrition metrics",
      "Scalable API pipeline structures"
    ],
    "architectureHighlights": [
      "Flutter UI Rendering View",
      "FastAPI Prediction Endpoint",
      "On-device Image Compactor",
      "PostgreSQL Vector DB"
    ],
    "realtimeFeatures": "Leverages high-speed WebSockets to stream frame-by-frame inference details directly during live camera scan previews.",
    "aiFeatures": "Integrates custom YOLOv8 models exported to ONNX format. Processes nutrition classification and density parsing in under 200ms.",
    "scalabilityDetails": "Designed high-throughput inference nodes, enabling horizontal microservices scaling across GPU worker groups behind an API Gateway.",
    "performanceOptimizations": "Utilizes hardware-accelerated texture shaders in Flutter and locks frames at constant 120Hz during live camera scanner overlays.",
    "problem": "People had no instant, reliable way to know the true nutritional value of the meals they eat every day.",
    "outcome": "Delivers 96.2% recognition accuracy in 180ms, powered by a custom YOLOv8 model trained on 50k+ images and shipped through a CI/CD pipeline.",
    "reflection": "Shipping a custom computer-vision model to a phone taught me that accuracy is worthless if inference isn't fast enough to feel instant. If I rebuilt it, I'd add on-device quantization profiling from day one and a clearer failure story for low-light scenes."
  },
  "couchini": {
    "title": "Couchini Music",
    "category": "Streaming Platform",
    "desc": "Immersive audio-entertainment app offering low-latency streams, hardware decoding representation, and modern custom interactive discovery tools.",
    "role": "MOBILE DEVELOPMENT",
    "scopeLabel": "Mobile Screen Engineering",
    "tagline": "Your music. Your world.",
    "heroDescription": "An immersive audio experience with ultra-low latency streaming, offline playback, and AI-powered recommendations that learn your taste.",
    "screens": [
      { "id": "player", "title": "Player", "description": "Full-screen player with gesture control, gapless playback and live lyric sync." },
      { "id": "explore", "title": "Explore", "description": "Personalized home feed with smart mixes, new releases and curated radio." },
      { "id": "search", "title": "Search", "description": "Instant search across tracks, artists, albums and playlists with filters." },
      { "id": "playlist", "title": "Playlist", "description": "Create and edit playlists with smart auto-ordering and collaborative editing." },
      { "id": "lyrics", "title": "Lyrics", "description": "Time-coded synchronized lyrics with karaoke-style word highlighting." },
      { "id": "library", "title": "Library", "description": "All your saved music, downloads and listening history in one organized place." }
    ],
    "features": [
      { "title": "Immersive Audio", "description": "Ultra-low latency streaming with hardware-accelerated decoding for pristine sound.", "icon": "Music" },
      { "title": "Smart Recommendation", "description": "On-device behavioral engine that learns your taste and suggests the perfect next track.", "icon": "Sparkles" },
      { "title": "Offline Mode", "description": "Cryptographic offline engine with seamless sync when back online.", "icon": "Wifi" },
      { "title": "Party Play", "description": "Synchronized listening sessions with friends in real-time.", "icon": "Users" }
    ],
    "timeline": [
      { "phase": "Research", "description": "Analyzed top streaming apps and identified UX pain points." },
      { "phase": "Wireframe", "description": "Designed gesture-driven navigation and immersive player layouts." },
      { "phase": "UI Design", "description": "Crafted dark theme with dynamic gradients and micro-interactions." },
      { "phase": "Flutter Dev", "description": "Implemented Riverpod architecture with reactive state management." },
      { "phase": "Backend", "description": "Django + WebSocket server with Redis caching layer." },
      { "phase": "Release", "description": "Optimized audio buffers and shipped with CI/CD pipeline." }
    ],
    "challenges": [
      { "problem": "Achieving sub-50ms audio latency on diverse Android hardware.", "solution": "Built custom audio buffer pipelines that bypass standard framework channels, eliminating GC memory spikes." },
      { "problem": "Seamless offline-to-online transition without playback interruption.", "solution": "Designed cryptographic offline decryption engine with background state sync via Dart isolates." },
      { "problem": "Synchronized multi-device playback for party mode.", "solution": "Implemented full state synchronization inside Dart isolates with WebSocket-backed media controllers." }
    ],
    "highlights": [
      "Immersive UI with advanced gesture layouts",
      "Offline cryptographic decryption engine",
      "Synchronized party listening mechanisms",
      "Reactive microstate updates via Riverpod"
    ],
    "architectureHighlights": [
      "Immersive Widget Tree Layers",
      "Hardware Media Decoders",
      "Fast Cache Decryption State",
      "Advanced Liquid UI Engine"
    ],
    "realtimeFeatures": "Implements full state synchronization inside Dart isolates, updating localized media controllers instantly on status cues of paired party rooms.",
    "aiFeatures": "Utilizes an on-device lightweight user behavioral engine to order immediate recommendation card displays depending on environmental context.",
    "scalabilityDetails": "Designed cleanly separating presentation states from media service models, creating completely predictable memory bounds for continuous play.",
    "performanceOptimizations": "Custom audio buffer pipelines bypass standard framework channels, eliminating GC memory spikes during heavy high-fidelity chunk buffers.",
    "problem": "Music listeners wanted an immersive, low-latency player that still worked flawlessly offline and learned their taste.",
    "outcome": "Sub-50ms audio latency with synchronized party listening across devices and an on-device recommendation engine that adapts in real time.",
    "reflection": "Couchini proved that perceived quality lives in the buffer pipeline, not the codec. The hardest bug was GC pauses during playback — solving it with Dart isolates changed how I think about mobile threading. Next I'd add cross-device equalizer sync.",
    "contribution": [
      "Designed and built the entire Flutter mobile client from concept to release.",
      "Implemented low-latency audio playback with custom buffer pipelines bypassing framework overhead.",
      "Architected predictable, reactive state management using Riverpod across the whole app.",
      "Integrated the Django + WebSocket backend for real-time sync, auth and streaming.",
      "Built secure offline playback with local storage, downloads and background sync."
    ],
    "capabilities": [
      { "title": "Music Discovery", "description": "Personalized home feed and smart mixes that learn listening habits over time." },
      { "title": "Playback Experience", "description": "Gapless, low-latency audio with gesture control and live lyric sync." },
      { "title": "Offline Listening", "description": "Download and play music securely without a connection, then sync when online." },
      { "title": "Synchronized Lyrics", "description": "Live, time-coded lyrics with karaoke-style word highlighting." }
    ],
    "implementation": [
      { "title": "Mobile", "description": "Flutter, Dart and Riverpod for a reactive cross-platform client." },
      { "title": "Backend Integration", "description": "REST API and Django with real-time WebSocket updates." },
      { "title": "Local Data", "description": "SQLite and secure storage for offline playback and caching." },
      { "title": "Media", "description": "Audio playback engine with download and buffer management." }
    ]
  },
  "tipax": {
    "title": "Tipax Logistics",
    "category": "Realtime Logistics Network",
    "desc": "Robust enterprise system empowering microsecond-accurate updates for delivery drivers, management team cascades, and active tracking map modules.",
    "role": "FULLSTACK DEVELOPMENT",
    "scopeLabel": "Fullstack Systems",
    "tagline": "Deliver at scale",
    "heroDescription": "Enterprise logistics network connecting 12,000+ drivers with microsecond-accurate real-time tracking and intelligent route optimization.",
    "screens": [
      { "id": "driver", "title": "Driver View", "description": "Real-time navigation with optimized delivery routes." },
      { "id": "map", "title": "Live Map", "description": "Track all active drivers with microsecond updates." },
      { "id": "orders", "title": "Order Management", "description": "Automated assignment and dispatch system." },
      { "id": "analytics", "title": "Analytics", "description": "Fleet performance and delivery metrics dashboard." },
      { "id": "profile", "title": "Driver Profile", "description": "Rating, history, and performance stats." },
      { "id": "admin", "title": "Admin Panel", "description": "Full control over fleet, zones, and pricing." }
    ],
    "features": [
      { "title": "Live Tracking", "description": "12,000+ drivers broadcast GPS coordinates continuously with packet fault tolerance.", "icon": "MapPin" },
      { "title": "Route Optimization", "description": "Real-time TSP algorithms compute optimal delivery sequences dynamically.", "icon": "GitBranch" },
      { "title": "Driver Management", "description": "Multi-persona dashboards for drivers, supervisors, and administrators.", "icon": "Users" },
      { "title": "Fleet Analytics", "description": "Custom telemetry encodings slashed transmission payload size by 78%.", "icon": "BarChart3" }
    ],
    "timeline": [
      { "phase": "Requirements", "description": "Gathered needs from drivers, dispatchers, and management." },
      { "phase": "Architecture", "description": "Designed microservice system with RabbitMQ message queues." },
      { "phase": "Fullstack Dev", "description": "Built Flutter driver/supervisor apps and FastAPI backend simultaneously." },
      { "phase": "Testing", "description": "Load tested with 15k concurrent simulated driver connections." },
      { "phase": "Deployment", "description": "Dockerized services deployed on high-availability infrastructure." },
      { "phase": "Monitoring", "description": "Real-time telemetry and alerting for system health." }
    ],
    "challenges": [
      { "problem": "Handling 12k+ concurrent GPS connections with sub-second latency.", "solution": "Engineered custom geographic packet telemetry encodings that slashed transmission payload size by 78% for cellular networks." },
      { "problem": "Optimal route calculation across thousands of active deliveries.", "solution": "Integrated real-time traveling salesman algorithms (TSP) to compute optimal delivery routes dynamically." },
      { "problem": "Fault tolerance during network interruptions in cellular dead zones.", "solution": "Implemented packet fault tolerance with local queue buffering and automatic retransmission." }
    ],
    "highlights": [
      "Continuous GPS location broadcasting",
      "Robust multi-persona dashboard panels",
      "Fault-tolerant routing calculations",
      "Automated order assignment systems"
    ],
    "architectureHighlights": [
      "Flutter Driver / Supervisor Apps",
      "FastAPI High-through Terminal",
      "RabbitMQ Delivery Pipelines",
      "PostgreSQL PostGIS GeoCluster"
    ],
    "realtimeFeatures": "Broadcasting live coordinates of 12,000+ driver nodes continuously. Relies on low-latency JSON queues with packet fault tolerance.",
    "aiFeatures": "Integrates real-time traveling salesman algorithms (TSP) to compute optimal delivery routes dynamically and minimize logistics wear.",
    "scalabilityDetails": "Distributed worker systems packaged inside high-availability environments. Supports parallel pooling on database coordinates.",
    "performanceOptimizations": "Engineered custom geographic packet telemetry encodings that slashed transmission payloads size by 78% for cellular cells.",
    "problem": "Logistics operators couldn't track thousands of drivers live or compute optimal delivery routes as conditions changed.",
    "outcome": "Connects 12,000+ live drivers handling 500k deliveries/day, with 78% smaller telemetry payloads and dynamic route optimization.",
    "reflection": "Tipax showed me that telemetry framing is a product decision: shaving 78% off the payload wasn't an optimization, it was what made cellular tracking viable. If I did it again I'd revisit the offline queue with CRDT-style merge."
  },
  "hyperstar": {
    "title": "Hyperstar Supply",
    "category": "Enterprise Inventory Hub",
    "desc": "Highly cohesive state engine driving real-time inventory levels, dynamic warehouse stocking algorithms, and role-based permissions systems.",
    "role": "BACKEND DEVELOPMENT",
    "scopeLabel": "High Performance Backend",
    "tagline": "Inventory intelligence",
    "heroDescription": "High-throughput inventory management with predictive stock algorithms, real-time sync, and sub-millisecond query performance.",
    "screens": [
      { "id": "dashboard", "title": "Dashboard", "description": "Real-time inventory overview with critical alerts." },
      { "id": "inventory", "title": "Inventory", "description": "Granular stock control across multiple warehouses." },
      { "id": "orders", "title": "Orders", "description": "Automated replenishment and purchase order management." },
      { "id": "analytics", "title": "Analytics", "description": "Trend forecasting and stock performance metrics." },
      { "id": "suppliers", "title": "Suppliers", "description": "Vendor management and supply chain coordination." },
      { "id": "reports", "title": "Reports", "description": "Customizable exportable reports for auditing." }
    ],
    "features": [
      { "title": "Real-time Sync", "description": "2M+ database records synced per hour with active-active Redis nodes.", "icon": "RefreshCw" },
      { "title": "Predictive Stock", "description": "Neural regression models forecast demand and auto-adjust thresholds.", "icon": "Brain" },
      { "title": "Role Management", "description": "Granular RBAC with custom permission sets per user role.", "icon": "Shield" },
      { "title": "High Performance", "description": "Sub-12ms query response with optimized composite indexes.", "icon": "Zap" }
    ],
    "timeline": [
      { "phase": "Requirements", "description": "Analyzed inventory workflows and pain points." },
      { "phase": "Architecture", "description": "Designed split read-write databases with shard clusters." },
      { "phase": "Backend Dev", "description": "Built FastAPI core engine with Redis caching layer." },
      { "phase": "Database", "description": "PostgreSQL sharding with composite index optimization." },
      { "phase": "API Layer", "description": "RESTful API design with SSE for real-time notifications." },
      { "phase": "Deployment", "description": "Dockerized microservices on AWS with auto-scaling." }
    ],
    "challenges": [
      { "problem": "2M+ records synced hourly without performance degradation.", "solution": "Split read-write databases and configured active-active Redis nodes for reliable scaling under stress." },
      { "problem": "Sub-12ms query response on massive inventory datasets.", "solution": "Formulated precise PostgreSQL composite indexes that plunged system operations response to just 12ms." },
      { "problem": "Real-time inventory alerts without polling overhead.", "solution": "Established high-urgency notifications via real-time SSE lanes pushing immediate alerts to supplier panels." }
    ],
    "highlights": [
      "Ultra high-throughput transaction ledger",
      "Custom multi-role inventory governance",
      "Intelligent warehouse exhaustion predicts",
      "Optimized sub-millisecond cache engines"
    ],
    "architectureHighlights": [
      "REST Gateway API Proxies",
      "FastAPI Core Inventory Engine",
      "Redis Memory Layer Caching",
      "Postgres Database Shard Clusters"
    ],
    "realtimeFeatures": "Establishes high-urgency notifications directly via real-time SSE lanes pushing immediate alerts to supplier procurement panels.",
    "aiFeatures": "Employs predictive stock models using neural regressors to auto-adjust minimum replenish thresholds based on seasonal curves.",
    "scalabilityDetails": "Designed split read-write databases and configured active-active Redis nodes, easily ensuring reliable scaling bounds under stress.",
    "performanceOptimizations": "Formulated precise PostgreSQL composite indexes and query loops that plunged system operations response down to just 12ms.",
    "problem": "Enterprises struggled with real-time inventory accuracy, role governance, and predicting when stock would run out.",
    "outcome": "Syncs 2M+ records per hour at sub-12ms queries with neural demand forecasting that auto-adjusts replenishment thresholds.",
    "reflection": "Hyperstar reinforced that schema design — not framework choice — decides whether a system scales. The 12ms win came from composite indexes, not magic. Given another pass I'd add predictable read-replica lag budgets and automated index regression tests."
  },
  "faceauth": {
    "title": "FaceAuth Attendance",
    "category": "Biometric Authentication",
    "desc": "Microsecond facial recognition login terminals synced with legacy attendance records for corporate physical infrastructures.",
    "role": "BACKEND DEVELOPMENT",
    "scopeLabel": "High Performance Backend",
    "tagline": "Secure identity on the edge",
    "heroDescription": "Enterprise face recognition that works entirely offline with microsecond matching and encrypted edge storage.",
    "screens": [
      { "id": "login", "title": "Face Login", "description": "Instant biometric authentication in under 90ms." },
      { "id": "register", "title": "Register", "description": "Secure face enrollment with liveness detection." },
      { "id": "dashboard", "title": "Dashboard", "description": "Real-time attendance overview and reports." },
      { "id": "reports", "title": "Reports", "description": "Exportable attendance logs with audit trails." },
      { "id": "settings", "title": "Settings", "description": "Device configuration and security policies." },
      { "id": "admin", "title": "Admin Panel", "description": "User management and system monitoring." }
    ],
    "features": [
      { "title": "Face Recognition", "description": "Optimized FaceNet embeddings compute facial metrics in under 90ms on edge devices.", "icon": "Scan" },
      { "title": "Offline First", "description": "Fully operational without internet — biometric validation continues seamlessly.", "icon": "Wifi" },
      { "title": "Edge Computing", "description": "All processing runs locally on device — no cloud dependency required.", "icon": "Cpu" },
      { "title": "Secure Storage", "description": "Encrypted on-device SQLite database with tamper-proof audit logs.", "icon": "Shield" }
    ],
    "timeline": [
      { "phase": "Research", "description": "Evaluated face recognition models for edge deployment." },
      { "phase": "Architecture", "description": "Designed edge-first architecture with offline resilience." },
      { "phase": "Backend Dev", "description": "Built Python face processing pipeline with OpenCV optimization." },
      { "phase": "Hardware", "description": "Integrated with industrial kiosk terminals and cameras." },
      { "phase": "Testing", "description": "Tested with 10k+ face database for accuracy and speed." },
      { "phase": "Deployment", "description": "Deployed across multiple corporate locations with remote monitoring." }
    ],
    "challenges": [
      { "problem": "Sub-90ms face matching on low-power industrial kiosks.", "solution": "Slashed OpenCV frame resolutions to crucial regions of interest, mitigating CPU thermal throttling on passive cooled devices." },
      { "problem": "Reliable offline operation with eventual cloud sync.", "solution": "Designed completely resilient edge loops allowing continuous biometrics validation even during complete connectivity offline states." },
      { "problem": "Secure storage of biometric templates on device.", "solution": "Encrypted on-device SQLite database with tamper-proof audit logging and secure key management." }
    ],
    "highlights": [
      "Encrypted on-device biometric checking",
      "High-security edge storage pipelines",
      "Robust offline caching mechanisms",
      "Compact custom attendance nodes"
    ],
    "architectureHighlights": [
      "Industrial Flutter Kiosk View",
      "On-device Face Vector Extractor",
      "Local SQLite Security Cache",
      "WS Telemetry Sync Pipeline"
    ],
    "realtimeFeatures": "Continuously streams device health analytics and biometric authentications to cloud management dashboard logs.",
    "aiFeatures": "Leverages optimized FaceNet embeddings to compute mathematical face metrics on the edge in less than 90ms with strict precision bounds.",
    "scalabilityDetails": "Designed completely resilient edge loops allowing continuous biometrics validation even during complete connectivity offline states.",
    "performanceOptimizations": "Slashed OpenCV frame resolutions down to crucial regions of interest, mitigating CPU thermal throttling on passive cooled kiosks.",
    "problem": "Workplaces needed secure attendance that kept working offline and never leaked biometric data to the cloud.",
    "outcome": "Matches faces in under 90ms fully on-device, with encrypted templates and tamper-proof audit logs that survive full connectivity loss.",
    "reflection": "FaceAuth made me respect edge-first thinking: the product only mattered because it worked with zero connectivity. The encrypted biometric template storage is the part I'm proudest of. I'd add on-device liveness anti-spoofing and a tamper-evident audit export."
  }
} as const;
