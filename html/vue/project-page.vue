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
SPAN.date {
    display: inline-block;
    font-style: italic;
    padding-left: 8px;
}
A.img-link {
    color: transparent;
}
</style>

<template>
    <q-page class="q-px-md column no-wrap justify-start items-stretch">
        <h3>Projects</h3>
        <p>
            This is a semi-random collection of projects I started and (more rarely) finished.  A lot of these were
            scoured from old hard drives and previous versions of this homepage.
        </p>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">node-win32ole</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/node-win32ole" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2016-2021)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                I needed to have a <a href="https://nodejs.org/en/" target="_blank">Node.js</a> application communicate with a
                <a href="https://en.wikipedia.org/wiki/Component_Object_Model" target="_blank">COM</a> application.  A survey showed
                very few possibilities outside of a library that was out-of-date and very incomplete.</p>
                <p><b>The Solution:</b> 
                I forked the library and effectively rewrote it, from <a href="https://github.com/nodejs/nan" target="_blank">NAN</a>
                (which breaks with almost every new version of Node.js) to the newer
                <a href="https://nodejs.org/api/n-api.html" target="_blank">Node-API</a> (which abstracts internal Node.js components
                and attempts to maintain <a href="https://en.wikipedia.org/wiki/Application_binary_interface" target="_blank">ABI</a> compatibility).
                Along the way I used my knowledge of how COM works to clean up and solidify the codebase.</p>
                <p><b>2021 Status:</b> 
                This was a required component for the version of the product I was working on with my last job and it seemed to work
                very solidly for what I needed it to do (I don't think I ever saw it crash once it left testing).  I did get permission
                to release my work product as open-source and I'm hoping this is useful to others.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">athenamesh</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/athenamesh" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2020)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem: </b> 
                <a href="https://vircadia.com/" target="_blank">Vircadia</a> (previously known as "Project Athena") is an open-source fork of
                <a href="https://web.archive.org/web/20170603211157/https://highfidelity.com/" target="_blank">High Fidelity</a> that gained
                increasing traction when High Fidelity shut down.  The intent was to have a fully-distributed virtual world with no single
                point of control.  However the "metaverse servers" that connected worlds together and permitted users to easily traverse them
                has always been centralized.</p>
                <p><b>The Solution:</b> 
                My original intent was to find some form of <a href="https://www.consul.io/" target="_blank">Consul</a> or similar technology
                that could be deployed on every virtual world, where each operator of a virtual world could determine which "metaverse"
                they belonged to and each world had equal knowledge of all the others.  In the end this came down to
                <a href="https://tendermint.com/" target="_blank">Tendermint</a>, a blockchain-based system written in Go.</p>
                <p><b>2021 Status:</b> 
                I have most of the code written for a basic Tendermint-based metaverse server but not a strong idea of how it will be used
                by the virtual worlds it coordinates.  Others have written centralized services (High Fidelity did not realease their code here)
                and I'm willing to table this project for the time being, perhaps using someone else's API for creating a distributed version
                of a previously-centralized service.  We'll see where it leads, I'm not the only person involved in the direction this goes.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">SuperMake</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/supermake" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2011-2016)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                Both at work and at home I have situations where I want a series of steps to be made based on some current situation. This could
                be in the case of a database crash for instance where there are many potential places to recover the information from based on what is available, the
                quality of the data, and the time it would take to collect things together. Each of the steps involved may be small (on the level of single commands)
                but the concept of being given multiple paths and to choose the best one is the difference. An extension of the concept of the ubiquitous "make" utility.</p>
                <p><b>The Solution:</b> 
                Originally tried to use Prolog for this one (it seemed up its alley), but Prolog seems to be strictly a student language
                (i.e. very restrictive implementations) plus the lack of the "stochastic" features that I would be needing (and the fact that the language pretty much
                melted as soon as I tried to figure out how it would work if I added them) meant that I should probably just code it in a more conventional language
                (currently Python, which I haven't been that familiar with up to this point)</p>
                <p><b>2010 Status:</b> 
                In-progress, working off and on. I have a short term goal that I need something like this for in the next couple months anyhow,
                so that's a pretty good driver to keep my focus on this.</p>
                <p><b>2021 Status:</b> 
                I'm still using the scripts here with very minor modifications.  The project is still very unfinished and I don't know if I'm going to get much
                farther in its current state.  The concept still feels <i>very</i> intriguing to me, almost like ensuring a service is operating properly
                by continuously <a href="https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation" target="_blank">solving the Schrödinger equation</a>.
                I'm not convinced that python is the best way to do this though.  I've done some exploration translating the code into Go (which benefits
                from improved multithreading and stronger object typing) but I don't have a strong vision for this yet.  Especially when dealing with tasks
                requiring cooperation with multiple servers, perhaps it should be a blockchain app to benefit from being a distributed application?</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">pydsn</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/pydsn" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2014-2015)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                For a while I was very interested in the <a href="https://eyes.nasa.gov/dsn/dsn.html" target="_blank">Deep Space Network</a>,
                a collection of radio transcievers located around the world for communicating with the various exploration satellites we may
                have running at any time.  There was a lot of potential meaning here, from the satellites they were communicating with to
                the protocols they were using to the calibration procedures they used (usually involving quasars)</p>
                <p><b>The Solution:</b> 
                I did create a server monitoring job to periodically query the current DSN status, parse as much information as I could figure
                out from it, and store the results in a mysql database.  My intent was to potentially combine this with satellite location
                tracking data, looking at the communication history of that satelite, and potentially write an Android app for viewing it.</p>
                <p><b>2021 Status:</b> 
                I collected data into a mysql database for a while but ended up shutting it down as I lost interest.  Having unattended
                repeated queries to an external website is not something I feel comfortable about unless I know it's useful and not malfunctioning.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">mod-hpsdr</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/modHpsdr" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2013-2014)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                I was building an <a href="https://openhpsdr.org/" target="_blank">HPSDR</a> software-defined amateur radio and was interested in what
                I could do with it, to effectively build my own radio
                in software and customize how it behaved.  Most of the offerings up to this point looked like the software equivalent of the front plate
                of a ham radio with all the knobs, good for amateur radio operators used to a high-powered set but less useful for someone wanting to
                explore the frequencies and radio structure.  I saw solutions like <a href="https://wiki.gnuradio.org/index.php/Main_Page" target="_blank">
                GNU Radio Companion</a> and wanted to know if I could create something similar, assembling and re-assembling a radio from its components.</p>
                <p><b>The Solution:</b> 
                I wrote a number of C++ DLL files that each expose an interface that describes what each one does, its required inputs and outputs, and
                their datatypes.  I also wrote a C# orchestrator that would discover and query each of the installed modules, permit the outputs of one
                to be linked to the inputs of another (in many cases stepping directly from one c++ module to another without passing through C#), and 
                allowing the modules to display the results within the window.</p>
                <p><b>2021 Status:</b> 
                I remember writing a module for querying the HPSDR radio, setting up a frequency block, and streaming in 
                <a href="http://whiteboard.ping.se/SDR/IQ" target="_blank">IQ radio data</a>.  I also wrote a
                wrapper around an open-source <a href="https://en.wikipedia.org/wiki/Fast_Fourier_transform" target="_blank">FFT</a> library and one that
                would display a <a href="https://ham.stackexchange.com/questions/889/what-is-a-waterfall-display" target="_blank">waterfall</a> using
                DirectX <a href="https://en.wikipedia.org/wiki/Shader" target="_blank">shaders</a>.  I likely stopped work on this
                as I lost interest in HPSDR (and/or the netbook I was working on showed enough of its age that it became frustrating to work with).</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">amtest</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/amtest" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2012)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                At the time I was studying for taking a test required to receive an amateur radio "extra class" license.  All the possible test questions and
                answers are generally <a href="http://www.ncvec.org/page.php?id=338" target="_blank">made public</a> and I wanted a site that I could test myself with.
                There were other websites out there that gave sample tests, but for some reason they weren't acceptible to me at this time.</p>
                <p><b>The Solution:</b> 
                This was a pure-javascript solution that runs purely inside the browser, where all the questions can be selected in random order with shuffled
                answers.  Any diagrams required for the questions were converted to SVG and also embedded within the Javascript.</p>
                <p><b>2021 Status:</b> 
                It worked well for the time I needed it.  The test questions are changed every few years so this is likely badly out-of-date by now, but
                the program <a href="http://brains.odysseus.anderson.name/amtest/" target="_blank">is still available</a> if you want to take a look at it.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">AutoSlate Extractor</span>
                <span class="date">(2010)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b>
                I love the Palm Pilot, having something at my hands that I can use to remind me about appointments and keep track of stuff at any time is something that
                I've really missed, after going through three devices (mostly cracked screens) and realizing that no one really cares about them anymore. Anyhow, I kept
                track of my fuel purchases using <a href="https://www.standalone.com/palmos/auto_slate/" target="_blank">AutoSlate</a>, a wonderful program which would
                (when the custom conduit was installed) give you an XLS file giving a subset of information in its database everytime it syncs. Unfortunately, while I
                have a backup of every file on the palm pilot, no XLS file (and no ability to create one)</p>
                <p><b>The Solution:</b>
                I wrote a small program that opens the PDB database file that AutoSlate uses and extracts as much information out of it as I have the care (and ability) to extract.</p>
                <p><b>2010 Status:</b>
                I think I've managed to get about half the data out of the PDB file, which was most of what I cared about anyhow. Project completed to my satisfaction.
                Via the support forums I have received permission to distribute. The program is available 
                <a href="http://static.odysseus.anderson.name/AutoSlate/AutoSlateExtractor.zip" target="_blank">here</a> and its source code is 
                <a href="http://static.odysseus.anderson.name/AutoSlate/AutoSlateExtractor-src.zip" target="_blank">here</a>.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">Evochron Workaround</span>
                <span class="date">(2009)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b>
                I wanted a space game, downloaded and tried out <a href="https://www.starwraith.com/evochronrenegades/index.htm" target="_blank">Evochron Renegades</a> but found
                that it would give fatal ERROR codes everytime I ran it. Analysis with the author indicated that I either needed to free up more conventional RAM
                or uninstall my AV program and either switch to one he was using or run without. Needless to say this sounded like a really strange answer to me.
                (Although later issues with running Portal were
                <a href="https://web.archive.org/web/20160831013115/http://support.steampowered.com/kb_article.php?ref=5034-EIPV-6426" target="_blank">documented as a lack of Paged Memory</a>
                , which I guess is the same thing as conventional RAM...)</p>
                <p><b>The Solution:</b>
                I wrote a small program to run inside the Evochron process and modify some of its file caching methodologies to reduce strain on the AV program I was using
                (and yes I did eventually figure out how the AV program was interfering with the game).</p>
                <p><b>2010 Status:</b>
                This patch works for Evochron Renegades and Arvoch Conflict, Legends appears to no longer have this issue (but was way too slow for the machine I had at the time).
                It does not interfere with registration or any kind of copy protection that I know of -- I did purchase and register the game I was trying. Project completed to
                my satisfaction, distribution restricted unless/until copyright holder notices and officially either approves or doesn't care.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">EC2 Service Console</span>
                <a class="img-link q-pl-sm" href="https://github.com/odysseus654/ec2servconsole" target="_blank">
                    <q-icon color="primary" size="24px" name="fab fa-github" />
                </a>
                <span class="date">(2008-2009)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem: </b>
                <a href="https://aws.amazon.com/ec2/" target="_blank">Amazon EC2</a> is a by-the-hour machine rental service, where you are permitted to (using their API) request machines
                associated with your account be instrumented and booted with a specific hard drive image (either a stock image or one that you provide). Unfortunately their
                API is rather custom written and requires clients to be able to use. While clients have been written (and they have moderately recently released
                <a href="http://aws.amazon.com/console/" target="_blank">a web interface</a> for controlling them), it does not permit an account to be controlled by multiple users
                (such as multiple people responsible for maintaining a site under a company) without granting those users full access to the account (and for the Amazon
                web interface, access to the underlying Amazon account with all the payment information)</p>
                <p><b>The Solution:</b>
                A PHP website that stores the account information (semi-securely) and permits multiple sub-accounts to be created for people to be able to use the service
                without having to know the master EC2 credentials. It should be able to do as many EC2 operations as would make sense a PHP website to be able to do.</p>
                <p><b>2010 Status:</b>
                In-progress, I come back to this often enough that a lot of my time seems to be spent updating the API to the most recent documented version, which probably
                means that I'm not making enough progress in here quickly enough to accomplish much. Registered as a
                <a href="https://sourceforge.net/projects/ec2servconsole/" target="_blank">SourceForge</a> project.</p>
                <p><b>2021 Status:</b>
                I don't even remember working on this.  It seems like a worthy goal still although I don't have immediate need of it (and if I did I would research to see
                what other offerings have doubtlessly been developed over the last decade).  Migrated to
                <a href="https://github.com/odysseus654/ec2servconsole" target="_blank">GitHub</a>.</p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <span class="text-h5">Second Life Events Board</span>
                <span class="date">(2006-2008)</span>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem: </b>
                <a href="https://secondlife.com/" target="_blank">Second Life</a> is a virtual world where people can go in, create places and objects, and stage events.
                While the platform did allow users to create events searchable through either the website or through the client application, there wasn't an obvious way to
                see what upcoming events were scheduled at a particular location</p>
                <p><b>The Solution:</b>
                As all the non-mature events were stored in an Amazon S3 bucket with "public-list" rights, I wrote a script to synchronize its contents with a mysql database,
                combined with a web-scraper to fill in the blanks for "mature" events from the events website. Within the world there was already a publicly-available script
                to create alphanumeric signs using image sprites.  I ended up selling signs that would regularly check in with my server and display the next half-dozen
                events scheduled within the bounds of the parcel it was sitting in.</p>
                <p><b>2021 Status:</b>
                Although I did work to ensure this wasn't "hacking" for the Second Life servers, I also recognized it wasn't supported by them either. Eventually the
                Amazon S3 bucket was set to no longer itemize all registered events.  Without this it would get more and more difficult to patch the scripts to continue working
                and the effort involved exceeded the value in having it.</p>
            </q-card-section>
        </q-card>
    </q-page>
</template>