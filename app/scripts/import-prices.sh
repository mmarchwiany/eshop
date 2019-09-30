for m in PL GB AT SE NO CZ ZA LT LV PT SI SK DE RO BE BG EE ES FR FI IE IT LU MT NL CY HR HU DK RU CH; do
    echo "Start importing prices for country: $m"
    for i in {1..50}; do 
        node ./commands/prices-importer.js -p $i -m $m; 
    done;

    sleep 5s;
done;
