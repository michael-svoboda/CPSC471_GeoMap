<<<<<<< HEAD
import mysql.connector
import json

# Connect to MySQL and execute a query to retrieve the well list
mydb = mysql.connector.connect(
  host="192.168.1.79",
  user="michael",
  password="Cpsc471!",
  database="petromap"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT SUBSTRING(UWI, 2, CHAR_LENGTH(UWI) - 2) AS UWI FROM Well_Headers WHERE DirFlag = 'horizontal'")

well_list = [{"UWI": uwi} for (uwi,) in mycursor.fetchall()]

# Extract the UWIs from the well list
uwis = [well['UWI'] for well in well_list]

# Load the geojson file
with open('well_shape.geojson') as f:
    geojson_data = json.load(f)

# Filter the features based on the UWIs
filtered_features = []
for feature in geojson_data['features']:
    uwi_label = feature['properties']['UWI_Label'].replace('\\', '/')
    for uwi in uwis:
        if uwi in uwi_label:
            print(uwi,feature['properties']['UWI_Label'])
            filtered_features.append(feature)
            break

# Construct a new feature collection with the filtered features
filtered_geojson = {
    'type': 'FeatureCollection',
    'crs': geojson_data['crs'],
    'features': filtered_features
}

# Save the filtered geojson file
with open('filtered_well_data.geojson', 'w') as f:
    json.dump(filtered_geojson, f)
=======
import mysql.connector
import json

# Connect to MySQL and execute a query to retrieve the well list
mydb = mysql.connector.connect(
  host="192.168.1.79",
  user="michael",
  password="Cpsc471!",
  database="petromap"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT SUBSTRING(UWI, 2, CHAR_LENGTH(UWI) - 2) AS UWI FROM Well_Headers WHERE DirFlag = 'horizontal'")

well_list = [{"UWI": uwi} for (uwi,) in mycursor.fetchall()]

# Extract the UWIs from the well list
uwis = [well['UWI'] for well in well_list]

# Load the geojson file
with open('well_shape.geojson') as f:
    geojson_data = json.load(f)

# Filter the features based on the UWIs
filtered_features = []
for feature in geojson_data['features']:
    uwi_label = feature['properties']['UWI_Label'].replace('\\', '/')
    for uwi in uwis:
        if uwi in uwi_label:
            print(uwi,feature['properties']['UWI_Label'])
            filtered_features.append(feature)
            break

# Construct a new feature collection with the filtered features
filtered_geojson = {
    'type': 'FeatureCollection',
    'crs': geojson_data['crs'],
    'features': filtered_features
}

# Save the filtered geojson file
with open('filtered_well_data.geojson', 'w') as f:
    json.dump(filtered_geojson, f)
>>>>>>> origin/main
