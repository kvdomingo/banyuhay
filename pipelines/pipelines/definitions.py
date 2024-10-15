from dagster import Definitions, load_assets_from_package_module

from pipelines import assets
from pipelines.jobs import extract_toilets_data_job

defs = Definitions(
    assets=[*load_assets_from_package_module(assets)],
    jobs=[extract_toilets_data_job],
)
