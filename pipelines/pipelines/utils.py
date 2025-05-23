def get_rating(entry: list[str], attr: str) -> int:
    return (
        next(
            (e for i, e in enumerate(entry) if e.lower().startswith(attr)),
            "",
        )
        .split(": ")[-1]
        .strip()
        .count("⭐")
    )


def get_caption(entry: list[str]):
    prefix_end_idx = next(
        (i for i in range(len(entry)) if "water pressure" in entry[i].lower()),
        -1,
    )
    suffix_start_idx = (
        next(
            (i for i in range(len(entry)) if "poopability" in entry[i].lower()),
            -1,
        )
        + 1
    )
    return "\n".join(
        [
            "\n".join(e for e in entry[:prefix_end_idx] if not e.startswith("#")),
            "\n".join(e for e in entry[suffix_start_idx:] if not e.startswith("#")),
        ]
    )


def get_establishment_name(entry: list[str]):
    splits = entry[0].lower().split(" sa ")
    if len(splits) > 1:
        return splits[1].split(".")[0]
    return None


def get_has_bidet(entry: list[str]):
    ent = entry[0].lower()
    return ent.startswith("meron") or ent.startswith("may")
