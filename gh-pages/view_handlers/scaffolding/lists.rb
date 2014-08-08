require 'view_handlers/_layouts/docs'

module ViewHandlers; end
class ViewHandlers::Scaffolding; end
class ViewHandlers::Scaffolding

  class Lists
    include ViewHandlers::Layouts::Docs

    page_title{ 'CSS: Lists' }

    def run!
      render 'scaffolding/lists.html'
    end

  end

end
