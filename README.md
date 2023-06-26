# 15-GeoJSON

Part 1: Create the Earthquake Visualization
1. Get the dataset. To do so, follow these steps
-The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site page (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and choose a dataset to visualize.
-When clicking a dataset (such as "All Earthquakes from the Past 7 Days"), JSON representation of that data will be provided. Use the URL of this JSON to pull in the data for the visualization.
2. Import and visualize the data by doing the following:
-Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
-Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
-Include popups that provide additional information about the earthquake when its associated marker is clicked.
-Create a legend that will provide context for map data.

Part 2: Gather and Plot More Data (Optional with no extra points earning)
Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. Pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplatesLinks to an external site..
Perform the following tasks:
-Plot the tectonic plates dataset on the map in addition to the earthquakes.
-Add other base maps to choose from.
-Put each dataset into separate overlays that can be turned on and off independently.
-Add layer controls to your map.

See the completed visualization HERE: https://laurenhgolden.github.io/15-GeoJSON/
