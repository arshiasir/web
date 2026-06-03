export default {
  "calkilo": {
    "steps": [
      {
        "protocol": "HTTP/2 (Multipart Form-Data over TLS 1.3)",
        "payload": "{\n  \"userId\": \"usr_calkilo_891\",\n  \"sessionToken\": \"jwt_calkilo_token_94e3ab...\",\n  \"imageMeta\": {\n    \"format\": \"jpeg\",\n    \"width\": 640,\n    \"height\": 640\n  },\n  \"payloadSize\": \"124 KB\",\n  \"timestamp\": 1779713800200\n}",
        "systemLogs": [
          "[CLIENT] Flutter Core camera preview captured 640x640 JPEG",
          "[CLIENT] Handed over task payload to background Dart Isolate thread",
          "[CLIENT] Slashed raw frame from 4.2MB down to 124KB (JPEG, 85% quality)",
          "[NET] Resolving host target calkilo-prod-ingress.co",
          "[NET] Client initiates TLS 1.3 handshake on TCP Port 443"
        ],
        "activeNodes": [
          "client",
          "gateway"
        ]
      },
      {
        "protocol": "HTTPS (TLS 1.3 End-to-End Encryption)",
        "payload": "{\n  \"clientIp\": \"85.185.12.104\",\n  \"httpHeader\": {\n    \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",\n    \"UserAgent\": \"Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)\"\n  },\n  \"corsMatch\": \"ALLOWED_ORIGIN_CLIENT\",\n  \"rateLimit\": {\n    \"remaining\": 998,\n    \"reset_seconds\": 42\n  }\n}",
        "systemLogs": [
          "[GATEWAY] Received POST request to /api/v1/analyze-meal via TLS 1.3",
          "[AUTH] Cryptographic JWT signature decoded successfully: user id (891) premium status validated",
          "[GATEWAY] CORS origin match confirmed for bundle calkilo.app",
          "[NET] Forwarding sanitised HTTP/2 payload to internal cloud networks"
        ],
        "activeNodes": [
          "gateway",
          "broker"
        ]
      },
      {
        "protocol": "RESP (Redis Serialization Protocol over TCP)",
        "payload": "{\n  \"redisStream\": \"stream:meal_analysis\",\n  \"jobId\": \"job_94218_calkilo\",\n  \"priorityScore\": 10,\n  \"payloadMeta\": {\n    \"imageUri\": \"s3://calkilo-ingest/raw/891_94218.jpg\"\n  },\n  \"ingressReturnCode\": \"202_ACCEPTED\"\n}",
        "systemLogs": [
          "[QUEUE] Uploaded photo buffer successfully written to AWS S3 Object Storage bucket",
          "[QUEUE] Added job task item 'job_94218_calkilo' to Redis Stream 'stream:meal_analysis'",
          "[NET] Inbound gateway returns status 'HTTP/2 220 Accepted' (Connection Released)",
          "[CLIENT] Received 202 Accepted; UI transitions scanner overlay to async analyzer state spinner"
        ],
        "activeNodes": [
          "broker",
          "worker"
        ]
      },
      {
        "protocol": "gRPC over HTTP/2 (Protobuf Binary Serialisation)",
        "payload": "{\n  \"onnxTargetModel\": \"YOLOv8x_Nutrition_FP16.onnx\",\n  \"executionProvider\": \"CUDA_GPU_ACCELERATED\",\n  \"detectedBoundingBoxes\": [\n    {\n      \"label\": \"pizza_slice\",\n      \"conf\": 0.946,\n      \"coords\": [\n        120,\n        40,\n        320,\n        280\n      ]\n    },\n    {\n      \"label\": \"tomato\",\n      \"conf\": 0.88,\n      \"coords\": [\n        200,\n        180,\n        240,\n        220\n      ]\n    }\n  ],\n  \"computeLatencySeconds\": 0.114\n}",
        "systemLogs": [
          "[WORKER-8] Claimed task item 'job_94218_calkilo' from Redis Stream using consumer groups API",
          "[WORKER-8] Image retrieved from local bucket cache: 124KB validated",
          "[WORKER-8] Running ONNX Runtime inference using CUDA v12.2 GPU cores",
          "[MODEL-YOLO] Output tensor results resolved: pizza_slice (94.6%), tomato (88.0%)",
          "[LOGIC] Computed total nutrient index specs: 540 calories, 12g protein"
        ],
        "activeNodes": [
          "worker",
          "database"
        ]
      },
      {
        "protocol": "PostgreSQL Native TCP Pool Protocol",
        "payload": "{\n  \"writeTransactionId\": \"tx_calkilo_902418\",\n  \"insertTable\": \"user_nutrition_history\",\n  \"vectorDimension\": 1536,\n  \"vectorHead\": [\n    0.1425,\n    -0.0911,\n    0.8841,\n    -0.0152\n  ],\n  \"searchIndexUsed\": \"ivfflat_cosine_index_calkilo\",\n  \"commitStatus\": \"TX_COMMITTED\"\n}",
        "systemLogs": [
          "[DB] Acquiring Postgres SQL connection from active pg_bouncer cluster proxy pool",
          "[DB] Executing transaction write block: INSERT INTO user_nutrition_history",
          "[DB] Calculating cosine distance inside pg_vector matrix search index",
          "[WS-BROADCASTER] Resolving client WebSocket ws_client_3921",
          "[WS-BROADCASTER] Dispatched payload analysis results data frame to mobile app",
          "[CLIENT] UI receives meal details payload: hides spinner and renders calorie cards"
        ],
        "activeNodes": [
          "database",
          "client"
        ]
      }
    ]
  },
  "couchini": {
    "steps": [
      {
        "protocol": "WSS (Secure WebSockets over HTTP/2 TLS 1.3)",
        "payload": "{\n  \"action\": \"ROOM_TRACK_SEEK\",\n  \"roomCode\": \"couchini_room_942\",\n  \"hostSeekTimestampMs\": 142400,\n  \"songId\": \"track_couch_blues204\",\n  \"epochTimestamp\": 1779713801200\n}",
        "systemLogs": [
          "[CLIENT] Host user initiated touch slider 'Seek Slider' to offset mark 142400ms",
          "[CLIENT] Riverpod state triggers sync event queue task",
          "[CLIENT] Assembling payload frame: size 112 bytes",
          "[WS] Pushing packet frame to wss://couchini.co/realtime/sync-room-socket"
        ],
        "activeNodes": [
          "client",
          "gateway"
        ]
      },
      {
        "protocol": "H2 WS Proxying (End-to-End TLS Termination)",
        "payload": "{\n  \"ingressSocketCount\": 142000,\n  \"webSocketFlags\": {\n    \"FIN\": 1,\n    \"OPCODE\": 1,\n    \"MASK\": 1\n  },\n  \"sslSessionId\": \"ssl_session_couch_3a4e9b...\",\n  \"routeTarget\": \"couchini-ws-workers-pool\"\n}",
        "systemLogs": [
          "[GATEWAY] Received WebSocket data frame from client IP 192.168.12.54",
          "[GATEWAY] Validated SSL session token matching active premium channel",
          "[GATEWAY] Multi-plexed WebSocket stream routed immediately to cluster container instance 14"
        ],
        "activeNodes": [
          "gateway",
          "broker"
        ]
      },
      {
        "protocol": "RESP (Redis PUBLISH Command)",
        "payload": "{\n  \"redisChannel\": \"pubsub:room:couchini_room_942\",\n  \"messageType\": \"SYNC_PLAYBACK_OFFSET\",\n  \"activeSubscribersCount\": 4,\n  \"hostOriginServer\": \"ws-instance-04\",\n  \"lockTTL\": \"2000ms\"\n}",
        "systemLogs": [
          "[BROKER] Received room event from container instance 14",
          "[REDIS] Lock acquired successfully for key 'lock:room:942' (TTL = 2000ms)",
          "[REDIS] PUBLISH event 'ROOM_TRACK_SEEK' to channel 'pubsub:room:couchini_room_942' with 4 receivers"
        ],
        "activeNodes": [
          "broker",
          "worker"
        ]
      },
      {
        "protocol": "HTTPS (SECURE AES-256 Symmetric Stream Encryption)",
        "payload": "{\n  \"trackId\": \"track_couch_blues204\",\n  \"requestedChunkIndex\": 24,\n  \"chunkKeyHash\": \"sha256_b3a4c5e...\",\n  \"cipherBlockChaining\": \"AES-256-CTR\",\n  \"decryptionKeyId\": \"key_couchini_051283\"\n}",
        "systemLogs": [
          "[WORKER-WS] Received Redis Pub-Sub channel broadcast event data",
          "[CACHE] Cache hit on memory segment buffer for track_couch_blues204_chunk_24",
          "[WORKER] Sign cryptographic AES decryption packet frames key",
          "[NET] Multi-cast dispatching synchronized seek status frame to 4 socket recipients"
        ],
        "activeNodes": [
          "worker",
          "client"
        ]
      },
      {
        "protocol": "Local Hardware Decoding Buffer (Exposured Native isolate)",
        "payload": "{\n  \"networkJitterMs\": 14.2,\n  \"clientDriftOffsetSeconds\": 0.004,\n  \"jitterAdjustmentAction\": \"PITCH_STRETCH_0.01%\",\n  \"hardwareDecoderStatus\": \"ACTIVE_METAL_DECODE_OPENSL\"\n}",
        "systemLogs": [
          "[CLIENT] Received WS room seek action frame from gateway channel source-14",
          "[CLIENT-HEARTBEAT] Net delay measured: 14.2ms, sound drift calculated: 4ms",
          "[CLIENT] Core decoders loaded cryptographically AES-256 binary segment",
          "[CLIENT] Executed micro-pitch audio stretch algorithm target matching complete",
          "[CLIENT] High-fidelity playback matched room state and running synced successfully"
        ],
        "activeNodes": [
          "client",
          "client"
        ]
      }
    ]
  },
  "tipax": {
    "steps": [
      {
        "protocol": "UDP (User Datagram Protocol over raw socket)",
        "payload": "{\n  \"raw_hex_packet\": \"0x0B2D2F1FA532BE02C...\",\n  \"decoded_mapping\": {\n    \"driver_token_id\": 12049,\n    \"lat\": 35.72412,\n    \"lng\": 51.33421,\n    \"speed_kmh\": 42.5,\n    \"direction_degrees\": 182\n  }\n}",
        "systemLogs": [
          "[CLIENT-MOBILE] GPS coordinates computed from cellular tower index: 35.72412, 51.33421",
          "[CLIENT] Initializing Kalman filter to smooth coordinate vector",
          "[CLIENT] Encoded geography values into 32-byte packed binary format",
          "[NET] Emitted compact raw UDP socket package to logistics target gateway endpoint"
        ],
        "activeNodes": [
          "client",
          "gateway"
        ]
      },
      {
        "protocol": "UDP Port Ingress (Direct Socket Epoll bindings)",
        "payload": "{\n  \"activeInboundUDPListeners\": 12000,\n  \"portBound\": 8888,\n  \"received_packet_bytes\": 32,\n  \"gateway_receiver_instance\": \"geo_gate_worker_01\",\n  \"checksum_verification\": \"VALID_MATCH_0x5C9B3A\"\n}",
        "systemLogs": [
          "[GATEWAY] Incoming UDP bundle size 32 bytes from IP 185.12.5.3",
          "[GATEWAY] Binary decoding validated checksum status = matched",
          "[GATEWAY] Resolved driver tracker record id = 12049",
          "[GATEWAY] Streaming raw geographic event node details to event broker dispatcher queue"
        ],
        "activeNodes": [
          "gateway",
          "broker"
        ]
      },
      {
        "protocol": "AMQP (Advanced Message Queuing Protocol over TCP)",
        "payload": "{\n  \"brokerEngine\": \"RabbitMQ Cluster v3.12\",\n  \"virtualHost\": \"logistics_tipax\",\n  \"routingKey\": \"geo.driver.location\",\n  \"targetQueuedMessages\": 1420,\n  \"channelPrefetchLimit\": 500\n}",
        "systemLogs": [
          "[BROKER] Routing key matches queue target 'driver_location_processing_pool'",
          "[BROKER] Pushed coordinate packet task item to resilient RabbitMQ cluster replica node",
          "[BROKER] Verified queue acknowledgement index ID = 880241"
        ],
        "activeNodes": [
          "broker",
          "worker"
        ]
      },
      {
        "protocol": "gRPC over HTTP/2 (Parallel Microservice Dispatch)",
        "payload": "{\n  \"activeWorkers\": 18,\n  \"solverAlgorithm\": \"Heuristic_TSP_OrTools_C++\",\n  \"geofenceZonesEvaluated\": [\n    \"Tehran_Zone_Central\",\n    \"Restricted_District_03\"\n  ],\n  \"tspOutputRouteIndex\": [\n    104,\n    204,\n    302,\n    108\n  ],\n  \"distanceSavedMeters\": 8420\n}",
        "systemLogs": [
          "[WORKER-12] Claimed coordinate package payload from RabbitMQ consumer channel",
          "[WORKER-12] Triggering zone checker logic target Milad Tower sector",
          "[WORKER-12] Alarm fired: Driver 12049 entered Zone_Central geofenced quadrant",
          "[SOLVER-TSP] Evaluated C++ routing solver constraints in 4.2ms: optimized chain computed"
        ],
        "activeNodes": [
          "worker",
          "database"
        ]
      },
      {
        "protocol": "PostgreSQL Native Transaction Pool Protocol",
        "payload": "{\n  \"databaseSchema\": \"postgres_postgis_geodb\",\n  \"upsertQuery\": \"UPDATE driver_status SET current_location = ST_GeomFromText('POINT(35.72412 51.33421)', 4326)\",\n  \"spatialIndexActive\": \"idx_driver_gist_geom_location\",\n  \"queryLatencySeconds\": 0.0012\n}",
        "systemLogs": [
          "[DB] Acquiring PostgreSQL Connection via active pg_bouncer thread gateway pool",
          "[DB] Executing geographic upsert query update current coordinates for 'driver_12049'",
          "[DB] PostGIS GIST spatial index hit: 3 polygons intersections evaluated dynamically",
          "[DB] Syncing write transaction coordinates logs to replicate nodes in 5 micro-seconds",
          "[NET] Dispatching updated tracking markers and progress stats payload to corporate supervisor panels"
        ],
        "activeNodes": [
          "database",
          "client"
        ]
      }
    ]
  },
  "hyperstar": {
    "steps": [
      {
        "protocol": "REST API (HTTP/1.1 over HTTPS TLS 1.3)",
        "payload": "{\n  \"branchId\": \"branch_west_tehran\",\n  \"registerTerminalId\": \"pos_terminal_041\",\n  \"inboundItemSku\": \"prod_butter_brand_81024\",\n  \"itemQuantity\": 2,\n  \"epochTime\": 1779713803200\n}",
        "systemLogs": [
          "[CLIENT] POS cash drawer terminal detected scanner barcode read = 'prod_butter_brand_81024'",
          "[CLIENT] Validating session key for active cashier user 'reg_operator_18'",
          "[CLIENT] Assembled POST transaction payload: total bytes 142",
          "[NET] Sent invoice item record packet to hyperstar web gateway"
        ],
        "activeNodes": [
          "client",
          "gateway"
        ]
      },
      {
        "protocol": "HTTP/1.1 HTTPS TLS1.3 (AWS Application Load Balancer)",
        "payload": "{\n  \"activeConnections\": 45000,\n  \"sslSessionHash\": \"0xFC9A38BE\",\n  \"targetContainerGroup\": \"tg-fastapi-ledger-nodes\",\n  \"ingressLatencyMs\": 2.1\n}",
        "systemLogs": [
          "[GATEWAY] Received SSL/TLS encrypted payload on Port 443",
          "[GATEWAY] Completed TLS termination on cloud edge in 2.1ms",
          "[GATEWAY] Routing verified branch traffic block to internal scale group container 'fastapi-node-04'"
        ],
        "activeNodes": [
          "gateway",
          "broker"
        ]
      },
      {
        "protocol": "RESP (Redis in-memory cache operations)",
        "payload": "{\n  \"cacheLookupKey\": \"tx_lock:invoice_tx_2a4d9e0f3\",\n  \"existingCacheStatus\": \"DEDUPLICATED_NOT_EXISTS\",\n  \"setMutexStatus\": \"ACQUIRED_LOCK_500ms\",\n  \"cachedProductStockSKU\": 1284\n}",
        "systemLogs": [
          "[BROKER] Querying Redis for unique request transaction lock: 'tx_lock:invoice_tx_2a4d9e0f3'",
          "[REDIS] Lock acquisition status = OK (No previous identical transaction seen in last 1 hour, packet deduplication successful)",
          "[REDIS] Fetching current memory cached inventory volume for SKU 81024: value is 1284"
        ],
        "activeNodes": [
          "broker",
          "worker"
        ]
      },
      {
        "protocol": "HTTP/1.1 (Internal Cluster Async Swarm Pipelines)",
        "payload": "{\n  \"activeComputeNodesCount\": 12,\n  \"currentInventoryStatus\": \"REDUCING_STOCK_VOLUME\",\n  \"warehouseDispatchId\": \"wh_central_karaj\",\n  \"minimumStockThresholdLimit\": 100,\n  \"currentStockRemaining\": 1282,\n  \"triggerAutosupplyAlarm\": false\n}",
        "systemLogs": [
          "[WORKER] Claimed transaction job from gateway bundle channel",
          "[WORKER] Deducting SKU product 81024 quantity balance: 1284 -> 1282",
          "[WORKER-LOGGER] Target branch inventory level limits validated within safety index threshold"
        ],
        "activeNodes": [
          "worker",
          "database"
        ]
      },
      {
        "protocol": "PostgreSQL Production Connection Pool",
        "payload": "{\n  \"databaseWriteStatus\": \"WRITE_SUCCESS_COMMITTED_ACID\",\n  \"lockingStrategy\": \"MUTEX_EXCLUSIVE_ROW_LOCK\",\n  \"updatedProductSKU\": 81024,\n  \"replicationLatencyMs\": 0.005,\n  \"activeSQLConnectionBypass\": \"pg_bouncer_active_client\"\n}",
        "systemLogs": [
          "[DB] Executing transaction write: UPDATE inventory_ledger SET quantity = 1282 WHERE sku = 81024",
          "[DB] PostgreSQL exclusive row locks verified 'idx_sku_ledger_81024'",
          "[DB] Transaction safely committed matching ACID standards",
          "[DB] Replicating updated invoice data status values to read replicas in 5 micro-seconds",
          "[CLIENT] Received 200 OK update: POS checkout screen registers success"
        ],
        "activeNodes": [
          "database",
          "client"
        ]
      }
    ]
  }
} as const;
