(define-map Users principal {address: principal})

(map-insert Users tx-sender { address: tx-sender })

(define-read-only (get-user (who principal))
  (unwrap! (map-get? Users tx-sender) (err u404))
)

(get-user tx-sender)