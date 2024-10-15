from dagster import AssetKey, AssetSelection, define_asset_job

extract_toilets_data_job = define_asset_job(
    "extract_toilets_data_job",
    selection=AssetSelection.assets(AssetKey(["entries"])).downstream(),
)
