import json

# Load the GeoJSON file
with open('server/data/old_horizontal_well_data.geojson') as f:
    data = json.load(f)

# Create a dictionary to store the unique UWI_Label values and their count
unique_uwi_labels = {}

# Loop through each feature in the GeoJSON data
for feature in data['features']:
    # Get the UWI_Label value for this feature
    uwi_label = feature['properties']['UWI_Label']
    # If this UWI_Label has not been seen before, add it to the dictionary with count 1
    if uwi_label not in unique_uwi_labels:
        unique_uwi_labels[uwi_label] = 1
    # If this UWI_Label has been seen before, update it with count
    else:
        unique_uwi_labels[uwi_label] += 1
        uwi_label = uwi_label + '_' + str(unique_uwi_labels[uwi_label])
    # Set the UWI_Label value for this feature to the new unique value
    feature['properties']['UWI_Label'] = uwi_label

# Write the modified GeoJSON data back to a file
with open('horizontal_well_data.geojson', 'w') as f:
    json.dump(data, f)

# Print the labels and their values that had a count greater than 1
for label, count in unique_uwi_labels.items():
    if count > 2:
        print(label, count)
