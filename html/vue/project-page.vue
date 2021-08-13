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
        <h3>Projects</h3>
        <p>
            This is a semi-random collection of projects I started and (more rarely) finished.  A lot of these were
            scoured from old hard drives and previous versions of this homepage.
        </p>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">athenamesh</div>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                </p>
                <p><b>The Solution:</b> 
                </p>
                <p><b>2021 Status:</b> 
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">node-win32ole</div>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                </p>
                <p><b>The Solution:</b> 
                </p>
                <p><b>2021 Status:</b> 
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">pydsn</div>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                </p>
                <p><b>The Solution:</b> 
                </p>
                <p><b>2021 Status:</b> 
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">mod-hpsdr</div>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                </p>
                <p><b>The Solution:</b> 
                </p>
                <p><b>2021 Status:</b> 
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">amtest</div>
            </q-card-section>
            <q-card-section>
                <p><b>The Problem:</b> 
                </p>
                <p><b>The Solution:</b> 
                </p>
                <p><b>2021 Status:</b> 
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">SuperMake</div>
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
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">AutoSlate Extractor</div>
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
                <div class="text-h5">Evochron Workaround</div>
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
                <div class="text-h5">EC2 Service Console</div>
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
                <div class="text-h5">Second Life Events Board</div>
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