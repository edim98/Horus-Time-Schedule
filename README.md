# Horus Rescheduling Web Application

Hello! We are group 27 and we are proud to present our approach on the Class Rescheduling Project.

## Getting Started

The application runs alongside Tomcat which will require to setup the servlet environment. Our main working environment was IntelliJ which already had a Tomcat Deployment
utility.

### Prerequisites

Any Tomcat utility able to setup the server.

### Installing

A step by step series of examples that tell you how to get a development environment running.

Step 1) Setup the Maven dependencies.
```
This was not required in IntelliJ, but Eclipse might require it.
```

Step 2) Setup the Apache Tomcat server.
```
We tested and advice on using port :8080.
```

Step 3) Setup JRE
```
Default version: 1.8.
```

## Built With

* [Bootstrap](https://getbootstrap.com/) - Open source toolkit for developing with HTML, CSS, and JS.
* [Maven](https://maven.apache.org/) - Dependency Management.
* [Apache Tomcat](http://tomcat.apache.org/) - Open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies.
* [jQuery](https://jquery.com/) - Fast, small, and feature-rich JavaScript library.
* [PostgreSQL](https://www.postgresql.org/) - Powerful, open source object-relational database system.


## Authors

* **Adrian Pop** - *Worked on front-end, database and general contributions to the project.* - [Adrian Pop](https://git.snt.utwente.nl/s2008491)
* **Andrei Popa** - *Back-end and database developer.* - [Andrei Popa](https://git.snt.utwente.nl/s1957058)
* **Catalin Rus** - *Designer, theory crafter and enthusiastic problem solver.* - [Rus Catalin](https://git.snt.utwente.nl/s1910426)
* **Eduard Constantinescu** - *Main script developer. Best front-end to back-end integration builder.* - [Eduard Constantinescu](https://git.snt.utwente.nl/s1922629)
* **Eduard Modreanu** - *Web front-end designer.* - [Eduard Moderanu](https://git.snt.utwente.nl/s2015161)
* **Nicolas Stoian** - *Database administrator* - [Nicolas](https://git.snt.utwente.nl/s1924737)

## Supervisors

* **Remco de Man** - [Remco de Man](https://git.snt.utwente.nl/s1579886)
* **Egbert Dijkstra** - [Dijkstra](https://git.snt.utwente.nl/s1700618)
* **Kegel Reoland** - [KegelRHP](https://git.snt.utwente.nl/kegelrhp)

## Project Owner

* **Maurice van Keulen** - [Maurice van Keulen](https://git.snt.utwente.nl/keulen)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Ongoing bugs

* "Gaze of Horus" is still under development.
* The settings are functional, but there is a bug where requests can't be found after changing the name.
* Unable to change the password do to a security reason.
* If not logging out, the session cookies will not be deleted from the database and the user will be unable to log in.
* Small UI tweaks.
