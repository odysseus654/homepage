<style scoped>
H5 {
    margin-bottom: 8px;
}
P {
    margin-bottom: 8px;
}
.project DIV.q-card__section {
    padding: 8px;
}
DIV.text-h5 {
    display: inline-block;
}
SPAN.date {
    display: inline-block;
    font-style: italic;
    padding-left: 8px;
}
</style>

<template>
    <q-page class="q-px-md column no-wrap justify-start items-stretch">
        <h3>The TeamWork Group, Inc.</h3>
        <p>
            An overview of the work I did while I was at The TeamWork Group, Inc.
        </p>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">The Beginning</div>
                <span class="date">(1999-2008)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    I was originally hired to create <a href="https://www.crystalreports.com/" target="_blank">Crystal Reports</a>, something that I had no knowledge
                    or experience with and was initially worried was a job I wasn't a good fit for.  After a month or two though I did start feeling more comfortable
                    about what the company was about and how I could contribute to it and started to push for more developer access.  At the time the product was a
                    <a href="https://www.sap.com/products/sql-anywhere.html" target="_blank">Sybase</a> database engine on a central machine in a local network with a collection
                    of Windows executables on workstations that would connect to it.  In 2001 I started using <a href="https://nongnu.org/cvs/" target="_blank">CVS</a>
                    (and later <a href="https://subversion.apache.org/" target="_blank">SVN</a>) to keep track of the .zip files I was getting from the primary developer,
                    to track code changes and my contributions to it (I kinda figure that it had value to me even if I was the only one using it).
                </p>
                <p>
                    The feedback I was getting from my boss regarding the changes I was making to our product was generally positive; there had apparently previously been much
                    frustration that one bugfix would create three others while the changes I made were relatively stable even before any testing occurred. Over time
                    more responsibility for developing and maintaining the codebase migrated to me, the previous primary developer left the company in 2007.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">Core Rewrite</div>
                <span class="date">(2003-2014)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    Over time it became increasingly more obvious there was a high cost of making any significant changes.  Most data
                    operations went through a class named CGridDialog, a user-interface class that had a large number of assumptions as to how it was to be displayed
                    to the user.  The retrieved data was stored solely in a UI class in its formatted form, which had a large performance hit as any data load operation
                    was also a ui update operation.  Nearly every function that accepted a table name would immediately parse it in case it was passed in the form
                    "Owner.Table" (and then assume the owner was DBA). I think my breaking point was when dealing with formatted costs, where I needed a sum of a
                    column of formatted costs and found myself backing out international formatting rules one-by-one from each of the formatted and rounded values.
                </p>
                <p>
                    This was what I wrote at the time describing my thinking:
                    <q-card class="q-ma-md">
                        <q-card-section>
                            <div class="text-h6">Reasons to Move</div>
                            <p><b>Cruft -</b> The main TeamWork executable was developed incrementally with no overall design or for a design which changed
                            significantly from the time that the executable was first laid out. This has led to severe balkanization of the codebase as
                            features were added to a system that did not design for them and was not easily expandable to coherently encompass them.
                            This leads to inflexibility and great difficulty in removing assumptions, for instance that the database is an ASA database and
                            that all tables have DBA as an owner. It also leads to potential security issues as each module is independently developed and
                            there is no central security model to enforce permissions.</p>
                            <p><b>Data manipulation inside the UI -</b> A significant chunk of the code in TeamWork is stored in a single class responsible
                            for displaying and dealing with a grid object (originally a 
                            <a href="http://active-x.com/ActiveX/FarPoint_TechnologiesInc/Spread/" target="_blank">FarPoint</a> grid, but modified to use a
                            <a href="https://documentation.help/Dundas/index.htm" target="_blank">Dundas</a> grid). All data retrieved from the database is
                            stored in the grid object (and visible to the user). This leads to problems separating displayed values from data values
                            (currency and internationalization had to be converted back and forth from the display form to the integer form) and speed issues
                            (the grid was always aware of how many rows we had retrieved from the database, so the user saw us loading 25 rows at a time
                            and we were slowed by our need to format the data for display). This also locked us in to using a grid object for the majority
                            of user-driven data manipulation, even if that grid object was hidden on the screen.</p>
                            <p><b>Assumption of a desktop environment -</b> TeamWork.exe is a single file that can only be launched as a single-user desktop
                            application. Any code and actions in this application can only be reached by running the program on someone's desktop. This makes
                            it nearly impossible to do actions such as unattended or scheduled operations, intelligent web pages, and the like. The code in
                            the executable needs to be copied into a form that can be launched without a user interface.</p>
                        </q-card-section>
                        <q-card-section>
                            <div class="text-h6">Development Focus</div>
                            <p>NextGen will over time contain cruft and become inflexible and unmanageable; any complex software that is in continuous
                            development has this difficulty. The first task that it will be requested to perform is one that it will not have been designed
                            to do and will have to be modified to perform. However, if a strong bedrock is formed first, then it is my hope that the lifetime
                            of the nextGen codebase is longer than its predecessor and that the next rewrite will be much easier to do. The following are
                            lessons that I used as constraints when creating nextGen:</p>
                            <p><b>No assumption as to the database -</b> The previous version of our product was written against an ASA engine and shows
                            entire swaths of code assuming that all our tables was owned by the DBA user, to the point at which I do not believe it worth
                            my while to attempt to attempt to remove this assumption. The NG code at this point asks the ODBC driver for as much information
                            as possible. If our code is modular enough to allow just about any database action to be hot-swappable, we may be able to get
                            away with a program that automatically discovers and adjusts to the requirements of the engine it is connected to.</p>
                            <p><b>No assumption as to the caller</b></p>
                            <p><b>Maintain portability</b></p>
                            <p><b>Strings have no special meaning -</b> The previous version of our product would communicate table names as a string in
                            "DBA.Table" form and columns as "Table.Column". This format prevented the executable from assuming what the format of the string was
                            (what if it were only a table name?) and require it to continuously parse and combine strings when passing information back and forth.
                            This makes the code delicate (too many assumptions as what a table name looks like and how to "repair" it) and difficult to modify.
                            In these two cases the special meaning is in the "." character. Our strings should whenever possible be opaque, string that have
                            meanings (such as tables and columns) should be passed in as objects containing all the required information (with opaque strings).
                            These objects can be expensive to build, but the intent is that once they are created then all the required information is available
                            to applications without additional repeated processing.</p>
                            <p><b>As little sanity checking as possible -</b> Too many applications have failed due to the infamous "buffer overflow" bug,
                            along with other common issues that programmers overlook. The code should isolate as much as possible problematic code.
                            The majority of the code should not require any special escaping or checks to make sure that unexpected situations are not occurring,
                            it should just work and inherently handle such situations without breaking. Conversely, all code that is designed to make the
                            rest of the application work safely should operate with as few assumptions as possible, having a generic case that works in all
                            situations is better than needing to check for a number of cases that would fail.</p>
                            <p><b>C++ has exceptions, so use them</b></p>
                        </q-card-section>
                    </q-card>
                </p>
                <p>There were a few other things I remember coming up with over the years:</p>
                <p><b>Coding as layers -</b> We need to be able to maintain flexibility and react quickly to changing requirements, but we also need
                reliability and security in what we do.  Because of this the product needs to be written in layers, with the innermost layer being
                the most-trusted, least-changeable, and most-optimized, while the outermost layer is rough, quickly changeable, and leans completely
                on lower layers for its stability; if it fails there isn't much impact and not much to exploit that isn't protected against elsewhere.
                Code style is therefor enforced extremely strictly on the core while minimally maintained on the outer scripted layer.</p>
                <p><b>Conservation of Flexibility -</b> The previous codebase was written in a fairly lax manner, which over time made it more difficult
                to add new features without somehow twisting the code into a form that the existing code would expect.  With the newer version I tried
                rather hard to have a single pathway for a task, to have a very stringent way that things must be done.  The thinking was that the more
                restrictive the core was written the more flexibility it would afford to the outer layers</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">Moving to the Internet</div>
                <span class="date">(2003-2021)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    The need to migrate away from a workstation executable into an Internet-accessible website occurred to a number of us at a similar time.
                    I was working on the core rewrite (called NG for "Next Generation") which was a library that could be incorporated into either a
                    new Windows executable or the core of a new website, however it was nowhere near ready to use by the time it became obvious we needed to
                    push hard down this path.
                </p>
                <p>
                    The first version of our website ended up being bespoke <a href="https://www.bisend.com/blog/what-is-classic-asp" target="_blank">ASP</a>
                    site written in <a href="https://en.wikipedia.org/wiki/VBScript" target="_blank">VBScript</a> that would connect to the database and run
                    hardcoded queries against it.  I did support and develop this site as much as I could while also pushing towards the c++ data-driven model
                    I had been working on.
                </p>
                <p>
                    In 2008 the c++ "NG" core had been developed to a point where it could start being used in the web product and we started migrating the
                    code over to using it.  The new core was wrapped with a <a href="https://en.wikipedia.org/wiki/Component_Object_Model" target="_blank">COM</a>
                    object wrapper where we could use our existing VBScript but simply use it to receive requests and pass them on to the c++.  The behavior of
                    the c++ was built up to use a version of the data-driven rules we had previously developed for the windows executable and therefore could be
                    customized at least as easily as the desktop product could be.
                </p>
                <p>
                    Apart from the server-side VBScript and C++ the website was written in Javascript, with data communication from the server in XML.
                    From 2006-2016 the site was built on top of <a href="http://prototypejs.org/" target="_blank">Prototype</a>, in 2011 we migrated
                    it to <a href="https://jquery.com/" target="_blank">jQuery</a>.  I pushed strongly to adopt a 
                    <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC</a> architecture which made
                    heavy use of <a href="https://en.wikipedia.org/wiki/XSLT" target="_blank">XSLT</a> templates to transform the XML data sent from
                    the server into HTML that could be inserted into the page; the intent was that changing to a different XSLT template could completely
                    change the look and feel of an app as may be needed (in practice there were only a couple templates written outside of the standard
                    "grid/spreadsheet" template).
                </p>
                <p>
                    In 2015 we added a websocket connection to a <a href="https://www.rabbitmq.com/" target="_blank">RabbitMQ</a> server using the
                    <a href="https://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol" target="_blank">STOMP</a> protocol, so the c++
                    core could send notifications of data-loading actions with less latency than the previous 
                    <a href="https://dev.to/bibekkakati/short-polling-vs-long-polling-2fme" target="_blank">short-polling</a> technique could handle.
                    This was only ever one-way though (with the webpage receiving but not sending messages), the webpage would only send data to the
                    server through the existing <a href="https://www.ibm.com/cloud/learn/rest-apis" target="_blank">REST</a> API.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">Hosted Service</div>
                <span class="date">(2008-2017)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    Up to this point our product was only used within an intranet, where we would install a database server on one machine and setup a number
                    of workstations to connect directly to the database engine.  In 2008 we contracted with a hosting company to setup a number of virtual
                    machines on a single large physical server.  We had one VM for the database engine and two "workstation" Citrix Server VMs running the
                    Windows executable.  All authentication was done via Microsoft Active Directory, which would demand a password only once when logging into
                    the Citrix environment.
                </p>
                <p>
                    The fledgeling web application did initially make an appearance here as a web browser accessible within the Citrix environment (so the user
                    wouldn't have to log into the site) but was not heavily adopted by our users.  Over time we exposed the webapp to the open Internet and
                    had users log in through the site rather than through Citrix; as we gained clients not using our Citrix environment (and the AD login servers)
                    our webapp solution started getting heavier use.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">Amazon Web Services</div>
                <span class="date">(2017-2021)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    The hosting solution we had up to this point involved a contract that was executed yearly for a large physical machine to
                    be installed in a datacenter and setup by an employee over a period of weeks.  It incorporated a number of technologies to maintain reliability
                    (at least as much as one could do with only a single physical box) including 
                    <a href="https://www.acronis.com/en-us/articles/whats-raid10-and-why-should-i-use-it/" target="_blank">RAID-10</a> on all the hard drives and
                    separate VMs that could handle the load in case one of them got overloaded or needed maintenance. However in the end there is only one physical
                    server that we were paying for and its size was dictated by the contract we had signed at the start of its term.
                    One time we were heavily overloaded by having clients place too much load on the server, by the time we had increased capacity we became
                    heavily underutilized, paying for capacity we weren't able to use.
                </p>
                <p>
                    I was aware of and familiar with <a href="https://aws.amazon.com/" target="_blank">AWS</a> almost since the point it opened up and
                    started allowing users from outside the company to start leasing its servers.  I championed the move from our hosting solution to Amazon,
                    in the short term as a money-saving step, in the longer term as a money-<i>flexible</i> step; we needed the ability to be able to scale up and down
                    as our customer base changed and that simply wasn't possible when signing a yearly contract where one has to guess what was going to happen
                    over the next twelve months.
                </p>
                <p>
                    There was some anxiety about moving from our previous well-protected RAID-10 hosted solution to one where we needed to be okay with machines
                    failing at any time for any reason, I had written several layers of system recovery depending on what part failed (I remember once reconstructing
                    a corrupted database in the middle of a sales presentation using that same database).  Some measures that were done included
                    having every database be on its own virtual drive on the database server that could either be yanked out of the machine and shoved into another
                    box (or resized if the database got too large) without affecting the other databases on the same server, automated backups of every database
                    into an <a href="https://aws.amazon.com/s3/" target="_blank">S3</a> datastore, having a stripped down windows installation in a different
                    datacenter continuously backing up every production database so as to have an up-to-date version in case of catastrophic loss of a datacenter,
                    and regular machine-image backups so a new one could be spun up in case of a hardware failure.
                </p>
                <p>
                    With all the preparations that were made and testing that was done, the migration from our hosted solution to Amazon went incredibly smoothly;
                    there was a two-hour downtime in the middle of the night, but a user returning to a screen they had left the next morning would not have
                    noticed any changes.  My boss asked repeatedly during testing for confirmation that the migration had indeed occurred things had gone so smoothly.
                </p>
                <p>
                    This is also when I launched three small linux boxes (each one in a different datacenter) running 
                    <a href="https://www.consul.io/" target="_blank">Consul</a> (and later <a href="https://www.rabbitmq.com/" target="_blank">RabbitMQ</a>).
                    None of the servers had direct links to any of the others, but they did connect to the same Consul cluster and could discover each other
                    through its shared data services.  This would permit a database to come up, broadcast the databases it was serving, and start receiving
                    queries automatically from instances looking for that particular database.  I also over time pulled some larger tasks out of the webserver
                    into <a href="https://aws.amazon.com/lambda/" target="_blank">Lambda</a>; previously three people running complex reports at the same
                    time could overload the webserver trying to process the results, now our server did a fraction of the work with the Lamba function simply
                    grabbing more servers as-needed to handle the requests.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">The Next Version</div>
                <span class="date">(2020-2021)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    As I wrote when starting the core rewrite, all software begins to collect cruft 
                    (or "<a href="https://en.wikipedia.org/wiki/Technical_debt" target="_blank">technical debt</a>") as it is developed, although focusing on
                    building a strong foundation and good techniques reduces the rate at which it gathers.  The front-end browser interface was
                    developed before the c++ "NG" core was made available and had assumptions affecting performance and making it difficult
                    (or impossible) to handle certain error conditions.  On the server side we were still dealing with an obsolete scripting language (VBScript)
                    that was strictly RESTful and could not give status feedback or be interrupted.
                </p>
                <p>
                    One focus of concern was the XSLT transformations, which controlled the look-and-feel of the product and also was kept separate from
                    the code defining its behavior.  Not only was XSLT dependent on XML for its input and output (which has been effectively replaced
                    by the much more compact JSON), there was discussions for 
                    <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/zIg2KC7PyH0" target="_blank">dropping browser support</a> for it as
                    an obsolete technology.  I was unable for years to find any anything that could replace it while maintaining
                    MVC separation -- most libraries freely mixed HTML with Javascript, making it very difficult to not build a unified wad of
                    code.  Vue was the first library I found as a possible replacement for XSLT.
                </p>
                <p>
                    <a href="https://vuejs.org/" target="_blank">Vue</a> had two aspects that stood out to me.  First of all, Vue introduces 
                    <a href="https://symfonycasts.com/screencast/vue/single-file-component" target="_blank">its own filetype</a> for isolating view
                    descriptions from the rest of the system, which is analagous to what I was using XSLT for.  Secondly, its use of a
                    "<a href="https://blog.logrocket.com/how-the-virtual-dom-works-in-vue-js/" target="_blank">virtual DOM</a>" allows for much
                    higher performance and smoother updates; way too much code has been written in previous efforts to update an existing DOM without
                    flashing or losing focus.  This also means we can reduce the number of DOM elements in the page (critical for performance) and
                    do things like <a href="https://developer.android.com/guide/topics/ui/layout/recyclerview" target="_blank">virtual lists</a>
                    which would otherwise be technically difficult to achieve.
                </p>
                <p>
                    This front-end rewrite would also permit stronger separation from the back-end.  Rather than having an IIS webserver handle all
                    the content the browser logic was moved into a <a href="https://aws.amazon.com/cloudfront/" target="_blank">CDN</a> which
                    would then establish a websocket connection to our messaging cluster; all communication with the back-end would be done through
                    that connection.  This would isolate our publicly-visible footprint (outside of the CDN) to a cluster of servers (with no
                    direct access to the database) which was designed to easily scale with need.  The back-end logic would connect to the same
                    messaging cluster and didn't need to be a webserver, this also opened up the possibility of migrating away from IIS and to Linux.
                    I wrote the back-end as a multi-process Node.js service that would receive messages from the broker, dispatch them to child
                    processes, which would connect to the existing c++ core service and process them.
                </p>
                <p>
                    The data going over the websocket (outside of the c++ notifications we inherited from the previous webapp version) was primarily a REST-like
                    interface initially using JSON (with the possibility of status updates and request cancelations).  The protocol was eventually
                    migrated to a variation of <a href="https://datatracker.ietf.org/doc/rfc3072/" target="_blank">SDXF</a>
                    (ugh, the worst-written RFC I have ever read in my life), which I adopted (initially for Android efforts) after not finding
                    anything available that could be self-describing, compact without too many "optimizations", and didn't require parsing.
                </p>
                <p>
                    I jumped on this project and made it my top priority when my workload let up and it became increasingly obvious that we needed
                    an updated product in order to remain viable in the long term.  I worked about a year on it and managed to get it almost to
                    <a href="https://en.wikipedia.org/wiki/Eating_your_own_dog_food" target="_blank">"dogfood"</a> stage by the time the company
                    started shutting down.
                </p>
            </q-card-section>
        </q-card>
    </q-page>
</template>