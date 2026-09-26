Vendored from `tapter-dev/kaspi-pos-automation` at commit `28c9167f9c72cd6758a25e254bc92bc610daa485` (MIT).

Sezgir changes: persist device and polling state under `KASPI_DATA_DIR`, configure a dedicated signed webhook through environment variables, track invoice `Data.Id` as well as `QrOperationId`, retry webhook delivery on non-2xx responses, and override vulnerable transitive `qs` to 6.16.0.
