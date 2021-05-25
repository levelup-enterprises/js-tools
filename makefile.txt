SITE=sweeps.myreliant.com
staging=/var/www/stage/$(SITE)/
prod=/var/www/$(SITE)/
list:
	rsync --update --dry-run --checksum -rlvzu  $(staging) $(prod)

copy-from-stage:
	sudo rsync --update --checksum -rlvzu $(staging) $(prod)

thump: copy-from-stage