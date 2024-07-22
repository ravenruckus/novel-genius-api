'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	signInWithGoogle,
	signOut,
	onAuthStateChanged
} from "@/lib/firebase/auth.js"
import { useRouter } from "next/navigation";
import { firebaseConfig } from "@/lib/firebase/config";

function useUserSession(initialUser: any) {
	// The initialUser comes from the server via a server component
	const [user, setUser] = useState(initialUser);
	const router = useRouter();

	// Register the service worker that sends auth state back to server
	// The service worker is built with npm run build-service-worker
	useEffect(() => {

		if ("serviceWorker" in navigator) {
			const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
			const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`
		
		  navigator.serviceWorker
			.register(serviceWorkerUrl)
			.then((registration) => console.log("scope is: ", registration.scope))
		}
	  }, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser: any) => {
			setUser(authUser)
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onAuthStateChanged((authUser: any) => {
			if (user === undefined) return

			// refresh when user changed to ease testing
			if (user?.email !== authUser?.email) {
				router.refresh()
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return user;
}

export default function Header({initialUser}: any) {

	const user = useUserSession(initialUser) ;

	const handleSignOut = (event: any) => {
		event.preventDefault();
		signOut();
	};

	const handleSignIn = (event: any) => {
		event.preventDefault();
		signInWithGoogle();
	};

	return (
		<header>
			{user ? (
				<>
					<div className="profile">
						<p>
							name: {user.displayName}
						</p>

						<div className="menu">
							...
							<ul>
								<li>{user.displayName}</li>

								<li>
									<a href="#" onClick={handleSignOut}>
										Sign Out
									</a>
								</li>
							</ul>
						</div>
					</div>
				</>
			) : (
				<div className="profile">
                    <h2>Test</h2>
                    <a href="#" onClick={handleSignIn}>
					    Sign In with Google!
				    </a>
                </div>
			)}
		</header>
	);
}
