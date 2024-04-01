# COSC 231 Group 4
## BudgoTrack
### Authors: Elizabeth VonBergen, Andrew Koller, Keilyn Crayton


**WireFrame**
![wireFrame](/public/images/Wireframe.png)

**ERDiagram**
![ERDiagram](/public/images/databaseERDiagram.png)

**Architecture**
![WebArchitecture](/public/images/webArchitecture.png)


### FrontEnd

#### [HTML](https://www.w3schools.com/html/)
The frontend will be made up of static HTML documents that will be stored in the /public directory. 
For the charts I have been looking up different ways to do it and I think the simplest way would be 
to use CDNs to render charts from [Chart.js](https://www.chartjs.org/docs/latest/) I don't think we 
need to add the charts in now since we have not written an API or created the database yet. The charts
will eventually be able to be populated with data we pull from out database using the backend logic 
below. (WIP)

#### [JavaScript](https://www.w3schools.com/html/html_scripts.asp)
To handle the chart rendering and whatnot we will be using javascript along with html. The scripts
will be imported into the static html docs and will handle the user input. 

### Backend

#### [Express](https://expressjs.com/)
Since the website will need to handle user requests and process data the site needs
a runtime environment running on a server to process things like queries, and user authentication.
The runtime environment I think would be best for this is [node.js](https://nodejs.org/en) using the 
express.js framework since that is catered for web development. 

#### ReverseProxy
TODO: find out what this is and how to integrate it^

#### [MySQL](https://www.mysql.com/) 
The database I think we should use is mysql since it is a free and simple to use relational 
database that integrates well with the node.js runtime environment. Node.js will communicate with the 
database using Sequelize.

#### [Sequelize](https://sequelize.org/)
This allows us to write the database schema in javascript classes instead of using SQL statements. 
It will be easier to write the schema and CRUD statements using this instead of SQL statements.
