import geopandas as gpd
import fiona

# Set the SHAPE_RESTORE_SHX configuration option to 'YES'
with fiona.Env():
    gdf = gpd.read_file('data/pipelines/Pipelines_SHP/Pipelines_SHP/Pipelines_GCS_NAD83.shp')


print(gdf.head())
# Convert the geopandas dataframe to a geojson object
geojson = gdf.to_crs(epsg='4326').to_json()

# Write the geojson object to a file
with open('data/pipelines/pipelines.geojson', 'w') as f:
    f.write(geojson)

print('exported geojson')

