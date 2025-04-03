import React from 'react';
import { useRouter } from 'next/router';
import footers from '../../routes/footerRoutes';
import { pathToRoute } from '../../helpers/helpers';
import Mounted from '../../components/Mounted';

const FooterRoutes = () => {
	const router = useRouter();

	const PAGE = footers.find((key) => {
		if (!key.path) return false; // ✅ Prevents errors when key.path is undefined
	
		return key.path.endsWith('/*') // ✅ Use `.endsWith()` instead of substring check
			? router.pathname.includes(key.path.slice(0, -2)) // ✅ Use `.slice(0, -2)` for clarity
			: key.path === pathToRoute(router.pathname);
	});
	

	if (PAGE) return <Mounted>{PAGE?.element}</Mounted>;
	return null;
};

export default FooterRoutes;
