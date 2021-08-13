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
                    or experience with and was initially worried that I wasn't a good fit for the job.  After a month or two though I did start feeling more comfortable
                    about what the company was about and how I could contribute to it and started to push for more developer access.  At the time the product was a
                    <a href="https://www.sap.com/products/sql-anywhere.html" target="_blank">Sybase</a> database engine on a central machine in a network with a collection
                    of Windows executables on workstations that would connect to it.  In 2001 I started using <a href="https://nongnu.org/cvs/" target="_blank">CVS</a>
                    (and later <a href="https://subversion.apache.org/" target="_blank">SVN</a>) to keep track of the .zip files I was getting from the primary developer,
                    to track code changes and my contributions to it (I kinda figure that it had value to me even if I was the only one using it).
                </p>
                <p>
                    The feedback I was getting from my boss regarding the changes I was making to our product was generally positive; there had apparently been much
                    frustration that one bugfix would create three others, while the changes I made tended to be more stable even before any testing occurred. Over time
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
                    My experience with maintaining the code over time made it increasingly obvious there was a high cost of making any significant changes.  Most data
                    operations went through a class named CGridDialog, a user-interface class that had a large number of assumptions as to how it was to be displayed
                    to the user.  The retrieved data was stored solely in a UI class in its formatted form, which had a large performance hit as any data load operation
                    was also a ui update operation.  Nearly every function that accepted a table name would immediately parse it in case it was passed in the form
                    OWNER.TABLE (and then assume the owner was DBA). I think my breaking point was when dealing with formatted costs, where I needed to fix a column
                    sum of formatted costs and found myself backing out international formatting rules one-by-one from each of the formatted values.
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
                        <q-card-section>
                            <div class="text-h6">Organization</div>
                            <p><b>The Core</b></p>
                            <p><b>"Plugins" or Code Modules</b></p>
                            <p><b>TeamCOM and other wrappers</b></p>
                        </q-card-section>
                    </q-card>
                </p>
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">Hosted Service</div>
                <span class="date">(2008-2017)</span>
            </q-card-section>
            <q-card-section>
                text
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">Amazon Web Services</div>
                <span class="date">(2017-2021)</span>
            </q-card-section>
            <q-card-section>
                text
            </q-card-section>
        </q-card>

        <q-card class="project q-ma-md">
            <q-card-section>
                <div class="text-h5">The Next Version</div>
                <span class="date">(2020-2021)</span>
            </q-card-section>
            <q-card-section>
                text
            </q-card-section>
        </q-card>
    </q-page>
</template>