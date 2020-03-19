$(document).ready(function () {
  const saveDataBtn = $(".btn-info")
  const apiKey = "3aBCSv1dJcDYYIPscAas6NkwbAtDgUWF"

  $(document).on("click", ".btn-info", e => {
    console.log("Click:", e.target.parentElement)

    let parent = e.target.parentElement
    console.log(parent.querySelector("h3"))
    let h3 = parent.querySelector("h3")
    let p = parent.querySelector("p")
    console.log(p)

    $.ajax({
        url: "/api/new",
        method: "POST",
        data: {
          title: h3.innerText,
          description: p.innerText
        }
      })
      .then(res => console.log("success"))
      .catch(err => console.log(err))
  })

  $.ajax(
      `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`
    )
    .then(res => {
      res.results.forEach(el => {
        $("#showData").append(
          `
                <div class="card-info mb-5">
                    <h3>${el.title}</h3>
                    <p>${el.abstract}</p>
                    <button data=${el.uri} class="btn btn-info">
                        + Save
                    </button>
                </div>
                `
        )
      })
    })
    .catch(err => console.log(err))
})