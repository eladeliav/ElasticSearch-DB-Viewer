import json


def getEntry(entry, attr):
    try:
        return entry[attr]['values'][0]['origValue']
    except Exception as identifier:
        return None


def main():
    count = 0
    to_dump = []
    with open('ebay_products.json', encoding="utf8") as json_file:  
        with open('ebay_products_simple.json', 'w') as json_out:
            data = json.load(json_file)
            for product in data:
                current = {
                    "id": (count+1),
                    "title": getEntry(product['normContribAttrs'], "1"),
                    "brand": getEntry(product['normContribAttrs'], "2"),
                    "epid": getEntry(product['normContribAttrs'], "3")
                }
                to_dump.append(current)
                count += 1
                if count == 6560:
                    break
            json.dump(to_dump, json_out)


if __name__ == "__main__":
    main()
