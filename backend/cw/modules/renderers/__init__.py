def includeme(config):
	# add negotiate render
	config.include(".negotiation")

	# add csv renderer
	config.include(".csv")

	# add xlsx renderer
	config.include(".xlsx")



