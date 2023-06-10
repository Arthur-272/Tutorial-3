import React, { useState, useContext } from 'react';
import {
    makeStyles,
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import CountryList from 'react-select-country-list';
import {useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    card: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: '100%',
        borderRadius: theme.spacing(2),
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        background: "white",
    },
    content: {
        padding: theme.spacing(4),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    formRow: {
        display: 'flex',
        gap: theme.spacing(2),
    },
}));

const ProfilePage = () => {
    const location = useLocation();
    const data = location.state || {};
    console.log(data);
    const classes = useStyles();
    const [formData, setFormData] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        password: "",
        confirmPassword: "",
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country
    });
    const [errors, setErrors] = useState({});
    const countryOptions = CountryList().getData();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCountryChange = (selectedCountry) => {
        setFormData((prevData) => ({
            ...prevData,
            country: selectedCountry,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required.';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.trim().length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{6,}/.test(formData.password)
        ) {
            newErrors.password =
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }

        if (formData.confirmPassword.trim() !== formData.password.trim()) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = 'Address Line 1 is required.';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required.';
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State/Province is required.';
        }

        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'Postal Code is required.';
        }

        if (!formData.country.trim()) {
            newErrors.country = 'Country is required.';
        }

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
            window.alert("User profile updated!");
            setErrors({});
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className={classes.root}>
            <Container>
                <Card className={classes.card} elevation={3}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" gutterBottom>
                            User Registration
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <div className={classes.formRow}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    required
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    required
                                />
                            </div>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                required
                            />
                            <TextField
                                label="Address Line 1"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                error={!!errors.addressLine1}
                                helperText={errors.addressLine1}
                                required
                            />
                            <TextField
                                label="Address Line 2 (Optional)"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                            />
                            <div className={classes.formRow}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                    required
                                />
                                <TextField
                                    label="Province/State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    error={!!errors.state}
                                    helperText={errors.state}
                                    required
                                />
                            </div>
                            <TextField
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode}
                                required
                            />
                            <TextField
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={(e) => handleCountryChange(e.target.value)}
                                error={!!errors.country}
                                helperText={errors.country}
                                select
                                required
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {countryOptions.map((option) => (
                                    <option key={option.label} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <Button variant="contained" color="primary" type="submit">
                                Update
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default ProfilePage;