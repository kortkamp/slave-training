# Slave Training

React made Visual Novel


The current great learn in this project was that using a context, all components that imports that context will be rendered when any variable of the context updates. This is as problem for me , becouse my game updates the status every 50ms. The solution for that "issue" will be using an aproach that splits the status in diferent contexts and import only the context that really matters for the component. 
