import mysql.connector
import pandas as pd

# Connect to the MySQL database
mydb = mysql.connector.connect(
  host="testmike.ddns.net",
  user="murtaza",
  password="Cpsc471!",
  database="wirelineLASfull",
  port="3333"
)

print('Connected')

# Get a list of all the table names in the database
mycursor = mydb.cursor()
mycursor.execute("SHOW TABLES")
tables = mycursor.fetchall()

# Loop through all the table names and extract the UWI and pass_string information
data = []

for table in tables:
    g_index = table[0].index('g')
    table_name = table[0]
    uwi = table_name[:g_index]
    pass_string = table_name[g_index:]
    pass_num = int(pass_string[1:])
    data.append([uwi, pass_string, pass_num])
    print(uwi, pass_string, pass_num)

# Create a dataframe from the extracted information and write it to the database
df = pd.DataFrame(data, columns=['UWI', 'pass_string', 'pass_num'])

# Connect to the MySQL database
mydb = mysql.connector.connect(
    host="testmike.ddns.net",
    user="murtaza",
    password="Cpsc471!",
    database="petromap",
    port="3333"
)

print('Connected')

# Create a cursor object
cursor = mydb.cursor()

# Create the table if it doesn't already exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS wireline_key (
    UWI VARCHAR(255),
    pass_string VARCHAR(255),
    pass_num INT
)
""")

print('tbale created')

# Insert the data into the table
insert_query = "INSERT INTO wireline_key (UWI, pass_string, pass_num) VALUES (%s, %s, %s)"

for row in df.itertuples(index=False):
    print(row)
    cursor.execute(insert_query, tuple(row))

# Commit changes to the database and close the connection
mydb.commit()
mydb.close()