As-of 2022-4-22, v2.6.7, re-entrant parsing causes problems.

Should we be able to invoke methods on the resulting NODE objects AFTER parsing completes and those
methods should we be able to start a new parse using the same root parser object???

Right now it fails subtly. If nothing else, this should fail with a clear error.

I think the "source" value gets swapped out when you call parse re-entrantly and if we are still
reading the node-objects, their "source" will become wrong and therefor the ".text" method will
return the wrong values.
