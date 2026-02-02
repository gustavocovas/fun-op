# Op-fun

Let's build a web application to help students to practice simple math operations

The app should be entirely in the web page (front-end only). I plan to host it using github pages

It should also generate printable pages, so a white theme is best

You are free to choose the best web framework for this (or just ask me)

Each generated page should have a config and a unique id. We could include the parameters and the RNG seed in the url, so we can get shareable urls that produce the same page in each device (without needing to store all the content in the url)

The app would have many modules covering several operations, and it will have 2 modes of use: offline where you print the page and write the answers using a pencil and online where you insert the answers in fields. There is a button to check the responses (paint it green where it is correct, paint it red and show the correct answer where it is incorrect). Do not check the answers in real time, the must be a button that does this.

## Sum

The sum feature allows students to practice sum of numbers.

The parameters would be:

max_operand: the maximum number that should appear as an operand (so we can tune the difficulty)
n_ops: the number of operations in the page (lets put a default parameter of 100)

So let's say that we have max_operand = 10, n_ops = 3, the page would be something like

10 + 1 = _
9 + 3 = _
1 + 2 = _

Now, the catch is that the operations are not entirely random. They must contain sub-sequences such as 1 + 1, 1 + 2, 1 + 3, etc. And sometimes they should show up out of order: 1 + 1, 1 + 3, 1 + 2. Also, each page should try to do spaced repetition of operations. So the operation appears in such a sequence in the beginning, but also randomly after, and sometimes in the reverse order (1+2 becomes 2+1)

Give some solved examples in the beginning
