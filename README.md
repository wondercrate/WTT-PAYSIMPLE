
LIVE SITE:
	- http://138.197.44.123:3000

GITHUB:

	- Email          : sean@wondercrate.com

	- Password       : Blammers702789

	- Project folder : WTT-PAYSIMPLE

DIGITAL OCEAN:

	- ACCOUNT 

	-- Email    : sean@wondercrate.com

	-- Password : Blammers702789

	-- Droplet  : WTT-PAYSIMPLE

	- SHELL ACCESS

	-- SSH      : ssh root@138.197.44.123

	-- Password : Aphornea9311

PAYSIMPLE: 

	- Username : sbx-sbaldwin

	- Password : Blammers702789

ZOHO CREATOR: 

	- Email    : lacey@walkingtree.org

	- Password : C@lorado34*7

PAYSIMPLE/NODE INTEGRATION REFERENCE CODE REPOSITORIES:

	- https://github.com/ruffrey/node-paysimple

	- https://github.com/rbaindourov/paysimple-node

MAIN TASKS | OBJECTIVES:	

	- On form submission, create customer object within PaySimple, as well as a new record within Zoho Creator.

	- Embed PaySimple payment form Iframe on the client side -(if doable without the Iframe that would be preferable).

	- When the client makes a payment, ensure that the amountDue is being updated in PaySimple, Zoho Creator, and also the User model.

	- Have email conformation sent to clients upon enrollment, as well as password reset/recovery functionality.

HOW TO RUN

1) Install nodejs v6.11.2 and npm that comes with it

2) If you have a windows - comment a line with cwd path in processes.json, otherwise make it right for you project directory

3) In project folder do next commands:

```
npm install
npm install -g pm2
pm2 start processes.json
```

Now you can check service logs by `pm2 logs` command
More info about pm2 - http://pm2.keymetrics.io/