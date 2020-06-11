const imageTypes = ["image/jpeg", "image/png", "image/jpg","image/svg+xml"]
export const settings = {
    imageFormate:imageTypes,
    pages: [
        {
            name: 'Home',
            key: 'home',
            sections: [{
                name: "slider",
                key: "home_slider",
                allowFiles: imageTypes,
                extras: [{ key: 'title', name: 'Title' }, { key: 'subtitle', name: 'SubTitle' }, { key: 'link', name: 'Link' }, { key: 'button', name: 'Button Content' }]
            },
            {
                name: "Our Partners",
                key: "home_our_partners",
                file: "multiple",
                allowFiles: imageTypes,
                extras: [{ key: 'link', name: 'Link' }]
            },
            {
                name: "Testimonial",
                key: "home_testimonial",
                file: "multiple",
                allowFiles: imageTypes,
                extras: [{ key: 'feedback', name: 'Feedback' }, { key: 'name', name: 'Name' }, { key: 'designation', name: 'Designation' }, { key: 'department', name: 'Department' }]
            }]
        },
        {
            name: 'About Us',
            key: 'about_us',
            sections: [{
                name: "Our mandate",
                key: "aboutUs_our_mandate",
                file: "single",
                allowFiles: imageTypes
            },
            {
                name: "Our Partners",
                key: "aboutUs_our_partners",
                file: "multiple",
                allowFiles: imageTypes,
                extras: [{ key: 'link', name: 'Link' }]
            },
            {
                name: "Brochure",
                key: "aboutUs_Brochure",
                file: "single",
                allowFiles: ['application/pdf']
            }
            ]
        },
        {
            name: 'Job Classification',
            key: 'job-classification'
        }
    ]
};