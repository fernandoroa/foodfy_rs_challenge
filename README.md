This is the ***foodfy*** series of challenges, from the ***launchbase course*** from ***Rocketseat***, (a javascript course).  

All challenges relate to building a site of cooking recipes and related chefs.

Branch names correspond to those challenges. Check also [previous_challenges.md](previous_challenges.md)

### ***Fourth Challenge*** (portuguese):

https://github.com/rocketseat-education/bootcamp-launchbase-desafios-05/blob/master/desafios/05-persistindo-dados-foodfy.md

#### Summary

* Migrate data that were in a `.json` to a PostgreSQL database
* Create *chef* pages, such as `create`, `list`, `edit`.
* Create a filter field to search for recipes

* Create a *main*, *details*, *edition* and *creation* pages with buttons as in:    
  * https://rawcdn.githack.com/rocketseat-education/bootcamp-launchbase-desafios-05/0e2651f64b0e06c8c23e3b86b10cfda55c6bfbd4/layouts/admin/index.html  
  * https://rawcdn.githack.com/rocketseat-education/bootcamp-launchbase-desafios-05/0e2651f64b0e06c8c23e3b86b10cfda55c6bfbd4/layouts/site/index.html
  
  * or paste this links:
  https://raw.githubusercontent.com/rocketseat-education/bootcamp-launchbase-desafios-05/master/layouts/admin/index.html  
  https://raw.githubusercontent.com/rocketseat-education/bootcamp-launchbase-desafios-05/master/layouts/site/index.html  
  into: https://raw.githack.com/


### How to run 

- docker
  * Install *git* on your system
  * Install and test *docker* on your system
  * If you are in Windows (WSL2) don't use `/mnt/c/User/path`, go to `/home/user` with `cd ~`
  * `git clone --recurse-submodules https://github.com/fernandoroa/foodfy_parent_db`
  * `cd foodfy_parent_db`
  * `docker compose up`
  * In the browser, open `http://localhost:5010` and `http://localhost:5010/admin`
