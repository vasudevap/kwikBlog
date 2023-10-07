# kwikBlog - MVC software design pattern
![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)

## DESCRIPTION

A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. kwikBlog uses Model-View-Controller (MVC) framework, which is an architectural/design pattern that separates an application into three main logical components Model, View, and Controller. Each architectural component is built to handle specific development aspects of an application. MVC isolates the business logic and presentation layer from each other.

kwikBlog Features:
* user login and signup
* homepage - lists blogs from all users showing title, blog text, username, and date the blog was added
* dashboard - lists blogs from signed in user showing title and blog text
* login - displays if user is not logged in and allows loggin in - also provides link with option to sign up
* logout - logs out a signed in user
* not 'signed in' user actions:
    * view all blogs and comments on homepage
    * sign in via login page by providing username and password
    * sign up via login page (click link to sign up) by creating a username and password
* 'signed in' user actions:
    * create comments on blogs displayed on the homepage
    * create own blog from the "New Post" button on dashboard
    * update own blog from dashboard
    * delete own blog from dashboard


# TABLE OF CONTENTS

1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)

# LINKS

* For the LIVE application URL located on Heroku, [click here](www.google.com)
* For the application source code located on GitHub repo, [click here](https://github.com/vasudevap/kwikBlog.git)

# INSTALLATION
The live version of the app is located on Heroku and can be accessed via link in the [links](#links) section.

The source code is available on github (link in [links](#links) section).  Instructions to download and install:

* PREREQ
    * ensure node js is installed
    * ensure express is installed
    * ensure mysql is installed and running
    * ensure port 3001 is available

* INSTALLATION:
    * download the source from github by cloning the repo locally
    * open the terminal and perform the following steps
    * log into mysql as root and run `source ./db/schema.sql`
    * quit mysql and return to the terminal prompt
    * from the root folder, run ``npm install`` to add dependencies
    * from the root folder, run ``npm run start`` to open listening port
    * optional - to seed the database open a new terminal and from the root folder run `node ./seed/seed.js`
    * launch a browser and navigate to ``localhost:3001`` to run the blog website


# USAGE
With the server running, navigate to the URL `localhost:3001` to launch the web app, then:
1. The `Homepage` shows a list of blogs and comments in the database
2. To perform rest of the functions below, log in using the `login` link from the top menu
3. To register/sign up, select the `sign up instead` link at the bottom of the login form
4. To write a comment, while logged in, click the blog from the `Homepage` and leave a comment in the form provided
5. To view your own blogs, click on `Dashboard` from the top menu
6. To update a blog, click on your blog from the Dashboard and after updating, click the `Update` button
7. To delete a blog instead of updating, click the `Delete` button instead of the `Update` button
  

# CONTRIBUTING
More the merrier!  To get involved please message me at my [github](https://github.com/vasudevap)


# TESTS
Testing scripts may be provided upon request


# LICENSE
[GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0)
 General Public License is a free, copyleft license for software and other kinds of works.

The licenses for most software and other practical works are designed to take away your freedom to share and change the works. By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.

When we speak of free software, we are referring to freedom, not price. Our General Public Licenses are designed to make sure that you have the freedom to distribute copies of free software (and charge for them if you wish), that you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free programs, and that you know you can do these things.

To protect your rights, we need to prevent others from denying you these rights or asking you to surrender the rights. Therefore, you have certain responsibilities if you distribute copies of the software, or if you modify it: responsibilities to respect the freedom of others.

For example, if you distribute copies of such a program, whether gratis or for a fee, you must pass on to the recipients the same freedoms that you received. You must make sure that they, too, receive or can get the source code. And you must show them these terms so they know their rights.

Developers that use the GNU GPL protect your rights with two steps: (1) assert copyright on the software, and (2) offer you this License giving you legal permission to copy, distribute and/or modify it.

For the developers' and authors' protection, the GPL clearly explains that there is no warranty for this free software. For both users' and authors' sake, the GPL requires that modified versions be marked as changed, so that their problems will not be attributed erroneously to authors of previous versions.

Some devices are designed to deny users access to install or run modified versions of the software inside them, although the manufacturer can do so. This is fundamentally incompatible with the aim of protecting users' freedom to change the software. The systematic pattern of such abuse occurs in the area of products for individuals to use, which is precisely where it is most unacceptable. Therefore, we have designed this version of the GPL to prohibit the practice for those products. If such problems arise substantially in other domains, we stand ready to extend this provision to those domains in future versions of the GPL, as needed to protect the freedom of users.

Finally, every program is threatened constantly by software patents. States should not allow patents to restrict development and use of software on general-purpose computers, but in those that do, we wish to avoid the special danger that patents applied to a free program could make it effectively proprietary. To prevent this, the GPL assures that patents cannot be used to render the program non-free.


# QUESTIONS
Please reach me at [vasudevap](https://github.com/vasudevap) or at my email at prashant.vasudeva@gmail.com
---

