import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initFirebase } from '@/lib/firebase/initFirebase'
import { getAuth } from "firebase/auth";
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from '@/lib/firebase/userCookies'
import { mapUserData } from '@/lib/firebase/mapUserData'

// Initialize Firebase outside the hook
initFirebase()
const auth = getAuth()

export const useUser = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // Add loading state
    const router = useRouter()

    const logout = async () => {
        try {
            await auth.signOut();
            removeUserCookie();
            router.push("/auth");
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        // Get the user from cookies first
        const userFromCookie = getUserFromCookie()
        if (userFromCookie) {
            setUser(userFromCookie)
        }
        
        // Set up the Firebase Auth state listener
        const cancelAuthListener = auth.onIdTokenChanged((user) => {
            if (user) {
                const userData = mapUserData(user)
                setUserCookie(userData)
                setUser(userData)
            } else {
                removeUserCookie()
                setUser(null)
            }
            setLoading(false) // Set loading to false once we have a response
        })

        // Ensure we set loading to false even if the auth check doesn't trigger
        // This handles the case where there's no authentication state change
        const timeoutId = setTimeout(() => {
            setLoading(false)
        }, 1000)

        // Clean up subscription
        return () => {
            cancelAuthListener()
            clearTimeout(timeoutId)
        }
    }, [])

    return { user, loading, logout }
}