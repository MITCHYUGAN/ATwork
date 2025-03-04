export function CompleteFreelancerProfile() {
    return (
        <div>
            <h1>Finish Signing up as a Freelancer</h1>
            <h2>It takes less than a minute to start earning in global standards.</h2>
            <form action="#">
                <div>
                    <label htmlFor="first_name">
                        <p>First Name *</p>
                        <input type="text" name="first_name" id="first_name" />
                    </label>
                    <label htmlFor="last_name">
                        <p>Last Name *</p>
                        <input type="text" name="last_name" id="last_name" />
                    </label>
                </div>
                <div>
                    <label htmlFor="">Your Skills</label>
                    <select name="" id="">
                        <option value="">HTML</option>
                        <option value="">CSS</option>
                        <option value="">React</option>
                    </select>
                </div>
            </form>
        </div>
    )
}