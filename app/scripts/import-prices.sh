for m in GB, PL, AT, SE, NO, CZ, ZA, LT, LV, PT, SI, SK, DE, RO, BE, BG, EE, ES, FR, FI, IE, IT, LU, MT, NL, CY, HR, HU, DK, RU, CH; do
    for i in {1..50}; do node ./commands/prices-importer.js -p $i -m $m; done;
    sleep 1m;
done;
