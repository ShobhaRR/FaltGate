function GuestTable({
    guests
}) {

    return (

        <table width="100%">

            <thead>

            <tr>

                <th>Name</th>
                <th>Mobile</th>
                <th>Purpose</th>
                <th>Status</th>

            </tr>

            </thead>

            <tbody>

            {
                guests.map(guest => (

                    <tr key={guest.id}>

                        <td>{guest.guestName}</td>
                        <td>{guest.guestMobile}</td>
                        <td>{guest.purpose}</td>
                        <td>{guest.status}</td>

                    </tr>

                ))
            }

            </tbody>

        </table>

    );

}

export default GuestTable;