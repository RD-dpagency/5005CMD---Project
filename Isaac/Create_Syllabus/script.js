document.addEventListener("DOMContentLoaded", () => {
    const syllabusForm = document.getElementById("syllabus-form");
    const activityList = document.getElementById("activity-list");
    const syllabusItems = document.getElementById("syllabus-items");

    // Add activity
    document.getElementById("add-activity").addEventListener("click", () => {
        const activityDiv = document.createElement("div");
        activityDiv.innerHTML = `
            <input type="text" placeholder="Activity Title" class="activity-title">
            <textarea placeholder="Activity Description" class="activity-description"></textarea>
            <button class="remove-activity">Remove</button>
        `;
        activityList.appendChild(activityDiv);

        // Remove activity
        activityDiv.querySelector(".remove-activity").addEventListener("click", () => {
            activityList.removeChild(activityDiv);
        });
    });

    // Save syllabus
    document.getElementById("save-syllabus").addEventListener("click", async () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        const activities = [];
        document.querySelectorAll(".activity-title").forEach((input, index) => {
            activities.push({
                id: index + 1,
                title: input.value,
                description: document.querySelectorAll(".activity-description")[index].value,
                syllabus_id: Date.now(), // Using timestamp as temporary syllabus_id
            });
        });

        const syllabus = {
            id: Date.now(),
            title,
            description,
            activities: activities.map((a) => a.id),
        };

        try {
            // Save syllabus
            const syllabusResponse = await fetch("http://127.0.0.1:8000/syllabus/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(syllabus),
            });

            if (!syllabusResponse.ok) {
                throw new Error("Failed to save syllabus");
            }

            // Save activities
            for (const activity of activities) {
                const activityResponse = await fetch("http://127.0.0.1:8000/activity/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(activity),
                });
                if (!activityResponse.ok) {
                    throw new Error("Failed to save activity");
                }
            }

            // Display success
            const syllabusItem = document.createElement("li");
            syllabusItem.innerHTML = `
                <h3>${syllabus.title}</h3>
                <p>${syllabus.description}</p>
                <p>Activities: ${activities.length}</p>
            `;
            syllabusItems.appendChild(syllabusItem);

            // Clear form
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            activityList.innerHTML = "";

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save syllabus. See console for details.");
        }
    });
});