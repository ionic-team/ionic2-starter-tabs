Modules compiled with Traceur require the $traceurRuntime global.
One way to include it is to add 'traceur' to dependencies and
require('traceur/bin/traceur-runtime').

Hovewer, traceur package is quite big, and we don't need the rest of files.
This package is made so that one can add 'traceur-runtime' to dependencies and
require('traceur-runtime').
