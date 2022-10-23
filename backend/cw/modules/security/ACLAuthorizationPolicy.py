from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.security import ACLAllowed, ACLDenied, Allow, Deny, Everyone
from pyramid.location import lineage
from pyramid.compat import is_nonstr_iter


class MyACLAuthorizationPolicy(ACLAuthorizationPolicy):
	def custom_compare_principals(self, ace_principal, principals):
		return type(ace_principal) == set and ace_principal.issubset(principals)

	def permits(self, context, principals, permission):
		""" Return an instance of
		:class:`pyramid.security.ACLAllowed` instance if the policy
		permits access, return an instance of
		:class:`pyramid.security.ACLDenied` if not."""

		acl = '<No ACL found on any object in resource lineage>'

		for location in lineage(context):
			try:
				acl = location.__acl__
			except AttributeError:
				continue

			if acl and callable(acl):
				acl = acl()

			for ace in acl:
				ace_action, ace_principal, ace_permissions = ace
				if ace_principal in principals or self.custom_compare_principals(ace_principal, principals):
					if not is_nonstr_iter(ace_permissions):
						ace_permissions = [ace_permissions]
					if permission in ace_permissions:
						if ace_action == Allow:
							return ACLAllowed(
								ace, acl, permission, principals, location
							)
						else:
							return ACLDenied(
								ace, acl, permission, principals, location
							)					

		# default deny (if no ACL in lineage at all, or if none of the
		# principals were mentioned in any ACE we found)
		return ACLDenied(
			'<default deny>', acl, permission, principals, context
		)
