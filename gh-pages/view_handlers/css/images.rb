require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Images
    include ViewHandlers::Layouts::Docs

    script 'js/holder.js'
    page_title{ 'Images | CSS' }

    def run!
      render 'css/images.html'
    end

  end

end
