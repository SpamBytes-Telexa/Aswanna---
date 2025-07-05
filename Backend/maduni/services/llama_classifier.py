def classify_query(query: str) -> str:
    # dummy logic for now
    if "law" in query.lower():
        return "legal"
    elif "price" in query.lower():
        return "prices"
    else:
        return "other"