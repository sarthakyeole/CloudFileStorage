import { db } from '@/lib/firebase/initFirebase'
import { doc, setDoc, Timestamp, GeoPoint } from "firebase/firestore"
import { useUser } from '@/lib/firebase/useUser'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const WriteToCloudFirestore = () => {
    const { user } = useUser()
    const [formData, setFormData] = useState({
        name: user?.name || '',
        number: 2,
        favoriteFood: '',
        location: 'New York',
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const sendData = async () => {
        try {
            if (!user || !user.id) {
                throw new Error("User not logged in")
            }
            
            const userDoc = doc(db, "myCollection", user.id)
            await setDoc(userDoc, {
                string_data: formData.name,
                number_data: parseInt(formData.number),
                boolean_data: true,
                map_data: { 
                    email: user.email, 
                    favoriteFood: formData.favoriteFood,
                    lastUpdated: new Date().toISOString()
                },
                array_data: [formData.location, user.id],
                null_data: null,
                time_stamp: Timestamp.fromDate(new Date()),
                geo_point: new GeoPoint(34.714322, -131.468435),
                userId: user.id,
                userEmail: user.email
            })
            alert('Data was successfully sent to cloud firestore!')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    
    return (
        <div style={{ margin: '15px 0' }}>
            <h4>Update Your Profile</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter your name"
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="number" 
                        value={formData.number} 
                        onChange={handleChange} 
                        placeholder="Enter a number"
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Favorite Food</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="favoriteFood" 
                        value={formData.favoriteFood} 
                        onChange={handleChange} 
                        placeholder="Enter your favorite food"
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Select name="location" value={formData.location} onChange={handleChange}>
                        <option value="New York">New York</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="London">London</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Sydney">Sydney</option>
                    </Form.Select>
                </Form.Group>
                
                <Button onClick={sendData} variant="primary" style={{ width: '100%' }}>
                    Update Profile Data
                </Button>
            </Form>
        </div>
    )
}

export default WriteToCloudFirestore