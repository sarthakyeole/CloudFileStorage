import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WriteToCloudFirestore from '@/components/cloudFirestore/Write'
import ReadDataFromCloudFirestore from '@/components/cloudFirestore/Read'
import { useUser } from '@/lib/firebase/useUser'
import Counter from '@/components/realtimeDatabase/Counter'
import UploadFile from '@/components/storage/UploadFile'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

export default function Home() {
  // Use null as initial state to indicate "loading"
  const [authUser, setAuthUser] = useState(null)
  
  const { user, loading, logout } = useUser()

  // Handle the user data after mount
  useEffect(() => {
    if (user !== undefined) {
      setAuthUser(user)
    }
  }, [user])

// Show loading state during authentication
if (loading) {
  return <div className={styles.container}>Loading...</div>
}

// User is authenticated
if (user) {
  return (
    <div className={styles.container}>
      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.email}</Card.Text>
          <hr />
          {user.profilePic ? <img src={user.profilePic} height={100} width={100} alt="Profile" /> : <p>No profile pic</p>}
          <hr />
          <WriteToCloudFirestore />
          <ReadDataFromCloudFirestore />
          <hr />
          <Counter id={user.id} />
          <hr />
          <UploadFile />
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={() => logout()} style={{ width: '100px' }}>Log Out</Button>
            <a href="https://github.com/bjcarlson42/nextjs-with-firebase" target="_blank" rel="noopener noreferrer">
              <Button variant="outline-secondary" style={{ width: '100px' }}>Code</Button>
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

  // User is not authenticated
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My App!
        </h1>

        <p className={styles.description}>
          This is a sample application where you can:
        </p>
        <ul className={styles.list}>
          <li>Write data to Cloud Firestore</li>
          <li>Read data from Cloud Firestore</li>
          <li>Use a real-time counter</li>
          <li>Upload files to Firebase Storage</li>
        </ul>

        <p className={styles.description}>
          Please <a href="/auth">Log In</a> to get started!
        </p>
      </main>
    </div>
  )

  // User is not authenticated
  // return (
  //   <div className={styles.container}>
  //     <p><a href="/auth">Log In!</a></p>

  //     <Head>
  //       <title>Create Next App</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className={styles.main}>
  //       <h1 className={styles.title}>
  //         Welcome to <a href="https://nextjs.org">Next.js!</a>
  //       </h1>

  //       <p className={styles.description}>
  //         Get started by editing{' '}
  //         <code className={styles.code}>pages/index.js</code>
  //       </p>

  //       <div className={styles.grid}>
  //         <a href="https://nextjs.org/docs" className={styles.card}>
  //           <h3>Documentation &rarr;</h3>
  //           <p>Find in-depth information about Next.js features and API.</p>
  //         </a>

  //         <a href="https://nextjs.org/learn" className={styles.card}>
  //           <h3>Learn &rarr;</h3>
  //           <p>Learn about Next.js in an interactive course with quizzes!</p>
  //         </a>

  //         <a
  //           href="https://github.com/vercel/next.js/tree/master/examples"
  //           className={styles.card}
  //         >
  //           <h3>Examples &rarr;</h3>
  //           <p>Discover and deploy boilerplate example Next.js projects.</p>
  //         </a>

  //         <a
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //           className={styles.card}
  //         >
  //           <h3>Deploy &rarr;</h3>
  //           <p>
  //             Instantly deploy your Next.js site to a public URL with Vercel.
  //           </p>
  //         </a>
  //       </div>
  //     </main>

  //     <footer className={styles.footer}>
  //       <a
  //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Powered by{' '}
  //         <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
  //       </a>
  //     </footer>
  //   </div>
  // )
}