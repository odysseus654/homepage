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
    <div class="q-px-md column no-wrap justify-start items-stretch">
        <h3>Interests</h3>
        <p>
            A loose collection of interests I've had over the years
        </p>

        <q-card class="project q-ma-md" id="interests-sc" ref="interests-sc">
            <q-card-section>
                <div class="text-h5"><a href="https://robertsspaceindustries.com/" target="_blank">Star Citizen</a></div>
                <span class="date">(2012-)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    As stated elsewhere I have been generally interested in space exploration games much of my life, although over time I have
                    gotten disillusioned by single-player games and have wanted to find one I could find a community in.  When
                    <a href="https://www.kickstarter.com/projects/cig/star-citizen" target="_blank">the Kickstarter</a> went live in 2012 I did
                    jump into it and was involved for a couple years, however over time (and with increasing calls of it being a "scam") I
                    stopped focusing on the project; my thinking was that (like any kickstarter) if it comes out to something wonderful then
                    great, but if not I wasn't going to regret the money I had put into it.
                </p>
                <p>
                    I started focusing it more early in 2020 and realizing there was a lot more content available since the "Hanger Module"
                    first was released when I was last active and that its development had picked up significantly within the last couple years.
                    I did start both get more involved in the community (joining an organization) as well as contributing more money to it.
                </p>
                <p>
                    I am still interested in following the progress, however I'm starting to wonder if I may have reached the limits of the
                    current offerings.  I still want to be involved but I can see myself pulling back a bit and returning later to see
                    what else has been done.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md" id="interests-vircadia" ref="interests-vircadia">
            <q-card-section>
                <div class="text-h5"><a href="https://vircadia.com/" target="_blank">Vircadia</a></div>
                <span class="date">(2018-)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    In my mind Second Life started going downhill when it's creative heads ended up being replaced by people more interested
                    in managing the money and income aspects of the project.  At the time I heard that the original group had migrated to a project named
                    <a href="https://web.archive.org/web/20170603211157/https://highfidelity.com/" target="_blank">High Fidelity</a>, a
                    virtual world built on a rethought engine.  I was incredibly interested but my computer at the time
                    wasn't strong enough to log into the system (although I did try).
                    Unfortunately shortly after I got a new computer and began to get involved they
                    <a href="https://web.archive.org/web/20200808205112/https://www.highfidelity.com/blog/updates-and-a-new-beginning" target="_blank">
                    started effectively shutting down</a>.  Much of their stuff was open-source and a number of us made backup copies of what we
                    could reach before things started disappearing and saving what we could of the worlds they had.  The open-source fork
                    with the most people I found in-world was initially called "Project Athena" but was eventually renamed to "Vircadia".
                </p>
                <p>
                    My strongest attraction to this (especially compared to Second Life) is that the assumptions in the engine are different
                    enough to allow much more flexible constructions.  In addition, with the code being open-source I have the ability to add
                    the needed capabilities to support the builds I wish to do.  I have
                    <a href="https://github.com/vircadia/vircadia/pulls?q=+is%3Apr+author%3A%40me+" target="_blank">a number of contributions</a>
                    to the project, including writing scripts to create <a href="https://en.wikipedia.org/wiki/Deb_%28file_format%29" target="_blank">
                    .DEB</a> and <a href="https://en.wikipedia.org/wiki/RPM_Package_Manager" target="_blank">.RPM</a> packages of the servers as well
                    as a number of bugfixes.
                    I have a number of larger projects I am either planning or have been working on, such as reorganizing the code to replace
                    the scripting engine in use, cleaning up the networking protocol to permit negotiations, and increasing the maximum size
                    of the worlds the system can handle.
                </p>
                <p>
                    I think my biggest concerns with Vircadia at this point is that in the end it is just an engine, and while there are a small
                    group of users and creators, it doesn't have a large community or many assets beyond those that carried over from High Fidelity.
                    Any work that I do here needs to be for its own benefit or for the ability for me to create what I want for myself, without
                    expectation of anything bigger.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md" id="interests-ed" ref="interests-ed">
            <q-card-section>
                <div class="text-h5"><a href="https://www.elitedangerous.com/" target="_blank">Elite: Dangerous</a></div>
                <span class="date">(2019-2021)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    I have been interested in space exploration games for much of my life.  I had put off looking at Elite: Dangerous for years
                    though, thinking its focus was a little too much on fighting for my taste.  When I ended up trying it out though I found
                    a rather comprehensive galaxy simulator that I enjoyed for quite some time, exploring to see what was available and going
                    for months into "the Black" trying to reach the center of the galaxy.
                </p>
                <p>
                    I did end up putting this down for a bit and focusing on other things, but didn't have a strong reason to.  I keep thinking
                    that I might return to this and see what more I can get out of it, but their recent botched release of "Odyssey" and the
                    resulting turmoil in the community is something keeping me away until things calm down enough for me to decide whether it's
                    worth trying again.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md" id="interests-iw" ref="interests-iw">
            <q-card-section>
                <div class="text-h5"><a href="https://web.archive.org/web/20180805103536/https://inworldz.com/" target="_blank">InWorldz</a></div>
                <span class="date">(2016-2018)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    InWorldz was a virtual world based on the same technology of Second Life (using the same client program, but with an open-source
                    server replacement).  The first time I seriously logged in I found I had apparently created an account several years prior.
                    I found a world with a significant number of assets, something built up that could actually be considered a "world"
                    rather than an empty holodeck waiting for creators.  The low land prices combined with the operator's promise to protect 
                    creator rights felt like there was potential for building where Second Life lacked, for creating worlds where creativity could
                    flourish without worrying where the next paycheck came from.
                </p>
                <p>
                    It feels to me that a virtual world requires three pieces to be successful: a stable software platform that grants the abilities
                    and flexibility to easily create the world, a collection of assets built up over the years by generations of creators, and a
                    stable community of people in and supporting the world.  InWorldz had the first two and the capability of the third but... while
                    I was there I was often the only one logged into the servers at the time.
                </p>
                <p>
                    InWorldz disappeared when a billing dispute rose between the operator and PayPal and the servers hosting the content were deleted.
                    There have been a number of other "grids" attempting to recapture what InWorldz had but they didn't have the time needed
                    to build up the content and had enough internal conflicts as to make a stable environment difficult to maintain.  Along with
                    increasing frustration with the lack of capabilities on an aging platform, I haven't been interested in looking for a replacement.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md" id="interests-ham" ref="interests-ham">
            <q-card-section>
                <div class="text-h5">Amateur Radio</div>
                <span class="date">(2008-2018)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    I had been curious about amateur radio for a number of years (there was someone with a radio at a science-fiction
                    group I was a part of) but for a long time I didn't really know how to "get into" the program.  Eventually I found a group and
                    figured out how to get my license.  I was easily known in the group for my computer knowledge, and while much of that did crossover
                    into knowing how radios work a lot of it didn't; I remember being frustrated trying to figure out what a "power supply" was,
                    one person responded by handing me instructions on how to build one from a microwave oven.
                </p>
                <p>
                    I quickly realized that once I had a license, the best way to actually make use of it was to join an ECOMM (Emergency Communications)
                    group.  These groups consisted of amateur radio operators working with the local police, sheriff, Red Cross, or other agency
                    to both provide communication during events and train for <a href="https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c" target="_blank">
                    helping out in disasters</a>.  I did help out a number of years with
                    <a href="https://skitosea.com/" target="_blank">SkiToSea</a>, in a number of races, and events that required coordination of cars
                    and people.
                </p>
                <p>
                    At the same time I got increasingly interested in the <a href="https://openhpsdr.org/" target="_blank">HPSDR</a> project, where
                    a radio could be built that grabs a huge chunk of the radio spectrum and permits a swath of it to be interpreted and understood
                    by software.  The ability to take a frequency block and take it apart and see how it ticks, the ability to put a radio together
                    inside a computer by dragging the equivalent of a flowchart together, was very appealing to me.  I did end up getting the parts
                    for a basic SDR capable of receiving all frequencies below 65 MHz (and some of the pieces required to transmit) and worked to
                    get a relatively "mobile" setup running with my netbook at the time.  I'm thinking in retrospective that my biggest limitation
                    was the lack of knowledge of how radios (and avoiding interference) works, and also a lack of time to dedicate to working on the
                    project.
                </p>
                <p>
                    My view of the amateur radio community is of a group struggling to figure out what their purpose is.  In the past it was
                    the forefront of radio design and development, but since then so many patents have been taken out that any radio using
                    modern techniques such as trunking or digitial encoding would be restricted against most forms of "tinkering". Our society has
                    also moved on; the once-strange idea of communicating with someone on the other side of the world can be done today by nearly
                    anyone without thinking, and the mantra of "when all else fails" doesn't work when society doesn't know to turn to amateur radio
                    operators when things stop working (and the limitations of amateur radios made handling emergencies difficult).  In the end,
                    radio operators find themselves either in their own relatively exclusive chat room or as volunteers in an organization using
                    more capable radios.
                </p>
                <p>
                    I did eventually leave the community for a couple of different reasons, most of them social.  The ECOMM groups are all allied with
                    law enforcement in some way and I was not and could likely never have interest in being an officer.  That and the typical age 
                    of a radio operator made it more difficult to be part of that group with some of the personal issues I have been going through.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md" id="interests-sl" ref="interests-sl">
            <q-card-section>
                <div class="text-h5"><a href="https://secondlife.com/" target="_blank">Second Life</a></div>
                <span class="date">(2006-2008)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    With my recent time in Uru I discovered Second Life, which promised to be a place where I could create my own worlds, to explore and experience
                    the creativity of others.  And it kinda was, more in the beginning though.  I treasured finding places like an island full of AI-powered evolutionary
                    creatures, of four-dimensional houses where (if you don't look too closely) you could find yourself going through the wrong series of doors and find yourself
                    walking on the ceiling.
                </p>
                <p>
                    However, the world started aging over time and a lot of it came down to money.  At the beginning the company running the grid wanted to have as much
                    creativity blooming as possible so they would sponsor new user welcoming committees, and land fees would be waived if you were a "university" educating
                    "residents" on how to create things or had something creatively significant.  However these got shut down one-by-one, land prices kept going up, and
                    those with creative builds struggled to pay the monthly bill and not have their work get summarily deleted.  If you were "renting" from someone else
                    (i.e. not paying Second Life directly for the land) then you could find your creations deleted unexpectedly through something going wrong with the middleman
                    (the lack of contract law felt very problematic to me, especially it prevented a group from being collectively financially responsible).
                </p>
                <p>
                    Also, the people behind the company as well as its intent changed over time.  When I came on the people running the company were visionaries trying
                    (and succeeding) to create something new.  There was a fair amount of work done on making Second Life not only a virtual world they controlled but
                    also one that <a href="http://wiki.secondlife.com/wiki/Open_Grid_Public_Beta" target="_blank">could federate to become a distributed group of worlds</a>.
                    Over time the people working on this were pushed out and replaced by investors that seemed to be more interested in getting as much value out of this
                    surprising success as they could.
                </p>
                <p>
                    In the end, most places either died and were abandoned or were converted into malls and dance areas (the only ways people could make enough money
                    to still exist).  Most land that was bought directly from the company (except for the dedicated islands) ended up being abandoned and empty; the
                    mechanism where unowned land is resold seems to have ground to an effective halt.  This cut off most ability for communal areas rather than
                    walled gardens. A few special places were chosen to be "bought" by the company running the world, the island with the AI birds is still there
                    but all the animals on it died long ago; no one visits anymore, there's no reason to.
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md" id="interests-cyan" ref="interests-cyan">
            <q-card-section>
                <div class="text-h5"><a href="https://cyan.com/" target="_blank">Cyan Worlds</a></div>
                <span class="date">(circa 1998-2006)</span>
            </q-card-section>
            <q-card-section>
                <p>
                    I don't have strong knowledge of when I started focusing on Cyan, I know I played their game 
                    <a href="https://en.wikipedia.org/wiki/Myst" target="_blank">Myst</a> early in school and was very much into a similar (but less well-known)
                    later game named <a href="http://obsidian.internetwhiteknight.com/" target="_blank">Obsidian</a>. When Myst's sequel
                    <a href="https://en.wikipedia.org/wiki/Riven" target="_blank">Riven</a> came out I started participating more on message boards with 
                    other players, exploring the world they built and the philosophical questions it raised.
                </p>
                <p>
                    When Cyan started putting together <a href="https://archive.guildofarchivists.org/wiki/Uru:_Ages_Beyond_Myst" target="_blank">an MMORPG based on Myst</a>
                    (and renamed themselves <a href="https://youtu.be/ob2Unym9nUQ" target="_blank">"Cyan Worlds"</a>), I was excited and my online involvement
                    led to my being invited to both the closed alpha and beta for the game.  Unfortunately the publisher Cyan was working with shut the servers
                    down before the product released due to a lack of enough interest in the game and it was eventually released as a standalone game.
                </p>
                <p>
                    I did play the standalone game (and the puzzles I tested previously, now modified to work for a single player) and also hung around in "the Cavern"
                    on multiplayer servers where they could be found (either ran by the publisher or directly by Cyan, I don't remember but more likely the latter).
                    I was likely somewhat disillusioned by the failure and stagnation of the project and lured away to Second Life about this point with its promise
                    of allowing me to create my own <a href="https://dni.fandom.com/wiki/Age" target="_blank">"Ages"</a>.
                </p>
            </q-card-section>
        </q-card>
    </div>
</template>